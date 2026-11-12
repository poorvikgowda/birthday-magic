/**
 * Web Audio API synthesized sound effects and cinematic ambient music.
 * Works immediately in any modern browser without external audio assets.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private ambientTimer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle magical shimmer chime
  playSparkle() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
    } catch {
      // AudioContext policy safe
    }
  }

  // Play a celebratory fanfare chime (e.g. for birthday reveal or cake celebration)
  playCelebration() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Arpeggiated cheerful major chord
      const notes = [
        { f: 523.25, t: 0.0, d: 0.4 }, // C5
        { f: 659.25, t: 0.1, d: 0.4 }, // E5
        { f: 783.99, t: 0.2, d: 0.4 }, // G5
        { f: 1046.5, t: 0.3, d: 0.8 }, // C6
        { f: 1318.51, t: 0.45, d: 1.2 }, // E6
      ];

      notes.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.12, now + t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d + 0.1);
      });
    } catch {
      // Safe
    }
  }

  // Play a soft candle blow "puff" sound
  playBlowCandle() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise for wind/puff
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.05;
        b1 = 0.96300 * b1 + white * 0.1;
        b2 = 0.57000 * b2 + white * 0.2;
        data[i] = (b0 + b1 + b2) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.6);
    } catch {
      // Safe
    }
  }

  // Gentle paper unfold / envelope rustle
  playPaperUnfold() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.35);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Safe
    }
  }

  // Firework boom & crackle
  playFirework() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Low boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);

      // Sparkle chime after boom
      setTimeout(() => this.playSparkle(), 200);
    } catch {
      // Safe
    }
  }

  // Ambient generative celestial soundscape
  startAmbientMusic(customSrc?: string) {
    if (this.isAmbientPlaying) return;

    if (customSrc && customSrc.trim().length > 0) {
      if (!this.customAudio) {
        this.customAudio = new Audio(customSrc);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(() => {});
      this.isAmbientPlaying = true;
      return;
    }

    try {
      this.initContext();
      if (!this.ctx) return;

      this.isAmbientPlaying = true;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      // Play soft ambient intervals every 2.5 seconds
      const chordNotes = [
        [261.63, 392.0, 523.25], // C - G - C
        [220.0, 329.63, 440.0],  // A - E - A
        [174.61, 261.63, 349.23],// F - C - F
        [196.0, 293.66, 392.0],  // G - D - G
      ];
      let chordIndex = 0;

      const playChord = () => {
        if (!this.isAmbientPlaying || !this.ctx || !this.ambientGain) return;
        const now = this.ctx.currentTime;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          if (!this.ctx || !this.ambientGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.15);

          noteGain.gain.setValueAtTime(0, now + idx * 0.15);
          noteGain.gain.linearRampToValueAtTime(0.035, now + idx * 0.15 + 0.8);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 3.2);

          osc.connect(noteGain);
          noteGain.connect(this.ambientGain);

          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 3.4);
        });
      };

      playChord();
      this.ambientTimer = window.setInterval(playChord, 3500);
    } catch {
      // Safe
    }
  }

  stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // Safe
      }
    }
  }

  getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new SoundEngine();

