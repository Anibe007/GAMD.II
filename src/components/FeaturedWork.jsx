import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';

export default function FeaturedWork() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('gandu_david_gama_portfolio');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return portfolioItems;
  });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleUpdated = () => {
      const saved = localStorage.getItem('gandu_david_gama_portfolio');
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener('portfolioUpdated', handleUpdated);
    window.addEventListener('storage', handleUpdated);
    return () => {
      window.removeEventListener('portfolioUpdated', handleUpdated);
      window.removeEventListener('storage', handleUpdated);
    };
  }, []);

  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const connector = url.includes('?') ? '&' : '?';
      return `${url}${connector}autoplay=1&rel=0&modestbranding=1`;
    }
    if (url.includes('drive.google.com')) {
      const connector = url.includes('?') ? '&' : '?';
      return `${url}${connector}autoplay=1`;
    }
    return url;
  };

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
              className="portfolio-card"
              style={{
                aspectRatio: '1',
              }}
              onClick={() => handleOpenLightbox(item)}
            >
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
                  <Play size={20} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '2px' }} />
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

      {/* Lightbox Modal for Featured Work Playback */}
      {selectedItem && (
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
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 10000,
            }}
          >
            <X size={32} />
          </button>

          {/* Modal Container */}
          <div
            style={{
              width: '100%',
              maxWidth: selectedItem.type === 'video' && selectedItem.aspectRatio === '9/16' ? '400px' : '960px',
              maxHeight: '95vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(194, 159, 93, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {selectedItem.type === 'video' ? (
                selectedItem.aspectRatio === '9/16' ? (
                  /* Vertical Video Player Container */
                  <div style={{ width: '100%', aspectRatio: '9/16', maxHeight: '70vh', backgroundColor: '#000000', position: 'relative' }}>
                    <iframe
                      title={selectedItem.title}
                      src={getEmbedUrl(selectedItem.source)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  /* Widescreen Video Player Container (16:9) */
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
                    <iframe
                      title={selectedItem.title}
                      src={getEmbedUrl(selectedItem.source)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )
              ) : (
                /* Image Lightbox */
                <img
                  src={selectedItem.source}
                  alt={selectedItem.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              )}
            </div>

            {/* Title Overlay in Modal */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: '#07090e',
                borderTop: '1px solid rgba(194, 159, 93, 0.15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                  {selectedItem.title}
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {selectedItem.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
