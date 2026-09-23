import React from 'react';
import WorkspaceHeader from './WorkspaceHeader';
import ReadinessCheck from './ReadinessCheck';
import WorkspaceTabs from './WorkspaceTabs';

import LessonPlanTab from './LessonPlanTab';
import TeachingScriptTab from './TeachingScriptTab';
import WorksheetTab from './WorksheetTab';
import QuizTab from './QuizTab';
import DifferentiationTab from './DifferentiationTab';
import VisualAidTab from './VisualAidTab';
import ExitTicketTab from './ExitTicketTab';
import CatchUpPackTab from './CatchUpPackTab';

import { useLesson } from '../../context/LessonContext';

export default function WorkspacePage({ navigate, onOpenGoogleModal }) {
  const {
    currentLesson,
    activeTab,
    setActiveTab,
    handleRegenerateSection,
    handleUpdateSection,
  } = useLesson();

  const handleEditInputs = () => {
    navigate('/create');
  };

  const handleCreateGoogleResources = () => {
    if (onOpenGoogleModal) {
      onOpenGoogleModal();
    }
  };

  return (
    <div className="workspace-page animate-fade-in" style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* 1. Header */}
      <WorkspaceHeader
        lessonPackage={currentLesson}
        onEditInputs={handleEditInputs}
        onCreateGoogleResources={handleCreateGoogleResources}
      />

      {/* 2. AI Lesson Readiness Check */}
      <ReadinessCheck readinessData={currentLesson.readinessCheck} />

      {/* 3. 8-Tab Navigation */}
      <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 4. Active Tab Content */}
      <div className="workspace-tab-content">
        {activeTab === 'lessonPlan' && (
          <LessonPlanTab
            lessonPlan={currentLesson.lessonPlan}
            onUpdatePlan={(updated) => handleUpdateSection('lessonPlan', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'teachingScript' && (
          <TeachingScriptTab
            teachingScript={currentLesson.teachingScript}
            onUpdateScript={(updated) => handleUpdateSection('teachingScript', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'worksheet' && (
          <WorksheetTab
            worksheet={currentLesson.worksheet}
            onUpdateWorksheet={(updated) => handleUpdateSection('worksheet', updated)}
            onRegenerateSection={handleRegenerateSection}
            onCreateGoogleDoc={handleCreateGoogleResources}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizTab
            quiz={currentLesson.quiz}
            onUpdateQuiz={(updated) => handleUpdateSection('quiz', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'differentiation' && (
          <DifferentiationTab
            differentiation={currentLesson.differentiation}
            onUpdateDifferentiation={(updated) => handleUpdateSection('differentiation', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'visualAid' && (
          <VisualAidTab
            visualAid={currentLesson.visualAid}
            onUpdateVisualAid={(updated) => handleUpdateSection('visualAid', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'exitTicket' && (
          <ExitTicketTab
            exitTicket={currentLesson.exitTicket}
            onUpdateExitTicket={(updated) => handleUpdateSection('exitTicket', updated)}
            onRegenerateSection={handleRegenerateSection}
          />
        )}

        {activeTab === 'catchUpPack' && (
          <CatchUpPackTab
            catchUpPack={currentLesson.catchUpPack}
            onUpdateCatchUp={(updated) => handleUpdateSection('catchUpPack', updated)}
            onCreateGoogleDoc={handleCreateGoogleResources}
          />
        )}
      </div>
    </div>
  );
}
