import React from 'react';
import EditableSection from './EditableSection';
import { Palette, Sparkles, Layout, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function VisualAidTab({ 
  visualAid, 
  onUpdateVisualAid, 
  onRegenerateSection 
}) {
  const va = visualAid || { suggestions: [] };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem' }}>
      <button
        type="button"
        onClick={() => onRegenerateSection('visualAid', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate Visual Plan</span>
      </button>
    </div>
  );

  const editString = `Board Plan:\n${va.boardPlan || ''}\n\nSuggestions:\n${(va.suggestions || []).join('\n')}`;

  return (
    <div className="visual-aid-tab animate-fade-in">
      <EditableSection
        title={va.title || "Teaching Visual"}
        subtitle="Chalkboard / whiteboard layout & classroom visual aid recommendations"
        editValue={editString}
        onSave={(val) => {
          onUpdateVisualAid({
            ...va,
            boardPlan: val
          });
        }}
        extraActions={extraActions}
      >
        {/* Board Plan Simulation */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Layout size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)' }}>
              Classroom Board Plan Layout
            </h3>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Recommended visual organization for the front classroom blackboard or digital interactive display.
          </p>

          {/* Chalkboard Card */}
          <div style={{
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            padding: '1.5rem',
            borderRadius: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            lineHeight: 1.45,
            overflowX: 'auto',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
            border: '4px solid #334155'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {va.boardPlan}
            </pre>
          </div>
        </div>

        {/* Teaching Aid Suggestions */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Lightbulb size={18} color="var(--warning)" />
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)' }}>
              Teaching Aid Suggestions
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.875rem'
          }}>
            {(va.suggestions || []).map((sug, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text)',
                  lineHeight: 1.5
                }}
              >
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{sug}</span>
              </div>
            ))}
          </div>
        </div>
      </EditableSection>
    </div>
  );
}
