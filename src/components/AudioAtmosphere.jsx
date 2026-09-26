import React, { useEffect, useRef } from 'react';

/**
 * Background MP3 Music Player
 * 
 * HOW TO ADD / CHANGE YOUR MP3 IN VS CODE:
 * 1. Copy your .mp3 file into the folder:
 *      public/assets/
 *    For example: public/assets/music.mp3
 * 
 * 2. If your file has a different name, change AUDIO_SRC below:
 */
export const AUDIO_SRC = '/assets/music.mp3';
export const DEFAULT_VOLUME = 0.5; // 0.0 (silent) to 1.0 (loud)

export default function AudioAtmosphere({ isPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio instance once
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocked unprompted audio, unlock on the very first touch/scroll/click
          const unlock = () => {
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('keydown', unlock);
          };

          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true });
          window.addEventListener('scroll', unlock, { once: true });
          window.addEventListener('keydown', unlock, { once: true });
        });
      }
    };

    if (isPlaying) {
      attemptPlay();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return null;
}
