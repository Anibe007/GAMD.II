import React from 'react';
import { Check } from 'lucide-react';

export default function About() {
  const skills = [
    'Cinematic Filming',
    'Creative Editing',
    'Portrait Photography',
    'Color Grading Expertise',
    'High-End Sound Design',
    'Commercial Production'
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-cream)',
        color: 'var(--text-cream-primary)',
        padding: '100px 0',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div className="container">
        {/* Title for light section */}
        <div className="section-title-wrapper" style={{ marginBottom: '60px' }}>
          <h2
            className="section-title"
            style={{
              color: 'var(--text-cream-primary)',
            }}
          >
            About Me
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--text-cream-secondary)' }}>
            The creative director and cinematographer behind the lens.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}
          className="about-wrapper"
        >
          {/* Left Column: Portrait */}
          <div
            style={{
              flex: '1 1 400px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                borderRadius: '24px',
                padding: '12px',
                backgroundColor: 'var(--bg-cream-panel)',
                boxShadow: '0 20px 40px rgba(28, 25, 23, 0.1)',
                border: '1px solid var(--border-cream)',
              }}
            >
              <img
                src="/images/Profile_pics.jpeg"
                alt="Gandu David Gama"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              
              {/* Gold Accent Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '-10px',
                  background: 'var(--gold-gradient)',
                  color: '#07090e',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 15px rgba(194, 159, 93, 0.3)',
                  fontFamily: 'var(--font-sans)',
                  textTransform: 'uppercase',
                }}
              >
                Visual Storyteller
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Skills */}
          <div
            style={{
              flex: '1.2 1 450px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--gold-primary)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Cinematographer & Photographer
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                lineHeight: 1.2,
                fontWeight: 700,
                color: 'var(--text-cream-primary)',
                marginBottom: '24px',
              }}
            >
              Hi, I'm Gandu David Gama,
            </h3>

            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--gold-primary)',
                marginBottom: '20px',
              }}
            >
              Professional Videographer & Photographer
            </h4>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-cream-secondary)',
                lineHeight: '1.75',
                marginBottom: '20px',
              }}
            >
              Gandu David Gama is a videographer, cinematographer, photographer, and visual storyteller passionate about documenting life’s most meaningful moments. A graduate of Theatre and Performing Arts from Ahmadu Bello University, Zaria, he combines artistic vision with technical expertise to create compelling visual experiences through film and photography.
            </p>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-cream-secondary)',
                lineHeight: '1.75',
                marginBottom: '35px',
              }}
            >
              From weddings and special events to documentaries and creative productions, David specializes in capturing authentic stories with clarity, emotion, and cinematic excellence. Drawing from his background in storytelling and performance arts, he approaches every project with creativity, professionalism, and attention to detail, producing timeless visual content that not only documents events but also preserves the emotions, connections, and experiences that make each story unique.
            </p>

            {/* Skills checklist */}
            <div
              style={{
                backgroundColor: 'var(--bg-cream-panel)',
                borderRadius: '16px',
                padding: '24px 30px',
                border: '1px solid var(--border-cream)',
              }}
            >
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  color: 'var(--text-cream-primary)',
                }}
              >
                My Core Expertise
              </h5>
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(194, 159, 93, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={12} style={{ color: 'var(--gold-primary)', strokeWidth: 3 }} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-cream-primary)' }}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stakeholders Collaboration Block */}
            <div
              style={{
                marginTop: '30px',
                backgroundColor: 'rgba(28, 25, 23, 0.03)',
                borderRadius: '16px',
                padding: '24px 30px',
                border: '1px dashed var(--border-cream)',
              }}
            >
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  color: 'var(--text-cream-primary)',
                }}
              >
                Project Collaboration
              </h5>
              
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>Videographer</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream-primary)' }}>Gandu David Gama</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>Web Developer</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream-primary)' }}>Anibe David</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>Coordinator</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-cream-primary)' }}>Legbo Victoria Adi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .about-wrapper {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
