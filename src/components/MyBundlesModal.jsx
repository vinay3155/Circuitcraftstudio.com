import React, { useState, useEffect } from 'react';
import { Folder, FileText, Download, ShoppingBag, ShieldCheck, Cpu, Terminal, HardDrive, Info, Layout, Award, BookOpen, Video, Sparkles, AlertCircle } from 'lucide-react';

export default function MyBundlesModal({ isOpen, onClose }) {
  const [purchasedList, setPurchasedList] = useState([]);
  const [activeBundle, setActiveBundle] = useState(null);

  // Bundle metadata matching DigitalStore.jsx
  const bundleMeta = {
    'embedded': {
      title: 'Embedded Systems Bundle',
      icon: <Cpu size={20} style={{ color: 'var(--accent-purple)' }} />
    },
    'arduino-esp32': {
      title: 'Arduino & ESP32 Bundle',
      icon: <Terminal size={20} style={{ color: 'var(--accent-blue)' }} />
    },
    'iot': {
      title: 'IoT (Internet of Things) Bundle',
      icon: <HardDrive size={20} style={{ color: 'var(--accent-green)' }} />
    },
    'vlsi': {
      title: 'VLSI Master Bundle',
      icon: <Info size={20} style={{ color: 'var(--accent-yellow)' }} />
    },
    'system-design': {
      title: 'System Design & Arch Bundle',
      icon: <Layout size={20} style={{ color: 'var(--accent-cyan)' }} />
    },
    'dsa': {
      title: 'DSA & Coding Patterns Bundle',
      icon: <Terminal size={20} style={{ color: 'var(--accent-purple)' }} />
    },
    'fullstack': {
      title: 'Full-Stack Development Bundle',
      icon: <HardDrive size={20} style={{ color: 'var(--accent-blue)' }} />
    },
    'aiml': {
      title: 'AI & Machine Learning Bundle',
      icon: <Cpu size={20} style={{ color: 'var(--accent-green)' }} />
    },
    'hackathon': {
      title: 'Hackathon Winning Bundle',
      icon: <Award size={20} style={{ color: 'var(--accent-cyan)' }} />
    },
    'final-year': {
      title: 'Final Year Project Bundle',
      icon: <FileText size={20} style={{ color: 'var(--accent-purple)' }} />
    },
    'placement': {
      title: 'Placement Preparation Bundle',
      icon: <BookOpen size={20} style={{ color: 'var(--accent-blue)' }} />
    }
  };

  const tierMeta = {
    'starter': { name: 'Starter Bundle', price: 99 },
    'pro': { name: 'Pro Bundle', price: 300 },
    'ultimate': { name: 'Ultimate Bundle', price: 500 }
  };

  // Scan localStorage for purchased bundles
  const loadPurchases = () => {
    const list = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cc_purchased_bundle_')) {
        if (localStorage.getItem(key) === 'true') {
          // Key format: cc_purchased_bundle_[bundleId]_[tierId]
          const raw = key.replace('cc_purchased_bundle_', '');
          const lastUnderscore = raw.lastIndexOf('_');
          const bundleId = raw.substring(0, lastUnderscore);
          const tierId = raw.substring(lastUnderscore + 1);

          list.push({
            id: raw,
            bundleId,
            tierId,
            title: bundleMeta[bundleId]?.title || `${bundleId} Bundle`,
            tierName: tierMeta[tierId]?.name || `${tierId} Tier`,
            icon: bundleMeta[bundleId]?.icon || <Folder size={20} />
          });
        }
      }
    }
    setPurchasedList(list);
    if (list.length > 0 && !activeBundle) {
      setActiveBundle(list[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPurchases();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Get files available for download based on bundle and tier
  const getBundleFiles = (bundleId, tierId) => {
    // Standard file listing structure
    const files = [
      { name: '1. Project Source Code (C++/Verilog/Python)', size: '4.8 MB', type: 'code', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
      { name: '2. Academic Project Report Template', size: '2.1 MB', type: 'doc', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
      { name: '3. Presentation PPT Slides Template', size: '3.5 MB', type: 'slides', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' }
    ];

    if (tierId === 'pro' || tierId === 'ultimate') {
      files.push(
        { name: '4. Circuit Diagram & Wiring Mappings', size: '1.7 MB', type: 'circuit', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
        { name: '5. Assembly Video Tutorial Guide', size: '840 KB', type: 'video', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
        { name: '6. Viva Voce Q&A Cheat Sheet', size: '1.2 MB', type: 'doc', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' }
      );
    }

    if (tierId === 'ultimate') {
      files.push(
        { name: '7. Hackathon Pitch Deck & Execution Blueprint', size: '2.8 MB', type: 'pdf', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
        { name: '8. Placement Interview Core Q&A Preparation Kit', size: '5.2 MB', type: 'pdf', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' },
        { name: '9. Priority WhatsApp Developer Support Access.txt', size: '4 KB', type: 'text', file: 'Embedded_Engineer_2_Year_Roadmap.pdf' }
      );
    }

    return files;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.3s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          height: '80vh',
          maxHeight: '650px',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Folder size={22} style={{ color: 'var(--accent-blue)' }} />
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, margin: 0 }}>
              My Purchased Bundles
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.6rem',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }} className="bundles-modal-body">
          {purchasedList.length === 0 ? (
            /* Empty State */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(37, 99, 235, 0.05)',
                  border: '1px dashed var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <ShoppingBag size={36} style={{ color: 'var(--accent-blue)', opacity: 0.8 }} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#fff' }}>No Purchased Bundles Yet</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '380px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Unlock ready-to-run firmware project files, circuit maps, PPT presentations, and comprehensive report documents directly in the Digital Store.
              </p>
              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById('store');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glow-btn"
                style={{ padding: '0.65rem 1.5rem', borderRadius: '30px', fontSize: '0.85rem' }}
              >
                Explore Digital Store
              </button>
            </div>
          ) : (
            /* Active Purchases Panel */
            <>
              {/* Left sidebar: list of purchased packages */}
              <div
                style={{
                  width: '280px',
                  borderRight: '1px solid var(--border-color)',
                  background: 'rgba(5, 7, 12, 0.15)',
                  overflowY: 'auto',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textAlign: 'left'
                }}
                className="bundles-sidebar"
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem', marginBottom: '0.25rem' }}>
                  Purchased Products
                </span>
                {purchasedList.map((bundle) => {
                  const isActive = activeBundle && activeBundle.id === bundle.id;
                  return (
                    <button
                      key={bundle.id}
                      onClick={() => setActiveBundle(bundle)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                        border: '1px solid',
                        borderColor: isActive ? 'rgba(37, 99, 235, 0.3)' : 'transparent',
                        color: isActive ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>{bundle.icon}</div>
                      <div style={{ overflow: 'hidden' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {bundle.title}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                          {bundle.tierName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right panel: directory files manager */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                {activeBundle && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem', color: '#fff' }}>{activeBundle.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', background: 'rgba(37, 99, 235, 0.08)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(37, 99, 235, 0.15)', fontWeight: 600 }}>
                          🔑 Unlocked • {activeBundle.tierName} Access
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                        <ShieldCheck size={16} /> Secured Download
                      </div>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                      Click on any file listed below to download the locked engineering directory bundle files directly. All files compile and interface with microcontrollers out-of-the-box.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                      {getBundleFiles(activeBundle.bundleId, activeBundle.tierId).map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '0.85rem 1rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <FileText size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                            <div>
                              <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500, display: 'block' }}>
                                {file.name}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                Size: {file.size} • format: PDF
                              </span>
                            </div>
                          </div>
                          
                          <a
                            href={`/downloads/${file.file}`}
                            download={file.name + '.pdf'}
                            style={{
                              background: 'rgba(0, 229, 255, 0.08)',
                              border: '1px solid rgba(0, 229, 255, 0.2)',
                              color: 'var(--accent-cyan)',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              textDecoration: 'none',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--accent-cyan)';
                              e.currentTarget.style.color = '#05070c';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)';
                              e.currentTarget.style.color = 'var(--accent-cyan)';
                            }}
                          >
                            <Download size={14} /> Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes scale-up {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @media (max-width: 768px) {
            .bundles-modal-body {
              flex-direction: column !important;
            }
            .bundles-sidebar {
              width: 100% !important;
              max-height: 150px !important;
              border-right: none !important;
              border-bottom: 1px solid var(--border-color) !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
