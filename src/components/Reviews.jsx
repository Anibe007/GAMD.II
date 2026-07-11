import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { initialReviews } from '../data/portfolioData';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadReviews = () => {
    const savedReviews = localStorage.getItem('gandu_david_gama_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(initialReviews);
      localStorage.setItem('gandu_david_gama_reviews', JSON.stringify(initialReviews));
    }
  };

  // Load reviews from localStorage or fall back to initialReviews
  useEffect(() => {
    loadReviews();
    window.addEventListener('reviewsUpdated', loadReviews);
    window.addEventListener('storage', loadReviews);
    return () => {
      window.removeEventListener('reviewsUpdated', loadReviews);
      window.removeEventListener('storage', loadReviews);
    };
  }, []);

  // Calculate Average Rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('gandu_david_gama_reviews', JSON.stringify(updatedReviews));
    
    // Dispatch custom event to sync with Admin Dashboard
    window.dispatchEvent(new Event('reviewsUpdated'));

    // Reset Form
    setName('');
    setRating(5);
    setText('');
    setSuccessMsg('Thank you! Your review has been posted successfully.');
    
    // Clear message after 4 seconds
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const renderStars = (count, size = 16, color = 'var(--gold-primary)', isInteractive = false, onClick = null, onMouseEnter = null, onMouseLeave = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={size}
          style={{
            color: i <= count ? color : 'rgba(255, 255, 255, 0.15)',
            fill: i <= count ? color : 'transparent',
            cursor: isInteractive ? 'pointer' : 'default',
            transition: 'var(--transition-smooth)',
            marginRight: '2px'
          }}
          onClick={() => isInteractive && onClick && onClick(i)}
          onMouseEnter={() => isInteractive && onMouseEnter && onMouseEnter(i)}
          onMouseLeave={() => isInteractive && onMouseLeave && onMouseLeave()}
        />
      );
    }
    return stars;
  };

  return (
    <section id="reviews" style={{ backgroundColor: '#07090e', padding: '80px 0', borderTop: '1px solid rgba(194, 159, 93, 0.05)' }}>
      <div className="container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Client Reviews</h2>
          <p className="section-subtitle">
            Read what directors, brands, and clients say about working with David.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}
          className="reviews-wrapper"
        >
          {/* Left Block: Summary & Add Review Form */}
          <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Aggregate Score Panel */}
            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', letterSpacing: '1px', marginBottom: '16px' }}>
                AVERAGE RATING
              </h3>
              <div style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--gold-primary)', lineHeight: 1, fontFamily: 'var(--font-sans)', marginBottom: '8px' }}>
                {averageRating}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {renderStars(Math.round(parseFloat(averageRating)), 24)}
              </div>
              <p style={{ color: 'var(--text-dark-secondary)', fontSize: '0.95rem' }}>
                Based on {reviews.length} client feedback submissions
              </p>
            </div>

            {/* Form Panel */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} style={{ color: 'var(--gold-primary)' }} />
                <span>WRITE A REVIEW</span>
              </h3>

              {successMsg && (
                <div style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)', border: '1px solid #25d366', color: '#25d366', padding: '12px', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      outline: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Rating
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
                    {renderStars(
                      hoverRating || rating,
                      22,
                      'var(--gold-primary)',
                      true,
                      (r) => setRating(r),
                      (r) => setHoverRating(r),
                      () => setHoverRating(0)
                    )}
                    <span style={{ marginLeft: '12px', fontSize: '0.9rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                      {hoverRating || rating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                    Your Feedback
                  </label>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share your experience working with David..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'rgba(15, 20, 32, 0.4)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--gold-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px' }}>
                  Post Review
                </button>
              </form>
            </div>
          </div>

          {/* Right Block: Reviews List */}
          <div style={{ flex: '1.5 1 450px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '680px', overflowY: 'auto', paddingRight: '8px' }} className="reviews-list">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel"
                style={{
                  padding: '24px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid rgba(194, 159, 93, 0.1)',
                  transition: 'var(--transition-smooth)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(194, 159, 93, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(194, 159, 93, 0.1)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)' }}>
                    {rev.date}
                  </span>
                </div>

                <div style={{ display: 'flex' }}>
                  {renderStars(rev.rating, 14)}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reviews-list::-webkit-scrollbar {
          width: 5px;
        }
        .reviews-list::-webkit-scrollbar-track {
          background: rgba(15, 20, 32, 0.2);
        }
        .reviews-list::-webkit-scrollbar-thumb {
          background: rgba(194, 159, 93, 0.3);
          border-radius: 4px;
        }
        .reviews-list::-webkit-scrollbar-thumb:hover {
          background: var(--gold-primary);
        }
        @media (max-width: 768px) {
          .reviews-wrapper {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
