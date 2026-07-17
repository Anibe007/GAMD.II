
import { Video, Film, Camera } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      title: 'Videography',
      description: 'Cinematic storytelling with professional 4K/6K cinema cameras. Specialized in weddings, brand advertisements, music videos, and live events.',
      icon: <Video size={36} style={{ color: 'var(--gold-primary)' }} />,
    },
    {
      title: 'Video Editing',
      description: 'High-end post-production. Complete editing services including cinematic narrative assembly, color grading, sound design, and audio mixing.',
      icon: <Film size={36} style={{ color: 'var(--gold-primary)' }} />,
    },
    {
      title: 'Photography',
      description: 'Stunning high-resolution photography. Offering professional studio/location portrait sessions, commercial product imagery, and live events.',
      icon: <Camera size={36} style={{ color: 'var(--gold-primary)' }} />,
    },
  ];

  return (
    <section id="services" style={{ backgroundColor: '#07090e', padding: '80px 0' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Professional media production services tailored to bring your creative concepts to life.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '20px',
          }}
        >
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: '40px',
                textAlign: 'center',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(194, 159, 93, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-dark)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
              }}
            >
              {/* Icon Container with gold border box */}
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '12px',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(194, 159, 93, 0.05)',
                  boxShadow: '0 0 15px var(--gold-glow)',
                  marginBottom: '10px',
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: '#ffffff',
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-dark-secondary)',
                  lineHeight: '1.7',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
