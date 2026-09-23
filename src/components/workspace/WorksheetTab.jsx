import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { 
  Printer, 
  FileText, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  Download, 
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useLesson } from '../../context/LessonContext';
import Modal from '../common/Modal';

export default function WorksheetTab({ 
  worksheet, 
  onUpdateWorksheet, 
  onRegenerateSection,
  onCreateGoogleDoc
}) {
  const { currentLesson, handleExportToGoogleDocs } = useLesson();
  const [createdDoc, setCreatedDoc] = useState(null);
  const [isExportingDoc, setIsExportingDoc] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const ws = worksheet || { questions: [] };
  const topicTitle = currentLesson?.meta?.topic || 'Topic';

  const handlePrint = () => {
    window.print();
  };

  const handleExportDoc = async () => {
    setIsExportingDoc(true);
    try {
      const res = await handleExportToGoogleDocs('worksheet');
      setCreatedDoc(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDoc(false);
    }
  };

  const generateMarkdown = () => {
    let md = `# ${ws.title || `${topicTitle} Worksheet`}\n\n`;
    md += `**Name:** ____________________ | **Date:** _________ | **Period:** ____\n\n`;
    md += `*Instructions:* ${ws.instructions || 'Answer all questions completely.'}\n\n---\n\n`;
    (ws.questions || []).forEach((q, idx) => {
      md += `### ${q.prompt || `Question ${idx + 1}`}\n`;
      if (q.options) {
        q.options.forEach(opt => {
          md += `- [ ] ${opt}\n`;
        });
      } else if (q.equation) {
        md += `\`${q.equation}\`\n\n`;
      }
      md += `\n\n`;
    });
    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/\s+/g, '-').toLowerCase()}-worksheet.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ws.title || topicTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #1e293b; }
    h1 { border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
    .header-box { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 16px; }
    .q-box { margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px dotted #cbd5e1; }
    .write-lines { border-bottom: 1px solid #94a3b8; height: 28px; margin: 8px 0; }
  </style>
</head>
<body>
  <div class="header-box">
    <div>
      <h2>${ws.title || `${topicTitle} Student Handout`}</h2>
      <p>${currentLesson?.meta?.grade || 'Grade 8'} &bull; ${currentLesson?.meta?.subject || 'Science'}</p>
    </div>
    <div>
      <p>Name: _____________________ Date: _________</p>
    </div>
  </div>
  <p><em>Instructions: ${ws.instructions || 'Answer all questions thoroughly.'}</em></p>
  <hr>
  ${(ws.questions || []).map((q, i) => `
    <div class="q-box">
      <p><strong>${q.prompt || `Question ${i + 1}`}</strong></p>
      ${q.equation ? `<p style="font-family: monospace; background: #f1f5f9; padding: 8px;">${q.equation}</p>` : ''}
      ${q.options ? q.options.map(opt => `<div><input type="checkbox" disabled> ${opt}</div>`).join('') : '<div class="write-lines"></div><div class="write-lines"></div>'}
    </div>
  `).join('')}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicTitle.replace(/\s+/g, '-').toLowerCase()}-worksheet.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const extraActions = (
    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary btn-sm"
        title="Print student worksheet cleanly"
      >
        <Printer size={14} />
        <span>Print Worksheet</span>
      </button>

      <button
        type="button"
        onClick={handleExportDoc}
        disabled={isExportingDoc}
        className="btn btn-secondary btn-sm"
        title="Export directly to Google Docs"
        style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)', backgroundColor: 'var(--primary-light)' }}
      >
        <FileText size={14} color="var(--primary)" />
        <span>{isExportingDoc ? 'Exporting...' : 'Export to Google Docs'}</span>
      </button>

      <button
        type="button"
        onClick={() => setShowExportModal(true)}
        className="btn btn-secondary btn-sm"
        title="Export as Markdown or HTML"
      >
        <Download size={14} />
        <span>Export</span>
      </button>

      <button
        type="button"
        onClick={() => onRegenerateSection('worksheet', 'default')}
        className="btn btn-secondary btn-sm"
      >
        <Sparkles size={14} color="var(--primary)" />
        <span>Regenerate</span>
      </button>

      <button
        type="button"
        onClick={() => onRegenerateSection('worksheet', 'easier')}
        className="btn btn-secondary btn-sm"
      >
        <span>Make Easier</span>
      </button>

      <button
        type="button"
        onClick={() => onRegenerateSection('worksheet', 'harder')}
        className="btn btn-secondary btn-sm"
      >
        <span>Make Harder</span>
      </button>
    </div>
  );

  const editString = (ws.questions || []).map(q => (
    `${q.prompt}\n${q.options ? q.options.join('\n') : ''}\n`
  )).join('\n');

  return (
    <div className="worksheet-tab animate-fade-in">
      <EditableSection
        title={ws.title || "Student Practice Worksheet"}
        subtitle="Student practice material • Clean layout ready for classroom distribution"
        editValue={editString}
        onSave={(val) => {
          onUpdateWorksheet({
            ...ws,
            title: ws.title
          });
        }}
        extraActions={extraActions}
      >
        {/* Printable Student Worksheet Container */}
        <div className="printable-content" style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          border: '1px solid var(--border)',
          borderRadius: '12px'
        }}>
          {/* Student Header Fields */}
          <div className="printable-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '2px solid var(--text)',
            paddingBottom: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text)' }}>
                {ws.title}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {ws.gradeSubject || "Class Practice Handout"}
              </p>
            </div>
            <div className="student-fields" style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--text)'
            }}>
              <span>Name: ______________________</span>
              <span>Date: _________</span>
              <span>Period: ____</span>
            </div>
          </div>

          {/* Instructions */}
          <div style={{
            backgroundColor: 'var(--bg)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: 'var(--text)'
          }}>
            <strong>Instructions:</strong> {ws.instructions}
          </div>

          {/* Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {(ws.questions || []).map((q, idx) => (
              <div key={q.id || idx} style={{ pageBreakInside: 'avoid' }}>
                <p style={{
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: 'var(--text)',
                  marginBottom: '0.75rem'
                }}>
                  {q.prompt}
                </p>

                {/* Optional equation banner */}
                {q.equation && (
                  <div style={{
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    border: '1px dashed var(--primary-border)'
                  }}>
                    {q.equation}
                  </div>
                )}

                {/* Multiple choice options */}
                {q.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        fontSize: '0.875rem',
                        color: 'var(--text)'
                      }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: '1.5px solid #94A3B8',
                          flexShrink: 0
                        }} />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hand-writing answer lines */}
                {q.lines && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                    {Array.from({ length: q.lines }).map((_, lIdx) => (
                      <div
                        key={lIdx}
                        style={{
                          borderBottom: '1px solid #CBD5E1',
                          height: '1.5rem',
                          width: '100%'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </EditableSection>

      {/* Google Docs Export Feedback Modal */}
      {createdDoc && (
        <Modal
          isOpen={Boolean(createdDoc)}
          onClose={() => setCreatedDoc(null)}
          title="Google Doc Created! 📘"
          subtitle="Your student practice worksheet is formatted and ready in Google Docs."
          maxWidth="500px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem'
            }}>
              <CheckCircle2 size={24} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text)' }}>
                  {createdDoc.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Synced to connected Google Drive folder: ClassFlow Lessons
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setCreatedDoc(null)}
                className="btn btn-secondary"
              >
                Done
              </button>
              <a
                href={createdDoc.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>Open in Google Docs</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <Modal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Worksheet"
          subtitle="Download or copy this worksheet in your preferred classroom format"
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standalone student printable webpage</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generateMarkdown());
                alert('Copied worksheet Markdown to clipboard!');
                setShowExportModal(false);
              }}
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
            >
              <Copy size={18} color="#EA580C" />
              <div style={{ textAlign: 'left', marginLeft: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>Copy to Clipboard</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Copy formatted text with blanks</div>
              </div>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
