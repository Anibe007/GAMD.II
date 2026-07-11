import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { showreelVideo } from '../data/portfolioData';

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Helper to append autoplay and other premium embed settings
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
            maxWidth: '900px',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(194, 159, 93, 0.15)',
          }}
        >
          {/* Aspect Ratio Box (16:9) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%', // 16:9 Aspect Ratio
              backgroundColor: '#000000',
            }}
          >
            {!isPlaying ? (
              // Video Thumbnail & Play Button Overlay
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  backgroundImage: `linear-gradient(rgba(7, 9, 14, 0.4), rgba(7, 9, 14, 0.4)), url("${showreelVideo.thumbnail}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.5s ease',
                }}
                onClick={() => setIsPlaying(true)}
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
            ) : (
              showreelVideo.source.toLowerCase().endsWith('.mp4') ? (
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
                      href={showreelVideo.source}
                      download
                      className="btn-gold"
                      style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                    >
                      Download & Play Locally
                    </a>
                  </div>
                ) : (
                  <video
                    src={showreelVideo.source}
                    controls
                    autoPlay
                    onError={() => setVideoError(true)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )
              ) : (
                <iframe
                  title={showreelVideo.title}
                  src={getEmbedUrl(showreelVideo.source)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
