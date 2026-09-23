import React from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = BookOpen, 
  title = "No lessons yet", 
  description = "Create your first AI-powered lesson and your classroom workspace will appear here.", 
  actionLabel = "Create a Lesson", 
  onAction 
}) {
  return (
    <div 
      className="card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        backgroundColor: '#FFFFFF',
        border: '1.5px dashed var(--border)',
        borderRadius: '16px'
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: '440px', lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {description}
      </p>
      {onAction && (
        <button onClick={onAction} className="btn btn-primary">
          <PlusCircle size={18} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
