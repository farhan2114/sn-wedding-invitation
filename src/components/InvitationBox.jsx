import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { playGlobalAudio } from './AudioAtmosphere';

export default function InvitationBox({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Synchronous call in direct user gesture to ensure unmuted audio autoplay
    playGlobalAudio();

    if (onOpen) {
      onOpen();
    }

    // Cleanly unmount from DOM after smooth fade-out and scale transition
    setTimeout(() => {
      setIsRemoved(true);
    }, 850);
  };

  if (isRemoved) return null;

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-out select-none cursor-pointer ${
        isOpen
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 bg-[#0A0C14]/95 backdrop-blur-2xl'
      }`}
      aria-label="Wedding Invitation Envelope - Tap to Open"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpen();
        }
      }}
    >
      {/* Ambient Radial Golden Aura in the background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#D2A85C]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0C14_85%)]" />
      </div>

      {/* Royal Invitation Card / Box */}
      <div
        className={`relative w-full max-w-[370px] sm:max-w-[430px] rounded-3xl p-1 sm:p-1.5 transition-all duration-700 ${
          isOpen ? 'scale-110 blur-sm' : 'scale-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(210,168,92,0.85) 0%, rgba(245,229,192,0.5) 35%, rgba(182,138,62,0.85) 70%, rgba(245,229,192,0.4) 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 35px rgba(210,168,92,0.3)'
        }}
      >
        {/* Inner Card Velvet Body */}
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#181D2C] via-[#121520] to-[#0D0F18] border border-[#D2A85C]/30 px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-center text-center overflow-hidden">
          
          {/* Subtle Golden Radial Sheen inside card */}
          <div className="absolute -top-16 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(210,168,92,0.18),transparent_70%)] pointer-events-none" />

          {/* Ornate Gold Corner Accents */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D2A85C]/60 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D2A85C]/60 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D2A85C]/60 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D2A85C]/60 rounded-br-sm pointer-events-none" />

          {/* Eyebrow Invitation Text */}
          <p className="font-sans-ui text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[#E7CE9C]/80 font-light mb-4 drop-shadow-sm">
            You Are Cordially Invited
          </p>

          {/* Royal SN Monogram Logo */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-[#D2A85C]/20 blur-xl animate-pulse" />
            <img
              src="/assets/sn_logo.png"
              alt="S & N Royal Monogram"
              className="relative z-10 w-20 sm:w-24 h-auto object-contain filter brightness-105 drop-shadow-[0_4px_16px_rgba(210,168,92,0.7)]"
            />
          </div>

          {/* Couple Names */}
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8ECD2] to-[#DFC07A] mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Sreeja &amp; Nikhil
          </h2>

          {/* Decorative Gold Diamond Divider */}
          <div className="flex items-center justify-center space-x-2.5 w-28 sm:w-32 my-3 opacity-90">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D2A85C] to-[#D2A85C]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#D2A85C] border border-[#F5E5C0]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D2A85C] to-[#D2A85C]" />
          </div>

          {/* Event Title */}
          <p className="font-cormorant text-lg sm:text-xl font-semibold tracking-[0.22em] uppercase text-[#D2A85C] mb-1">
            Sangeet &amp; Cocktails
          </p>

          {/* Date & Location */}
          <p className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F3EFE4]/80 mb-6 font-medium">
            Friday, November 20, 2026 • Dallas, TX
          </p>

          {/* Animated "Tap to Open" Button CTA */}
          <div className="relative group w-full flex flex-col items-center">
            {/* Outer Pulsing Glow Wave */}
            <div className="absolute inset-0 max-w-[220px] mx-auto rounded-full bg-[#D2A85C]/30 blur-md animate-pulse pointer-events-none" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className="relative z-10 w-full max-w-[220px] py-3 px-6 rounded-full bg-gradient-to-r from-[#D2A85C] via-[#F8ECD2] to-[#B68A3E] text-[#12141C] font-sans-ui font-semibold text-xs sm:text-[13px] uppercase tracking-[0.26em] shadow-[0_0_25px_rgba(210,168,92,0.65)] hover:shadow-[0_0_35px_rgba(210,168,92,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 border border-[#FFF8E7]/70 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#12141C] animate-spin" style={{ animationDuration: '4s' }} />
              <span>Tap to Open</span>
            </button>

            {/* Sub-hint */}
            <p className="mt-3 text-[9px] sm:text-[9.5px] uppercase tracking-[0.22em] text-[#A9A6A0] font-sans-ui">
              Tap anywhere to enter &amp; play music
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
