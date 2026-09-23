import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb, 
  Sparkles, 
  FileText,
  Target,
  Package,
  ExternalLink
} from 'lucide-react';
import { useLesson } from '../../context/LessonContext';
import Modal from '../common/Modal';

export default function LessonPlanTab({ 
  lessonPlan, 
  onUpdatePlan, 
  onRegenerateSection 
}) {
  const { handleExportToGoogleDocs } = useLesson();
  const [createdDoc, setCreatedDoc] = useState(null);
  const [isExportingDoc, setIsExportingDoc] = useState(false);

  const [expandedTimeline, setExpandedTimeline] = useState({
    tl1: true,
    tl2: true,
    tl3: true,
    tl4: true,
    tl5: true
  });

  const toggleTimelineItem = (id) => {
    setExpandedTimeline(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const plan = lessonPlan || {};

  const handleExportDoc = async () => {
    setIsExportingDoc(true);
    try {
      const res = await handleExportToGoogleDocs('lessonPlan');
      setCreatedDoc(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDoc(false);
    }
  };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={handleExportDoc}
        disabled={isExportingDoc}
        className="btn btn-secondary btn-sm"
        title="Export Lesson Plan directly to Google Docs"
        style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)', backgroundColor: 'var(--primary-light)' }}
      >
        <FileText size={14} color="var(--primary)" />
        <span>{isExportingDoc ? 'Exporting...' : 'Export to Google Docs'}</span>
      </button>

      <button
        type="button"
        onClick={() => onRegenerateSection('lessonPlan', 'default')}
        className="btn btn-secondary btn-sm"
        title="Regenerate Lesson Plan"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate</span>
      </button>
      <button
        type="button"
        onClick={() => onRegenerateSection('lessonPlan', 'simpler')}
        className="btn btn-secondary btn-sm"
        title="Make simpler for younger students"
      >
        <span>Make Simpler</span>
      </button>
      <button
        type="button"
        onClick={() => onRegenerateSection('lessonPlan', 'interactive')}
        className="btn btn-secondary btn-sm"
        title="Increase active student participation"
      >
        <span>Make More Interactive</span>
      </button>
    </div>
  );

  const editString = `Title: ${plan.title || ''}\n\nOverview:\n${plan.overview || ''}\n\nObjectives:\n${(plan.objectives || []).join('\n')}\n\nHomework:\n${plan.homework || ''}`;

  return (
    <div className="lesson-plan-tab animate-fade-in">
      <EditableSection
        title={plan.title || "Lesson Plan"}
        subtitle="Complete classroom structure with learning objectives & timeline"
        editValue={editString}
        onSave={(val) => {
          onUpdatePlan({
            ...plan,
            overview: val
          });
        }}
        extraActions={extraActions}
      >
        {/* Overview Box */}
        <div style={{
          backgroundColor: 'var(--bg)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '1.5rem',
          lineHeight: 1.6,
          fontSize: '0.9375rem',
          color: 'var(--text)'
        }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.375rem' }}>
            Overview
          </h3>
          <p>{plan.overview}</p>
        </div>

        {/* 2-Column: Objectives & Materials */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem'
        }}>
          {/* Learning Objectives */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Target size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                Learning Objectives
              </h3>
            </div>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {(plan.objectives || []).map((obj, idx) => (
                <li key={idx} style={{ lineHeight: 1.5 }}>
                  {obj}
                </li>
              ))}
            </ol>
          </div>

          {/* Materials */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Package size={18} color="var(--secondary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                Required Materials
              </h3>
            </div>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {(plan.materials || []).map((mat, idx) => (
                <li key={idx} style={{ lineHeight: 1.5 }}>
                  {mat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lesson Timeline Header */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)' }}>
            Lesson Timeline
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Structured minute-by-minute pacing. Click any phase to expand or collapse details.
          </p>
        </div>

        {/* Visually Attractive Timeline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
          marginBottom: '1.75rem'
        }}>
          {(plan.timeline || []).map((step, idx) => {
            const isExpanded = expandedTimeline[step.id];
            const phaseColors = {
              HOOK: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
              EXPLANATION: { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
              ACTIVITY: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
              DISCUSSION: { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
              ASSESSMENT: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' }
            };
            const currentTheme = phaseColors[step.phase] || phaseColors.HOOK;

            return (
              <div
                key={step.id || idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  transition: 'box-shadow var(--transition-fast)'
                }}
              >
                {/* Timeline Step Header */}
                <div
                  onClick={() => toggleTimelineItem(step.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.875rem 1.25rem',
                    cursor: 'pointer',
                    backgroundColor: isExpanded ? 'var(--bg-subtle)' : '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      backgroundColor: '#FFFFFF',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)'
                    }}>
                      {step.time}
                    </span>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      backgroundColor: currentTheme.bg,
                      color: currentTheme.text,
                      border: `1px solid ${currentTheme.border}`
                    }}>
                      {step.phase}
                    </span>

                    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>
                      {step.title}
                    </span>
                  </div>

                  <div style={{ color: 'var(--text-muted)' }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Timeline Step Body */}
                {isExpanded && (
                  <div className="animate-fade-in" style={{
                    padding: '1rem 1.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.875rem',
                    lineHeight: 1.55
                  }}>
                    <p style={{ color: 'var(--text)', marginBottom: '0.75rem' }}>
                      {step.description}
                    </p>

                    {step.tip && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        backgroundColor: '#FFFBEB',
                        border: '1px solid #FDE68A',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '8px',
                        fontSize: '0.8125rem',
                        color: '#92400E'
                      }}>
                        <Lightbulb size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Teacher Tip:</strong> {step.tip}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assessment & Homework Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
              Assessment Strategy
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {plan.assessment}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
              Homework / Extension
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {plan.homework}
            </p>
          </div>
        </div>
      </EditableSection>

      {/* Google Docs Export Feedback Modal */}
      {createdDoc && (
        <Modal
          isOpen={Boolean(createdDoc)}
          onClose={() => setCreatedDoc(null)}
          title="Google Doc Created! 📘"
          subtitle="Your lesson plan is formatted and ready in Google Docs."
          maxWidth="500px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem'
            }}>
              <CheckCircle2 size={24} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)' }}>
                  {createdDoc.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Synced to connected Google Drive folder: ClassFlow Lessons
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setCreatedDoc(null)}
                className="btn btn-secondary"
              >
                Done
              </button>
              <a
                href={createdDoc.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>Open in Google Docs</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
