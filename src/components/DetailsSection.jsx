import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, ExternalLink } from 'lucide-react';
import { downloadIcsFile, getGoogleCalendarUrl, EVENT_DETAILS } from '../utils/calendar';

export default function DetailsSection() {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadIcs = () => {
    downloadIcsFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section
      id="details"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-[#12141C]"
    >
      {/* 1. Full-Bleed Frisco Hall Event Center Background (HD Twilight Photo - Desktop only) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_top_30%]"
          style={{ backgroundImage: `url('/assets/venue_hd_full.jpg')` }}
        />
        {/* Dark Scrim Gradients for contrast while keeping the lit venue visible */}
        <div className="absolute inset-0 bg-[#0A0C12]/55 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-[#12141C]/80" />
      </div>

      {/* Mobile Ambient Background: Deep luxury midnight navy gradient */}
      <div className="md:hidden absolute inset-0 z-0 bg-gradient-to-b from-[#090C14] via-[#0E1322] to-[#090C14]" />

      {/* Mobile Lower Background: Full-Bleed Building Image shifted right to show "THE CROWN" sign */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 w-full h-[48%] z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/the_crown_night.jpg"
          alt="The Crown Venue"
          className="w-full h-full object-cover object-[82%_bottom]"
        />
        {/* Soft top gradient blend into upper dark midnight section background */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#090C14] via-[#090C14]/50 to-transparent" />
        {/* Dark bottom gradient overlay for script text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
      </div>

      {/* 2A. Mobile Details Layout (Pushed higher up into upper canvas) */}
      <div className="md:hidden relative z-10 w-full max-w-sm mx-auto min-h-[100dvh] flex flex-col justify-between pt-6 xs:pt-7 pb-5 px-5">
        
        {/* Top Header & Details List */}
        <div className="w-full flex flex-col">
          {/* Header (Lifted higher up) */}
          <div className="text-center mb-3.5 pt-0">
            <h2
              className="font-display text-[35px] xs:text-[38px] font-normal tracking-wide mb-0.5 leading-tight drop-shadow-md"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F5E5C9 50%, #DFC07A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              The Details
            </h2>
            <p className="text-[10px] font-sans-ui uppercase tracking-[0.26em] text-[#E5E2DC] font-normal">
              All you need to know
            </p>
          </div>

          {/* 4 Detail Rows with Bare Gold Icons */}
          <div className="flex flex-col space-y-3 mb-3.5 text-left">
            {/* 1. Date */}
            <div className="flex items-start space-x-3.5">
              <Calendar className="w-5 h-5 text-[#DFC07A] shrink-0 mt-0.5" strokeWidth={1.8} />
              <div>
                <p className="text-[14.5px] font-medium text-[#F3EFE4] leading-snug">Saturday</p>
                <p className="text-[12.5px] text-[#A9A6A0] leading-snug mt-0.5">November 21, 2026</p>
              </div>
            </div>

            {/* 2. Time */}
            <div className="flex items-center space-x-3.5">
              <Clock className="w-5 h-5 text-[#DFC07A] shrink-0" strokeWidth={1.8} />
              <p className="text-[14.5px] font-medium text-[#F3EFE4] leading-snug">7:00 PM Onwards</p>
            </div>

            {/* 3. Venue */}
            <div className="flex items-start space-x-3.5">
              <MapPin className="w-5 h-5 text-[#DFC07A] fill-[#DFC07A] shrink-0 mt-0.5" />
              <div>
                <p className="text-[14.5px] font-medium text-[#F3EFE4] leading-snug">Frisco Hall Event Center,</p>
                <p className="text-[12.5px] text-[#A9A6A0] leading-snug mt-0.5">Texas, U.S.A</p>
              </div>
            </div>

            {/* 4. Attire */}
            <div className="flex items-center space-x-3.5">
              <svg
                className="w-5 h-5 text-[#DFC07A] shrink-0 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M9 2.5 L10.5 2.5 L11.2 6.5 L12 3 L12.8 6.5 L13.5 2.5 L15 2.5 L14.2 8.5 L9.8 8.5 Z" />
                <path d="M9.6 9.5 L14.4 9.5 L17.2 21.5 L14 21.5 L12.5 13 L12 13 L11.5 13 L10 21.5 L6.8 21.5 Z" />
              </svg>
              <p className="text-[14.5px] font-medium text-[#F3EFE4] leading-snug">Indo-Western or Cocktail Attire</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2.5 mb-2">
            {/* Primary Button: Add to Calendar */}
            <div className="relative">
              <button
                onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                className="w-full bg-[#ECC68F] hover:bg-[#F3D4A3] text-[#12141C] font-sans-ui text-[13.5px] font-semibold tracking-wider py-3 px-5 rounded-full flex items-center justify-center space-x-2.5 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#12141C]" strokeWidth={2.2} />
                <span>{downloadSuccess ? 'Calendar Saved!' : 'Add to Calendar'}</span>
              </button>

              {showCalendarOptions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1B1F2B] border border-[#333A4D] rounded-2xl p-3 shadow-2xl z-30 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleDownloadIcs();
                        setShowCalendarOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#F3EFE4] hover:bg-white/10 flex items-center justify-between"
                    >
                      <span>Apple / Outlook (.ics file)</span>
                      <Check className="w-3.5 h-3.5 text-[#D2A85C]" />
                    </button>
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowCalendarOptions(false)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#F3EFE4] hover:bg-white/10 flex items-center justify-between"
                    >
                      <span>Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D2A85C]" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Button: View on Maps */}
            <a
              href={EVENT_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0E1119]/80 border border-[#ECC68F]/90 hover:border-[#ECC68F] text-[#F3EFE4] hover:text-[#ECC68F] font-sans-ui text-[13.5px] font-medium tracking-wider py-3 px-5 rounded-full flex items-center justify-center space-x-2.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#ECC68F] fill-[#ECC68F]" />
              <span>View on Maps</span>
            </a>
          </div>
        </div>

        {/* Lower Empty Space Over Background: Script Quote */}
        <div className="w-full text-center mt-auto pt-4 pb-2 z-10">
          <p className="font-script text-white text-[21px] xs:text-[23px] sm:text-[26px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Good music. Great company.<br />
            Unforgettable moments.
          </p>
        </div>
      </div>

      {/* 2B. Desktop Centered Information Card (for screens >= md) */}
      <div className="hidden md:block relative z-20 w-full max-w-lg md:max-w-xl mx-auto my-auto">
        <div className="w-full bg-[#12141C]/85 backdrop-blur-xl border border-[#D2A85C]/35 rounded-[36px] p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden text-center transition-all duration-300 hover:border-[#D2A85C]/60 hover:shadow-[0_30px_70px_rgba(210,168,92,0.2)]">
          
          {/* Subtle Decorative Gold Corner Glows */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D2A85C]/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#D2A85C]/10 to-transparent rounded-tr-full pointer-events-none" />

          {/* Header */}
          <div className="mb-7">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F3EFE4] font-normal tracking-wide mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              The Details
            </h2>
            <p className="text-[10px] sm:text-[11px] font-sans-ui uppercase tracking-[0.26em] text-[#D2A85C]">
              All you need to know
            </p>
          </div>

          {/* 4 Detail Rows */}
          <div className="flex flex-col text-left space-y-4 max-w-sm sm:max-w-md mx-auto mb-7">
            
            {/* 1. Date */}
            <div className="flex items-start space-x-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1B1F2B] border border-[#333A4D] flex items-center justify-center shrink-0 shadow-md">
                <Calendar className="w-5 h-5 text-[#D2A85C]" />
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-[#F3EFE4]">Saturday</p>
                <p className="text-xs text-[#A9A6A0] tracking-wide">November 21, 2026</p>
              </div>
            </div>

            {/* 2. Time */}
            <div className="flex items-start space-x-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1B1F2B] border border-[#333A4D] flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-5 h-5 text-[#D2A85C]" />
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium text-[#F3EFE4]">7:00 PM Onwards</p>
              </div>
            </div>

            {/* 3. Venue */}
            <div className="flex items-start space-x-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1B1F2B] border border-[#333A4D] flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-5 h-5 text-[#D2A85C]" />
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-[#F3EFE4]">Frisco Hall Event Center,</p>
                <p className="text-xs text-[#A9A6A0] tracking-wide">Texas, U.S.A</p>
              </div>
            </div>

            {/* 4. Attire */}
            <div className="flex items-start space-x-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1B1F2B] border border-[#333A4D] flex items-center justify-center shrink-0 shadow-md">
                <svg
                  className="w-5 h-5 text-[#D2A85C]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2.1L2 14v1a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1l-7.8-6.9c.5-.6.8-1.3.8-2.1a3 3 0 0 0-3-3z" />
                  <path d="M6 16l2 6h8l2-6" />
                </svg>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium text-[#F3EFE4]">Indo-Western or Cocktail Attire</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 max-w-sm sm:max-w-md mx-auto mb-6">
            {/* Primary Button: Add to Calendar */}
            <div className="relative">
              <button
                onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                className="w-full bg-[#D2A85C] hover:bg-[#E7CE9C] text-[#12141C] font-sans-ui text-sm font-semibold tracking-wider py-3.5 px-6 rounded-full flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-gold-glow hover:scale-[1.02] active-press"
              >
                <Calendar className="w-4 h-4 text-[#12141C]" />
                <span>{downloadSuccess ? 'Calendar Saved!' : 'Add to Calendar'}</span>
              </button>

              {showCalendarOptions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1B1F2B] border border-[#333A4D] rounded-2xl p-3 shadow-2xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-[10px] text-[#A9A6A0] uppercase tracking-wider mb-2 text-center">
                    Choose Your Calendar
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleDownloadIcs();
                        setShowCalendarOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#F3EFE4] hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      <span>Apple / Outlook (.ics file)</span>
                      <Check className="w-3.5 h-3.5 text-[#D2A85C]" />
                    </button>
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowCalendarOptions(false)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#F3EFE4] hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      <span>Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D2A85C]" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Button: View on Maps */}
            <a
              href={EVENT_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-transparent border border-[#D2A85C]/70 hover:border-[#D2A85C] text-[#D2A85C] hover:text-[#E7CE9C] font-sans-ui text-sm font-medium tracking-wider py-3 px-6 rounded-full flex items-center justify-center space-x-2.5 transition-all duration-300 hover:bg-[#D2A85C]/10 active-press"
            >
              <MapPin className="w-4 h-4" />
              <span>View on Maps</span>
            </a>
          </div>

          {/* Bottom Script Tagline */}
          <div className="pt-4 border-t border-[#333A4D]/40 max-w-sm mx-auto">
            <p className="font-script text-[#E7CE9C] text-2xl sm:text-3xl leading-relaxed">
              Good music. Great company.<br />
              Unforgettable moments.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
