import React from 'react';
import { Star, Quote, GraduationCap } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ananya R.',
      college: 'RV College of Engineering (RVCE)',
      course: 'ESP32 IoT Bootcamp',
      rating: 5,
      text: "The hardware blueprints and code templates saved me weeks of troubleshooting. I built my entire final year project using CircuitCraft's PCB templates!"
    },
    {
      name: 'Abhishek K.',
      college: 'BMS Institute of Technology (BMSIT)',
      course: 'Mastering RTOS & FreeRTOS',
      rating: 5,
      text: "FreeRTOS task scheduling concepts finally clicked when I followed the register-level DMA debugging tutorials. Vinay's support in the WhatsApp chat is incredibly helpful!"
    },
    {
      name: 'Divya N.',
      college: 'Visvesvaraya Technological University (VTU)',
      course: 'VLSI Placement Roadmap',
      rating: 5,
      text: "The Verilog synthesis guides and career roadmap helped me prepare for my core company placements. Secured a role as an FPGA intern!"
    },
    {
      name: 'Karthik S.',
      college: 'M. S. Ramaiah Institute of Technology (MSRIT)',
      course: 'ARM Cortex Fundamentals',
      rating: 5,
      text: "Interrupt mapping and bare-metal programming on ARM Cortex-M4 was incredibly detailed. Highly recommend the microcontroller courses for ECE students."
    }
  ];

  return (
    <section 
      id="testimonials"
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span 
            style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Student Testimonials
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
            What Our Students Say
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Hear from engineering graduates and students who upgraded their careers using CircuitCraft's practical modules.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                transition: 'border-color var(--transition-fast)'
              }}
              className="testimonial-card"
            >
              {/* Quote Mark */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  color: 'rgba(0, 86, 210, 0.08)'
                }}
              >
                <Quote size={40} />
              </div>

              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.15rem' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-yellow)" color="var(--accent-yellow)" />
                ))}
              </div>

              {/* Content Text */}
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, flex: 1, position: 'relative', zIndex: 1 }}>
                "{t.text}"
              </p>

              {/* Student Bio */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(0, 86, 210, 0.06)', borderRadius: '50%', color: '#0056d2' }}>
                  <GraduationCap size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.college}</span>
                  <span style={{ fontSize: '0.7rem', color: '#0056d2', fontWeight: 600, marginTop: '0.1rem' }}>{t.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .testimonial-card:hover {
          border-color: #0056d2 !important;
        }
      `}</style>
    </section>
  );
}
