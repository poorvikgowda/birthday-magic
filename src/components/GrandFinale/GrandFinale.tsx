import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Share2, Check } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { FireworksEngine } from '../../utils/fireworks';
import { fireCelebrationConfetti } from '../../utils/confetti';
import { soundEngine } from '../../utils/sound';

interface GrandFinaleProps {
  name: string;
  senderName: string;
  finalMessage: string;
  theme: ThemeConfig;
  onReplay: () => void;
  fireworksEnabled: boolean;
  confettiEnabled: boolean;
  soundEffectsEnabled: boolean;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({
  name,
  senderName,
  finalMessage,
  theme,
  onReplay,
  fireworksEnabled,
  confettiEnabled,
  soundEffectsEnabled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireworksEngineRef = useRef<FireworksEngine | null>(null);
  const [countdown, setCountdown] = useState<number | null>(3);
  const [showFinaleContent, setShowFinaleContent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Countdown sequence (3 -> 2 -> 1 -> Fireworks Blast!)
  useEffect(() => {
    let timer: number;
    if (countdown !== null && countdown > 0) {
      if (soundEffectsEnabled) soundEngine.playSparkle();
      timer = window.setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 900);
    } else if (countdown === 0) {
      // Blast off fireworks!
      setShowFinaleContent(true);
      setCountdown(null);

      if (soundEffectsEnabled) {
        soundEngine.playCelebration();
        soundEngine.playFirework();
      }

      if (confettiEnabled) {
        fireCelebrationConfetti(theme.fireworkColors);
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, confettiEnabled, soundEffectsEnabled, theme.fireworkColors]);

  // Initialize and run Canvas Fireworks
  useEffect(() => {
    if (!fireworksEnabled || !showFinaleContent) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new FireworksEngine(canvas, theme.fireworkColors);
    fireworksEngineRef.current = engine;
    engine.start();

    // Sound effect on occasional firework booms
    let boomInterval: number;
    if (soundEffectsEnabled) {
      boomInterval = window.setInterval(() => {
        if (Math.random() > 0.4) {
          soundEngine.playFirework();
        }
      }, 2400);
    }

    return () => {
      engine.destroy();
      if (boomInterval) clearInterval(boomInterval);
    };
  }, [fireworksEnabled, showFinaleContent, soundEffectsEnabled, theme.fireworkColors]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 text-center z-10 py-14 overflow-hidden">
      {/* Canvas for Realistic 60fps Fireworks */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric dark vignette overlay */}
      <div className="fixed inset-0 bg-black/45 pointer-events-none z-0" />

      {/* Countdown Overlay (3, 2, 1...) */}
      <AnimatePresence>
        {countdown !== null && countdown > 0 && (
          <motion.div
            key={countdown}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md"
          >
            <div className="font-display text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold drop-shadow-2xl">
              {countdown}
            </div>
            <div className="font-serif italic text-xl text-amber-200/80 mt-4 tracking-widest uppercase">
              Get Ready For Magic...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grand Finale Content */}
      {showFinaleContent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative max-w-2xl mx-auto flex flex-col items-center z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-slate-900/80 border border-amber-300/30 backdrop-blur-xl mb-6 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span className="text-xs uppercase tracking-widest text-amber-200 font-display">
              The Grand Finale
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          </motion.div>

          {/* Grand Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 glow-gold mb-6"
          >
            HAPPY BIRTHDAY, {name.toUpperCase()}
          </motion.h1>

          {/* Final Emotional Wishes Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className={`p-8 sm:p-10 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} shadow-2xl my-4 text-center max-w-xl mx-auto backdrop-blur-xl relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full filter blur-2xl pointer-events-none" />

            <div className="space-y-4 font-serif text-lg sm:text-xl text-white/95 leading-relaxed italic">
              <p>&ldquo;May your smile always find a reason to shine.&rdquo;</p>
              <p>&ldquo;May life surprise you with beautiful moments.&rdquo;</p>
              <p>&ldquo;Here&apos;s to new beginnings, exciting adventures and unforgettable memories.&rdquo;</p>
              {finalMessage && finalMessage.trim().length > 0 && (
                <p className="font-semibold text-amber-200 pt-2 border-t border-white/10">
                  &ldquo;{finalMessage.trim()}&rdquo;
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
              <span className="text-xs font-sans uppercase tracking-widest text-white/50">
                With warm wishes,
              </span>
              <span className="font-script text-3xl sm:text-4xl text-amber-300 mt-1">
                {senderName}
              </span>
            </div>
          </motion.div>

          {/* Interaction Buttons: Replay & Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Replay */}
            <button
              onClick={onReplay}
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/30 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 text-slate-950" />
              <span>Experience Again ✨</span>
            </button>

            {/* Copy / Share Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full font-sans text-sm font-medium bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-white/70" />
                  <span>Share Experience</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Closing tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-12 text-xs text-white/50 font-sans tracking-wide flex items-center space-x-1.5"
          >
            <span>Some days are special. Some people make every day special.</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};
