import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, CreditCard, QrCode, ShieldCheck, CheckCircle2, Download, Printer } from 'lucide-react';

export default function PaymentGateway({ 
  isOpen, 
  onClose, 
  cart, 
  onRemoveFromCart, 
  onClearCart 
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, billing, success
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, upi
  const [cvvFocused, setCvvFocused] = useState(false);
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UPI Timer State
  const [upiTimer, setUpiTimer] = useState(120);
  const [upiStatus, setUpiStatus] = useState('pending'); // pending, checking, success

  // Billing Form State
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    address: '',
    state: 'Karnataka',
    pincode: ''
  });

  const [orderId, setOrderId] = useState('');

  // Generate random order ID on checkout
  useEffect(() => {
    if (checkoutStep === 'billing') {
      setOrderId('CCS-' + Math.floor(100000 + Math.random() * 900000));
    }
  }, [checkoutStep]);

  // UPI Timer logic
  useEffect(() => {
    let timerInterval;
    if (checkoutStep === 'billing' && paymentMethod === 'upi' && upiStatus === 'pending') {
      setUpiTimer(120);
      timerInterval = setInterval(() => {
        setUpiTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [checkoutStep, paymentMethod, upiStatus]);

  // Automated email notification to merchant via FormSubmit.co silently in background
  const sendNotifications = (currentOrderId, currentCart, currentBillingInfo) => {
    const totalCost = currentCart.reduce((sum, item) => sum + item.price, 0);
    const itemDetailsText = currentCart.map(item => `- ${item.title} (₹${item.price.toLocaleString('en-IN')}) [${item.microcontroller}]`).join('\n');
    
    const emailPayload = {
      _subject: `⚡ New Order Received - ${currentOrderId} (₹${totalCost.toLocaleString('en-IN')})`,
      orderId: currentOrderId,
      customerName: currentBillingInfo.fullName,
      customerEmail: currentBillingInfo.email,
      customerPhone: currentBillingInfo.phone,
      college: currentBillingInfo.college || 'Not specified',
      shippingAddress: currentBillingInfo.address,
      itemsOrdered: itemDetailsText,
      totalPaidAmount: `₹${totalCost.toLocaleString('en-IN')}`
    };

    fetch('https://formsubmit.co/ajax/vinaynbodravla315@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    })
    .then(response => response.json())
    .then(data => console.log('Silently emailed order to vinaynbodravla315@gmail.com:', data))
    .catch(error => console.error('Silent email notification failed:', error));
  };

  useEffect(() => {
    if (checkoutStep === 'success' && orderId && cart.length > 0) {
      sendNotifications(orderId, cart, billingInfo);
    }
  }, [checkoutStep]);

  const getWhatsAppLink = () => {
    const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
    const text = `Hello CircuitCraft Studio! 🚀\nI have just completed my order payment on your website.\n\n*Order ID:* ${orderId}\n*Customer:* ${billingInfo.fullName}\n*Phone:* ${billingInfo.phone}\n*Email:* ${billingInfo.email}\n*College:* ${billingInfo.college || 'N/A'}\n*Total Paid:* ₹${totalCost.toLocaleString('en-IN')}\n\n*Items Ordered:*${cart.map(item => `\n- ${item.title}`).join('')}\n\nPlease confirm my delivery. Thank you!`;
    return `https://api.whatsapp.com/send?phone=918123265315&text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < val.length; i += 4) {
      parts.push(val.substring(i, i + 4));
    }
    if (val.length <= 16) {
      setCardNumber(parts.join(' '));
    }
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\//g, '').replace(/\D/g, '');
    if (val.length <= 4) {
      if (val.length > 2) {
        setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
      } else {
        setCardExpiry(val);
      }
    }
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const handleSimulateUpiPayment = () => {
    setUpiStatus('checking');
    setTimeout(() => {
      setUpiStatus('success');
      setTimeout(() => {
        setCheckoutStep('success');
      }, 1500);
    }, 2500);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.phone || !billingInfo.address) {
      alert('Please fill in required fields.');
      return;
    }
    
    if (paymentMethod === 'card') {
      if (cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
        alert('Please complete credit card details.');
        return;
      }
      setCheckoutStep('success');
    }
  };

  const handlePrintInvoice = () => {
    const printContent = document.getElementById('printable-invoice-area').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    
    // reload to bind react events correctly after wiping innerHTML
    window.location.reload();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fade-in 0.3s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: checkoutStep === 'billing' ? '800px' : '450px',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 25px rgba(0,0,0,0.5)',
          animation: 'slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          color: 'var(--text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
              {checkoutStep === 'cart' ? 'Your Shopping Cart' : checkoutStep === 'billing' ? 'Secure Checkout' : 'Order Successful'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
        </div>

        {/* CART STEP */}
        {checkoutStep === 'cart' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                  <ShoppingBag size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        padding: '1rem',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ maxWidth: '80%' }}>
                        <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.25rem' }} className="line-clamp-2">{item.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{item.category}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 700 }}>₹{item.price.toLocaleString('en-IN')}</span>
                        <button 
                          onClick={() => onRemoveFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtotal & Action */}
            {cart.length > 0 && (
              <div 
                style={{
                  padding: '1.5rem',
                  borderTop: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                  <span>Total Payable:</span>
                  <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    ₹{calculateSubtotal().toLocaleString('en-IN')}
                  </span>
                </div>

                <button 
                  onClick={() => setCheckoutStep('billing')}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '30px'
                  }}
                  className="glow-btn"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* BILLING / CHECKOUT STEP */}
        {checkoutStep === 'billing' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <form 
              onSubmit={handleCheckoutSubmit}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 320px', 
                height: '100%', 
                overflow: 'hidden' 
              }}
              className="checkout-form-grid"
            >
              {/* Form entries */}
              <div style={{ padding: '1.5rem', overflowY: 'auto', textAlign: 'left' }}>
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
                  1. Shipping & Contact Details
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="shipping-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={billingInfo.fullName}
                      onChange={(e) => setBillingInfo({...billingInfo, fullName: e.target.value})}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={billingInfo.email}
                      onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }} className="shipping-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={billingInfo.phone}
                      onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>College / Organization</label>
                    <input 
                      type="text" 
                      value={billingInfo.college}
                      onChange={(e) => setBillingInfo({...billingInfo, college: e.target.value})}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Delivery Address *</label>
                  <textarea 
                    required 
                    rows={2} 
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff', fontFamily: 'inherit', resize: 'none' }}
                  />
                </div>

                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
                  2. Payment Method
                </h4>

                {/* Tab selector */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '6px',
                      background: paymentMethod === 'card' ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid',
                      borderColor: paymentMethod === 'card' ? 'var(--accent-cyan)' : 'var(--border-color)',
                      color: paymentMethod === 'card' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontWeight: 600
                    }}
                  >
                    <CreditCard size={16} /> Credit/Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '6px',
                      background: paymentMethod === 'upi' ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid',
                      borderColor: paymentMethod === 'upi' ? 'var(--accent-cyan)' : 'var(--border-color)',
                      color: paymentMethod === 'upi' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontWeight: 600
                    }}
                  >
                    <QrCode size={16} /> UPI QR Scan
                  </button>
                </div>

                {/* CARD FORM */}
                {paymentMethod === 'card' && (
                  <div>
                    {/* Animated Credit Card UI */}
                    <div className="card-container">
                      <div className={`credit-card ${cvvFocused ? 'flipped' : ''}`}>
                        {/* FRONT */}
                        <div className="card-front">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>CIRCUITCRAFT DEBIT</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontStyle: 'italic' }}>VISA</span>
                          </div>
                          {/* Chip */}
                          <div style={{ width: '36px', height: '26px', background: 'var(--accent-yellow)', borderRadius: '4px', opacity: 0.85 }} />
                          <div style={{ fontSize: '1.25rem', letterSpacing: '3px', fontFamily: 'var(--font-display)', minHeight: '1.5rem' }}>
                            {cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                            <div>
                              <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', fontSize: '0.6rem' }}>CARDHOLDER</span>
                              <span style={{ textTransform: 'uppercase' }}>{cardName || 'YOUR NAME'}</span>
                            </div>
                            <div>
                              <span style={{ color: 'rgba(255,255,255,0.6)', display: 'block', fontSize: '0.6rem' }}>EXPIRES</span>
                              <span>{cardExpiry || 'MM/YY'}</span>
                            </div>
                          </div>
                        </div>
                        {/* BACK */}
                        <div className="card-back">
                          <div className="card-magnetic-strip" />
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', display: 'block', marginBottom: '2px', textAlign: 'right' }}>CVV AUTHORIZATION</span>
                            <div className="card-signature-cvv">
                              <span className="cvv-number">{cardCvv || '•••'}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                            Simulated transaction. Secured by local sandbox sandbox-256 keys.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4111 2222 3333 4444" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="VINAY N" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CVV Code</label>
                          <input 
                            type="password" 
                            placeholder="123" 
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            onFocus={() => setCvvFocused(true)}
                            onBlur={() => setCvvFocused(false)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: '#fff' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI QR GATEWAY */}
                {paymentMethod === 'upi' && (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div 
                      style={{ 
                        background: '#fff', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        display: 'inline-block',
                        marginBottom: '1rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.25)' 
                      }}
                    >
                      {/* Dynamic UPI Payment QR Code Generator */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                          `upi://pay?pa=vinaynbodravla315@okaxis&pn=CircuitCraft%20Studio&am=${calculateSubtotal()}&cu=INR&tn=Order%20${orderId}`
                        )}`}
                        alt="Scan to Pay via UPI"
                        style={{ 
                          width: '180px', 
                          height: '180px', 
                          display: 'block',
                          borderRadius: '4px',
                          margin: '0 auto'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Scan using GPay, PhonePe, or BHIM app</span>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Merchant: CircuitCraft Studio</span>
                      <code style={{ display: 'block', width: 'fit-content', margin: '4px auto', background: '#05070c', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                        vinaynbodravla315@okaxis
                      </code>
                    </div>

                    {upiStatus === 'pending' && (
                      <div>
                        <div style={{ color: 'var(--accent-yellow)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>
                          Timer: {formatTimer(upiTimer)}
                        </div>
                        <button
                          type="button"
                          onClick={handleSimulateUpiPayment}
                          style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '20px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid var(--accent-green)',
                            color: 'var(--accent-green)',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Simulate Payment Received
                        </button>
                      </div>
                    )}

                    {upiStatus === 'checking' && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid rgba(0,229,255,0.1)', borderTopColor: 'var(--accent-cyan)', animation: 'orb-float 1s linear infinite' }} />
                        <span>Verifying transfer records...</span>
                      </div>
                    )}

                    {upiStatus === 'success' && (
                      <div style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 600 }}>
                        <CheckCircle2 size={18} /> Transfer Complete!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Invoice Summary Side Panel */}
              <div 
                style={{
                  borderLeft: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  textAlign: 'left'
                }}
              >
                <div style={{ padding: '1.25rem', overflowY: 'auto' }}>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.85rem', fontFamily: 'var(--font-display)' }}>ORDER INVOICE</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span>Order: {orderId}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.4rem' }}>
                        <span style={{ color: 'var(--text-primary)', maxWidth: '70%' }} className="line-clamp-2">{item.title}</span>
                        <span style={{ fontWeight: 600 }}>₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  style={{
                    padding: '1.25rem',
                    borderTop: '1px solid var(--border-color)',
                    background: 'rgba(5, 7, 12, 0.4)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <span>Subtotal:</span>
                    <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    <span>Gst TAX (18% inclusive):</span>
                    <span>₹{Math.floor(calculateSubtotal() * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
                    <span>Total Cost:</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                  </div>

                  {paymentMethod === 'card' && (
                    <button 
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      className="glow-btn"
                    >
                      <ShieldCheck size={18} /> Confirm & Pay
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* SUCCESS STEP */}
        {checkoutStep === 'success' && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              height: '100%', 
              padding: '2rem 1.5rem',
              textAlign: 'center' 
            }}
          >
            <div style={{ margin: 'auto 0' }}>
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  border: '2px solid var(--accent-green)',
                  color: 'var(--accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--glow-green)',
                  animation: 'pulse-ring 2s infinite'
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Payment Successful!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Your order is confirmed. A copy of the source code and components tracking will be sent to <strong>{billingInfo.email || 'your email'}</strong>.
              </p>

              {/* Setup process items */}
              <div 
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'left',
                  maxWidth: '360px',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
                  <span style={{ fontWeight: 'bold' }}>✓</span>
                  <span>Invoice receipt generated ({orderId})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                  <span style={{ animation: 'blink 1s infinite' }}>●</span>
                  <span>Compiling Arduino/ESP32 firmware binaries</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <span>○</span>
                  <span>Components shipment dispatching from warehouse</span>
                </div>
              </div>

              {/* WhatsApp Notification Button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                  maxWidth: '360px',
                  margin: '0 auto 1.5rem',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.357-2.903-6.978-2.903-5.44 0-9.863 4.42-9.867 9.86-.001 1.73.457 3.41 1.32 4.933l-.994 3.635 3.736-.98zm11.233-5.95c-.322-.16-1.905-.94-2.202-1.05-.297-.11-.513-.16-.73.16-.216.32-.835 1.05-1.025 1.27-.19.22-.38.25-.7.09-.32-.16-1.353-.5-2.581-1.6c-.955-.852-1.6-1.907-1.787-2.227-.188-.32-.02-.49.14-.65.14-.145.32-.375.48-.56.16-.188.216-.32.324-.53.11-.22.05-.41-.025-.57-.075-.16-.73-1.76-1.002-2.41-.265-.636-.53-.55-.73-.56h-.63c-.216 0-.57.08-.868.41-.297.32-1.135 1.11-1.135 2.71 0 1.6 1.168 3.15 1.33 3.37.162.22 2.3 3.51 5.57 4.92.778.33 1.385.53 1.858.68.78.25 1.49.21 2.05.13.626-.09 1.905-.78 2.175-1.53.27-.75.27-1.39.19-1.53-.08-.14-.297-.22-.62-.38z"/>
                </svg>
                Confirm on WhatsApp (+91 81232 65315)
              </a>
            </div>

            {/* Print/Download Invoice area & Action button */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handlePrintInvoice}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={16} /> Print Invoice
                </button>
                <button
                  onClick={() => {
                    onClearCart();
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                  }}
                  className="glow-btn"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Hidden Printable Area */}
            <div id="printable-invoice-area" style={{ display: 'none' }}>
              <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#000', backgroundColor: '#fff', textAlign: 'left' }}>
                <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>CIRCUITCRAFT STUDIO</h1>
                    <span style={{ fontSize: '12px', color: '#666' }}>Transforming Engineering Ideas into Reality</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '18px', margin: 0 }}>INVOICE</h2>
                    <span style={{ fontSize: '12px', color: '#666' }}>Order ID: {orderId}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '14px' }}>
                  <div>
                    <strong>Billed To:</strong><br />
                    {billingInfo.fullName}<br />
                    {billingInfo.college && <span>{billingInfo.college}<br /></span>}
                    {billingInfo.address}<br />
                    Phone: {billingInfo.phone}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Merchant Details:</strong><br />
                    CircuitCraft Studio<br />
                    Email: vinaynbodravla315@gmail.com<br />
                    Phone: +91 81232 65315<br />
                    Date: {new Date().toLocaleDateString()}
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                      <th style={{ padding: '8px 0' }}>Item Description</th>
                      <th style={{ padding: '8px 0', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 0' }}>
                          <strong>{item.title}</strong><br />
                          <span style={{ fontSize: '11px', color: '#666' }}>Category: {item.category} ({item.microcontroller})</span>
                        </td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold' }}>₹{item.price.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px' }}>
                  <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Subtotal:</span>
                      <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ccc', paddingTop: '8px', fontWeight: 'bold', fontSize: '16px' }}>
                      <span>Amount Paid:</span>
                      <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '50px', borderTop: '1px solid #ccc', paddingTop: '10px', textAlign: 'center', fontSize: '11px', color: '#666' }}>
                  Thank you for innovating with CircuitCraft Studio! Quality Work • On-Time Delivery.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-form-grid {
            grid-template-columns: 1fr !important;
          }
          .shipping-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
