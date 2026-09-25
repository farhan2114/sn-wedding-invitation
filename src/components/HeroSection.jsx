import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection({ isUnlocked, isTransitioning, onUnlockAndScroll }) {
  return (
    <section
      id="invitation"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 sm:px-8 md:px-12 py-16 overflow-hidden bg-[#12141C]"
    >
      {/* 1. Room Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile Background: using the uploaded high-res image media_1790353885532.png */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('/assets/hero_mobile_bg.png')` }}
        />

        {/* Desktop Background: hall_background.jpg with Cinematic Push-In */}
        <div
          className={`hidden md:block absolute inset-0 bg-cover bg-center sm:bg-[center_center] transition-transform duration-1000 ease-out ${
            isTransitioning ? 'scale-115 filter brightness-105' : 'scale-100'
          }`}
          style={{ backgroundImage: `url('/assets/hall_background.jpg')` }}
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C]/80 via-transparent to-[#12141C]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#12141C]/60 hidden md:block" />
      </div>

      {/* 2. Top Ceiling Accent: Hanging Golden Tube Pendant Lights (Desktop only) */}
      <div className={`hidden md:block absolute -top-2 left-[18%] sm:left-[20%] md:left-[22%] lg:left-[24%] z-10 pointer-events-none transition-transform duration-1000 ease-out ${
        isTransitioning ? 'translate-y-2 scale-105' : 'translate-y-0'
      }`}>
        <img
          src="/assets/elements/pendant_lights_hd.png"
          alt="Hanging Tube Pendant Lights"
          className="w-28 sm:w-34 md:w-40 lg:w-48 h-auto object-contain opacity-90 drop-shadow-[0_0_25px_rgba(210,168,92,0.5)]"
        />
      </div>

      {/* 3. Top-Right Ceiling Accent: Large Hanging Golden Disco Ball (Desktop only) */}
      <div className={`hidden md:block absolute top-1 sm:top-3 md:top-5 right-3 sm:right-8 md:right-14 lg:right-20 z-20 pointer-events-none transition-transform duration-1000 ease-out ${
        isTransitioning ? 'scale-110' : 'scale-100'
      }`}>
        <img
          src="/assets/elements/disco_ball_hd.png"
          alt="Golden Mirror Disco Ball"
          className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] animate-sway"
        />
      </div>

      {/* 4. Bottom-Right Floor Accent: Floral Candles Decor (Desktop only) */}
      <div className={`hidden md:block absolute bottom-5 sm:bottom-7 md:bottom-9 lg:bottom-12 right-2 sm:right-6 md:right-10 lg:right-14 z-20 pointer-events-none transition-transform duration-1000 ease-out ${
        isTransitioning ? 'scale-105' : 'scale-100'
      }`}>
        <img
          src="/assets/elements/hd_floral_candles.png"
          alt="Wedding Floral & Candle Decor"
          className="w-28 sm:w-36 md:w-44 lg:w-50 h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)] animate-candle"
        />
      </div>

      {/* 5. Main Hero Content Layout */}
      {/* 5A. Mobile Layout (matching reference screenshot media_1790353791004.png) */}
      <div className="md:hidden relative z-20 w-full h-[100dvh] flex flex-col justify-between items-center pt-14 pb-5 px-4 overflow-hidden">
        
        {/* Top Typography & Logo */}
        <div className="flex flex-col items-center text-center mt-1 z-20">
          {/* Logo brought down from navbar right above Together lines */}
          <div className="flex justify-center items-center mb-2.5">
            <img
              src="/assets/sn_logo.png"
              alt="S & N Logo"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_4px_16px_rgba(210,168,92,0.65)] filter brightness-105"
            />
          </div>

          <p className="text-[10px] sm:text-[11px] font-sans-ui uppercase tracking-[0.28em] text-[#A9A6A0] font-normal leading-relaxed mb-1.5 drop-shadow-sm">
            Together<br />
            is a beautiful<br />
            place to be
          </p>
          <h1
            className="font-display text-[46px] xs:text-[50px] sm:text-[54px] tracking-wide font-normal leading-[1.05] mb-2"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #F8ECD2 80%, #DFC07A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.95))',
              display: 'inline-block'
            }}
          >
            Sangeet &amp;<br />
            Cocktails
          </h1>
          <p className="text-[9.5px] sm:text-[10.5px] font-sans-ui uppercase tracking-[0.24em] text-white font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            A night of music, celebration<br />and love
          </p>
        </div>

        {/* Center: Glowing Neon "Let's Celebrate" script button lowered towards bride's waist */}
        <div className="relative flex-1 w-full flex items-center justify-start z-20">
          <button
            onClick={onUnlockAndScroll}
            disabled={isTransitioning}
            className={`absolute left-3 sm:left-6 top-[65%] -translate-y-1/2 font-script text-[40px] sm:text-[48px] text-[#FFF4D6] -rotate-12 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer outline-none focus:outline-none select-none ${
              isTransitioning ? 'scale-110' : ''
            }`}
            style={{
              textShadow: '0 0 10px rgba(255, 235, 180, 0.95), 0 0 25px rgba(210, 168, 92, 0.9), 0 0 45px rgba(210, 168, 92, 0.75)',
              filter: 'drop-shadow(0 0 15px rgba(210, 168, 92, 0.9))'
            }}
            aria-label="Let's Celebrate — Click to enter"
          >
            Let's<br />Celebrate
          </button>
        </div>

        {/* Bottom Date, Venue & Explicit "Click Let's Celebrate" Prompt */}
        <div className="flex flex-col items-center text-center z-20 w-full pb-5 pt-1">
          <p className="text-[11px] sm:text-xs font-sans-ui uppercase tracking-[0.24em] text-[#F3EFE4] font-medium mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Saturday, November 21, 2026
          </p>
          <p className="text-[9.5px] sm:text-[10px] font-sans-ui uppercase tracking-[0.2em] text-[#A9A6A0] mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Frisco Hall Event Center, Texas
          </p>

          {/* Click "Let's Celebrate" Prompt */}
          <button
            onClick={onUnlockAndScroll}
            className="flex items-center space-x-2 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#E7CE9C] hover:text-white transition-colors cursor-pointer outline-none focus:outline-none py-1.5 px-4 rounded-full border border-[#D2A85C]/40 bg-[#12141C]/65 backdrop-blur-xs animate-pulse active:scale-95"
            aria-label="Click Let's Celebrate to Enter"
          >
            <Sparkles className="w-3 h-3 text-[#D2A85C]" />
            <span>Click "Let's Celebrate" to Enter</span>
            <Sparkles className="w-3 h-3 text-[#D2A85C]" />
          </button>
        </div>
      </div>

      {/* 5B. Desktop Hero Content Layout (Unchanged for screens >= md) */}
      <div className="hidden md:flex relative z-20 w-full max-w-7xl mx-auto flex-col md:flex-row items-center md:items-end justify-between min-h-[92vh] pt-14 md:pt-16 pb-0">
        
        {/* Left Side: Couple Cutout with Cinematic Camera Push-In */}
        <div className={`w-full md:w-1/2 flex justify-center md:justify-start items-end relative order-2 md:order-1 mt-6 md:mt-0 self-end pb-0 mb-0 transition-transform duration-1000 ease-out ${
          isTransitioning ? 'scale-[1.04] translate-y-1' : 'scale-100'
        }`}>
          <div className="relative flex items-end justify-center md:justify-start w-full">
            <img
              src="/assets/couple_cutout.png"
              alt="S & N - The Couple"
              className="h-[62vh] sm:h-[72vh] md:h-[84vh] lg:h-[88vh] max-h-[820px] w-auto object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] filter contrast-[1.03]"
            />
          </div>
        </div>

        {/* Right Side: Royal Floral Arch Card with Parallax Depth Response */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center order-1 md:order-2 self-center my-auto py-3">
          <div className={`w-full max-w-lg sm:max-w-xl md:max-w-[560px] lg:max-w-[600px] relative rounded-[40px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-[#D2A85C]/40 group transition-all duration-1000 ease-out ${
            isTransitioning ? 'scale-[1.03] shadow-[0_30px_80px_rgba(210,168,92,0.3)] border-[#D2A85C]' : 'scale-100 hover:shadow-[0_30px_70px_rgba(210,168,92,0.25)]'
          }`}>
            
            {/* Background Image of the Royal Floral Arch */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url('/assets/floral_arch_card.jpg')` }}
            />
            
            {/* Center Scrim for text readability */}
            <div className="absolute inset-0 bg-radial from-[#0A0C12]/75 via-[#0A0C12]/50 to-transparent pointer-events-none" />

            {/* Content positioned in the middle space between the floral columns */}
            <div className="relative z-10 px-9 sm:px-14 md:px-16 lg:px-18 py-10 sm:py-12 md:py-14 flex flex-col items-center text-center">
              
              {/* Eyebrow */}
              <p className="text-[11px] sm:text-[12px] font-sans-ui uppercase tracking-[0.3em] text-[#F3EFE4]/90 leading-relaxed font-light mb-3.5 drop-shadow-md">
                Together<br />
                is a beautiful<br />
                place to be
              </p>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] text-[#D2A85C] tracking-wide font-normal leading-[1.08] mb-3.5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                Sangeet &amp;<br />
                Cocktails
              </h1>

              {/* Subtext */}
              <p className="text-[9.5px] sm:text-[10.5px] font-sans-ui uppercase tracking-[0.26em] text-[#E7CE9C]/90 leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-6 drop-shadow-sm">
                A night of music, celebration<br />and love
              </p>

              {/* Date & Venue Box */}
              <div className="py-3 px-5 rounded-2xl bg-[#0A0C12]/65 border border-[#D2A85C]/35 mb-5 space-y-1 backdrop-blur-xs w-full max-w-[300px]">
                <p className="text-[12px] sm:text-[13px] font-sans-ui uppercase tracking-[0.24em] text-[#F3EFE4] font-medium">
                  Saturday, November 21, 2026
                </p>
                <p className="text-[9.5px] sm:text-[10.5px] font-sans-ui uppercase tracking-[0.2em] text-[#A9A6A0]">
                  Frisco Hall Event Center, Texas
                </p>
              </div>

              {/* Celebratory Champagne Toast Accent */}
              <div className="flex justify-center mb-1 pointer-events-none">
                <img
                  src="/assets/elements/hd_champagne.png"
                  alt="Champagne Toast"
                  className="w-14 sm:w-16 md:w-18 h-auto object-contain drop-shadow-[0_4px_16px_rgba(210,168,92,0.5)] animate-cheers"
                />
              </div>

              {/* Interactive "Let's Celebrate" Text Button */}
              <div className="pt-0 flex flex-col items-center">
                {/* User Instruction Prompt */}
                <div className="mb-1.5 flex items-center space-x-1.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#D2A85C] animate-pulse">
                  <Sparkles className="w-3 h-3 text-[#D2A85C]" />
                  <span>
                    {isUnlocked ? 'Explore Invitation' : 'Click below to enter'}
                  </span>
                  <Sparkles className="w-3 h-3 text-[#D2A85C]" />
                </div>

                {/* Pure script text acting directly as the clickable button */}
                <button
                  onClick={onUnlockAndScroll}
                  disabled={isTransitioning}
                  className={`font-script text-[#E7CE9C] hover:text-[#FFFFFF] text-5xl sm:text-6xl md:text-[72px] leading-tight transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] ${
                    isTransitioning ? 'scale-105 text-white' : 'hover:scale-105'
                  }`}
                  aria-label="Let's Celebrate — Click to open website"
                >
                  Let's Celebrate
                </button>

                {/* Clarifying hint */}
                <p className="mt-2 text-[9px] sm:text-[10px] font-sans-ui uppercase tracking-[0.2em] text-[#A9A6A0]">
                  {isUnlocked
                    ? 'Website unlocked • Scroll to explore details'
                    : 'Click "Let\'s Celebrate" to reveal details & RSVP'}
                </p>
              </div>

              {/* Downward indicator if unlocked */}
              {isUnlocked && (
                <div className="mt-4 pt-2.5 border-t border-white/10 flex justify-center w-full">
                  <button
                    onClick={onUnlockAndScroll}
                    className="flex items-center space-x-1.5 text-[9.5px] uppercase tracking-[0.25em] text-[#A9A6A0] hover:text-[#D2A85C] transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#D2A85C]" />
                    <span>Scroll to Details</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
