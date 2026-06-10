import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  cartCount, 
  toggleCart, 
  activeTab, 
  setActiveTab,
  onOpenStudyHub,
  onOpenMyBundles
}) {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Theme & Cart Controls */}
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
