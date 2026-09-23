import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, Check } from 'lucide-react';

export const TEACHING_STYLES = [
  "Interactive",
  "Lecture",
  "Activity-based",
  "Discussion-based",
  "Mixed"
];

export const DIFFICULTIES = [
  "Support",
  "Standard",
  "Advanced"
];

export const PREFERENCES = [
  "Visual",
  "Discussion",
  "Hands-on",
  "Reading",
  "Writing"
];

export const CLASS_TYPES = [
  "Individual",
  "Small Group",
  "Whole Class",
  "Mixed"
];

export default function AdvancedOptions({
  teachingStyle, setTeachingStyle,
  difficulty, setDifficulty,
  learningPreferences, setLearningPreferences,
  classType, setClassType
}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePreference = (pref) => {
    if (learningPreferences.includes(pref)) {
      setLearningPreferences(learningPreferences.filter(p => p !== pref));
    } else {
      setLearningPreferences([...learningPreferences, pref]);
    }
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: 'var(--text)',
          textAlign: 'left'
        }}
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--bg-subtle)',
            color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sliders size={18} />
          </div>
          <div>
            <span style={{ fontSize: '1rem', fontWeight: 700 }}>
              {isOpen ? 'Advanced Options' : '+ Advanced Options'}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              (Teaching style, preferences, class grouping)
            </span>
          </div>
        </div>

        <div style={{
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center'
        }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="animate-fade-in" style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* 1. Teaching Style Radio Group */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Teaching Style
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem'
            }}>
              {TEACHING_STYLES.map(style => {
                const isSelected = teachingStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTeachingStyle(style)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      color: isSelected ? 'var(--primary)' : 'var(--text)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{style}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Difficulty Radio Group */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Difficulty Level
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem'
            }}>
              {DIFFICULTIES.map(diff => {
                const isSelected = difficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      color: isSelected ? 'var(--primary)' : 'var(--text)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{diff}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Learning Preferences Checkboxes */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Learning Preferences
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem'
            }}>
              {PREFERENCES.map(pref => {
                const isChecked = learningPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePreference(pref)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: isChecked ? 'var(--secondary-light)' : '#FFFFFF',
                      color: isChecked ? 'var(--secondary)' : 'var(--text)',
                      borderColor: isChecked ? 'var(--secondary)' : 'var(--border)',
                      fontWeight: isChecked ? 600 : 400
                    }}
                  >
                    {isChecked && <Check size={14} />}
                    <span>{pref}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Class Type Radio Group */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>
              Class Type
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem'
            }}>
              {CLASS_TYPES.map(type => {
                const isSelected = classType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setClassType(type)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      color: isSelected ? 'var(--primary)' : 'var(--text)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{type}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
