import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { Sparkles, BookOpen, Compass, Award, CheckCircle } from 'lucide-react';

export default function DifferentiationTab({ 
  differentiation, 
  onUpdateDifferentiation, 
  onRegenerateSection 
}) {
  const [selectedTier, setSelectedTier] = useState('all'); // 'all' | 'support' | 'standard' | 'challenge'
  const diff = differentiation || {};

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem' }}>
      <button
        type="button"
        onClick={() => onRegenerateSection('differentiation', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate Version</span>
      </button>
    </div>
  );

  const tiers = [
    {
      key: 'support',
      title: 'Support Scaffolding',
      color: 'var(--success)',
      borderColor: 'var(--success-border)',
      bgColor: 'var(--success-light)',
      icon: BookOpen,
      data: diff.support || {
        badge: "Support Scaffolding",
        description: "For students who need additional scaffolding",
        strategies: [
          "Simplified instructions",
          "Visual scaffolding & diagrams",
          "Sentence starters",
          "Easier worksheet questions"
        ],
        modifiedTask: "Focus on identifying core inputs and outputs using color-coded flashcards."
      }
    },
    {
      key: 'standard',
      title: 'Grade-Level Standard',
      color: 'var(--primary)',
      borderColor: 'var(--primary-border)',
      bgColor: 'var(--primary-light)',
      icon: Compass,
      data: diff.standard || {
        badge: "Grade-Level Standard",
        description: "Grade-level expectations for typical students",
        strategies: [
          "Grade-level lesson & pace",
          "Normal student worksheet",
          "Normal 5-question mastery quiz",
          "Peer inquiry collaboration"
        ],
        modifiedTask: "Complete all timeline activities and standard worksheet questions as outlined."
      }
    },
    {
      key: 'challenge',
      title: 'Extension & Challenge',
      color: '#9333EA',
      borderColor: '#E9D5FF',
      bgColor: '#FAF5FF',
      icon: Award,
      data: diff.challenge || {
        badge: "Extension & Challenge",
        description: "Higher-order questions for advanced students",
        strategies: [
          "Higher-order analysis questions",
          "Extension inquiry activity",
          "Advanced worksheet scenarios",
          "Independent investigation design"
        ],
        modifiedTask: "Formulate an original hypothesis exploring multi-variable conditions."
      }
    }
  ];

  return (
    <div className="differentiation-tab animate-fade-in">
      <EditableSection
        title="Differentiated Learning Matrix"
        subtitle="Three customized instructional tiers for inclusive classroom mastery"
        editValue={JSON.stringify(diff, null, 2)}
        onSave={(val) => {
          try {
            onUpdateDifferentiation(JSON.parse(val));
          } catch (e) {
            // fallback
          }
        }}
        extraActions={extraActions}
      >
        {/* Tier Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            onClick={() => setSelectedTier('all')}
            className={`btn btn-sm ${selectedTier === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All 3 Tiers
          </button>
          <button
            type="button"
            onClick={() => setSelectedTier('support')}
            className={`btn btn-sm ${selectedTier === 'support' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: selectedTier === 'support' ? '#FFFFFF' : 'var(--success)' }}
          >
            🟢 Support Only
          </button>
          <button
            type="button"
            onClick={() => setSelectedTier('standard')}
            className={`btn btn-sm ${selectedTier === 'standard' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: selectedTier === 'standard' ? '#FFFFFF' : 'var(--primary)' }}
          >
            🔵 Standard Only
          </button>
          <button
            type="button"
            onClick={() => setSelectedTier('challenge')}
            className={`btn btn-sm ${selectedTier === 'challenge' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: selectedTier === 'challenge' ? '#FFFFFF' : '#9333EA' }}
          >
            🟣 Challenge Only
          </button>
        </div>

        {/* 3 Columns / Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedTier === 'all' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: '1.25rem'
        }}>
          {tiers.filter(t => selectedTier === 'all' || selectedTier === t.key).map(tier => {
            const Icon = tier.icon;
            const tData = tier.data;

            return (
              <div
                key={tier.key}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `1.5px solid ${tier.borderColor}`,
                  borderRadius: '14px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: tier.bgColor,
                    color: tier.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text)' }}>
                      {tier.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {tData.description}
                    </p>
                  </div>
                </div>

                {/* Strategies Checklist */}
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: tier.color,
                    marginBottom: '0.625rem'
                  }}>
                    Key Adaptations
                  </div>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    {(tData.strategies || []).map((s, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle size={15} color={tier.color} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ color: 'var(--text)', lineHeight: 1.45 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modified Task Box */}
                {tData.modifiedTask && (
                  <div style={{
                    marginTop: 'auto',
                    backgroundColor: tier.bgColor,
                    borderRadius: '8px',
                    padding: '0.875rem',
                    border: `1px solid ${tier.borderColor}`
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: tier.color, marginBottom: '0.25rem' }}>
                      Recommended Student Task
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text)', lineHeight: 1.45 }}>
                      {tData.modifiedTask}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </EditableSection>
    </div>
  );
}
