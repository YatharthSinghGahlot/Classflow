import React, { useState } from 'react';
import Modal from '../common/Modal';
import { FileText, Check, Loader2, CheckCircle2, Sparkles, BookOpen, FileSpreadsheet } from 'lucide-react';
import { useLesson } from '../../context/LessonContext';

export default function ResourceCreationModal({ isOpen, onClose, onComplete }) {
  const { handleCreateGoogleResources, googleResourceStatus, googleProgress } = useLesson();

  const [selections, setSelections] = useState({
    lessonPlan: true,
    worksheet: true,
    quiz: true
  });

  const isCreating = googleResourceStatus === 'creating';

  const toggle = (key) => {
    if (isCreating) return;
    setSelections({
      ...selections,
      [key]: !selections[key]
    });
  };

  const handleStartCreation = () => {
    handleCreateGoogleResources(selections, () => {
      if (onComplete) {
        onComplete();
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isCreating ? () => {} : onClose}
      title={isCreating ? "Creating your resources..." : "Create your Google Workspace resources"}
      subtitle={isCreating ? "Exporting structured content to Google Docs & Google Forms" : "Select which assets you would like to generate in Google Workspace"}
      maxWidth="500px"
    >
      {!isCreating ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Option 1: Lesson Plan */}
          <div
            onClick={() => toggle('lessonPlan')}
            className="checkbox-card"
            style={{
              borderColor: selections.lessonPlan ? 'var(--primary)' : 'var(--border)',
              backgroundColor: selections.lessonPlan ? 'var(--primary-light)' : '#FFFFFF'
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
              color: 'var(--primary)'
            }}>
              <BookOpen size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                  Lesson Plan
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  → Google Docs
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Formatted document with objectives, materials, and lesson timeline.
              </p>
            </div>
          </div>

          {/* Option 2: Worksheet */}
          <div
            onClick={() => toggle('worksheet')}
            className="checkbox-card"
            style={{
              borderColor: selections.worksheet ? 'var(--primary)' : 'var(--border)',
              backgroundColor: selections.worksheet ? 'var(--primary-light)' : '#FFFFFF'
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
              color: 'var(--primary)'
            }}>
              <FileText size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                  Worksheet
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  → Google Docs
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Student handout with write-in lines, instructions, and practice questions.
              </p>
            </div>
          </div>

          {/* Option 3: Quiz */}
          <div
            onClick={() => toggle('quiz')}
            className="checkbox-card"
            style={{
              borderColor: selections.quiz ? 'var(--secondary)' : 'var(--border)',
              backgroundColor: selections.quiz ? 'var(--secondary-light)' : '#FFFFFF'
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
              color: 'var(--secondary)'
            }}>
              <FileSpreadsheet size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)' }}>
                  Quiz
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>
                  → Google Forms
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Self-grading 5-question assessment with answer key programmed.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStartCreation}
              className="btn btn-primary"
            >
              <Sparkles size={16} />
              <span>Create Resources</span>
            </button>
          </div>
        </div>
      ) : (
        /* Animated Progress Checklist */
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
            textAlign: 'left',
            backgroundColor: 'var(--bg)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            {/* Step 1: Lesson Plan */}
            {selections.lessonPlan && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                {googleProgress.completedItems?.includes('Lesson Plan (Google Docs)') ? (
                  <CheckCircle2 size={18} color="var(--success)" />
                ) : (
                  <Loader2 size={16} color="var(--primary)" className="animate-spin" />
                )}
                <span>
                  {googleProgress.completedItems?.includes('Lesson Plan (Google Docs)')
                    ? "Lesson Plan created in Google Docs"
                    : "Creating Lesson Plan in Google Docs..."}
                </span>
              </div>
            )}

            {/* Step 2: Worksheet */}
            {selections.worksheet && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                {googleProgress.completedItems?.includes('Worksheet (Google Docs)') ? (
                  <CheckCircle2 size={18} color="var(--success)" />
                ) : googleProgress.completedItems?.includes('Lesson Plan (Google Docs)') ? (
                  <Loader2 size={16} color="var(--primary)" className="animate-spin" />
                ) : (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1', marginLeft: '5px' }} />
                )}
                <span>
                  {googleProgress.completedItems?.includes('Worksheet (Google Docs)')
                    ? "Worksheet created in Google Docs"
                    : "Creating Worksheet in Google Docs..."}
                </span>
              </div>
            )}

            {/* Step 3: Quiz */}
            {selections.quiz && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                {googleProgress.completedItems?.includes('Quiz (Google Forms)') ? (
                  <CheckCircle2 size={18} color="var(--success)" />
                ) : googleProgress.completedItems?.includes('Worksheet (Google Docs)') ? (
                  <Loader2 size={16} color="var(--primary)" className="animate-spin" />
                ) : (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1', marginLeft: '5px' }} />
                )}
                <span>
                  {googleProgress.completedItems?.includes('Quiz (Google Forms)')
                    ? "Quiz created in Google Forms"
                    : "Building 5-question Google Form..."}
                </span>
              </div>
            )}
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Connecting to Google Workspace Drive & Form builders...
          </p>
        </div>
      )}
    </Modal>
  );
}
