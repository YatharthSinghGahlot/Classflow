import React, { useState } from 'react';
import Modal from './Modal';
import { Mail, Send, ExternalLink, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useLesson } from '../../context/LessonContext';

export default function GmailShareModal({ isOpen, onClose, quiz, formUrl, topicTitle }) {
  const { googleAuthState, showToast } = useLesson();

  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState(() => `${topicTitle || 'Lesson'} - Practice Quiz & Assessment`);
  const [message, setMessage] = useState(() => {
    return `Hello Students,\n\nPlease complete the self-grading quiz for our lesson on "${topicTitle || 'this topic'}".\n\nClick the link below to submit your responses before the due date.`;
  });
  const [isSending, setIsSending] = useState(false);
  const [sentResult, setSentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const isReal = googleAuthState?.isRealOAuth && Boolean(googleAuthState?.accessToken);

  const handleSendGmail = async () => {
    if (!toEmail.trim()) {
      setErrorMessage('Please enter a recipient email address.');
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    try {
      const res = await api.sendQuizViaGmail({
        to: toEmail.trim(),
        subject: subject.trim(),
        bodyText: message.trim(),
        formUrl: formUrl,
        lessonTopic: topicTitle
      });

      if (res.openedCompose) {
        showToast('Opened Gmail web composer with quiz details!', 'info');
        onClose();
      } else {
        setSentResult(res);
        showToast('✓ Email successfully dispatched via Gmail API!', 'success');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to send email via Gmail API.');
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenWebCompose = () => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail.trim())}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + (formUrl ? `\n\nGoogle Form Quiz Link: ${formUrl}` : ''))}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Quiz via Gmail"
      subtitle="Email this Google Form Quiz directly to your students or classroom distribution list"
      maxWidth="520px"
    >
      {sentResult ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div 
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#E6F4EA',
              color: '#1E8E3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <CheckCircle2 size={30} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-secondary)', marginBottom: '8px' }}>
            Email Sent via Gmail!
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '20px' }}>
            The quiz instructions and Google Form link have been delivered to <strong>{toEmail}</strong>.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary"
            style={{ minWidth: '120px' }}
          >
            Done
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMessage && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: 'var(--rounded-sm)',
                backgroundColor: 'var(--error-light)',
                border: '1px solid var(--error-border)',
                color: 'var(--color-error)',
                fontSize: '13px'
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
              Recipient Email(s):
            </label>
            <input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="student@school.edu, class-period1@googlegroups.com"
              className="form-input"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--rounded-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-neutral)',
                fontSize: '14px',
                color: 'var(--color-on-surface)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
              Subject:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--rounded-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-neutral)',
                fontSize: '14px',
                color: 'var(--color-on-surface)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-secondary)', marginBottom: '6px' }}>
              Message:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-input"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--rounded-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-neutral)',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-on-surface)'
              }}
            />
          </div>

          {/* Form link attached preview */}
          {formUrl && (
            <div 
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--rounded-sm)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px'
              }}
            >
              <span style={{ color: 'var(--color-muted)' }}>Attached Google Form Quiz:</span>
              <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Preview Form</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Actions */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border)',
              marginTop: '4px'
            }}
          >
            <button
              type="button"
              onClick={handleOpenWebCompose}
              className="btn btn-secondary btn-sm"
              title="Open draft in Gmail Web client"
              style={{ gap: '6px' }}
            >
              <ExternalLink size={14} />
              <span>Compose in Gmail Web</span>
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendGmail}
                disabled={isSending}
                className="btn btn-primary btn-sm"
                style={{ gap: '6px' }}
              >
                {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                <span>{isSending ? 'Sending...' : 'Send with Gmail'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
