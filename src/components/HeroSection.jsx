import React, { useState } from 'react';
import { Star, StarHalf, BookOpen, Clock, Search, Sparkles, ShoppingCart, Check, Flame, Award, Cpu, Layers } from 'lucide-react';

export default function HeroSection({ onRoadmapClick, onExploreCatalog, onOpenStudyHub, currentUser, onAddToCart }) {
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
      image: '/gallery-1.jpg',
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
      image: '/gallery-2.png',
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
      image: '/gallery-3.jpg',
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
      image: '/gallery-4.jpg',
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

  // Helper to render star ratings dynamically
  const renderStars = (rating) => {
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
  };

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
        {/* Dynamic Welcome back, [Name]/Guest Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
          className="welcome-banner"
        >
          {/* Ambient Glow Graphic behind greeting */}
          <div 
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0, 86, 210, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ flex: '1 1 500px' }}>
            <h1 
              style={{
                fontSize: '2.4rem',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 0.5rem 0'
              }}
            >
              Welcome back, <span style={{ color: '#0056d2' }}>{getGreetingName()}</span>
            </h1>
            <p 
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '600px'
              }}
            >
              Ready to construct your next engineering project? Pick up where you left off or explore customized course recommendations below.
            </p>
            
            {/* Quick action metrics bar */}
            <div 
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                marginTop: '1.5rem', 
                flexWrap: 'wrap' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Cpu size={16} style={{ color: '#0056d2' }} />
                <span>ECE, Embedded, IoT & VLSI Resources</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Layers size={16} style={{ color: 'var(--accent-purple)' }} />
                <span>100+ Projects & Lab Schematics</span>
              </div>
            </div>
          </div>

          {/* Interactive Search inside greeting box */}
          <div style={{ flex: '1 1 320px', maxWidth: '420px', width: '100%' }}>
            <form 
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '30px',
                padding: '0.4rem 0.4rem 0.4rem 1.2rem',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                transition: 'border-color var(--transition-fast)'
              }}
              className="greeting-search-form"
            >
              <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
              <input 
                type="text" 
                placeholder="What project do you want to build?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
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
                  padding: '0.6rem 1.2rem',
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
          </div>
        </div>

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
                    style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative'
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
                            top: '10px',
                            left: '10px',
                            background: course.badge === 'Bestseller' ? '#f59e0b' : 
                                       course.badge === 'Highest Rated' ? 'var(--accent-purple)' : '#3b82f6',
                            color: '#fff',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
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
                          background: 'rgba(5, 7, 12, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s ease',
                          zIndex: 3
                        }}
                      >
                        <button
                          onClick={() => handleAddToCartClick(course)}
                          disabled={isAdded}
                          style={{
                            background: '#fff',
                            border: 'none',
                            color: '#0056d2',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '24px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            transform: 'translateY(10px)',
                            transition: 'all 0.2s ease'
                          }}
                          className="overlay-cart-btn"
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} style={{ color: 'var(--accent-green)' }} />
                              <span>Added to Cart</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={14} />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Course Text Details */}
                    <div 
                      style={{ 
                        padding: '1rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        flex: 1,
                        gap: '0.4rem'
                      }}
                    >
                      <h3 
                        style={{
                          fontSize: '0.95rem',
                          lineHeight: 1.35,
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '2.7rem' // Fix height to match 2 lines of text
                        }}
                        title={course.title}
                      >
                        {course.title}
                      </h3>

                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                        By {course.author}
                      </p>

                      {/* Ratings stars block */}
                      {renderStars(course.rating)}

                      {/* Metadata Details (Hours & Lectures) */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          alignItems: 'center', 
                          fontSize: '0.75rem', 
                          color: 'var(--text-secondary)',
                          marginTop: '0.2rem'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                          {course.hours}
                        </span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>

                      {/* Price Details */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'baseline', 
                          gap: '0.5rem', 
                          marginTop: 'auto',
                          paddingTop: '0.5rem'
                        }}
                      >
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          ₹{course.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{course.originalPrice}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                          ({Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off)
                        </span>
                      </div>

                      {/* Action buttons at bottom for touch devices or default view */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          marginTop: '0.5rem',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '0.75rem'
                        }}
                        className="card-bottom-actions"
                      >
                        <button
                          onClick={() => handleAddToCartClick(course)}
                          disabled={isAdded}
                          style={{
                            flex: 1,
                            background: isAdded ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 86, 210, 0.06)',
                            border: '1px solid',
                            borderColor: isAdded ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 86, 210, 0.15)',
                            color: isAdded ? 'var(--accent-green)' : '#0056d2',
                            padding: '0.45rem 0',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isAdded) {
                              e.currentTarget.style.background = 'rgba(0, 86, 210, 0.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isAdded) {
                              e.currentTarget.style.background = 'rgba(0, 86, 210, 0.06)';
                            }
                          }}
                        >
                          {isAdded ? (
                            <>
                              <Check size={12} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={12} />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={onExploreCatalog}
                          style={{
                            flex: 1,
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                            padding: '0.45rem 0',
                            borderRadius: '6px',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                        >
                          Details
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
          transform: translateY(-4px);
          border-color: #0056d2 !important;
          box-shadow: 0 10px 20px -5px rgba(0, 86, 210, 0.1) !important;
        }
        .course-card:hover .course-card-img {
          transform: scale(1.05);
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
            border-radius: 16px !important;
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
