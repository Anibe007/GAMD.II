import React, { useState, useEffect } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';

export default function PortfolioGrid() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [videoError, setVideoError] = useState(false);

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

  const filters = [
    { name: 'All', id: 'all' },
    { name: 'Videography', id: 'videography' },
    { name: 'Video Editing', id: 'video-editing' },
    { name: 'Photography', id: 'photography' },
  ];

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
    setVideoError(false);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    setVideoError(false);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  // Helper to format YouTube and Google Drive embed links for autoplay
  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const connector = url.includes('?') ? '&' : '?';
      return `${url}${connector}autoplay=1&rel=0`;
    }
    if (url.includes('drive.google.com')) {
      const connector = url.includes('?') ? '&' : '?';
      return `${url}${connector}autoplay=1`;
    }
    return url;
  };

  return (
    <section id="portfolio" style={{ backgroundColor: '#07090e', padding: '80px 0', borderTop: '1px solid rgba(194, 159, 93, 0.05)' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            A showcase of recent cinematic assignments, brand promotions, and photographic editorial features.
          </p>
        </div>

        {/* Filter Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '45px',
            flexWrap: 'wrap',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                background: activeFilter === filter.id ? 'var(--gold-gradient)' : 'rgba(15, 20, 32, 0.4)',
                color: activeFilter === filter.id ? '#07090e' : 'var(--text-dark-secondary)',
                border: activeFilter === filter.id ? '1px solid transparent' : '1px solid var(--border-dark)',
                padding: '10px 24px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.id) {
                  e.target.style.borderColor = 'var(--gold-primary)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.id) {
                  e.target.style.borderColor = 'var(--border-dark)';
                  e.target.style.color = 'var(--text-dark-secondary)';
                }
              }}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Portfolio Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer',
                aspectRatio: '16/10',
                border: '1px solid rgba(194, 159, 93, 0.1)',
                transition: 'var(--transition-smooth)',
              }}
              onClick={() => handleOpenLightbox(item)}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.item-overlay');
                const img = e.currentTarget.querySelector('.item-thumb');
                if (overlay) overlay.style.opacity = '1';
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.item-overlay');
                const img = e.currentTarget.querySelector('.item-thumb');
                if (overlay) overlay.style.opacity = '0';
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Thumbnail */}
              {item.type === 'video' ? (
                <video
                  className="item-thumb"
                  src={item.source}
                  muted
                  loop
                  playsInline
                  autoPlay
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ) : (
                <img
                  className="item-thumb"
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              )}

              {/* Hover Overlay */}
              <div
                className="item-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(7, 9, 14, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'var(--transition-smooth)',
                  padding: '20px',
                  textAlign: 'center',
                  zIndex: 2,
                }}
              >
                {/* Visual Indicator (Play Icon or View Image) */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '1px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(194, 159, 93, 0.05)',
                    marginBottom: '16px',
                    boxShadow: '0 0 15px var(--gold-glow)',
                  }}
                >
                  {item.type === 'video' ? (
                    <Play size={20} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '2px' }} />
                  ) : (
                    <ExternalLink size={20} style={{ color: 'var(--gold-primary)' }} />
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    marginBottom: '6px',
                  }}
                >
                  {item.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--gold-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 500,
                  }}
                >
                  {item.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
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
                maxWidth: '960px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              {selectedItem.type === 'video' ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  {selectedItem.source.toLowerCase().endsWith('.mp4') ? (
                    videoError ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#121620',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '24px',
                          textAlign: 'center',
                          color: '#ffffff',
                          gap: '12px',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark-secondary)', lineHeight: '1.5' }}>
                          This video codec/format (e.g., HEVC/H.265 from iPhone) is not natively supported by your browser.
                        </p>
                        <a
                          href={selectedItem.source}
                          download
                          className="btn-gold"
                          style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                        >
                          Download & Play Locally
                        </a>
                      </div>
                    ) : (
                      <video
                        src={selectedItem.source}
                        controls
                        autoPlay
                        onError={() => setVideoError(true)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#000000',
                        }}
                      />
                    )
                  ) : (
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
                  )}
                </div>
              ) : (
                <img
                  src={selectedItem.source}
                  alt={selectedItem.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              )}

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
      </div>
    </section>
  );
}
