import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { 
  Brain, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Sparkles, 
  Check, 
  BarChart2, 
  Printer, 
  ExternalLink, 
  FileSpreadsheet, 
  Download, 
  Copy,
  Eye,
  EyeOff,
  Mail
} from 'lucide-react';
import { useLesson } from '../../context/LessonContext';
import Modal from '../common/Modal';
import GoogleConnectModal from '../common/GoogleConnectModal';
import GmailShareModal from '../common/GmailShareModal';

export default function QuizTab({ 
  quiz, 
  onUpdateQuiz, 
  onRegenerateSection 
}) {
  const { currentLesson, handlePushQuizToForms, googleAuthState } = useLesson();
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [isPushingForm, setIsPushingForm] = useState(false);
  const [createdForm, setCreatedForm] = useState(null);
  const [printMode, setPrintMode] = useState('student'); // 'student' | 'teacher'
  const [showExportModal, setShowExportModal] = useState(false);
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);
  const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState('');
  // Track formUrl separately so Gmail modal can reuse it even after success modal closes
  const [lastFormUrl, setLastFormUrl] = useState(null);

  const qz = quiz || { questions: [], answerKey: [], coverage: {} };
  const topicTitle = currentLesson?.meta?.topic || 'Topic';

  const handlePushToForms = async (forceAttempt = false) => {
    // If not connected with a real Google OAuth token, prompt to authenticate
    if (!googleAuthState?.isRealOAuth && !forceAttempt) {
      setAuthNotice('Please connect your Google Account with Google OAuth to create a real, live self-grading Google Form Quiz in your Google Drive.');
      setIsGoogleAuthOpen(true);
      return;
    }

    setIsPushingForm(true);
    try {
      const res = await handlePushQuizToForms({ allowFallback: forceAttempt });
      setCreatedForm(res);
      // Cache the form URL so GmailShareModal can reuse it
      if (res?.formUrl) setLastFormUrl(res.formUrl);
    } catch (e) {
      if (e?.code === 'AUTH_REQUIRED' || e?.message?.includes('AUTH_REQUIRED')) {
        setAuthNotice('Google OAuth connection is required to create a live Google Form in your Drive.');
        setIsGoogleAuthOpen(true);
      } else {
        console.error(e);
      }
    } finally {
      setIsPushingForm(false);
    }
  };

  // Open Gmail modal — if no form has been created yet, show the modal without a form link
  const handleOpenGmailModal = () => {
    setIsGmailModalOpen(true);
  };

  const handlePrint = (mode = 'student') => {
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const generateMarkdown = () => {
    let md = `# ${qz.title || `${topicTitle} Quiz`}\n\n`;
    md += `**Subject:** ${currentLesson?.meta?.subject || 'Science'} | **Grade:** ${currentLesson?.meta?.grade || 'Grade 8'}\n\n`;
    md += `---\n\n`;
    (qz.questions || []).forEach(q => {
      md += `### Question ${q.id} (${q.category || 'General'})\n`;
      md += `${q.question}\n\n`;
      q.options.forEach(opt => {
        md += `- [ ] ${opt}\n`;
      });
      md += `\n*Correct Answer: Option ${q.correct}*\n`;
      if (q.explanation) md += `*Rationale:* ${q.explanation}\n`;
      md += `\n`;
    });
    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/\s+/g, '-').toLowerCase()}-quiz.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${qz.title || topicTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #1e293b; }
    h1 { border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
    .q-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
    .q-opt { margin: 6px 0; }
  </style>
</head>
<body>
  <h1>${qz.title || `${topicTitle} Quiz`}</h1>
  <p><strong>Name:</strong> ______________________ <strong>Date:</strong> _________ <strong>Score:</strong> _____ / ${qz.questions?.length}</p>
  <hr>
  ${(qz.questions || []).map(q => `
    <div class="q-card">
      <p><strong>Question ${q.id}:</strong> ${q.question}</p>
      ${q.options.map(opt => `<div class="q-opt"><input type="radio" disabled> ${opt}</div>`).join('')}
    </div>
  `).join('')}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/\s+/g, '-').toLowerCase()}-quiz.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      {/* 1. Push to Google Forms */}
      <button
        type="button"
        onClick={() => handlePushToForms(false)}
        disabled={isPushingForm}
        className="btn btn-secondary btn-sm"
        title="Export self-grading quiz directly to Google Forms via Google OAuth"
        style={{ color: '#7C3AED', borderColor: '#DDD6FE', backgroundColor: '#F5F3FF', gap: '6px' }}
      >
        <FileSpreadsheet size={14} color="#7C3AED" />
        <span>{isPushingForm ? 'Creating Form...' : 'Push to Google Forms'}</span>
      </button>

      {/* 2. Share via Gmail */}
      <button
        type="button"
        onClick={handleOpenGmailModal}
        className="btn btn-secondary btn-sm"
        title="Email quiz directly to students using Gmail"
        style={{ color: '#EA4335', borderColor: '#FCE8E6', backgroundColor: '#FEF7F6', gap: '6px' }}
      >
        <Mail size={14} color="#EA4335" />
        <span>Email via Gmail</span>
      </button>

      {/* 2. Print Student Quiz */}
      <button
        type="button"
        onClick={() => handlePrint('student')}
        className="btn btn-secondary btn-sm"
        title="Print clean student exam handout"
      >
        <Printer size={14} />
        <span>Print Quiz (Student)</span>
      </button>

      {/* 3. Print Teacher Key */}
      <button
        type="button"
        onClick={() => handlePrint('teacher')}
        className="btn btn-secondary btn-sm"
        title="Print with complete answer key and rationale"
      >
        <Printer size={14} color="var(--primary)" />
        <span>Print Key (Teacher)</span>
      </button>

      {/* 4. Export Menu */}
      <button
        type="button"
        onClick={() => setShowExportModal(true)}
        className="btn btn-secondary btn-sm"
        title="Export as Markdown or HTML"
      >
        <Download size={14} />
        <span>Export</span>
      </button>

      {/* 5. Regenerate */}
      <button
        type="button"
        onClick={() => onRegenerateSection('quiz', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate Question</span>
      </button>
    </div>
  );

  const editString = (qz.questions || []).map(q => (
    `Q${q.id}: ${q.question}\n${q.options.join('\n')}\nCorrect: ${q.correct}\n`
  )).join('\n');

  return (
    <div className="quiz-tab animate-fade-in">
      {/* Printable Quiz Viewport (Targeted by @media print) */}
      <div className={`printable-content printable-quiz-container ${printMode === 'teacher' ? 'print-teacher-mode' : 'print-student-mode'}`}>
        <div className="printable-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '2px solid var(--text)',
          paddingBottom: '0.875rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
              {qz.title || `${topicTitle} Assessment`}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {currentLesson?.meta?.grade || 'Grade 8'} &bull; {currentLesson?.meta?.subject || 'Science'} {printMode === 'teacher' ? '• [TEACHER ANSWER KEY]' : ''}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <span><strong>Name:</strong> ____________________</span>
            <span><strong>Date:</strong> __________</span>
            <span><strong>Score:</strong> ____ / {qz.questions?.length || 5}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
          Instructions: Read each question carefully. Select the best answer choice and fill in the corresponding circle completely.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(qz.questions || []).map((q) => (
            <div key={q.id} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>
                {q.id}. {q.question}
                {printMode === 'teacher' && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginLeft: '8px' }}>
                    [{q.category}] - Correct: Option {q.correct}
                  </span>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                {q.options.map((opt, oIdx) => {
                  const letter = opt.charAt(0);
                  const isCorrect = letter === q.correct;
                  const isHighlighted = printMode === 'teacher' && isCorrect;
                  return (
                    <div key={oIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: isHighlighted ? 700 : 400,
                      color: isHighlighted ? 'var(--success)' : 'inherit'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: '1.5px solid #64748B',
                        backgroundColor: isHighlighted ? 'var(--success)' : 'transparent'
                      }} />
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
              {printMode === 'teacher' && q.explanation && (
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.375rem', paddingLeft: '0.5rem' }}>
                  <strong>Rationale:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Screen Interactive Workspace View */}
      <div className="no-print">
        <EditableSection
          title={qz.title || `${qz.questions?.length || 5}-Question Mastery Quiz`}
          subtitle={`Formative multiple-choice assessment with Bloom cognitive balance • ${qz.questions?.length || 5} Questions`}
          editValue={editString}
          onSave={(val) => {
            onUpdateQuiz({
              ...qz,
              title: qz.title
            });
          }}
          extraActions={extraActions}
        >
          {/* Quiz Coverage Metrics */}
          <div style={{
            backgroundColor: 'var(--bg)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart2 size={18} color="var(--primary)" />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)' }}>
                Quiz Cognitive Coverage ({qz.questions?.length || 5} Questions Total)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recall: </span>
                <strong style={{ color: 'var(--text)' }}>{qz.coverage?.recall ?? 1}</strong>
              </div>
              <div style={{ fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Understanding: </span>
                <strong style={{ color: 'var(--text)' }}>{qz.coverage?.understanding ?? 1}</strong>
              </div>
              <div style={{ fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Application: </span>
                <strong style={{ color: 'var(--text)' }}>{qz.coverage?.application ?? 2}</strong>
              </div>
              <div style={{ fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Analysis: </span>
                <strong style={{ color: 'var(--text)' }}>{qz.coverage?.analysis ?? 1}</strong>
              </div>
              {qz.coverage?.evaluation > 0 && (
                <div style={{ fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Evaluation: </span>
                  <strong style={{ color: 'var(--text)' }}>{qz.coverage?.evaluation}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Questions Grid / List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
            {(qz.questions || []).map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}
              >
                {/* Question Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--primary-border)'
                  }}>
                    Question {item.id} • {item.category || "General"}
                  </span>

                  {showAnswerKey && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>
                      Correct: Option {item.correct}
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {item.question}
                </h4>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(item.options || []).map((opt, oIdx) => {
                    const optLetter = opt.charAt(0);
                    const isCorrect = optLetter === item.correct;
                    const highlight = showAnswerKey && isCorrect;

                    return (
                      <div
                        key={oIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.625rem 0.875rem',
                          borderRadius: '8px',
                          border: highlight ? '1px solid var(--success-border)' : '1px solid var(--border)',
                          backgroundColor: highlight ? 'var(--success-light)' : 'var(--bg)',
                          fontSize: '0.875rem',
                          color: highlight ? '#14532D' : 'var(--text)',
                          fontWeight: highlight ? 600 : 400
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: highlight ? '2px solid var(--success)' : '1.5px solid var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: highlight ? 'var(--success)' : '#FFFFFF',
                          color: highlight ? '#FFFFFF' : 'var(--text)'
                        }}>
                          {optLetter}
                        </div>
                        <span style={{ flex: 1 }}>{opt.slice(3)}</span>
                        {highlight && <Check size={16} color="var(--success)" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showAnswerKey && item.explanation && (
                  <div style={{
                    marginTop: '0.875rem',
                    padding: '0.625rem 0.875rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)'
                  }}>
                    <strong>Rationale:</strong> {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Collapsible Answer Key */}
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF'
          }}>
            <button
              type="button"
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text)',
                backgroundColor: showAnswerKey ? 'var(--bg-subtle)' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <CheckCircle size={18} color="var(--success)" />
                <span style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
                  {showAnswerKey ? 'Hide Answer Key' : 'View Answer Key'}
                </span>
              </div>
              {showAnswerKey ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showAnswerKey && (
              <div className="animate-fade-in" style={{
                padding: '1.25rem',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--bg)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  {(qz.answerKey || []).map(ans => (
                    <div
                      key={ans.questionNumber}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      <span>Question {ans.questionNumber}</span>
                      <span style={{
                        backgroundColor: 'var(--success-light)',
                        color: 'var(--success)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--success-border)'
                      }}>
                        Option {ans.correctOption}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Answers are automatically kept hidden on student-facing worksheets and printouts.
                </p>
              </div>
            )}
          </div>
        </EditableSection>
      </div>

      {/* Google Forms Push Success Modal */}
      {createdForm && (
        <Modal
          isOpen={Boolean(createdForm)}
          onClose={() => setCreatedForm(null)}
          title="Google Forms Quiz Created!"
          subtitle={`Configured as a self-grading test with ${createdForm.questionCount} questions & answer keys`}
          maxWidth="520px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              backgroundColor: '#F5F3FF',
              border: '1px solid #DDD6FE',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                <FileSpreadsheet size={20} color="#7C3AED" />
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
                  {createdForm.title}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Each question has been created as multiple-choice with point values (
                {createdForm.settings?.pointsPerQuestion ?? 2} pts/question,
                {' '}{createdForm.settings?.totalPoints ?? createdForm.totalPoints ?? (createdForm.questionCount * 2)} pts total)
                {' '}and automatic self-grading feedback.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setCreatedForm(null);
                  setIsGmailModalOpen(true);
                }}
                className="btn btn-secondary btn-sm"
                title="Email this form directly to students via Gmail"
                style={{ color: '#EA4335', borderColor: '#FCE8E6', backgroundColor: '#FEF7F6', gap: '6px' }}
              >
                <Mail size={14} color="#EA4335" />
                <span>Email Quiz via Gmail</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setCreatedForm(null)}
                  className="btn btn-secondary"
                >
                  Done
                </button>
                <a
                  href={createdForm.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Open in Google Forms</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Export Quiz Modal */}
      {showExportModal && (
        <Modal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Quiz"
          subtitle="Download or copy this quiz in your preferred classroom format"
          maxWidth="460px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <button
              type="button"
              onClick={() => {
                handleDownloadMarkdown();
                setShowExportModal(false);
              }}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              <Download size={18} color="var(--primary)" />
              <div style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Download as Markdown (.md)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Compatible with Notion, Obsidian, GitHub</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                handleDownloadHTML();
                setShowExportModal(false);
              }}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              <Download size={18} color="#0D9488" />
              <div style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Download as Clean HTML</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standalone webpage ready to print or view</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generateMarkdown());
                alert('Copied quiz Markdown to clipboard!');
                setShowExportModal(false);
              }}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              <Copy size={18} color="#EA580C" />
              <div style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Copy to Clipboard</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Copy formatted text with answer key</div>
              </div>
            </button>
          </div>
        </Modal>
      )}

      {/* Google OAuth Connection Modal — triggered when user needs to auth for real Forms/Gmail */}
      <GoogleConnectModal
        isOpen={isGoogleAuthOpen}
        onClose={() => {
          setIsGoogleAuthOpen(false);
          setAuthNotice('');
        }}
        onSuccess={() => {
          setIsGoogleAuthOpen(false);
          setAuthNotice('');
          // Automatically retry pushing form after successful auth
          handlePushToForms(false);
        }}
        initialReason={authNotice}
      />

      {/* Gmail Share Modal — sends quiz + form link to students via Gmail */}
      <GmailShareModal
        isOpen={isGmailModalOpen}
        onClose={() => setIsGmailModalOpen(false)}
        quiz={qz}
        formUrl={lastFormUrl}
        topicTitle={topicTitle}
      />
    </div>
  );
}
