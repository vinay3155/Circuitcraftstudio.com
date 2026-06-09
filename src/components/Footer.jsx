import React, { useState } from 'react';
import { 
  CheckCircle, ShieldCheck, Truck, Headphones, 
  HelpCircle, Phone, Mail, Send 
} from 'lucide-react';

const InstagramIcon = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onOpenOwnerConsole }) {
  const [inquiryText, setInquiryText] = useState('');

  const badges = [
    { icon: <CheckCircle size={20} />, label: "100% Working Models", desc: "Tested by core developers" },
    { icon: <ShieldCheck size={20} />, label: "Quality Assured", desc: "No duplicate schematics" },
    { icon: <Truck size={20} />, label: "On-Time Delivery", desc: "Fast logistics tracked" },
    { icon: <Headphones size={20} />, label: "Technical Support", desc: "1-on-1 Zoom debugging support" }
  ];

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryText) return;
    
    const text = `Hello CircuitCraft Studio! 🚀\nI have a project query:\n\n"${inquiryText}"`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
    setInquiryText('');
  };

  return (
    <footer 
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '4rem 1.5rem 2rem',
        color: 'var(--text-secondary)'
      }}
    >
      {/* 1. Trust Badges Row */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto 4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '3rem'
        }}
      >
        {badges.map((badge, idx) => (
          <div 
            key={idx}
            className="badge-glow"
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ color: 'var(--accent-cyan)' }}>
              {badge.icon}
            </div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{badge.label}</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{badge.desc}</p>
          </div>
        ))}
      </div>
 
      {/* 2. Contact details & Quick Inquiry Form */}
      <div 
        id="contact"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto 3rem',
          textAlign: 'left'
        }}
        className="footer-columns-grid"
      >
        {/* Contact details */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            CIRCUITCRAFT <span style={{ color: 'var(--accent-cyan)' }}>STUDIO</span>
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '450px', lineHeight: '1.6' }}>
            We specialize in hardware prototyping, embedded firmware development, and complete research project mentoring. Let us turn your ideas into functional working models.
          </p>
 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Phone */}
            <a 
              href="tel:+918123265315"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                width: 'fit-content'
              }}
              className="hover-cyan-link"
            >
              <Phone size={16} style={{ color: 'var(--accent-cyan)' }} />
              +91 81232 65315
            </a>
 
            {/* Email */}
            <a 
              href="mailto:vinaynbodravla315@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                width: 'fit-content'
              }}
              className="hover-cyan-link"
            >
              <Mail size={16} style={{ color: 'var(--accent-cyan)' }} />
              vinaynbodravla315@gmail.com
            </a>
 
            {/* Instagram */}
            <a 
              href="https://instagram.com/circuitcraftstudio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                width: 'fit-content'
              }}
              className="hover-cyan-link"
            >
              <InstagramIcon size={16} style={{ color: 'var(--accent-cyan)' }} />
              @circuitcraftstudio
            </a>
          </div>
        </div>
 
        {/* Quick Inquiry Email Trigger */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            Quick Project Inquiry
          </h4>
          <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            Have a custom requirement? Describe your project below and click send to query our developer mail channel.
          </p>
 
          <form onSubmit={handleInquirySubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="e.g. Need smart blind stick using ESP32..." 
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            />
            <button
              type="submit"
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '6px',
                background: 'var(--accent-cyan)',
                border: 'none',
                color: '#000',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--glow-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
 
      {/* 3. Bottom Credits */}
      <div 
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem'
        }}
        className="footer-bottom"
      >
        <span>&copy; {new Date().getFullYear()} CircuitCraft Studio. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span 
            onClick={onOpenOwnerConsole} 
            style={{ cursor: 'pointer', color: 'var(--text-muted)' }} 
            className="hover-cyan-link"
          >
            🛡️ Owner Console
          </span>
          <span>QUALITY WORK</span>
          <span>ON-TIME DELIVERY</span>
          <span>INNOVATION FIRST</span>
        </div>
      </div>

      <style>{`
        .hover-cyan-link:hover {
          color: var(--accent-cyan) !important;
          text-shadow: var(--glow-cyan);
        }
        @media (max-width: 768px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 1rem !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
