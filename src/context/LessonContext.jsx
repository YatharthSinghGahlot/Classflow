import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { googleAuth } from '../services/googleAuth';
import { useToast } from './ToastContext';

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
  const { showToast } = useToast();

  // Primary Inputs
  const [topic, setTopic] = useState('Photosynthesis');
  const [subject, setSubject] = useState('Science');
  const [grade, setGrade] = useState('Grade 8');
  const [duration, setDuration] = useState('45 minutes');

  // Advanced Options
  const [teachingStyle, setTeachingStyle] = useState('Mixed');
  const [difficulty, setDifficulty] = useState('Standard');
  const [learningPreferences, setLearningPreferences] = useState(['Visual', 'Discussion', 'Hands-on']);
  const [classType, setClassType] = useState('Whole Class');

  // Quiz question count configuration
  const [quizQuestionCount, setQuizQuestionCount] = useState(5);

  // Google OAuth & Google Drive Sync
  const [googleAuthState, setGoogleAuthState] = useState(() => googleAuth.getAuthState());
  const [driveSyncStatus, setDriveSyncStatus] = useState('saved'); // 'saved' | 'syncing' | 'idle' | 'error'
  const [lastDriveRecord, setLastDriveRecord] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Google Classroom publishing modal state
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);

  // Differentiation
  const [differentiatedEnabled, setDifferentiatedEnabled] = useState(true);
  const [differentiationSelections, setDifferentiationSelections] = useState({
    support: true,
    standard: true,
    challenge: true
  });

  // Resource Selection (all 7 enabled by default)
  const [selectedResources, setSelectedResources] = useState({
    lessonPlan: true,
    teachingScript: true,
    worksheet: true,
    quiz: true,
    visualAid: true,
    exitTicket: true,
    catchUpPack: true
  });

  // Workspace & Active Package
  const [currentLesson, setCurrentLesson] = useState(() => storage.getCurrentLesson());
  const [activeTab, setActiveTab] = useState('lessonPlan');

  // Generation status
  const [generationStatus, setGenerationStatus] = useState('idle'); // 'idle' | 'generating' | 'ready' | 'error'
  const [generationProgress, setGenerationProgress] = useState({
    stepIndex: 0,
    stepName: '',
    completedCount: 0
  });

  // Google Workspace Resource Creation
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleResourceStatus, setGoogleResourceStatus] = useState('idle'); // 'idle' | 'creating' | 'success' | 'error'
  const [googleProgress, setGoogleProgress] = useState({
    currentItem: '',
    completedItems: [],
    stepIndex: 0,
    total: 3
  });
  const [createdGoogleResources, setCreatedGoogleResources] = useState(null);

  // Google Doc / Form Simulated Preview Modal
  const [previewDoc, setPreviewDoc] = useState(null);

  // Load latest from storage on mount & listen to Google events
  useEffect(() => {
    const saved = storage.getCurrentLesson();
    if (saved) {
      setCurrentLesson(saved);
      if (saved.meta) {
        setTopic(saved.meta.topic || 'Photosynthesis');
        setGrade(saved.meta.grade || 'Grade 8');
        setSubject(saved.meta.subject || 'Science');
        setDuration(saved.meta.duration || '45 minutes');
        if (saved.meta.quizQuestionCount) {
          setQuizQuestionCount(saved.meta.quizQuestionCount);
        }
      }
    }

    const handleAuthChange = (e) => {
      setGoogleAuthState(e.detail);
    };

    const handleDriveSync = (e) => {
      setLastDriveRecord(e.detail);
      setDriveSyncStatus('saved');
    };

    window.addEventListener('classflow:auth-change', handleAuthChange);
    window.addEventListener('teachai:auth-change', handleAuthChange);
    window.addEventListener('classflow:drive-sync', handleDriveSync);
    window.addEventListener('teachai:drive-sync', handleDriveSync);

    return () => {
      window.removeEventListener('classflow:auth-change', handleAuthChange);
      window.removeEventListener('teachai:auth-change', handleAuthChange);
      window.removeEventListener('classflow:drive-sync', handleDriveSync);
      window.removeEventListener('teachai:drive-sync', handleDriveSync);
    };
  }, []);

  // Quick Fill Demo helper
  const quickFillDemo = () => {
    setTopic('Photosynthesis');
    setGrade('Grade 8');
    setSubject('Science');
    setDuration('45 minutes');
    setTeachingStyle('Mixed');
    setDifficulty('Standard');
    setQuizQuestionCount(5);
    setLearningPreferences(['Visual', 'Discussion', 'Hands-on']);
    setClassType('Whole Class');
    setDifferentiatedEnabled(true);
    setSelectedResources({
      lessonPlan: true,
      teachingScript: true,
      worksheet: true,
      quiz: true,
      visualAid: true,
      exitTicket: true,
      catchUpPack: true
    });
    showToast('Loaded demo parameters: Photosynthesis (Grade 8 Science, 45m)', 'info');
  };

  // Google & Gmail OAuth controls
  const loginWithGmail = (params) => {
    try {
      const res = googleAuth.signInWithGmail(params);
      setGoogleAuthState(res);
      showToast(`Signed in with Gmail: ${res.user.email}`, 'success');
      if (currentLesson) {
        syncLessonToDrive(currentLesson);
      }
      return res;
    } catch (err) {
      console.error('Gmail login error', err);
      showToast(err.message || 'Failed to sign in with Gmail', 'error');
      throw err;
    }
  };

  const connectGoogle = async (options) => {
    try {
      const res = await googleAuth.connectAccount(options);
      setGoogleAuthState(res);
      showToast(`Connected Google Account: ${res.user.name}`, 'success');
      // Auto sync current lesson to newly connected Drive
      if (currentLesson) {
        syncLessonToDrive(currentLesson);
      }
      return res;
    } catch (err) {
      console.error('Google connect error', err);
      showToast('Failed to connect Google Account: ' + err.message, 'error');
      throw err;
    }
  };

  const disconnectGoogle = () => {
    const res = googleAuth.disconnectAccount();
    setGoogleAuthState(res);
    showToast('Signed out of Google Account', 'info');
  };

  const syncLessonToDrive = async (lessonPkg) => {
    try {
      setDriveSyncStatus('syncing');
      const record = await googleAuth.saveLessonToDrive(lessonPkg || currentLesson);
      if (record) {
        setLastDriveRecord(record);
        setDriveSyncStatus('saved');
        showToast('Saved lesson package to Google Drive', 'success');
      } else {
        setDriveSyncStatus('idle');
      }
      return record;
    } catch (err) {
      console.error('Manual drive sync error', err);
      setDriveSyncStatus('error');
      showToast('Google Drive sync failed', 'error');
    }
  };

  // Export section to Google Docs
  const handleExportToGoogleDocs = async (type = 'worksheet') => {
    try {
      showToast(`Exporting ${type === 'worksheet' ? 'Worksheet' : 'Lesson Plan'} to Google Docs...`, 'info', 1200);
      const res = await api.exportToGoogleDocs(type, currentLesson[type], currentLesson);
      showToast(`Google Doc ready: ${res.title}`, 'success');
      return res;
    } catch (err) {
      console.error('Failed to export to Google Docs', err);
      showToast('Failed to export to Google Docs', 'error');
      throw err;
    }
  };

  // Push quiz directly to Google Forms
  const handlePushQuizToForms = async (options = {}) => {
    try {
      showToast('Connecting to Google Forms API...', 'info', 1500);
      const res = await api.pushToGoogleFormsQuiz(currentLesson?.quiz, currentLesson, options);
      showToast(`Google Form Quiz ready with ${res.questionCount} questions and answer key!`, 'success');
      return res;
    } catch (err) {
      if (err.code !== 'AUTH_REQUIRED') {
        console.error('Failed to push to Google Forms', err);
        showToast(err.message || 'Failed to create Google Form Quiz', 'error');
      }
      throw err;
    }
  };

  // Publish to Google Classroom
  const handlePublishToClassroom = async (courseId, assignmentData) => {
    try {
      showToast('Publishing to Google Classroom...', 'info', 1500);
      const res = await api.publishToGoogleClassroom(courseId, assignmentData, currentLesson);
      showToast('Successfully posted to Google Classroom!', 'success');
      setIsClassroomModalOpen(false);
      return res;
    } catch (err) {
      console.error('Failed to publish to Google Classroom', err);
      showToast('Failed to publish to Google Classroom', 'error');
      throw err;
    }
  };

  // Main Lesson Generation
  const handleGenerateLesson = async (navigateCallback) => {
    if (!topic.trim()) {
      showToast('Please enter a lesson topic', 'error');
      return;
    }

    try {
      setGenerationStatus('generating');
      setGenerationProgress({ stepIndex: 0, stepName: 'Starting generation...', completedCount: 0 });

      const newPackage = await api.generateLesson({
        topic,
        subject,
        grade,
        duration,
        teachingStyle,
        difficulty,
        learningPreferences,
        classType,
        differentiatedEnabled,
        quizQuestionCount,
        selectedResources
      }, (progress) => {
        setGenerationProgress(progress);
      });

      setCurrentLesson(newPackage);
      setGenerationStatus('ready');
      showToast('Lesson package generated successfully!', 'success');

      // Auto sync to Drive in background
      syncLessonToDrive(newPackage);

      if (navigateCallback) {
        navigateCallback('/workspace');
      }
    } catch (err) {
      console.error('Generation error', err);
      setGenerationStatus('error');
      showToast('Failed to generate lesson package. Please try again.', 'error');
    }
  };

  // Contextual single-section regeneration
  const handleRegenerateSection = async (sectionKey, promptType = 'default') => {
    try {
      showToast(`Regenerating ${sectionKey}...`, 'info', 1500);
      const updated = await api.regenerateSection(sectionKey, promptType, currentLesson);
      setCurrentLesson(updated);
      showToast(`Updated ${sectionKey} successfully`, 'success');
      // Auto sync update to Drive
      googleAuth.saveLessonToDrive(updated);
    } catch (err) {
      console.error('Section regeneration failed', err);
      showToast(`Failed to update ${sectionKey}`, 'error');
    }
  };

  // Section inline edit & save
  const handleUpdateSection = (sectionKey, updatedSectionData) => {
    try {
      const updated = {
        ...currentLesson,
        [sectionKey]: updatedSectionData
      };
      setCurrentLesson(updated);
      storage.setCurrentLesson(updated);
      googleAuth.saveLessonToDrive(updated);
      showToast(`Saved changes to ${sectionKey}`, 'success');
    } catch (err) {
      console.error('Failed to update section', err);
      showToast('Could not save edits', 'error');
    }
  };

  // Google Workspace creation
  const handleCreateGoogleResources = async (selectedWorkspaceOptions, onSuccessCallback) => {
    try {
      setGoogleResourceStatus('creating');
      const result = await api.createGoogleResources(
        selectedWorkspaceOptions,
        currentLesson,
        (progress) => {
          setGoogleProgress(progress);
        }
      );

      setCreatedGoogleResources(result.resources);
      setGoogleResourceStatus('success');
      showToast('Google Workspace resources created successfully!', 'success');

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (err) {
      console.error('Failed to create Google resources', err);
      setGoogleResourceStatus('error');
      showToast('Failed to create some Google Workspace resources', 'error');
    }
  };

  // Load a historical lesson
  const loadLessonFromHistory = (histLesson, navigateCallback) => {
    if (histLesson.fullPackage) {
      setCurrentLesson(histLesson.fullPackage);
      storage.setCurrentLesson(histLesson.fullPackage);
      if (histLesson.fullPackage.meta?.quizQuestionCount) {
        setQuizQuestionCount(histLesson.fullPackage.meta.quizQuestionCount);
      }
    } else {
      // Regenerate package for it
      const pkg = api.generateCustomLessonPackage ? api.generateCustomLessonPackage({
        ...histLesson,
        quizQuestionCount
      }) : currentLesson;
      setCurrentLesson(pkg);
      storage.setCurrentLesson(pkg);
    }
    setTopic(histLesson.topic);
    setGrade(histLesson.grade);
    setSubject(histLesson.subject);
    setDuration(histLesson.duration);
    showToast(`Loaded lesson: ${histLesson.topic}`, 'info');
    if (navigateCallback) {
      navigateCallback('/workspace');
    }
  };

  return (
    <LessonContext.Provider value={{
      // Primary state
      topic, setTopic,
      subject, setSubject,
      grade, setGrade,
      duration, setDuration,

      // Advanced options
      teachingStyle, setTeachingStyle,
      difficulty, setDifficulty,
      learningPreferences, setLearningPreferences,
      classType, setClassType,

      // Quiz configuration
      quizQuestionCount, setQuizQuestionCount,

      // Differentiation & Resources
      differentiatedEnabled, setDifferentiatedEnabled,
      differentiationSelections, setDifferentiationSelections,
      selectedResources, setSelectedResources,

      // Package & Workspace
      currentLesson, setCurrentLesson,
      activeTab, setActiveTab,

      // Generation status
      generationStatus, setGenerationStatus,
      generationProgress,
      handleGenerateLesson,
      handleRegenerateSection,
      handleUpdateSection,
      quickFillDemo,

      // Google Workspace Integration
      isGoogleModalOpen, setIsGoogleModalOpen,
      googleResourceStatus, setGoogleResourceStatus,
      googleProgress,
      createdGoogleResources, setCreatedGoogleResources,
      handleCreateGoogleResources,

      // Google OAuth & Drive Auto-Sync
      googleAuthState,
      driveSyncStatus,
      lastDriveRecord,
      isAuthModalOpen,
      setIsAuthModalOpen,
      loginWithGmail,
      connectGoogle,
      disconnectGoogle,
      syncLessonToDrive,

      // Google Classroom & Form & Docs Direct Exports
      isClassroomModalOpen, setIsClassroomModalOpen,
      handlePublishToClassroom,
      handlePushQuizToForms,
      handleExportToGoogleDocs,

      // Preview Modal
      previewDoc, setPreviewDoc,

      // History
      loadLessonFromHistory
    }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLesson() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
}
