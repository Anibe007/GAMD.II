import React, { useEffect, useState } from 'react';
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before section fully enters viewport
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
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
          <Showreel />
        </div>

        <div className="reveal-section reveal-element">
          <Services />
        </div>

        <div className="reveal-section reveal-element">
          <FeaturedWork />
        </div>

        <div className="reveal-section reveal-element">
          <PortfolioGrid />
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

      {/* Global overrides for scroll reveals */}
      <style>{`
        .reveal-section {
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
