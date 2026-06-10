import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Edit, Code, Rocket, ArrowRight, Wrench, BookOpen, Sparkles } from 'lucide-react';

export default function HeroSection({ onRoadmapClick, onExploreCatalog, onOpenStudyHub }) {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const slogan = "Transforming Engineering Ideas into Reality...";

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + slogan.charAt(index));
      index++;
      if (index >= slogan.length) {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // Canvas circuit background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 550;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid coordinates for nodes
    const nodes = [];
    const lines = [];
    const spacing = 50;

    // Initialize random nodes aligned to a grid
    for (let x = spacing; x < canvas.width; x += spacing * 2) {
      for (let y = spacing; y < canvas.height; y += spacing * 2) {
        if (Math.random() > 0.4) {
          nodes.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            radius: Math.random() * 3 + 1,
            pulse: Math.random() * Math.PI,
            pulseSpeed: Math.random() * 0.05 + 0.01,
            color: Math.random() > 0.5 ? '#00e5ff' : '#3b82f6'
          });
        }
      }
    }

    // Connect nodes with orthogonal paths (like circuit tracks)
    for (let i = 0; i < nodes.length; i++) {
      let count = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);
        
        // Connect if relatively close
        if ((dx < spacing * 2.2 && dy < 10) || (dy < spacing * 2.2 && dx < 10)) {
          lines.push({
            from: nodes[i],
            to: nodes[j],
            progress: 0,
            speed: Math.random() * 0.01 + 0.005,
            active: Math.random() > 0.7
          });
          count++;
          if (count > 2) break; // Limit tracks
        }
      }
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid dots faintly
      ctx.fillStyle = 'rgba(0, 229, 255, 0.03)';
      for (let x = 0; x < canvas.width; x += 40) {
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Draw circuit tracks
      ctx.lineWidth = 1;
      lines.forEach(line => {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(line.from.x, line.from.y);
        ctx.lineTo(line.to.x, line.to.y);
        ctx.stroke();

        // Animate electric charges flowing along lines
        if (line.active) {
          line.progress += line.speed;
          if (line.progress > 1) {
            line.progress = 0;
            line.active = Math.random() > 0.4;
          }

          const currentX = line.from.x + (line.to.x - line.from.x) * line.progress;
          const currentY = line.from.y + (line.to.y - line.from.y) * line.progress;

          ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00e5ff';
          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        } else if (Math.random() > 0.995) {
          line.active = true;
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulse) * 1.5;
        
        ctx.fillStyle = node.color;
        ctx.shadowBlur = currentRadius * 2;
        ctx.shadowColor = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const corePillars = [
    { icon: <Lightbulb size={16} />, label: "INNOVATE", color: "var(--accent-cyan)", glow: "var(--glow-cyan)" },
    { icon: <Edit size={16} />, label: "DESIGN", color: "var(--accent-blue)", glow: "var(--glow-blue)" },
    { icon: <Code size={16} />, label: "DEVELOP", color: "var(--accent-green)", glow: "var(--glow-green)" },
    { icon: <Rocket size={16} />, label: "DELIVER", color: "var(--accent-yellow)", glow: "0 0 15px rgba(251, 191, 36, 0.4)" }
  ];

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '550px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
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
        className="animate-slide-in"
      >
        {/* Subheader Badge */}
        <div 
          style={{
            background: 'rgba(0, 229, 255, 0.05)',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '20px',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            boxShadow: 'var(--glow-cyan)',
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
            fontSize: '4rem',
            lineHeight: 1.1,
            color: '#fff',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
            fontFamily: 'var(--font-display)'
          }}
        >
          CIRCUITCRAFT <span style={{ color: 'var(--accent-cyan)', textShadow: 'var(--glow-cyan)' }}>STUDIO</span>
        </h1>

        {/* Dynamic Typing Tagline */}
        <p 
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-secondary)',
            minHeight: '2rem',
            fontWeight: 400,
            maxWidth: '600px'
          }}
        >
          {typedText}
          <span 
            style={{ 
              display: 'inline-block',
              width: '2px', 
              height: '1.1em', 
              background: 'var(--accent-cyan)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite' 
            }}
          />
        </p>

        {/* Pillars (Innovate | Design | Develop | Deliver) */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            margin: '1.5rem 0'
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
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(4px)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = pillar.color;
                e.currentTarget.style.boxShadow = pillar.glow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span style={{ color: pillar.color }}>{pillar.icon}</span>
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
            gap: '1.25rem',
            marginTop: '1rem'
          }}
        >
          <button 
            onClick={onRoadmapClick}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
            }}
          >
            <Sparkles size={18} />
            Career Roadmap (₹99)
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={onOpenStudyHub}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
            className="glow-btn"
          >
            <BookOpen size={18} />
            VTU Notes / Study Hub
          </button>
          
          <button 
            onClick={onExploreCatalog}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Browse Solutions
          </button>
        </div>
      </div>
    </section>
  );
}
