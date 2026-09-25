import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';

export default function Header({ activeSection, onNavigate, isAudioPlaying, onToggleAudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'invitation', label: '01. INVITATION' },
    { id: 'details', label: '02. THE DETAILS' },
    { id: 'rsvp', label: '03. RSVP' },
    { id: 'thank-you', label: '04. THANK YOU' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 py-2.5 sm:py-3.5 border-none outline-none select-none transition-all duration-300"
        style={{ border: 'none', borderBottom: 'none', outline: 'none' }}
      >
        {/* Layer 1: Ambient top gradient - smoothly fades out on scroll */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[#12141C]/90 via-[#12141C]/40 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Layer 2: Frosted glass bar - smoothly cross-fades in on scroll */}
        <div
          className={`absolute inset-0 bg-[#12141C]/85 backdrop-blur-md shadow-[0_6px_30px_rgba(0,0,0,0.65)] pointer-events-none transition-opacity duration-500 ease-in-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Full width container: left elements to the left-most side, right to right-most side */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 flex items-center justify-between">
          
          {/* Desktop Left-most: Gold Floral S&N Logo */}
          <button
            onClick={() => handleNavClick('invitation')}
            className="hidden lg:flex items-center space-x-2.5 group outline-none focus:outline-none focus-visible:outline-none focus:ring-0 transition-transform hover:scale-105"
            aria-label="S & N Home"
          >
            <img
              src="/assets/sn_logo.png"
              alt="S & N Monogram"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(210,168,92,0.4)]"
            />
          </button>

          {/* Mobile Center Monogram: Matches all 4 mobile reference screens */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => handleNavClick('invitation')}
              className="flex items-center space-x-2 font-display text-xl sm:text-2xl text-[#E7CE9C] tracking-[0.25em] outline-none focus:outline-none"
            >
              <span>S</span>
              <span className="text-[#D2A85C]/60 font-light">|</span>
              <span>N</span>
            </button>
          </div>

          {/* Desktop Navigation Links (Optional subtle center items) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-[0.22em] font-sans-ui transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeSection === item.id
                    ? 'text-[#D2A85C] font-semibold border-b border-[#D2A85C] pb-0.5'
                    : 'text-[#A9A6A0] hover:text-[#F3EFE4] border-b border-transparent pb-0.5'
                }`}
              >
                {item.label.split('. ')[1]}
              </button>
            ))}
          </nav>

          {/* Right-most Action Icons: Audio Toggle & Hamburger */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className="text-[#D2A85C] hover:text-[#E7CE9C] p-2 rounded-full hover:bg-white/5 transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
              title={isAudioPlaying ? 'Mute Atmosphere Audio' : 'Play Atmosphere Audio'}
              aria-label="Toggle Atmosphere Audio"
            >
              {isAudioPlaying ? (
                <div className="flex items-center space-x-1">
                  <span className="w-1 h-3 bg-[#D2A85C] animate-pulse rounded-full"></span>
                  <span className="w-1 h-4 bg-[#D2A85C] animate-pulse delay-75 rounded-full"></span>
                  <span className="w-1 h-2 bg-[#D2A85C] animate-pulse delay-150 rounded-full"></span>
                  <Volume2 className="w-4 h-4 ml-1 text-[#D2A85C]" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4 text-[#A9A6A0] hover:text-[#D2A85C]" />
              )}
            </button>

            {/* 3-bar Hamburger Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-[#F3EFE4] hover:text-[#D2A85C] transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-[#D2A85C]" />
              ) : (
                <div className="w-6 h-5 flex flex-col justify-between items-end group cursor-pointer">
                  <span className="w-6 h-[2px] bg-[#D2A85C] transition-all group-hover:w-5"></span>
                  <span className="w-5 h-[2px] bg-[#D2A85C] transition-all group-hover:w-6"></span>
                  <span className="w-6 h-[2px] bg-[#D2A85C] transition-all group-hover:w-4"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Full Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0A0C12]/80 backdrop-blur-xl transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-[#12141C] border-l border-[#333A4D]/50 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#333A4D]/50">
              <img
                src="/assets/sn_logo.png"
                alt="S & N Monogram"
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-[#A9A6A0] hover:text-[#D2A85C] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm uppercase tracking-[0.25em] font-sans-ui transition-all py-2 border-b border-white/5 ${
                    activeSection === item.id
                      ? 'text-[#D2A85C] font-semibold pl-2 border-[#D2A85C]/40'
                      : 'text-[#F3EFE4] hover:text-[#D2A85C] hover:pl-2'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#333A4D]/40 text-center">
            <p className="font-script text-[#D2A85C] text-3xl mb-1">Let's Celebrate</p>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#A9A6A0]">
              November 21, 2026 • Frisco, TX
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
