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
    // Connect to early initialized audio from index.html, or fallback to new Audio
    let audio = window.__weddingAudio;
    if (!audio) {
      audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audio.preload = 'auto';
      window.__weddingAudio = audio;
    }
    audioRef.current = audio;

    const handlePlay = () => onPlayStateChange?.(true);
    const handlePause = () => onPlayStateChange?.(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    // Sync current state
    if (!audio.paused) {
      onPlayStateChange?.(true);
    } else {
      audio.play().then(() => onPlayStateChange?.(true)).catch(() => {});
    }

    // 1. Attempt autoplay continuously
    const tryAutoplay = () => {
      if (!audio) return;
      if (audio.paused) {
        audio.play().then(() => onPlayStateChange?.(true)).catch(() => {});
      }
    };

    window.addEventListener('load', tryAutoplay);
    window.addEventListener('pageshow', tryAutoplay);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryAutoplay();
    });
    audio.addEventListener('canplay', tryAutoplay);
    audio.addEventListener('canplaythrough', tryAutoplay);

    // Continuous retry loop for initial 8 seconds
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (audio && audio.paused) {
        audio.play().then(() => {
          onPlayStateChange?.(true);
          clearInterval(retryInterval);
        }).catch(() => {});
      } else if (audio && !audio.paused) {
        clearInterval(retryInterval);
      }
      if (retryCount > 40) {
        clearInterval(retryInterval);
      }
    }, 200);

    // 2. Global capture-phase unlock on any early interaction
    const unlock = () => {
      if (audio && audio.paused) {
        audio.play().then(() => {
          onPlayStateChange?.(true);
          cleanupListeners();
        }).catch(() => {});
      } else {
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      clearInterval(retryInterval);
      const targets = [document, document.body, window];
      const events = ['touchstart', 'touchend', 'touchmove', 'pointerdown', 'pointerup', 'pointermove', 'click', 'scroll', 'wheel', 'keydown'];
      targets.forEach((target) => {
        if (target) {
          events.forEach((evt) => target.removeEventListener(evt, unlock, true));
        }
      });
    };

    const targets = [document, document.body, window];
    const events = ['touchstart', 'touchend', 'touchmove', 'pointerdown', 'pointerup', 'pointermove', 'click', 'scroll', 'wheel', 'keydown'];
    targets.forEach((target) => {
      if (target) {
        events.forEach((evt) => target.addEventListener(evt, unlock, { capture: true, passive: true }));
      }
    });

    return () => {
      clearInterval(retryInterval);
      cleanupListeners();
      window.removeEventListener('load', tryAutoplay);
      window.removeEventListener('pageshow', tryAutoplay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, []);

  return null;
}

