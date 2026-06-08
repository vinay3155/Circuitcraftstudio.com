import React, { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber = '918123265315';
  const defaultMessage = 'Hello CircuitCraft Studio! I have a project inquiry.';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        color: '#fff',
        padding: isHovered && !isMobile ? '0.75rem 1.25rem' : '0.75rem',
        borderRadius: '50px',
        boxShadow: isHovered 
          ? '0 10px 25px rgba(37, 211, 102, 0.5), 0 0 15px rgba(37, 211, 102, 0.3)' 
          : '0 4px 15px rgba(37, 211, 102, 0.35)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        maxWidth: isHovered && !isMobile ? '260px' : '48px',
        height: '48px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
      aria-label="Chat With Project Expert"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Authentic WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style={{ flexShrink: 0 }}
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.432 2.502 1.159 3.473L6.545 18.23l2.887-.757a5.727 5.727 0 0 0 2.598.632h.002c3.181 0 5.769-2.587 5.77-5.768.001-3.18-2.587-5.765-5.771-5.765zm3.376 8.21c-.139.39-.701.716-1.056.779-.272.049-.623.078-1.745-.386-1.433-.593-2.338-2.049-2.409-2.144-.072-.096-.583-.775-.583-1.478 0-.703.366-1.049.497-1.19.13-.141.286-.176.38-.176.095 0 .19.001.273.005.087.004.204-.033.32.247.12.29.41 1.002.445 1.075.036.073.06.158.012.254-.048.096-.072.158-.144.242-.073.085-.154.188-.22.253-.073.073-.15.152-.064.299.085.147.38.627.816 1.015.563.501 1.037.657 1.184.73.147.073.232.061.319-.036.087-.096.372-.435.473-.584.1-.148.2-.124.339-.073.139.052.88.415 1.028.49.148.073.247.11.283.171.036.061.036.353-.103.743z" />
          <path d="M12.004 2c-5.517 0-9.998 4.47-10 9.977a9.914 9.914 0 0 0 1.35 4.978L2 22l5.176-1.348a9.914 9.914 0 0 0 4.825 1.244h.004c5.517 0 10.002-4.473 10.004-9.977C22.011 6.47 17.525 2 12.004 2zm0 16.502h-.003a8.204 8.204 0 0 1-4.043-1.066l-.291-.173-3.002.784.801-2.915-.19-.301a8.196 8.196 0 0 1-1.258-4.352c.003-4.529 3.693-8.213 8.22-8.213 2.193.001 4.255.855 5.805 2.408 1.55 1.552 2.402 3.615 2.401 5.807-.003 4.531-3.693 8.217-8.22 8.22z" />
        </svg>
        {isHovered && !isMobile && (
          <span
            style={{
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              animation: 'fade-in 0.2s ease',
              marginRight: '0.2rem'
            }}
          >
            Chat With Project Expert
          </span>
        )}
      </div>
    </a>
  );
}
