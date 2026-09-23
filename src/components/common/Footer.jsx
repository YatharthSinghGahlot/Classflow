import React from 'react';
import { GraduationCap, Sparkles, Heart } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="app-footer no-print" style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="app-container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                ClassFlow
              </span>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                AI-powered lesson planning for educators.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.875rem'
          }}>
            <button 
              onClick={() => navigate('/')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/create')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Create Lesson
            </button>
            <button 
              onClick={() => navigate('/history')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              My Lessons
            </button>
            <button 
              onClick={() => navigate('/resources')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Google Resources
            </button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '1.5rem',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} ClassFlow. Built for teachers worldwide.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span>Powered by</span>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Google Gemini</span>
            <span>+</span>
            <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>Google Workspace</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
