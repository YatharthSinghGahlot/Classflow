import React from 'react';
import EditableSection from './EditableSection';
import { Ticket, Printer, Plus, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ExitTicketTab({ 
  exitTicket, 
  onUpdateExitTicket, 
  onRegenerateSection 
}) {
  const { showToast } = useToast();
  const et = exitTicket || { questions: [] };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToPlan = () => {
    showToast('Exit Ticket questions successfully synced with Lesson Plan assessment section!', 'success');
  };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary btn-sm"
      >
        <Printer size={14} />
        <span>Print Slips</span>
      </button>
      <button
        type="button"
        onClick={handleAddToPlan}
        className="btn btn-secondary btn-sm"
      >
        <Plus size={14} color="var(--primary)" />
        <span>Add to Lesson Plan</span>
      </button>
      <button
        type="button"
        onClick={() => onRegenerateSection('exitTicket', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate</span>
      </button>
    </div>
  );

  const editString = (et.questions || []).map(q => q.prompt).join('\n\n');

  return (
    <div className="exit-ticket-tab animate-fade-in">
      <EditableSection
        title={et.title || "2-Minute Exit Ticket"}
        subtitle={et.subtitle || "Quick formative feedback before dismissal"}
        editValue={editString}
        onSave={(val) => {
          const lines = val.split('\n').filter(l => l.trim().length > 0);
          onUpdateExitTicket({
            ...et,
            questions: lines.map((l, i) => ({ id: `e${i+1}`, prompt: l }))
          });
        }}
        extraActions={extraActions}
      >
        {/* Printable Ticket Slips (Prints 2 slips per page) */}
        <div className="printable-content" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2].map((slipNum) => (
            <div
              key={slipNum}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              {/* Slip Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.75rem'
              }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>
                    {et.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Slip #{slipNum} • Hand to teacher on way out
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Name: _________________
                </div>
              </div>

              {/* Questions with writing lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(et.questions || []).map((q, idx) => (
                  <div key={q.id || idx}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
                      {q.prompt}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{ borderBottom: '1px solid #CBD5E1', height: '1px' }} />
                      <div style={{ borderBottom: '1px solid #CBD5E1', height: '1px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </EditableSection>
    </div>
  );
}
