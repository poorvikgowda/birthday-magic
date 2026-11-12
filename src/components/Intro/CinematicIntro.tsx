import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { soundEngine } from '../../utils/sound';

interface CinematicIntroProps {
  name: string;
  theme: ThemeConfig;
  onEnter: () => void;
  senderName?: string;
  soundEffectsEnabled: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  name,
  theme,
  onEnter,
  senderName,
  soundEffectsEnabled,
}) => {
  const [isEntering, setIsEntering] = useState(false);

  const handleStart = () => {
    if (soundEffectsEnabled) {
      soundEngine.playSparkle();
    }
    setIsEntering(true);
    // Smooth cinematic portal transition delay
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10 overflow-hidden">
      {/* Magical Portal Bloom (active on entering) */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 25, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: theme.portalGlow,
              filter: 'blur(30px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Magic Ambient Ring */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-30 border border-dashed border-amber-300/30 filter blur-[1px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-amber-200/90 font-display">
            A Moment Created With Care
          </span>
        </motion.div>

        {/* Cinematic Opening Message with Dynamic Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/90 font-light mb-4 tracking-wide"
        >
          Hey, {name ? name.trim() : 'Someone Special'}...
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 mb-6 drop-shadow-sm leading-tight"
        >
          I have a little surprise waiting for you.
        </motion.h1>

        {senderName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-sm sm:text-base text-purple-200/70 font-sans font-light max-w-md mb-10 leading-relaxed"
          >
            A dedicated journey crafted to celebrate who you are and the joy you bring to this world.
          </motion.p>
        )}

        {/* The Magic Doorway CTA Button */}
        <motion.button
          onClick={handleStart}
          disabled={isEntering}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full overflow-hidden font-sans font-semibold tracking-wide text-slate-950 shadow-2xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #d97706 100%)',
            boxShadow: '0 0 35px rgba(245, 158, 11, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
          }}
        >
          {/* Shimmer sweep effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer-sweep" />

          <Sparkles className="w-5 h-5 text-slate-900 animate-pulse" />
          <span className="text-base sm:text-lg">Open Your Surprise ✨</span>
          <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Ambient hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-6 text-xs text-white/40 font-light"
        >
          Best experienced with sound turned on 🎧
        </motion.span>
      </motion.div>
    </div>
  );
};
