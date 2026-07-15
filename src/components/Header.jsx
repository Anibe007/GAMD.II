import React, { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Videos', href: '#video-gallery' },
    { name: 'Photos', href: '#photo-gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(7, 9, 14, 0.85)' : 'rgba(7, 9, 14, 0.4)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid rgba(194, 159, 93, 0.1)' : '1px solid transparent',
        transition: 'var(--transition-smooth)',
        padding: isScrolled ? '15px 0' : '22px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/logo_gamad.jpg"
            alt="GAMAD.II Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid var(--gold-primary)',
              boxShadow: '0 0 10px var(--gold-glow)'
            }}
          />
          <span>GAMAD.II</span>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <ul
            style={{
              display: 'flex',
              gap: '28px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    color: 'var(--text-dark-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-dark-secondary)';
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="btn-gold desktop-btn"
            style={{ padding: '10px 20px', fontSize: '0.75rem' }}
          >
            Book Me
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#07090e',
            borderBottom: '1px solid var(--border-dark)',
            padding: '24px',
            animation: 'fadeInUp 0.3s forwards ease-out',
          }}
        >
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              listStyle: 'none',
              margin: '0 0 20px 0',
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="btn-gold"
            style={{ width: '100%', display: 'block', textAlign: 'center' }}
          >
            Book Me
          </a>
        </div>
      )}

      {/* Inject custom media queries directly via a style tag for ease of development in vanilla React */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu, .desktop-btn {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
