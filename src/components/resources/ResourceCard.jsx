import React, { useState } from 'react';
import { ExternalLink, Copy, Check, FileText, CheckCircle2, FileSpreadsheet, BookOpen } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ResourceCard({
  type,
  emoji,
  title,
  platform,
  description,
  url,
  badgeColor,
  onOpenPreview
}) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    showToast('Link copied to clipboard', 'success');
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const isDocs = platform.toLowerCase().includes('doc');
  const IconComponent = type === 'quiz' ? FileSpreadsheet : (type === 'lessonPlan' ? BookOpen : FileText);

  return (
    <div className="card resource-card animate-fade-in" style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '1.25rem',
      boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)',
      transition: 'all var(--transition-base)'
    }}>
      <div>
        {/* Card Header Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: isDocs ? 'var(--primary-light)' : 'var(--secondary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDocs ? 'var(--primary)' : 'var(--secondary)'
          }}>
            <IconComponent size={22} />
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px',
            backgroundColor: isDocs ? '#EFF6FF' : '#EEF2FF',
            color: isDocs ? '#2563EB' : '#4F46E5',
            border: `1px solid ${isDocs ? '#BFDBFE' : '#C7D2FE'}`
          }}>
            {platform}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <button
          type="button"
          onClick={() => onOpenPreview({ title, platform, url, type })}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>Open {title.split(' - ')[1] || title}</span>
          <ExternalLink size={16} />
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
