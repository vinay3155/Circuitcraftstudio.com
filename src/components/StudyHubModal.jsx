import React, { useState, useEffect, useRef } from 'react';
import { X, BookOpen, FileText, Check, Copy, ExternalLink, Download, MessageCircle, ArrowRight, Award, Cpu, Star } from 'lucide-react';

export default function StudyHubModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'placement'
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState('3');
  const [expandedQA, setExpandedQA] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Lock background scroll
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Click outside to close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(''), 2000);
  };

  if (!isOpen) return null;

  // VTU Syllabus and Q&A Database
  const vtuNotesDb = {
    CSE: {
      1: [
        {
          code: "21PHY12",
          name: "Engineering Physics",
          modules: [
            "Module 1: Oscillations and Waves (SHM, Damped & Forced Oscillations, Shock waves)",
            "Module 2: Lasers & Optical Fibers (Einstein coefficients, Population inversion, Optical fibers TIR)",
            "Module 3: Quantum Mechanics (De-Broglie hypothesis, Uncertainty principle, Schrodinger Wave Equation)",
            "Module 4: Electrical Properties (Free electron theory, Band theory, Hall effect)",
            "Module 5: Physics of Semiconductor Devices (Fermi level, p-n junction diode, Solar cells)"
          ],
          qa: [
            { q: "Derive Schrodinger's time-independent wave equation.", a: "Schrodinger's time-independent equation is derived by substituting de-Broglie's wavelength (λ = h/p) into the classical wave function and applying conservation of total energy (E = K + V). The resulting equation is: -ħ²/(2m) ∇²Ψ + VΨ = EΨ, where ħ is h/2π, m is mass, V is potential energy, and E is total energy." },
            { q: "Explain the working principle of Optical Fibers.", a: "Optical fibers operate on the principle of Total Internal Reflection (TIR). Light launched into the core propagates by continuously bouncing off the cladding boundary. For TIR to occur: 1) The core refractive index (n1) must be greater than cladding (n2), and 2) The angle of incidence must exceed the critical angle θc = sin⁻¹(n2/n1)." }
          ]
        },
        {
          code: "21MAT11",
          name: "Engineering Mathematics-I",
          modules: [
            "Module 1: Calculus (Polar curves, Angle between radius vector and tangent, Curvature)",
            "Module 2: Series Expansion & Multivariable Calculus (Taylor's series, Maclaurin's series, Partial derivatives)",
            "Module 3: Vector Calculus (Gradient, Divergence, Curl, Solenoidal and Irrotational vectors)",
            "Module 4: Linear Algebra (System of linear equations, Rank of matrix, Gauss-elimination, Eigenvalues)",
            "Module 5: Differential Equations (Linear ODEs of first order, Bernoulli's equations, Orthogonal trajectories)"
          ],
          qa: [
            { q: "What is the condition for a vector field to be Solenoidal or Irrotational?", a: "A vector field F is Solenoidal if its divergence is zero: ∇ · F = 0 (net flux through any closed surface is zero). F is Irrotational if its curl is zero: ∇ × F = 0 (the field has no rotational or vortex component)." }
          ]
        }
      ],
      3: [
        {
          code: "21CS32",
          name: "Data Structures and Applications",
          modules: [
            "Module 1: Pointers & Memory Management (malloc, calloc, realloc, structures, representations)",
            "Module 2: Stacks & Queues (Push/Pop operations, Infix to Postfix conversion, Circular & Double Ended Queues)",
            "Module 3: Linked Lists (Singly, Doubly, and Circular linked lists operations, insertion, deletion, polynomial addition)",
            "Module 4: Trees (Binary Tree traversals, Binary Search Tree insertion/deletion, AVL Trees, Threaded Binary Trees)",
            "Module 5: Graphs & Hashing (Adjacency Matrix/Lists, BFS and DFS traversals, Hash functions, Collision resolution)"
          ],
          qa: [
            { q: "Write a C function to reverse a singly linked list.", a: "To reverse a list, we traverse it and adjust the pointers: \n\nNode* reverse(Node* head) {\n  Node *prev = NULL, *current = head, *next = NULL;\n  while (current != NULL) {\n    next = current->next;\n    current->next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}" },
            { q: "Compare Binary Search Trees (BST) and AVL Trees.", a: "A Binary Search Tree (BST) has nodes ordered such that left child < root < right child. However, a BST can become skewed, leading to O(N) lookup time. An AVL tree is a self-balancing BST where the height difference (balance factor) between left and right subtrees is at most 1, guaranteeing O(log N) lookup time for all operations via rotations." }
          ]
        },
        {
          code: "21CS33",
          name: "Analog and Digital Electronics",
          modules: [
            "Module 1: Optoelectronic Devices & Wave Shaping (Photo diodes, solar cells, Clippers and Clampers)",
            "Module 2: Combinational Logic Circuits (Karnaugh Maps simplification, Quine-McCluskey method, multiplexers)",
            "Module 3: Decoders & Adders (Decoders, encoders, Full Adder, Multiplexers, Programmable Logic Arrays)",
            "Module 4: Latches & Flip-Flops (SR, JK, D, and T Flip-Flops, Master-Slave configuration)",
            "Module 5: Counters & Shift Registers (Asynchronous/Synchronous Counters, Ring Counter, Johnson Counter)"
          ],
          qa: [
            { q: "Explain JK Flip-Flop race-around condition and how to solve it.", a: "A race-around condition occurs in JK Flip-Flops when J=1 and K=1, and the clock pulse width (tp) is larger than the propagation delay of the flip-flop (td). The output toggles repeatedly within a single clock cycle, resulting in an unpredictable final state. Solutions: 1) Reduce clock pulse width (edge-triggering), 2) Use a Master-Slave JK Flip-Flop configuration." }
          ]
        }
      ],
      5: [
        {
          code: "21CS52",
          name: "Database Management System",
          modules: [
            "Module 1: Introduction (Three-schema architecture, ER model constructs, Entity relationships)",
            "Module 2: Relational Model & SQL (Relational algebra operations, SELECT/FROM/WHERE, JOINS, nested queries)",
            "Module 3: SQL Advanced & Application design (Triggers, assertions, views, embedded SQL, cursor loops)",
            "Module 4: Normalization Theory (Functional dependencies, 1NF, 2NF, 3NF, BCNF decomposition)",
            "Module 5: Transaction & Recovery (ACID properties, serializability schedules, two-phase locking, log recovery)"
          ],
          qa: [
            { q: "Explain the ACID properties of a Database Transaction.", a: "Transactions must satisfy four properties:\n1. Atomicity: All operations in the transaction succeed, or the entire transaction is rolled back (All-or-Nothing).\n2. Consistency: A transaction transitions the database from one valid state to another, preserving integrity constraints.\n3. Isolation: Concurrent transactions execute without interfering with each other.\n4. Durability: Once committed, updates persist even in the event of system failures." },
            { q: "What is BCNF and how does it differ from 3NF?", a: "A relation is in Boyce-Codd Normal Form (BCNF) if for every functional dependency X -> Y, X is a superkey. BCNF is stricter than 3NF. In 3NF, X -> Y is allowed if Y is a prime attribute (part of a candidate key), even if X is not a superkey. BCNF eliminates this, resolving anomalies that 3NF might miss." }
          ]
        },
        {
          code: "21CS53",
          name: "Computer Networks",
          modules: [
            "Module 1: Application Layer Protocols (HTTP, FTP, SMTP, DNS, Peer-to-Peer architecture)",
            "Module 2: Transport Layer (UDP segment structure, TCP connection management, Congestion control, Flow control)",
            "Module 3: Network Layer Data Plane (IP routing, IPv4 and IPv6 addressing schemes, Subnetting, NAT)",
            "Module 4: Network Layer Control Plane (Routing algorithms OSPF and BGP, Software Defined Networking)",
            "Module 5: Link Layer (Error detection parity/CRC, Multiple access CSMA/CD, Ethernet switches, ARP)"
          ],
          qa: [
            { q: "Explain the difference between TCP and UDP.", a: "TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering, handles flow/congestion control, and uses a 3-way handshake. UDP (User Datagram Protocol) is connectionless, unreliable (best-effort delivery), fast, does not order packets, and is ideal for real-time video streaming or gaming." }
          ]
        }
      ]
    },
    ECE: {
      3: [
        {
          code: "21EC32",
          name: "Network Analysis",
          modules: [
            "Module 1: Basic nodal and mesh analysis, Super-node and Super-mesh configurations",
            "Module 2: Network Theorems (Superposition, Thevenin's, Norton's, Maximum Power Transfer Theorem)",
            "Module 3: Transient Behavior (RL, RC, RLC circuits analysis under DC and AC excitations)",
            "Module 4: Resonance circuits (Series and Parallel resonance, Quality factor, bandwidth)",
            "Module 5: Two-port networks (z-parameters, y-parameters, h-parameters, transmission parameters)"
          ],
          qa: [
            { q: "State Maximum Power Transfer Theorem for DC networks.", a: "The Maximum Power Transfer Theorem states that maximum power is delivered from a source to a load when the load resistance (RL) is exactly equal to the internal resistance of the source (or Thevenin's equivalent resistance, Rth). i.e. RL = Rth." }
          ]
        }
      ]
    }
  };

  // Fallback subjects generator to make sure there's always content
  const getSubjects = (branch, sem) => {
    if (vtuNotesDb[branch] && vtuNotesDb[branch][sem]) {
      return vtuNotesDb[branch][sem];
    }
    // Generic generator
    return [
      {
        code: `21${branch}${sem}1`,
        name: `Core ${branch} Engineering Subject`,
        modules: [
          "Module 1: Introduction and Fundamental Concepts of the discipline",
          "Module 2: Core analytical methods, formulas, and baseline configurations",
          "Module 3: System architecture design, implementation blocks, and parameters",
          "Module 4: Testing protocols, numerical simulation, and boundary criteria",
          "Module 5: Advanced application systems, industrial integration, and future scope"
        ],
        qa: [
          { q: "What is the primary objective of this subject?", a: "This subject provides a comprehensive overview of fundamental principles and analytical techniques in this domain, preparing engineering students for hardware and software design architectures." },
          { q: "How are the modules structured for VTU exams?", a: "VTU exams test conceptual clarity and problem-solving. Modules 1-3 focus on core derivations and models, while Modules 4-5 test application scenarios and schematics." }
        ]
      },
      {
        code: `21${branch}${sem}2`,
        name: `${branch} Applied Systems & Analysis`,
        modules: [
          "Module 1: Introduction to system nodes and sensor parameters",
          "Module 2: Data processing methodologies and mathematical transforms",
          "Module 3: Local telemetry loops, bus protocols, and hardware integration",
          "Module 4: Power constraints, low-power optimization, and thermal cooling",
          "Module 5: Solved industrial case-studies and prototype testing routines"
        ],
        qa: [
          { q: "Explain the importance of transient stability in this domain.", a: "Transient stability ensures that systems return to their normal operating equilibrium states following a sudden disturbance or shock load, preventing system failure." }
        ]
      }
    ];
  };

  const currentSubjects = getSubjects(selectedBranch, selectedSem);

  const handlePdfRequest = (subjectName) => {
    const text = `Hello CircuitCraft Studio! 🚀 I am a VTU student looking to download the complete Module 1-5 Handwritten Notes & Solved Question Papers PDF for the subject "${subjectName}" (${selectedBranch} - Sem ${selectedSem}). Please send me the file.`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
  };

  // LaTeX fresher resume template
  const resumeTemplate = `% LaTeX Fresher Resume Template - CircuitCraft Studio
\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=0.7in}

\\begin{document}
\\begin{center}
    {\\Huge \\textbf{YOUR NAME}} \\\\
    \\small Email: yourname@gmail.com | Phone: +91-XXXX-XXXXXX | GitHub: github.com/yourusername
\\end{center}

\\hrule
\\vspace{0.4em}
\\textbf{EDUCATION} \\\\
\\textbf{Visvesvaraya Technological University (VTU)} \\hfill Bangalore, India \\\\
Bachelor of Engineering in Computer Science \\hfill CGPA: 8.5 / 10 | 2022 - 2026

\\vspace{0.6em}
\\textbf{TECHNICAL SKILLS} \\\\
\\textbf{Languages:} C++, JavaScript, C, SQL \\\\
\\textbf{Developer Tools:} Git, VS Code, Arduino IDE \\\\
\\textbf{Web Tech & Frameworks:} React.js, Express.js, Node.js, HTML/CSS \\\\
\\textbf{Hardware/IoT:} ESP32, Arduino Uno, Sensor Arrays (I2C/SPI), Telemetry

\\vspace{0.6em}
\\textbf{PROJECTS} \\\\
\\textbf{Smart IoT Drip Irrigation System (SIH Finalist)} \\hfill Dec 2025 \\\\
- Engineered a low-power telemetry node using ESP32 and capacitive moisture sensors. \\\\
- Logged soil parameters to Blynk and built a React dashboard representing real-time metrics. \\\\
- Reduced water wastage by 30% through automated solenoid valve logic.

\\vspace{0.6em}
\\textbf{AWARDS \\& ACHIEVEMENT} \\\\
- Smart India Hackathon 2025 Finalist (Ministry of Agriculture Node) \\\\
- 1st Place in College Techfest Robot-Sumo Design Challenge
\\end{document}`;

  // Top 10 coding questions
  const codingQuestions = [
    { name: "Two Sum", difficulty: "Easy", dsa: "Arrays / Hashing", link: "https://leetcode.com/problems/two-sum/" },
    { name: "Valid Parentheses", difficulty: "Easy", dsa: "Stacks", link: "https://leetcode.com/problems/valid-parentheses/" },
    { name: "Reverse a Linked List", difficulty: "Easy", dsa: "Linked Lists", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { name: "Merge Intervals", difficulty: "Medium", dsa: "Arrays / Sorting", link: "https://leetcode.com/problems/merge-intervals/" },
    { name: "Group Anagrams", difficulty: "Medium", dsa: "Hashing", link: "https://leetcode.com/problems/group-anagrams/" },
    { name: "Binary Tree Level Order Traversal", difficulty: "Medium", dsa: "Trees (BFS)", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", dsa: "Sliding Window", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { name: "Find Median from Data Stream", difficulty: "Hard", dsa: "Heaps", link: "https://leetcode.com/problems/find-median-from-data-stream/" },
    { name: "Edit Distance", difficulty: "Hard", dsa: "Dynamic Programming", link: "https://leetcode.com/problems/edit-distance/" }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 14, 23, 0.88)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.25s ease-out'
      }}
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '90vh',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          boxShadow: 'var(--glow-cyan-strong)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={22} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
              VTU Study Hub & Placement Prep
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs bar */}
        <div 
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.2)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 1rem'
          }}
        >
          <button
            onClick={() => setActiveTab('notes')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: '2px solid',
              borderColor: activeTab === 'notes' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'notes' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} />
            VTU Subject Notes
          </button>
          <button
            onClick={() => setActiveTab('placement')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: '2px solid',
              borderColor: activeTab === 'placement' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'placement' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <FileText size={16} />
            Placement Support Prep
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {/* TAB 1: VTU NOTES PORTAL */}
          {activeTab === 'notes' && (
            <div>
              {/* Selectors Bar */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {/* Branch Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '150px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Select Branch</label>
                  <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    style={{
                      padding: '0.6rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: '#fff',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="CSE">CSE (Computer Science)</option>
                    <option value="ISE">ISE (Information Science)</option>
                    <option value="ECE">ECE (Electronics & Comm)</option>
                    <option value="EEE">EEE (Electrical & Electronics)</option>
                  </select>
                </div>

                {/* Semester Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '150px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Select Semester</label>
                  <select 
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                    style={{
                      padding: '0.6rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: '#fff',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>{sem === 1 || sem === 21 ? `${sem}st Sem` : sem === 2 ? '2nd Sem' : sem === 3 ? '3rd Sem' : `${sem}th Sem`}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Display Grid */}
              <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                📚 Subjects for {selectedBranch} - Semester {selectedSem}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {currentSubjects.map((subject) => (
                  <div 
                    key={subject.code} 
                    className="glass-panel" 
                    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'border-color 0.2s' }}
                  >
                    {/* Subject Card Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span 
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: 'rgba(0, 229, 255, 0.1)',
                            border: '1px solid rgba(0, 229, 255, 0.2)',
                            color: 'var(--accent-cyan)',
                            marginRight: '0.5rem'
                          }}
                        >
                          {subject.code}
                        </span>
                        <h5 style={{ display: 'inline-block', fontSize: '1.1rem', color: '#fff', margin: 0 }}>{subject.name}</h5>
                      </div>
                      <button 
                        className="glow-btn"
                        onClick={() => handlePdfRequest(subject.name)}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Download size={14} /> Request PDF Notes
                      </button>
                    </div>

                    {/* Syllabus Outlines */}
                    <div style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Syllabus Breakdown (Modules 1 - 5)
                      </span>
                      <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {subject.modules.map((mod, index) => (
                          <li key={index} style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--accent-cyan)' }}>•</span> {mod}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solved Q&A Exam Questions */}
                    {subject.qa && subject.qa.length > 0 && (
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                          🔑 Solved High-Frequency Exam Questions
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {subject.qa.map((qaItem, idx) => {
                            const isExpanded = expandedQA === `${subject.code}-${idx}`;
                            return (
                              <div 
                                key={idx} 
                                style={{
                                  background: 'var(--bg-tertiary)',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '6px',
                                  overflow: 'hidden'
                                }}
                              >
                                <button
                                  onClick={() => setExpandedQA(isExpanded ? null : `${subject.code}-${idx}`)}
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.6rem 1rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}
                                >
                                  <span>Q{idx+1}: {qaItem.q}</span>
                                  <span style={{ color: 'var(--accent-cyan)' }}>{isExpanded ? '−' : '+'}</span>
                                </button>
                                {isExpanded && (
                                  <div 
                                    style={{
                                      padding: '0.75rem 1rem',
                                      borderTop: '1px solid var(--border-color)',
                                      background: 'rgba(0,0,0,0.15)',
                                      fontSize: '0.8rem',
                                      color: 'var(--text-secondary)',
                                      lineHeight: '1.5',
                                      whiteSpace: 'pre-line'
                                    }}
                                  >
                                    {qaItem.a}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PLACEMENT PREPARATION ROADMAP */}
          {activeTab === 'placement' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Placement Slogan */}
              <div 
                style={{
                  padding: '1.5rem',
                  background: 'rgba(139, 92, 246, 0.04)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  textAlign: 'left'
                }}
              >
                <h4 style={{ color: 'var(--accent-purple)', fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={18} /> Complete Placement Preparation Guide
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Getting placed in top engineering firms requires a target roadmap. We have structured a step-by-step prep curriculum covering quantitative aptitude, LeetCode style DSA, core CS fundamentals, and resume templates.
                </p>
              </div>

              {/* 5-Step Process Pipeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* STEP 1: Aptitude & Reasoning */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-cyan)' }}>
                  <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Step 1: Aptitude & Logical Reasoning (Screening round)</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    First-round elimination checks your mathematical and problem-solving abilities. Focus heavily on:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8rem' }}>
                    <div style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>📐 Quantitative Math</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Time & Work, Averages, Percentages, Probability, Permutations.</div>
                    </div>
                    <div style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>🧠 Logical Reasoning</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Syllogisms, Blood Relations, Coding-Decoding, Seating arrangement.</div>
                    </div>
                    <div style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-cyan)' }}>💬 Verbal Ability</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Sentence correction, Reading comprehension, Synonyms.</div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Coding & DSA */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-green)' }}>
                  <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Step 2: DSA Coding Rounds (Standard Questions)</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    Practice these selected standard interview coding questions frequently tested in coding rounds:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                    {codingQuestions.map((q, idx) => (
                      <a 
                        href={q.link} 
                        target="_blank" 
                        rel="noreferrer"
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.6rem 0.85rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>{q.name}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({q.dsa})</span>
                        </div>
                        <span 
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.4rem',
                            borderRadius: '4px',
                            background: q.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.1)' : q.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: q.difficulty === 'Easy' ? 'var(--accent-green)' : q.difficulty === 'Medium' ? 'var(--accent-yellow)' : '#ef4444',
                            border: '1px solid',
                            borderColor: q.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' : q.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                          }}
                        >
                          {q.difficulty}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* STEP 3: Core CS Theory */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-blue)' }}>
                  <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Step 3: Core CS Theory (Technical Interview)</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    Revise these core subjects thoroughly before your face-to-face technical panel interviews:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-blue)' }}>☕ Object Oriented Programming (OOP)</strong>
                      <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>Inheritance (code reuse), Polymorphism (overloading/overriding), Abstraction (interfaces), Encapsulation (data hiding).</p>
                    </div>
                    <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-blue)' }}>💾 Database Management (DBMS)</strong>
                      <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>SQL Join queries (Inner, Left, Right), Database Normalization rules (1NF to BCNF), transaction ACID compliance properties.</p>
                    </div>
                    <div style={{ padding: '0.65rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--accent-blue)' }}>🖥️ Operating Systems (OS)</strong>
                      <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>Process vs Threads, CPU Scheduling (SJF, Round Robin), Deadlock necessary conditions (mutual exclusion, hold & wait, no preemption, circular wait).</p>
                    </div>
                  </div>
                </div>

                {/* STEP 4: Resume Template */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-purple)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h5 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>Step 4: Fresher LaTeX Resume Template</h5>
                    <button
                      onClick={() => handleCopy(resumeTemplate, 'latex')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      {copiedText === 'latex' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'latex' ? 'Copied!' : 'Copy LaTeX code'}
                    </button>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                    Copy this ATS-friendly standard LaTeX resume structure and compile it in Overleaf for a professional software/electronics fresher template:
                  </p>
                  <pre
                    style={{
                      background: '#05070c',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'monospace',
                      maxHeight: '180px',
                      overflowY: 'auto',
                      textAlign: 'left'
                    }}
                  >
                    {resumeTemplate}
                  </pre>
                </div>

                {/* STEP 5: HR Interview & Mock Booking */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-yellow)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h5 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>Step 5: HR Interview Prep & Live Mock Booking</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5' }}>
                      Prepare for behavioral assessments by framing answers using the <strong>STAR</strong> model (Situation, Task, Action, Result). Common questions: "Tell me about yourself", "What are your weaknesses?", "How did you solve conflicts in a team project?".
                    </p>
                  </div>

                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      flexWrap: 'wrap',
                      background: 'rgba(251, 191, 36, 0.03)', 
                      border: '1px solid rgba(251, 191, 36, 0.15)', 
                      padding: '1rem', 
                      borderRadius: '8px' 
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span style={{ color: 'var(--accent-yellow)', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                        🎯 Get Placement-Ready with Mentoring
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Book a 30-minute Mock Technical Interview or Resume Critique session with our project engineering experts.
                      </span>
                    </div>
                    <button 
                      className="glow-btn"
                      onClick={() => {
                        const text = "Hello CircuitCraft Studio! 🚀 I am interested in scheduling a 1-on-1 Mock Interview / Resume Review session with an engineering mentor to prepare for my placements.";
                        window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '30px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, var(--accent-yellow) 0%, #d97706 100%)',
                        boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
                      }}
                    >
                      <MessageCircle size={16} /> Book Interview
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
