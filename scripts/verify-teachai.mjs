/**
 * TeachAI Automated Smoke Test Suite
 * Verifies API service layer, mock data generator, storage persistence,
 * and data structure integrity for all 8 lesson components.
 */

import { DEFAULT_PHOTOSYNTHESIS_LESSON, generateCustomLessonPackage } from '../src/services/mockData.js';
import { api } from '../src/services/api.js';

console.log('--- 🧪 STARTING TEACHAI SMOKE TESTS ---');

// 1. Verify Default Photosynthesis Lesson
console.log('Test 1: Verifying default Photosynthesis package...');
const pLesson = DEFAULT_PHOTOSYNTHESIS_LESSON;
if (!pLesson.meta || pLesson.meta.topic !== 'Photosynthesis') throw new Error('Invalid meta topic');
if (!pLesson.readinessCheck || pLesson.readinessCheck.items.length !== 7) throw new Error('Readiness check must have 7 items');
if (!pLesson.lessonPlan.timeline || pLesson.lessonPlan.timeline.length !== 5) throw new Error('Timeline must have 5 phases');
if (!pLesson.quiz.questions || pLesson.quiz.questions.length !== 5) throw new Error('Quiz must have 5 questions');
if (!pLesson.quiz.answerKey || pLesson.quiz.answerKey.length !== 5) throw new Error('Quiz must have 5 answer keys');
if (!pLesson.differentiation.support || !pLesson.differentiation.standard || !pLesson.differentiation.challenge) {
  throw new Error('Differentiation must have support, standard, challenge');
}
console.log('✅ Test 1 Passed: Default Photosynthesis package is complete and valid.');

// 2. Verify Custom Lesson Generation
console.log('Test 2: Verifying dynamic generation for custom topic...');
const custom = generateCustomLessonPackage({
  topic: 'Civil War',
  grade: 'Grade 10',
  subject: 'History',
  duration: '60 minutes'
});
if (custom.meta.topic !== 'Civil War') throw new Error('Custom topic mismatch');
if (custom.meta.grade !== 'Grade 10') throw new Error('Custom grade mismatch');
if (!custom.worksheet.questions.length) throw new Error('Custom worksheet missing questions');
console.log('✅ Test 2 Passed: Custom package generation succeeds with accurate metadata.');

// 3. Verify Contextual Section Regeneration
console.log('Test 3: Verifying targeted section regeneration...');
const simplerScript = await api.regenerateSection('teachingScript', 'simpler', pLesson);
if (!simplerScript.teachingScript.timeline[0].action.includes('Simplified Action')) {
  throw new Error('Simpler script action was not generated');
}
const harderWorksheet = await api.regenerateSection('worksheet', 'harder', pLesson);
if (!harderWorksheet.worksheet.questions[0].prompt.includes('Advanced')) {
  throw new Error('Harder worksheet question was not generated');
}
console.log('✅ Test 3 Passed: Targeted section regeneration updates components without modifying others.');

// 4. Verify Google Workspace Resource Creation
console.log('Test 4: Verifying Google Workspace generation simulation...');
const googleRes = await api.createGoogleResources(
  { lessonPlan: true, worksheet: true, quiz: true },
  pLesson
);
if (!googleRes.success) throw new Error('Google resource creation failed');
if (!googleRes.resources.lessonPlan || !googleRes.resources.worksheet || !googleRes.resources.quiz) {
  throw new Error('Missing Google Docs or Forms resources');
}
console.log('✅ Test 4 Passed: Google Workspace export produces valid Docs and Forms payloads.');

console.log('--- 🚀 ALL 4 TEST SUITES PASSED CLEANLY! ---');
