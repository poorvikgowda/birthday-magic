import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Mail } from 'lucide-react';
import { ThemeConfig } from '../../types/birthday';
import { soundEngine } from '../../utils/sound';

interface BirthdayLetterProps {
  name: string;
  senderName: string;
  personalLetter?: string;
  personalSentence?: string;
  theme: ThemeConfig;
  onNext: () => void;
  hasPhotos: boolean;
  soundEffectsEnabled: boolean;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({
  name,
  senderName,
  personalLetter,
  personalSentence,
  theme,
  onNext,
  soundEffectsEnabled,
}) => {
  useEffect(() => {
    // Play subtle paper unfold chime when entering slide 4
    if (soundEffectsEnabled) {
      soundEngine.playPaperUnfold();
    }
  }, [soundEffectsEnabled]);

  // Determine whether custom letter text is provided, or use the warm, natural default letter
  const renderLetterParagraphs = () => {
    if (personalLetter && personalLetter.trim().length > 0) {
      return (
        <div className="font-serif text-base sm:text-lg text-slate-800 leading-relaxed space-y-4 whitespace-pre-line">
          {personalLetter}
          {personalSentence && personalSentence.trim().length > 0 && (
            <p className="font-serif text-base sm:text-lg text-amber-950 font-medium bg-amber-50/80 p-3 rounded-xl border-l-4 border-amber-400">
              {personalSentence.trim()}
            </p>
          )}
        </div>
      );
    }

    // Default natural, heartfelt birthday letter (Simple, conversational, genuine)
    return (
      <div className="font-serif text-base sm:text-lg text-slate-800 leading-relaxed space-y-4">
        <p>
          Another year, another chapter, and another chance to make life even more beautiful.
        </p>
        <p>
          I hope this year brings you unexpected happiness, exciting experiences and moments that become your favourite memories.
        </p>
        <p>
          May you find success in the things you work hard for, courage when things get difficult, and plenty of little reasons to smile along the way.
        </p>
        {personalSentence && personalSentence.trim().length > 0 && (
          <p className="font-serif text-base sm:text-lg text-amber-950 font-medium bg-amber-50/80 p-3 rounded-xl border-l-4 border-amber-400">
            {personalSentence.trim()}
          </p>
        )}
        <p>
          Never lose the spark that makes you who you are. Keep growing, keep exploring and keep making your own kind of magic.
        </p>
        <p className="font-medium text-slate-900">
          Here&apos;s to a new chapter filled with stories worth telling!
        </p>
        <p className="font-display font-bold text-amber-900 text-lg sm:text-xl">
          Happy Birthday, {name}!
        </p>
      </div>
    );
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10 py-12">
      {/* Ambient background glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none filter blur-[100px] opacity-25"
        style={{ background: theme.glowColor }}
      />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center w-full">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-widest text-amber-200/90 font-display">
              A Letter From The Heart
            </span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-white font-light">
            Words Written Just For You
          </h2>
          <p className="text-sm text-purple-200/70 mt-1 font-sans font-light">
            A personal note dedicated to celebrating who you are.
          </p>
        </motion.div>

        {/* ALWAYS-VISIBLE ELEGANT LETTER ON WARM IVORY PARCHMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full rounded-3xl bg-[#fdfbf7] text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-6 sm:p-10 md:p-12 text-left border-2 border-amber-200/90 my-2"
        >
          {/* Subtle parchment grain background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#eedca1_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none rounded-3xl" />

          {/* Top Wax Seal Ribbon Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-amber-900/15 pb-4 mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
                <Mail className="w-4 h-4 text-slate-950" />
              </div>
              <div className="font-serif italic text-2xl sm:text-3xl text-amber-950 font-bold">
                Dear {name},
              </div>
            </div>
            <div className="text-[11px] font-sans text-amber-900/70 uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-amber-100/60 border border-amber-200">
              Personal Note
            </div>
          </div>

          {/* Letter Body — Guaranteed to be visible! */}
          <div className="relative z-10">
            {renderLetterParagraphs()}
          </div>

          {/* Handwritten Signoff with Warmth */}
          <div className="relative z-10 mt-8 pt-6 border-t border-amber-900/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-sans uppercase tracking-widest text-amber-900/60 font-medium">
                With warm wishes,
              </div>
              <div className="font-script text-3xl sm:text-4xl text-amber-900 font-normal mt-1 flex items-center space-x-1.5">
                <span>{senderName}</span>
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600 inline ml-1" />
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs text-amber-900/60 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>A Little Magic, Just For You</span>
            </div>
          </div>
        </motion.div>

        {/* ALWAYS-VISIBLE ACTION BUTTON TO ADVANCE TO SLIDE 5 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex items-center justify-center"
        >
          <button
            onClick={onNext}
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/25 transition-all duration-300"
          >
            <span>Explore Memories 📸</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
