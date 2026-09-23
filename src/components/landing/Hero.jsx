import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  GraduationCap,
} from 'lucide-react';
import { useLesson } from '../../context/LessonContext';

export default function Hero({ onStartCreating, onSeeHowItWorks }) {
  const { googleAuthState, setIsAuthModalOpen } = useLesson();
  const isConnected = Boolean(googleAuthState?.isConnected && googleAuthState?.user);

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '5rem 1rem 3.5rem 1rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        className="hero-orb hero-orb-blue"
        style={{ width: '500px', height: '500px', top: '-120px', left: '-180px' }}
      />
      <div
        className="hero-orb hero-orb-purple"
        style={{ width: '400px', height: '400px', top: '-80px', right: '-150px' }}
      />

      {/* Content relative to orbs */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <h1
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.625rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: 'var(--text)',
            marginBottom: '1.375rem',
            animationDelay: '50ms',
            animationFillMode: 'both',
          }}
        >
          Turn any topic into a{' '}
          <span className="gradient-text">complete lesson</span>
          <br />in seconds.
        </h1>

        {/* Subheading */}
        <p
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '580px',
            margin: '0 auto 2.5rem auto',
            fontWeight: 400,
            animationDelay: '100ms',
            animationFillMode: 'both',
          }}
        >
          Lesson plans, teaching scripts, worksheets, quizzes and more — all
          classroom-ready and synced to Google Workspace.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-slide-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: isConnected ? '1.5rem' : '2.5rem',
            animationDelay: '150ms',
            animationFillMode: 'both',
          }}
        >
          <button
            onClick={onStartCreating}
            className="btn btn-primary btn-lg"
            style={{
              boxShadow: 'var(--shadow-blue)',
              background: 'var(--gradient-primary)',
              border: 'none',
            }}
          >
            <span>Start Creating</span>
            <ArrowRight size={17} />
          </button>

          {!isConnected ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn btn-secondary btn-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          ) : (
            <button
              onClick={onSeeHowItWorks}
              className="btn btn-secondary btn-lg"
            >
              <span>See How It Works</span>
            </button>
          )}
        </div>

        {isConnected && (
          <div 
            className="animate-fade-in"
            style={{ 
              fontSize: '13px', 
              color: 'var(--color-primary)', 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle size={14} color="var(--color-primary)" />
            <span>Signed in as <strong>{googleAuthState.user.email}</strong> • Google Drive & Gmail active</span>
          </div>
        )}

        {/* Compact proof row */}
        <div
          className="animate-fade-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            animationDelay: '250ms',
            animationFillMode: 'both',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <CheckCircle size={15} color="var(--success)" />
            <span>7 resources per lesson</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Clock size={15} color="var(--success)" />
            <span>Ready in under 10 seconds</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <GraduationCap size={15} color="var(--success)" />
            <span>Grades 1-12</span>
          </span>
        </div>
      </div>
    </section>
  );
}
