import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children || (
        <HelpCircle 
          size={14} 
          style={{ color: 'var(--text-muted)', cursor: 'help', marginLeft: '4px' }} 
        />
      )}
      {visible && (
        <span
          role="tooltip"
          className="animate-fade-in"
          style={{
            position: 'absolute',
            bottom: '125%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            padding: '0.375rem 0.625rem',
            borderRadius: '6px',
            whiteSpace: 'normal',
            width: 'max-content',
            maxWidth: '220px',
            lineHeight: 1.3,
            zIndex: 100,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none',
            textAlign: 'center'
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
