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

export default function App() {
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll observer to update Navbar highlight automatically based on viewport scroll position
  useEffect(() => {
    const sections = ['home', 'services', 'projects', 'builder', 'gallery', 'blog', 'contact'];
    
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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Graphic Orbs */}
      <div className="circuit-overlay" />
      <div className="circuit-glow-orb" />
      <div className="circuit-glow-orb-2" />

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
          onStartConfigurator={() => scrollToSection('builder')} 
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

        {/* Custom Project DIY Configurator Section */}
        <ProjectBuilder onAddCustomToCart={handleAddToCart} />

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
        onOpenBuilder={() => scrollToSection('builder')} 
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
      />
    </div>
  );
}
