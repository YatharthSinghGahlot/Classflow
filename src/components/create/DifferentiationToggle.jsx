import React from 'react';
import { Sparkles, HelpCircle, Check, Award, BookOpen, Compass } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export default function DifferentiationToggle({
  enabled, setEnabled,
  selections, setSelections
}) {
  const toggleSelection = (key) => {
    setSelections({
      ...selections,
      [key]: !selections[key]
    });
  };

  const cards = [
    {
      key: 'support',
      title: 'Support',
      subtitle: 'Scaffolding & Foundations',
      description: 'For students who need additional scaffolding, visual anchors, and sentence starters.',
      color: 'var(--success)',
      borderColor: 'var(--success-border)',
      bgColor: 'var(--success-light)',
      icon: BookOpen
    },
    {
      key: 'standard',
      title: 'Standard',
      subtitle: 'Core Grade-Level Learning',
      description: 'Standard grade-level expectations, standard inquiry, and standard problem sets.',
      color: 'var(--primary)',
      borderColor: 'var(--primary-border)',
      bgColor: 'var(--primary-light)',
      icon: Compass
    },
    {
      key: 'challenge',
      title: 'Challenge',
      subtitle: 'Extension & Depth',
      description: 'Higher-order questions, multi-step scenarios, and advanced analytical extension.',
      color: '#9333EA',
      borderColor: '#E9D5FF',
      bgColor: '#FAF5FF',
      icon: Award
    }
  ];

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      {/* Header with Switch Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: enabled ? '1.25rem' : 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: enabled ? 'var(--primary-light)' : 'var(--bg-subtle)',
            color: enabled ? 'var(--primary)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                Create differentiated versions
              </span>
              <Tooltip text="Generates three tailored tiers: scaffolding for support, standard grade-level, and extension challenges." />
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Automatically scaffolds material across three classroom learning tiers
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <label style={{
          position: 'relative',
          display: 'inline-block',
          width: '46px',
          height: '24px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: enabled ? 'var(--primary)' : '#CBD5E1',
            borderRadius: '24px',
            transition: 'background-color 0.2s',
          }}>
            <span style={{
              position: 'absolute',
              content: '""',
              height: '18px',
              width: '18px',
              left: enabled ? '24px' : '3px',
              bottom: '3px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </span>
        </label>
      </div>

      {/* 3 Distinct Differentiation Cards */}
      {enabled && (
        <div className="animate-fade-in" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '0.75rem'
        }}>
          {cards.map(card => {
            const Icon = card.icon;
            const isChecked = selections[card.key];
            return (
              <div
                key={card.key}
                onClick={() => toggleSelection(card.key)}
                style={{
                  border: `1.5px solid ${isChecked ? card.borderColor : 'var(--border)'}`,
                  backgroundColor: isChecked ? card.bgColor : '#FFFFFF',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                        {card.title}
                      </div>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    border: `1.5px solid ${isChecked ? card.color : '#CBD5E1'}`,
                    backgroundColor: isChecked ? card.color : '#FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)'
                  }}>
                    {isChecked && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: card.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {card.subtitle}
                </div>

                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.45,
                  flex: 1
                }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
