const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Purchase } = require('./models');

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

module.exports = router;
