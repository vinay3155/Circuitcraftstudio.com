import React from 'react';
import { Target, Eye, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  const team = [
    {
      name: 'Vinay N',
      role: 'Founder & Lead Embedded Architect',
      bio: 'Former systems designer specializing in firmware optimization, hardware prototyping, and low-level C programming. Passionate about reforming ECE curriculum with hands-on lab execution.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Nandish',
      role: 'Co-Founder & Lead VLSI/FPGA Engineer',
      bio: 'Specialist in digital design logic, Verilog HDL synthesis, and FPGA prototyping architectures. Committed to simplifying complex chip design roadmaps for engineering graduates.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    }
  ];

  return (
    <section 
      id="about"
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Graphic Grid */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(0, 86, 210, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span 
            style={{
              background: 'rgba(0, 86, 210, 0.08)',
              border: '1px solid rgba(0, 86, 210, 0.25)',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#0056d2',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            People Trust People, Not Websites
          </span>
          <h2 
            style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)',
              marginTop: '1rem',
              letterSpacing: '-0.03em'
            }}
          >
            Why CircuitCraft Exists
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.6' }}>
            We bridge the massive gap between theoretical university engineering syllabi and actual industry requirements in hardware, firmware, and chip design.
          </p>
        </div>

        {/* Mission & Vision Card Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
          className="about-grid"
        >
          {/* Card 1: Mission */}
          <div 
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
            }}
          >
            <div style={{ display: 'inline-flex', padding: '0.75rem', background: 'rgba(0, 86, 210, 0.06)', borderRadius: '12px', color: '#0056d2', marginBottom: '1.25rem' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Our Mission</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              To democratize technical hardware development education. We provide high-quality ECE, Embedded Systems, IoT, and VLSI project blueprints, source codes, and direct mentor support to help students build real-world careers.
            </p>
          </div>

          {/* Card 2: Vision */}
          <div 
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
            }}
          >
            <div style={{ display: 'inline-flex', padding: '0.75rem', background: 'rgba(79, 70, 229, 0.06)', borderRadius: '12px', color: 'var(--accent-purple)', marginBottom: '1.25rem' }}>
              <Eye size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Our Vision</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              To become the default practical hub for engineering students globally. We envision an education model where theoretical test benches are replaced by hardware prototypes, simulation rigs, and verified industrial credentials.
            </p>
          </div>
        </div>

        {/* Founder & Team Segment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
              Meet Our Team
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
              Learn from engineers with hands-on development experience
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '2rem'
            }}
            className="team-grid"
          >
            {team.map((member) => (
              <div 
                key={member.name}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="team-card"
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '1px solid var(--border-color)',
                    flexShrink: 0
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {member.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0056d2', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {member.role}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0.25rem 0 0 0' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .team-card:hover {
          border-color: #0056d2 !important;
        }
        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr !important;
          }
          .team-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
