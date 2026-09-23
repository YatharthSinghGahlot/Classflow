import React from 'react';
import Modal from '../common/Modal';
import { ExternalLink, Copy, Check, Printer, FileText, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function GooglePreviewModal({ isOpen, onClose, resource, lessonPackage }) {
  const { showToast } = useToast();
  if (!resource) return null;

  const isForm = resource.platform.includes('Forms');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resource.title}
      subtitle={`${resource.platform} • Real-time Workspace Preview`}
      maxWidth="780px"
    >
      {/* Workspace App Toolbar Simulation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.625rem 0.875rem',
        backgroundColor: '#F1F5F9',
        borderRadius: '8px',
        marginBottom: '1.25rem',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', fontWeight: 500 }}>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Tools</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            backgroundColor: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            color: 'var(--success)',
            fontWeight: 600
          }}>
            Saved to Drive
          </span>
        </div>
      </div>

      {/* Document Sheet Simulation */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2.5rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)',
        maxHeight: '480px',
        overflowY: 'auto',
        fontFamily: isForm ? 'var(--font-sans)' : 'Georgia, serif',
        lineHeight: 1.6
      }}>
        {!isForm ? (
          /* Google Doc Simulation */
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>
              {resource.type === 'lessonPlan' ? lessonPackage?.lessonPlan?.title : lessonPackage?.worksheet?.title}
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>
              {lessonPackage?.meta?.topic} • {lessonPackage?.meta?.grade} • {lessonPackage?.meta?.subject} • {lessonPackage?.meta?.duration}
            </p>

            {resource.type === 'lessonPlan' ? (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>
                  Overview & Objectives
                </h3>
                <p style={{ marginBottom: '1rem' }}>{lessonPackage?.lessonPlan?.overview}</p>
                <ol style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                  {(lessonPackage?.lessonPlan?.objectives || []).map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ol>

                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>
                  Lesson Timeline & Activities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(lessonPackage?.lessonPlan?.timeline || []).map((t, i) => (
                    <div key={i} style={{ borderLeft: '3px solid #2563EB', paddingLeft: '0.75rem' }}>
                      <strong>{t.time} [{t.phase}]: {t.title}</strong>
                      <p style={{ fontSize: '0.875rem', marginTop: '2px' }}>{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                  {lessonPackage?.worksheet?.instructions}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {(lessonPackage?.worksheet?.questions || []).map((q, i) => (
                    <div key={i}>
                      <p style={{ fontWeight: 600 }}>{q.prompt}</p>
                      {q.equation && (
                        <div style={{ padding: '0.5rem', backgroundColor: '#F8FAFC', borderRadius: '4px', margin: '0.5rem 0' }}>
                          {q.equation}
                        </div>
                      )}
                      {q.options && (
                        <ul style={{ listStyle: 'none', paddingLeft: '0.5rem' }}>
                          {q.options.map((opt, oI) => (
                            <li key={oI}>○ {opt}</li>
                          ))}
                        </ul>
                      )}
                      {q.lines && !q.options && (
                        <div style={{ borderBottom: '1px dashed #CBD5E1', height: '24px', marginTop: '0.5rem' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Google Form Simulation */
          <div>
            <div style={{
              backgroundColor: '#673AB7',
              color: '#FFFFFF',
              padding: '1.25rem',
              borderRadius: '8px 8px 0 0',
              marginBottom: '1rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                {lessonPackage?.quiz?.title || "Classroom Mastery Assessment"}
              </h2>
              <p style={{ fontSize: '0.8125rem', opacity: 0.9, marginTop: '4px' }}>
                Total Points: 5 • Automated Grading Enabled
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(lessonPackage?.quiz?.questions || []).map((q) => (
                <div
                  key={q.id}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.75rem' }}>
                    {q.id}. {q.question}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options.map((opt, idx) => (
                      <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <input type="radio" name={`form-q-${q.id}`} disabled />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link & Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
          {resource.url}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(resource.url);
              showToast('Link copied to clipboard', 'success');
            }}
            className="btn btn-secondary btn-sm"
          >
            <Copy size={14} />
            <span>Copy Link</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
