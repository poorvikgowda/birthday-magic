import confetti from 'canvas-confetti';

export const fireCelebrationConfetti = (colors: string[] = ['#d4af37', '#eedca1', '#c084fc', '#f472b6', '#ffffff']) => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const fireFlowerPetals = () => {
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#f472b6', '#fbcfe8', '#fef08a', '#d4af37'],
    shapes: ['circle'],
    scalar: 1.1,
  });
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#f472b6', '#fbcfe8', '#fef08a', '#d4af37'],
    shapes: ['circle'],
    scalar: 1.1,
  });
};

export const fireSideCannons = (colors: string[]) => {
  const end = Date.now() + 2 * 1000;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

