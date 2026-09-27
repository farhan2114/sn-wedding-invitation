import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicButton({ isPlaying, onToggle }) {
  return (
    <aside aria-label="Atmosphere Music Controls" className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center space-x-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-md cursor-pointer outline-none focus:outline-none hover:scale-105 active:scale-95 ${
          isPlaying
            ? 'bg-[#181D29]/95 border-[#D2A85C]/60 text-[#D2A85C] hover:bg-[#1F2535] hover:border-[#D2A85C]'
            : 'bg-[#181D29]/95 border-[#D2A85C]/40 text-[#A9A6A0] hover:bg-[#202738] hover:text-[#F3EFE4]'
        }`}
        title={isPlaying ? 'Mute' : 'Unmute'}
        aria-label={isPlaying ? 'Mute' : 'Unmute'}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center space-x-0.5">
              <span className="w-0.5 h-2.5 bg-[#D2A85C] animate-pulse rounded-full"></span>
              <span className="w-0.5 h-3.5 bg-[#D2A85C] animate-pulse delay-75 rounded-full"></span>
              <span className="w-0.5 h-2 bg-[#D2A85C] animate-pulse delay-150 rounded-full"></span>
            </div>
            <Volume2 className="w-4 h-4 text-[#D2A85C]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#D2A85C] font-semibold font-sans-ui">
              Mute
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#A9A6A0]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#E7CE9C] font-medium font-sans-ui">
              Unmute
            </span>
          </>
        )}
      </button>
    </aside>
  );
}
