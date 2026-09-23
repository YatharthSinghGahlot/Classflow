import React from 'react';
import EditableSection from './EditableSection';
import { Mic, Sparkles, MessageSquare, HelpCircle, ArrowRight, UserCheck } from 'lucide-react';

export default function TeachingScriptTab({
  teachingScript,
  onUpdateScript,
  onRegenerateSection
}) {
  const script = teachingScript || { timeline: [] };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={() => onRegenerateSection('teachingScript', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate</span>
      </button>
      <button
        type="button"
        onClick={() => onRegenerateSection('teachingScript', 'simpler')}
        className="btn btn-secondary btn-sm"
      >
        <span>Make Simpler</span>
      </button>
      <button
        type="button"
        onClick={() => onRegenerateSection('teachingScript', 'interactive')}
        className="btn btn-secondary btn-sm"
      >
        <span>Make More Interactive</span>
      </button>
    </div>
  );

  const editString = (script.timeline || []).map(item => (
    `[${item.time} - ${item.phase}]\nAction: ${item.action}\nQuestion: ${item.question}\nExpected: ${item.expectedResponse}\n`
  )).join('\n');

  return (
    <div className="teaching-script-tab animate-fade-in">
      <EditableSection
        title={script.heading || "Teacher Script"}
        subtitle={script.subheading || "What to say and do during the lesson."}
        editValue={editString}
        onSave={(val) => {
          // Parse or update
          onUpdateScript({
            ...script,
            subheading: "Updated custom script notes"
          });
        }}
        extraActions={extraActions}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(script.timeline || []).map((step, idx) => (
            <div
              key={step.id || idx}
              className="card"
              style={{
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}
            >
              {/* Timeline Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.625rem'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-light)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px',
                  border: '1px solid var(--primary-border)'
                }}>
                  {step.time}
                </span>

                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                  {step.phase}
                </span>
              </div>

              {/* 3 Step Blocks: Teacher Action, Suggested Question, Expected Response */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* 1. Teacher Action */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--primary)',
                    marginBottom: '0.25rem'
                  }}>
                    Teacher Action
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.5 }}>
                    {step.action}
                  </p>
                </div>

                {/* 2. Suggested Question */}
                <div style={{
                  backgroundColor: 'var(--secondary-light)',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #C7D2FE'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--secondary)',
                    marginBottom: '0.25rem'
                  }}>
                    Suggested Question to Class
                  </div>
                  <p style={{ fontSize: '0.9375rem', fontStyle: 'italic', fontWeight: 500, color: '#1E1B4B', lineHeight: 1.5 }}>
                    "{step.question}"
                  </p>
                </div>

                {/* 3. Expected Student Response */}
                <div style={{
                  backgroundColor: 'var(--success-light)',
                  padding: '0.875rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--success-border)'
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--success)',
                    marginBottom: '0.25rem'
                  }}>
                    Expected Student Response
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#14532D', lineHeight: 1.5 }}>
                    {step.expectedResponse}
                  </p>
                </div>

                {step.teacherTip && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', paddingLeft: '0.5rem' }}>
                    <Lightbulb size={13} color="var(--color-primary)" />
                    <em>{step.teacherTip}</em>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </EditableSection>
    </div>
  );
}
