import React, { useEffect, useRef } from 'react';

/**
 * Background MP3 Music Player
 * 
 * Automatically plays on load if allowed by the browser,
 * or immediately on first user touch/scroll/click.
 * Provides synchronized playback state to the UI.
 */
export const AUDIO_SRC = '/assets/music.mp3';
export const DEFAULT_VOLUME = 0.55; // 0.0 (silent) to 1.0 (loud)

export default function AudioAtmosphere({ onPlayStateChange, toggleRef }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => onPlayStateChange?.(true);
    const handlePause = () => onPlayStateChange?.(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    // Provide imperative toggle handle to parent
    if (toggleRef) {
      toggleRef.current = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      };
    }

    // 1. Attempt autoplay immediately when website opens
    const tryAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            onPlayStateChange?.(true);
          })
          .catch(() => {
            // Browser blocked unprompted unmuted autoplay
            onPlayStateChange?.(false);
          });
      }
    };

    tryAutoplay();

    // 2. Global unlock on very first touch / swipe / scroll / click anywhere
    const unlock = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            onPlayStateChange?.(true);
            cleanupListeners();
          })
          .catch(() => {});
      } else {
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('touchend', unlock, { passive: true });
    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('scroll', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });

    return () => {
      cleanupListeners();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}

