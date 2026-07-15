import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Mail, CheckSquare, Square, Star, Film, Image } from 'lucide-react';
import { portfolioItems, getYouTubeId, formatYouTubeEmbed, getYouTubeThumbnail } from '../data/portfolioData';

export default function AdminDashboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('portfolio');
  
  // Data States
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Form States for adding new portfolio item
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('photography');
  const [newType, setNewType] = useState('image');
  const [newSource, setNewSource] = useState('');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [newAspectRatio, setNewAspectRatio] = useState('16/9');
  const [errorMsg, setErrorMsg] = useState('');

  // Load data from localStorage on open
  useEffect(() => {
    if (isOpen) {
      // Portfolio Items
      const savedPortfolio = localStorage.getItem('gandu_david_gama_portfolio');
      if (savedPortfolio) {
        setItems(JSON.parse(savedPortfolio));
      } else {
        setItems(portfolioItems);
        localStorage.setItem('gandu_david_gama_portfolio', JSON.stringify(portfolioItems));
      }

      // Contact Messages
      const savedMessages = localStorage.getItem('gandu_david_gama_messages');
      setMessages(savedMessages ? JSON.parse(savedMessages) : []);

      // Reviews
      const savedReviews = localStorage.getItem('gandu_david_gama_reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Safe check to avoid empty reviews if they aren't initialized yet
        const defaultReviews = JSON.parse(localStorage.getItem('gandu_david_gama_reviews') || '[]');
        setReviews(defaultReviews);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Manage Portfolio Items
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSource.trim()) {
      setErrorMsg('Title and Source Link are required.');
      return;
    }

    const srcUrl = newSource.trim();
    let formattedSource = srcUrl;
    let resolvedThumbnail = newThumbnail.trim();

    if (newType === 'video') {
      const ytId = getYouTubeId(srcUrl);
      if (ytId) {
        formattedSource = `https://www.youtube.com/embed/${ytId}`;
        if (!resolvedThumbnail) {
          resolvedThumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        }
      } else if (!resolvedThumbnail) {
        resolvedThumbnail = '/images/canon-camera.jpg';
      }
    } else {
      if (!resolvedThumbnail) {
        resolvedThumbnail = srcUrl;
      }
    }

    const newItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      type: newType,
      source: formattedSource,
      thumbnail: resolvedThumbnail,
      ...(newType === 'video' && { aspectRatio: newAspectRatio })
    };

    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('gandu_david_gama_portfolio', JSON.stringify(updated));
    
    // Reset Form
    setNewTitle('');
    setNewSource('');
    setNewThumbnail('');
    setNewAspectRatio('16/9');
    setErrorMsg('');

    // Dispatch custom event
    window.dispatchEvent(new Event('portfolioUpdated'));
  };

  const handleDeleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('gandu_david_gama_portfolio', JSON.stringify(updated));
    window.dispatchEvent(new Event('portfolioUpdated'));
  };

  // Manage Contact Messages
  const handleToggleReadMessage = (id) => {
    const updated = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, read: !msg.read };
      }
      return msg;
    });
    setMessages(updated);
    localStorage.setItem('gandu_david_gama_messages', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('gandu_david_gama_messages', JSON.stringify(updated));
  };

  // Manage Reviews
  const handleDeleteReview = (id) => {
    const updated = reviews.filter(rev => rev.id !== id);
    setReviews(updated);
    localStorage.setItem('gandu_david_gama_reviews', JSON.stringify(updated));
    window.dispatchEvent(new Event('reviewsUpdated'));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(7, 9, 14, 0.98)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Dashboard Card Container */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 30px',
            borderBottom: '1px solid var(--border-dark)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0c0f17',
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', margin: 0, letterSpacing: '1px' }}>
              GAMAD.II <span style={{ color: 'var(--gold-primary)' }}>ADMIN DASHBOARD</span>
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-dark-secondary)' }}>
              Manage portfolio gallery items, reviews, and client contact messages.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dark-secondary)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dark-secondary)'}
          >
            <X size={28} />
          </button>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(194, 159, 93, 0.1)',
            backgroundColor: '#0a0d14',
            padding: '0 20px',
            gap: '10px'
          }}
        >
          {[
            { id: 'portfolio', name: 'Portfolio Items' },
            { id: 'messages', name: `Inquiries (${messages.filter(m => !m.read).length} new)` },
            { id: 'reviews', name: 'Reviews' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 20px',
                background: 'none',
                border: 'none',
                color: activeTab === tab.id ? 'var(--gold-primary)' : 'var(--text-dark-secondary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
                transition: 'var(--transition-smooth)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '30px', backgroundColor: '#07090e' }}>
          
          {/* TAB 1: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              
              {/* Add New Item Panel */}
              <div style={{ flex: '1 1 350px' }}>
                <div style={{ backgroundColor: 'rgba(15, 20, 32, 0.4)', border: '1px solid var(--border-dark)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} style={{ color: 'var(--gold-primary)' }} />
                    <span>ADD PORTFOLIO ITEM</span>
                  </h3>

                  {errorMsg && (
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g., Summer Editorial Shoot"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: 'rgba(7, 9, 14, 0.6)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: '6px',
                          color: '#ffffff',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                          Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            backgroundColor: '#07090e',
                            border: '1px solid var(--border-dark)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            outline: 'none',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="photography">Photography</option>
                          <option value="videography">Videography</option>
                          <option value="video-editing">Video Editing</option>
                        </select>
                      </div>

                       <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                          Type
                        </label>
                        <select
                          value={newType}
                          onChange={(e) => setNewType(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            backgroundColor: '#07090e',
                            border: '1px solid var(--border-dark)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            outline: 'none',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    </div>

                    {newType === 'video' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                          Video Aspect Ratio
                        </label>
                        <select
                          value={newAspectRatio}
                          onChange={(e) => setNewAspectRatio(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            backgroundColor: '#07090e',
                            border: '1px solid var(--border-dark)',
                            borderRadius: '6px',
                            color: '#ffffff',
                            outline: 'none',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="16/9">16:9 Widescreen (Horizontal)</option>
                          <option value="9/16">9:16 Vertical Reel/Short</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                        Source URL (e.g. /images/DSC00009.jpg or Video URL)
                      </label>
                      <input
                        type="text"
                        value={newSource}
                        onChange={(e) => setNewSource(e.target.value)}
                        placeholder="Path, Google Drive embed, or Youtube embed"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: 'rgba(7, 9, 14, 0.6)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: '6px',
                          color: '#ffffff',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                        Thumbnail URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={newThumbnail}
                        onChange={(e) => setNewThumbnail(e.target.value)}
                        placeholder="Leave blank to auto-resolve"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          backgroundColor: 'rgba(7, 9, 14, 0.6)',
                          border: '1px solid var(--border-dark)',
                          borderRadius: '6px',
                          color: '#ffffff',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
                      Add to Gallery
                    </button>
                  </form>
                </div>
              </div>

              {/* Items List Grid */}
              <div style={{ flex: '2 1 500px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', letterSpacing: '1px' }}>
                  EXISTING GALLERY ITEMS ({items.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 18px',
                        backgroundColor: 'rgba(15, 20, 32, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        gap: '15px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', overflow: 'hidden' }}>
                        {item.type === 'video' ? (
                          <div style={{ width: '60px', height: '40px', backgroundColor: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '1px solid var(--gold-primary)' }}>
                            <Film size={16} style={{ color: 'var(--gold-primary)' }} />
                          </div>
                        ) : (
                          <img
                            src={item.thumbnail}
                            alt=""
                            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                          />
                        )}

                        <div style={{ overflow: 'hidden' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            {item.title}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '4px',
                          transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', letterSpacing: '1px' }}>
                CLIENT CONTACT INQUIRIES ({messages.length})
              </h3>

              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dark-secondary)' }}>
                  <Mail size={40} style={{ color: 'rgba(255, 255, 255, 0.1)', marginBottom: '12px' }} />
                  <p>No client inquiries found. Submissions from the contact form will appear here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        padding: '20px',
                        backgroundColor: msg.read ? 'rgba(15, 20, 32, 0.2)' : 'rgba(194, 159, 93, 0.05)',
                        border: msg.read ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(194, 159, 93, 0.25)',
                        borderRadius: '10px',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                            {msg.subject}
                          </h4>
                          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--gold-primary)' }}>
                            From: {msg.name} ({msg.email})
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginRight: '10px' }}>
                            {msg.date}
                          </span>

                          <button
                            onClick={() => handleToggleReadMessage(msg.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-dark-secondary)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem'
                            }}
                          >
                            {msg.read ? (
                              <CheckSquare size={16} style={{ color: 'var(--gold-primary)' }} />
                            ) : (
                              <Square size={16} />
                            )}
                            <span>{msg.read ? 'Read' : 'Mark Read'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.5', backgroundColor: '#090d14', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REVIEW MANAGER */}
          {activeTab === 'reviews' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', letterSpacing: '1px' }}>
                MANAGE CLIENT REVIEWS ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dark-secondary)' }}>
                  No reviews in database.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {reviews.map(rev => (
                    <div
                      key={rev.id}
                      style={{
                        padding: '20px',
                        backgroundColor: 'rgba(15, 20, 32, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '20px',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                            {rev.name}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)' }}>
                            ({rev.date})
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              style={{
                                color: i < rev.rating ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.1)',
                                fill: i < rev.rating ? 'var(--gold-primary)' : 'transparent'
                              }}
                            />
                          ))}
                        </div>

                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark-secondary)', fontStyle: 'italic', lineHeight: '1.5' }}>
                          "{rev.text}"
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '4px',
                          transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
