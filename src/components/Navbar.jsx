import React, { useState } from 'react';
import { Cpu, ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  cartCount, 
  toggleCart, 
  activeTab, 
  setActiveTab 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'builder', label: 'DIY Configurator' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Hackathon Guide' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to section if on home tab
    if (id !== 'builder') {
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
        background: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)',
      }}
      className="nav-theme-override"
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
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
            fontSize: '1.25rem',
            color: 'var(--accent-cyan)'
          }}
        >
          <div 
            style={{
              padding: '0.35rem',
              borderRadius: '8px',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse-ring 2s infinite'
            }}
          >
            <Cpu size={20} />
          </div>
          <span style={{ color: 'var(--text-primary)' }}>
            CIRCUITCRAFT <span style={{ color: 'var(--accent-cyan)' }}>STUDIO</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === item.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontWeight: activeTab === item.id ? 600 : 400,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  position: 'relative',
                  transition: 'color var(--transition-fast)',
                  fontFamily: 'var(--font-sans)'
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
                      background: 'var(--accent-cyan)',
                      boxShadow: 'var(--glow-cyan)'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme & Cart Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'rgba(255,255,255,0.05)',
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
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={toggleCart}
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
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
              <ShoppingCart size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ fontSize: '0.9rem' }}>Cart</span>
              {cartCount > 0 && (
                <span 
                  style={{
                    background: 'var(--accent-cyan)',
                    color: '#000',
                    fontSize: '0.75rem',
                    borderRadius: '50%',
                    padding: '2px 6px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'rgba(255,255,255,0.05)',
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
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={toggleCart}
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
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
              <ShoppingCart size={16} style={{ color: 'var(--accent-cyan)' }} />
              {cartCount > 0 && (
                <span style={{ background: 'var(--accent-cyan)', color: '#000', fontSize: '0.7rem', borderRadius: '50%', padding: '1px 5px', minWidth: '15px' }}>
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
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            gap: '1rem',
            animation: 'slide-in 0.3s ease'
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
                color: activeTab === item.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: activeTab === item.id ? 600 : 400,
                fontSize: '1.1rem',
                cursor: 'pointer',
                padding: '0.5rem 0',
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
