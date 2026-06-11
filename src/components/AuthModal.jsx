import React, { useState, useEffect } from 'react';
import { Shield, Mail, Lock, User, BookOpen, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, resetToken, onClearResetToken }) {
  const [tab, setTab] = useState('login'); // 'login', 'register', 'forgot', 'reset'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, college })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('cc_auth_token', data.token);
      setSuccess('Account created successfully!');
      setTimeout(() => {
        onAuthSuccess(data.user);
        handleClose();
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      localStorage.setItem('cc_auth_token', data.token);
      setSuccess('Logged in successfully!');
      setTimeout(() => {
        onAuthSuccess(data.user);
        handleClose();
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCollege('');
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    if (resetToken && isOpen) {
      setTab('reset');
      setError('');
      setSuccess('');
    }
  }, [resetToken, isOpen]);

  const handleClose = () => {
    resetForm();
    if (onClearResetToken) {
      onClearResetToken();
    }
    onClose();
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setSuccess('Reset link sent to your email!');
      setTimeout(() => {
        setTab('login');
        setError('');
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      setSuccess('Password updated successfully!');
      setTimeout(() => {
        setTab('login');
        setError('');
        setSuccess('');
        if (onClearResetToken) {
          onClearResetToken();
        }
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFormSubmitHandler = () => {
    if (tab === 'login') return handleLogin;
    if (tab === 'register') return handleRegister;
    if (tab === 'forgot') return handleForgotPassword;
    if (tab === 'reset') return handleResetPassword;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 110,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.3s ease'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          color: 'var(--text-primary)',
          textAlign: 'left'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Tab Toggle / Back Button */}
        {tab === 'forgot' || tab === 'reset' ? (
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', padding: '1rem' }}>
            <button
              onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: 0
              }}
            >
              ← Back to Sign In
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
            <button
              onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: tab === 'login' ? 'var(--bg-secondary)' : 'transparent',
                color: tab === 'login' ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: tab === 'login' ? 700 : 500,
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                borderBottom: tab === 'login' ? '2px solid var(--accent-blue)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: tab === 'register' ? 'var(--bg-secondary)' : 'transparent',
                color: tab === 'register' ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: tab === 'register' ? 700 : 500,
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                borderBottom: tab === 'register' ? '2px solid var(--accent-blue)' : 'none'
              }}
            >
              Create Account
            </button>
          </div>
        )}

        <div style={{ padding: '1.75rem' }}>
          {/* Logo Brand Title (Coursera-inspired) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.05rem', marginBottom: '1.5rem', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.04em', color: '#0056d2', userSelect: 'none' }}>
            <span>circuitcraft</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8rem', marginLeft: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>portal</span>
          </div>

          {/* Feedback states */}
          {error && (
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '6px', color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '6px', color: 'var(--accent-green)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={getFormSubmitHandler()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Name - Sign Up Only */}
            {tab === 'register' && (
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Email - Both / Forgot */}
            {tab !== 'reset' && (
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* College - Sign Up Only */}
            {tab === 'register' && (
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>College / Organization</label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="e.g. VTU College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Password - Both / Reset */}
            {tab !== 'forgot' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {tab === 'reset' ? 'New Password *' : 'Password *'}
                  </label>
                  {tab === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setTab('forgot'); setError(''); setSuccess(''); }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', cursor: 'pointer', padding: 0, fontWeight: 500 }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    required
                    placeholder={tab === 'reset' ? 'Min 6 characters' : 'Enter password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Confirm Password - Sign Up / Reset */}
            {(tab === 'register' || tab === 'reset') && (
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '30px',
                fontWeight: 700,
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              className="glow-btn"
            >
              {loading ? (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', animation: 'orb-float 0.8s linear infinite' }} />
              ) : (
                <>
                  {tab === 'login' && (
                    <>
                      <Sparkles size={16} />
                      <span>Secure Login</span>
                    </>
                  )}
                  {tab === 'register' && (
                    <>
                      <Sparkles size={16} />
                      <span>Register Profile</span>
                    </>
                  )}
                  {tab === 'forgot' && (
                    <>
                      <Mail size={16} />
                      <span>Send Recovery Link</span>
                    </>
                  )}
                  {tab === 'reset' && (
                    <>
                      <Shield size={16} />
                      <span>Update Password</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Secure details footer */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            🔐 Encrypted user records stored in MongoDB cluster.
          </div>
        </div>
      </div>
    </div>
  );
}
