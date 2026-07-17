import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import Services from './components/Services';
import FeaturedWork from './components/FeaturedWork';
import PortfolioGrid from './components/PortfolioGrid';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { portfolioItems } from './data/portfolioData';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);

  const handleOpenLightbox = (item) => {
    setSelectedLightboxItem(item);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setSelectedLightboxItem(null);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = 'auto';
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
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

  useEffect(() => {
    // Migration for old review names to Nigerian names
    const savedReviews = localStorage.getItem('gandu_david_gama_reviews');
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        let changed = false;
        const updated = parsed.map(r => {
          if (r.name === "Sophia Loren") { r.name = "Amina Bello"; changed = true; }
          if (r.name === "Marcus Vance") { r.name = "Chinedu Okafor"; changed = true; }
          if (r.name === "Elena Rostova") { r.name = "Chioma Adebayo"; changed = true; }
          return r;
        });
        if (changed) {
          localStorage.setItem('gandu_david_gama_reviews', JSON.stringify(updated));
          window.dispatchEvent(new Event('reviewsUpdated'));
        }
      } catch (e) {
        console.error("Reviews migration error", e);
      }
    }

    // Migration for old portfolio items to include the new YouTube embeds and separate galleries
    const savedPortfolio = localStorage.getItem('gandu_david_gama_portfolio');
    if (savedPortfolio) {
      try {
        const parsed = JSON.parse(savedPortfolio);
        let changed = false;
        
        // Upgrade any default video items or local videos to the new YouTube embeds
        let updated = parsed.map(item => {
          // Ensure local images always use an absolute /images/ path
          if (item.thumbnail && item.thumbnail.startsWith('images/')) {
            item.thumbnail = '/' + item.thumbnail;
            changed = true;
          }
          if (item.source && item.source.startsWith('images/')) {
            item.source = '/' + item.source;
            changed = true;
          }

          // Force-refresh all photo items from canonical source to get correct paths
          if (item.type === 'image' || item.type === 'photography') {
            const canonical = portfolioItems.find(p => p.id === item.id);
            if (canonical) {
              changed = true;
              return canonical;
            }
          }

          if (
            (item.type === 'video' && (item.source.toLowerCase().endsWith('.mp4') || item.source.includes('/Videos/'))) ||
            [1, 2, 3, 4].includes(item.id)
          ) {
            const replacement = portfolioItems.find(p => p.id === item.id);
            if (replacement) {
              changed = true;
              return replacement;
            }
          }
          return item;
        });

        // Migrate item 5 (which was a default portrait session photo, but is now "Their Journey to Forever" video)
        const journeyToForever = portfolioItems.find(p => p.id === 5);
        if (journeyToForever) {
          const item5Index = updated.findIndex(item => item.id === 5);
          if (item5Index !== -1 && updated[item5Index].type !== 'video') {
            updated[item5Index] = journeyToForever;
            changed = true;
          } else if (item5Index === -1 && !updated.some(item => item.title.includes("Journey to Forever"))) {
            updated.unshift(journeyToForever);
            changed = true;
          }
        }

        // Ensure all default new YouTube videos are present
        portfolioItems.filter(p => p.type === 'video').forEach(defaultVid => {
          if (!updated.some(item => item.id === defaultVid.id)) {
            updated.unshift(defaultVid);
            changed = true;
          }
        });

        // Filter out any duplicates if they arose
        const uniqueIds = new Set();
        const deduplicated = [];
        updated.forEach(item => {
          if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            deduplicated.push(item);
          } else {
            changed = true;
          }
        });
        updated = deduplicated;

        if (changed) {
          localStorage.setItem('gandu_david_gama_portfolio', JSON.stringify(updated));
          window.dispatchEvent(new Event('portfolioUpdated'));
        }
      } catch (e) {
        console.error("Portfolio migration error", e);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.02, // Lowered from 0.1 to 0.02 to ensure extremely tall sections (like mobile stacks) trigger reliably
        rootMargin: '0px 0px -20px 0px', // Adjusted offset for better mobile responsiveness
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Bulletproof Fallback: Ensure all sections are revealed after 1.5 seconds 
    // even if IntersectionObserver calculations fail or are delayed.
    const fallbackTimer = setTimeout(() => {
      revealElements.forEach((el) => {
        if (!el.classList.contains('active')) {
          el.classList.add('active');
        }
      });
    }, 1500);

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#07090e', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Header />

      {/* Hero Intro */}
      <Hero />

      {/* Main Sections (with scroll reveal effects) */}
      <main style={{ flexGrow: 1 }}>
        <div className="reveal-section reveal-element">
          <Showreel onOpenLightbox={handleOpenLightbox} />
        </div>

        <div className="reveal-section reveal-element">
          <Services />
        </div>

        <div className="reveal-section reveal-element">
          <FeaturedWork onOpenLightbox={handleOpenLightbox} />
        </div>

        <div className="reveal-section reveal-element">
          <PortfolioGrid onOpenLightbox={handleOpenLightbox} />
        </div>

        <div className="reveal-section reveal-element">
          <About />
        </div>

        <div className="reveal-section reveal-element">
          <Reviews />
        </div>

        <div className="reveal-section reveal-element">
          <Contact />
        </div>
      </main>

      {/* Footer copyright */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Dashboard Control Panel */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/qr/XSBBOETWBAFBK1"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floating"
        aria-label="Contact Gandu David Gama on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          style={{ transform: 'translateY(1px)' }}
        >
          <path d="M12.012 2C6.48 2 2.01 6.47 2.01 12c0 1.91.53 3.69 1.46 5.25L2.03 22l4.89-1.28c1.51.81 3.23 1.28 5.09 1.28 5.53 0 10-4.47 10-10S17.54 2 12.012 2zm6.27 13.9c-.27.76-1.36 1.39-2.17 1.49-.54.07-1.24.11-3.64-.88-3.07-1.27-5.06-4.39-5.21-4.59-.15-.2-1.21-1.61-1.21-3.08 0-1.47.76-2.19 1.03-2.48.27-.29.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.69.53.27.65.9 2.19.98 2.35.08.16.14.35.03.56-.11.21-.24.35-.41.55-.17.2-.36.45-.52.6-.18.17-.37.36-.16.72.21.36.93 1.53 2.0 2.48 1.38 1.23 2.54 1.61 2.9 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.02 1.01 2.37 1.18.35.17.58.26.67.4.09.15.09.84-.18 1.6z" />
        </svg>
      </a>

      {/* GLOBAL FULL-SCREEN VIDEO/IMAGE LIGHTBOX MODAL */}
      {selectedLightboxItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(5, 7, 12, 0.85)', // Premium transparent dark overlay
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999, // Ensure it sits on top of all fixed elements/reveal blocks
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
              background: 'rgba(7, 9, 14, 0.8)',
              border: '1px solid var(--gold-primary)',
              color: '#ffffff',
              borderRadius: '50%',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1000000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px var(--gold-glow)',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <X size={28} />
          </button>

          {/* Modal Container */}
          <div
            style={{
              width: selectedLightboxItem.type === 'video' && selectedLightboxItem.aspectRatio === '9/16' ? 'auto' : '100%',
              maxWidth: selectedLightboxItem.type === 'video' && selectedLightboxItem.aspectRatio === '9/16' ? 'calc(min(75vh, 680px) * 9 / 16)' : '1100px',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(194, 159, 93, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking the video card itself
          >
            {selectedLightboxItem.type === 'video' && selectedLightboxItem.aspectRatio === '9/16' ? (
              /* Height-first 9:16 aspect sizer — guarantees controls are never clipped on viewport height limits */
              <div className="lb-video-9-16">
                <iframe
                  title={selectedLightboxItem.title}
                  src={getEmbedUrl(selectedLightboxItem.source)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              /* 16:9 widescreen or 1:1 image */
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: selectedLightboxItem.type === 'video' ? '56.25%' : '100%',
                  backgroundColor: '#000000',
                }}
              >
                {selectedLightboxItem.type === 'video' ? (
                  selectedLightboxItem.source.toLowerCase().endsWith('.mp4') ? (
                    <video
                      src={selectedLightboxItem.source}
                      controls
                      autoPlay
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <iframe
                      title={selectedLightboxItem.title}
                      src={getEmbedUrl(selectedLightboxItem.source)}
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
                ) : (
                  <img
                    src={selectedLightboxItem.source}
                    alt={selectedLightboxItem.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                )}
              </div>
            )}

            {/* Video Title Banner in Modal */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#07090e',
                borderTop: '1px solid rgba(194, 159, 93, 0.15)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                {selectedLightboxItem.title}
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {selectedLightboxItem.category ? selectedLightboxItem.category.replace('-', ' ') : 'Featured Item'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Global overrides for scroll reveals */}
      <style>{`
        .reveal-section {
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
