import confetti from 'canvas-confetti';

/**
 * Trigger luxury gold & champagne confetti burst
 */
export function triggerGoldConfetti() {
  const goldColors = ['#D2A85C', '#E7CE9C', '#F3EFE4', '#B88B38', '#FFFFFF'];

  // Left burst
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: goldColors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1
  });

  // Right burst
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: goldColors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1
  });

  // Center celebratory stars
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.6 },
      colors: goldColors,
      shapes: ['star', 'circle'],
      scalar: 1.2
    });
  }, 250);
}
