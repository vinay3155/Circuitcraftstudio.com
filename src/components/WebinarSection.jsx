import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, User, ArrowUpRight, PlayCircle, Award, CheckCircle } from 'lucide-react';

export default function WebinarSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate dynamic countdown (e.g. always scheduled for 3 days in the future at 6:00 PM IST)
  useEffect(() => {
    const getTargetDate = () => {
      const target = new Date();
      // Add 3 days
      target.setDate(target.getDate() + 3);
      // Set to 6:00 PM
      target.setHours(18, 0, 0, 0);
      return target;
    };

    const targetDate = getTargetDate();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterWebinar = () => {
    const text = `Hello CircuitCraft! 🚀\nI want to register for the upcoming technical webinar "Mastering RTOS & Embedded Systems". Please share the registration link and entry pass.`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleWatchRecording = (title) => {
    const text = `Hello CircuitCraft! 🚀\nI am interested in watching the webinar recording for "${title}". Please share the recording link.`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
  };

  const pastWebinars = [
    {
      title: 'Bare-Metal Register Programming on ARM Cortex-M4',
      duration: '1.5 Hours',
      speaker: 'Vinay Bodravla',
      views: '1.2k views',
      date: 'May 14, 2026'
    },
    {
      title: 'FPGA Prototyping & Verilog Synthesis Patterns',
      duration: '2.5 Hours',
      speaker: 'Subramanya Sondur',
      views: '940 views',
      date: 'May 28, 2026'
    },
    {
      title: 'CAN Bus Protocol in Automotive & Industrial Networking',
      duration: '2 Hours',
      speaker: 'Vinay Bodravla',
      views: '1.8k views',
      date: 'June 05, 2026'
    }
  ];

  return (
    <section 
      id="webinars"
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span 
            style={{
              background: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.25)',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-purple)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Live Expert Guidance
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
            Upcoming Technical Webinars
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Join our live interactive coding workshops. Build projects, ask questions, and secure placement roadmaps.
          </p>
        </div>

        {/* Live Countdown & Event Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(0, 86, 210, 0.06) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="webinar-hero"
        >
          {/* Left: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div 
              style={{ 
                background: '#ef4444', 
                color: '#fff', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                padding: '0.3rem 0.65rem', 
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                animation: 'pulse 2s infinite'
              }}
            >
              • Live Workshop
            </div>
            
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1.25, margin: 0, color: 'var(--text-primary)' }}>
              Mastering RTOS & Embedded Systems: Concurrency, Timers & Task Schedulers
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Learn how to write firmware in FreeRTOS on STM32 microcontrollers. Master semaphores, queues, and task prioritization from register definitions to final hardware signals.
            </p>

            {/* Event Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Calendar size={16} style={{ color: '#0056d2' }} />
                <span><strong>Date:</strong> 3 days from now (Saturday at 6:00 PM IST)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <User size={16} style={{ color: 'var(--accent-purple)' }} />
                <span><strong>Presenter:</strong> Vinay Bodravla (Founder & Embedded Architect)</span>
              </div>
            </div>

            <button
              onClick={handleRegisterWebinar}
              style={{
                padding: '0.8rem 2.2rem',
                borderRadius: '30px',
                background: '#0056d2',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 20px -5px rgba(0, 86, 210, 0.3)',
                transition: 'background var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0043a4'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0056d2'}
            >
              <span>Register Now (Free)</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Right: Countdown */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '1.5rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Registration Closes In
            </span>
            
            {/* Ticking Numbers */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {/* Days */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0056d2', fontFamily: 'var(--font-display)', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '10px', minWidth: '70px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.4rem' }}>Days</span>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0056d2', fontFamily: 'var(--font-display)', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '10px', minWidth: '70px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.4rem' }}>Hours</span>
              </div>

              {/* Minutes */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0056d2', fontFamily: 'var(--font-display)', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '10px', minWidth: '70px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.4rem' }}>Mins</span>
              </div>

              {/* Seconds */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-display)', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '10px', minWidth: '70px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.4rem' }}>Secs</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle size={14} />
              <span>Free verified completion certificate provided</span>
            </div>
          </div>
        </div>

        {/* Recorded Webinars Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
              Recorded Webinar Library
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
              Missed a live event? Watch the recordings here
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}
            className="recordings-grid"
          >
            {pastWebinars.map((webinar) => (
              <div 
                key={webinar.title}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="webinar-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '10px', color: '#ef4444' }}>
                    <PlayCircle size={22} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {webinar.date}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, margin: 0 }}>
                  {webinar.title}
                </h4>

                {/* Metadata */}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span><strong>Duration:</strong> {webinar.duration}</span>
                  <span>•</span>
                  <span><strong>Speaker:</strong> {webinar.speaker}</span>
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => handleWatchRecording(webinar.title)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.55rem 0',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 86, 210, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(0, 86, 210, 0.2)';
                    e.currentTarget.style.color = '#0056d2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Request Watch Link
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .webinar-card:hover {
          border-color: #0056d2 !important;
        }
        @media (max-width: 968px) {
          .webinar-hero {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
