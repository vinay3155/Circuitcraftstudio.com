import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    src: '/gallery-1.jpg',
    title: 'Hardware Component Lab',
    category: 'Circuit Prototyping',
    desc: 'High-precision Arduino microcontroller layouts, sensor wiring, and prototype board planning.',
    gridClass: 'col-7'
  },
  {
    id: 2,
    src: '/gallery-2.png',
    title: 'Smart Obstacle Rover',
    category: 'Robotics',
    desc: 'A 4-wheel drive DIY intelligent robotic car with ultrasonic sensors and Arduino core.',
    gridClass: 'col-5'
  },
  {
    id: 3,
    src: '/gallery-3.jpg',
    title: 'Smart India Hackathon',
    category: 'Hackathons',
    desc: 'Presenting CircuitCraft innovations live at the national stage during SIH hackathon.',
    gridClass: 'col-4'
  },
  {
    id: 4,
    src: '/gallery-4.jpg',
    title: 'Technical Judging Session',
    category: 'Presentations',
    desc: 'Explaining bare-metal firmware controls and IoT telemetries to the panel of experts.',
    gridClass: 'col-4'
  },
  {
    id: 5,
    src: '/gallery-5.png',
    title: 'SIH National Recognition',
    category: 'Achievements',
    desc: 'Celebrating excellence at SIH 2025, validating our high-fidelity engineering models.',
    gridClass: 'col-4'
  }
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable body scroll when lightbox is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateNext = () => {
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const navigatePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  return (
    <section 
      id="gallery" 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      {/* Heading Group */}
      <div style={{ marginBottom: '3.5rem' }}>
        <span 
          style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)'
          }}
        >
          Project Showcase
        </span>
        <h2 
          style={{ 
            fontSize: '2.5rem', 
            color: '#fff', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)' 
          }}
        >
          Excellence in Action
        </h2>
        <p 
          style={{ 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}
        >
          Explore our hands-on hardware prototypes, design sessions, and recognized achievements at national hackathons.
        </p>
      </div>

      {/* Grid Container */}
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div 
            key={item.id}
            onClick={() => openLightbox(index)}
            className={`gallery-card ${item.gridClass}`}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              transition: 'all var(--transition-normal)'
            }}
          >
            {/* Image */}
            <img 
              src={item.src} 
              alt={item.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease'
              }}
              className="gallery-img"
            />

            {/* Glassmorphic Hover Overlay */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(10, 14, 23, 0.9) 0%, rgba(10, 14, 23, 0.4) 60%, transparent 100%)',
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
                textAlign: 'left',
                transition: 'opacity 0.3s ease',
                zIndex: 2
              }}
              className="gallery-overlay"
            >
              {/* Zoom Icon */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 229, 255, 0.2)',
                  border: '1px solid var(--accent-cyan)',
                  borderRadius: '50%',
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)'
                }}
              >
                <ZoomIn size={16} />
              </div>

              {/* Text metadata */}
              <span 
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.25rem'
                }}
              >
                {item.category}
              </span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.4rem', fontWeight: 600 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Portal */}
      {lightboxIndex !== null && (
        <div 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 14, 23, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fade-in 0.3s ease'
          }}
        >
          {/* Close Trigger */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              padding: '0.6rem',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <X size={20} />
          </button>

          {/* Left Arrow Trigger */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              padding: '0.8rem',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image Container with text details */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <img 
              src={galleryItems[lightboxIndex].src} 
              alt={galleryItems[lightboxIndex].title} 
              style={{
                maxHeight: '70vh',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                boxShadow: '0 10px 30px rgba(0, 229, 255, 0.15)'
              }}
            />
            {/* Caption Info Block */}
            <div 
              style={{
                width: '100%',
                marginTop: '1.25rem',
                textAlign: 'center',
                color: '#fff'
              }}
            >
              <span 
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--accent-cyan)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}
              >
                {galleryItems[lightboxIndex].category}
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '0.25rem 0 0.5rem', fontFamily: 'var(--font-display)' }}>
                {galleryItems[lightboxIndex].title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
                {galleryItems[lightboxIndex].desc}
              </p>
              <div 
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                {lightboxIndex + 1} / {galleryItems.length}
              </div>
            </div>
          </div>

          {/* Right Arrow Trigger */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateNext(); }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              padding: '0.8rem',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Embedded CSS grid and animations */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }

        /* Desktop Column Spanning styles */
        .col-7 {
          grid-column: span 7;
          height: 380px;
        }
        .col-5 {
          grid-column: span 5;
          height: 380px;
        }
        .col-4 {
          grid-column: span 4;
          height: 280px;
        }

        /* Hover animation triggers */
        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1 !important;
        }

        /* Tablet Viewport */
        @media (max-width: 992px) {
          .col-7, .col-5, .col-4 {
            grid-column: span 6 !important;
            height: 300px !important;
          }
          /* Make the last odd card span full width on tablet */
          .col-4:last-child {
            grid-column: span 12 !important;
          }
        }

        /* Mobile Viewport */
        @media (max-width: 768px) {
          .gallery-grid {
            gap: 1rem;
          }
          .col-7, .col-5, .col-4 {
            grid-column: span 12 !important;
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
