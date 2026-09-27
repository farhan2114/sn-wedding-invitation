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
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    const handlePlay = () => onPlayStateChange?.(true);
    const handlePause = () => onPlayStateChange?.(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    // Provide imperative toggle handle to parent
    if (toggleRef) {
      const toggle = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      };
      toggle.play = () => {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
      };
      toggle.pause = () => {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      };
      toggleRef.current = toggle;
    }

    // 1. Attempt autoplay immediately when website opens
    const tryAutoplay = () => {
      if (!audioRef.current) return;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            onPlayStateChange?.(true);
          })
          .catch(() => {
            onPlayStateChange?.(false);
          });
      }
    };

    tryAutoplay();
    window.addEventListener('load', tryAutoplay);
    window.addEventListener('pageshow', tryAutoplay);
    document.addEventListener('DOMContentLoaded', tryAutoplay);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryAutoplay();
    });
    audio.addEventListener('canplay', tryAutoplay);
    audio.addEventListener('canplaythrough', tryAutoplay);
    audio.addEventListener('loadeddata', tryAutoplay);

    // Continuous retry loop for initial 10 seconds to catch early readiness
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      retryCount++;
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            onPlayStateChange?.(true);
            clearInterval(retryInterval);
          })
          .catch(() => {});
      } else if (audioRef.current && !audioRef.current.paused) {
        clearInterval(retryInterval);
      }
      if (retryCount > 50) {
        clearInterval(retryInterval);
      }
    }, 200);

    // 2. Global capture-phase unlock on any early interaction (touch, move, scroll, swipe)
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
      document.removeEventListener('DOMContentLoaded', tryAutoplay);
      audio.removeEventListener('canplay', tryAutoplay);
      audio.removeEventListener('canplaythrough', tryAutoplay);
      audio.removeEventListener('loadeddata', tryAutoplay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={AUDIO_SRC}
      autoPlay
      loop
      playsInline
      preload="auto"
      style={{
        position: 'fixed',
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        opacity: 0.01,
        pointerEvents: 'none',
      }}
    />
  );
}

