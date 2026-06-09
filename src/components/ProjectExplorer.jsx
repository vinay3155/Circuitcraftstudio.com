import React, { useState } from 'react';
import { Search, ShoppingCart, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function ProjectExplorer({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'IoT Projects',
    'Embedded Systems',
    'Arduino & ESP32',
    'Robotics Projects',
    'Smart Agriculture',
    'Home Automation',
    'Renewable Energy',
    'AI & ML Projects'
  ];

  const projects = [
    {
      id: 'proj1',
      title: 'IoT Weather Station with Cloud Logging',
      category: 'IoT Projects',
      price: 1499,
      description: 'A cloud-enabled weather monitoring system logging ambient temperature, humidity, pressure, and air quality.',
      difficulty: 'Intermediate',
      microcontroller: 'ESP32 NodeMCU',
      sensors: ['DHT22', 'BMP280', 'MQ-135'],
      features: ['ThingsSpeak Dashboard', 'Email/Telegram alerts', 'Local OLED display summary'],
      hardwareIncluded: ['ESP32 Board', 'Sensors pack', 'I2C OLED Screen', 'Breadboard & jumpers', 'Custom PCB shield']
    },
    {
      id: 'proj2',
      title: 'Voice-Controlled Smart Automation Hub',
      category: 'Home Automation',
      price: 1699,
      description: 'Centralized home automation system controlling 4 appliances via offline voice commands or WiFi app.',
      difficulty: 'Beginner',
      microcontroller: 'Arduino Nano + ESP8266',
      sensors: ['Voice Recognition V3 Module', 'Current sensor'],
      features: ['Offline voice activation', '4-channel Relay control', 'Blynk app overlay', 'Over-current protection'],
      hardwareIncluded: ['Arduino Nano', 'ESP8266 board', 'Voice Module', '4-Ch Relay Board', 'ACS712 sensor', 'Pre-wired custom housing']
    },
    {
      id: 'proj3',
      title: 'Solar Tracking Panel with Dual Axis Drive',
      category: 'Renewable Energy',
      price: 1999,
      description: 'An intelligent solar tracking mechanism that adjusts LDR-based positioning to maximize light intensity absorption.',
      difficulty: 'Advanced',
      microcontroller: 'Arduino Uno R3',
      sensors: ['LDR Sensors x4', 'Voltage/Current telemetry module'],
      features: ['Dual-axis servo operation', 'Real-time efficiency telemetry', 'Auto-park at dusk mode', 'Rechargeable battery board'],
      hardwareIncluded: ['Arduino Uno', '4x LDRs', '2x MG996R Metal Servos', 'Acrylic Tracker Frame', 'Solar Panel 5V', 'Power bank module']
    },
    {
      id: 'proj4',
      title: 'Obstacle Avoidance & Path Planning Rover',
      category: 'Robotics Projects',
      price: 2199,
      description: 'Autonomous 4WD robotic platform executing obstacle avoidance, maze routing, and bluetooth manual override.',
      difficulty: 'Intermediate',
      microcontroller: 'Arduino Uno + L298D Shield',
      sensors: ['Ultrasonic HC-SR04', 'IR sensor x2', 'HC-05 Bluetooth'],
      features: ['Servo-mounted ultrasonic scanning', 'PID path control', 'Mobile app control interface', 'Chassis speed feedback'],
      hardwareIncluded: ['Arduino Board', 'Motor Driver Shield', 'HC-SR04 + SG90 Servo', '4x Gear Motors', 'Chassis plate kit', 'Lithium batteries']
    },
    {
      id: 'proj5',
      title: 'Automated Drip Irrigation with Soil Moisture Telemetry',
      category: 'Smart Agriculture',
      price: 1200,
      description: 'Smart farming device regulating water valve drip intervals based on active soil moisture telemetry.',
      difficulty: 'Beginner',
      microcontroller: 'ESP8266 NodeMCU',
      sensors: ['Capacitive Soil Sensor', 'DHT11 sensor', 'Water Flow sensor'],
      features: ['Capacitive sensor (anti-corrosion)', 'Solenoid water valve control', 'Solar charger circuit', 'Wi-Fi web dashboard interface'],
      hardwareIncluded: ['NodeMCU Board', 'Capacitive Sensor', '12V Solenoid Valve', '12V Solenoid Driver', '5W Solar Panel & battery rig']
    },
    {
      id: 'proj6',
      title: 'STM32 Bare-Metal Signal Processing Analyzer',
      category: 'Embedded Systems',
      price: 2299,
      description: 'An advanced data logging acquisition system sampling analog wave data and performing local FFT computations.',
      difficulty: 'Advanced',
      microcontroller: 'STM32F407 Discovery',
      sensors: ['Analog Wave Generator module', 'ADC telemetry'],
      features: ['Bare-metal Register programming', 'Direct Memory Access (DMA)', 'Real-time FFT spectrum on LCD', 'SPI communication logger'],
      hardwareIncluded: ['STM32F4 Board', 'Audio Jack ADC pre-amp', '3.2" SPI LCD screen', 'Dumping logic shield', 'Cables']
    },
    {
      id: 'proj7',
      title: 'Edge-AI Camera-Based Face Attendance System',
      category: 'AI & ML Projects',
      price: 2499,
      description: 'Camera verification system utilizing local CNN filters to log face matches directly to a central SQL database.',
      difficulty: 'Advanced',
      microcontroller: 'ESP32-CAM + Raspberry Pi Zero',
      sensors: ['OV2640 Camera module', 'PIR Motion Sensor'],
      features: ['Local python neural net inference', 'Wireless frame stream', 'Admin dashboard portal', 'RFID backup logging'],
      hardwareIncluded: ['ESP32-CAM Board', 'Raspberry Pi Zero W', 'OV2640 Lens', 'PIR sensor', '32GB Preloaded SD Card', 'Case mount']
    },
    {
      id: 'proj8',
      title: 'Self-Balancing Electric Segway Bot',
      category: 'Robotics Projects',
      price: 2399,
      description: 'A two-wheeled robotic platform maintaining balance using gyroscope accelerometer data and PID filter feedback loops.',
      difficulty: 'Advanced',
      microcontroller: 'Arduino Nano R3',
      sensors: ['MPU6050 Accelerometer/Gyro', 'Encoder speed modules x2'],
      features: ['Complementary/Kalman filtering', 'PID controller loops', 'Bluetooth configuration utility', 'Auto-recovery calibration'],
      hardwareIncluded: ['Arduino Nano', 'MPU6050 Sensor', 'High-Torque DC Encoder Motors', 'Aluminium body bracket', 'Custom high-current board']
    }
  ];

  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.microcontroller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="projects" 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 
          style={{ 
            fontSize: '2.25rem', 
            marginBottom: '0.75rem',
            color: '#fff',
            textShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
          }}
        >
          PROJECT <span style={{ color: 'var(--accent-cyan)' }}>CATEGORIES</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Browse fully engineered ready-to-assemble kits or finished models under our major technical disciplines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          marginBottom: '2.5rem' 
        }}
      >
        {/* Search Input */}
        <div 
          style={{ 
            position: 'relative',
            maxWidth: '500px',
            width: '100%',
            margin: '0 auto'
          }}
        >
          <input 
            type="text" 
            placeholder="Search projects, controllers, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.75rem',
              borderRadius: '30px',
              background: 'rgba(17, 24, 39, 0.6)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all var(--transition-normal)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }} 
          />
        </div>

        {/* Category Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '0.75rem', 
            paddingBottom: '0.5rem',
            justifyContent: 'flex-start',
            scrollbarWidth: 'thin'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '20px',
                background: selectedCategory === cat ? 'var(--accent-cyan)' : 'rgba(17, 24, 39, 0.6)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--border-color)',
                color: selectedCategory === cat ? '#000' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
          <HelpCircle size={48} style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--text-muted)' }} />
          <p style={{ fontSize: '1.1rem' }}>No projects found matching your filters.</p>
        </div>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div>
                {/* Category & Difficulty Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{project.category}</span>
                  <span 
                    style={{ 
                      color: project.difficulty === 'Beginner' ? 'var(--accent-green)' : project.difficulty === 'Intermediate' ? 'var(--accent-blue)' : 'var(--accent-yellow)',
                      fontWeight: 600 
                    }}
                  >
                    {project.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.5rem', minHeight: '2.8rem' }} className="line-clamp-2">
                  {project.title}
                </h3>

                {/* Microcontroller tag */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px' }}>
                    {project.microcontroller}
                  </span>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineClamp: 3 }} className="line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Price & Cart Actions */}
              <div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    justifyContent: 'space-between',
                    marginBottom: '1rem' 
                  }}
                >
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹{project.price.toLocaleString('en-IN')}
                  </span>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    Details <ArrowUpRight size={14} />
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart(project)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
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
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <ShoppingCart size={16} style={{ color: 'var(--accent-cyan)' }} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: 'rgba(5, 7, 12, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fade-in 0.3s ease'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="glass-panel"
            style={{
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem',
              position: 'relative',
              textAlign: 'left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            {/* Header info */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{selectedProject.category}</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{selectedProject.difficulty} Level</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {selectedProject.description}
            </p>

            {/* Specifications Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Microcontroller & Architecture
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{selectedProject.microcontroller}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Key Features
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Hardware Components Included in Kit
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.hardwareIncluded.map((hw, idx) => (
                    <span 
                      key={idx}
                      style={{ 
                        fontSize: '0.8rem', 
                        background: 'rgba(0, 229, 255, 0.05)', 
                        border: '1px solid rgba(0, 229, 255, 0.15)',
                        color: 'var(--accent-cyan)',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {hw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Buy / Checkout panel */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Total Price (Kits + Code)</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                  ₹{selectedProject.price.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(selectedProject);
                  setSelectedProject(null);
                }}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="glow-btn"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
