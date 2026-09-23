import React from 'react';
import { Sliders, Sparkles, Printer, ChevronRight, Tag, GraduationCap, CheckCircle2, HardDrive } from 'lucide-react';
import { useLesson } from '../../context/LessonContext';

const SUBJECT_COLORS = {
  Science:          { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  Mathematics:      { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
  English:          { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  Physics:          { bg: '#EEF2FF', color: '#4F46E5', border: '#C7D2FE' },
  Chemistry:        { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
  Biology:          { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  'Computer Science': { bg: '#F8FAFC', color: '#0F172A', border: '#CBD5E1' },
  'Social Studies': { bg: '#FDF2F8', color: '#9333EA', border: '#E9D5FF' },
  History:          { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
  Geography:        { bg: '#ECFEFF', color: '#0891B2', border: '#A5F3FC' },
  Other:            { bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' },
};

export default function WorkspaceHeader({ lessonPackage, onEditInputs, onCreateGoogleResources }) {
  const { driveSyncStatus, googleAuthState, setIsClassroomModalOpen, setIsAuthModalOpen } = useLesson();

  const meta = lessonPackage?.meta || {
    topic: 'Photosynthesis',
    grade: 'Grade 8',
    subject: 'Science',
    duration: '45 minutes',
  };

  const subjectStyle = SUBJECT_COLORS[meta.subject] || SUBJECT_COLORS.Other;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="workspace-header no-print"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        marginBottom: '1.75rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Left: Lesson Metadata */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
          <span
            className="badge badge-primary"
            style={{ fontSize: '0.6875rem', letterSpacing: '0.04em' }}
          >
            <Sparkles size={11} />
            Generated Package
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: subjectStyle.color,
              backgroundColor: subjectStyle.bg,
              border: `1px solid ${subjectStyle.border}`,
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            {meta.subject}
          </span>
          
          {/* Google Drive Status Indicator */}
          {googleAuthState?.isConnected ? (
            <a
              href={googleAuthState.user?.folderUrl || "https://drive.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              title={`Saved to connected Google Drive folder (${googleAuthState.user?.folderName || 'ClassFlow Lessons'})`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#15803D',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                padding: '2px 8px',
                borderRadius: '6px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <CheckCircle2 size={12} color="#16A34A" />
              <span>Saved to Google Drive</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-10)',
                border: '1px solid var(--color-primary-40)',
                padding: '2px 8px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <HardDrive size={11} />
              <span>Connect Gmail / Drive</span>
            </button>
          )}
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
            fontWeight: 900,
            color: 'var(--text)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            marginBottom: '0.25rem',
          }}
        >
          {meta.topic}
        </h1>

        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {meta.grade} &bull; {meta.subject} &bull; {meta.duration}
        </p>
      </div>

      {/* Right: Action CTAs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setIsClassroomModalOpen(true)}
          className="btn btn-secondary btn-sm"
          title="Publish assignment directly to Google Classroom"
          style={{ color: '#0F766E', backgroundColor: '#F0FDFA', borderColor: '#CCFBF1' }}
        >
          <GraduationCap size={15} color="#0D9488" />
          <span>Publish to Classroom</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="btn btn-secondary btn-sm"
          title="Print current resource"
          aria-label="Print"
        >
          <Printer size={15} />
          <span>Print</span>
        </button>

        <button
          type="button"
          onClick={onEditInputs}
          className="btn btn-secondary btn-sm"
        >
          <Sliders size={15} />
          <span>Edit Inputs</span>
        </button>

        <button
          type="button"
          onClick={onCreateGoogleResources}
          className="btn btn-primary"
          style={{ boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.3)' }}
        >
          <Sparkles size={16} />
          <span>Google Workspace</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
