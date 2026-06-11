const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User, Purchase, Certificate } = require('./models');

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'circuitcraft_secret_token_key_123');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// 1. User Registration
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, college } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please enter all required fields.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      college
    });

    const savedUser = await newUser.save();

    // Sign JWT
    const token = jwt.sign(
      { id: savedUser._id, name: savedUser.name, email: savedUser.email },
      process.env.JWT_SECRET || 'circuitcraft_secret_token_key_123',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        college: savedUser.college
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 2. User Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }

    // Check user profile
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'circuitcraft_secret_token_key_123',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. Get Current User Session Info
router.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching profile.' });
  }
});

// 4. Unlock / Save Purchased Bundle
router.post('/purchases/unlock', authenticateToken, async (req, res) => {
  try {
    const { bundleId, tierId } = req.body;

    if (!bundleId || !tierId) {
      return res.status(400).json({ error: 'Bundle ID and Tier ID are required.' });
    }

    // Check if purchase already exists for this user to avoid duplicates
    const existingPurchase = await Purchase.findOne({
      userId: req.user.id,
      bundleId,
      tierId
    });

    if (existingPurchase) {
      return res.json({ message: 'Bundle already unlocked.', purchase: existingPurchase });
    }

    const newPurchase = new Purchase({
      userId: req.user.id,
      bundleId,
      tierId
    });

    const savedPurchase = await newPurchase.save();
    res.json({ message: 'Purchase successfully unlocked.', purchase: savedPurchase });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error unlocking purchase.' });
  }
});

// 5. Retrieve Unlocked Purchased Bundles List
router.get('/purchases', authenticateToken, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.id });
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error retrieving purchases.' });
  }
});

// Helper function to send password reset email (falls back to console log if SMTP not set)
const sendResetEmail = async (email, resetToken, origin) => {
  const resetUrl = `${origin}?resetToken=${resetToken}`;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpMail = process.env.SMTP_MAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (smtpHost && smtpMail && smtpPassword) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: parseInt(smtpPort) === 465,
        auth: {
          user: smtpMail,
          pass: smtpPassword
        }
      });

      const mailOptions = {
        from: `"CircuitCraft Studio" <${smtpMail}>`,
        to: email,
        subject: 'Password Reset Request - CircuitCraft Studio',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
              `${resetUrl}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                 <h2 style="color: #2563eb; text-align: center;">CircuitCraft Studio</h2>
                 <p>Hello,</p>
                 <p>You requested a password reset for your account at CircuitCraft Studio. Please click the button below to set a new password:</p>
                 <div style="text-align: center; margin: 30px 0;">
                   <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
                 </div>
                 <p>Or copy and paste this link into your browser:</p>
                 <p style="word-break: break-all; color: #555;">${resetUrl}</p>
                 <p style="font-size: 0.8rem; color: #888;">This link is valid for 1 hour. If you didn't request a reset, you can safely ignore this email.</p>
               </div>`
      };

      await transporter.sendMail(mailOptions);
      console.log(`[SMTP] Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('[SMTP Error] Failed to send email via SMTP:', error);
    }
  }

  // Developer Fallback: print to console
  console.log(`\n==================================================`);
  console.log(`[DEVELOPER FALLBACK] PASSWORD RESET LINK FOR ${email}:`);
  console.log(`${resetUrl}`);
  console.log(`==================================================\n`);
  return false;
};

// 6. Forgot Password - Request Reset Link
router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Please enter your email address.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'No account with that email address exists.' });
    }

    // Generate token and expiry
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email (or log to console)
    const origin = req.headers.origin || 'http://localhost:5173';
    await sendResetEmail(user.email, token, origin);

    res.json({ message: 'A password reset link has been generated and sent to your email.' });
  } catch (err) {
    console.error('Error in forgot-password route:', err);
    res.status(500).json({ error: 'Server error requesting password reset.' });
  }
});

// 7. Reset Password - Verify Token and Update Password
router.post('/auth/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Reset token and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = '';
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Your password has been reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Error in reset-password route:', err);
    res.status(500).json({ error: 'Server error resetting password.' });
  }
});

// 8. Public Certificate Verification
router.get('/certificates/verify/:id', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id.trim() });
    if (!cert) {
      return res.status(404).json({ valid: false, error: 'Certificate not found or invalid ID.' });
    }
    res.json({ valid: true, certificate: cert });
  } catch (err) {
    console.error('Error verifying certificate:', err);
    res.status(500).json({ error: 'Server error during verification.' });
  }
});

// 9. Owner Generate Certificate (Owner/Admin Only)
router.post('/certificates/generate', authenticateToken, async (req, res) => {
  try {
    // Owner check by email
    if (req.user.email !== 'vinaynbodravla315@gmail.com') {
      return res.status(403).json({ error: 'Access denied. Admin console only.' });
    }

    const { studentName, courseName, certificateId } = req.body;
    if (!studentName || !courseName) {
      return res.status(400).json({ error: 'Student name and course name are required.' });
    }

    // Generate a unique ID if not provided
    const certId = certificateId ? certificateId.trim() : `CC-${crypto.randomBytes(4).toString('hex').toUpperCase().replace(/(.{4})/g, '$1-').slice(0, -1)}`;

    const existingCert = await Certificate.findOne({ certificateId: certId });
    if (existingCert) {
      return res.status(400).json({ error: 'A certificate with this ID already exists.' });
    }

    const newCert = new Certificate({
      certificateId: certId,
      studentName,
      courseName
    });

    const savedCert = await newCert.save();
    res.json({ message: 'Certificate generated successfully.', certificate: savedCert });
  } catch (err) {
    console.error('Error generating certificate:', err);
    res.status(500).json({ error: 'Server error generating certificate.' });
  }
});

// 10. Owner List All Certificates (Owner/Admin Only)
router.get('/certificates', authenticateToken, async (req, res) => {
  try {
    if (req.user.email !== 'vinaynbodravla315@gmail.com') {
      return res.status(403).json({ error: 'Access denied. Admin console only.' });
    }
    const certs = await Certificate.find().sort({ issueDate: -1 });
    res.json(certs);
  } catch (err) {
    console.error('Error listing certificates:', err);
    res.status(500).json({ error: 'Server error listing certificates.' });
  }
});

// 11. Owner Delete Certificate (Owner/Admin Only)
router.delete('/certificates/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.email !== 'vinaynbodravla315@gmail.com') {
      return res.status(403).json({ error: 'Access denied. Admin console only.' });
    }
    const cert = await Certificate.findOneAndDelete({ certificateId: req.params.id });
    if (!cert) {
      return res.status(404).json({ error: 'Certificate not found.' });
    }
    res.json({ message: 'Certificate deleted successfully.' });
  } catch (err) {
    console.error('Error deleting certificate:', err);
    res.status(500).json({ error: 'Server error deleting certificate.' });
  }
});

module.exports = router;
