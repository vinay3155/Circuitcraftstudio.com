import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Unlock, Key, Settings, FileText, Upload, AlertTriangle, CheckCircle, RefreshCw, Info, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const GitHubIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const domainLabels = {
  sde: 'Software Eng (SDE)',
  fullstack: 'Full Stack Dev',
  backend: 'Backend Dev',
  frontend: 'Frontend Dev',
  mobile: 'Mobile App Dev',
  datascience: 'Data Science & Anal',
  aiml: 'AI / Machine Learning',
  vlsi: 'VLSI Design',
  embedded: 'Embedded Systems',
  pcb: 'PCB Design & Hardware'
};

export default function OwnerDashboardModal({ isOpen, onClose, unlockedRoadmaps = {}, onToggleRoadmapUnlock }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  
  const [githubPat, setGithubPat] = useState('');
  const [isPatSaved, setIsPatSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState('3');
  const [expandedSubject, setExpandedSubject] = useState(null);
  
  // Track upload status of each module: { [subjectCode-moduleIndex]: { status: 'idle'|'uploading'|'success'|'error', message: '' } }
  const [uploadStatus, setUploadStatus] = useState({});
  const [filesToUpload, setFilesToUpload] = useState({}); // { [subjectCode-moduleIndex]: File }

  const [showRoadmapLocks, setShowRoadmapLocks] = useState(false);

  const modalRef = useRef(null);

  // Load saved Token & Auth from localStorage
  useEffect(() => {
    const savedPat = localStorage.getItem('cc_github_pat');
    if (savedPat) {
      setGithubPat(savedPat);
      setIsPatSaved(true);
    }
    const savedAuth = sessionStorage.getItem('cc_owner_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Keyboard escape handler
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

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Authenticate owner passcode
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '3155') {
      setIsAuthenticated(true);
      setPasscodeError('');
      sessionStorage.setItem('cc_owner_authenticated', 'true');
    } else {
      setPasscodeError('Invalid passcode. Access Denied.');
    }
  };

  // Save PAT to LocalStorage
  const handleSavePat = (e) => {
    e.preventDefault();
    if (!githubPat.trim()) {
      alert("Please enter a valid GitHub token.");
      return;
    }
    localStorage.setItem('cc_github_pat', githubPat.trim());
    setIsPatSaved(true);
    setShowSettings(false);
  };

  const handleClearPat = () => {
    if (window.confirm("Are you sure you want to remove your GitHub token from this browser?")) {
      localStorage.removeItem('cc_github_pat');
      setGithubPat('');
      setIsPatSaved(false);
    }
  };

  const handleFileChange = (subjectCode, moduleIndex, file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert("Please select a valid PDF file.");
      return;
    }
    setFilesToUpload(prev => ({
      ...prev,
      [`${subjectCode}-${moduleIndex}`]: file
    }));
    // Reset status for this module if they select a new file
    setUploadStatus(prev => ({
      ...prev,
      [`${subjectCode}-${moduleIndex}`]: { status: 'idle', message: '' }
    }));
  };

  // GitHub API File Committer
  const handleCommitToGithub = async (subjectCode, subjectName, moduleIndex) => {
    const key = `${subjectCode}-${moduleIndex}`;
    const file = filesToUpload[key];
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    if (!githubPat) {
      alert("GitHub Token is missing. Click settings to setup your token.");
      setShowSettings(true);
      return;
    }

    setUploadStatus(prev => ({
      ...prev,
      [key]: { status: 'uploading', message: 'Converting file...' }
    }));

    try {
      // 1. Convert file to Base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });
      reader.readAsDataURL(file);
      const fileBase64 = await base64Promise;

      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'uploading', message: 'Checking repository for existing file...' }
      }));

      // Repository details
      const owner = 'vinay3155';
      const repo = 'Circuitcraftstudio.com';
      const path = `public/pdfs/${subjectCode}_M${moduleIndex + 1}.pdf`;
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // 2. Fetch existing file SHA if it exists (needed to replace/overwrite a file)
      let sha = null;
      try {
        const checkRes = await fetch(url, {
          headers: {
            'Authorization': `token ${githubPat.trim()}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (checkRes.status === 200) {
          const data = await checkRes.json();
          sha = data.sha;
        }
      } catch (err) {
        // Ignored, file might not exist yet
      }

      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'uploading', message: 'Uploading file to GitHub...' }
      }));

      // 3. Put File Request
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubPat.trim()}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Upload notes: ${subjectCode} Module ${moduleIndex + 1} (${subjectName})`,
          content: fileBase64,
          sha: sha || undefined, // Send sha if updating
          branch: 'main'
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'GitHub API error');
      }

      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'success', message: 'Notes uploaded successfully! Vercel is now deploying. Visible live in 1-2 mins.' }
      }));
      
      // Clean up selected file
      setFilesToUpload(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

    } catch (error) {
      console.error(error);
      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'error', message: `Upload failed: ${error.message}` }
      }));
    }
  };

  if (!isOpen) return null;

  // Subjects database import list
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
        { code: "BCS613D", name: "Advanced Java" }
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
        { code: "BRMK557", name: "Research Methodology and IPR" }
      ],
      6: [
        { code: "BAIL657C", name: "Generative AI" },
        { code: "BCO601", name: "Microcontroller and Embedded System" },
        { code: "BIS613D", name: "Cloud computing and security" },
        { code: "BAD613B", name: "Natural language processing" },
        { code: "BAI602", name: "Machine Learning-I" },
        { code: "BCSL657D", name: "Devops" },
        { code: "BCS613X", name: "Big data analytics" }
      ]
    },
    ECE: {
      3: [
        { code: "BMATEC301", name: "AV Mathematics-III for EC Engineering" },
        { code: "BEC302", name: "Digital System Design using Verilog" },
        { code: "BEC303", name: "Electronic Principles and Circuits" },
        { code: "BEC304", name: "Network Analysis" },
        { code: "BEC306C", name: "Computer Organization and Architecture" }
      ],
      4: [
        { code: "BEC401", name: "ELECTROMAGNETIC THEORY" },
        { code: "BEC402", name: "PRINCIPLES OF COMMUNICATION SYSTEMS" },
        { code: "BEC403", name: "Control Systems" },
        { code: "BEC405A", name: "MICROCONTROLLERS" }
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
        { code: "BEE306A", name: "DIGITAL LOGIC CIRCUITS" }
      ],
      4: [
        { code: "BEE401", name: "ELECTRIC MOTORS" },
        { code: "BEE402", name: "Transmission and Distribution" },
        { code: "BEE403", name: "Microcontrollers" },
        { code: "BEE405B", name: "OPAMPS AND LIC" }
      ],
      5: [
        { code: "BEE501", name: "Engineering Management and Entrepreneurship" },
        { code: "BEE502", name: "Signals & DSP" },
        { code: "BEE503", name: "Power Electronics" },
        { code: "BEE515A", name: "High Voltage Engineering" }
      ],
      6: [
        { code: "BEE601", name: "POWER SYSTEM ANALYSIS I" },
        { code: "BEE602", name: "CONTROL SYSTEMS (PCC)" },
        { code: "BEE613B", name: "EMBEDDED SYSTEM DESIGN" }
      ]
    }
  };

  const getSubjects = (branch, sem) => {
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
    return [
      { code: `21${branch}${sem}1`, name: `${branch} Subject 1` },
      { code: `21${branch}${sem}2`, name: `${branch} Subject 2` }
    ];
  };

  const currentSubjects = getSubjects(selectedBranch, selectedSem);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 14, 23, 0.9)',
        backdropFilter: 'blur(16px)',
        zIndex: 1100, // Higher than study hub modal
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
          maxWidth: '900px',
          height: '85vh',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.25)',
          borderRadius: '20px',
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
            <Lock size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
              Owner Study Hub Console
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: showSettings ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.85rem'
                }}
              >
                <Settings size={16} />
                {showSettings ? "Back to Dashboard" : "GitHub Setup"}
              </button>
            )}

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
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Outer Login Overlay if not authenticated */}
        {!isAuthenticated ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <form 
              onSubmit={handleLogin}
              style={{
                maxWidth: '350px',
                width: '100%',
                background: 'var(--bg-tertiary)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <Key size={36} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Security Authentication</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                Enter the Owner Passcode to unlock the file database commit console.
              </p>

              <input 
                type="password" 
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}
                autoFocus
              />

              {passcodeError && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                  <AlertTriangle size={12} /> {passcodeError}
                </div>
              )}

              <button 
                type="submit" 
                className="glow-btn"
                style={{ width: '100%', padding: '0.65rem 0' }}
              >
                Authenticate
              </button>
            </form>
          </div>
        ) : showSettings ? (
          /* SETTINGS VIEW: Setup GitHub PAT */
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', textAlign: 'left' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GitHubIcon size={22} style={{ color: 'var(--accent-cyan)' }} />
                Connect GitHub Repository
              </h3>
              
              <div 
                style={{ 
                  background: 'rgba(0, 229, 255, 0.03)', 
                  border: '1px solid rgba(0, 229, 255, 0.15)', 
                  padding: '1.25rem', 
                  borderRadius: '8px', 
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem'
                }}
              >
                <strong>📌 How this works:</strong><br />
                To allow this browser to upload PDF files directly into your GitHub codebase (in the <code style={{ color: 'var(--accent-cyan)' }}>public/pdfs/</code> folder), you need to provide a temporary GitHub Access Token. 
                <br />
                This token is saved **only in your browser's local memory**. It is never sent to any other servers.
              </div>

              <form onSubmit={handleSavePat}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    GitHub Personal Access Token (PAT)
                  </label>
                  <input 
                    type="password" 
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    value={githubPat}
                    onChange={(e) => setGithubPat(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {isPatSaved && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={12} /> Token saved in browser local storage.
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="glow-btn" style={{ padding: '0.5rem 1.5rem' }}>
                    Save Token
                  </button>
                  {isPatSaved && (
                    <button 
                      type="button" 
                      onClick={handleClearPat}
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete Token
                    </button>
                  )}
                </div>
              </form>

              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={16} /> How to generate a GitHub Token:
                </h4>
                <ol style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Go to <strong>GitHub.com</strong> &rarr; click your profile photo (top right) &rarr; <strong>Settings</strong>.</li>
                  <li>Scroll down the left sidebar &rarr; click <strong>Developer Settings</strong>.</li>
                  <li>Click <strong>Personal Access Tokens</strong> &rarr; click <strong>Tokens (classic)</strong>.</li>
                  <li>Click <strong>Generate new token</strong> &rarr; select <strong>Generate new token (classic)</strong>.</li>
                  <li>Give it a note (e.g. "CircuitCraft Studio Dashboard") and check the <strong>public_repo</strong> scope checkbox.</li>
                  <li>Click <strong>Generate token</strong> at the bottom, copy the code starting with <code style={{ color: 'var(--accent-cyan)' }}>ghp_</code> and paste it above!</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          /* MAIN CONSOLE VIEW */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Filter Bar */}
            <div 
              style={{
                padding: '1rem 1.5rem',
                background: 'var(--bg-tertiary)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              {/* Branch Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Branch</label>
                <select 
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    setExpandedSubject(null);
                  }}
                  style={{
                    padding: '0.5rem',
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

              {/* Semester Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '150px' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Semester</label>
                <select 
                  value={selectedSem}
                  onChange={(e) => {
                    setSelectedSem(e.target.value);
                    setExpandedSubject(null);
                  }}
                  style={{
                    padding: '0.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map(sem => (
                    <option key={sem} value={sem}>{sem}st Sem</option>
                  ))}
                </select>
              </div>

              {/* Roadmap Bundle Bypass Toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '180px' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Roadmap Locks (10 tracks)</label>
                <button
                  type="button"
                  onClick={() => setShowRoadmapLocks(!showRoadmapLocks)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.5rem',
                    height: '38px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <span>Configure Locks</span>
                  {showRoadmapLocks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Token warning if not setup */}
              {!isPatSaved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.5rem 1rem', borderRadius: '6px', color: '#ef4444', fontSize: '0.75rem', flex: 2, minWidth: '250px' }}>
                  <AlertTriangle size={16} />
                  <div>
                    <strong>GitHub Connection Pending:</strong> Please set up your access token in settings to commit uploads.
                    <button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', textDecoration: 'underline', cursor: 'pointer', padding: '0 4px', fontWeight: 600 }}>Click here</button>
                  </div>
                </div>
              )}
            </div>

            {/* Roadmap Locks Dropdown Grid */}
            {showRoadmapLocks && (
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border-color)',
                  padding: '1rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '0.75rem'
                }}
              >
                {Object.entries(domainLabels).map(([domainId, label]) => {
                  const isUnlocked = unlockedRoadmaps[domainId] || false;
                  return (
                    <label
                      key={domainId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        background: isUnlocked ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isUnlocked ? 'var(--accent-green)' : 'var(--border-color)'}`
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isUnlocked}
                        onChange={() => onToggleRoadmapUnlock(domainId)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* List and Actions */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentSubjects.map((subject) => {
                  const isSubjectExpanded = expandedSubject === subject.code;
                  const modulesList = [0, 1, 2, 3, 4];

                  return (
                    <div 
                      key={subject.code}
                      className="glass-panel"
                      style={{
                        padding: '1rem 1.25rem',
                        transition: 'all 0.25s',
                        borderLeft: isSubjectExpanded ? '3px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                        background: 'rgba(10, 14, 23, 0.5)'
                      }}
                    >
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
                          <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{subject.name}</span>
                        </div>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                          {isSubjectExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {/* Modules detail layout inside cards */}
                      {isSubjectExpanded && (
                        <div 
                          style={{
                            marginTop: '1rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            textAlign: 'left'
                          }}
                        >
                          {modulesList.map((mIndex) => {
                            const key = `${subject.code}-${mIndex}`;
                            const selectedFile = filesToUpload[key];
                            const status = uploadStatus[key];

                            return (
                              <div 
                                key={mIndex}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  padding: '0.75rem 1rem',
                                  background: 'var(--bg-tertiary)',
                                  borderRadius: '8px',
                                  border: '1px solid var(--border-color)',
                                  gap: '0.5rem'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                                  <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                                    Module {mIndex + 1}
                                  </span>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    
                                    {/* Select file */}
                                    <label
                                      style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid var(--border-color)',
                                        color: selectedFile ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '15px',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                      }}
                                    >
                                      <Upload size={12} />
                                      {selectedFile ? "Change PDF" : "Select PDF"}
                                      <input 
                                        type="file" 
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(subject.code, mIndex, e.target.files[0])}
                                        style={{ display: 'none' }}
                                      />
                                    </label>

                                    {/* Commit to Github Trigger */}
                                    {selectedFile && (
                                      <button
                                        onClick={() => handleCommitToGithub(subject.code, subject.name, mIndex)}
                                        disabled={status?.status === 'uploading'}
                                        style={{
                                          background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%)',
                                          border: 'none',
                                          color: '#000',
                                          padding: '0.3rem 0.75rem',
                                          borderRadius: '15px',
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          cursor: status?.status === 'uploading' ? 'not-allowed' : 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '4px'
                                        }}
                                      >
                                        {status?.status === 'uploading' ? <RefreshCw size={12} className="spin" /> : <ArrowRight size={12} />}
                                        Commit to GitHub
                                      </button>
                                    )}

                                  </div>
                                </div>

                                {/* File Name display */}
                                {selectedFile && (
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                    Selected File: <strong style={{ color: 'var(--accent-cyan)' }}>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
                                  </div>
                                )}

                                {/* Upload status responses */}
                                {status && status.status !== 'idle' && (
                                  <div 
                                    style={{ 
                                      fontSize: '0.75rem', 
                                      padding: '0.4rem 0.6rem', 
                                      borderRadius: '4px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      marginTop: '0.25rem',
                                      background: status.status === 'uploading' ? 'rgba(0, 229, 255, 0.05)' : status.status === 'success' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                                      border: '1px solid',
                                      borderColor: status.status === 'uploading' ? 'rgba(0, 229, 255, 0.15)' : status.status === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                      color: status.status === 'uploading' ? 'var(--accent-cyan)' : status.status === 'success' ? 'var(--accent-green)' : '#ef4444'
                                    }}
                                  >
                                    {status.status === 'uploading' && <RefreshCw size={12} className="spin" />}
                                    {status.status === 'success' && <CheckCircle size={12} />}
                                    {status.status === 'error' && <AlertTriangle size={12} />}
                                    <span>{status.message}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
  );
}
