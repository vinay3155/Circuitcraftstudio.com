import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Cpu, Send } from 'lucide-react';

export default function CircuitBot({ onOpenBuilder, onOpenProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm CircuitBot, your project guide. Let's find your perfect project. Which engineering branch are you from?",
      options: [
        { label: 'ECE / EEE (Electronics)', nextStep: 'electronics' },
        { label: 'CSE / ISE (Software/IT)', nextStep: 'software' },
        { label: 'AIML / Data Science', nextStep: 'aiml' }
      ]
    }
  ]);
  
  const chatEndRef = useRef(null);

  // Scroll chatbot to bottom when message list changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const dialogTree = {
    electronics: {
      text: "Excellent! Electronics is the heart of hardware. What microcontroller/domain are you most interested in?",
      options: [
        { label: 'Arduino & Sensors', nextStep: 'arduino' },
        { label: 'ESP32 / IoT (WiFi)', nextStep: 'iot' },
        { label: 'STM32 / Bare-Metal', nextStep: 'stm32' }
      ]
    },
    software: {
      text: "Awesome! Software + Hardware makes smart devices. What category interests you most?",
      options: [
        { label: 'Home Automation', nextStep: 'home_auto' },
        { label: 'Cloud Data Logging', nextStep: 'cloud_iot' },
        { label: 'Robotics Controls', nextStep: 'robotics' }
      ]
    },
    aiml: {
      text: "Incredible! AI at the edge is very popular. I recommend computer vision or sensor inference. What would you like to build?",
      options: [
        { label: 'Face/Object Recognition Cam', nextStep: 'face_cam' },
        { label: 'Environmental Predictor', nextStep: 'predictor' }
      ]
    },
    // Sub-branches
    arduino: {
      text: "For Arduino, I highly recommend our solar tracker or obstacle rovers. They are 100% working models with full source code. What is your goal?",
      options: [
        { label: 'Browse Robotics Kits', action: 'go_projects', category: 'Robotics Projects' },
        { label: 'Build custom Arduino prototype', action: 'go_builder' }
      ]
    },
    iot: {
      text: "For ESP32 IoT, our Weather Station and Smart Drip Irrigation are excellent choices logging to Blynk/ThingsSpeak clouds. What is your goal?",
      options: [
        { label: 'Browse IoT projects', action: 'go_projects', category: 'IoT Projects' },
        { label: 'Build custom IoT prototype', action: 'go_builder' }
      ]
    },
    stm32: {
      text: "For STM32, bare-metal FFT Wave Analyzers demonstrate deep firmware expertise, utilizing DMA and timers. What is your goal?",
      options: [
        { label: 'View Wave Analyzer', action: 'go_projects', category: 'Embedded Systems' }
      ]
    },
    home_auto: {
      text: "Voice activated switches are great for Home Automation. Our Voice Automation Hub handles offline voice triggers. What is your goal?",
      options: [
        { label: 'View Automation Hub', action: 'go_projects', category: 'Home Automation' }
      ]
    },
    cloud_iot: {
      text: "Our weather telemetry rigs log data to Google Sheets & ThingsSpeak. Perfect for cloud developers. What is your goal?",
      options: [
        { label: 'View Cloud projects', action: 'go_projects', category: 'IoT Projects' }
      ]
    },
    robotics: {
      text: "For robotics software control, our Self-Balancing Segway Rover or Path Finder Bot are ideal PID-loop projects. What is your goal?",
      options: [
        { label: 'Browse Robotics', action: 'go_projects', category: 'Robotics Projects' }
      ]
    },
    face_cam: {
      text: "Edge cameras represent advanced AI. Our ESP32-CAM and Raspberry Pi Face Attendance logs matches straight to SQL databases. What is your goal?",
      options: [
        { label: 'View Edge AI system', action: 'go_projects', category: 'AI & ML Projects' }
      ]
    },
    predictor: {
      text: "Weather forecasting and soil humidity analysis are great ML projects. Our smart drip irrigation tracks moisture parameters. What is your goal?",
      options: [
        { label: 'View Smart Ag projects', action: 'go_projects', category: 'Smart Agriculture' }
      ]
    }
  };

  const handleOptionClick = (option) => {
    // 1. Add user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: option.label
    };
    
    setMessages(prev => [...prev, userMsg]);

    // 2. Process action if option has one
    if (option.action) {
      setTimeout(() => {
        const actionMsg = {
          id: messages.length + 2,
          sender: 'bot',
          text: `Executing navigation... redirecting to ${option.label === 'Build custom Arduino prototype' || option.label === 'Build custom IoT prototype' ? 'DIY Configurator' : 'Projects Catalog'}.`
        };
        setMessages(prev => [...prev, actionMsg]);

        setTimeout(() => {
          if (option.action === 'go_builder') {
            onOpenBuilder();
          } else if (option.action === 'go_projects') {
            onOpenProjects();
          }
          setIsOpen(false); // Close chat
        }, 1000);
      }, 500);
      return;
    }

    // 3. Find next node
    const nextNode = dialogTree[option.nextStep];
    if (nextNode) {
      setTimeout(() => {
        const botMsg = {
          id: messages.length + 2,
          sender: 'bot',
          text: nextNode.text,
          options: nextNode.options
        };
        setMessages(prev => [...prev, botMsg]);
      }, 600);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Hello! I'm CircuitBot, your project guide. Let's find your perfect project. Which engineering branch are you from?",
        options: [
          { label: 'ECE / EEE (Electronics)', nextStep: 'electronics' },
          { label: 'CSE / ISE (Software/IT)', nextStep: 'software' },
          { label: 'AIML / Data Science', nextStep: 'aiml' }
        ]
      }
    ]);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%)',
            border: 'none',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--glow-cyan-strong)',
            animation: 'pulse-ring 2s infinite',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="glass-panel"
          style={{
            width: '340px',
            height: '420px',
            background: 'var(--bg-secondary)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            animation: 'slide-in 0.3s ease',
            textAlign: 'left'
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '0.85rem 1rem',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>CircuitBot Project Guide</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={handleResetChat}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Reset
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {/* Text Bubble */}
                <div 
                  style={{
                    maxWidth: '85%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                    background: msg.sender === 'user' ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                    color: msg.sender === 'user' ? '#000' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.03)' : 'none'
                  }}
                >
                  {msg.text}
                </div>

                {/* Option Buttons (only for bot's latest message with choices) */}
                {msg.sender === 'bot' && msg.options && msg.id === messages[messages.length - 1].id && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.65rem', width: '100%' }}>
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--accent-cyan)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}
