import React from 'react';
import {
  BookOpen,
  Mic,
  FileText,
  Brain,
  Sparkles,
  Palette,
  Ticket,
  Layers,
} from 'lucide-react';

export const TABS = [
  { key: 'lessonPlan',     label: 'Lesson Plan',     icon: BookOpen,  color: '#2563EB' },
  { key: 'teachingScript', label: 'Script',           icon: Mic,       color: '#4F46E5' },
  { key: 'worksheet',      label: 'Worksheet',        icon: FileText,  color: '#0891B2' },
  { key: 'quiz',           label: 'Quiz',             icon: Brain,     color: '#7C3AED' },
  { key: 'differentiation',label: 'Differentiation',  icon: Sparkles,  color: '#059669' },
  { key: 'visualAid',      label: 'Visual Aid',       icon: Palette,   color: '#D97706' },
  { key: 'exitTicket',     label: 'Exit Ticket',      icon: Ticket,    color: '#DC2626' },
  { key: 'catchUpPack',    label: 'Catch-Up Pack',    icon: Layers,    color: '#64748B' },
];

export default function WorkspaceTabs({ activeTab, onTabChange }) {
  return (
    <div
      className="workspace-tabs no-print"
      role="tablist"
      aria-label="Lesson Package Sections"
      style={{
        marginBottom: '1.75rem',
        borderBottom: '2px solid var(--border)',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        whiteSpace: 'nowrap',
        display: 'flex',
        gap: '0.125rem',
        paddingBottom: '0px',
        /* Hide scrollbar but keep scrolling */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.key}`}
            onClick={() => onTabChange(tab.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4375rem',
              padding: '0.625rem 0.9375rem',
              position: 'relative',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              fontWeight: isActive ? 650 : 500,
              color: isActive ? tab.color : 'var(--text-muted)',
              borderBottom: isActive
                ? `2.5px solid ${tab.color}`
                : '2.5px solid transparent',
              marginBottom: '-2px',
              transition: 'all var(--transition-fast)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              borderRadius: '6px 6px 0 0',
              backgroundColor: isActive ? `${tab.color}0d` : 'transparent',
            }}
          >
            <Icon
              size={15}
              color={isActive ? tab.color : 'var(--text-light)'}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
