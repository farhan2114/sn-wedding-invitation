import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DetailsSection from './components/DetailsSection';
import RsvpSection from './components/RsvpSection';
import ThankYouSection from './components/ThankYouSection';
import AmbientParticles from './components/AmbientParticles';
import AudioAtmosphere from './components/AudioAtmosphere';

export default function App() {
  const [activeSection, setActiveSection] = useState('invitation');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [rsvpSubmission, setRsvpSubmission] = useState(null);
  const [editingRsvpData, setEditingRsvpData] = useState(null);
  const toggleAudioRef = useRef(null);

  const handleToggleAudio = () => {
    if (toggleAudioRef.current) {
      toggleAudioRef.current();
    }
  };

  const handleEditRsvp = () => {
    if (rsvpSubmission) {
      setEditingRsvpData(rsvpSubmission);
    }
    scrollToSection('rsvp');
  };

  // Scroll listener to update active header indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['invitation', 'details', 'rsvp', 'thank-you'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDetails = () => {
    const el = document.getElementById('details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRsvpSubmitted = (data) => {
    setRsvpSubmission(data);
    setEditingRsvpData(data);
    // Keep user in RSVP section to view the confirmed/updated card in place
  };

  return (
    <div className="min-h-screen bg-[#12141C] text-[#F3EFE4] relative font-sans-ui selection:bg-[#D2A85C]/30 selection:text-[#E7CE9C]">
      {/* Subtle Golden Bokeh Particles */}
      <AmbientParticles />

      {/* Background Audio Player */}
      <AudioAtmosphere
        onPlayStateChange={setIsAudioPlaying}
        toggleRef={toggleAudioRef}
      />

      {/* Sticky Top Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Flow: Seamless single-page scrolling */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero / Invitation */}
        <HeroSection onScrollDown={handleScrollToDetails} />

        {/* Section 2: The Details */}
        <DetailsSection />

        {/* Section 3: RSVP */}
        <RsvpSection 
          onRsvpSubmitted={handleRsvpSubmitted} 
          editingData={editingRsvpData}
        />

        {/* Section 4: Thank You & Confirmation */}
        <ThankYouSection 
          rsvpSubmission={rsvpSubmission} 
          onEditRsvp={handleEditRsvp}
        />
      </main>
    </div>
  );
}
