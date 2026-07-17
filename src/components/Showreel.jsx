import { Play } from 'lucide-react';
import { showreelVideo } from '../data/portfolioData';

export default function Showreel({ onOpenLightbox }) {
  return (
    <section id="showreel" style={{ backgroundColor: '#07090e', padding: '60px 0' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Showreel</h2>
          <p className="section-subtitle">
            A curated selection of cinematic visual stories, highlights, and emotional moments.
          </p>
        </div>

        <div
          className="glass-panel"
          style={{
            maxWidth: showreelVideo.aspectRatio === '9/16' ? '420px' : '900px',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(194, 159, 93, 0.15)',
            cursor: 'pointer',
          }}
          onClick={() => onOpenLightbox({ ...showreelVideo, type: 'video' })}
        >
          {/* Aspect Ratio Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: showreelVideo.aspectRatio === '9/16' ? '177.77%' : '56.25%', // 9:16 or 16:9 Aspect Ratio
              backgroundColor: '#000000',
            }}
          >
            {/* Video Thumbnail & Play Button Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(7, 9, 14, 0.4), rgba(7, 9, 14, 0.4)), url("${showreelVideo.thumbnail}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget.querySelector('.play-btn');
                if (btn) btn.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget.querySelector('.play-btn');
                if (btn) btn.style.transform = 'scale(1)';
              }}
            >
              {/* Play Button Circle */}
              <div
                className="play-btn"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(7, 9, 14, 0.8)',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-smooth)',
                  boxShadow: '0 0 30px var(--gold-glow)',
                  zIndex: 2,
                }}
              >
                <Play size={32} style={{ color: 'var(--gold-primary)', fill: 'var(--gold-primary)', marginLeft: '4px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
