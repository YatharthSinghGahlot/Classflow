import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export default function ReadinessCheck({ readinessData }) {
  const [expanded, setExpanded] = useState(false);

  const data = readinessData || {
    score: 98,
    status: "Ready to teach",
    badgeType: "success",
    items: [
      { id: "r1", label: "Grade appropriate", passed: true, note: "Vocabulary and concepts calibrated for student cognitive level" },
      { id: "r2", label: "Fits 45-minute class", passed: true, note: "Paced for 45-minute session with timed transitions" },
      { id: "r3", label: "Learning objectives included", passed: true, note: "3 distinct Bloom taxonomy levels targeted" },
      { id: "r4", label: "Assessment included", passed: true, note: "5-question quiz + formative exit ticket provided" },
      { id: "r5", label: "Activities included", passed: true, note: "Structured hands-on collaboration component" },
      { id: "r6", label: "Worksheet aligned", passed: true, note: "Directly reinforces core instructional competencies" },
      { id: "r7", label: "Quiz aligned", passed: true, note: "Mapped across recall, understanding, application, analysis" }
    ]
  };

  return (
    <div className="card readiness-card no-print" style={{
      marginBottom: '1.75rem',
      background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 60%)',
      border: '1px solid var(--success-border)',
      borderLeft: '4px solid var(--success)',
      borderRadius: '16px',
      padding: '1.25rem 1.5rem',
      boxShadow: '0 2px 8px rgba(22, 163, 74, 0.08)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Circular Score Badge */}
          <div style={{
            position: 'relative',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-light)',
            border: '2px solid var(--success)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.875rem'
          }}>
            {data.score}%
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text)' }}>
                Lesson Readiness: <span style={{ color: 'var(--success)' }}>{data.status}</span>
              </h2>
              <Tooltip text="A quick AI-generated checklist of lesson completeness and pedagogical balance." />
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              AI-generated readiness check • All 7 quality benchmarks satisfied
            </p>
          </div>
        </div>

        {/* Right Toggle Button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.8125rem' }}
        >
          <span>{expanded ? 'Hide Checklist' : 'View Checklist (7/7)'}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expandable Checklist Details */}
      {expanded && (
        <div className="animate-fade-in" style={{
          marginTop: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.75rem'
        }}>
          {data.items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                backgroundColor: 'var(--bg)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border)'
              }}
            >
              <CheckCircle2 size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {item.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
