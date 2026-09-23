import React from 'react';
import { 
  BookOpen, 
  Mic, 
  FileText, 
  Brain, 
  Palette, 
  Ticket, 
  Layers, 
  Check 
} from 'lucide-react';

export default function ResourceSelector({ selected, setSelected, quizQuestionCount = 5, setQuizQuestionCount }) {
  const count = quizQuestionCount || 5;

  const resources = [
    {
      key: 'lessonPlan',
      icon: BookOpen,
      title: 'Lesson Plan',
      description: 'Structured classroom lesson with timed pacing & objectives',
      color: '#2563EB'
    },
    {
      key: 'teachingScript',
      icon: Mic,
      title: 'Teaching Script',
      description: 'What to say, questions to ask, and expected student responses',
      color: '#4F46E5'
    },
    {
      key: 'worksheet',
      icon: FileText,
      title: 'Worksheet',
      description: 'Student practice material (clean student printable layout)',
      color: '#0D9488'
    },
    {
      key: 'quiz',
      icon: Brain,
      title: 'Quiz',
      description: `${count}-question assessment with answer key & Bloom coverage`,
      color: '#9333EA'
    },
    {
      key: 'visualAid',
      icon: Palette,
      title: 'Visual Aid',
      description: 'Chalkboard / whiteboard layout plan & demonstration tips',
      color: '#EA580C'
    },
    {
      key: 'exitTicket',
      icon: Ticket,
      title: 'Exit Ticket',
      description: '2-minute end-of-class formative check for dismissal',
      color: '#E11D48'
    },
    {
      key: 'catchUpPack',
      icon: Layers,
      title: 'Catch-Up Pack',
      description: 'Complete self-contained guide for students who missed class',
      color: '#0284C7'
    }
  ];

  const toggle = (key) => {
    setSelected({
      ...selected,
      [key]: !selected[key]
    });
  };

  const selectAll = () => {
    const all = {};
    resources.forEach(r => { all[r.key] = true; });
    setSelected(all);
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.875rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)' }}>
            What should TeachAI create?
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Choose the classroom materials to include in this lesson package.
          </p>
        </div>
        <button
          type="button"
          onClick={selectAll}
          className="btn btn-tertiary btn-sm"
          style={{ fontSize: '0.8125rem', color: 'var(--primary)' }}
        >
          Select All
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '0.875rem'
      }}>
        {resources.map(res => {
          const isSelected = selected[res.key];
          return (
            <div
              key={res.key}
              onClick={() => toggle(res.key)}
              className="checkbox-card"
              style={{
                borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                backgroundColor: isSelected ? 'var(--primary-light)' : '#FFFFFF'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.125rem',
                flexShrink: 0
              }}>
                {res.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem'
                }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                    {res.title}
                  </span>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '5px',
                    border: `1.5px solid ${isSelected ? 'var(--primary)' : '#CBD5E1'}`,
                    backgroundColor: isSelected ? 'var(--primary)' : '#FFFFFF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                  {res.description}
                </p>

                {res.key === 'quiz' && isSelected && setQuizQuestionCount && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      marginTop: '0.625rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(37, 99, 235, 0.15)'
                    }}
                  >
                    <div style={{ 
                      fontSize: '0.6875rem', 
                      fontWeight: 700, 
                      color: 'var(--primary)', 
                      marginBottom: '0.375rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Question Count:
                    </div>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      {[3, 5, 8, 10, 15].map(qNum => {
                        const isQActive = count === qNum;
                        return (
                          <button
                            key={qNum}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuizQuestionCount(qNum);
                            }}
                            className="btn btn-sm"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.6875rem',
                              fontWeight: isQActive ? 700 : 500,
                              backgroundColor: isQActive ? 'var(--primary)' : '#FFFFFF',
                              color: isQActive ? '#FFFFFF' : 'var(--text)',
                              border: isQActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            {qNum} Qs
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
