import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectExplorer from './components/ProjectExplorer';
import ProjectBuilder from './components/ProjectBuilder';
import GallerySection from './components/GallerySection';
import HackathonGuide from './components/HackathonGuide';
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

export default function App() {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

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
    const sections = ['home', 'services', 'projects', 'store', 'gallery', 'blog', 'contact'];
    
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
    const exists = cart.some(item => item.id.startsWith('roadmap-bundle-all'));
    if (!exists) {
      const roadmapItem = {
        id: 'roadmap-bundle-all',
        title: 'Placement & Career Roadmap Bundle',
        price: 99,
        category: 'Placement & Career',
        microcontroller: '10 Technical Career Paths'
      };
      handleAddToCart(roadmapItem);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleHeroRoadmapClick = () => {
    const hasAnyUnlocked = Object.values(unlockedRoadmaps).some(val => val === true);
    if (hasAnyUnlocked) {
      setIsRoadmapOpen(true);
    } else {
      handleUnlockRoadmap();
    }
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

      {/* Navigation Header */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        cartCount={cart.length} 
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        onOpenStudyHub={() => setIsStudyHubOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Hero Area */}
        <HeroSection 
          onRoadmapClick={handleHeroRoadmapClick} 
          onExploreCatalog={() => scrollToSection('projects')} 
          onOpenStudyHub={() => setIsStudyHubOpen(true)}
        />

        {/* Services Grid Section */}
        <ServicesSection onServiceClick={(service) => {
          const text = `Hello CircuitCraft Studio! 🚀\nI am interested in inquiring about your "${service.title}" service. Please share further details.`;
          window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
        }} />

        {/* Categories Catalog Section */}
        <ProjectExplorer onAddToCart={handleAddToCart} />

        {/* Placement & Career Roadmap Bundle Showcase */}
        <RoadmapShowcase 
          isUnlocked={Object.values(unlockedRoadmaps).some(val => val === true)}
          onUnlockClick={handleUnlockRoadmap}
          onOpenClick={() => setIsRoadmapOpen(true)}
        />

        {/* Digital Store Section */}
        <DigitalStore onAddToCart={handleAddToCart} />

        {/* Google AdSense Display Unit */}
        <AdSenseUnit adSlot="5955164719" />

        {/* Gallery Section */}
        <GallerySection />

        {/* Hackathon Guide Blog Section */}
        <HackathonGuide />
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
    </div>
  );
}
