import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './components/landing/LandingPage';
import CreateLessonPage from './components/create/CreateLessonPage';
import WorkspacePage from './components/workspace/WorkspacePage';
import SuccessPage from './components/resources/SuccessPage';
import MyLessonsPage from './components/history/MyLessonsPage';
import ResourceCreationModal from './components/resources/ResourceCreationModal';
import GoogleClassroomModal from './components/workspace/GoogleClassroomModal';
import GoogleConnectModal from './components/common/GoogleConnectModal';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LessonProvider, useLesson } from './context/LessonContext';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname || '/';
  });

  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const { isClassroomModalOpen, setIsClassroomModalOpen, isAuthModalOpen, setIsAuthModalOpen } = useLesson();

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newRoute) => {
    window.history.pushState({}, '', newRoute);
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route switcher
  const renderRoute = () => {
    switch (currentRoute) {
      case '/create':
        return <CreateLessonPage navigate={navigate} />;
      case '/workspace':
        return (
          <WorkspacePage
            navigate={navigate}
            onOpenGoogleModal={() => setIsGoogleModalOpen(true)}
          />
        );
      case '/resources':
        return <SuccessPage navigate={navigate} />;
      case '/history':
        return <MyLessonsPage navigate={navigate} />;
      case '/':
      default:
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <div 
      className="gemini-app-layout"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-on-surface)',
        transition: 'background-color var(--transition-base), color var(--transition-base)'
      }}
    >
      <Header currentRoute={currentRoute} navigate={navigate} />

      <main 
        className="main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <div className="app-container">
          {renderRoute()}
        </div>
      </main>

      <Footer navigate={navigate} />

      {/* Global Google Workspace Creation Modal */}
      <ResourceCreationModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onComplete={() => {
          setIsGoogleModalOpen(false);
          navigate('/resources');
        }}
      />

      {/* Global Google Classroom Publishing Modal */}
      <GoogleClassroomModal
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
      />

      {/* Global Google & Gmail Account Modal */}
      <GoogleConnectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LessonProvider>
          <AppContent />
        </LessonProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
