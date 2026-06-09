import React, { useState, useEffect, useRef } from 'react';
import { X, Cpu, Code, BookOpen, Layers, Award, Terminal, Compass, Briefcase, FileText, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';

export default function RoadmapModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('system-design'); // defaults to IT first tab
  const [copiedText, setCopiedText] = useState('');
  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // LaTeX fresher resume template
  const resumeTemplate = `% LaTeX Fresher Resume Template - CircuitCraft Premium Bundle
\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=0.6in}

\\begin{document}
\\begin{center}
    {\\Huge \\textbf{YOUR NAME}} \\\\
    \\small Email: yourname@gmail.com | Phone: +91-XXXX-XXXXXX | LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername
\\end{center}

\\hrule
\\vspace{0.4em}
\\textbf{EDUCATION} \\\\
\\textbf{Visvesvaraya Technological University (VTU)} \\hfill Bangalore, India \\\\
Bachelor of Engineering in Computer Science / Electronics \\hfill CGPA: 8.8 / 10 | 2022 - 2026

\\vspace{0.6em}
\\textbf{TECHNICAL SKILLS} \\\\
\\textbf{Languages:} C++, Python, JavaScript, SQL, C \\\\
\\textbf{Developer Tools & Platforms:} Git, Docker, Linux, AWS, ESP-IDF \\\\
\\textbf{Core Concepts:} Data Structures, System Design, RTOS Scheduling, VLSI FPGA \\\\
\\textbf{Hardware Interfacing:} UART, SPI, I2C, DMA telemetry protocols

\\vspace{0.6em}
\\textbf{EXPERIENCE / PROJECTS} \\\\
\\textbf{Smart Edge-AI Industrial Telemetry System} \\hfill Oct 2025 - Present \\\\
- Engineered a low-latency monitoring node using ESP32 running FreeRTOS. \\\\
- Configured direct-memory-access (DMA) SPI streams to sample sensor logs at 10kHz. \\\\
- Set up local TensorFlow Lite micro-networks to classify sensor anomalies on-edge. \\\\
- Logged system warnings via MQTT to a Node.js dashboard, reducing pipeline latency by 35%.

\\vspace{0.6em}
\\textbf{High-Frequency ALU Design & FPGA Simulation} \\hfill Jun 2025 \\\\
- Programmed a 16-bit Arithmetic Logic Unit in Verilog with support for pipelining. \\\\
- Synthesized and simulated logic gates on Xilinx Vivado, testing for transient path delays. \\\\
- Achieved a clock frequency speedup of 12% by optimizing look-ahead carry adder logic.

\\vspace{0.6em}
\\textbf{AWARDS \\& ACHIEVEMENTS} \\\\
- Winner, National Level Smart India Hackathon 2025 (Agriculture & IoT Track) \\\\
- 1st Place, College Algorithm Hack-a-thon (Solved 8/8 DSA tasks in C++)
\\end{document}`;

  // Tabs navigation config
  const itTabs = [
    { id: 'system-design', label: 'System Design & Arch', icon: <Layers size={16} /> },
    { id: 'dsa', label: 'DSA & Coding Patterns', icon: <Code size={16} /> },
    { id: 'fullstack', label: 'Full-Stack Development', icon: <Terminal size={16} /> },
    { id: 'aiml', label: 'AI & Machine Learning', icon: <Cpu size={16} /> }
  ];

  const coreTabs = [
    { id: 'embedded', label: 'Embedded Systems & RTOS', icon: <Cpu size={16} /> },
    { id: 'vlsi', label: 'VLSI Design & HDL', icon: <Compass size={16} /> },
    { id: 'iot', label: 'IoT & Telemetry', icon: <Terminal size={16} /> }
  ];

  const careerTabs = [
    { id: 'aptitude', label: 'Aptitude & Reasoning', icon: <BookOpen size={16} /> },
    { id: 'resume', label: 'LaTeX Resume Template', icon: <FileText size={16} /> },
    { id: 'mock', label: 'Mock Interview Prep', icon: <Briefcase size={16} /> }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 14, 23, 0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}
    >
      <div 
        ref={modalRef}
        style={{
          width: '100vw',
          height: '100vh',
          background: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.25rem 2rem',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={22} style={{ color: 'var(--accent-purple)' }} />
            <span style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              Premium Placement & Career Roadmap Bundle
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-purple)', borderRadius: '12px' }}>
              PRO ACCESS ACTIVE
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dashboard Workspace */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Sidebar Navigation */}
          <div 
            style={{ 
              width: '260px', 
              background: 'var(--bg-tertiary)', 
              borderRight: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem 1rem',
              gap: '1.5rem',
              overflowY: 'auto'
            }}
          >
            {/* IT / SOFTWARE CATEGORY */}
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                💻 IT & Software
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {itTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: activeTab === tab.id ? '3px solid var(--accent-purple)' : '3px solid transparent',
                      borderRadius: '4px',
                      color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CORE ENGINEERING CATEGORY */}
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                ⚙️ Core Engineering
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {coreTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: activeTab === tab.id ? '3px solid var(--accent-purple)' : '3px solid transparent',
                      borderRadius: '4px',
                      color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CAREER PREPARATION */}
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                💼 Career Essentials
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {careerTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.08)' : 'none',
                      border: 'none',
                      borderLeft: activeTab === tab.id ? '3px solid var(--accent-purple)' : '3px solid transparent',
                      borderRadius: '4px',
                      color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: activeTab === tab.id ? 600 : 400,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Main Content Pane */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem', textAlign: 'left' }}>
            
            {/* 1. SYSTEM DESIGN & ARCHITECTURE */}
            {activeTab === 'system-design' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>System Design & Architecture</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Scaling applications to millions of users is a crucial skill tested in advanced product interviews. Focus on design patterns, databases, and microservices.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🛣️ Learning Pathway</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Phase 1: Fundamentals:</strong> Horizontal vs Vertical scaling, Load balancers (Nginx), DNS routing.</li>
                      <li><strong>Phase 2: Database Scalability:</strong> Database indexes, Replication (Master-Slave), Sharding, SQL vs NoSQL.</li>
                      <li><strong>Phase 3: Caching & Message Queues:</strong> Redis/Memcached cache eviction policies, Kafka/RabbitMQ asynchronous workers.</li>
                      <li><strong>Phase 4: Advanced Arch:</strong> Microservices, CDN static content delivery, Rate limiters, API Gateways.</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Interview Q&A</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>Q1: How do you design a URL Shortener like Bit.ly?</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Use base-62 encoding on unique IDs, route through Redis cache, and write to a relational database. Scale with CDNs for routing redirect endpoints.</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Q2: What is the CAP Theorem?</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A distributed database system can guarantee only two out of three: Consistency (C), Availability (A), or Partition Tolerance (P) during network failures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DSA & CODING PATTERNS */}
            {activeTab === 'dsa' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>DSA & Coding Patterns</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Instead of memorizing questions, study standard coding patterns that solve hundreds of interview DSA problems on LeetCode.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🚀 Top Coding Patterns</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>1. Sliding Window</strong>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Solves subarrays/substrings. Key questions: Longest substring without repeating characters.</p>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>2. Two Pointers</strong>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Sorted arrays. Key questions: 3Sum, Container with most water.</p>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>3. Fast & Slow Pointers</strong>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Cycle detection in lists. Key questions: Linked list cycle, Middle of linked list.</p>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>4. Merge Intervals</strong>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Overlap scheduling. Key questions: Merge intervals, Meeting rooms.</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Complexity Cheat-Sheet</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.5rem' }}>Data Structure</th>
                          <th style={{ padding: '0.5rem' }}>Access</th>
                          <th style={{ padding: '0.5rem' }}>Search</th>
                          <th style={{ padding: '0.5rem' }}>Insertion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '0.5rem' }}>Array/ArrayList</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-green)' }}>O(1)</td>
                          <td style={{ padding: '0.5rem' }}>O(N)</td>
                          <td style={{ padding: '0.5rem' }}>O(N)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '0.5rem' }}>HashMap</td>
                          <td style={{ padding: '0.5rem' }}>N/A</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-green)' }}>O(1) avg</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-green)' }}>O(1) avg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '0.5rem' }}>BST (Balanced)</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-blue)' }}>O(log N)</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-blue)' }}>O(log N)</td>
                          <td style={{ padding: '0.5rem', color: 'var(--accent-blue)' }}>O(log N)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. FULL-STACK WEB DEVELOPMENT */}
            {activeTab === 'fullstack' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Full-Stack Web Development</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Modern web frameworks are in huge demand. Transition from simple templates to full-scale SaaS architectures.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🛠️ Technology Stack (Trending 2026/27)</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Frontend Framework:</strong> Next.js (React Server Components), TailwindCSS, TypeScript.</li>
                      <li><strong>Backend Engine:</strong> Node.js (Express), Bun runner, Python (FastAPI).</li>
                      <li><strong>Databases:</strong> PostgreSQL (relational) + Prisma ORM, MongoDB (document cache).</li>
                      <li><strong>Hosting & Edge:</strong> Vercel deployments, Supabase databases, Cloudflare CDN edges.</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🛠️ Suggested Capstone Project</h3>
                    <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--text-primary)' }}>Real-Time Collaborative Project Space</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.5' }}>
                      Build a multi-user workspace using Socket.io for live synchronizations, Next.js for dashboard layouts, and PostgreSQL to log project tasks. Integrate Stripe payments to simulate a subscription tier.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AI & MACHINE LEARNING */}
            {activeTab === 'aiml' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI & Machine Learning</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Generative AI and Edge-AI are reshaping engineering. Moving beyond model training into application deployment.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🧠 Career Skill Tracks</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Basic Math:</strong> Linear algebra, Probability, Gradient Descent formulas.</li>
                      <li><strong>Model Libraries:</strong> PyTorch (modeling), Scikit-Learn (regression), HuggingFace (transformers).</li>
                      <li><strong>Retrieval-Augmented Generation (RAG):</strong> Vector search databases (Pinecone, ChromaDB) to inject custom context into LLMs.</li>
                      <li><strong>Edge inference:</strong> ONNX format models, TensorFlow Lite on microcontrollers (ESP32 Cam/Raspberry Pi).</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Hot Interview Concept: Bias-Variance Tradeoff</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      <strong>Bias:</strong> Simplifications made by a model to make the target function easier to learn (high bias leads to underfitting).<br />
                      <strong>Variance:</strong> The amount that the estimate of the target function will change if different training data is used (high variance leads to overfitting).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. EMBEDDED SYSTEMS & RTOS */}
            {activeTab === 'embedded' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Embedded Systems & RTOS</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Core hardware engineering combines low-level firmware architecture and operating system scheduling.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🛣️ Embedded Study Roadmap</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Step 1: Bare-Metal C:</strong> Bitwise operations, registers pointers, volatile qualifiers, interrupts (ISR).</li>
                      <li><strong>Step 2: Microcontrollers & Hardware:</strong> ARM Cortex-M architecture, STM32 registers, ESP-IDF framework.</li>
                      <li><strong>Step 3: Interfacing Protocols:</strong> I2C clocks, SPI serial lines, UART telemetry, DMA channels.</li>
                      <li><strong>Step 4: Real-Time Operating Systems (RTOS):</strong> FreeRTOS task prioritization, semaphores, mutexes, task queues.</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Technical Interview Questions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>Q1: What is the purpose of the 'volatile' keyword in C?</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>It tells the compiler that the value of the variable can change at any time without any action being taken by the nearby code (e.g. read from hardware registers), preventing the compiler from optimizing out repeated reads.</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Q2: Explain Priority Inversion in RTOS.</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A scenario where a high-priority task is blocked by a low-priority task that holds a shared resource (like a mutex), which is itself preempted by a medium-priority task. Solved via Priority Inheritance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. VLSI DESIGN & HDL */}
            {activeTab === 'vlsi' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>VLSI Design & HDL</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Hardware description languages are used to design custom silicon chips and configure FPGAs.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🛣️ VLSI Curriculum Pathway</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Step 1: Digital Electronics:</strong> Karnaugh maps, combinational logic, synchronous state machines (FSM).</li>
                      <li><strong>Step 2: Hardware Description Languages:</strong> Verilog syntax (blocking vs non-blocking assignments), testbenches.</li>
                      <li><strong>Step 3: FPGA Implementation:</strong> Xilinx Vivado suite, timing constraint files (.xdc), synthesis, routing.</li>
                      <li><strong>Step 4: ASIC Pipeline:</strong> Floorplanning, placement, clock tree synthesis (CTS), routing.</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Interview Q&A</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>Q1: What is the difference between blocking (=) and non-blocking (&lt;=) assignments?</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Blocking assignments execute sequentially in the order written, simulating combinational logic. Non-blocking assignments execute concurrently at the simulation time step, representing sequential latch/flip-flop logic.</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Q2: What is Setup Time and Hold Time?</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}><strong>Setup Time:</strong> Minimum time data must be stable before the clock edge.<br /><strong>Hold Time:</strong> Minimum time data must be stable after the clock edge.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. IOT & TELEMETRY */}
            {activeTab === 'iot' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>IoT & Telemetry</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Connecting low-power devices to cloud pipelines requires networking knowledge and data telemetry management.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>📡 Key IoT Tech Stack</h3>
                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <li><strong>Network protocols:</strong> MQTT (lightweight broker), HTTP web requests, LoRaWAN (long range), Zigbee (mesh).</li>
                      <li><strong>Hardware modules:</strong> ESP32 NodeMCU, Raspberry Pi Pico W, LoRa transceiver boards.</li>
                      <li><strong>Cloud platforms:</strong> AWS IoT Core, ThingsSpeak MQTT logger, Node-RED pipelines.</li>
                      <li><strong>Databases:</strong> InfluxDB (time-series data), MongoDB (JSON state profiles).</li>
                    </ul>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Common Telemetry Architecture</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      ESP32 Node (Samples sensor spikes) &rarr; WiFi/LoRa Gateway &rarr; MQTT Broker (HiveMQ/AWS) &rarr; Time-series Database &rarr; React Telemetry Dashboard (Displays graphs, gauges, and warnings).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 8. APTITUDE & REASONING */}
            {activeTab === 'aptitude' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Aptitude & Reasoning</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Most placement processes start with a first-round elimination quantitative and logical aptitude test.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>📐 Quantitative Aptitude Focus</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                      First-round tests check speed and logical connections. Master these topics:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8rem' }}>
                      <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                        <strong>📐 Arithmetic Maths</strong>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Time & Work, Speed-Distance, Averages, Percentages, Profit & Loss.</div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                        <strong>🎲 Probability & Stats</strong>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Permutations, Combinations, probability distributions, coin/card problems.</div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                        <strong>🧠 Logical Reasoning</strong>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Syllogisms, Blood Relations, Coding-Decoding, Seating arrangement algorithms.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. LATEX RESUME TEMPLATE */}
            {activeTab === 'resume' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>LaTeX Fresher Resume Template</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  ATS scanners parse LaTeX layouts much better than complex multi-column Word/Canva PDF templates. Use this standard structure in Overleaf.
                </p>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <strong style={{ fontSize: '1rem' }}>📄 Single-Column ATS Template</strong>
                    <button
                      onClick={() => handleCopy(resumeTemplate, 'latex-code')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-purple)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {copiedText === 'latex-code' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'latex-code' ? 'Copied LaTeX Code!' : 'Copy Template Code'}
                    </button>
                  </div>

                  <pre
                    style={{
                      background: 'var(--bg-tertiary)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'monospace',
                      maxHeight: '350px',
                      overflowY: 'auto',
                      textAlign: 'left'
                    }}
                  >
                    {resumeTemplate}
                  </pre>
                </div>
              </div>
            )}

            {/* 10. MOCK INTERVIEWS */}
            {activeTab === 'mock' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Mock Interview & Mentoring Prep</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Talking clearly through your project designs is what gets you selected. We arrange live mentorship simulations.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                    <HelpCircle size={40} style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Book a 1-on-1 Placement Interview Review</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
                      Get your custom DIY project codes, resume structure, and target coding questions verified by one of our core developer engineers via Zoom.
                    </p>

                    <button
                      className="glow-btn"
                      onClick={() => {
                        const text = "Hello CircuitCraft Studio! 🚀 I am interested in booking my 1-on-1 Mock Technical Interview session included in my Roadmap Bundle.";
                        window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '30px',
                        fontSize: '0.85rem'
                      }}
                    >
                      Book Free Mock Session on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
