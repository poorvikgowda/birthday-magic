import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Eye, ArrowRight, Star, Gift } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { soundEngine } from '../../utils/sound';
import { fireCelebrationConfetti } from '../../utils/confetti';

interface LittleSurprisesProps {
  theme: ThemeConfig;
  onNext: () => void;
  reminderMessage: string;
  futureWishMessage: string;
  secretMessage: string;
  soundEffectsEnabled: boolean;
  confettiEnabled: boolean;
}

export const LittleSurprises: React.FC<LittleSurprisesProps> = ({
  theme,
  onNext,
  reminderMessage,
  futureWishMessage,
  secretMessage,
  soundEffectsEnabled,
  confettiEnabled,
}) => {
  const [openedCards, setOpenedCards] = useState<{ [key: string]: boolean }>({
    reminder: false,
    future: false,
    secret: false,
  });

  const toggleCard = (key: string) => {
    if (!openedCards[key]) {
      if (soundEffectsEnabled) {
        if (key === 'secret') {
          soundEngine.playCelebration();
        } else {
          soundEngine.playSparkle();
        }
      }
      if (key === 'secret' && confettiEnabled) {
        fireCelebrationConfetti(theme.fireworkColors);
      }
    }
    setOpenedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10 py-12">
      {/* Background radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none filter blur-[100px] opacity-25"
        style={{ background: theme.glowColor }}
      />

      <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-widest text-amber-200/90 font-display">
              Hidden Treasures
            </span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-light">
            Three Little Surprises
          </h2>
          <p className="text-sm text-purple-200/70 mt-2 font-sans font-light">
            Tap each surprise to uncover three special thoughts kept safe for today.
          </p>
        </motion.div>

        {/* 3 Interactive Surprise Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-2">
          {/* 1. A Little Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onClick={() => toggleCard('reminder')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between min-h-[280px] transition-all duration-300 border ${
              theme.cardBorder
            } ${
              openedCards.reminder
                ? 'bg-amber-500/15 border-amber-400/40 shadow-[0_15px_35px_rgba(212,175,55,0.2)]'
                : 'bg-white/5 hover:bg-white/10 hover:border-white/30 shadow-lg'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center text-amber-300 mb-4 border border-amber-300/30">
              <Star className="w-6 h-6" />
            </div>

            <h3 className="font-display text-lg font-semibold text-amber-100 mb-2">
              A Little Reminder
            </h3>

            <AnimatePresence mode="wait">
              {openedCards.reminder ? (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif italic text-sm sm:text-base text-white/95 leading-relaxed text-center my-auto"
                >
                  &ldquo;{reminderMessage}&rdquo;
                </motion.p>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center my-auto text-xs text-white/50 space-y-2"
                >
                  <Eye className="w-5 h-5 text-amber-300/60 animate-pulse" />
                  <span>Tap to uncover reminder</span>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-[11px] font-sans text-amber-200/50 mt-4 tracking-wider uppercase">
              {openedCards.reminder ? 'Revealed • Note #1' : 'Surprise #1'}
            </span>
          </motion.div>

          {/* 2. A Wish for Your Future */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            onClick={() => toggleCard('future')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between min-h-[280px] transition-all duration-300 border ${
              theme.cardBorder
            } ${
              openedCards.future
                ? 'bg-purple-500/15 border-purple-400/40 shadow-[0_15px_35px_rgba(168,85,247,0.2)]'
                : 'bg-white/5 hover:bg-white/10 hover:border-white/30 shadow-lg'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-400/20 flex items-center justify-center text-purple-300 mb-4 border border-purple-300/30">
              <Compass className="w-6 h-6" />
            </div>

            <h3 className="font-display text-lg font-semibold text-purple-100 mb-2">
              A Wish for Your Future
            </h3>

            <AnimatePresence mode="wait">
              {openedCards.future ? (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-serif italic text-sm sm:text-base text-white/95 leading-relaxed text-center my-auto"
                >
                  &ldquo;{futureWishMessage}&rdquo;
                </motion.p>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center my-auto text-xs text-white/50 space-y-2"
                >
                  <Eye className="w-5 h-5 text-purple-300/60 animate-pulse" />
                  <span>Tap to uncover future wish</span>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-[11px] font-sans text-purple-200/50 mt-4 tracking-wider uppercase">
              {openedCards.future ? 'Revealed • Note #2' : 'Surprise #2'}
            </span>
          </motion.div>

          {/* 3. One More Surprise — Animated Mystery Gift Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={() => toggleCard('secret')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between min-h-[280px] transition-all duration-300 border ${
              theme.cardBorder
            } ${
              openedCards.secret
                ? 'bg-rose-500/15 border-rose-400/40 shadow-[0_20px_45px_rgba(244,114,182,0.25)]'
                : 'bg-gradient-to-b from-rose-950/20 to-purple-950/30 hover:border-amber-300/40 shadow-xl'
            }`}
          >
            {/* Mystery Gift Box Icon with animated lid/bounce */}
            <motion.div
              animate={{
                rotate: openedCards.secret ? [0, 5, -5, 0] : [0, 2, -2, 0],
                scale: openedCards.secret ? 1.1 : [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-rose-400 flex items-center justify-center text-slate-950 mb-3 shadow-[0_0_25px_rgba(251,191,36,0.5)] border-2 border-white/40"
            >
              <Gift className="w-7 h-7" />
            </motion.div>

            <h3 className="font-display text-lg font-semibold text-rose-100 mb-2">
              One More Surprise
            </h3>

            <AnimatePresence mode="wait">
              {openedCards.secret ? (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-serif italic text-sm sm:text-base text-amber-100 leading-relaxed text-center my-auto"
                >
                  &ldquo;{secretMessage}&rdquo;
                </motion.p>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center my-auto text-xs text-rose-200/80 space-y-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
                  <span>Tap to open mystery gift box 🎁</span>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-[11px] font-sans text-rose-200/50 mt-4 tracking-wider uppercase font-medium">
              {openedCards.secret ? 'Opened Mystery Gift ✨' : 'Tap To Unbox'}
            </span>
          </motion.div>
        </div>

        {/* Proceed to Grand Finale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
          <button
            onClick={onNext}
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/25 transition-all duration-300"
          >
            <span>The Grand Finale Celebration 🎆</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
