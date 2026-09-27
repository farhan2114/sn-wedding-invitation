import React, { useEffect } from 'react';

export const AUDIO_SRC = '/assets/music.mp3';
export const DEFAULT_VOLUME = 0.55;

let globalAudio = null;

export function getGlobalAudio() {
  if (!globalAudio && typeof window !== 'undefined') {
    globalAudio = new Audio(AUDIO_SRC);
    globalAudio.loop = true;
    globalAudio.volume = DEFAULT_VOLUME;
    globalAudio.preload = 'auto';
    window.__weddingAudio = globalAudio;
  }
  return globalAudio;
}

export function playGlobalAudio() {
  const audio = getGlobalAudio();
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }
}

export function pauseGlobalAudio() {
  const audio = getGlobalAudio();
  if (audio && !audio.paused) {
    audio.pause();
  }
}

export function toggleGlobalAudio() {
  const audio = getGlobalAudio();
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

export default function AudioAtmosphere({ onPlayStateChange }) {
  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;

    const handlePlay = () => onPlayStateChange?.(true);
    const handlePause = () => onPlayStateChange?.(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    onPlayStateChange?.(!audio.paused);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, [onPlayStateChange]);

  return null;
}
