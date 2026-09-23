import React from 'react';
import { BookOpen, Sparkles, Clock, GraduationCap, Compass } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export const SUBJECTS = [
  "Science",
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Social Studies",
  "History",
  "Geography",
  "Other"
];

export const GRADES = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6",
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"
];

export const DURATIONS = [
  "30 minutes",
  "45 minutes",
  "60 minutes",
  "90 minutes",
  "120 minutes"
];

export default function LessonForm({ 
  topic, setTopic, 
  subject, setSubject, 
  grade, setGrade, 
  duration, setDuration,
  onQuickFill
}) {
  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>
            Create a Lesson
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Tell us what you're teaching and we'll build the classroom package.
          </p>
        </div>

        {/* Quick Fill Demo CTA */}
        <button
          type="button"
          onClick={onQuickFill}
          className="btn btn-secondary btn-sm"
          style={{
            borderColor: 'var(--primary-border)',
            color: 'var(--primary)',
            backgroundColor: 'var(--primary-light)'
          }}
        >
          <Sparkles size={15} />
          <span>Quick Fill Demo (Photosynthesis)</span>
        </button>
      </div>

      {/* INPUT 1: TOPIC */}
      <div className="form-group">
        <label className="form-label" htmlFor="lesson-topic">
          <span>What are you teaching?</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>
            Required
          </span>
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <BookOpen size={18} />
          </span>
          <input
            id="lesson-topic"
            type="text"
            className="form-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis"
            required
            autoFocus
          />
        </div>
        <span className="form-hint">
          Enter any core concept, historical event, book, or scientific principle.
        </span>
      </div>

      {/* 3-Column Inputs: Subject, Grade, Duration */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* INPUT 2: SUBJECT */}
        <div className="form-group">
          <label className="form-label" htmlFor="lesson-subject">
            <span>Subject</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Compass size={18} />
            </span>
            <select
              id="lesson-subject"
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ paddingLeft: '2.625rem' }}
            >
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* INPUT 3: GRADE */}
        <div className="form-group">
          <label className="form-label" htmlFor="lesson-grade">
            <span>Grade Level</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <GraduationCap size={18} />
            </span>
            <select
              id="lesson-grade"
              className="form-select"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{ paddingLeft: '2.625rem' }}
            >
              {GRADES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* INPUT 4: CLASS DURATION */}
        <div className="form-group">
          <label className="form-label" htmlFor="lesson-duration">
            <span>Class Duration</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Clock size={18} />
            </span>
            <select
              id="lesson-duration"
              className="form-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ paddingLeft: '2.625rem' }}
            >
              {DURATIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
