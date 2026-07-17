import { useState, useEffect } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';

// Always use canonical portfolioData for local photos to avoid stale localStorage paths.
// Only videos (which may have custom YouTube URLs) are read from localStorage.
const mergePortfolioItems = (saved) => {
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

export default function PortfolioGrid({ onOpenLightbox }) {
  const [items, setItems] = useState(() =>
    mergePortfolioItems(localStorage.getItem('gandu_david_gama_portfolio'))
  );
  const [activeVideoFilter, setActiveVideoFilter] = useState('all');

  useEffect(() => {
    const handleUpdated = () => {
      setItems(mergePortfolioItems(localStorage.getItem('gandu_david_gama_portfolio')));
    };
    window.addEventListener('portfolioUpdated', handleUpdated);
    window.addEventListener('storage', handleUpdated);
    return () => {
      window.removeEventListener('portfolioUpdated', handleUpdated);
      window.removeEventListener('storage', handleUpdated);
    };
  }, []);


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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                  gap: '24px',
                }}
              >
                {widescreenVideos.map((item) => (
                  <div
                    key={item.id}
                    className="portfolio-card ratio-16-9"
                    onClick={() => onOpenLightbox(item)}
                  >
                    <div className="card-sizer" />
                    <img
                      className="item-thumb"
                      src={item.thumbnail}
                      alt={item.title}
                    />

                    {/* Hover Overlay */}
                    <div className="item-overlay">
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                  gap: '24px',
                }}
              >
                {verticalVideos.map((item) => (
                  <div
                    key={item.id}
                    className="portfolio-card ratio-9-16"
                    onClick={() => onOpenLightbox(item)}
                  >
                    <div className="card-sizer" />
                    <img
                      className="item-thumb"
                      src={item.thumbnail}
                      alt={item.title}
                    />

                    {/* Hover Overlay */}
                    <div className="item-overlay">
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: '24px',
            }}
          >
            {allPhotos.map((item) => (
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

                {/* Hover Overlay */}
                <div className="item-overlay">
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

    </div>
  );
}
