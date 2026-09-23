import React, { useState } from 'react';
import { Edit3, Check, X, Sparkles } from 'lucide-react';

export default function EditableSection({
  title,
  subtitle,
  children,
  editValue,
  onSave,
  extraActions
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(editValue || '');

  const handleStartEdit = () => {
    setTempValue(editValue || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(tempValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="card editable-section animate-fade-in" style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '1.75rem',
      marginBottom: '1.5rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {extraActions}

          {!isEditing ? (
            <button
              type="button"
              onClick={handleStartEdit}
              className="btn btn-secondary btn-sm"
            >
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-success btn-sm"
              >
                <Check size={14} />
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary btn-sm"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body Content / Inline Text Editor */}
      {isEditing ? (
        <div className="animate-fade-in">
          <textarea
            className="form-textarea"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            rows={10}
            style={{
              width: '100%',
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              padding: '1rem'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="btn btn-primary btn-sm">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}
