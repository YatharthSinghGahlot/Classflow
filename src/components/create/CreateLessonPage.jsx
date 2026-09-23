import React from 'react';
import LessonForm from './LessonForm';
import AdvancedOptions from './AdvancedOptions';
import DifferentiationToggle from './DifferentiationToggle';
import ResourceSelector from './ResourceSelector';
import GenerationProgress from './GenerationProgress';
import { useLesson } from '../../context/LessonContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CreateLessonPage({ navigate }) {
  const {
    topic, setTopic,
    subject, setSubject,
    grade, setGrade,
    duration, setDuration,
    teachingStyle, setTeachingStyle,
    difficulty, setDifficulty,
    learningPreferences, setLearningPreferences,
    classType, setClassType,
    differentiatedEnabled, setDifferentiatedEnabled,
    differentiationSelections, setDifferentiationSelections,
    selectedResources, setSelectedResources,
    quizQuestionCount, setQuizQuestionCount,
    generationStatus,
    generationProgress,
    handleGenerateLesson,
    quickFillDemo
  } = useLesson();

  const isGenerating = generationStatus === 'generating';

  const onSubmit = (e) => {
    e.preventDefault();
    handleGenerateLesson((route) => navigate(route));
  };

  return (
    <div className="create-lesson-page animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
      <form onSubmit={onSubmit}>
        {/* Main Lesson Form Card */}
        <LessonForm
          topic={topic} setTopic={setTopic}
          subject={subject} setSubject={setSubject}
          grade={grade} setGrade={setGrade}
          duration={duration} setDuration={setDuration}
          onQuickFill={quickFillDemo}
        />

        {/* Collapsible Advanced Options */}
        <AdvancedOptions
          teachingStyle={teachingStyle} setTeachingStyle={setTeachingStyle}
          difficulty={difficulty} setDifficulty={setDifficulty}
          learningPreferences={learningPreferences} setLearningPreferences={setLearningPreferences}
          classType={classType} setClassType={setClassType}
        />

        {/* Differentiation Cards & Switch */}
        <DifferentiationToggle
          enabled={differentiatedEnabled} setEnabled={setDifferentiatedEnabled}
          selections={differentiationSelections} setSelections={setDifferentiationSelections}
        />

        {/* Resource Selection Checkbox Cards & Quiz Question Selector */}
        <ResourceSelector
          selected={selectedResources}
          setSelected={setSelectedResources}
          quizQuestionCount={quizQuestionCount}
          setQuizQuestionCount={setQuizQuestionCount}
        />

        {/* Generate Button Card */}
        <div className="card" style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          backgroundColor: '#FFFFFF'
        }}>
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              maxWidth: '380px',
              margin: '0 auto',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.35)'
            }}
          >
            <Sparkles size={20} />
            <span>✨ Generate Lesson</span>
          </button>
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            marginTop: '0.75rem'
          }}>
            Usually takes a few seconds
          </p>
        </div>
      </form>

      {/* Generation Progress Overlay */}
      {isGenerating && (
        <GenerationProgress
          stepIndex={generationProgress.stepIndex}
          currentStep={generationProgress.stepName}
        />
      )}
    </div>
  );
}
