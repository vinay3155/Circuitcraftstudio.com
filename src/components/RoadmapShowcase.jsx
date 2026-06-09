import React from 'react';
import { Award, Check, Sparkles, Lock, Unlock, ArrowRight } from 'lucide-react';

export default function RoadmapShowcase({ isUnlocked, onUnlockClick, onOpenClick }) {
  const features = [
    { title: "Core Tracks", desc: "Embedded Systems, VLSI Design, IoT Telemetry" },
    { title: "IT & Software Tracks", desc: "System Design, DSA Coding Patterns, Bun/Next.js stack, AI/ML" },
    { title: "Aptitude Guides", desc: "Quantitative and Logical reasoning shortcuts" },
    { title: "Resume Templates", desc: "ATS-friendly LaTeX Overleaf fresher templates" },
    { title: "Mock Interview Booking", desc: "1-on-1 WhatsApp scheduling support with core experts" }
  ];

  return (
    <section 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1000px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      <div 
        className="glass-panel"
        style={{
          padding: '3rem 2.5rem',
          border: '1.5px solid var(--accent-purple)',
          boxShadow: '0 0 25px rgba(99, 102, 241, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background: 'var(--bg-secondary)',
          textAlign: 'left'
        }}
      >
        {/* Glow backdrop decor */}
        <div 
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            top: '-50px',
            right: '-50px',
            pointerEvents: 'none'
          }}
        />

        {/* Badge header */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-purple)',
            marginBottom: '1.5rem'
          }}
        >
          <Sparkles size={12} />
          PREMIUM RESOURCE BUNDLE
        </div>

        {/* Content Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="footer-columns-grid" // Reuses responsive 1-column mobile styles
        >
          {/* Left Column: Details */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#fff' }}>
              VTU Placement & Career <span style={{ color: 'var(--accent-purple)' }}>Roadmap Bundle</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Gain access to the ultimate prep bundle built for placement readiness. Includes trending 2026/2027 technology roadmaps, coding patterns, resume templates, and mock interviews.
            </p>

            {/* Feature List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {features.map((f, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      background: 'rgba(99, 102, 241, 0.1)', 
                      borderRadius: '50%', 
                      padding: '2px', 
                      display: 'flex', 
                      color: 'var(--accent-purple)',
                      marginTop: '2px'
                    }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#fff', display: 'block' }}>{f.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing & Purchase */}
          <div 
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            {isUnlocked ? (
              <Unlock size={36} style={{ color: 'var(--accent-green)' }} />
            ) : (
              <Lock size={36} style={{ color: 'var(--text-muted)' }} />
            )}

            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                {isUnlocked ? "Status: Unlocked" : "Get Complete Access"}
              </span>
              
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ₹99
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹499
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                Save 80% • One-time purchase
              </span>
            </div>

            {isUnlocked ? (
              <button
                onClick={onOpenClick}
                className="glow-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Open Fullscreen Roadmap <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={onUnlockClick}
                className="glow-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                Buy Roadmap Bundle <ArrowRight size={16} />
              </button>
            )}

            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {isUnlocked 
                ? "You have active lifetime access on this device."
                : "Instant automatic unlock upon UPI/UTR payment verification."
              }
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
