import React, { useState, useEffect } from 'react';

export default function Hero() {
  const typingTexts = ['Your Vision', 'Your Story', 'Your Moments', 'Visual Emotions'];
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = typingTexts[textIndex];
    
    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    }

    // Handle switching states
    if (!isDeleting && charIndex === fullText.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex(prev => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom, rgba(7, 9, 14, 0.4), rgba(7, 9, 14, 0.95)), url("/images/canon-camera.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center',
        padding: '120px 0 80px 0',
      }}
    >
      <div className="container" style={{ zIndex: 1 }}>
        <div className="fade-in-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Logo overlay on Hero */}
          <img
            src="/images/logo_gamad.jpg"
            alt="GAMAD.II Logo"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--gold-primary)',
              boxShadow: '0 0 20px var(--gold-glow)',
              marginBottom: '24px',
              animation: 'fadeInUp 1s ease-out'
            }}
          />

          <span
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Professional Creative Studio
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            Cinematic Videography,<br />
            Photography & Video Editing
          </h1>

          <h2
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: '#ffffff',
              fontWeight: 300,
              marginBottom: '40px',
              fontFamily: 'var(--font-sans)',
              minHeight: '40px',
            }}
          >
            Capturing <span className="typing-cursor" style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>{currentText}</span>
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, '#portfolio')}
              className="btn-gold"
              style={{ padding: '16px 36px', fontSize: '0.9rem' }}
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="btn-outline"
              style={{ padding: '16px 36px', fontSize: '0.9rem' }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay at bottom of hero */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to top, #07090e, transparent)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
