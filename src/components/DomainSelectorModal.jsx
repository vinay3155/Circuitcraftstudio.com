import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Sparkles, Unlock } from 'lucide-react';

export default function DomainSelectorModal({ isOpen, onClose, onConfirm, unlockedRoadmaps = {} }) {
  const [selectedId, setSelectedId] = useState(null);
  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const domains = [
    {
      id: 'sde',
      title: 'Software Engineer (SDE)',
      desc: 'LeetCode coding patterns, System Design, Operating Systems, DBMS & OOP core prep.',
      services: [
        'Complete SDE placement roadmap (Step-by-step)',
        'Top 50 LeetCode coding patterns index',
        'System Design & scalability crash guide',
        '1-on-1 Mock coding interview session via WhatsApp booking'
      ]
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      desc: 'Modern web architectures: React, Next.js, Node.js databases, serverless, and cloud hosting.',
      services: [
        'Full Stack curriculum & project blueprints',
        'Prisma/PostgreSQL database cheat-sheets',
        'Next.js clean architecture boilerplate template',
        '1-on-1 Portfolio review & project mock session'
      ]
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      desc: 'APIs, WebSockets, relational databases indexing, microservices, and high-load backend scaling.',
      services: [
        'API Design guidelines (REST & gRPC)',
        'Database query optimization & indexing strategies',
        'Microservices connection templates',
        '1-on-1 Backend architecture mock assessment'
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Developer',
      desc: 'High-performance UI layouts, React rendering internals, state management, and modern CSS.',
      services: [
        'Advanced React hooks & state rendering roadmap',
        'CSS grid, flexbox, and micro-animations templates',
        'Lighthouse audit UI optimization checklist',
        '1-on-1 Frontend coding review simulation'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile App Developer',
      desc: 'Cross-platform mobile frameworks: React Native, Flutter, and native Android/iOS deployment guides.',
      services: [
        'React Native & Flutter study paths',
        'Mobile layouts & local data storage setup guides',
        'Google Play Store & Apple App Store checklist',
        '1-on-1 Mobile app design mock checkup'
      ]
    },
    {
      id: 'datascience',
      title: 'Data Science & Analytics',
      desc: 'Python Pandas/NumPy, SQL scripting, Excel dashboards, data visualization, and statistics.',
      services: [
        'Data analysis & dashboard building roadmap',
        'Advanced SQL queries & joints master guide',
        'Jupyter notebook automation templates',
        '1-on-1 Case study analytics mock review'
      ]
    },
    {
      id: 'aiml',
      title: 'Artificial Intelligence & ML',
      desc: 'Supervised/Unsupervised models, Neural networks, PyTorch, and local Edge-AI model deployment.',
      services: [
        'Machine Learning & Deep Learning path guides',
        'PyTorch CNN image classification templates',
        'TensorFlow Lite local microcontrollers setups',
        '1-on-1 ML architecture math review session'
      ]
    },
    {
      id: 'vlsi',
      title: 'VLSI Design',
      desc: 'Digital circuits, Verilog/VHDL logic design, FPGA prototyping, and ASIC synthesis pipelines.',
      services: [
        'VLSI custom logic synthesis roadmap',
        'Pipelined ALU design Verilog templates',
        'Timing constraints (.xdc) & setup/hold master guide',
        '1-on-1 Hardware description logic mock interview'
      ]
    },
    {
      id: 'embedded',
      title: 'Embedded Systems',
      desc: 'Bare-metal C code pointers, FreeRTOS tasks/mutexes, peripheral interfacing (I2C/SPI), and device drivers.',
      services: [
        'Embedded C registers & interrupt handlers guide',
        'FreeRTOS task synchronization telemetry templates',
        'STM32 & ESP32 firmware config templates',
        '1-on-1 Low-level firmware debugging mock session'
      ]
    },
    {
      id: 'pcb',
      title: 'PCB Design & Hardware',
      desc: 'Schematic routing, multi-layer high frequency boards, KiCad libraries, and signal integrity testing.',
      services: [
        'Schematic design & routing guidelines',
        'Altium & KiCad footprint creation templates',
        'Power plane & signal shielding checklists',
        '1-on-1 Schematic design review verification'
      ]
    }
  ];

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const currentSelection = domains.find(d => d.id === selectedId);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 14, 23, 0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: 'var(--bg-secondary)',
          border: '1.5px solid var(--border-color)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 35px rgba(0, 0, 0, 0.5)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-purple)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Choose Your Career Path Domain
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Main Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Select your preferred industry focus. Unlocking this domain gives you active lifetime access to its specific roadmap, templates, and WhatsApp mock interviews.
          </p>

          {!selectedId ? (
            /* DOMAIN SELECTION GRID */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {domains.map((domain) => {
                const isUnlocked = !!unlockedRoadmaps[domain.id];
                return (
                  <div
                    key={domain.id}
                    onClick={() => setSelectedId(domain.id)}
                    style={{
                      padding: '1.25rem',
                      background: 'var(--bg-tertiary)',
                      border: isUnlocked ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isUnlocked ? 'var(--accent-green)' : 'var(--accent-purple)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isUnlocked ? 'var(--accent-green)' : 'var(--border-color)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {isUnlocked && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: 'var(--accent-green)',
                          background: 'rgba(16, 185, 129, 0.08)',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          border: '1px solid rgba(16, 185, 129, 0.2)'
                        }}
                      >
                        <Unlock size={10} /> Active
                      </div>
                    )}

                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', paddingRight: isUnlocked ? '55px' : '0' }}>
                      {domain.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      {domain.desc}
                    </p>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: isUnlocked ? 'var(--accent-green)' : 'var(--accent-purple)', fontWeight: 600 }}>
                      {isUnlocked ? 'View Roadmap' : 'Select Domain'} <ArrowRight size={12} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* DETAILED DOMAIN VIEW & CHECKOUT PROMPT */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              
              <button
                onClick={() => setSelectedId(null)}
                style={{
                  width: 'fit-content',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-purple)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ← Back to all domains
              </button>

              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  border: '1.5px solid ' + (unlockedRoadmaps[currentSelection.id] ? 'var(--accent-green)' : 'var(--accent-purple)'),
                  background: 'var(--bg-tertiary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.75rem', color: unlockedRoadmaps[currentSelection.id] ? 'var(--accent-green)' : 'var(--accent-purple)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Target Domain Selection
                  </span>
                  {unlockedRoadmaps[currentSelection.id] && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Unlock size={14} /> YOU HAVE LIFETIME ACCESS
                    </span>
                  )}
                </div>
                
                <h4 style={{ fontSize: '1.6rem', color: '#fff', margin: '0.5rem 0 1rem 0' }}>
                  {currentSelection.title}
                </h4>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {currentSelection.desc}
                </p>

                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  Included Services & Roadmaps:
                </h5>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {currentSelection.services.map((service, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <CheckCircle size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{service}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing and Proceed button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    {unlockedRoadmaps[currentSelection.id] ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                        Active on this device
                      </span>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹99</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹499</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600, display: 'block' }}>
                          Lifetime Track Access • 80% discount active
                        </span>
                      </>
                    )}
                  </div>

                  {unlockedRoadmaps[currentSelection.id] ? (
                    <button
                      onClick={() => onConfirm(currentSelection.id, true)}
                      className="glow-btn"
                      style={{
                        padding: '0.75rem 2rem',
                        borderRadius: '30px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%)',
                        boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      Open Roadmap Dashboard <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => onConfirm(currentSelection.id, false, currentSelection.title)}
                      className="glow-btn"
                      style={{
                        padding: '0.75rem 2rem',
                        borderRadius: '30px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <ShieldCheck size={18} /> Unlock This Track <ArrowRight size={16} />
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
