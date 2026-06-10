import React from 'react';
import { Lightbulb, Edit, Code, Rocket, ArrowRight, Wrench, BookOpen, Sparkles } from 'lucide-react';

export default function HeroSection({ onRoadmapClick, onExploreCatalog, onOpenStudyHub }) {
  const corePillars = [
    { icon: <Lightbulb size={16} />, label: "INNOVATE", color: "var(--accent-blue)" },
    { icon: <Edit size={16} />, label: "DESIGN", color: "var(--accent-purple)" },
    { icon: <Code size={16} />, label: "DEVELOP", color: "var(--accent-green)" },
    { icon: <Rocket size={16} />, label: "DELIVER", color: "var(--accent-yellow)" }
  ];

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Subtle Professional Grid Texture */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '850px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Subheader Badge */}
        <div 
          style={{
            background: 'rgba(79, 70, 229, 0.05)',
            border: '1px solid var(--accent-purple)',
            borderRadius: '20px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}
        >
          <Wrench size={12} />
          COMPLETE ENGINEERING PROJECT SOLUTIONS
        </div>

        {/* Title */}
        <h1 
          className="hero-title"
          style={{
            fontSize: '3.5rem',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.03em'
          }}
        >
          CIRCUITCRAFT <span style={{ color: 'var(--accent-blue)' }}>STUDIO</span>
        </h1>

        {/* Static Professional Tagline */}
        <p 
          style={{
            fontSize: '1.2rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            maxWidth: '650px',
            lineHeight: 1.5,
          }}
        >
          Transforming Engineering Ideas into Reality. High-Quality Project Bundles, Comprehensive Documentation, and Academic Resources.
        </p>

        {/* Pillars (Innovate | Design | Develop | Deliver) */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            margin: '1rem 0 1.5rem'
          }}
        >
          {corePillars.map((pillar, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'border-color var(--transition-fast)',
              }}
            >
              <span style={{ color: pillar.color, display: 'inline-flex' }}>{pillar.icon}</span>
              <span>{pillar.label}</span>
            </div>
          ))}
        </div>

        {/* Call To Actions */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '0.5rem'
          }}
        >
          <button 
            onClick={onRoadmapClick}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--accent-blue)',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
            }}
          >
            <Sparkles size={16} className="pill-accent" />
            Career Roadmap (₹99)
            <ArrowRight size={16} className="pill-accent" />
          </button>
          
          <button 
            onClick={onOpenStudyHub}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem'
            }}
            className="glow-btn"
          >
            <BookOpen size={16} className="pill-accent" />
            VTU Notes / Study Hub
          </button>
          
          <button 
            onClick={onExploreCatalog}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
              e.currentTarget.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            Browse Solutions
          </button>
        </div>
      </div>
    </section>
  );
}
