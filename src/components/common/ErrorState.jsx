import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't generate your lesson right now.", 
  onRetry, 
  onEditInputs 
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
        padding: '3rem 1.5rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--error-border)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.05)'
      }}
    >
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '12px',
        backgroundColor: 'var(--error-light)',
        color: 'var(--error)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <AlertCircle size={28} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        )}
        {onEditInputs && (
          <button onClick={onEditInputs} className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Edit Inputs</span>
          </button>
        )}
      </div>
    </div>
  );
}
