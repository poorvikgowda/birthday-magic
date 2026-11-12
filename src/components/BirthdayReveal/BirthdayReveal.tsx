import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { fireCelebrationConfetti, fireFlowerPetals } from '../../utils/confetti';
import { soundEngine } from '../../utils/sound';

interface BirthdayRevealProps {
  name: string;
  nickname?: string;
  birthdayWish: string;
  theme: ThemeConfig;
  onNext: () => void;
  confettiEnabled: boolean;
  soundEffectsEnabled: boolean;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  name,
  nickname,
  birthdayWish,
  theme,
  onNext,
  confettiEnabled,
  soundEffectsEnabled,
}) => {
  useEffect(() => {
    // Trigger celebratory sound and confetti upon arrival
    if (soundEffectsEnabled) {
      soundEngine.playCelebration();
    }
    if (confettiEnabled) {
      fireCelebrationConfetti(theme.fireworkColors);
      setTimeout(() => fireFlowerPetals(), 800);
    }
  }, [confettiEnabled, soundEffectsEnabled, theme.fireworkColors]);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10">
      {/* Background radial highlight */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none filter blur-[100px] opacity-40 animate-pulse-glow"
        style={{ background: theme.glowColor }}
      />

      {/* Floating flower petals simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              rotate: 360,
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'linear',
            }}
            className="absolute text-xl select-none"
          >
            {['🌸', '✨', '⭐', '🌺', '💫'][i % 5]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Subtitle intro banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-md mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="font-serif italic text-base sm:text-lg text-amber-200">
            Today, the world celebrates YOU!
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>

        {/* The Golden Name Reveal with cinematic typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.7, duration: 1.1, type: 'spring', damping: 14 }}
          className="mb-4"
        >
          <h2 className="font-serif italic text-2xl sm:text-3xl text-amber-200/90 tracking-wide font-light mb-2">
            Wishing the Happiest
          </h2>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_4px_25px_rgba(212,175,55,0.45)]">
            HAPPY BIRTHDAY,
          </h1>
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white glow-gold mt-1">
            {name.toUpperCase()}
          </h1>
        </motion.div>

        {/* Nickname: only show if provided and non-empty */}
        {nickname && nickname.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-script text-3xl sm:text-4xl text-amber-300 mb-6 font-normal"
          >
            aka &ldquo;{nickname.trim()}&rdquo;
          </motion.div>
        )}

        {/* Heartfelt Birthday Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className={`p-6 sm:p-8 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} max-w-xl mx-auto shadow-2xl relative overflow-hidden my-4`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full filter blur-2xl pointer-events-none" />
          <p className="font-serif text-lg sm:text-xl text-white/90 leading-relaxed italic">
            &ldquo;{birthdayWish}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center space-x-1.5 text-xs text-amber-300/80 uppercase tracking-widest font-sans font-medium">
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Honoring this special milestone</span>
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </motion.div>

        {/* Proceed to Cake button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-6 group inline-flex items-center space-x-3 px-8 py-3.5 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-xl shadow-amber-500/25 transition-all duration-300"
        >
          <span>Time for Birthday Cake 🎂</span>
          <ChevronDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};
