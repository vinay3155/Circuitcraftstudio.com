import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  cartCount, 
  toggleCart, 
  activeTab, 
  setActiveTab,
  onOpenStudyHub,
  onOpenMyBundles,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'store', label: 'Digital Store' },
    { id: 'builder', label: 'DIY Configurator' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Hackathon Guide' },
    { id: 'study-hub', label: 'VTU Study Hub' },
    { id: 'my-bundles', label: 'My Bundles' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    if (id === 'study-hub') {
      onOpenStudyHub();
      setIsOpen(false);
      return;
    }
    if (id === 'my-bundles') {
      onOpenMyBundles();
      setIsOpen(false);
      return;
    }
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to section if on home tab
    if (id !== 'builder' && id !== 'my-bundles') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
      }}
      className="nav-theme-override"
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--accent-blue)'
          }}
        >
          <img 
            src="/logo.png" 
            alt="CircuitCraft Logo" 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: '1px solid var(--border-color)'
            }}
          />
          <span style={{ color: 'var(--text-primary)' }}>
            CIRCUITCRAFT <span style={{ color: 'var(--accent-blue)' }}>STUDIO</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: activeTab === item.id ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  padding: '0.4rem 0.6rem',
                  position: 'relative',
                  transition: 'color var(--transition-fast)',
                  fontFamily: 'var(--font-sans)',
                  borderRadius: '4px'
                }}
              >
                {item.label}
                {activeTab === item.id && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '8px',
                      right: '8px',
                      height: '2px',
                      background: 'var(--accent-blue)'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme & Cart & Profile Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={toggleCart}
              style={{
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all var(--transition-fast)',
                fontWeight: 600
              }}
            >
              <ShoppingCart size={16} style={{ color: 'var(--accent-blue)' }} />
              <span style={{ fontSize: '0.85rem' }}>Cart</span>
              {cartCount > 0 && (
                <span 
                  style={{
                    background: 'var(--accent-blue)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    minWidth: '18px',
                    textAlign: 'center',
                    fontWeight: 700
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {currentUser ? (
              /* User Profile dropdown menu */
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <User size={14} style={{ color: 'var(--accent-blue)' }} />
                  <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '125%',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      padding: '0.5rem 0',
                      width: '180px',
                      zIndex: 60,
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Account:<br/>
                      <strong style={{ color: '#fff', wordBreak: 'break-all' }}>{currentUser.email}</strong>
                    </div>
                    <button
                      onClick={() => {
                        onOpenMyBundles();
                        setIsProfileMenuOpen(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        textAlign: 'left',
                        width: '100%',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <Folder size={12} style={{ color: 'var(--accent-blue)' }} />
                      My Purchased Bundles
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        padding: '0.5rem 1rem',
                        textAlign: 'left',
                        width: '100%',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <LogOut size={12} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Register/Login Trigger */
              <button
                onClick={onOpenAuth}
                style={{
                  background: 'none',
                  border: '1px solid var(--accent-blue)',
                  color: 'var(--accent-blue)',
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37, 99, 235, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger toggle */}
        <div style={{ display: 'none' }} className="mobile-toggle-btn">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              onClick={toggleCart}
              style={{
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.75rem',
                borderRadius: '20px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 600
              }}
            >
              <ShoppingCart size={14} style={{ color: 'var(--accent-blue)' }} />
              {cartCount > 0 && (
                <span style={{ background: 'var(--accent-blue)', color: '#fff', fontSize: '0.65rem', borderRadius: '10px', padding: '1px 5px', minWidth: '15px' }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          style={{
            display: 'none',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          className="mobile-menu"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: activeTab === item.id ? 600 : 500,
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.4rem 0',
                textAlign: 'left',
                width: '100%'
              }}
            >
              {item.label}
            </button>
          ))}

          {currentUser ? (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Account: <strong style={{ color: '#fff' }}>{currentUser.email}</strong>
              </span>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setIsOpen(false);
              }}
              style={{
                background: 'var(--accent-blue)',
                border: 'none',
                color: '#fff',
                padding: '0.55rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                width: '100%',
                fontWeight: 600,
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <User size={14} /> Sign In to Account
            </button>
          )}
        </div>
      )}

      {/* CSS overrides inside style tag to easily implement responsive toggles without tailwind */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
