import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { downloadIcsFile } from '../utils/calendar';

export default function ThankYouSection({ rsvpSubmission }) {
  return (
    <section
      id="thank-you"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-5 sm:px-8 pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden bg-[#12141C]"
    >
      {/* Full-Bleed Luxury Cocktail Lounge Background */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background: New Disco & Cocktail Lounge Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 md:hidden"
          style={{ backgroundImage: `url('/assets/thank_you_mobile.png')` }}
        />
        {/* Mobile Scrim for text readability */}
        <div className="absolute inset-0 bg-[#12141C]/30 md:hidden pointer-events-none" />

        {/* Desktop Background */}
        <div
          className="absolute inset-0 bg-cover bg-[72%_center] sm:bg-center transition-all duration-700 hidden md:block"
          style={{ backgroundImage: `url('/assets/thank_you_bg.jpg')` }}
        />
        {/* Subtle top and bottom edge gradients for smooth section continuity */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#12141C] via-[#12141C]/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#12141C]/90 via-[#12141C]/50 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-lg w-full mx-auto flex-1 flex flex-col justify-between items-center">
        {/* Top & Center Area */}
        <div className="pt-6 w-full my-auto">
          {/* Post-submit confirmation badge if submitted */}
          {rsvpSubmission && (
            <div className="mb-6 p-4 rounded-2xl bg-[#1B1F2B]/90 border border-[#D2A85C]/50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
              <div className="flex items-center justify-center space-x-2 text-[#D2A85C] mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  RSVP Received
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-sm text-[#F3EFE4] font-display">
                {rsvpSubmission.attending === 'yes'
                  ? `We can't wait to celebrate with you, ${rsvpSubmission.firstName}!`
                  : `Thank you for letting us know, ${rsvpSubmission.firstName}. You will be missed!`}
              </p>
              {rsvpSubmission.attending === 'yes' && (
                <button
                  onClick={downloadIcsFile}
                  className="mt-3 inline-flex items-center space-x-2 text-xs text-[#D2A85C] hover:text-[#E7CE9C] border border-[#D2A85C]/50 px-4 py-1.5 rounded-full transition-colors bg-[#12141C]/60"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Save to Calendar</span>
                </button>
              )}
            </div>
          )}

          {/* Headline: THANK YOU
              Font: Brittany Signature
              Weight: Regular
              Letter spacing: slightly expanded
              Color: warm champagne/gold
          */}
          <h2
            className="font-brittany font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E7CE9C] leading-none mb-8 sm:mb-14 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
            style={{ letterSpacing: '0.06em' }}
          >
            Thank You
          </h2>

          {/* Subtext: two lines on mobile, single line on desktop */}
          <p className="text-xs sm:text-[13px] font-sans-ui uppercase tracking-[0.28em] text-[#F3EFE4] font-medium max-w-sm mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
            For being a part of<br className="sm:hidden" /> our journey
          </p>

          {/* Horizontal Divider with Diamond - increased thickness */}
          <div className="my-8 flex items-center justify-center space-x-3 w-48 sm:w-56 mx-auto">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D2A85C]/80 to-[#D2A85C]" />
            <div className="w-2 h-2 rotate-45 border border-[#D2A85C] bg-[#D2A85C]" />
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D2A85C]/80 to-[#D2A85C]" />
          </div>

          {/* Emotional Quote with Quotes:
              “Your presence means the world to us.”
              Font: Cormorant Garamond
              Weight: Regular
              Letter spacing: around 2–4 px
              Color: warm ivory
          */}
          <p
            className="font-cormorant font-normal text-lg sm:text-xl md:text-2xl text-[#FAF6EE] leading-relaxed max-w-sm sm:max-w-md mx-auto mb-10 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            style={{ letterSpacing: '3px' }}
          >
            “Your presence means<br className="sm:hidden" /> the world to us.”
          </p>
        </div>

        {/* Bottom Sign-off and Monogram Logo */}
        <div className="w-full pb-4 flex flex-col items-center">
          <p className="text-[9px] sm:text-[10px] font-sans-ui uppercase tracking-[0.3em] text-[#A9A6A0] mb-3">
            With Love,<br />Always
          </p>

          {/* Floral Gold S&N Logo replacing text S|N */}
          <div className="flex items-center justify-center">
            <img
              src="/assets/sn_logo.png"
              alt="S & N Logo"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_16px_rgba(210,168,92,0.4)]"
            />
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 text-[9px] uppercase tracking-[0.25em] text-[#A9A6A0]/60 hover:text-[#D2A85C] transition-colors focus:outline-none"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </section>
  );
}
