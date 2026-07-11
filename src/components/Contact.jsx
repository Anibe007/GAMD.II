import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, X } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    const data = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    
    // Save to localStorage
    const savedMessages = localStorage.getItem('gandu_david_gama_messages');
    const messagesList = savedMessages ? JSON.parse(savedMessages) : [];
    const updatedMessages = [data, ...messagesList];
    localStorage.setItem('gandu_david_gama_messages', JSON.stringify(updatedMessages));

    setSubmittedData(data);
    setShowModal(true);

    // Clear form
    setName('');
    setMail('');
    setSubject('');
    setMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmittedData(null);
  };

  const emailLink = submittedData
    ? `mailto:davidgandu2@outlook.com?subject=${encodeURIComponent(submittedData.subject)}&body=${encodeURIComponent(
        `Name: ${submittedData.name}\nEmail: ${submittedData.email}\n\nMessage:\n${submittedData.message}`
      )}`
    : '#';

  const whatsappLink = submittedData
    ? `https://wa.me/2349036220343?text=${encodeURIComponent(
        `Hello David,\n\nMy name is ${submittedData.name} (${submittedData.email}).\n\n*Subject:* ${submittedData.subject}\n\n*Message:* ${submittedData.message}`
      )}`
    : '#';

  return (
    <section id="contact" style={{ backgroundColor: '#07090e', padding: '80px 0', borderTop: '1px solid rgba(194, 159, 93, 0.05)' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Let's discuss your upcoming visual production. Reach out to start collaborating!
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}
          className="contact-wrapper"
        >
          {/* Left Block: Message Form */}
          <div style={{ flex: '1.4 1 450px' }} className="glass-panel">
            <div style={{ padding: '40px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '1px',
                  color: '#ffffff',
                  marginBottom: '10px'
                }}
              >
                Get In Touch
              </h3>
              <p
                style={{
                  color: 'var(--text-dark-secondary)',
                  fontSize: '0.95rem',
                  marginBottom: '30px'
                }}
              >
                Let's Create Something Amazing Together.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'rgba(15, 20, 32, 0.4)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '6px',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                    />
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setMail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'rgba(15, 20, 32, 0.4)',
                        border: '1px solid var(--border-dark)',
                        borderRadius: '6px',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      outline: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>

                <div>
                  <textarea
                    required
                    placeholder="Your Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{
                    padding: '14px',
                    fontSize: '0.9rem',
                    gap: '10px'
                  }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Block: Contact Info */}
          <div style={{ flex: '1 1 300px' }} className="glass-panel">
            <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '30px' }}>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    color: '#ffffff',
                    marginBottom: '24px'
                  }}
                >
                  Contact Info
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Email */}
                  <a
                    href="mailto:davidgandu2@outlook.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      color: 'var(--text-dark-secondary)',
                      textDecoration: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dark-secondary)'}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(15, 20, 32, 0.4)'
                      }}
                    >
                      <Mail size={18} style={{ color: 'var(--gold-primary)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-primary)' }}>Email Me</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>davidgandu2@outlook.com</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:09036220343"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      color: 'var(--text-dark-secondary)',
                      textDecoration: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dark-secondary)'}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(15, 20, 32, 0.4)'
                      }}
                    >
                      <Phone size={18} style={{ color: 'var(--gold-primary)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-primary)' }}>Call Me</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>09036220343</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <h4
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--gold-primary)',
                    marginBottom: '16px',
                    fontWeight: 600
                  }}
                >
                  Follow Me
                </h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/gamad.ii?igsh=MTdzcDl5M2FyOXYwbw=="
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E1306C' }}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/qr/XSBBOETWBAFBK1"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#25D366' }}>
                      <path d="M12.012 2C6.48 2 2.01 6.47 2.01 12c0 1.91.53 3.69 1.46 5.25L2.03 22l4.89-1.28c1.51.81 3.23 1.28 5.09 1.28 5.53 0 10-4.47 10-10S17.54 2 12.012 2zm6.27 13.9c-.27.76-1.36 1.39-2.17 1.49-.54.07-1.24.11-3.64-.88-3.07-1.27-5.06-4.39-5.21-4.59-.15-.2-1.21-1.61-1.21-3.08 0-1.47.76-2.19 1.03-2.48.27-.29.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.53.27.65.9 2.19.98 2.35.08.16.14.35.03.56-.11.21-.24.35-.41.55-.17.2-.36.45-.52.6-.18.17-.37.36-.16.72.21.36.93 1.53 2.0 2.48 1.38 1.23 2.54 1.61 2.9 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.02 1.01 2.37 1.18.35.17.58.26.67.4.09.15.09.84-.18 1.6z"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@gamad.ii?_r=1&_t=ZS-97HcGWRRKOQ"
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#00f2fe' }}>
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.2 2.27 2.05 3.73 2.45v3.9c-1.46-.07-2.91-.57-4.14-1.39-.77-.52-1.43-1.19-1.93-1.98v7.2c-.04 1.43-.45 2.84-1.2 4.05-1.5 2.42-4.19 3.9-7.07 3.74-2.88-.16-5.5-1.92-6.57-4.62-1.07-2.7-.42-5.83 1.62-7.85 2.04-2.02 5.17-2.67 7.87-1.6v3.77c-1.35-.45-2.82-.16-3.92.76-.73.61-1.19 1.49-1.28 2.44-.14 1.48.81 2.87 2.27 3.23 1.46.36 3.02-.37 3.59-1.74.15-.36.21-.74.2-1.13v-14.4c.03-.02.05-.03.08-.05z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submit Success Modal */}
        {showModal && submittedData && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(7, 9, 14, 0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '24px',
              animation: 'fadeInUp 0.3s forwards ease-out',
            }}
            onClick={handleCloseModal}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '40px',
                position: 'relative',
                textAlign: 'center',
                border: '1px solid var(--gold-primary)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dark-secondary)',
                  cursor: 'pointer',
                }}
              >
                <X size={24} />
              </button>

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                }}
              >
                <CheckCircle size={36} style={{ color: '#25d366' }} />
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '1px'
                }}
              >
                Message Sent!
              </h4>
              
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}
              >
                Thank you, <strong>{submittedData.name}</strong>. Your message has been received successfully. David will get back to you at <strong>{submittedData.email}</strong> shortly.
              </p>

              {/* Submitted Details Box */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 9, 14, 0.5)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: 'var(--text-dark-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--gold-primary)' }}>Subject:</strong> {submittedData.subject}
                </div>
                <div>
                  <strong style={{ color: 'var(--gold-primary)' }}>Message:</strong> "{submittedData.message}"
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                  style={{
                    backgroundColor: '#25D366',
                    backgroundImage: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)'
                  }}
                >
                  {/* WhatsApp Icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ transform: 'translateY(1px)' }}>
                    <path d="M12.012 2C6.48 2 2.01 6.47 2.01 12c0 1.91.53 3.69 1.46 5.25L2.03 22l4.89-1.28c1.51.81 3.23 1.28 5.09 1.28 5.53 0 10-4.47 10-10S17.54 2 12.012 2zm6.27 13.9c-.27.76-1.36 1.39-2.17 1.49-.54.07-1.24.11-3.64-.88-3.07-1.27-5.06-4.39-5.21-4.59-.15-.2-1.21-1.61-1.21-3.08 0-1.47.76-2.19 1.03-2.48.27-.29.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.53.27.65.9 2.19.98 2.35.08.16.14.35.03.56-.11.21-.24.35-.41.55-.17.2-.36.45-.52.6-.18.17-.37.36-.16.72.21.36.93 1.53 2.0 2.48 1.38 1.23 2.54 1.61 2.9 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.02 1.01 2.37 1.18.35.17.58.26.67.4.09.15.09.84-.18 1.6z"/>
                  </svg>
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={emailLink}
                  className="btn-gold"
                  style={{
                    backgroundColor: 'rgba(15, 20, 32, 0.6)',
                    backgroundImage: 'none',
                    border: '1px solid var(--border-dark)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--gold-primary)' }} />
                  <span>Send via Email</span>
                </a>
              </div>

              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: '20px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dark-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  fontWeight: 500
                }}
              >
                Close and return to portfolio
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .social-btn:hover {
          border-color: var(--gold-primary) !important;
          background-color: rgba(194, 159, 93, 0.05) !important;
          transform: translateY(-3px);
        }
        @media (max-width: 991px) {
          .contact-wrapper {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
