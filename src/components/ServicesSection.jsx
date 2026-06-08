import React from 'react';
import { 
  FileText, Cpu, Server, Compass, 
  Layers, Zap, Trophy, Shield, Box 
} from 'lucide-react';

export default function ServicesSection({ onServiceClick }) {
  const services = [
    {
      id: 'mini',
      icon: <Cpu size={24} />,
      title: 'Mini Projects',
      description: 'Ideal for 2nd & 3rd-year engineering students. Covering essential syllabus domains.',
      details: ['Multi-disciplinary integration', 'Full source code & schematics', 'Hands-on hardware explanation'],
      tags: ['ECE', 'EEE', 'CSE', 'ISE', 'AIML'],
      color: 'var(--accent-cyan)'
    },
    {
      id: 'major',
      icon: <Layers size={24} />,
      title: 'Major & Final Year Projects',
      description: 'Sophisticated end-to-end projects with research depth for final year submission.',
      details: ['IEEE research papers base', 'Comprehensive system design', 'Working hardware + software'],
      tags: ['B.E/B.Tech', 'M.Tech', 'Diploma'],
      color: 'var(--accent-blue)'
    },
    {
      id: 'arduino',
      icon: <Zap size={24} />,
      title: 'Arduino & ESP32 Development',
      description: 'Custom programming and hardware integration for popular open-source platforms.',
      details: ['Sensor interfacing (DHT, Ultrasonic)', 'WiFi & Bluetooth networking', 'Power management circuits'],
      tags: ['Firmware', 'C/C++', 'Microcontrollers'],
      color: 'var(--accent-green)'
    },
    {
      id: 'iot',
      icon: <Server size={24} />,
      title: 'IoT-Based Smart Systems',
      description: 'Cloud-connected devices for telemetry, tracking, and remote control solutions.',
      details: ['Blynk, ThingsSpeak, AWS IoT', 'Real-time telemetry dashboards', 'MQTT & HTTP communication protocols'],
      tags: ['Cloud', 'Sensors', 'Automation'],
      color: 'var(--accent-purple)'
    },
    {
      id: 'embedded',
      icon: <Cpu size={24} />,
      title: 'Embedded Systems Projects',
      description: 'High-performance microcontrollers interface design and custom logic creation.',
      details: ['ARM Cortex, STM32, PIC, 8051', 'Bare-metal programming', 'Hardware Interrupts & RTOS'],
      tags: ['Firmware', 'RTOS', 'Low-Power'],
      color: 'var(--accent-yellow)'
    },
    {
      id: 'vlsi',
      icon: <Compass size={24} />,
      title: 'VLSI & Electronics Projects',
      description: 'Digital circuit design, logic synthesis, and analog electronic configurations.',
      details: ['Verilog / VHDL coding', 'FPGA prototyping (Xilinx, Altera)', 'Op-amp & transistor circuit tuning'],
      tags: ['HDL', 'FPGA', 'Analog Circuits'],
      color: 'var(--accent-cyan)'
    },
    {
      id: 'doc',
      icon: <FileText size={24} />,
      title: 'Project Documentation & Reports',
      description: 'Complete project guides, presentation slides, and standard synopsis write-ups.',
      details: ['System block diagrams & flowcharts', 'Component datasheet catalogs', 'Literature survey & bibliography'],
      tags: ['Synopsis', 'Report PDF', 'PPT Slides'],
      color: 'var(--accent-blue)'
    },
    {
      id: 'hackathon',
      icon: <Trophy size={24} />,
      title: 'Hackathon Project Support',
      description: 'Rapid prototyping and technical mentorship to accelerate your hackathon ideas.',
      details: ['24-48 hr fast-track prototype', 'Sleek UI dashboard designs', 'Pitch deck technical backup'],
      tags: ['Fast-track', 'MVP', 'Pitch Ready'],
      color: 'var(--accent-green)'
    },
    {
      id: 'prototype',
      icon: <Box size={24} />,
      title: 'Prototype Development',
      description: 'Turning your custom engineering ideas into professional physical proof-of-concepts.',
      details: ['CAD enclosure planning', 'Component sourcing & mounting', 'Stress testing & calibration'],
      tags: ['Custom PCB', '3D Print Mockup', 'Finished Shell'],
      color: 'var(--accent-yellow)'
    }
  ];

  return (
    <section 
      id="services" 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)'
      }}
      className="animate-fade-in"
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2 
          style={{ 
            fontSize: '2.25rem', 
            marginBottom: '0.75rem',
            color: '#fff',
            textShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
          }}
        >
          OUR <span style={{ color: 'var(--accent-cyan)' }}>SERVICES</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Explore our range of academic, research, and prototype services tailored to help you innovate, design, develop, and deliver.
        </p>
      </div>

      {/* Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {services.map((service) => (
          <div 
            key={service.id}
            className="glass-panel"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              textAlign: 'left'
            }}
          >
            <div>
              {/* Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1.25rem' 
                }}
              >
                <div 
                  style={{
                    padding: '0.6rem',
                    borderRadius: '10px',
                    background: `rgba(${service.id === 'mini' || service.id === 'vlsi' ? '0, 229, 255' : service.id === 'major' || service.id === 'doc' ? '59, 130, 246' : '16, 185, 129'}, 0.1)`,
                    border: `1px solid ${service.color}`,
                    color: service.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{service.title}</h3>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                {service.description}
              </p>

              {/* Details List */}
              <ul 
                style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 1.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                {service.details.map((detail, idx) => (
                  <li 
                    key={idx}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ color: service.color, fontWeight: 'bold' }}>✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags & Action */}
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.4rem', 
                  marginBottom: '1.5rem' 
                }}
              >
                {service.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '4px',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onServiceClick(service)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(${service.id === 'mini' || service.id === 'vlsi' ? '0, 229, 255' : service.id === 'major' || service.id === 'doc' ? '59, 130, 246' : '16, 185, 129'}, 0.08)`;
                  e.currentTarget.style.borderColor = service.color;
                  e.currentTarget.style.boxShadow = `0 0 10px rgba(${service.id === 'mini' || service.id === 'vlsi' ? '0, 229, 255' : service.id === 'major' || service.id === 'doc' ? '59, 130, 246' : '16, 185, 129'}, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Inquire Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
