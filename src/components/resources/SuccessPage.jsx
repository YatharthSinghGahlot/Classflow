import React, { useState } from 'react';
import ResourceCard from './ResourceCard';
import GooglePreviewModal from './GooglePreviewModal';
import { useLesson } from '../../context/LessonContext';
import { ArrowLeft, PlusCircle, CheckCircle, Sparkles, Layers } from 'lucide-react';

export default function SuccessPage({ navigate }) {
  const { currentLesson, createdGoogleResources } = useLesson();
  const [activePreview, setActivePreview] = useState(null);

  const topicSlug = encodeURIComponent((currentLesson?.meta?.topic || 'photosynthesis').toLowerCase().replace(/\s+/g, '-'));

  // Default fallback resources if visited directly
  const resources = createdGoogleResources || {
    lessonPlan: {
      title: `${currentLesson?.meta?.topic || 'Photosynthesis'} - Lesson Plan`,
      platform: "Google Docs",
      url: `https://docs.google.com/document/d/demo-teachai-lesson-${topicSlug}`,
      id: "doc-1"
    },
    worksheet: {
      title: `${currentLesson?.meta?.topic || 'Photosynthesis'} - Student Worksheet`,
      platform: "Google Docs",
      url: `https://docs.google.com/document/d/demo-teachai-worksheet-${topicSlug}`,
      id: "doc-2"
    },
    quiz: {
      title: `${currentLesson?.meta?.topic || 'Photosynthesis'} - 5-Question Quiz`,
      platform: "Google Forms",
      url: `https://forms.google.com/d/e/demo-teachai-form-${topicSlug}/viewform`,
      id: "form-1"
    }
  };

  return (
    <div className="success-page animate-fade-in" style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Celebration Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--success-light)',
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto'
        }}>
          <CheckCircle size={28} />
        </div>

        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '0.5rem'
        }}>
          Your lesson is ready
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-muted)' }}>
          Your classroom resources have been created and synced with Google Workspace.
        </p>
      </div>

      {/* 3 Large Resource Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {/* Card 1: Lesson Plan */}
        <ResourceCard
          type="lessonPlan"
          title={resources.lessonPlan.title}
          platform="Google Docs"
          description="Complete teacher lesson plan formatted for direct classroom instruction or sharing with substitutes."
          url={resources.lessonPlan.url}
          onOpenPreview={(res) => setActivePreview(res)}
        />

        {/* Card 2: Worksheet */}
        <ResourceCard
          type="worksheet"
          title={resources.worksheet.title}
          platform="Google Docs"
          description="Student practice worksheet with clean fill-in lines and multiple-choice questions ready to print or assign in Classroom."
          url={resources.worksheet.url}
          onOpenPreview={(res) => setActivePreview(res)}
        />

        {/* Card 3: Quiz */}
        <ResourceCard
          type="quiz"
          title={resources.quiz.title}
          platform="Google Forms"
          description="Automated 5-question multiple choice quiz with answer key and automated feedback pre-configured."
          url={resources.quiz.url}
          onOpenPreview={(res) => setActivePreview(res)}
        />
      </div>

      {/* Bottom Navigation CTAs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border)'
      }}>
        <button
          type="button"
          onClick={() => navigate('/workspace')}
          className="btn btn-secondary btn-lg"
        >
          <ArrowLeft size={18} />
          <span>Back to Workspace</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/create')}
          className="btn btn-primary btn-lg"
        >
          <PlusCircle size={18} />
          <span>Create Another Lesson</span>
        </button>
      </div>

      {/* Simulated Preview Modal */}
      {activePreview && (
        <GooglePreviewModal
          isOpen={Boolean(activePreview)}
          onClose={() => setActivePreview(null)}
          resource={activePreview}
          lessonPackage={currentLesson}
        />
      )}
    </div>
  );
}
