import React, { useState } from 'react';
import { X, Cpu, Award, PlayCircle, Download, BookOpen, Clock, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentDashboardModal({ isOpen, onClose, currentUser, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'certificates', 'webinars', 'downloads'

  if (!isOpen) return null;

  // Render Login Call to Action if not logged in
  if (!currentUser) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 110,
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
            maxWidth: '420px',
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-primary)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Lock size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'block', margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            Dashboard Locked
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.75rem' }}>
            Please sign in or register a profile first to access your courses, progress tracking, webinar links, and certificate registry.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              style={{
                flex: 1,
                padding: '0.7rem',
                borderRadius: '30px',
                background: '#0056d2',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.7rem',
                borderRadius: '30px',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const courses = [
    { name: 'Mastering RTOS: Hands on FreeRTOS and STM32Fx with MCU', progress: 75, status: 'Active', lessons: '136/182 lessons completed' },
    { name: 'Embedded Systems Bootcamp: RTOS, IoT, AI, Vision and FPGA', progress: 30, status: 'Active', lessons: '88/295 lessons completed' },
    { name: 'Mastering Microcontroller: Timers, PWM, CAN, Low Power & DMA', progress: 0, status: 'Not Started', lessons: '0/124 lessons completed' },
    { name: 'Embedded Systems Programming on ARM Cortex-M3/M4 MCU', progress: 0, status: 'Not Started', lessons: '0/210 lessons completed' }
  ];

  const certificates = [
    { id: 'CC-E70A-F56B-883F', course: 'Embedded Systems Bootcamp: RTOS, IoT, AI, Vision and FPGA', date: 'June 02, 2026', verificationLink: 'https://circuitcraftstudio.shop' },
    { id: 'CC-D98B-C11A-304E', course: 'Mastering RTOS: Hands on FreeRTOS and STM32Fx with MCU', date: 'Pending completion', pending: true }
  ];

  const downloads = [
    { name: 'FreeRTOS Core Task Scheduling & Semaphore Guide.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'STM32 register-level peripheral drivers templates.zip', size: '15.8 MB', type: 'zip' },
    { name: 'ARM Cortex M4 interrupt mapping schematic.pdf', size: '1.1 MB', type: 'pdf' },
    { name: 'CAN transceiver wiring board mapping.jpg', size: '940 KB', type: 'image' }
  ];

  const handleDownloadFile = (fileName) => {
    // Tapping downloads will trigger a demo alert file save
    alert(`Starting download: ${fileName}\nAll source codes and resource files are securely hosted on CircuitCraft S3 node.`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 110,
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
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          color: 'var(--text-primary)',
          textAlign: 'left',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-tertiary)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0056d2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Hub
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Welcome back, {currentUser.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dashboard Tabs & Content Area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }} className="dashboard-layout">
          
          {/* Sidebar Tabs */}
          <div 
            style={{ 
              width: '200px', 
              borderRight: '1px solid var(--border-color)', 
              background: 'var(--bg-tertiary)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem 0'
            }}
            className="dashboard-sidebar"
          >
            {/* Tab 1: Courses */}
            <button
              onClick={() => setActiveTab('courses')}
              style={{
                background: activeTab === 'courses' ? 'rgba(0, 86, 210, 0.06)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === 'courses' ? '3px solid #0056d2' : '3px solid transparent',
                color: activeTab === 'courses' ? '#0056d2' : 'var(--text-secondary)',
                fontWeight: activeTab === 'courses' ? 700 : 500,
                textAlign: 'left',
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%'
              }}
            >
              <Cpu size={16} />
              <span>My Courses</span>
            </button>

            {/* Tab 2: Certificates */}
            <button
              onClick={() => setActiveTab('certificates')}
              style={{
                background: activeTab === 'certificates' ? 'rgba(0, 86, 210, 0.06)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === 'certificates' ? '3px solid #0056d2' : '3px solid transparent',
                color: activeTab === 'certificates' ? '#0056d2' : 'var(--text-secondary)',
                fontWeight: activeTab === 'certificates' ? 700 : 500,
                textAlign: 'left',
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%'
              }}
            >
              <Award size={16} />
              <span>Certificates</span>
            </button>

            {/* Tab 3: Webinars */}
            <button
              onClick={() => setActiveTab('webinars')}
              style={{
                background: activeTab === 'webinars' ? 'rgba(0, 86, 210, 0.06)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === 'webinars' ? '3px solid #0056d2' : '3px solid transparent',
                color: activeTab === 'webinars' ? '#0056d2' : 'var(--text-secondary)',
                fontWeight: activeTab === 'webinars' ? 700 : 500,
                textAlign: 'left',
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%'
              }}
            >
              <PlayCircle size={16} />
              <span>Webinar Access</span>
            </button>

            {/* Tab 4: Downloads */}
            <button
              onClick={() => setActiveTab('downloads')}
              style={{
                background: activeTab === 'downloads' ? 'rgba(0, 86, 210, 0.06)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === 'downloads' ? '3px solid #0056d2' : '3px solid transparent',
                color: activeTab === 'downloads' ? '#0056d2' : 'var(--text-secondary)',
                fontWeight: activeTab === 'downloads' ? 700 : 500,
                textAlign: 'left',
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%'
              }}
            >
              <Download size={16} />
              <span>Downloads</span>
            </button>
          </div>

          {/* Content Pane */}
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Courses View */}
            {activeTab === 'courses' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Your Learning Progress</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {courses.map((course) => (
                    <div 
                      key={course.name}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{course.name}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        <span>{course.lessons}</span>
                        <span>{course.progress}% completed</span>
                      </div>
                      
                      {/* Progress Bar container */}
                      <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${course.progress}%`, height: '100%', background: '#0056d2', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates View */}
            {activeTab === 'certificates' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Earned Credentials</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {certificates.map((cert) => (
                    <div 
                      key={cert.id}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{cert.course}</h4>
                        {cert.pending ? (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={12} />
                            Complete syllabus timeline to unlock
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={12} />
                            ID: {cert.id} (Verified Registry)
                          </span>
                        )}
                      </div>

                      {!cert.pending && (
                        <button
                          onClick={() => alert(`Certificate ID: ${cert.id}\nStudent: ${currentUser.name}\nStatus: Verified ✅`)}
                          style={{
                            background: '#0056d2',
                            border: 'none',
                            color: '#fff',
                            padding: '0.45rem 1rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Verify Certificate
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Webinars View */}
            {activeTab === 'webinars' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Upcoming Live Streams</h3>
                <div 
                  style={{
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.04) 0%, rgba(0, 86, 210, 0.04) 100%)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <PlayCircle size={36} style={{ color: 'var(--accent-purple)' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Mastering RTOS & Embedded Systems
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '400px', lineHeight: 1.5 }}>
                    Your next live stream session starts in 3 days. Join with your student login to participate in code execution labs and ask questions.
                  </p>
                  
                  <button
                    onClick={() => window.open('https://zoom.us', '_blank')}
                    style={{
                      background: 'var(--accent-purple)',
                      border: 'none',
                      color: '#fff',
                      padding: '0.55rem 1.5rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '0.5rem'
                    }}
                  >
                    Join Zoom Classroom
                  </button>
                </div>
              </div>
            )}

            {/* Downloads View */}
            {activeTab === 'downloads' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Course Files & Resources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {downloads.map((file) => (
                    <div 
                      key={file.name}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.75rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{file.size} • {file.type.toUpperCase()} File</span>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0056d2',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.25rem'
                        }}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .dashboard-layout {
            flex-direction: column !important;
          }
          .dashboard-sidebar {
            width: 100% !important;
            flex-direction: row !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border-color) !important;
            overflow-x: auto !important;
            padding: 0.5rem !important;
          }
          .dashboard-sidebar button {
            padding: 0.5rem 1rem !important;
            border-left: none !important;
            border-bottom: 2px solid transparent !important;
            white-space: nowrap !important;
          }
          .dashboard-sidebar button[style*="border-left"] {
            border-bottom: 2px solid #0056d2 !important;
          }
        }
      `}</style>
    </div>
  );
}
