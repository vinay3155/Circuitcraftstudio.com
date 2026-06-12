import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectExplorer from './components/ProjectExplorer';
import PaymentGateway from './components/PaymentGateway';
import CircuitBot from './components/CircuitBot';
import WhatsAppButton from './components/WhatsAppButton';
import AdSenseUnit from './components/AdSenseUnit';
import Footer from './components/Footer';
import StudyHubModal from './components/StudyHubModal';
import OwnerDashboardModal from './components/OwnerDashboardModal';
import RoadmapShowcase from './components/RoadmapShowcase';
import RoadmapModal from './components/RoadmapModal';
import DomainSelectorModal from './components/DomainSelectorModal';
import DigitalStore from './components/DigitalStore';
import MyBundlesModal from './components/MyBundlesModal';
import AuthModal from './components/AuthModal';
import AboutSection from './components/AboutSection';
import WebinarSection from './components/WebinarSection';
import StudentDashboardModal from './components/StudentDashboardModal';
import CertificateVerifier from './components/CertificateVerifier';
import TestimonialsSection from './components/TestimonialsSection';
import CourseDetailsModal from './components/CourseDetailsModal';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);
  const [isMyBundlesOpen, setIsMyBundlesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isStudentDashboardOpen, setIsStudentDashboardOpen] = useState(false);
  const [selectedCourseDetailsId, setSelectedCourseDetailsId] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem('cc_auth_token');
    if (!token) return;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
      } else {
        localStorage.removeItem('cc_auth_token');
      }
    } catch (err) {
      console.error('Error verifying active profile session:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    
    // Check if password reset token is in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('resetToken');
    if (token) {
      setResetToken(token);
      setIsAuthOpen(true);
      // Clean url search params without reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cc_auth_token');
    setCurrentUser(null);
    setIsMyBundlesOpen(false);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  // Roadmap State (loaded from localStorage)
  const [unlockedRoadmaps, setUnlockedRoadmaps] = useState(() => {
    const list = ['sde', 'fullstack', 'backend', 'frontend', 'mobile', 'datascience', 'aiml', 'vlsi', 'embedded', 'pcb'];
    const status = {};
    list.forEach(id => {
      status[id] = localStorage.getItem(`cc_roadmap_unlocked_${id}`) === 'true';
    });
    // backward compatibility check
    if (localStorage.getItem('cc_roadmap_unlocked') === 'true') {
      list.forEach(id => {
        status[id] = true;
      });
    }
    return status;
  });
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isDomainSelectorOpen, setIsDomainSelectorOpen] = useState(false);

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll observer to update Navbar highlight automatically based on viewport scroll position
  useEffect(() => {
    const sections = ['home', 'store', 'projects', 'webinars', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewport area
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAddToCart = (item) => {
    // Add unique identifier to handle multiple items of same type
    const cartItem = {
      ...item,
      id: item.id + '-' + Date.now()
    };
    setCart((prev) => [...prev, cartItem]);
    setIsCartOpen(true); // Auto-open cart to show added item
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  const handleUnlockRoadmap = () => {
    // Instantly unlock all roadmaps for free!
    setUnlockedRoadmaps(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(k => {
        updated[k] = true;
        localStorage.setItem(`cc_roadmap_unlocked_${k}`, 'true');
      });
      localStorage.setItem('cc_roadmap_unlocked', 'true');
      return updated;
    });
    alert('🎉 Premium Career Roadmaps unlocked successfully for FREE! Enjoy your prep.');
    setIsRoadmapOpen(true);
  };

  const handleHeroRoadmapClick = () => {
    // Immediately open the roadmap workspace since it is free and instant
    handleUnlockRoadmap();
  };

  const handleConfirmDomain = (domainId, alreadyUnlocked, domainTitle) => {
    setIsDomainSelectorOpen(false);
    // Instantly unlock this domain for free!
    setUnlockedRoadmaps(prev => {
      const updated = { ...prev, [domainId]: true };
      localStorage.setItem(`cc_roadmap_unlocked_${domainId}`, 'true');
      return updated;
    });
    alert(`🎉 VTU Career Roadmap: ${domainTitle} unlocked successfully for FREE!`);
    setIsRoadmapOpen(true);
  };

  const handleToggleRoadmapUnlock = (domainId) => {
    setUnlockedRoadmaps(prev => {
      const newState = !prev[domainId];
      localStorage.setItem(`cc_roadmap_unlocked_${domainId}`, newState ? 'true' : 'false');
      return { ...prev, [domainId]: newState };
    });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Graphic Grid */}
      <div className="circuit-overlay" />

      {/* Top Announcement Promo Banner */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)',
          color: '#fff',
          textAlign: 'center',
          padding: '0.45rem 1rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          zIndex: 100,
          position: 'relative'
        }}
        className="pill-accent"
      >
        <span>🎁 Limited Time Offer: All premium VTU engineering career placement roadmaps are now 100% FREE! Start your prep today.</span>
      </div>

      {/* Navigation Header */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        cartCount={cart.length} 
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        onOpenStudyHub={() => setIsStudyHubOpen(true)}
        onOpenMyBundles={() => setIsMyBundlesOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenStudentDashboard={() => setIsStudentDashboardOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Hero Area */}
        <HeroSection 
          onRoadmapClick={handleHeroRoadmapClick} 
          onExploreCatalog={() => scrollToSection('projects')} 
          onOpenStudyHub={() => setIsStudyHubOpen(true)}
          currentUser={currentUser}
          onAddToCart={handleAddToCart}
          onOpenCourseDetails={(courseId) => setSelectedCourseDetailsId(courseId)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Placement & Career Roadmap Bundle Showcase */}
        <RoadmapShowcase 
          isUnlocked={Object.values(unlockedRoadmaps).some(val => val === true)}
          onUnlockClick={handleUnlockRoadmap}
          onOpenClick={() => setIsRoadmapOpen(true)}
        />

        {/* Digital Store Section */}
        <DigitalStore onAddToCart={handleAddToCart} />

        {/* Categories Catalog Section */}
        <ProjectExplorer onAddToCart={handleAddToCart} />

        {/* Live Webinars System */}
        <WebinarSection />

        {/* Google AdSense Display Unit */}
        <AdSenseUnit adSlot="5955164719" />

        {/* Hackathon Guide Blog Section */}


        {/* Certificate Verification System */}
        <CertificateVerifier />

        {/* Testimonials Segment */}
        <TestimonialsSection />

        {/* About Us Page Segment (Relocated) */}
        <AboutSection />
      </main>

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppButton />

      {/* Floating Chatbot Assistant */}
      <CircuitBot 
        onOpenBuilder={() => scrollToSection('projects')} 
        onOpenProjects={() => scrollToSection('projects')} 
      />

      {/* Footer and Badges */}
      <Footer onOpenOwnerConsole={() => setIsOwnerDashboardOpen(true)} />

      {/* Checkout Sidebar/Modal Portal */}
      <PaymentGateway 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUnlockRoadmap={(domainId) => {
          setUnlockedRoadmaps(prev => {
            if (domainId === 'all') {
              const updated = { ...prev };
              Object.keys(updated).forEach(k => {
                updated[k] = true;
                localStorage.setItem(`cc_roadmap_unlocked_${k}`, 'true');
              });
              localStorage.setItem('cc_roadmap_unlocked', 'true');
              return updated;
            } else {
              const updated = { ...prev, [domainId]: true };
              localStorage.setItem(`cc_roadmap_unlocked_${domainId}`, 'true');
              return updated;
            }
          });
        }}
        onPurchaseSuccess={() => setIsMyBundlesOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* My Purchased Bundles Modal Portal */}
      <MyBundlesModal 
        isOpen={isMyBundlesOpen}
        onClose={() => setIsMyBundlesOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Authenticator Portal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        resetToken={resetToken}
        onClearResetToken={() => setResetToken('')}
      />

      {/* Study Hub Modal Portal */}
      <StudyHubModal 
        isOpen={isStudyHubOpen} 
        onClose={() => setIsStudyHubOpen(false)} 
      />

      {/* Owner Dashboard Modal Portal */}
      <OwnerDashboardModal 
        isOpen={isOwnerDashboardOpen} 
        onClose={() => setIsOwnerDashboardOpen(false)} 
        unlockedRoadmaps={unlockedRoadmaps}
        onToggleRoadmapUnlock={handleToggleRoadmapUnlock}
      />

      {/* Roadmap Modal Portal */}
      <RoadmapModal 
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        unlockedRoadmaps={unlockedRoadmaps}
        onUnlockTrack={(domainId) => {
          setIsRoadmapOpen(false);
          setIsDomainSelectorOpen(true);
        }}
      />

      {/* Domain Selector Modal Portal */}
      <DomainSelectorModal 
        isOpen={isDomainSelectorOpen}
        onClose={() => setIsDomainSelectorOpen(false)}
        onConfirm={handleConfirmDomain}
        unlockedRoadmaps={unlockedRoadmaps}
      />

      {/* Student Dashboard Modal Portal */}
      <StudentDashboardModal 
        isOpen={isStudentDashboardOpen}
        onClose={() => setIsStudentDashboardOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Course Details Modal Portal */}
      <CourseDetailsModal 
        isOpen={selectedCourseDetailsId !== null}
        onClose={() => setSelectedCourseDetailsId(null)}
        courseId={selectedCourseDetailsId}
        onUnlockFree={(id) => {
          // Unlock the specific domain
          let domain = 'embedded'; // default
          if (id.includes('vlsi')) domain = 'vlsi';
          setUnlockedRoadmaps(prev => {
            const updated = { ...prev, [domain]: true };
            localStorage.setItem(`cc_roadmap_unlocked_${domain}`, 'true');
            return updated;
          });
          alert('🎉 Success! This roadmap has been unlocked and added to your Student Dashboard.');
          setIsStudentDashboardOpen(true);
        }}
      />
    </div>
  );
}
