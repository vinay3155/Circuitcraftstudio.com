import React, { useState } from 'react';
import { 
  X, Clock, BookOpen, Award, CheckCircle2, User, Play, 
  ChevronDown, ChevronUp, Globe, FileText, Video, Sparkles, ShoppingCart, Info
} from 'lucide-react';

export default function CourseDetailsModal({ isOpen, onClose, courseId, onAddToCart }) {
  if (!isOpen || !courseId) return null;

  const [pricingOption, setPricingOption] = useState('buy'); // 'subscribe' or 'buy'
  const [openSections, setOpenSections] = useState({ 0: true }); // default first section open

  const toggleSection = (idx) => {
    setOpenSections(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const courseData = {
    'course-rtos-stm32': {
      title: 'Mastering RTOS: Hands on FreeRTOS and STM32Fx with MCU',
      subtitle: 'Master RTOS concepts, task schedulers, context switching, semaphores, queues, and concurrency mechanisms.',
      rating: 4.8,
      reviewsCount: '1,240 ratings',
      studentsCount: '48,147 students',
      author: 'FastBit Embedded Brain Academy, Kiran Nayak & CircuitCraft Team',
      lastUpdated: 'Last updated 8/2025',
      language: 'English',
      price: 499,
      originalPrice: 1999,
      image: '/course-rtos.png',
      whatYouWillLearn: [
        'Understanding various RTOS concepts with FreeRTOS Programming and Debugging',
        'Learn Complete Step by step method to run FreeRTOS on STM32 MCUs using OpenSTM32 System Workbench',
        'Using STM32 Standard Peripheral Driver APIs to configure peripherals',
        'FreeRTOS Task Creation, Deletion, Scheduling using write code examples',
        'Important scheduling policies of FreeRTOS Scheduler',
        'FreeRTOS Stack and Heap Management',
        'Right ways of Synchronizing between tasks using Semaphores',
        'Right ways of Synchronizing between a task and an interrupt using semaphores'
      ],
      includes: [
        '24.5 hours on-demand video',
        '9 articles',
        '14 downloadable resources',
        'Access on mobile and TV',
        'Certificate of completion'
      ],
      sections: [
        {
          title: 'Overview of the course',
          duration: '6 lectures • 8min',
          lectures: [
            { name: 'About the instructor', duration: '0:17' },
            { name: 'Important Note', duration: '0:43' },
            { name: 'What is this course all about ??', duration: '5:34', preview: true },
            { name: 'Download Course Slides', duration: '0:02' },
            { name: 'FAQ', duration: '0:35' },
            { name: 'Note for the Students', duration: '0:19' }
          ]
        },
        {
          title: 'RTOS Introduction',
          duration: '6 lectures • 30min',
          lectures: [
            { name: 'What is Real Time Application(RTAs) ??', duration: '7:13' },
            { name: 'What is Real Time Operating System(RTOS) ?', duration: '3:57' },
            { name: 'RTOS vs GPOS : Task Scheduling', duration: '3:33' },
            { name: 'RTOS vs GPOS : Latency', duration: '5:20' },
            { name: 'RTOS vs GPOS : Priority inversion', duration: '5:45', preview: true },
            { name: 'What is Multitasking ?', duration: '4:36' }
          ]
        },
        {
          title: 'IDE installation and development board',
          duration: '5 lectures • 12min',
          lectures: [
            { name: 'Downloading STM32CubeIDE', duration: '3:33' },
            { name: 'IDE installation(Windows)', duration: '0:43' },
            { name: 'IDE installation(Linux)', duration: '2:01' },
            { name: 'Development board used in this course', duration: '2:48' },
            { name: 'Downloading documents', duration: '2:44' }
          ]
        },
        {
          title: 'Downloading and Installing FreeRTOS',
          duration: '1 lecture • 8min',
          lectures: [
            { name: 'Downloading FreeRTOS kernel source', duration: '7:59' }
          ]
        },
        {
          title: 'Creating FreeRTOS based project for STM32 MCUs',
          duration: '6 lectures • 38min',
          lectures: [
            { name: 'Project creation steps', duration: '8:15' },
            { name: 'Importing FreeRTOS source files', duration: '10:20' },
            { name: 'Compiler configurations', duration: '6:45' }
          ]
        }
      ],
      requirements: [
        'Basic knowledge of C and Microcontrollers could be added advantage but not mandatory'
      ],
      description: 'The Complete FreeRTOS Course with Programming and Debugging. Master RTOS concepts, task schedulers, context switching, semaphores, queues, and concurrency mechanisms.'
    },
    'course-embedded-bootcamp': {
      title: 'Embedded Systems Bootcamp: RTOS, IoT, AI, Vision and FPGA',
      subtitle: 'The ultimate zero-to-hero firmware bootcamp. Build cloud nodes, Edge-AI vision, and synthesize digital circuits on FPGA.',
      rating: 4.9,
      reviewsCount: '850 ratings',
      studentsCount: '23,124 students',
      author: 'Vinay Bodravla, Subramanya Sondur & Mallikarjun Bujaruk',
      lastUpdated: 'Last updated 10/2025',
      language: 'English',
      price: 599,
      originalPrice: 2499,
      image: '/course-bootcamp.png',
      whatYouWillLearn: [
        'Program microcontrollers in Embedded C and compile with GCC toolchains',
        'Design local machine-vision pipelines and edge analytics on micro-nodes',
        'Synthesize custom digital architectures on FPGA boards using Verilog HDL',
        'Establish secure Wi-Fi and Cellular telemetry streams to cloud databases',
        'Construct production-ready PCB layouts and hardware schematics'
      ],
      includes: [
        '42 hours on-demand video',
        '15 articles',
        '28 downloadable resources',
        'Access on mobile and TV',
        'Verifiable Bootcamp Diploma'
      ],
      sections: [
        {
          title: 'Introduction to Embedded Systems',
          duration: '5 lectures • 45 min',
          lectures: [
            { name: 'Welcome to the Bootcamp', duration: '5:12', preview: true },
            { name: 'Embedded Systems Overview', duration: '12:34' },
            { name: 'Microprocessor vs Microcontroller', duration: '10:45' }
          ]
        },
        {
          title: 'Embedded C Programming Foundations',
          duration: '12 lectures • 3h 10m',
          lectures: [
            { name: 'Data Types and Variables', duration: '15:20' },
            { name: 'Pointers Demystified', duration: '28:10' },
            { name: 'Bitwise Operations in C', duration: '22:45', preview: true }
          ]
        },
        {
          title: 'Hardware Prototyping and Board Layout',
          duration: '8 lectures • 2h 15m',
          lectures: [
            { name: 'Introduction to Schematics', duration: '18:30' },
            { name: 'PCB Layout Constraints', duration: '25:40' }
          ]
        }
      ],
      requirements: [
        'High school math, basic electronics concepts',
        'PC/Laptop with internet'
      ],
      description: 'A comprehensive zero-to-hero firmware bootcamp. Build cloud-connected smart nodes, run light convolutional neural filters (Edge-AI) on microcontrollers, and synthesize digital hardware circuits on Xilinx FPGAs using Verilog.'
    },
    'course-microcontroller-timers': {
      title: 'Mastering Microcontroller: Timers, PWM, CAN, Low Power & DMA',
      subtitle: 'Dive deep into microcontroller peripheral configurations. Master advanced silicon hardware controllers.',
      rating: 4.7,
      reviewsCount: '2,110 ratings',
      studentsCount: '34,812 students',
      author: 'Vinay Bodravla (Founder & Lead Architect)',
      lastUpdated: 'Last updated 9/2025',
      language: 'English',
      price: 399,
      originalPrice: 1599,
      image: '/course-microcontroller.png',
      whatYouWillLearn: [
        'Program hardware timers, input captures, output compares, and interrupts',
        'Design Pulse-Width Modulation (PWM) drivers for motor control and dimming',
        'Implement CAN Bus protocols for automotive and industrial networking',
        'Configure Low Power sleep modes, wake-up triggers, and clock scaling',
        'Optimize memory transfers using Direct Memory Access (DMA) controllers'
      ],
      includes: [
        '18 hours on-demand video',
        '6 articles',
        '12 downloadable resources',
        'Access on mobile and TV',
        'Technical Certification'
      ],
      sections: [
        {
          title: 'Introduction to Microcontroller Peripherals',
          duration: '4 lectures • 20m',
          lectures: [
            { name: 'Overview of Peripherals', duration: '4:15', preview: true },
            { name: 'Internal Registers Mapping', duration: '8:45' }
          ]
        },
        {
          title: 'Advanced Timers and Interrupts',
          duration: '8 lectures • 2h 30m',
          lectures: [
            { name: 'Timer Clock Sources', duration: '12:30' },
            { name: 'Configuring Interrupt Handlers', duration: '22:15', preview: true }
          ]
        }
      ],
      requirements: [
        'C programming knowledge',
        'Basic STM32 assembly or registers understanding is helpful'
      ],
      description: 'Master the core silicon mechanisms that make modern hardware power-efficient and high-performing, including Direct Memory Access (DMA) and Controller Area Network (CAN).'
    },
    'course-arm-cortex': {
      title: 'Embedded Systems Programming on ARM Cortex-M3/M4 MCU',
      subtitle: 'Unlock the potential of ARM silicon. Write bare-metal register level code directly in C from scratch.',
      rating: 4.8,
      reviewsCount: '1,560 ratings',
      studentsCount: '19,510 students',
      author: 'Vinay Bodravla & Industry Mentors',
      lastUpdated: 'Last updated 11/2025',
      language: 'English',
      price: 449,
      originalPrice: 1889,
      image: '/course-arm.png',
      whatYouWillLearn: [
        'Understand ARM Cortex processor architecture, pipeline states, and stacks',
        'Write bare-metal register level code directly in C (no HAL, no libraries)',
        'Configure the nested vector interrupt controller (NVIC) from registers',
        'Implement Custom Bootloaders and firmware updating protocols (OTA)',
        'Program clock tree setups, flash controllers, and sysTick timers'
      ],
      includes: [
        '30.5 hours on-demand video',
        '11 articles',
        '20 downloadable resources',
        'Access on mobile and TV',
        'ARM Silicon Developer Certificate'
      ],
      sections: [
        {
          title: 'ARM Architecture Fundamentals',
          duration: '6 lectures • 1h',
          lectures: [
            { name: 'Introduction to ARM Cortex-M', duration: '10:15', preview: true },
            { name: 'Registers and Stack Pointer', duration: '15:40' }
          ]
        },
        {
          title: 'Bare-Metal C Register Access',
          duration: '10 lectures • 3h 15m',
          lectures: [
            { name: 'Memory Mapped IOs', duration: '24:30' },
            { name: 'Writing bare-metal driver code', duration: '32:15', preview: true }
          ]
        }
      ],
      requirements: [
        'Basic programming, logic gates knowledge'
      ],
      description: 'Unlock the potential of ARM silicon. Learn how to read ARM technical manuals, write registers directly from scratch without HAL abstraction libraries, and write custom interrupt controllers and bootloaders.'
    }
  };

  const details = courseData[courseId] || courseData['course-rtos-stm32'];

  const handleAddToCartClick = () => {
    const cartItem = {
      id: courseId,
      title: details.title,
      price: details.price,
      category: 'Recommended Courses',
      microcontroller: 'Course Certificate',
      image: details.image
    };
    onAddToCart(cartItem);
    onClose();
  };

  const handleSubscribeClick = () => {
    const text = `Hello CircuitCraft Studio! 🚀\nI want to subscribe to the CircuitCraft Personal Plan (₹350/month) for the course: "${details.title}". Please assist with the registration.`;
    window.open(`https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 120,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.25s ease'
      }}
      onClick={onClose}
    >
      {/* Main Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          height: '88vh',
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'scale-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--text-primary)',
          textAlign: 'left'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Top Control */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            zIndex: 10
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0056d2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Course Details View
          </span>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem'
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Container Body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          
          {/* 1. Header Banner (Udemy Slate Style) */}
          <div 
            style={{
              background: '#1c1d1f',
              color: '#ffffff',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative'
            }}
          >
            {/* Top Tag */}
            <div style={{ display: 'inline-flex' }}>
              <span 
                style={{
                  background: '#f3ca8c',
                  color: '#2d2f31',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '2px',
                  textTransform: 'uppercase'
                }}
              >
                Highest Rated
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
              {details.title}
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#d1d7dc', margin: 0, maxWidth: '820px' }}>
              {details.subtitle}
            </p>

            {/* Ratings, Students Enrolled */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#f3ca8c' }}>
              <span style={{ fontWeight: 700 }}>{details.rating}</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Play key={s} size={12} fill="#eab308" stroke="#eab308" style={{ transform: 'rotate(-90deg)' }} />
                ))}
              </div>
              <span style={{ color: '#a1a8b3', textDecoration: 'underline', cursor: 'pointer' }}>({details.reviewsCount})</span>
              <span style={{ color: '#ffffff' }}>{details.studentsCount}</span>
            </div>

            {/* Author */}
            <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>
              Created by <span style={{ color: '#c0c4fc', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>{details.author}</span>
            </div>

            {/* Last updated and languages */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#d1d7dc' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> {details.lastUpdated}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Globe size={14} /> {details.language}
              </span>
            </div>
          </div>

          {/* 2. Content Grid (Left Details vs Right Buy Sidebar) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '2.5rem',
              padding: '2.5rem 1.5rem',
              alignItems: 'start'
            }}
            className="details-grid-layout"
          >
            {/* Left Main Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Box A: What you'll learn */}
              <div 
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  background: 'var(--bg-secondary)'
                }}
              >
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  What you'll learn
                </h2>
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '0.75rem' 
                  }}
                >
                  {details.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--text-primary)', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box B: Explore related topics */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Explore related topics
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['RTOS', 'STM32', 'Arduino', 'Microcontroller', 'Hardware'].map(topic => (
                    <span 
                      key={topic} 
                      style={{ 
                        border: '1px solid var(--border-color)', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-tertiary)',
                        cursor: 'pointer'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box C: Course content accordion */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Course content
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  <span>{details.sections.length} sections • {details.sections.reduce((acc, s) => acc + s.lectures.length, 0)} lectures</span>
                  <span style={{ color: '#0056d2', fontWeight: 600, cursor: 'pointer' }}>Expand all sections</span>
                </div>

                {/* Accordion container */}
                <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  {details.sections.map((sec, idx) => {
                    const isExpanded = openSections[idx];
                    return (
                      <div key={idx} style={{ borderBottom: idx !== details.sections.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                        {/* Section Header */}
                        <div 
                          onClick={() => toggleSection(idx)}
                          style={{
                            padding: '0.85rem 1rem',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span>{sec.title}</span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sec.duration}</span>
                        </div>

                        {/* Section Lectures */}
                        {isExpanded && (
                          <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {sec.lectures.map((lec, lIdx) => (
                              <div 
                                key={lIdx}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.45rem 0',
                                  fontSize: '0.85rem'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                  <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                                  <span>{lec.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  {lec.preview && (
                                    <span 
                                      style={{ color: '#0056d2', fontWeight: 600, fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        alert(`Playing preview video: "${lec.name}"`);
                                      }}
                                    >
                                      Preview
                                    </span>
                                  )}
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{lec.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box D: Requirements */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Requirements
                </h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {details.requirements.map((req, idx) => (
                    <li key={idx} style={{ lineHeight: 1.5 }}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Box E: Description */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Description
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {details.description}
                </p>
              </div>

            </div>

            {/* Right Sticky Purchase Sidebar Column */}
            <div 
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-secondary)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                position: 'sticky',
                top: '90px'
              }}
              className="sticky-purchase-sidebar"
            >
              {/* Course Preview Video Image */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  paddingTop: '56.25%',
                  background: '#000',
                  cursor: 'pointer'
                }}
                onClick={() => alert('Playing course introductory preview video...')}
              >
                <img 
                  src={details.image} 
                  alt={details.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.85
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <Play size={24} fill="#000" style={{ marginLeft: '4px' }} />
                </div>
                <span style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Preview this course
                </span>
              </div>

              {/* Purchase Options Container */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Options toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  
                  {/* Option 1: Subscribe */}
                  <label 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: pricingOption === 'subscribe' ? 'var(--accent-purple)' : 'transparent',
                      background: pricingOption === 'subscribe' ? 'rgba(79, 70, 229, 0.02)' : 'none'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="subscribe"
                      checked={pricingOption === 'subscribe'}
                      onChange={() => setPricingOption('subscribe')}
                      style={{ marginTop: '3px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Subscribe to Personal Plan</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From ₹350.00/month. Cancel anytime.</span>
                    </div>
                  </label>

                  {/* Option 2: Buy Individual */}
                  <label 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: pricingOption === 'buy' ? 'var(--accent-blue)' : 'transparent',
                      background: pricingOption === 'buy' ? 'rgba(0, 86, 210, 0.02)' : 'none'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="pricing" 
                      value="buy"
                      checked={pricingOption === 'buy'}
                      onChange={() => setPricingOption('buy')}
                      style={{ marginTop: '3px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Buy Individual Course</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{details.price}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{details.originalPrice}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>({Math.round(((details.originalPrice - details.price) / details.originalPrice) * 100)}% Off)</span>
                      </div>
                    </div>
                  </label>

                </div>

                {/* CTAs */}
                {pricingOption === 'subscribe' ? (
                  <button
                    onClick={handleSubscribeClick}
                    style={{
                      background: 'var(--accent-purple)',
                      border: 'none',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 4px 10px rgba(79, 70, 229, 0.15)'
                    }}
                  >
                    Start subscription
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      onClick={handleAddToCartClick}
                      style={{
                        background: 'var(--accent-blue)',
                        border: 'none',
                        color: '#fff',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleAddToCartClick}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '0.7rem',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                )}

                {/* Course features includes list */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>This course includes:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {details.includes.map((inc, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Info size={12} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Responsive layout styling overrides */}
      <style>{`
        @media (max-width: 768px) {
          .details-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .sticky-purchase-sidebar {
            position: relative !important;
            top: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
}
