import React from 'react';
import { Camera } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        backgroundColor: '#05070a',
        padding: '50px 0',
        borderTop: '1px solid rgba(194, 159, 93, 0.05)',
        textAlign: 'center'
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Brand Icon */}
        <a
          href="#home"
          onClick={handleScrollToTop}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(194, 159, 93, 0.2)',
            backgroundColor: 'rgba(7, 9, 14, 0.4)',
            transition: 'var(--transition-smooth)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold-primary)';
            e.currentTarget.style.boxShadow = '0 0 15px var(--gold-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(194, 159, 93, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Camera size={18} style={{ color: 'var(--gold-primary)' }} />
        </a>

        {/* Text */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-dark-secondary)',
            fontSize: '0.85rem',
            letterSpacing: '1px',
            margin: 0
          }}
        >
          © {currentYear} GAMAD.II / GANDU DAVID GAMA. ALL RIGHTS RESERVED.
        </p>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'rgba(255, 255, 255, 0.2)',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              margin: 0
            }}
          >
            CINEMATIC VIDEOGRAPHY & PHOTOGRAPHY PORTFOLIO
          </p>
          {/* <span style={{ color: 'rgba(255, 255, 255, 0.1)', fontSize: '0.75rem' }}>|</span>
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--gold-hover)';
              e.currentTarget.style.textShadow = '0 0 8px var(--gold-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--gold-primary)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Manage Site
          </button> */}
        </div>
      </div>
    </footer>
  );
}
