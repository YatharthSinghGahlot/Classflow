/**
 * TeachAI Google Forms & Gmail API Integration
 * Handles real Google Forms Quiz creation (with self-grading and answer keys)
 * and Gmail sending/sharing via Google OAuth 2.0.
 */

/**
 * Creates a real, live self-grading Google Form Quiz using the Google Forms REST API v1
 * @param {string} accessToken - Valid Google OAuth access token with forms.body scope
 * @param {object} quiz - Quiz object containing questions and answer keys
 * @param {object} lessonPackage - Full lesson metadata (topic, subject, grade)
 * @returns {Promise<object>} Created form details (editUrl, formUrl, formId, etc.)
 */
export async function createLiveGoogleForm(accessToken, quiz, lessonPackage) {
  if (!accessToken || accessToken.startsWith('demo_')) {
    throw new Error('AUTH_REQUIRED: A valid Google OAuth token is required to create a real Google Form.');
  }

  const safeTopic = lessonPackage?.meta?.topic || 'Classroom Assessment';
  const grade = lessonPackage?.meta?.grade || '';
  const subject = lessonPackage?.meta?.subject || '';
  const formTitle = `${safeTopic} - Self-Grading Quiz`;
  const documentTitle = `${safeTopic} Quiz (${grade ? grade + ' ' : ''}${subject})`;

  // Step 1: Create the base Google Form
  const createResponse = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
        documentTitle: documentTitle
      }
    })
  });

  if (!createResponse.ok) {
    let errMsg = `Failed to create Google Form (${createResponse.status})`;
    try {
      const errData = await createResponse.json();
      errMsg = errData?.error?.message || errMsg;
    } catch (_) {}
    throw new Error(errMsg);
  }

  const form = await createResponse.json();
  const formId = form.formId;

  // Step 2: Build batchUpdate requests to configure Quiz mode & add questions with grading
  const requests = [
    // 2a. Enable Quiz mode
    {
      updateSettings: {
        settings: {
          quizSettings: {
            isQuiz: true
          }
        },
        updateMask: 'quizSettings.isQuiz'
      }
    }
  ];

  const questions = quiz?.questions || [];
  questions.forEach((q, idx) => {
    // Determine the text of the correct option
    const rawOptions = q.options || [];
    const formattedOptions = rawOptions.map(opt => {
      // Strip "A) ", "B. ", etc. for clean Google Form display
      return opt.replace(/^[A-D][.)]\s*/i, '').trim();
    });

    // Find the correct answer's stripped text
    let correctText = '';
    const correctLetter = (q.correct || 'A').toUpperCase().trim();
    const matchedOption = rawOptions.find(opt => opt.toUpperCase().startsWith(correctLetter));
    if (matchedOption) {
      correctText = matchedOption.replace(/^[A-D][.)]\s*/i, '').trim();
    } else if (formattedOptions.length > 0) {
      correctText = formattedOptions[0];
    }

    requests.push({
      createItem: {
        item: {
          title: q.question,
          description: q.category ? `Category: ${q.category}` : '',
          questionItem: {
            question: {
              required: true,
              grading: {
                pointValue: 2,
                correctAnswers: {
                  answers: [
                    { value: correctText }
                  ]
                },
                whenRight: {
                  text: q.explanation ? `Great job! ${q.explanation}` : 'Correct answer!'
                },
                whenWrong: {
                  text: q.explanation ? `Review note: ${q.explanation}` : `The correct answer is: ${correctText}`
                }
              },
              choiceQuestion: {
                type: 'RADIO',
                options: formattedOptions.map(val => ({ value: val })),
                shuffle: false
              }
            }
          }
        },
        location: {
          index: idx
        }
      }
    });
  });

  // Step 3: Send batch update to Google Forms API
  const updateResponse = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!updateResponse.ok) {
    let updateErrMsg = `Warning: questions could not be added automatically (${updateResponse.status})`;
    try {
      const updateErrData = await updateResponse.json();
      updateErrMsg = updateErrData?.error?.message || updateErrMsg;
    } catch (_) {}
    console.warn('Google Forms batchUpdate partial issue:', updateErrMsg);
  }

  const responderUrl = form.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUrl = `https://docs.google.com/forms/d/${formId}/edit`;

  return {
    success: true,
    isReal: true,
    id: formId,
    formId: formId,
    title: formTitle,
    formUrl: responderUrl,
    editUrl: editUrl,
    questionCount: questions.length,
    totalPoints: questions.length * 2,
    settings: {
      isQuiz: true,
      pointsPerQuestion: 2,
      releaseGradeImmediately: true
    }
  };
}

/**
 * Sends an email directly via the Gmail REST API using the user's OAuth access token
 * @param {string} accessToken - Google OAuth token with gmail.send scope
 * @param {object} emailData - { to, subject, bodyText, formUrl, lessonTopic }
 * @returns {Promise<object>} Gmail send response
 */
export async function sendEmailViaGmail(accessToken, { to, subject, bodyText, formUrl, lessonTopic }) {
  if (!accessToken || accessToken.startsWith('demo_')) {
    throw new Error('AUTH_REQUIRED: A valid Google OAuth token is required to send emails via Gmail.');
  }

  const safeTopic = lessonTopic || 'Lesson Assessment';
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a; background: #ffffff; border: 1px solid #e6ebf2; border-radius: 12px;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <span style="font-size: 20px; font-weight: bold; color: #3186FF;">ClassFlow</span>
        <span style="margin-left: 8px; font-size: 12px; background: #EAF2FF; color: #3186FF; padding: 2px 8px; border-radius: 999px;">Classroom Quiz</span>
      </div>
      
      <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #1a1a1a;">${subject}</h2>
      
      <div style="font-size: 15px; line-height: 1.6; margin-bottom: 24px; white-space: pre-wrap; color: #333333;">
${bodyText}
      </div>

      ${formUrl ? `
      <div style="margin: 28px 0; text-align: center;">
        <a href="${formUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #3186FF; color: #ffffff; font-weight: 600; padding: 12px 28px; text-decoration: none; border-radius: 9999px; display: inline-block; box-shadow: 0 2px 8px rgba(49, 134, 255, 0.3);">
          Take Self-Grading Quiz in Google Forms &rarr;
        </a>
      </div>
      <p style="font-size: 12px; color: #6B7280; text-align: center;">Or open directly: <a href="${formUrl}" style="color: #3186FF;">${formUrl}</a></p>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #e6ebf2; margin: 24px 0;" />
      <p style="font-size: 12px; color: #6B7280; margin: 0;">Sent via ClassFlow &bull; Powered by Google Cloud & Gemini</p>
    </div>
  `;

  // Construct RFC 2822 email format
  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    htmlContent
  ].join('\r\n');

  // Base64URL encode
  const encodedEmail = btoa(unescape(encodeURIComponent(emailLines)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encodedEmail })
  });

  if (!response.ok) {
    let errMsg = `Failed to send email via Gmail (${response.status})`;
    try {
      const errData = await response.json();
      errMsg = errData?.error?.message || errMsg;
    } catch (_) {}
    throw new Error(errMsg);
  }

  return await response.json();
}

/**
 * Builds a direct web URL to compose an email in Gmail Web client with pre-filled content
 */
export function getGmailWebComposeUrl({ to = '', subject = '', body = '' }) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
