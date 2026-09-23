import React from 'react';
import EditableSection from './EditableSection';
import { Layers, FileText, CheckCircle, BookOpen, Sparkles, Printer } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function CatchUpPackTab({ 
  catchUpPack, 
  onUpdateCatchUp, 
  onCreateGoogleDoc 
}) {
  const { showToast } = useToast();
  const cup = catchUpPack || { sections: {} };
  const sections = cup.sections || {};

  const handlePrint = () => {
    window.print();
  };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary btn-sm"
      >
        <Printer size={14} />
        <span>Print Handout</span>
      </button>

      {onCreateGoogleDoc && (
        <button
          type="button"
          onClick={onCreateGoogleDoc}
          className="btn btn-secondary btn-sm"
        >
          <FileText size={14} color="var(--primary)" />
          <span>Create Google Doc</span>
        </button>
      )}
    </div>
  );

  const editString = `Summary:\n${sections.missedSummary || ''}\n\nKey Concepts:\n${(sections.keyConcepts || []).join('\n')}`;

  return (
    <div className="catch-up-pack-tab animate-fade-in">
      <EditableSection
        title={cup.title || "Student Catch-Up Pack"}
        subtitle={cup.subtitle || "For students who missed the lesson."}
        editValue={editString}
        onSave={(val) => {
          onUpdateCatchUp({
            ...cup,
            sections: {
              ...sections,
              missedSummary: val
            }
          });
        }}
        extraActions={extraActions}
      >
        <div className="printable-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 1: What You Missed */}
          <div style={{
            backgroundColor: 'var(--bg)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
              What You Missed
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text)', lineHeight: 1.6 }}>
              {sections.missedSummary}
            </p>
          </div>

          {/* Section 2: Key Concepts */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
              Key Concepts
            </h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {(sections.keyConcepts || []).map((kc, idx) => (
                <li key={idx} style={{ lineHeight: 1.5 }}>
                  {kc}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Important Vocabulary */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
              Important Vocabulary
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '0.75rem'
            }}>
              {(sections.vocabulary || []).map((vocab, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem' }}>
                    {vocab.term}:{' '}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text)' }}>
                    {vocab.definition}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Practice Questions */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
              Catch-Up Practice (5 Questions)
            </h3>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              {(sections.practice || []).map((p, idx) => (
                <li key={idx} style={{ lineHeight: 1.5 }}>
                  {p}
                </li>
              ))}
            </ol>
          </div>

          {/* Section 5: Mini Quiz */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
              3-Question Self-Check Mini Quiz
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(sections.miniQuiz || []).map((mq, idx) => (
                <div key={idx} style={{ fontSize: '0.875rem' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text)' }}>{mq.q}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--success)', marginTop: '2px' }}>
                    <strong>Key Answer:</strong> {mq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditableSection>
    </div>
  );
}
