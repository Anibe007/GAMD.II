import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';

// Always use canonical portfolioData for local photos to avoid stale localStorage paths.
const mergeFeaturedItems = (saved) => {
  const canonicalPhotos = portfolioItems.filter(
    (p) => p.type === 'image' || p.type === 'photography'
  );
  if (!saved) return portfolioItems;
  try {
    const parsed = JSON.parse(saved);
    const customVideos = parsed.filter((item) => item.type === 'video');
    return [...customVideos, ...canonicalPhotos];
  } catch (e) {
    return portfolioItems;
  }
};

export default function FeaturedWork({ onOpenLightbox }) {
  const [items, setItems] = useState(() =>
    mergeFeaturedItems(localStorage.getItem('gandu_david_gama_portfolio'))
  );

  useEffect(() => {
    const handleUpdated = () => {
      setItems(mergeFeaturedItems(localStorage.getItem('gandu_david_gama_portfolio')));
    };
    window.addEventListener('portfolioUpdated', handleUpdated);
    window.addEventListener('storage', handleUpdated);
    return () => {
      window.removeEventListener('portfolioUpdated', handleUpdated);
      window.removeEventListener('storage', handleUpdated);
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

        {/* 4-Column Grid with CSS Hover Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              className="portfolio-card ratio-1-1"
              onClick={() => onOpenLightbox(item)}
            >
              <div className="card-sizer" />
              <img
                className="item-thumb"
                src={item.thumbnail}
                alt={item.title}
              />

              {/* Hover Overlay / Indicator */}
              <div className="item-overlay">
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
                    marginBottom: '12px'
                  }}
                >
                  <Play size={20} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '4px' }} />
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    lineHeight: '1.4',
                    marginBottom: '4px',
                    padding: '0 10px'
                  }}
                >
                  {item.title}
                </h4>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontWeight: 500,
                  }}
                >
                  {item.category.replace('-', ' ')}
                </span>
              </div>
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
