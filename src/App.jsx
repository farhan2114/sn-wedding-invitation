import React, { useState, useEffect } from 'react';
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
  
  // Page is locked to Hero until "Let's Celebrate" is clicked
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prevent scroll when locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isUnlocked]);

  // Scroll listener to update active header indicator
  useEffect(() => {
    if (!isUnlocked) return;

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
  }, [isUnlocked]);

  const scrollToSection = (id) => {
    if (!isUnlocked) {
      handleUnlockAndScroll();
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnlockAndScroll = () => {
    if (isTransitioning) return;

    // 1. Start smooth transition state
    setIsTransitioning(true);

    // 2. Unlock the page
    setIsUnlocked(true);

    // 4. Smooth scroll down to details
    setTimeout(() => {
      const detailsEl = document.getElementById('details');
      if (detailsEl) {
        detailsEl.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 400);
  };

  const handleRsvpSubmitted = (data) => {
    setRsvpSubmission(data);
    setTimeout(() => {
      scrollToSection('thank-you');
    }, 350);
  };

  return (
    <div className={`min-h-screen bg-[#12141C] text-[#F3EFE4] relative font-sans-ui selection:bg-[#D2A85C]/30 selection:text-[#E7CE9C] ${!isUnlocked ? 'h-[100dvh] overflow-hidden' : ''}`}>
      {/* Subtle Golden Bokeh Particles */}
      <AmbientParticles />

      {/* Web Audio Synthesizer */}
      <AudioAtmosphere
        isPlaying={isAudioPlaying}
        onToggle={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* Subtle Golden Ambient Light Wave Transition (NO floating text overlay) */}
      {isTransitioning && (
        <div className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-700 ease-out bg-radial from-[#D2A85C]/20 via-[#D2A85C]/5 to-transparent blur-2xl" />
      )}

      {/* Sticky Top Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* Main Flow: Hero Page opens immediately */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero / Invitation */}
        <HeroSection
          isUnlocked={isUnlocked}
          isTransitioning={isTransitioning}
          onUnlockAndScroll={handleUnlockAndScroll}
        />

        {/* Sections 2, 3, and 4 (Revealed upon clicking "Let's Celebrate" with smooth sliding fade) */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            isUnlocked
              ? 'opacity-100 translate-y-0 max-h-[10000px] pointer-events-auto'
              : 'opacity-0 translate-y-12 max-h-0 overflow-hidden pointer-events-none'
          }`}
        >
          {/* Section 2: The Details */}
          <DetailsSection isUnlocked={isUnlocked} />

          {/* Section 3: RSVP */}
          <RsvpSection onRsvpSubmitted={handleRsvpSubmitted} />

          {/* Section 4: Thank You & Confirmation */}
          <ThankYouSection rsvpSubmission={rsvpSubmission} />
        </div>
      </main>
    </div>
  );
}
