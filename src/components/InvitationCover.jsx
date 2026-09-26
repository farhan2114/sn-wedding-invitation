import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, MailOpen } from 'lucide-react';

export default function InvitationCover({ isOpen, onOpen }) {
  const [shouldRender, setShouldRender] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      onClick={onOpen}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 transition-all duration-700 ease-out select-none cursor-pointer ${
        isOpen
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1B1F2B 0%, #12141C 70%, #0A0C12 100%)',
      }}
    >
      {/* Subtle Luxury Outer Gold Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#D2A85C]/30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-5 sm:inset-9 border border-[#D2A85C]/15 rounded-2xl pointer-events-none" />

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-4 h-4 border-t-2 border-l-2 border-[#D2A85C]/60" />
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-4 h-4 border-t-2 border-r-2 border-[#D2A85C]/60" />
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-4 h-4 border-b-2 border-l-2 border-[#D2A85C]/60" />
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-4 h-4 border-b-2 border-r-2 border-[#D2A85C]/60" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm sm:max-w-md mx-auto">
        {/* Monogram Logo */}
        <div className="mb-4">
          <img
            src="/assets/sn_logo.png"
            alt="S & N Logo"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(210,168,92,0.6)] animate-pulse"
          />
        </div>

        {/* Eyebrow */}
        <p className="font-cormorant text-xs sm:text-sm tracking-[0.35em] uppercase text-[#E7CE9C]/90 mb-2 font-light">
          You Are Cordially Invited
        </p>

        {/* Couple Names */}
        <h2 className="font-cormorant text-2xl sm:text-3xl font-medium tracking-[0.25em] uppercase text-[#F3EFE4] mb-1 drop-shadow-md">
          Sreeja &amp; Nikhil
        </h2>

        {/* Event Title */}
        <p className="font-display text-xl sm:text-2xl text-[#D2A85C] tracking-wide mb-6">
          Sangeet &amp; Cocktails
        </p>

        {/* Glowing "Open Invitation" Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D2A85C] via-[#DFC07A] to-[#D2A85C] text-[#12141C] font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(210,168,92,0.5)] hover:shadow-[0_0_45px_rgba(210,168,92,0.8)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer outline-none"
        >
          <MailOpen className="w-4 h-4 text-[#12141C] transition-transform group-hover:scale-110" />
          <span>Open Invitation</span>
          <Volume2 className="w-4 h-4 text-[#12141C] animate-pulse" />
        </button>

        {/* Subtle subtext */}
        <p className="mt-5 text-[10px] sm:text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#A9A6A0]/80">
          Tap to enter with music
        </p>
      </div>
    </div>
  );
}
