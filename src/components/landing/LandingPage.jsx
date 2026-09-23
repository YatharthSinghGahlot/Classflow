import React from 'react';
import Hero from './Hero';
import WorkflowSection from './WorkflowSection';

export default function LandingPage({ navigate }) {
  const handleStartCreating = () => {
    navigate('/create');
  };

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('how-it-works-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/workspace');
    }
  };

  const handleOpenWorkspace = () => {
    navigate('/workspace');
  };

  return (
    <div className="landing-page animate-fade-in">
      <Hero 
        onStartCreating={handleStartCreating} 
        onSeeHowItWorks={handleSeeHowItWorks} 
      />

      <div id="how-it-works-anchor">
        <WorkflowSection 
          onStartCreating={handleStartCreating} 
          onOpenWorkspace={handleOpenWorkspace} 
        />
      </div>
    </div>
  );
}
