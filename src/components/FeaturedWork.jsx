import React, { useState, useEffect } from 'react';
import { portfolioItems } from '../data/portfolioData';

export default function FeaturedWork() {
  const [items, setItems] = useState([]);

  const loadItems = () => {
    const saved = localStorage.getItem('gandu_david_gama_portfolio');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(portfolioItems);
      localStorage.setItem('gandu_david_gama_portfolio', JSON.stringify(portfolioItems));
    }
  };

  useEffect(() => {
    loadItems();
    window.addEventListener('portfolioUpdated', loadItems);
    window.addEventListener('storage', loadItems);
    return () => {
      window.removeEventListener('portfolioUpdated', loadItems);
      window.removeEventListener('storage', loadItems);
    };
  }, []);

  // Take first 4 items for featured showcase
  const featured = items.slice(0, 4);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="featured-work" style={{ backgroundColor: '#07090e', padding: '80px 0' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            A glance at some of our favorite recent project highlights.
          </p>
        </div>

        {/* 4-Column Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                aspectRatio: '1',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              {item.type === 'video' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(7, 9, 14, 0.25)',
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(7, 9, 14, 0.8)',
                      border: '1px solid var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px var(--gold-glow)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--gold-primary)" stroke="var(--gold-primary)">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Block */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(194, 159, 93, 0.2)',
            background: 'linear-gradient(to right, rgba(15, 20, 32, 0.8), rgba(7, 9, 14, 0.9))',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              color: '#ffffff',
              letterSpacing: '1px',
              marginBottom: '12px',
            }}
          >
            Ready to Work Together?
          </h3>
          <p
            style={{
              color: 'var(--text-dark-secondary)',
              fontSize: '1rem',
              maxWidth: '500px',
              margin: '0 auto 24px auto',
            }}
          >
            Let's turn your creative goals into high-end cinematic reality. Book a consultation today.
          </p>
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="btn-gold"
            style={{ padding: '14px 36px' }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
