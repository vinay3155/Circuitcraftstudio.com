import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle, AlertTriangle, XCircle, Award } from 'lucide-react';

export default function CertificateVerifier() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { valid: true/false, data: {...}, error: '...' }

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setResult(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/certificates/verify/${certId.trim()}`);
      const data = await res.json();
      
      if (res.ok && data.valid) {
        setResult({ valid: true, data: data.certificate });
      } else {
        setResult({ valid: false, error: data.error || 'Certificate not found.' });
      }
    } catch (err) {
      console.error('Error verifying certificate:', err);
      setResult({ valid: false, error: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section 
      id="verifier"
      style={{
        padding: '5rem 2rem',
        background: 'var(--bg-tertiary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem', textAlign: 'center' }}>
        
        {/* Title */}
        <div>
          <span 
            style={{
              background: 'rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-green)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Verified Credentials
          </span>
          <h2 
            style={{ 
              fontSize: '2.2rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-display)',
              marginTop: '1rem',
              letterSpacing: '-0.02em'
            }}
          >
            Certificate Verification System
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Employers and academic institutions can verify the authenticity of certificates issued by CircuitCraft.
          </p>
        </div>

        {/* Verifier Card */}
        <div 
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
          }}
        >
          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
              <Award size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Enter Certificate Verification ID (e.g. CC-E70A-F56B-883F)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  borderRadius: '30px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  outline: 'none',
                  transition: 'border var(--transition-fast)'
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.8rem 2rem',
                borderRadius: '30px',
                background: '#0056d2',
                border: 'none',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 10px rgba(0, 86, 210, 0.2)'
              }}
            >
              {loading ? (
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', animation: 'orb-float 0.8s linear infinite' }} />
              ) : (
                <Search size={16} />
              )}
              <span>Verify ID</span>
            </button>
          </form>

          {/* Verification Results Display */}
          {result && (
            <div style={{ marginTop: '2rem', animation: 'fade-in 0.3s ease' }}>
              {result.valid ? (
                /* Success Card */
                <div 
                  style={{
                    background: 'rgba(22, 163, 74, 0.05)',
                    border: '1px solid rgba(22, 163, 74, 0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <CheckCircle size={32} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ✅ Valid Certificate
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {result.data.courseName}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      <span><strong>Student Name:</strong> {result.data.studentName}</span>
                      <span><strong>Issue Date:</strong> {formatDate(result.data.issueDate)}</span>
                      <span><strong>Verification ID:</strong> <code style={{ color: '#0056d2', fontWeight: 600 }}>{result.data.certificateId}</code></span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Failure Card */
                <div 
                  style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <XCircle size={32} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ❌ Invalid Certificate ID
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {result.error || 'The certificate ID you entered was not found in our registry database. Please check the spelling and ID code structure.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
