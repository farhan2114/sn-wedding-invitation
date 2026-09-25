import React, { useEffect, useRef } from 'react';

/**
 * Atmospheric ambient audio generator using Web Audio API
 * Plays gentle, soothing warm lounge notes in pentatonic minor scale with soft reverb
 */
export default function AudioAtmosphere({ isPlaying, onToggle }) {
  const audioCtxRef = useRef(null);
  const isRunningRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      isRunningRef.current = false;
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isRunningRef.current = true;

      // Pentatonic warm notes (F#, A, B, C#, E in Hz)
      const scale = [185.0, 220.0, 246.94, 277.18, 329.63, 369.99, 440.0, 493.88];

      const playWarmNote = () => {
        if (!isRunningRef.current) return;
        const now = ctx.currentTime;
        const freq = scale[Math.floor(Math.random() * scale.length)];

        // Sine oscillator for pure warm tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope: soft attack, long dreamy decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4.5);
      };

      // Play an initial note, then periodic random lounge notes
      playWarmNote();
      timerRef.current = setInterval(() => {
        playWarmNote();
      }, 3200);
    } catch (err) {
      console.warn('Web Audio not allowed or supported:', err);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return null;
}
