import React, { useState } from 'react';
import { Cpu, CheckCircle2, MessageSquare, BookOpen, AlertCircle, ShoppingCart, Info, Award, Layout, HelpCircle, HardDrive, FileText, Video, Sparkles, Terminal } from 'lucide-react';

export default function DigitalStore({ onAddToCart }) {
  const [selectedBundle, setSelectedBundle] = useState(null);
  
  const bundles = [
    {
      id: 'embedded',
      title: 'Embedded Systems Bundle',
      description: 'Master 8051, ARM, STM32, and RTOS development with ready-to-run files and schematics.',
      details: [
        '8051 Projects & source code libraries',
        'ARM & STM32 HAL/Bare-Metal Projects',
        'ESP32 wireless connectivity templates',
        'Real-Time Operating Systems (RTOS) basics',
        'Comprehensive Sensor Interfacing Guides'
      ],
      icon: <Cpu size={24} style={{ color: 'var(--accent-purple)' }} />,
      popular: true
    },
    {
      id: 'arduino-esp32',
      title: 'Arduino & ESP32 Bundle',
      description: 'Perfect for fast prototyping. Includes source codes, circuit mappings, and libraries.',
      details: [
        'Arduino Uno/Nano Projects catalog',
        'ESP32 NodeMCU Wi-Fi/BLE code frameworks',
        'Embedded C source code directories',
        'Python automation scripts',
        'Sensor & Actuator wiring guides'
      ],
      icon: <Terminal size={24} style={{ color: 'var(--accent-blue)' }} />
    },
    {
      id: 'iot',
      title: 'IoT (Internet of Things) Bundle',
      description: 'Full-stack cloud-connected systems integrating Blynk, ThingsSpeak, and local databases.',
      details: [
        'Smart Home Automation code base',
        'Smart Agriculture telemetry scripts',
        'Wearable Health Monitoring code',
        'Industrial IoT warning systems',
        'ThingsSpeak/Blynk dashboard instructions'
      ],
      icon: <HardDrive size={24} style={{ color: 'var(--accent-green)' }} />,
      popular: true
    },
    {
      id: 'vlsi',
      title: 'VLSI Master Bundle',
      description: 'Comprehensive digital circuit design resources, Verilog notes, and FPGA project setups.',
      details: [
        'Verilog HDL basics and design patterns',
        'SystemVerilog coding guidelines',
        'Digital Logic Design projects list',
        'FPGA testbench files & simulations',
        'VLSI Core ECE Interview Q&As'
      ],
      icon: <Info size={24} style={{ color: 'var(--accent-yellow)' }} />
    },
    {
      id: 'system-design',
      title: 'System Design & Arch Bundle',
      description: 'Learn system design paradigms, load balancing, microservices, and high-availability database setups.',
      details: [
        'System Design & Architecture fundamentals',
        'Microservices & API Gateway setups',
        'Load Balancing & CDN caching guides',
        'Database Sharding & Replication cases',
        'Real-world System Design case studies'
      ],
      icon: <Layout size={24} style={{ color: 'var(--accent-cyan)' }} />
    },
    {
      id: 'dsa',
      title: 'DSA & Coding Patterns Bundle',
      description: 'Crack coding rounds with patterns, structured data structures templates, algorithms, and cheat sheets.',
      details: [
        'Common DSA coding patterns (Sliding Window, Two Pointer)',
        'Structured Data Structures guides & cheat sheets',
        'Popular Algorithms templates (Sorting, Search, Graph)',
        'Core Recursion & Dynamic Programming walkthroughs',
        'Practice Questions & Interview Solutions'
      ],
      icon: <Terminal size={24} style={{ color: 'var(--accent-purple)' }} />
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Development Bundle',
      description: 'Pre-configured Web Development boilerplates, API integrations, and Database schemas.',
      details: [
        'React/Next.js frontend boilerplates',
        'Node.js/Express backend API templates',
        'MongoDB/PostgreSQL schemas & indexing',
        'Authentication & Security middleware',
        'Deployment checklists & CI/CD guides'
      ],
      icon: <HardDrive size={24} style={{ color: 'var(--accent-blue)' }} />,
      popular: true
    },
    {
      id: 'aiml',
      title: 'AI & Machine Learning Bundle',
      description: 'Build predictive models, neural networks, computer vision apps, and Jupyter Notebook pipelines.',
      details: [
        'Python AI/ML mini-projects & pipelines',
        'Jupyter Notebooks with clean data workflows',
        'Model training, evaluation & tuning guides',
        'Computer Vision (OpenCV) & NLP scripts',
        'TensorFlow/PyTorch model deployment guides'
      ],
      icon: <Cpu size={24} style={{ color: 'var(--accent-green)' }} />
    },
    {
      id: 'hackathon',
      title: 'Hackathon Winning Bundle',
      description: 'Get pitch-ready templates, roadmaps, and winning ideas used by top teams.',
      details: [
        'High-yielding Hackathon Ideas list',
        'Standard Problem Statement breakdowns',
        'Pitch Deck (PPT/PDF) templates',
        'Project Presentation frameworks',
        'Sprint-style execution roadmaps'
      ],
      icon: <Award size={24} style={{ color: 'var(--accent-cyan)' }} />
    },
    {
      id: 'final-year',
      title: 'Final Year Project Bundle',
      description: 'A complete package containing reports, synopsis, and literature surveys.',
      details: [
        'Project Report template (DOCX + PDF)',
        'Standard Abstract and Project Synopsis',
        'Extensive Literature Survey lists',
        'System Flowcharts & Block Diagrams',
        'Structured Methodology and Results layout'
      ],
      icon: <FileText size={24} style={{ color: 'var(--accent-purple)' }} />,
      popular: true
    },
    {
      id: 'placement',
      title: 'Placement Preparation Bundle',
      description: 'Succeed in core tech and ECE interview rounds with structured guides.',
      details: [
        'ATS-optimized Resume templates',
        'LinkedIn Profile Optimization guide',
        'Quantitative & Logical Aptitude materials',
        'Technical & coding interview questions',
        'ECE Core interview questions & cheat-sheets'
      ],
      icon: <BookOpen size={24} style={{ color: 'var(--accent-blue)' }} />
    }
  ];

  const pricingTiers = [
    {
      id: 'starter',
      name: 'Starter Bundle',
      price: 99,
      description: 'Essential files to get your project compiled and running.',
      features: [
        'Complete Project Source Code',
        'Academic Project Report (PDF/DOCX)',
        'Presentation PPT Slides'
      ],
      icon: <FileText size={20} style={{ color: 'var(--accent-blue)' }} />
    },
    {
      id: 'pro',
      name: 'Pro Bundle',
      price: 300,
      description: 'Step-by-step guides and full schematics for assembly.',
      features: [
        'Everything in Starter Bundle',
        'Circuit Diagram & Wiring Guides',
        'Step-by-Step Video Tutorials',
        'Viva Questions & Answers'
      ],
      icon: <Video size={20} style={{ color: 'var(--accent-purple)' }} />,
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate Bundle',
      price: 500,
      description: 'Complete package with hackathon tools and priority developer support.',
      features: [
        'Everything in Pro Bundle',
        'Hackathon Winning Guide & Templates',
        'Placement Prep Material Bundle',
        'Priority Technical Support (Email/WhatsApp)'
      ],
      icon: <Sparkles size={20} style={{ color: 'var(--accent-yellow)' }} />
    }
  ];

  const handleBuyTier = (bundle, tier) => {
    const item = {
      id: `store-bundle-${bundle.id}-${tier.id}`,
      title: `${bundle.title} - ${tier.name}`,
      price: tier.price,
      category: 'Digital Store Bundle',
      microcontroller: 'Digital Download Link'
    };
    onAddToCart(item);
    setSelectedBundle(null);
  };

  const openCustomWhatsApp = (serviceTitle) => {
    const text = `Hello CircuitCraft Studio! 🚀\nI would like to inquire about the "Custom Project Development" service (Starting at ₹800).\n\nService Details: Custom Code, Documentation, PPT, and support.\nPlease share the details!`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section 
      id="store" 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'left'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          DIGITAL <span style={{ color: 'var(--accent-blue)' }}>STORE</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Select and unlock premium educational bundle downloads. Choose a tier that fits your development needs.
        </p>
      </div>

      {/* Main Grid: 7 Categories */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}
      >
        {bundles.map((bundle) => (
          <div 
            key={bundle.id}
            className="glass-panel"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {bundle.popular && (
              <span 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: '1px solid rgba(37, 99, 235, 0.2)'
                }}
              >
                POPULAR
              </span>
            )}
            
            <div>
              {/* Icon & Title */}
              <div style={{ marginBottom: '1rem', display: 'inline-flex', padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                {bundle.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {bundle.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                {bundle.description}
              </p>
              
              {/* Core Features Preview */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {bundle.details.slice(0, 3).map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                    <span className="line-clamp-2">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <button
              onClick={() => setSelectedBundle(bundle)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-tertiary)';
              }}
            >
              Choose Options & Tiers
            </button>
          </div>
        ))}
      </div>

      {/* Row: Custom Project Portal + Popular / Profitable Services */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '2.5rem',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Custom Development Ad */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
              <MessageSquare size={24} style={{ color: 'var(--accent-purple)' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Custom Project Service
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Need a completely personalized project built from scratch to meet specific college syllabus requirements? Get customized source codes, circuits, full documentation files, and 1-on-1 online assistance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-purple)' }} /> 1-on-1 Project Guidance & online explanation
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-purple)' }} /> Full source code customization & modifications
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-purple)' }} /> Viva preparation checklist included
              </span>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Starting at ₹800</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ project</span>
            </div>
            <button
              onClick={() => openCustomWhatsApp()}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                background: 'var(--accent-purple)',
                border: 'none',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-purple)'}
            >
              <MessageSquare size={16} className="pill-accent" />
              Discuss on WhatsApp
            </button>
          </div>
        </div>

        {/* Most Profitable Services Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }} className="profitable-divider">
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>
              💡 Hot Sellers & Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Custom Project Development', desc: 'Personalized project hardware schematic & customized code', price: '₹800+' },
                { title: 'Final Year Project Bundles', desc: 'Complete documentation report, synopsis, PPT & video guide', price: '₹500' },
                { title: 'Hackathon Preparation Kits', desc: 'Problem solvers, pitch decks, ideas & execution roadmaps', price: '₹300/₹500' },
                { title: 'Embedded Systems Master Bundle', desc: 'Microcontrollers (ARM, STM32, 8051) code & labs pack', price: '₹500' },
                { title: 'IoT Project Bundle', desc: 'Cloud connections, WiFi boards, Blynk app configs', price: '₹500' },
                { title: 'VLSI Interview & Project Bundle', desc: 'Digital logic design notes, Verilog setups & interview Qs', price: '₹500' }
              ].map((serv, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.5rem 0',
                    borderBottom: index !== 5 ? '1px dashed var(--border-color)' : 'none'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>{serv.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{serv.desc}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)', whiteSpace: 'nowrap' }}>{serv.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Tiers Selector Comparer */}
      {selectedBundle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setSelectedBundle(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem',
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedBundle(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            {/* Header info */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Bundle Configuration
              </span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                {selectedBundle.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
                Choose the pricing package that fits your study curriculum requirements.
              </p>
            </div>

            {/* Side-by-side Pricing Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}
            >
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: tier.popular ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                    background: tier.popular ? 'rgba(37, 99, 235, 0.02)' : 'var(--bg-tertiary)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  {tier.popular && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--accent-blue)',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '2px 10px',
                        borderRadius: '12px'
                      }}
                      className="pill-accent"
                    >
                      RECOMMENDED
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {tier.icon}
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tier.name}</h4>
                    </div>
                    
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '2.5rem', marginBottom: '1rem' }}>
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{tier.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ download</span>
                    </div>

                    {/* Features checklist */}
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                      {tier.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={14} style={{ color: 'var(--accent-blue)', marginTop: '2px', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={() => handleBuyTier(selectedBundle, tier)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: tier.popular ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                      border: tier.popular ? 'none' : '1px solid var(--border-color)',
                      color: tier.popular ? '#fff' : 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      if (tier.popular) {
                        e.currentTarget.style.backgroundColor = '#1d4ed8';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tier.popular) {
                        e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }
                    }}
                  >
                    <ShoppingCart size={16} className={tier.popular ? "pill-accent" : ""} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS overrides inside style tag to easily implement responsive divider borders */}
      <style>{`
        @media (max-width: 768px) {
          .profitable-divider {
            border-left: none !important;
            padding-left: 0 !important;
            margin-top: 1.5rem;
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
