import React, { useState } from 'react';
import { Star, StarHalf, BookOpen, Clock, Search, Sparkles, ShoppingCart, Check, Flame, Award, Cpu, Layers } from 'lucide-react';

// Component to render star ratings dynamically
function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} size={14} fill="#eab308" stroke="#eab308" style={{ flexShrink: 0 }} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<StarHalf key={i} size={14} fill="#eab308" stroke="#eab308" style={{ flexShrink: 0 }} />);
    } else {
      stars.push(<Star key={i} size={14} stroke="#cbd5e1" style={{ flexShrink: 0 }} />);
    }
  }
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-yellow)', marginRight: '0.25rem' }}>{rating.toFixed(1)}</span>
      {stars}
    </div>
  );
}

export default function HeroSection({ onRoadmapClick, onExploreCatalog, onOpenStudyHub, currentUser, onAddToCart, onOpenCourseDetails }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedCourses, setAddedCourses] = useState({});

  const categories = [
    'All',
    'Embedded Systems',
    'IoT & RTOS',
    'VLSI & FPGA'
  ];

  const recommendedCourses = [
    {
      id: 'course-rtos-stm32',
      title: 'Mastering RTOS: Hands on FreeRTOS and STM32Fx with MCU',
      category: 'IoT & RTOS',
      image: '/course-rtos.png',
      author: 'CircuitCraft Team',
      rating: 4.8,
      reviews: 1240,
      price: 499,
      originalPrice: 1999,
      badge: 'Bestseller',
      hours: '24.5 total hours',
      lectures: '182 lectures',
      level: 'Intermediate'
    },
    {
      id: 'course-embedded-bootcamp',
      title: 'Embedded Systems Bootcamp: RTOS, IoT, AI, Vision and FPGA',
      category: 'Embedded Systems',
      image: '/course-bootcamp.png',
      author: 'CircuitCraft Team',
      rating: 4.9,
      reviews: 850,
      price: 599,
      originalPrice: 2499,
      badge: 'Highest Rated',
      hours: '42 total hours',
      lectures: '295 lectures',
      level: 'All Levels'
    },
    {
      id: 'course-microcontroller-timers',
      title: 'Mastering Microcontroller: Timers, PWM, CAN, Low Power & DMA',
      category: 'Embedded Systems',
      image: '/course-microcontroller.png',
      author: 'CircuitCraft Team',
      rating: 4.7,
      reviews: 2110,
      price: 399,
      originalPrice: 1599,
      badge: 'Popular',
      hours: '18 total hours',
      lectures: '124 lectures',
      level: 'Intermediate'
    },
    {
      id: 'course-arm-cortex',
      title: 'Embedded Systems Programming on ARM Cortex-M3/M4 MCU',
      category: 'Embedded Systems',
      image: '/course-arm.png',
      author: 'CircuitCraft Team',
      rating: 4.8,
      reviews: 1560,
      price: 449,
      originalPrice: 1889,
      badge: 'Trending',
      hours: '30.5 total hours',
      lectures: '210 lectures',
      level: 'Beginner to Advanced'
    }
  ];

  // Filter courses based on selected tab and search query
  const filteredCourses = recommendedCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || 
      course.category === selectedCategory || 
      (selectedCategory === 'VLSI & FPGA' && course.title.toLowerCase().includes('fpga'));
    
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCartClick = (course) => {
    const cartItem = {
      id: course.id,
      title: course.title,
      price: course.price,
      category: course.category,
      microcontroller: course.level,
      image: course.image
    };
    onAddToCart(cartItem);
    
    // Toggle added state for brief animation feedback
    setAddedCourses(prev => ({ ...prev, [course.id]: true }));
    setTimeout(() => {
      setAddedCourses(prev => ({ ...prev, [course.id]: false }));
    }, 1500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onExploreCatalog) {
      onExploreCatalog();
    }
  };

  const getGreetingName = () => {
    if (currentUser && currentUser.name) {
      // Return first name capitalized or fallback
      const parts = currentUser.name.trim().split(' ');
      const firstName = parts[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }
    return 'Guest';
  };

  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return 'NP';
    const parts = currentUser.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3.5rem 1.5rem 5rem 1.5rem',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        transition: 'background-color var(--transition-fast)',
      }}
    >
      {/* Decorative Blueprint radial grid pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(0, 86, 210, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          width: '100%',
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem'
        }}
      >
        {/* Split Landing Hero Section */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3rem',
            alignItems: 'center',
            minHeight: '50vh',
            marginBottom: '1rem',
            textAlign: 'left'
          }}
          className="hero-split-row"
        >
          {/* Left Column: Text & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
            {currentUser && (
              <div 
                style={{ 
                  background: 'rgba(0, 86, 210, 0.06)',
                  border: '1px solid rgba(0, 86, 210, 0.15)',
                  borderRadius: '12px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0056d2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>👋 Welcome back, <strong>{getGreetingName()}</strong>!</span>
              </div>
            )}
            
            <h1 
              style={{
                fontSize: '2.85rem',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: 0
              }}
            >
              Empowering Future Engineers Through Practical Learning
            </h1>
            
            <p 
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: '580px'
              }}
            >
              Bridge the gap between textbook engineering theory and industry requirements. Build real hardware prototypes, program bare-metal microcontrollers, and register verifiable credentials.
            </p>

            {/* Quick Search */}
            <form 
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '30px',
                padding: '0.3rem 0.3rem 0.3rem 1.1rem',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                width: '100%',
                maxWidth: '460px',
                transition: 'border-color var(--transition-fast)'
              }}
              className="hero-search-form"
            >
              <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
              <input 
                type="text" 
                placeholder="What project or course do you want to build?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: '100%',
                  fontWeight: 500
                }}
              />
              <button 
                type="submit"
                style={{
                  background: '#0056d2',
                  border: 'none',
                  color: '#fff',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#0043a4'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0056d2'}
              >
                Search
              </button>
            </form>

            {/* Buttons Row */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                onClick={onOpenStudyHub}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '30px',
                  background: '#0056d2',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px -5px rgba(0, 86, 210, 0.25)',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#0043a4'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0056d2'}
              >
                Start Learning
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('store');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else if (onExploreCatalog) {
                    onExploreCatalog();
                  }
                }}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '30px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0056d2';
                  e.currentTarget.style.background = 'rgba(0, 86, 210, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
              >
                Explore Courses
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('webinars');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(0, 86, 210, 0.06) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.2)',
                  color: 'var(--accent-purple)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(0, 86, 210, 0.12) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(0, 86, 210, 0.06) 100%)';
                }}
              >
                Join Webinar
              </button>
            </div>
          </div>

          {/* Right Column: High Tech Loop Video Card */}
          <div 
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
              background: 'var(--bg-secondary)',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
            className="hero-video-container"
          >
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-of-a-computer-close-up-41584-large.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Dark gradient overlay bottom */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, transparent 75%, rgba(15, 23, 42, 0.15))',
                zIndex: 2
              }}
            />
          </div>
        </div>

        {/* Welcome Banner */}
        {currentUser && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.25rem',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              textAlign: 'left',
              width: '100%',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
            }}
            className="welcome-banner"
          >
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--text-primary)',
                color: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              {getUserInitials()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Welcome back, {currentUser.name.toUpperCase()}
              </h2>
              <span 
                onClick={onOpenStudyHub}
                style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Add occupation and interests
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Catalog Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Heading Row */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1rem'
            }}
          >
            <div>
              <h2 
                style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 800, 
                  color: 'var(--text-primary)', 
                  fontFamily: 'var(--font-display)',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}
              >
                What to learn next
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                Recommended for you in engineering project tracks
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div 
              style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                overflowX: 'auto', 
                paddingBottom: '2px',
                maxWidth: '100%'
              }}
              className="tabs-scroll-container"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'rgba(0, 86, 210, 0.08)' : 'transparent',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#0056d2' : 'var(--border-color)',
                    color: selectedCategory === cat ? '#0056d2' : 'var(--text-secondary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.borderColor = 'var(--text-muted)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses / Projects Shelf Grid */}
          {filteredCourses.length > 0 ? (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.75rem',
                width: '100%'
              }}
              className="course-grid"
            >
              {filteredCourses.map((course) => {
                const isAdded = addedCourses[course.id];
                return (
                  <div
                    key={course.id}
                    onClick={() => onOpenCourseDetails(course.id)}
                    style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    className="course-card"
                  >
                    {/* Course Image Wrapper */}
                    <div 
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        paddingTop: '56.25%', // 16:9 aspect ratio
                        overflow: 'hidden',
                        background: 'var(--bg-tertiary)'
                      }}
                    >
                      <img 
                        src={course.image} 
                        alt={course.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease'
                        }}
                        className="course-card-img"
                      />

                      {/* Floating Badge (Bestseller / Highest Rated) */}
                      {course.badge && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            background: course.badge === 'Bestseller' ? '#eab308' : 
                                       course.badge === 'Highest Rated' ? 'var(--accent-purple)' : '#2563eb',
                            color: '#fff',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.45rem',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            zIndex: 2,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {course.badge}
                        </div>
                      )}

                      {/* Hover Overlay Button Trigger */}
                      <div 
                        className="course-card-overlay"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(15, 23, 42, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s ease',
                          zIndex: 3
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCartClick(course);
                          }}
                          disabled={isAdded}
                          style={{
                            background: '#ffffff',
                            border: 'none',
                            color: 'var(--accent-blue)',
                            padding: '0.55rem 1.25rem',
                            borderRadius: '24px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                            transform: 'translateY(8px)',
                            transition: 'all 0.2s ease'
                          }}
                          className="overlay-cart-btn"
                        >
                          <ShoppingCart size={14} style={{ color: 'var(--accent-blue)' }} />
                          <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Course Text Details */}
                    <div 
                      style={{ 
                        padding: '0.85rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        flex: 1,
                        gap: '0.3rem'
                      }}
                    >
                      <h3 
                        style={{
                          fontSize: '0.92rem',
                          lineHeight: 1.3,
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '2.5rem'
                        }}
                        title={course.title}
                      >
                        {course.title}
                      </h3>

                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                        By {course.author}
                      </p>

                      {/* Ratings stars block */}
                      <StarRating rating={course.rating} />

                      {/* Metadata Details (Hours & Lectures) */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '0.4rem', 
                          alignItems: 'center', 
                          fontSize: '0.72rem', 
                          color: 'var(--text-secondary)',
                          marginTop: '0.1rem'
                        }}
                      >
                        <span>{course.hours}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>

                      {/* Price Details */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'baseline', 
                          gap: '0.4rem', 
                          marginTop: 'auto',
                          paddingTop: '0.4rem'
                        }}
                      >
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          ₹{course.price}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{course.originalPrice}
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                          ({Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off)
                        </span>
                      </div>

                      {/* Mobile Action Row */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '0.4rem', 
                          marginTop: '0.5rem',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '0.6rem'
                        }}
                        className="card-bottom-actions"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCartClick(course);
                          }}
                          disabled={isAdded}
                          style={{
                            flex: 1,
                            background: isAdded ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 86, 210, 0.06)',
                            border: '1px solid',
                            borderColor: isAdded ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 86, 210, 0.15)',
                            color: isAdded ? 'var(--accent-green)' : '#0056d2',
                            padding: '0.35rem 0',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          {isAdded ? 'Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* No results state */
            <div 
              style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-muted)'
              }}
            >
              <Cpu size={32} style={{ margin: '0 auto 1rem auto', color: 'var(--text-muted)', display: 'block' }} />
              <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>No recommendations found</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Try refining your search query or choosing another tab.</p>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS for custom styling & hover effects */}
      <style>{`
        /* Desktop Image zoom on card hover */
        .course-card:hover {
          border-color: #0056d2 !important;
          box-shadow: 0 4px 12px rgba(0, 86, 210, 0.08) !important;
        }
        .course-card:hover .course-card-img {
          transform: scale(1.03);
        }
        
        /* Show card overlay on hover only for non-touch devices */
        @media (hover: hover) {
          .course-card:hover .course-card-overlay {
            opacity: 1 !important;
          }
          .course-card:hover .overlay-cart-btn {
            transform: translateY(0) !important;
          }
          /* Hide bottom action button row on desktop, since we have the hover overlay */
          .card-bottom-actions {
            display: none !important;
          }
        }

        /* Mobile specific scrollable tabs & stack layouts */
        @media (max-width: 768px) {
          .welcome-banner {
            padding: 1.5rem 1.25rem !important;
            border-radius: 8px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .welcome-banner > div {
            width: 100% !important;
            flex: unset !important;
          }
          .welcome-banner h1 {
            font-size: 1.85rem !important;
          }
          .greeting-search-form {
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 0.5rem !important;
          }
          .tabs-scroll-container {
            width: 100% !important;
            padding-bottom: 0.5rem !important;
          }
          .course-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          /* Ensure action row is visible on mobile */
          .card-bottom-actions {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
