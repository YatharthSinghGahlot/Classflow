import React from 'react';
import {
  Sliders,
  Sparkles,
  FileText,
  CheckCircle,
  ArrowRight,
  Layers,
  BookOpen,
  Brain,
  Mic,
  GraduationCap,
  Palette,
  Ticket,
  FilePen,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Sliders,
    color: 'var(--primary)',
    bg: 'var(--primary-light)',
    border: 'var(--primary-border)',
    title: 'Enter Your Lesson Needs',
    body: 'Topic, grade, subject, duration. Optional fine-tuning for teaching style, learning preferences, and class type.',
  },
  {
    num: '02',
    icon: Sparkles,
    color: 'var(--secondary)',
    bg: 'var(--secondary-light)',
    border: '#C7D2FE',
    title: 'AI Generates Your Package',
    body: 'Gemini 2.0 synthesizes pedagogical frameworks and produces 7 ready-to-use classroom resources with differentiated tiers.',
    highlight: true,
  },
  {
    num: '03',
    icon: Layers,
    color: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    title: 'Export to Google Workspace',
    body: 'Push lesson plans & worksheets to Google Docs and deploy your quiz as a self-grading Google Form in one click.',
  },
];

const DELIVERABLES = [
  { icon: BookOpen,  label: 'Lesson Plan',      color: '#2563EB' },
  { icon: Mic,       label: 'Teaching Script',  color: '#4F46E5' },
  { icon: FileText,  label: 'Worksheet',        color: '#0891B2' },
  { icon: Brain,     label: '5-Question Quiz',  color: '#7C3AED' },
  { icon: Sparkles,  label: 'Differentiation',  color: '#059669' },
  { icon: Palette,   label: 'Visual Aid Plan',  color: '#D97706' },
  { icon: Ticket,    label: 'Exit Ticket',      color: '#DC2626' },
  { icon: FilePen,   label: 'Catch-Up Pack',    color: '#64748B' },
];

export default function WorkflowSection({ onStartCreating, onOpenWorkspace }) {
  return (
    <section style={{ padding: '2rem 0 4.5rem 0' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
          <Sparkles size={12} />
          Workflow
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.375rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            marginBottom: '0.875rem',
          }}
        >
          From Topic to Classroom-Ready
          <br />
          <span className="gradient-text">in 3 Simple Steps</span>
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>
          Designed around the way teachers actually prepare for Monday morning.
        </p>
      </div>

      {/* 3 Steps Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}
      >
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="card card-lift"
              style={{
                position: 'relative',
                borderColor: step.highlight ? step.border : 'var(--border)',
                backgroundColor: step.highlight ? step.bg : '#FFFFFF',
              }}
            >
              {/* Step Number watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  color: step.highlight ? step.border : 'var(--border-subtle)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {step.num}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: step.highlight ? '#FFFFFF' : step.bg,
                  border: `1px solid ${step.border}`,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.125rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                }}
              >
                <Icon size={22} />
              </div>

              <h3
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 750,
                  marginBottom: '0.5rem',
                  color: step.highlight ? step.color : 'var(--text)',
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* What You Get — Deliverables Grid */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          border: '1px solid var(--primary-border)',
          borderRadius: '18px',
          padding: '2rem 2rem 2.25rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.625rem', display: 'inline-flex' }}>
            What you get
          </span>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}
          >
            8 Classroom Resources — Every Time
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {DELIVERABLES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={color} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div
        className="card"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05)',
        }}
      >
        <div style={{ flex: '1 1 320px' }}>
          <div className="badge badge-success" style={{ marginBottom: '0.625rem', display: 'inline-flex' }}>
            <GraduationCap size={12} />
            Live Demo
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            See a Photosynthesis Lesson Package
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Grade 8 · Science · 45 min. Includes a 3-tier differentiation plan, leaf stomata modeling activity, mastery quiz, and exit ticket.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenWorkspace} className="btn btn-primary">
              <Layers size={16} />
              <span>Explore Demo Workspace</span>
            </button>
            <button onClick={onStartCreating} className="btn btn-secondary">
              <span>Create My Own</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Mini readiness preview */}
        <div
          style={{
            flex: '1 1 260px',
            backgroundColor: 'var(--bg)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            maxWidth: '300px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.875rem',
              paddingBottom: '0.625rem',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)' }}>
              AI Readiness Check
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>98% Ready</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
            {[
              'Grade 8 appropriate vocabulary',
              '5-phase timed classroom timeline',
              '3 differentiated learning tiers',
              'Printable worksheet included',
              'Self-grading Google Form quiz',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={13} color="var(--success)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
