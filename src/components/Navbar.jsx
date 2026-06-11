import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Menu, X, Sun, Moon, LogOut, Search, Folder, Cpu, 
  ChevronDown, Bell, Heart 
} from 'lucide-react';

export default function Navbar({ 
  theme, 
  toggleTheme, 
  cartCount, 
  toggleCart, 
  activeTab, 
  setActiveTab,
  onOpenStudyHub,
  onOpenMyBundles,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenStudentDashboard,
  searchQuery,
  setSearchQuery
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Udemy-style hover states
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState('Embedded Systems');
  const [isCertsOpen, setIsCertsOpen] = useState(false);
  const [isTeachHovered, setIsTeachHovered] = useState(false);
  
  // local search
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const handleSearchSubmitLocal = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return 'NP';
    const parts = currentUser.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'webinars', label: 'Webinars' },
    { id: 'store', label: 'Digital Store' },
    { id: 'study-hub', label: 'VTU Study Hub' },
    { id: 'my-bundles', label: 'My Bundles' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    if (id === 'study-hub') {
      onOpenStudyHub();
      setIsOpen(false);
      return;
    }
    if (id === 'my-bundles') {
      onOpenMyBundles();
      setIsOpen(false);
      return;
    }
    setActiveTab(id);
    setIsOpen(false);
    
    // Smooth scroll to section
    if (id !== 'my-bundles') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubcategoryClick = (query) => {
    setSearchQuery(query);
    setIsCoursesOpen(false);
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerifyCertClick = () => {
    setIsCertsOpen(false);
    const element = document.getElementById('verifier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = ['Embedded Systems', 'IoT & RTOS', 'VLSI & FPGA', 'Robotics', 'AI & ML'];

  const subcategories = {
    'Embedded Systems': [
      { title: 'ARM Cortex-M Programming', query: 'ARM Cortex' },
      { title: '8051 Microcontrollers', query: 'timers' },
      { title: 'Bare-Metal C Programming', query: 'Mastering Microcontroller' }
    ],
    'IoT & RTOS': [
      { title: 'FreeRTOS Development', query: 'RTOS' },
      { title: 'ESP32 IoT Integration', query: 'Bootcamp' },
      { title: 'Blynk Telemetry Dashboards', query: 'IoT' }
    ],
    'VLSI & FPGA': [
      { title: 'Verilog HDL Design', query: 'VLSI' },
      { title: 'FPGA Synthesis', query: 'FPGA' },
      { title: 'Digital Circuit Logic', query: 'VLSI' }
    ],
    'Robotics': [
      { title: 'Autonomous Path Planning Rover', query: 'Robotics' },
      { title: 'Self-Balancing Segway Bot', query: 'Robotics' },
      { title: 'Obstacle Avoidance', query: 'Robotics' }
    ],
    'AI & ML': [
      { title: 'Edge-AI Attendance System', query: 'AI' },
      { title: 'Jupyter Analytics Pipelines', query: 'AI' },
      { title: 'Computer Vision OpenCV', query: 'AI' }
    ]
  };

  return (
    <nav 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
      }}
      className="nav-theme-override"
    >
      <div 
        style={{
          maxWidth: '1340px',
          margin: '0 auto',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          position: 'relative'
        }}
        className="nav-wrapper"
      >
        {/* Mobile Hamburger menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-only-btn hamburger-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo (Coursera/Udemy-inspired) */}
        <div 
          onClick={() => handleNavClick('home')}
          className="nav-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: '1.45rem',
            letterSpacing: '-0.04em',
            color: '#0056d2',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          circuitcraft
        </div>

        {/* Desktop Left-Side Udemy Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
          {/* Find Courses Hover Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button className="nav-link">
              <span>Find Courses</span>
              <ChevronDown size={14} style={{ marginTop: '1px' }} />
            </button>

            {isCoursesOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  display: 'flex',
                  zIndex: 150,
                  minWidth: '420px',
                  textAlign: 'left'
                }}
              >
                {/* Left Pane (Categories) */}
                <div style={{ width: '180px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-primary)', padding: '0.5rem 0' }}>
                  {categories.map((cat) => (
                    <div 
                      key={cat}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      className="dropdown-pane-item"
                      style={{
                        background: hoveredCategory === cat ? 'rgba(0, 86, 210, 0.06)' : 'none',
                        color: hoveredCategory === cat ? 'var(--accent-blue)' : 'var(--text-primary)',
                        fontWeight: hoveredCategory === cat ? 600 : 500
                      }}
                    >
                      <span>{cat}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>&gt;</span>
                    </div>
                  ))}
                </div>

                {/* Right Pane (Sub-categories) */}
                <div style={{ flex: 1, padding: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Popular in {hoveredCategory}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {subcategories[hoveredCategory]?.map((sub) => (
                      <div 
                        key={sub.title}
                        onClick={() => handleSubcategoryClick(sub.query)}
                        className="sub-pane-item"
                      >
                        {sub.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Get Certified Hover Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsCertsOpen(true)}
            onMouseLeave={() => setIsCertsOpen(false)}
          >
            <button className="nav-link">
              <span>Get Certified</span>
              <ChevronDown size={14} style={{ marginTop: '1px' }} />
            </button>

            {isCertsOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  display: 'flex',
                  zIndex: 150,
                  minWidth: '460px',
                  textAlign: 'left'
                }}
              >
                {/* Left Pane */}
                <div style={{ width: '200px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-primary)', padding: '0.5rem 0' }}>
                  <div 
                    onClick={handleVerifyCertClick}
                    className="dropdown-pane-item"
                    style={{ fontWeight: 600, color: 'var(--accent-green)' }}
                  >
                    <span>Verify Certificate</span>
                    <span style={{ fontSize: '0.75rem' }}>✓</span>
                  </div>
                  <div className="dropdown-pane-item">
                    <span>VLSI Academy Track</span>
                  </div>
                  <div className="dropdown-pane-item">
                    <span>Embedded Systems</span>
                  </div>
                  <div className="dropdown-pane-item">
                    <span>IoT Architect Track</span>
                  </div>
                </div>

                {/* Right Pane (Issuers) */}
                <div style={{ flex: 1, padding: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Popular Certification Issuers
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div style={{ padding: '0.3rem 0.5rem' }}>Amazon Web Services (AWS)</div>
                    <div style={{ padding: '0.3rem 0.5rem' }}>Microsoft Certifications</div>
                    <div style={{ padding: '0.3rem 0.5rem' }}>Cisco Certifications</div>
                    <div style={{ padding: '0.3rem 0.5rem' }}>CompTIA Certifications</div>
                    <div style={{ padding: '0.3rem 0.5rem' }}>Project Management Institute (PMI)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => onOpenStudyHub()} className="nav-link">
            <span>Subscribe</span>
          </button>
        </div>

        {/* Center Search Input */}
        <form 
          onSubmit={handleSearchSubmitLocal}
          style={{ 
            flex: 1,
            position: 'relative',
            maxWidth: '540px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center'
          }}
          className="desktop-nav"
        >
          <input 
            type="text" 
            placeholder="Search for anything (e.g. RTOS, Embedded, VLSI)..." 
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.25rem',
              borderRadius: '24px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          />
          <Search 
            size={14} 
            style={{ 
              position: 'absolute', 
              left: '0.85rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} 
          />
        </form>

        {/* Desktop Right-Side Links */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginLeft: 'auto'
          }}
          className="desktop-nav"
        >
          <span 
            onClick={() => {
              const text = `Hello CircuitCraft Studio! 🚀\nI would like to inquire about training programs for corporate/colleges.`;
              window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="nav-link"
            style={{ fontSize: '0.8rem', cursor: 'pointer' }}
          >
            CircuitCraft Business
          </span>

          {/* Teach Link with Tooltip */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsTeachHovered(true)}
            onMouseLeave={() => setIsTeachHovered(false)}
          >
            <span 
              onClick={() => {
                const text = `Hello CircuitCraft Studio! 🚀\nI am interested in joining as a teacher or course mentor.`;
                window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="nav-link"
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Teach on CircuitCraft
            </span>

            {isTeachHovered && (
              <div 
                style={{
                  position: 'absolute',
                  top: '125%',
                  right: 0,
                  width: '260px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '1rem',
                  borderRadius: '6px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 200,
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <span>Turn what you know into an opportunity and reach millions around the world.</span>
                <button 
                  onClick={() => {
                    const text = `Hello! I want to learn more about teaching options on CircuitCraft.`;
                    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  style={{
                    background: 'var(--accent-purple)',
                    border: 'none',
                    color: '#fff',
                    padding: '0.4rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Learn more
                </button>
              </div>
            )}
          </div>

          {currentUser && (
            <span 
              onClick={() => onOpenStudentDashboard()}
              className="nav-link"
              style={{ fontSize: '0.8rem', cursor: 'pointer' }}
            >
              My learning
            </span>
          )}

          {/* Wishlist and Notifications icons */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '0.2rem' }} aria-label="Wishlist">
            <Heart size={18} />
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={toggleCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '0.2rem'
            }}
            aria-label="Open Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--accent-blue)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  borderRadius: '50%',
                  minWidth: '15px',
                  height: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  padding: '2px'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '0.2rem' }} aria-label="Notifications">
            <Bell size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '0.2rem'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Profile avatar or Sign In */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="avatar-circle"
              >
                <span>{getUserInitials()}</span>
                <span className="avatar-online-dot" />
              </div>
              
              {isProfileMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '125%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    padding: '0.5rem 0',
                    width: '190px',
                    zIndex: 250,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Account:<br/>
                    <strong style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>{currentUser.email}</strong>
                  </div>
                  <button
                    onClick={() => {
                      onOpenMyBundles();
                      setIsProfileMenuOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    className="dropdown-pane-item"
                  >
                    <Folder size={12} style={{ color: 'var(--accent-blue)' }} />
                    My Purchased Bundles
                  </button>
                  <button
                    onClick={() => {
                      onOpenStudentDashboard();
                      setIsProfileMenuOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    className="dropdown-pane-item"
                  >
                    <Cpu size={12} style={{ color: 'var(--accent-blue)' }} />
                    Student Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      width: '100%',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    className="dropdown-pane-item"
                  >
                    <LogOut size={12} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                background: 'none',
                border: '1px solid var(--accent-blue)',
                color: 'var(--accent-blue)',
                padding: '0.4rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37, 99, 235, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div 
          className="mobile-only-controls"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1rem',
            marginLeft: 'auto'
          }}
        >
          {/* Search Icon */}
          <button
            onClick={() => {
              const element = document.getElementById('projects');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Search"
          >
            <Search size={22} />
          </button>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.25rem',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Open Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  background: 'var(--accent-blue)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          style={{
            display: 'none',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            flexDirection: 'column',
            gap: '0.75rem',
            textAlign: 'left'
          }}
          className="mobile-menu"
        >
          {/* Navigation options list in mobile */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: activeTab === item.id ? 600 : 500,
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.4rem 0',
                textAlign: 'left',
                width: '100%'
              }}
            >
              {item.label}
            </button>
          ))}

          {currentUser ? (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Account: <strong style={{ color: 'var(--text-primary)' }}>{currentUser.email}</strong>
              </span>
              <button
                onClick={() => {
                  onOpenStudentDashboard();
                  setIsOpen(false);
                }}
                style={{
                  background: 'rgba(0, 86, 210, 0.06)',
                  border: '1px solid rgba(0, 86, 210, 0.15)',
                  color: '#0056d2',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontWeight: 600
                }}
              >
                <Cpu size={14} /> Student Dashboard
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setIsOpen(false);
              }}
              style={{
                background: 'var(--accent-blue)',
                border: 'none',
                color: '#fff',
                padding: '0.55rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                width: '100%',
                fontWeight: 600,
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              Sign In to Account
            </button>
          )}
        </div>
      )}

      {/* CSS overrides inside style tag to easily implement responsive toggles */}
      <style>{`
        .nav-link {
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.45rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--accent-blue) !important;
        }
        .dropdown-pane-item {
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .dropdown-pane-item:hover {
          background: rgba(0, 86, 210, 0.05);
          color: var(--accent-blue);
        }
        .sub-pane-item {
          padding: 0.5rem 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .sub-pane-item:hover {
          color: var(--accent-blue);
        }
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-purple);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          position: relative;
          user-select: none;
        }
        .avatar-online-dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent-green);
          border: 1.5px solid #fff;
        }
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-only-btn.hamburger-btn {
            display: flex !important;
          }
          .mobile-only-controls {
            display: flex !important;
          }
          .mobile-menu {
            display: flex !important;
          }
          .nav-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          /* Center the logo on mobile exactly */
          .nav-logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </nav>
  );
}
