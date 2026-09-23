import React, { useState, useEffect } from 'react';
import { storage } from '../../services/storage';
import { useLesson } from '../../context/LessonContext';
import { BookOpen, Clock, Compass, PlusCircle, Trash2, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import EmptyState from '../common/EmptyState';

export default function MyLessonsPage({ navigate }) {
  const { loadLessonFromHistory } = useLesson();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    setLessons(storage.getLessons());
  }, []);

  const handleOpen = (item) => {
    loadLessonFromHistory(item, (route) => navigate(route));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updated = storage.deleteLesson(id);
    setLessons(updated);
  };

  return (
    <div className="history-page animate-fade-in" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
            My Lessons
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Previously generated lesson plans and classroom resource packages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/create')}
          className="btn btn-primary"
        >
          <PlusCircle size={16} />
          <span>New Lesson</span>
        </button>
      </div>

      {/* Grid or Empty State */}
      {lessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lessons yet"
          description="Create your first AI-powered lesson and your classroom workspace will appear here."
          actionLabel="Create a Lesson"
          onAction={() => navigate('/create')}
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {lessons.map(item => (
            <div
              key={item.id}
              onClick={() => handleOpen(item)}
              className="card lesson-card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      backgroundColor: 'var(--primary-light)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--primary-border)'
                    }}>
                      {item.subject}
                    </span>

                    {item.driveSynced && (
                      <span 
                        title="Synced to Google Drive"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: 'var(--success)',
                          backgroundColor: 'var(--success-light)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--success-border)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle2 size={12} />
                        Drive
                      </span>
                    )}
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    Created: {item.createdAt}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.375rem' }}>
                  {item.topic}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {item.grade} • {item.subject}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {item.duration} class duration
                </p>
              </div>

              {/* Bottom bar with Open action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                marginTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <button
                  type="button"
                  onClick={() => handleOpen(item)}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.375rem 0.875rem' }}
                >
                  <span>Open</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDelete(e, item.id)}
                  className="btn btn-tertiary btn-sm"
                  style={{ color: '#94A3B8', padding: '4px' }}
                  title="Delete lesson"
                  aria-label="Delete lesson"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
