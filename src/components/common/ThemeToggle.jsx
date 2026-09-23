import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', style = {} }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: 'var(--rounded-full)',
        backgroundColor: isDark ? 'var(--color-neutral)' : 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-on-surface)',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms ease',
        flexShrink: 0,
        ...style
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
          transform: isDark ? 'rotate(40deg) scale(1)' : 'rotate(0deg) scale(1)',
          color: isDark ? '#FDE047' : 'var(--color-secondary)'
        }}
      >
        {isDark ? (
          <Sun size={18} strokeWidth={2.2} />
        ) : (
          <Moon size={18} strokeWidth={2.2} />
        )}
      </span>

      <style>{`
        .theme-toggle-btn:hover {
          background-color: var(--color-tertiary) !important;
          border-color: var(--color-primary-40) !important;
          transform: translateY(-1px);
        }
        .theme-toggle-btn:active {
          transform: translateY(0px) scale(0.96);
        }
      `}</style>
    </button>
  );
}
