import React, { useState, useEffect, useRef } from 'react';
import { X, BookOpen, FileText, Check, Copy, ExternalLink, Download, Upload, MessageCircle, ArrowRight, Award, Cpu, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function StudyHubModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'placement'
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState('3');
  const [expandedSubject, setExpandedSubject] = useState(null); // track expanded subject code
  const [activeModuleNotes, setActiveModuleNotes] = useState(null); // { subjectCode, subjectName, moduleIndex }
  const [copiedText, setCopiedText] = useState('');
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  
  // Custom imported notes database from localStorage
  const [customNotes, setCustomNotes] = useState({});

  const modalRef = useRef(null);

  // Load custom notes on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('circuitcraft_custom_notes');
      if (saved) {
        setCustomNotes(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load custom notes from localStorage", e);
    }
  }, []);

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

  const handleJsonImport = (inputString) => {
    try {
      setImportError('');
      setImportSuccess(false);
      
      if (!inputString.trim()) {
        setImportError('Please enter valid JSON string content.');
        return;
      }
      
      const parsed = JSON.parse(inputString);
      
      // Update state and save
      const merged = { ...customNotes, ...parsed };
      setCustomNotes(merged);
      localStorage.setItem('circuitcraft_custom_notes', JSON.stringify(merged));
      
      setImportSuccess(true);
      setJsonInput('');
      setTimeout(() => {
        setImportSuccess(false);
        setIsImporterOpen(false);
      }, 1500);
    } catch (e) {
      setImportError(`Invalid JSON format: ${e.message}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleJsonImport(event.target.result);
    };
    reader.onerror = () => {
      setImportError('Failed to read notes file.');
    };
    reader.readAsText(file);
  };

  const handleClearCustomNotes = () => {
    if (window.confirm("Are you sure you want to clear all imported custom notes?")) {
      setCustomNotes({});
      localStorage.removeItem('circuitcraft_custom_notes');
    }
  };

  if (!isOpen) return null;

  // VTU Syllabus and Subject Database based on user details
  const vtuSubjectsDb = {
    CSE: {
      3: [
        { code: "BCS301", name: "Mathematics for Computer Science" },
        { code: "BCS302", name: "Digital Design and Computer Organization" },
        { code: "BCS303", name: "Operating Systems" },
        { code: "BCS304", name: "Data Structures and Applications" },
        { code: "BCS306A", name: "Object Oriented Programming with JAVA" }
      ],
      4: [
        { code: "BCS401", name: "Analysis and Design of Algorithms" },
        { code: "BCS402", name: "Microcontrollers" },
        { code: "BCS405A", name: "Discrete Mathematical Structures" },
        { code: "BCSL456D", name: "Technical Writing using LaTex" },
        { code: "BBOC407", name: "Biology for Engineers" },
        { code: "BUHK408", name: "Universal Human values" },
        { code: "BCS405B", name: "Graph theory" }
      ],
      5: [
        { code: "BCS501", name: "Software Engineering and Project Management" },
        { code: "BCS502", name: "Computer Networks" },
        { code: "BCS503", name: "Theory of Computation" },
        { code: "BCSL504", name: "Web Technology Lab" },
        { code: "BAI515A", name: "Computer Graphics" },
        { code: "BCS515C", name: "Unix System Programming" },
        { code: "BRMK557", name: "Research Methodology and IPR" },
        { code: "BESK508", name: "Environmental Studies" }
      ],
      6: [
        { code: "BCS601", name: "Cloud Computing" },
        { code: "BCS602", name: "Machine Learning" },
        { code: "BIS601", name: "Full Stack Development" },
        { code: "BCS613A", name: "Blockchain Technology" },
        { code: "BCS613C", name: "Compiler Design" },
        { code: "BCS613B", name: "Computer Vision" },
        { code: "BAIL657C", name: "Generative AI" },
        { code: "BCSL657D", name: "Devops" },
        { code: "BCS613D", name: "Advanced Java" },
        { code: "BCO601", name: "Microcontrollers and Embedded Systems" },
        { code: "BME654A", name: "Project Management" },
        { code: "BCV654A", name: "Water Conservation and Rain Water Harvesting" },
        { code: "BCV654", name: "Integrated Waste Management for a Smart City" },
        { code: "BME654B", name: "Renewable Energy Power Plants" },
        { code: "BCS658", name: "Natural language processing" },
        { code: "BCS659", name: "Indian knowledge system" },
        { code: "BCS660", name: "Consumer electronics" },
        { code: "BCS661", name: "Cryptography And Network" }
      ]
    },
    AI: {
      3: [
        { code: "BCS301", name: "Mathematics for Computer Science" },
        { code: "BCS302", name: "Digital Design and Computer Organization" },
        { code: "BCS303", name: "Operating System" },
        { code: "BCS304", name: "Data Structures and Applications" },
        { code: "BCS3068", name: "Oops with c++" },
        { code: "BCS358A", name: "Data Analytics with Excel" },
        { code: "BCS358C", name: "Project Management with Git" },
        { code: "BCS306A", name: "Object Oriented Programming with JAVA" }
      ],
      4: [
        { code: "BAD402", name: "Artificial Intelligence" },
        { code: "BAI405D", name: "Algorithmic Game Theory" },
        { code: "BDS456B", name: "mongoDB Labarotary" },
        { code: "BCSL456D", name: "Technical Writing using Latex" },
        { code: "BUHK408", name: "UHV" },
        { code: "BCS401", name: "Analysis and Design of Algorithms" },
        { code: "BCS403", name: "Database Management System" },
        { code: "BCS405A", name: "Discrete Mathematical Structures" }
      ],
      5: [
        { code: "BAIL504", name: "Data Visualization Lab" },
        { code: "BAD515B", name: "Data Warehousing" },
        { code: "BCS501", name: "Software Engineering and project Management" },
        { code: "BCS502", name: "Computer Networks" },
        { code: "BCS503", name: "Theory of Computation" },
        { code: "BCS515C", name: "Unix System Programme" },
        { code: "BRMK557", name: "Research Methodology and IPR" },
        { code: "BESK508", name: "Environmental Studies" }
      ],
      6: [
        { code: "BAIL657C", name: "Generative AI" },
        { code: "BCO601", name: "Microcontroller and Embedded System" },
        { code: "BIS613D", name: "Cloud computing and security" },
        { code: "BAD613B", name: "Natural language processing" },
        { code: "BAI602", name: "Machine Learning-I" },
        { code: "BCSL657D", name: "Devops" },
        { code: "BCS613X", name: "Big data analytics" },
        { code: "BCS613A", name: "Block chain Technology" },
        { code: "BME654A", name: "Project Management" },
        { code: "BEE654B", name: "Technologies of Renewable Energy Sources" },
        { code: "BCV654A", name: "Water conservation and Rain harvesting" },
        { code: "BCV654C", name: "Integrated Waste management for smart city" }
      ]
    },
    ECE: {
      3: [
        { code: "BMATEC301", name: "AV Mathematics-III for EC Engineering" },
        { code: "BEC302", name: "Digital System Design using Verilog" },
        { code: "BEC303", name: "Electronic Principles and Circuits" },
        { code: "BEC304", name: "Network Analysis" },
        { code: "BEC306C", name: "Computer Organization and Architecture" },
        { code: "BECL305", name: "Analog and Digital Systems Design Laboratory" }
      ],
      4: [
        { code: "BEC401", name: "ELECTROMAGNETIC THEORY" },
        { code: "BEC402", name: "PRINCIPLES OF COMMUNICATION SYSTEMS" },
        { code: "BEC403", name: "Control Systems" },
        { code: "BEC405A", name: "MICROCONTROLLERS" },
        { code: "BECL404", name: "Communication Laboratory" }
      ],
      5: [
        { code: "BEC501", name: "Technological Innovation and Management Entrepreneurship" },
        { code: "BEC502", name: "Digital Signal Processing" },
        { code: "BEC503", name: "DIGITAL COMMUNICATION" },
        { code: "BEC515A", name: "Intelligent Systems and Machine Learning Algorithms" }
      ],
      6: [
        { code: "BEC601", name: "Embedded System Design" },
        { code: "BCE613A", name: "Multimedia Communication" },
        { code: "BEC602", name: "VLSI Design and Testing" }
      ]
    },
    EEE: {
      3: [
        { code: "BEE301", name: "Engineering Mathematics for EEE" },
        { code: "BEE302", name: "Electric Circuit Analysis" },
        { code: "BEE303", name: "Analog Electronic Circuits" },
        { code: "BEE304", name: "Transformers and Generators" },
        { code: "BEE306A", name: "DIGITAL LOGIC CIRCUITS" },
        { code: "BEE306B", name: "Electrical Measurements and Instrumentation" }
      ],
      4: [
        { code: "BEE401", name: "ELECTRIC MOTORS" },
        { code: "BEE402", name: "Transmission and Distribution" },
        { code: "BEE403", name: "Microcontrollers" },
        { code: "BBOK407", name: "Biology For Engineers" },
        { code: "BUHK408", name: "Universal human values course" },
        { code: "BEE405B", name: "OPAMPS AND LIC" },
        { code: "BEEL456D", name: "ARDUINO AND RASPBERRY PI" }
      ],
      5: [
        { code: "BEE501", name: "Engineering Management and Entrepreneurship" },
        { code: "BEE502", name: "Signals & DSP" },
        { code: "BEE503", name: "Power Electronics" },
        { code: "BEE515A", name: "High Voltage Engineering" },
        { code: "BRMK557", name: "RESEARCH METHODOLOGY AND IPR" }
      ],
      6: [
        { code: "BEE601", name: "POWER SYSTEM ANALYSIS I" },
        { code: "BEE602", name: "CONTROL SYSTEMS (PCC)" },
        { code: "BEE654B", name: "Technologies of Renewable Energy Sources" },
        { code: "BEE613B", name: "EMBEDDED SYSTEM DESIGN" }
      ]
    }
  };

  // Fallback subjects generator to make sure there's always content
  const getSubjects = (branch, sem) => {
    // Semester 1 & 2 are common across all branches
    if (sem === '1') {
      return [
        { code: "21MAT11", name: "MATHEMATICS 1" },
        { code: "21PHY12", name: "PHYSICS" },
        { code: "21CIV13", name: "CIVIL" },
        { code: "21ELE14", name: "ELECTRICAL" },
        { code: "21KAN19", name: "KANNADA" },
        { code: "21CAED15", name: "caed" }
      ];
    }
    if (sem === '2') {
      return [
        { code: "21MAT21", name: "MATHEMATICS 2" },
        { code: "21CHE22", name: "CHEMISTRY" },
        { code: "21ELN23", name: "ELECTRONICS" },
        { code: "21POP24", name: "POP(C)" },
        { code: "21PYT25", name: "PYTHON" },
        { code: "21IOT26", name: "INTERNET OF THINGS" }
      ];
    }

    if (vtuSubjectsDb[branch] && vtuSubjectsDb[branch][sem]) {
      return vtuSubjectsDb[branch][sem];
    }
    // Generic generator for 7th/8th Semesters if selected
    return [
      { code: `21${branch}${sem}1`, name: `${branch} Professional Core Subject-I` },
      { code: `21${branch}${sem}2`, name: `${branch} Professional Core Subject-II` },
      { code: `21${branch}P${sem}3`, name: "Project Work Phase-A" },
      { code: `21${branch}I${sem}4`, name: "Technical Internship" }
    ];
  };

  const getModulesForSubject = (subjectCode, subjectName) => {
    const name = subjectName.toLowerCase();
    if (name.includes("mathematics") || name.includes("math")) {
      return [
        "Module 1: Calculus & Curves (Polar curves, tangents, curvatures)",
        "Module 2: Advanced ODEs & Series (Taylor's, Maclaurin's series expansion)",
        "Module 3: Vector Calculus (Div, Curl, Gradient vector fields)",
        "Module 4: Linear Algebra & Matrices (System rank, Gauss elimination, Eigenvalues)",
        "Module 5: Partial Derivatives & Multiple Integrals"
      ];
    }
    if (name.includes("data structure") || name.includes("dsa")) {
      return [
        "Module 1: Pointers & Dynamic Memory (malloc, calloc, realloc, structures)",
        "Module 2: Stacks & Queues (Push/Pop operations, Infix to Postfix conversions)",
        "Module 3: Linked Lists (Singly, Doubly, and Circular linked lists operations)",
        "Module 4: Trees & Binary Search Trees (Traversal algorithms and BST heights)",
        "Module 5: Graphs & Hashing techniques (BFS/DFS traversals & collision resolution)"
      ];
    }
    if (name.includes("operating system") || name.includes("os")) {
      return [
        "Module 1: Introduction to OS Services, System Calls & Interfaces",
        "Module 2: Process Management (Creation, scheduling algorithms FIFO, SJF, RR)",
        "Module 3: Process Synchronization, Semaphores & Deadlock avoidance (Banker's)",
        "Module 4: Memory Management (Paging, segmentation, replacement algorithms)",
        "Module 5: File Systems, Storage structures, and Disk scheduling algorithms"
      ];
    }
    if (name.includes("database") || name.includes("dbms")) {
      return [
        "Module 1: Database System Concepts, Architectures & ER Modeling",
        "Module 2: Relational Algebra & SQL queries (Select, Join, nested queries)",
        "Module 3: Database Design rules, assertions & Triggers/Cursors",
        "Module 4: Functional Dependencies & Normalization (1NF, 2NF, 3NF, BCNF)",
        "Module 5: Transaction control, ACID properties & lock protocols"
      ];
    }
    if (name.includes("network")) {
      return [
        "Module 1: Physical layer & Application protocols (HTTP, SMTP, DNS, P2P)",
        "Module 2: Transport layer (UDP, TCP handshake, Congestion & Flow control)",
        "Module 3: Network layer (IPv4/IPv6 subnetting, NAT, Routing algorithms)",
        "Module 4: Link layer & Local Area Networks (Ethernet, multiple access protocols)",
        "Module 5: Wireless communication & Network Security (encryption, firewalls)"
      ];
    }
    if (name.includes("microcontroller") || name.includes("embedded") || name.includes("control systems")) {
      return [
        "Module 1: Microcontroller/System Architecture, Registers & Pins layout",
        "Module 2: Assembly & Embedded C Instruction Sets (Arithmetic & Logical)",
        "Module 3: Timers, Interrupt handling & Serial communication models",
        "Module 4: Hardware Interfacing (Keyboards, LCDs, motors, sensors)",
        "Module 5: Real-Time Operating Systems (RTOS) & Signal Control Loops"
      ];
    }
    if (name.includes("python")) {
      return [
        "Module 1: Python syntax, variables, operators & control statements",
        "Module 2: Functions, strings, arrays & recursion",
        "Module 3: Complex Data structures (Lists, Tuples, Dictionaries, Sets)",
        "Module 4: File IO systems, Exception handling & OOPS classes",
        "Module 5: GUI programming (Tkinter) & database connectivity"
      ];
    }
    if (name.includes("programming in c") || name.includes("pop")) {
      return [
        "Module 1: Introduction to C compilers, variables & operators",
        "Module 2: Branching and looping controls (if-else, switch, while, for)",
        "Module 3: One-dimensional and two-dimensional Arrays & Strings",
        "Module 4: User-defined Functions, recursion models & scope",
        "Module 5: Pointers, structures, unions & basic File IO operations"
      ];
    }
    if (name.includes("machine learning") || name.includes("ml") || name.includes("generative ai")) {
      return [
        "Module 1: Core concepts, datasets, training models & classifications",
        "Module 2: Supervised learning algorithms (Linear Regression, Decision Trees)",
        "Module 3: Unsupervised learning (Clustering, K-Means, PCA dimensional reduction)",
        "Module 4: Artificial Neural Networks, Backpropagation & deep learning layers",
        "Module 5: Model evaluations, validation tests & Generative foundations"
      ];
    }
    
    // Default fallback
    return [
      "Module 1: Core Concepts & Principles of " + subjectName,
      "Module 2: Technical Formulations and System Architectures",
      "Module 3: Practical implementation methods & coding interfaces",
      "Module 4: Diagnostics, Performance testing and testing protocols",
      "Module 5: Industrial deployment scenarios, Case-Studies & Future scopes"
    ];
  };

  const currentSubjects = getSubjects(selectedBranch, selectedSem);

  // Retrieve notes content (check custom imported, else return null)
  const getNotesContent = (subjectCode, moduleIndex) => {
    const moduleKey = `Module ${moduleIndex + 1}`;
    if (
      customNotes[selectedBranch] &&
      customNotes[selectedBranch][selectedSem] &&
      customNotes[selectedBranch][selectedSem][subjectCode] &&
      customNotes[selectedBranch][selectedSem][subjectCode][moduleKey]
    ) {
      return customNotes[selectedBranch][selectedSem][subjectCode][moduleKey];
    }
    return null;
  };

  // JSON Template example for notes import
  const jsonTemplateStr = `{
  "CSE": {
    "3": {
      "BCS304": {
        "Module 1": "Pointers are variables storing memory addresses...\\n\\nAllocation methods:\\n- malloc(): allocates raw bytes.\\n- calloc(): allocates zeroed memory.",
        "Module 2": "A Stack is a LIFO structure. Core operations: push() and pop(). Circular Queues avoid memory waste.",
        "Module 3": "Linked lists use nodes referencing next elements. List reversal prev/curr algorithm.",
        "Module 4": "Trees order left child < root < right child. Traversal: Inorder yields sorted keys.",
        "Module 5": "Graphs represent connections. DFS uses recursion while BFS implements dynamic Queue."
      }
    }
  }
}`;

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

  // Top 9 coding questions
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
            padding: '0 1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => {
                setActiveTab('notes');
                setActiveModuleNotes(null);
              }}
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

          {activeTab === 'notes' && (
            <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setIsImporterOpen(!isImporterOpen)}
                style={{
                  background: 'rgba(0, 229, 255, 0.05)',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-cyan)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                }}
              >
                <Upload size={14} /> Import Notes
              </button>
              {Object.keys(customNotes).length > 0 && (
                <button
                  onClick={handleClearCustomNotes}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(239, 68, 68, 0.7)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reset Imported Notes
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {/* TAB 1: VTU NOTES PORTAL */}
          {activeTab === 'notes' && (
            <div>
              {/* Importer Slide Panel */}
              {isImporterOpen && (
                <div 
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px dashed var(--accent-cyan)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h5 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>Import VTU Notes (JSON Utility)</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Paste notes in JSON format below, or upload a JSON file to add study guides directly onto the website.
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(jsonTemplateStr, 'json_template')}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                    >
                      {copiedText === 'json_template' ? <Check size={12} /> : <Copy size={12} />}
                      {copiedText === 'json_template' ? 'Copied Template!' : 'Copy JSON Format Template'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* File Picker */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <label 
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border-color)',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Upload size={14} /> Choose JSON File
                        <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                      </label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Files must end in .json</span>
                    </div>

                    <textarea
                      placeholder="Or paste JSON raw string here (e.g. { 'CSE': { '3': { 'BCS304': { 'Module 1': 'Note content...' } } } } )"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        outline: 'none'
                      }}
                    />

                    {importError && (
                      <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}>
                        ⚠️ {importError}
                      </div>
                    )}
                    {importSuccess && (
                      <div style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 600 }}>
                        ✓ Notes imported and merged successfully!
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => handleJsonImport(jsonInput)}
                        style={{
                          background: 'var(--accent-cyan)',
                          color: '#000',
                          border: 'none',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Submit JSON Notes
                      </button>
                      <button
                        onClick={() => setIsImporterOpen(false)}
                        style={{
                          background: 'transparent',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-color)',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                    onChange={(e) => {
                      setSelectedBranch(e.target.value);
                      setExpandedSubject(null);
                      setActiveModuleNotes(null);
                    }}
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
                    <option value="AI">AI (Artificial Intelligence)</option>
                    <option value="ECE">ECE (Electronics & Comm)</option>
                    <option value="EEE">EEE (Electrical & Electronics)</option>
                  </select>
                </div>

                {/* Semester Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '150px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Select Semester</label>
                  <select 
                    value={selectedSem}
                    onChange={(e) => {
                      setSelectedSem(e.target.value);
                      setExpandedSubject(null);
                      setActiveModuleNotes(null);
                    }}
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

              {/* Subject display area */}
              <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>📚 Subjects for {selectedSem === '1' || selectedSem === '2' ? 'Common First Year' : `${selectedBranch} - Semester ${selectedSem}`}</span>
                {activeModuleNotes && (
                  <button
                    onClick={() => setActiveModuleNotes(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    ← Back to Modules list
                  </button>
                )}
              </h4>

              {/* Notes Content Reader Panel */}
              {activeModuleNotes ? (
                <div 
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    textAlign: 'left',
                    background: '#070a10',
                    border: '1px solid var(--accent-cyan)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', borderRadius: '4px' }}>
                        {activeModuleNotes.subjectCode}
                      </span>
                      <h5 style={{ color: '#fff', fontSize: '1.15rem', margin: '0.25rem 0 0 0' }}>
                        {activeModuleNotes.subjectName} - Module {activeModuleNotes.moduleIndex + 1} Study Notes
                      </h5>
                    </div>
                    
                    {getNotesContent(activeModuleNotes.subjectCode, activeModuleNotes.moduleIndex) && (
                      <button
                        onClick={() => handleCopy(getNotesContent(activeModuleNotes.subjectCode, activeModuleNotes.moduleIndex), 'module_notes')}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border-color)',
                          color: '#fff',
                          padding: '0.45rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        {copiedText === 'module_notes' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedText === 'module_notes' ? 'Copied notes!' : 'Copy Module Notes'}
                      </button>
                    )}
                  </div>

                  {/* Dynamic Notes Content display */}
                  <div 
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.925rem',
                      lineHeight: '1.7',
                      whiteSpace: 'pre-line',
                      fontFamily: 'var(--font-sans)',
                      minHeight: '200px'
                    }}
                  >
                    {getNotesContent(activeModuleNotes.subjectCode, activeModuleNotes.moduleIndex) ? (
                      getNotesContent(activeModuleNotes.subjectCode, activeModuleNotes.moduleIndex)
                    ) : (
                      <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontWeight: 600, color: '#fff' }}>📝 Syllabus Topic Focus Outline:</div>
                        <div>{activeModuleNotes.topicText}</div>
                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', color: 'var(--accent-cyan)' }}>
                          💡 <strong>Notes content not imported yet!</strong> <br />
                          To display the full study notes here, click the **"Import Notes"** button at the top and upload the notes JSON.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Subjects List view */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {currentSubjects.map((subject) => {
                    const isSubjectExpanded = expandedSubject === subject.code;
                    const subjectModules = getModulesForSubject(subject.code, subject.name);
                    return (
                      <div 
                        key={subject.code}
                        className="glass-panel"
                        style={{
                          padding: '1.25rem 1.5rem',
                          transition: 'all 0.25s',
                          borderLeft: isSubjectExpanded ? '3px solid var(--accent-cyan)' : '1px solid var(--border-color)'
                        }}
                      >
                        {/* Subject card toggle trigger */}
                        <div 
                          onClick={() => setExpandedSubject(isSubjectExpanded ? null : subject.code)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                            <span 
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                background: 'rgba(0, 229, 255, 0.1)',
                                border: '1px solid rgba(0, 229, 255, 0.2)',
                                color: 'var(--accent-cyan)'
                              }}
                            >
                              {subject.code}
                            </span>
                            <span style={{ fontWeight: 600, color: '#fff', fontSize: '1.05rem' }}>{subject.name}</span>
                          </div>
                          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                            {isSubjectExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>

                        {/* Modules container details */}
                        {isSubjectExpanded && (
                          <div 
                            style={{ 
                              marginTop: '1.25rem', 
                              paddingTop: '1.25rem', 
                              borderTop: '1px solid rgba(255,255,255,0.05)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              textAlign: 'left'
                            }}
                          >
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                              Syllabus Modules (Click a module to view notes)
                            </span>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {subjectModules.map((moduleText, idx) => (
                                <div 
                                  key={idx}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem 1rem',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem'
                                  }}
                                >
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', flex: 1 }}>
                                    {moduleText}
                                  </span>
                                  
                                  <button
                                    className="glow-btn"
                                    onClick={() => setActiveModuleNotes({
                                      subjectCode: subject.code,
                                      subjectName: subject.name,
                                      moduleIndex: idx,
                                      topicText: moduleText
                                    })}
                                    style={{
                                      padding: '0.35rem 0.85rem',
                                      borderRadius: '15px',
                                      fontSize: '0.75rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.25rem'
                                    }}
                                  >
                                    Read Module Notes <ArrowRight size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
