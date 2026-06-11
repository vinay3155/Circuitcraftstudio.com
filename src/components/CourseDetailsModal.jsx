import React from 'react';
import { X, Clock, BookOpen, Award, CheckCircle2, User, ChevronRight } from 'lucide-react';

export default function CourseDetailsModal({ isOpen, onClose, courseId }) {
  if (!isOpen || !courseId) return null;

  const courseData = {
    'course-rtos-stm32': {
      title: 'Mastering RTOS: Hands on FreeRTOS and STM32Fx with MCU',
      duration: '12 weeks (24.5 Hours Content)',
      instructor: 'Vinay Bodravla (Founder & Lead Embedded Architect)',
      overview: 'Develop professional-grade firmware using FreeRTOS on STM32 microcontrollers. This course takes you bare-metal register configs to task scheduling, semaphores, queues, and concurrency mechanisms.',
      outcomes: [
        'Understand RTOS concepts: Tasks, Kernel Schedulers, Context Switching',
        'Configure FreeRTOS Tasks, Priorities, State Transitions, and Hooks',
        'Implement Synchronization using Semaphores, Mutexes, and Queue buffers',
        'Write thread-safe Peripheral Drivers for UART, I2C, SPI, and ADC',
        'Debug race conditions, deadlock scenarios, and stack overflow issues'
      ],
      certDetails: 'Earn a verified Certificate of Completion with a unique verification ID linked directly to the CircuitCraft blockchain registry database upon completing all 182 lectures and 3 mock projects.'
    },
    'course-embedded-bootcamp': {
      title: 'Embedded Systems Bootcamp: RTOS, IoT, AI, Vision and FPGA',
      duration: '18 weeks (42 Hours Content)',
      instructor: 'Vinay Bodravla, Subramanya Sondur & Mallikarjun Bujaruk (Founding Hardware Architects)',
      overview: 'The ultimate zero-to-hero firmware bootcamp. Build cloud-connected smart nodes, run light convolutional neural filters (Edge-AI) on microcontrollers, and synthesize digital hardware circuits on Xilinx FPGAs using Verilog.',
      outcomes: [
        'Program microcontrollers in Embedded C and compile with GCC toolchains',
        'Design local machine-vision pipelines and edge analytics on micro-nodes',
        'Synthesize custom digital architectures on FPGA boards using Verilog HDL',
        'Establish secure Wi-Fi and Cellular telemetry streams to cloud databases',
        'Construct production-ready PCB layouts and hardware schematics'
      ],
      certDetails: 'Includes a verified Professional Bootcamp Diploma displaying your custom projects, signed by our instructors and verifiable by future employers using our lookup tool.'
    },
    'course-microcontroller-timers': {
      title: 'Mastering Microcontroller: Timers, PWM, CAN, Low Power & DMA',
      duration: '10 weeks (18 Hours Content)',
      instructor: 'Vinay Bodravla (Founder & Lead Architect)',
      overview: 'Dive deep into microcontroller peripheral configurations. Master the core silicon mechanisms that make modern hardware power-efficient and high-performing, including Direct Memory Access (DMA) and Controller Area Network (CAN).',
      outcomes: [
        'Program hardware timers, input captures, output compares, and interrupts',
        'Design Pulse-Width Modulation (PWM) drivers for motor control and dimming',
        'Implement CAN Bus protocols for automotive and industrial networking',
        'Configure Low Power sleep modes, wake-up triggers, and clock scaling',
        'Optimize memory transfers using Direct Memory Access (DMA) controllers'
      ],
      certDetails: 'Get a validated Technical Certification in Microcontroller Architecture upon submitting the CAN Bus transceiver lab simulation exercises.'
    },
    'course-arm-cortex': {
      title: 'Embedded Systems Programming on ARM Cortex-M3/M4 MCU',
      duration: '14 weeks (30.5 Hours Content)',
      instructor: 'Vinay Bodravla & Industry Mentors',
      overview: 'Unlock the potential of ARM silicon. Learn how to read ARM technical manuals, write registers directly from scratch without HAL abstraction libraries, and write custom interrupt controllers and bootloaders.',
      outcomes: [
        'Understand ARM Cortex processor architecture, pipeline states, and stacks',
        'Write bare-metal register level code directly in C (no HAL, no libraries)',
        'Configure the nested vector interrupt controller (NVIC) from registers',
        'Implement Custom Bootloaders and firmware updating protocols (OTA)',
        'Program clock tree setups, flash controllers, and sysTick timers'
      ],
      certDetails: 'Earn a recognized ARM Silicon Developer Certificate verifying your capability to code hardware at the low register abstraction level.'
    }
  };

  const details = courseData[courseId] || {
    title: 'Advanced Engineering Project',
    duration: '6 weeks',
    instructor: 'CircuitCraft Team',
    overview: 'Premium engineering course details',
    outcomes: ['Develop hardware skills', 'Implement project codes', 'Succeed in reviews'],
    certDetails: 'Verifiable Certificate of Completion included.'
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 110,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.3s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
          color: 'var(--text-primary)',
          textAlign: 'left',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-tertiary)'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0056d2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Course Syllabus & Details
          </span>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
          
          {/* Title and Meta */}
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1.25, color: 'var(--text-primary)', margin: 0 }}>
              {details.title}
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Clock size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span><strong>Duration:</strong> {details.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <User size={16} style={{ color: 'var(--accent-purple)' }} />
                <span><strong>Instructor:</strong> {details.instructor}</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Course Overview
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              {details.overview}
            </p>
          </div>

          {/* Outcomes */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              What You Will Learn (Outcomes)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {details.outcomes.map((outcome, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '0.15rem' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 86, 210, 0.04) 0%, rgba(79, 70, 229, 0.04) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={18} style={{ color: '#0056d2' }} />
              Verifiable Certificate Included
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {details.certDetails}
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div 
          style={{ 
            padding: '1rem 1.75rem', 
            borderTop: '1px solid var(--border-color)', 
            background: 'var(--bg-tertiary)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-color)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
