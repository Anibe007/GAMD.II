import React, { useState, useEffect } from 'react';
import { Play, X, ExternalLink } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';

export default function PortfolioGrid() {
  const [items, setItems] = useState([]);
  const [activeVideoFilter, setActiveVideoFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  // Helper to format YouTube and Google Drive embed links for autoplay
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

  // Separate videos and photos
  const allVideos = items.filter(item => item.type === 'video');
  const allPhotos = items.filter(item => item.type === 'image' || item.type === 'photography');

  // Widescreen vs Vertical Videos
  const widescreenVideos = allVideos.filter(item => item.aspectRatio !== '9/16');
  const verticalVideos = allVideos.filter(item => item.aspectRatio === '9/16');

  // Video sub-filters
  const videoFilters = [
    { name: 'All Videos', id: 'all' },
    { name: 'Cinematic Widescreen (16:9)', id: 'widescreen' },
    { name: 'Vertical Reels & Promos (9:16)', id: 'vertical' },
  ];

  return (
    <div style={{ backgroundColor: '#07090e' }}>
      
      {/* -------------------- VIDEO GALLERY SECTION -------------------- */}
      <section id="video-gallery" style={{ padding: '80px 0', borderTop: '1px solid rgba(194, 159, 93, 0.05)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Video Gallery</h2>
            <p className="section-subtitle">
              Cinematic storytelling, campaign promotions, and elegant vertical pre-wedding reels.
            </p>
          </div>

          {/* Video Sub-Filter Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '45px',
              flexWrap: 'wrap',
            }}
          >
            {videoFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveVideoFilter(filter.id)}
                style={{
                  background: activeVideoFilter === filter.id ? 'var(--gold-gradient)' : 'rgba(15, 20, 32, 0.4)',
                  color: activeVideoFilter === filter.id ? '#07090e' : 'var(--text-dark-secondary)',
                  border: activeVideoFilter === filter.id ? '1px solid transparent' : '1px solid var(--border-dark)',
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
                  if (activeVideoFilter !== filter.id) {
                    e.target.style.borderColor = 'var(--gold-primary)';
                    e.target.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeVideoFilter !== filter.id) {
                    e.target.style.borderColor = 'var(--border-dark)';
                    e.target.style.color = 'var(--text-dark-secondary)';
                  }
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* WIDESCREEN SECTION */}
          {(activeVideoFilter === 'all' || activeVideoFilter === 'widescreen') && widescreenVideos.length > 0 && (
            <div style={{ marginBottom: activeVideoFilter === 'all' ? '60px' : '0' }}>
              {activeVideoFilter === 'all' && (
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    borderLeft: '3px solid var(--gold-primary)',
                    paddingLeft: '12px',
                  }}
                >
                  Cinematic Widescreen Films
                </h3>
              )}
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '24px',
                }}
              >
                {widescreenVideos.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      aspectRatio: '16/9',
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
                        <Play size={20} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '2px' }} />
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.15rem',
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
                          fontSize: '0.75rem',
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
            </div>
          )}

          {/* VERTICAL SECTION */}
          {(activeVideoFilter === 'all' || activeVideoFilter === 'vertical') && verticalVideos.length > 0 && (
            <div>
              {activeVideoFilter === 'all' && (
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    borderLeft: '3px solid var(--gold-primary)',
                    paddingLeft: '12px',
                    marginTop: '40px',
                  }}
                >
                  Vertical Reels & Social Promos
                </h3>
              )}
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '24px',
                }}
              >
                {verticalVideos.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      aspectRatio: '9/16',
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
                        padding: '16px',
                        textAlign: 'center',
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          border: '1px solid var(--gold-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(194, 159, 93, 0.05)',
                          marginBottom: '12px',
                          boxShadow: '0 0 10px var(--gold-glow)',
                        }}
                      >
                        <Play size={16} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '2px' }} />
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem',
                          color: '#ffffff',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          lineHeight: '1.4',
                          marginBottom: '6px',
                        }}
                      >
                        {item.title}
                      </h3>
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
            </div>
          )}
        </div>
      </section>

      {/* -------------------- PHOTO GALLERY SECTION -------------------- */}
      <section id="photo-gallery" style={{ padding: '80px 0', backgroundColor: '#090c13', borderTop: '1px solid rgba(194, 159, 93, 0.05)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Photo Gallery</h2>
            <p className="section-subtitle">
              Elegant portraitures, golden hour editorial studies, and creative wilderness captures.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {allPhotos.map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  aspectRatio: '1', // Sleek square formatting
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
                    <ExternalLink size={20} style={{ color: 'var(--gold-primary)' }} />
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
        </div>
      </section>

      {/* -------------------- DYNAMIC LIGHTBOX MODAL -------------------- */}
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
              maxWidth: selectedItem.type === 'video' && selectedItem.aspectRatio === '9/16' ? '420px' : '960px',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(194, 159, 93, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            {selectedItem.type === 'video' ? (
              selectedItem.aspectRatio === '9/16' ? (
                /* Vertical Video Player Container */
                <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', backgroundColor: '#000000' }}>
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
  );
}
