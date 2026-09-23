import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, Sparkles, BookOpen, Mic, FileText, Brain, Palette, Ticket, Layers } from 'lucide-react';

export const GENERATION_STEPS = [
  { label: 'Understanding your topic',           icon: BookOpen },
  { label: 'Designing learning objectives',      icon: Sparkles },
  { label: 'Planning classroom activities',      icon: Palette },
  { label: 'Creating teaching materials',        icon: Mic },
  { label: 'Building worksheets & quiz',         icon: FileText },
  { label: 'Assembling differentiation tiers',  icon: Brain },
  { label: 'Finalising your package',            icon: Layers },
];

const AI_MESSAGES = [
  'Synthesising pedagogical frameworks...',
  'Aligning to Bloom\'s taxonomy...',
  'Crafting differentiated tiers...',
  'Generating exit ticket questions...',
  'Building your Google Workspace assets...',
];

export default function GenerationProgress({ stepIndex = 0, currentStep = '' }) {
  const [aiMessage, setAiMessage] = useState(AI_MESSAGES[0]);
  const [msgIdx, setMsgIdx] = useState(0);

  // Cycle AI messages every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => {
        const next = (prev + 1) % AI_MESSAGES.length;
        setAiMessage(AI_MESSAGES[next]);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const pct = Math.min(100, Math.max(8, ((stepIndex + 1) / GENERATION_STEPS.length) * 100));

  return (
    <div
      className="generation-modal-overlay animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Generation in progress"
    >
      <div
        className="card animate-scale-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '2.25rem',
          boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.3)',
          textAlign: 'center',
        }}
      >
        {/* Animated sparkles icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'var(--gradient-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.375rem auto',
            boxShadow: 'var(--shadow-blue)',
          }}
        >
          <Sparkles size={30} className="animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <h3
          style={{
            fontSize: '1.375rem',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '0.375rem',
            letterSpacing: '-0.02em',
          }}
        >
          Building your lesson...
        </h3>

        {/* Cycling AI message */}
        <p
          key={aiMessage}
          className="animate-fade-in"
          style={{
            fontSize: '0.875rem',
            color: 'var(--primary)',
            fontWeight: 500,
            marginBottom: '1.75rem',
            minHeight: '1.25rem',
          }}
        >
          {aiMessage}
        </p>

        {/* Progress Checklist */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
            textAlign: 'left',
            backgroundColor: 'var(--bg)',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            marginBottom: '1.375rem',
          }}
        >
          {GENERATION_STEPS.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            const isPending = idx > stepIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  color: isCompleted
                    ? 'var(--text)'
                    : isCurrent
                    ? 'var(--primary)'
                    : 'var(--text-light)',
                  fontWeight: isCurrent ? 600 : isCompleted ? 500 : 400,
                  transition: 'color 0.25s ease',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted && <CheckCircle size={18} color="var(--success)" />}
                  {isCurrent && (
                    <Loader2 size={17} color="var(--primary)" className="animate-spin" />
                  )}
                  {isPending && (
                    <Icon
                      size={15}
                      color="#CBD5E1"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <span>{step.label}</span>

                {isCompleted && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.75rem',
                      color: 'var(--success)',
                      fontWeight: 600,
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'var(--gradient-primary)',
              width: `${pct}%`,
              borderRadius: '9999px',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-light)' }}>
          {Math.round(pct)}% complete — usually takes under 10 seconds
        </p>
      </div>
    </div>
  );
}
