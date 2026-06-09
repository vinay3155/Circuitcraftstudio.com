import React, { useState } from 'react';
import { Award, Map, Lightbulb, FolderOpen, FileText, History, Copy, Check } from 'lucide-react';

export default function HackathonGuide() {
  const [activeTab, setActiveTab] = useState('winning');
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const tabs = [
    { id: 'winning', label: 'Winning Guide', icon: <Award size={18} /> },
    { id: 'roadmap', label: 'Hackathon Roadmap', icon: <Map size={18} /> },
    { id: 'ideas', label: 'Project Ideas', icon: <Lightbulb size={18} /> },
    { id: 'resources', label: 'Free Resources', icon: <FolderOpen size={18} /> },
    { id: 'experience', label: 'My Experience', icon: <History size={18} /> },
    { id: 'slides', label: 'Pitch Deck Slide Template', icon: <FileText size={18} /> }
  ];

  const githubStructure = `# Repository Name: Smart-Drip-Irrigation-Telemetry

├── firmware/
│   ├── main/
│   │   ├── main.ino
│   │   └── config.h
│   └── libraries/
├── software/
│   ├── web-app/ (Next.js/React code)
│   └── server/ (Express/API code)
├── hardware/
│   ├── schematics/ (PDF & KiCad files)
│   └── 3D-models/ (STL casing files)
├── documentation/
│   ├── synopsis.md
│   └── block-diagram.png
├── LICENSE
└── README.md`;

  const documentationTemplate = `# Project Report: Smart Industrial Telemetry Node

## 1. Abstract
Brief summary of the engineering problem, your implementation stack, and the commercial impact.

## 2. Block Diagram & Architecture
Explain the data flow from hardware sensors (e.g. DHT22, MPU6050) -> microcontroller (ESP32) -> cloud database -> client portal.

## 3. Hardware Requirements
- Core MCU (ESP32 NodeMCU)
- Sensor interface array
- Power regulation circuit (5V/3.3V LDO)

## 4. Firmware Logic & State Machine
Describe how the loop handles sensor sampling, sleep states, and WiFi reconnect failures.

## 5. Cost Estimation
List components and direct assembly costs to show mass-production feasibility.`;

  const presentationTemplate = `# SLIDE 1: Problem Statement
Identify the pain point. Use stats. "X% of farmers lose crops due to delayed irrigation data."

# SLIDE 2: Proposed Solution
Our system solves this using low-power IoT telemetry node. Clear USP: "30% cheaper, 10-day backup battery."

# SLIDE 3: System Architecture & Tech Stack
Hardware: ESP32 + Capacitive Moisture Sensor
Software: React Dashboard + Express API + InfluxDB (time-series database)

# SLIDE 4: Live Demo (The Hook)
Interactive visual showing local sensor reads reflecting on a live dashboard.

# SLIDE 5: Commercial Feasibility & Market Impact
Production cost: ₹950. Target price: ₹1499. Payback period: 6 months.

# SLIDE 6: Future Scope & Roadmap
Edge-AI prediction of soil decay, mesh network compatibility.`;

  return (
    <section 
      id="blog" 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
          Hackathon Hub
        </span>
        <h2 
          style={{ 
            fontSize: '2.5rem', 
            color: '#fff', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)' 
          }}
        >
          How to Win a Hackathon
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
          Comprehensive roadmaps, verified project lists, and copyable slide structures to guide engineering students to victory.
        </p>
      </div>

      {/* Grid Layout: Tabs Navigation + Content Display */}
      <div className="blog-layout">
        {/* Navigation Sidebar */}
        <div className="blog-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--accent-cyan)' : 'transparent',
                background: activeTab === tab.id ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              className="blog-tab-btn"
            >
              {tab.icon}
              <span style={{ fontSize: '0.9rem' }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Viewer Panel */}
        <div className="blog-content-panel glass-panel" style={{ padding: '2.5rem', textAlign: 'left', minHeight: '400px' }}>
          {/* 1. WINNING GUIDE */}
          {activeTab === 'winning' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                The Winner's Blueprint: Hackathon Domination
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Winning a hackathon isn't just about writing code. It is a mix of tactical problem selection, balanced team dynamics, fast validation, and a bulletproof presentation. Here is our checklist for top placement:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-cyan)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.35rem' }}>👥 Team Formation (The Dream Team)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Avoid teams of four pure coders. A winning structure is: <strong>1 Pitcher/Designer</strong> (focused on marketing, business feasibility, UI mockups, slide deck), <strong>2 Core Developers</strong> (handling server, web apps, databases), and <strong>1 Hardware Specialist</strong> (handling sensor calibration, wiring schematics, and controller firmware).
                  </p>
                </div>

                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-blue)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.35rem' }}>🎯 Problem Selection (Real-World Feasibility)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Align your project directly with sponsor categories—they have the biggest prize pools. Choose a problem statement that has a clear, easily understandable impact (e.g. crop health, medical alerts) rather than abstract, highly theoretical tasks.
                  </p>
                </div>

                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-green)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.35rem' }}>⚡ Fast Idea Validation</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Speak to mentors in the first 2 hours. Ask: "What is the biggest barrier to this idea working?" and refine your USP (Unique Selling Proposition) immediately. Don't build what already exists without adding a major technical upgrade.
                  </p>
                </div>

                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-yellow)' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.35rem' }}>🎤 Pitching & Live Demo Preparation</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    The 3-minute pitch is key. Focus 70% of your time demonstrating a working MVP. <strong>Tip:</strong> Always record a clean video demo of your hardware working at hour 30. If your sensors fail or local Wi-Fi drops during the live judging round, you have a perfect video backup ready.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. HACKATHON ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Hour-by-Hour Hackathon Roadmap
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Manage your 36 hours systematically to prevent sleep-deprivation panic and last-minute hardware fires.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    PRE-EVENT<br />(T-14 Days)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Setup Boilerplates & Git Repositories</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Collect components and double-check sensor datasheets. Setup template React boilerplate codes, database configurations, and Express server files. You should not be writing setup boilerplates during the hackathon.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    HOURS 0–4<br />(Kickoff)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Schematic Lock-In & Wireframes</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Finalize the system architecture. Draw the complete wiring schematic. The hardware specialist begins soldering or breadboarding sensor modules. Pitcher maps mockup wireframes for the user portal.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    HOURS 4–12<br />(Core Build)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Build the Minimal Viable Product (MVP)</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Get raw sensor readings transmitting over serial. Setup database tables. Build simple backend routes. Focus on the core telemetry loop. By Hour 12, you must have raw sensor data reflecting inside your local database.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: 'var(--accent-yellow)', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    HOURS 12–24<br />(Integration)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Full Stack Hardware-Software Hookup</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Connect the local database to the client dashboard. Add real-time telemetry (websockets/mqtt). Format the user dashboard layout. Test the complete hardware control commands triggered from the dashboard.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    HOURS 24–30<br />(Freeze)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Feature Freeze & Video Capture</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Do not add new features. Freeze all code modifications. Clean up dashboard styles, write clean instructions, and debug edge cases. Film a high-definition video demonstration of the prototype working perfectly.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flexShrink: 0, width: '90px', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', borderRight: '1px dashed var(--border-color)', paddingRight: '0.5rem' }}>
                    HOURS 30–36<br />(Rehearsals)
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Pitch Rehearsal & slide polishing</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      Rehearse the pitch at least 5 times. Test live demos on local mobile hotspots (in case conference hall WiFi fails). Formulate clear answers to typical questions (e.g. scalability, database choices, component budgets).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PROJECT IDEAS */}
          {activeTab === 'ideas' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                High-Scoring Hackathon Project Categories
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Winning engineering projects must solve distinct, painful real-world problems. Here are five verified high-impact domains:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="ideas-grid">
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1rem', marginBottom: '0.35rem' }}>🔌 Arduino & Robotics</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    Gesture-controlled micro-grippers or robotic rovers with bluetooth override control. Great for showing real-time feedback loops.
                  </p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h4 style={{ color: 'var(--accent-blue)', fontSize: '1rem', marginBottom: '0.35rem' }}>☁️ IoT & Telemetry Systems</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    Industrial machine vibration analysis logging data to time-series cloud platforms. Alerts the dashboard when limits are crossed.
                  </p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h4 style={{ color: 'var(--accent-green)', fontSize: '1rem', marginBottom: '0.35rem' }}>🧠 AI + IoT Edge Solutions</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    Safety helmet and PPE violation check cameras at construction sites using local ESP32-CAM logic. Logs results to a backend server database.
                  </p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h4 style={{ color: 'var(--accent-yellow)', fontSize: '1rem', marginBottom: '0.35rem' }}>🌱 Smart Agriculture nodes</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    NPK soil sensor nodes regulating solenoid drip irrigation triggers automatically via moisture levels. Low-power solar charging circuits.
                  </p>
                </div>
                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', gridColumn: 'span 2' }} className="full-width-tablet-card">
                  <h4 style={{ color: 'var(--accent-purple)', fontSize: '1rem', marginBottom: '0.35rem' }}>🏥 Remote Healthcare grids</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    Wearable telemetry vests monitoring patients ECG signals, blood oxygen levels, and core body temperatures, transmitting data wirelessly over secure mesh networks to local nursing terminals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. FREE RESOURCES */}
          {activeTab === 'resources' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Free Templates & Repository Structures
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Speed is everything. Copy these structures directly to organize your files and write documentation instantly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Standard GitHub Repository Structure</span>
                    <button
                      onClick={() => handleCopy(githubStructure, 'github')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      {copiedText === 'github' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'github' ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre 
                    style={{ 
                      background: '#05070c', 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)', 
                      fontSize: '0.8rem', 
                      color: 'var(--accent-cyan)', 
                      fontFamily: 'monospace',
                      overflowX: 'auto' 
                    }}
                  >
                    {githubStructure}
                  </pre>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Project Documentation Template</span>
                    <button
                      onClick={() => handleCopy(documentationTemplate, 'doc')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      {copiedText === 'doc' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'doc' ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre 
                    style={{ 
                      background: '#05070c', 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      border: '1px solid var(--border-color)', 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)', 
                      fontFamily: 'monospace',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      textAlign: 'left'
                    }}
                  >
                    {documentationTemplate}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* 5. EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Lessons from the Trenches: My Hackathon Entries
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Having participated in major engineering challenges (including competing as a finalist in national hackathons), here are the critical lessons we learned the hard way:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '8px', textAlign: 'left' }}>
                  <h4 style={{ color: '#ef4444', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>❌ Mistake to Avoid: Over-Engineering</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    We once spent 20 hours trying to implement a complex ML model on a low-end ESP32 microcontroller, resulting in compiler issues. <strong>Lesson:</strong> Build your core data pipeline first. Keep ML algorithms running on a secure cloud server, and let the hardware simply query APIs.
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '8px', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--accent-green)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>✅ Lesson Learned: Bring Spare Components</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    During a midnight coding block, a voltage regulator short-circuited due to an accidental wiring bypass. Because we carried an extra Arduino board, we recovered in 10 minutes. <strong>Lesson:</strong> Always pack duplicate microcontrollers and sensors.
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(0, 229, 255, 0.03)', border: '1px solid rgba(0, 229, 255, 0.15)', borderRadius: '8px', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>🎯 The Power of Visual Design</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                    In our winning hackathon entry, the jury was highly impressed by our customized, clean responsive web portal logging time-series metrics. <strong>Lesson:</strong> The presentation layer matters immensely. A great backend with a basic console display is hard for a jury to appreciate. Build sleek dashboards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. SLIDES */}
          {activeTab === 'slides' && (
            <div className="blog-tab-content">
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Winning Pitch Deck: Slide Outline
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Your presentation slides should act as a clear, high-impact outline to keep the jury engaged. Here is the structure we recommend:
              </p>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Standard Hackathon Slide Template</span>
                  <button
                    onClick={() => handleCopy(presentationTemplate, 'slide')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    {copiedText === 'slide' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedText === 'slide' ? 'Copied!' : 'Copy Template'}
                  </button>
                </div>
                <pre 
                  style={{ 
                    background: '#05070c', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)', 
                    fontFamily: 'monospace',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    textAlign: 'left'
                  }}
                >
                  {presentationTemplate}
                </pre>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(251, 191, 36, 0.03)', border: '1px solid rgba(251, 191, 36, 0.15)', borderRadius: '8px', textAlign: 'left', fontSize: '0.8rem', color: 'var(--accent-yellow)', lineHeight: '1.4' }}>
                💡 <strong>Important Pitch Rule:</strong> Keep slide text to a minimum. Use bold headings, block diagrams, flowcharts, and budget tables. The jury should be listening to your words and watching your demo, not reading paragraphs on slides.
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .blog-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .blog-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .blog-tab-btn:hover {
          color: var(--accent-cyan) !important;
          background: rgba(0, 229, 255, 0.02) !important;
        }

        @media (max-width: 992px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .blog-sidebar {
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 0.5rem !important;
            scrollbar-width: thin !important;
          }
          .blog-tab-btn {
            flex-shrink: 0 !important;
            width: auto !important;
            padding: 0.65rem 1rem !important;
          }
          .ideas-grid {
            grid-template-columns: 1fr !important;
          }
          .full-width-tablet-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
