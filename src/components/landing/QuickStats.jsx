import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../../services/storage';
import { BookOpen, Zap, Clock, TrendingUp } from 'lucide-react';

function useCountUp(target, duration = 800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === 0) return;
    const start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

const STAT_CARDS = (stats) => [
  {
    icon: BookOpen,
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
    label: 'Lessons Created',
    value: stats.lessonsCreated,
    suffix: '',
  },
  {
    icon: Zap,
    color: 'var(--secondary)',
    bg: 'var(--secondary-light)',
    label: 'Resources Generated',
    value: stats.resourcesGenerated,
    suffix: '',
  },
  {
    icon: Clock,
    color: '#0891B2',
    bg: '#ECFEFF',
    label: 'Hours Saved',
    value: stats.timeSavedHours,
    suffix: ' hrs',
  },
  {
    icon: TrendingUp,
    color: '#16A34A',
    bg: '#F0FDF4',
    label: 'Avg Readiness',
    value: 96,
    suffix: '%',
  },
];

function StatItem({ icon: Icon, color, bg, label, value, suffix }) {
  const displayCount = useCountUp(value);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1rem',
        borderRadius: '12px',
        backgroundColor: bg,
        border: '1px solid',
        borderColor: `${color}22`,
        textAlign: 'center',
        flex: '1 1 140px',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '9px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <Icon size={18} color={color} />
      </div>

      <div
        className="stat-number"
        style={{ color }}
      >
        {displayCount}{suffix}
      </div>

      <div
        style={{
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: 'var(--text-muted)',
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function QuickStats() {
  const [stats, setStats] = useState(() => storage.getStats());

  useEffect(() => {
    setStats(storage.getStats());
  }, []);

  const cards = STAT_CARDS(stats);

  return (
    <section
      className="quick-stats"
      style={{
        maxWidth: '860px',
        margin: '0 auto 3rem auto',
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
            }}
          >
            Your Activity Dashboard
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
            Updated in real-time
          </span>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'flex',
            gap: '0.875rem',
            flexWrap: 'wrap',
          }}
        >
          {cards.map((card) => (
            <StatItem key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
