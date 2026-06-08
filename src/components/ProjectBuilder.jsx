import React, { useState } from 'react';
import { Cpu, Check, Layers, AlertCircle, ShoppingCart } from 'lucide-react';

export default function ProjectBuilder({ onAddCustomToCart }) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('My Custom Project');
  
  // Selection States
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  // Data Definition
  const domains = [
    { id: 'iot', name: 'IoT & Smart Systems', basePrice: 2000, description: 'Cloud connected sensors and logging.' },
    { id: 'robotics', name: 'Robotics & Automation', basePrice: 2500, description: 'Motors, wheel chassis, path controllers.' },
    { id: 'embedded', name: 'Embedded Systems', basePrice: 1500, description: 'Low-level RTOS, display interfaces, bare-metal.' },
    { id: 'aiml', name: 'AI & Machine Learning', basePrice: 3000, description: 'Edge cameras, image sorting, local inference.' }
  ];

  const microcontrollers = [
    { id: 'arduino', name: 'Arduino Uno R3', price: 600, pinCount: 14, interface: 'I2C/SPI/UART' },
    { id: 'esp32', name: 'ESP32 NodeMCU (WiFi+BT)', price: 950, pinCount: 36, interface: 'WiFi / BLE' },
    { id: 'pico', name: 'Raspberry Pi Pico W', price: 700, pinCount: 26, interface: 'WiFi / SPI' },
    { id: 'stm32', name: 'STM32 BluePill Cortex M3', price: 850, pinCount: 32, interface: 'DMA / SPI' }
  ];

  const modules = [
    { id: 'dht22', name: 'DHT22 Temp & Humidity Sensor', price: 250, type: 'sensor' },
    { id: 'ultrasonic', name: 'HC-SR04 Ultrasonic Sensor', price: 200, type: 'sensor' },
    { id: 'pir', name: 'PIR Motion Sensor', price: 180, type: 'sensor' },
    { id: 'mq135', name: 'MQ-135 Gas & Air Quality Sensor', price: 300, type: 'sensor' },
    { id: 'servo', name: 'SG90 Micro Servo Motor', price: 250, type: 'actuator' },
    { id: 'dc_motors', name: 'Dual DC Motors + L298N Driver', price: 750, type: 'actuator' },
    { id: 'oled', name: '0.96 inch I2C OLED Display', price: 350, type: 'display' },
    { id: 'bluetooth', name: 'HC-05 Serial Bluetooth Module', price: 400, type: 'wireless' },
    { id: 'solar', name: '5V Solar Panel + Charge Circuit', price: 850, type: 'power' }
  ];

  const services = [
    { id: 'pcb', name: 'Custom PCB Layout Routing', price: 1200 },
    { id: 'report', name: 'Synopsis & Standard Project Report', price: 1000 },
    { id: 'casing', name: '3D Printed Structural Case Enclosure', price: 1500 },
    { id: 'mentorship', name: '1-on-1 Zoom Mentorship Support (2 Hours)', price: 1800 }
  ];

  // Logic Calculations
  const calculateTotal = () => {
    let sum = 0;
    if (selectedDomain) sum += selectedDomain.basePrice;
    if (selectedMicrocontroller) sum += selectedMicrocontroller.price;
    selectedModules.forEach(m => sum += m.price);
    selectedServices.forEach(s => sum += s.price);
    return sum;
  };

  const handleModuleToggle = (module) => {
    if (selectedModules.some(m => m.id === module.id)) {
      setSelectedModules(selectedModules.filter(m => m.id !== module.id));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  const handleServiceToggle = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleAddToCart = () => {
    const customProject = {
      id: 'custom-' + Date.now(),
      title: `${projectName} (DIY Custom Design)`,
      category: 'Custom Configurator',
      price: calculateTotal(),
      difficulty: 'Custom Build',
      microcontroller: selectedMicrocontroller ? selectedMicrocontroller.name : 'Not selected',
      description: `Custom configured ${selectedDomain ? selectedDomain.name : 'project'} containing: ${selectedModules.map(m => m.name).join(', ')}.`,
      features: [
        `Domain: ${selectedDomain ? selectedDomain.name : 'Unspecified'}`,
        `MCU: ${selectedMicrocontroller ? selectedMicrocontroller.name : 'None'}`,
        `Services: ${selectedServices.map(s => s.name).join(', ') || 'Hardware only'}`
      ],
      hardwareIncluded: [
        selectedMicrocontroller?.name,
        ...selectedModules.map(m => m.name),
        ...selectedServices.map(s => s.name + ' service')
      ].filter(Boolean)
    };

    onAddCustomToCart(customProject);

    // Reset wizard
    setStep(1);
    setSelectedDomain(null);
    setSelectedMicrocontroller(null);
    setSelectedModules([]);
    setSelectedServices([]);
    setProjectName('My Custom Project');
  };

  return (
    <section 
      id="builder"
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1000px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 
          style={{ 
            fontSize: '2.25rem', 
            marginBottom: '0.75rem',
            color: '#fff',
            textShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
          }}
        >
          DIY PROJECT <span style={{ color: 'var(--accent-cyan)' }}>CONFIGURATOR</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Design your own microcontroller project step-by-step. Get an instant quote estimate and let us build your vision.
        </p>
      </div>

      {/* Grid Layout: Left Column (Wizard Steps), Right Column (Live Invoice Shield) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '2.5rem',
          alignItems: 'start'
        }}
        className="builder-grid-layout"
      >
        {/* Wizard Panel */}
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
          {/* Progress Indicator */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '2rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1rem'
            }}
          >
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: step === s ? 1 : step > s ? 0.8 : 0.4,
                  color: step === s ? 'var(--accent-cyan)' : step > s ? 'var(--accent-green)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <span 
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: step === s ? 'rgba(0, 229, 255, 0.1)' : step > s ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid',
                    borderColor: step === s ? 'var(--accent-cyan)' : step > s ? 'var(--accent-green)' : 'var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                  }}
                >
                  {step > s ? <Check size={14} /> : s}
                </span>
                <span className="step-label">
                  {s === 1 ? 'Domain' : s === 2 ? 'Controller' : s === 3 ? 'Sensors' : 'Services'}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Select Domain */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Step 1: Choose Your Project Domain</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="builder-step-grid">
                {domains.map((dom) => (
                  <div 
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom)}
                    style={{
                      border: '1px solid',
                      borderColor: selectedDomain?.id === dom.id ? 'var(--accent-cyan)' : 'var(--border-color)',
                      background: selectedDomain?.id === dom.id ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                      padding: '1.25rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <h4 style={{ color: selectedDomain?.id === dom.id ? 'var(--accent-cyan)' : '#fff', marginBottom: '0.35rem' }}>
                      {dom.name}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                      {dom.description}
                    </p>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Base setup: ₹{dom.basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Microcontroller */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Step 2: Select Microcontroller Board (Brain)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="builder-step-grid">
                {microcontrollers.map((mcu) => (
                  <div 
                    key={mcu.id}
                    onClick={() => setSelectedMicrocontroller(mcu)}
                    style={{
                      border: '1px solid',
                      borderColor: selectedMicrocontroller?.id === mcu.id ? 'var(--accent-cyan)' : 'var(--border-color)',
                      background: selectedMicrocontroller?.id === mcu.id ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                      padding: '1.25rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <h4 style={{ color: selectedMicrocontroller?.id === mcu.id ? 'var(--accent-cyan)' : '#fff', marginBottom: '0.35rem' }}>
                      {mcu.name}
                    </h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <span>Pins: {mcu.pinCount}</span> • <span>Interface: {mcu.interface}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      +₹{mcu.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Sensors & Actuators */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>Step 3: Choose Peripheral Sensors & Actuators</h3>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '0.75rem',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  paddingRight: '0.5rem'
                }}
              >
                {modules.map((mod) => {
                  const isChecked = selectedModules.some(m => m.id === mod.id);
                  return (
                    <div 
                      key={mod.id}
                      onClick={() => handleModuleToggle(mod)}
                      style={{
                        border: '1px solid',
                        borderColor: isChecked ? 'var(--accent-cyan)' : 'var(--border-color)',
                        background: isChecked ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div>
                        <h4 style={{ color: isChecked ? 'var(--accent-cyan)' : '#fff', fontSize: '0.85rem' }}>{mod.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+₹{mod.price}</span>
                      </div>
                      <div 
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isChecked ? 'var(--accent-cyan)' : 'var(--text-muted)',
                          background: isChecked ? 'var(--accent-cyan)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isChecked && <Check size={10} style={{ color: '#000', strokeWidth: 4 }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Select Services */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Step 4: Select Professional Add-ons</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                Complete your project package with PCB schematics and comprehensive mentorship.
              </p>
              
              {/* Project Title customization */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Define Your Project Name
                </label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {services.map((srv) => {
                  const isChecked = selectedServices.some(s => s.id === srv.id);
                  return (
                    <div 
                      key={srv.id}
                      onClick={() => handleServiceToggle(srv)}
                      style={{
                        border: '1px solid',
                        borderColor: isChecked ? 'var(--accent-cyan)' : 'var(--border-color)',
                        background: isChecked ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                        padding: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div>
                        <h4 style={{ color: isChecked ? 'var(--accent-cyan)' : '#fff', fontSize: '0.9rem' }}>{srv.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>+₹{srv.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div 
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isChecked ? 'var(--accent-cyan)' : 'var(--text-muted)',
                          background: isChecked ? 'var(--accent-cyan)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isChecked && <Check size={12} style={{ color: '#000', strokeWidth: 4 }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '2rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem' 
            }}
          >
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: step === 1 ? 'not-allowed' : 'pointer',
                opacity: step === 1 ? 0.3 : 1
              }}
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 1 && !selectedDomain) {
                    alert('Please select a project domain first!');
                    return;
                  }
                  if (step === 2 && !selectedMicrocontroller) {
                    alert('Please select a microcontroller board!');
                    return;
                  }
                  setStep(step + 1);
                }}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px'
                }}
                className="glow-btn"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="glow-btn"
              >
                <ShoppingCart size={16} />
                Add Config to Cart
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Schematic / Live Invoice Column */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '1.5rem', 
            textAlign: 'left',
            position: 'sticky',
            top: '80px',
            background: 'rgba(5, 7, 12, 0.9)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <Layers size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>CONFIGURATION</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '180px', fontSize: '0.85rem' }}>
            {/* Domain */}
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Project Domain</span>
              {selectedDomain ? (
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedDomain.name}</span>
              ) : (
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Pending selection (Step 1)</span>
              )}
            </div>

            {/* Controller */}
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Main Processing Brain</span>
              {selectedMicrocontroller ? (
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedMicrocontroller.name}</span>
              ) : (
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Pending selection (Step 2)</span>
              )}
            </div>

            {/* Selected Modules */}
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Interfacing Modules ({selectedModules.length})</span>
              {selectedModules.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                  {selectedModules.map(m => (
                    <span key={m.id} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>
                      {m.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>None selected</span>
              )}
            </div>

            {/* Add-ons */}
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Professional Add-ons</span>
              {selectedServices.length > 0 ? (
                <ul style={{ paddingLeft: '1rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {selectedServices.map(s => (
                    <li key={s.id}>{s.name}</li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>None selected</span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div 
            style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.25rem', 
              borderTop: '1px dashed var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estimated Cost:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.15)', borderRadius: '6px', padding: '0.5rem', color: 'var(--accent-yellow)', fontSize: '0.75rem' }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <span>Includes complete components kit, verified wiring schematic, and source code.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .builder-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .builder-step-grid {
            grid-template-columns: 1fr !important;
          }
          .step-label {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
