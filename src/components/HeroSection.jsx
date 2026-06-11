import React from 'react';
import { ArrowRight, Wrench, Sparkles, Star, Users, Briefcase, Video } from 'lucide-react';

export default function HeroSection({ onRoadmapClick, onExploreCatalog, onOpenStudyHub }) {
  const handleJoinWebinar = () => {
    const text = `Hello CircuitCraft Studio! 🚀\nI am interested in joining your upcoming technical webinars. Please share the schedule and registration details.`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem 5rem 2rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f1f5f9 100%)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Light blue soft gradient background effects */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left Column: Copywriting & Actions */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: '1.5rem',
          }}
        >
          {/* Badge */}
          <div 
            style={{
              background: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '30px',
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0369a1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 8px rgba(14, 165, 233, 0.05)',
              animation: 'fade-in 0.6s ease'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🚀</span>
            <span>Complete Engineering Project Solutions</span>
          </div>

          {/* Headline */}
          <h1 
            style={{
              fontSize: '3.2rem',
              lineHeight: 1.15,
              color: '#0f172a',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: 0
            }}
            className="hero-main-title"
          >
            Build Your Engineering Career With <span style={{ background: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium Projects</span>, Roadmaps & Webinars
          </h1>

          {/* Subheading */}
          <p 
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#475569',
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              maxWidth: '620px',
              margin: 0
            }}
          >
            Access high-quality ECE, Embedded Systems, IoT, VLSI, and Final Year Project Resources. Learn faster with expert guidance, documentation, webinars, and career roadmaps.
          </p>

          {/* CTA Buttons */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '0.75rem',
              width: '100%'
            }}
          >
            <button 
              onClick={onExploreCatalog}
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#2563eb',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.3)',
                transition: 'transform var(--transition-fast), background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="pill-accent">Explore Projects</span>
              <ArrowRight size={16} className="pill-accent" />
            </button>

            <button 
              onClick={handleJoinWebinar}
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#94a3b8';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Video size={16} style={{ color: '#0ea5e9' }} />
              <span>Join Webinar</span>
            </button>
            
            <button 
              onClick={onRoadmapClick}
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(79, 70, 229, 0.05)',
                border: '1px solid rgba(79, 70, 229, 0.25)',
                color: 'var(--accent-purple)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={16} />
              <span>Career Roadmap (₹99)</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(226, 232, 240, 0.8)',
              width: '100%'
            }}
            className="hero-trust-metrics"
          >
            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: '#2563eb' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>500+</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Active Students</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} style={{ color: '#0ea5e9' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>100+</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Premium Projects</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', color: '#eab308' }}>
                <Star size={16} fill="#eab308" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>4.9★</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Course Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Workspace Illustration */}
        <div 
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'float 6s ease-in-out infinite'
          }}
          className="hero-illustration-container"
        >
          {/* Glassmorphic Frame */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)',
              padding: '1rem',
              overflow: 'hidden'
            }}
          >
            <img 
              src="/hero-illustration.png" 
              alt="CircuitCraft Studio 3D Workspace" 
              style={{
                width: '100%',
                borderRadius: '16px',
                display: 'block',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                objectFit: 'cover'
              }}
            />

            {/* Decorative float element - Waves */}
            <div 
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                padding: '0.5rem 0.75rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 2
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>Hardware Simulation Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Styled JSX for keyframe animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
          }
          .hero-grid > div {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-main-title {
            font-size: 2.3rem !important;
          }
          .hero-trust-metrics {
            justify-content: center !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
