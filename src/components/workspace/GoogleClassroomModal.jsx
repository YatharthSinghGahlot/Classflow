import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { GraduationCap, CheckCircle2, ExternalLink, Calendar, Award, Loader2, Sparkles, FileText, Check, FileSpreadsheet } from 'lucide-react';
import { useLesson } from '../../context/LessonContext';
import { api } from '../../services/api';

export default function GoogleClassroomModal({ isOpen, onClose }) {
  const { currentLesson, handlePublishToClassroom } = useLesson();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [postType, setPostType] = useState('ASSIGNMENT'); // 'ASSIGNMENT' | 'COURSE_WORK_MATERIAL' | 'ANNOUNCEMENT'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(Date.now() + 86400000 * 3);
    return d.toISOString().slice(0, 10);
  });
  const [points, setPoints] = useState(100);
  const [attachedItems, setAttachedItems] = useState({
    worksheet: true,
    quiz: true,
    lessonPlan: false
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const topic = currentLesson?.meta?.topic || 'Lesson';
      setTitle(`${topic} - Practice Handout & Quiz`);
      setDescription(`Please complete the attached ${topic} practice worksheet and take the self-grading quiz before the due date.`);
      setPublishResult(null);

      api.getClassroomCourses().then(res => {
        setCourses(res);
        if (res.length > 0) {
          setSelectedCourse(res[0].id);
        }
      });
    }
  }, [isOpen, currentLesson]);

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      const result = await handlePublishToClassroom(selectedCourse, {
        title,
        description,
        dueDate,
        points: Number(points),
        postType,
        attachedItems
      });
      setPublishResult(result);
    } catch (err) {
      console.error('Publish error', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const toggleAttach = (key) => {
    setAttachedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isPublishing ? () => {} : onClose}
      title={publishResult ? "Published to Google Classroom!" : "Publish to Google Classroom"}
      subtitle={publishResult ? "Your classwork and attachments are now live for your students." : "Directly assign worksheets, lesson plans, and self-grading quizzes to your class."}
      maxWidth="560px"
    >
      {publishResult ? (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            backgroundColor: 'var(--success-light)',
            border: '1px solid var(--success-border)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.875rem'
          }}>
            <CheckCircle2 size={24} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
                Coursework Assigned Successfully
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                <strong>{publishResult.title}</strong> has been posted to your Google Classroom stream with all linked materials.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
              Attached Classroom Materials:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {publishResult.materials?.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                  <Check size={14} color="var(--success)" />
                  <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                    {m.title} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
            <a
              href={publishResult.classroomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <span>Open in Classroom</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Course Select */}
          <div className="form-group">
            <label className="form-label" htmlFor="classroom-course">
              <span>Select Google Classroom Course</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required</span>
            </label>
            <select
              id="classroom-course"
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.section} • {c.studentCount} students)
                </option>
              ))}
            </select>
          </div>

          {/* Post Type Selector */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>
              Post Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { id: 'ASSIGNMENT', label: 'Assignment' },
                { id: 'COURSE_WORK_MATERIAL', label: 'Study Material' },
                { id: 'ANNOUNCEMENT', label: 'Announcement' }
              ].map(t => {
                const active = postType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPostType(t.id)}
                    className="btn btn-sm"
                    style={{
                      justifyContent: 'center',
                      backgroundColor: active ? 'var(--primary-light)' : '#FFFFFF',
                      color: active ? 'var(--primary)' : 'var(--text)',
                      borderColor: active ? 'var(--primary)' : 'var(--border)',
                      fontWeight: active ? 700 : 500
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="assignment-title">
              <span>Title</span>
            </label>
            <input
              id="assignment-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Instructions / Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="assignment-desc">
              <span>Instructions / Notes</span>
            </label>
            <textarea
              id="assignment-desc"
              className="form-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Due date & Points row (if assignment) */}
          {postType === 'ASSIGNMENT' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="assignment-due">
                  <span>Due Date</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Calendar size={16} />
                  </span>
                  <input
                    id="assignment-due"
                    type="date"
                    className="form-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="assignment-pts">
                  <span>Points</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Award size={16} />
                  </span>
                  <input
                    id="assignment-pts"
                    type="number"
                    min="0"
                    max="1000"
                    className="form-input"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Attached Materials Checkboxes */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>
              Attached Google Workspace Assets
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div
                onClick={() => toggleAttach('worksheet')}
                className="checkbox-card"
                style={{
                  padding: '0.625rem 0.875rem',
                  backgroundColor: attachedItems.worksheet ? 'var(--primary-light)' : '#FFFFFF',
                  borderColor: attachedItems.worksheet ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <FileText size={18} color="var(--primary)" />
                <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  Student Practice Worksheet (Google Doc)
                </div>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: `1.5px solid ${attachedItems.worksheet ? 'var(--primary)' : '#CBD5E1'}`,
                  backgroundColor: attachedItems.worksheet ? 'var(--primary)' : '#FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {attachedItems.worksheet && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              <div
                onClick={() => toggleAttach('quiz')}
                className="checkbox-card"
                style={{
                  padding: '0.625rem 0.875rem',
                  backgroundColor: attachedItems.quiz ? 'var(--secondary-light)' : '#FFFFFF',
                  borderColor: attachedItems.quiz ? 'var(--secondary)' : 'var(--border)'
                }}
              >
                <FileSpreadsheet size={18} color="var(--secondary)" />
                <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  Self-Grading Quiz Assessment (Google Form)
                </div>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: `1.5px solid ${attachedItems.quiz ? 'var(--secondary)' : '#CBD5E1'}`,
                  backgroundColor: attachedItems.quiz ? 'var(--secondary)' : '#FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {attachedItems.quiz && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              <div
                onClick={() => toggleAttach('lessonPlan')}
                className="checkbox-card"
                style={{
                  padding: '0.625rem 0.875rem',
                  backgroundColor: attachedItems.lessonPlan ? 'var(--primary-light)' : '#FFFFFF',
                  borderColor: attachedItems.lessonPlan ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <div style={{ fontSize: '1.125rem' }}>📘</div>
                <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  Teacher Lesson Plan (Google Doc - Optional for co-teachers)
                </div>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: `1.5px solid ${attachedItems.lessonPlan ? 'var(--primary)' : '#CBD5E1'}`,
                  backgroundColor: attachedItems.lessonPlan ? 'var(--primary)' : '#FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {attachedItems.lessonPlan && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isPublishing}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing || !title.trim()}
              className="btn btn-primary"
            >
              {isPublishing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Publishing to Classroom...</span>
                </>
              ) : (
                <>
                  <GraduationCap size={16} />
                  <span>Publish to Classroom</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
