import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, MicOff, Wind, ArrowRight, Check } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { useMicrophoneBlow } from '../../hooks/useMicrophoneBlow';
import { soundEngine } from '../../utils/sound';
import { fireCelebrationConfetti } from '../../utils/confetti';

interface BirthdayCakeProps {
  theme: ThemeConfig;
  onNext: () => void;
  confettiEnabled: boolean;
  soundEffectsEnabled: boolean;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({
  theme,
  onNext,
  confettiEnabled,
  soundEffectsEnabled,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showMicPrompt, setShowMicPrompt] = useState(false);

  // Microphone detection handler
  const handleBlowOut = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    if (soundEffectsEnabled) {
      soundEngine.playBlowCandle();
      setTimeout(() => soundEngine.playCelebration(), 400);
    }

    if (confettiEnabled) {
      setTimeout(() => fireCelebrationConfetti(theme.fireworkColors), 300);
    }
  };

  const { isListening, micAvailable, micError, requestMic, stopMic } = useMicrophoneBlow({
    onBlowDetected: handleBlowOut,
  });

  const toggleMic = () => {
    if (isListening) {
      stopMic();
      setShowMicPrompt(false);
    } else {
      setShowMicPrompt(true);
      requestMic();
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10 py-10">
      {/* Background warm candlelight glow (dims when blown out) */}
      <motion.div
        animate={{
          scale: candlesLit ? [1, 1.08, 0.98, 1] : 0.4,
          opacity: candlesLit ? 0.45 : 0.05,
        }}
        transition={{
          duration: 3,
          repeat: candlesLit ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none filter blur-[90px]"
        style={{ background: candlesLit ? 'rgba(251, 191, 36, 0.4)' : 'rgba(100, 100, 100, 0.1)' }}
      />

      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        {/* Title & Instructions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-md mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-widest text-amber-200/90 font-display">
              A Moment of Wonder
            </span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-light">
            {candlesLit ? 'Close your eyes & make a wish...' : 'Your wish is written in the stars ✨'}
          </h2>
          <p className="text-sm text-purple-200/70 mt-2 font-sans font-light">
            {candlesLit
              ? 'Blow gently into your microphone, or tap the button below to blow out the candles.'
              : 'May this year grant everything your heart has wished for.'}
          </p>
        </motion.div>

        {/* The 3D CSS/SVG Birthday Cake */}
        <div className="relative my-4 select-none">
          <svg
            viewBox="0 0 300 260"
            className="w-64 h-56 sm:w-80 sm:h-72 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Plate Gradient */}
              <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5ecc5" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa8022" />
              </linearGradient>

              {/* Bottom Tier Gradient */}
              <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="50%" stopColor="#3b0764" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>

              {/* Top Tier Gradient */}
              <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b21a8" />
                <stop offset="50%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>

              {/* Cream Frosting Gradient */}
              <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>

              {/* Gold Candle Gradient */}
              <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>

              {/* Flame Radial Gradient */}
              <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fef08a" />
                <stop offset="65%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </radialGradient>
            </defs>

            {/* Stand / Plate */}
            <ellipse cx="150" cy="240" rx="135" ry="16" fill="url(#plateGrad)" opacity="0.9" />
            <ellipse cx="150" cy="237" rx="125" ry="13" fill="#1e1b4b" opacity="0.6" />

            {/* Tier 1 (Bottom Tier) */}
            <rect x="50" y="160" width="200" height="70" rx="12" fill="url(#tierBottomGrad)" />
            {/* Tier 1 Frosting Top */}
            <ellipse cx="150" cy="160" rx="100" ry="18" fill="url(#creamGrad)" />
            {/* Frosting drips */}
            <path
              d="M50 160 C 60 185, 75 185, 85 160 C 95 188, 115 188, 125 160 C 140 192, 160 192, 175 160 C 190 186, 210 186, 220 160 C 235 188, 245 175, 250 160"
              fill="url(#creamGrad)"
            />
            {/* Decorative Gold Pearls */}
            <circle cx="85" cy="195" r="4" fill="#fbbf24" />
            <circle cx="125" cy="200" r="4" fill="#fbbf24" />
            <circle cx="150" cy="205" r="4" fill="#fbbf24" />
            <circle cx="175" cy="200" r="4" fill="#fbbf24" />
            <circle cx="215" cy="195" r="4" fill="#fbbf24" />

            {/* Tier 2 (Top Tier) */}
            <rect x="85" y="105" width="130" height="58" rx="10" fill="url(#tierTopGrad)" />
            {/* Tier 2 Frosting Top */}
            <ellipse cx="150" cy="105" rx="65" ry="14" fill="url(#creamGrad)" />
            {/* Top frosting drips */}
            <path
              d="M85 105 C 95 125, 110 125, 120 105 C 130 128, 150 128, 160 105 C 170 125, 190 125, 200 105 C 210 120, 215 110, 215 105"
              fill="url(#creamGrad)"
            />

            {/* Candle 1 (Left) */}
            <rect x="115" y="70" width="8" height="36" rx="2" fill="url(#candleGrad)" />
            <line x1="119" y1="70" x2="119" y2="64" stroke="#475569" strokeWidth="2" />

            {/* Candle 2 (Center - Grand) */}
            <rect x="145" y="60" width="10" height="46" rx="3" fill="url(#candleGrad)" />
            <line x1="150" y1="60" x2="150" y2="52" stroke="#475569" strokeWidth="2.5" />

            {/* Candle 3 (Right) */}
            <rect x="177" y="70" width="8" height="36" rx="2" fill="url(#candleGrad)" />
            <line x1="181" y1="70" x2="181" y2="64" stroke="#475569" strokeWidth="2" />

            {/* Candle Flames with CSS flickers & glowing filters */}
            {candlesLit ? (
              <g className="animate-flame cursor-pointer" onClick={handleBlowOut}>
                {/* Flame 1 */}
                <path
                  d="M119 46 C 114 55, 113 62, 119 64 C 125 62, 124 55, 119 46 Z"
                  fill="url(#flameGrad)"
                  filter="drop-shadow(0 0 6px #f59e0b)"
                />
                {/* Flame 2 (Center) */}
                <path
                  d="M150 32 C 143 44, 142 50, 150 52 C 158 50, 157 44, 150 32 Z"
                  fill="url(#flameGrad)"
                  filter="drop-shadow(0 0 10px #fbbf24)"
                />
                {/* Flame 3 */}
                <path
                  d="M181 46 C 176 55, 175 62, 181 64 C 187 62, 186 55, 181 46 Z"
                  fill="url(#flameGrad)"
                  filter="drop-shadow(0 0 6px #f59e0b)"
                />
              </g>
            ) : (
              /* Smoke wisps rising when extinguished */
              <g className="animate-smoke pointer-events-none">
                <path
                  d="M119 62 Q 115 50 122 40 T 118 25"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M150 50 Q 146 36 154 26 T 148 10"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M181 62 Q 177 50 184 40 T 180 25"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Interactive Controls & Status */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.div
                key="lit-controls"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {/* Primary: Blow Out Candles (Click Alternative - Always Available!) */}
                <button
                  onClick={handleBlowOut}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30 transition-all duration-300"
                >
                  <Wind className="w-4 h-4 text-slate-950" />
                  <span>Blow Out Candles 💨</span>
                </button>

                {/* Microphone option (Optional bonus interaction) */}
                {micAvailable && (
                  <button
                    onClick={toggleMic}
                    className={`inline-flex items-center space-x-2 px-5 py-3 rounded-full font-sans text-xs sm:text-sm font-medium border backdrop-blur-md transition-all duration-300 ${
                      isListening
                        ? 'bg-rose-500/20 text-rose-300 border-rose-400/40 animate-pulse'
                        : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border-white/15'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
                        <span>Listening... Blow now!</span>
                      </>
                    ) : (
                      <>
                        <MicOff className="w-4 h-4 text-white/60" />
                        <span>Enable Mic Blow 🎙️</span>
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="blown-controls"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  <span>Wish Released into the Universe ✨</span>
                </div>

                {/* Relight button (for fun) & Proceed button */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCandlesLit(true)}
                    className="px-4 py-2 rounded-full text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    Relight Candles 🕯️
                  </button>

                  <button
                    onClick={onNext}
                    className="group inline-flex items-center space-x-2 px-7 py-3 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-yellow-400 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20 transition-all"
                  >
                    <span>Read The Letter</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {micError && (
            <p className="text-xs text-amber-300/70">
              Note: Microphone couldn&apos;t be accessed, but no worries! You can tap &ldquo;Blow Out Candles&rdquo; above.
            </p>
          )}

          {showMicPrompt && !micError && isListening && (
            <p className="text-xs text-rose-300 animate-pulse">
              Tip: Blow air directly towards your phone or laptop microphone!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
