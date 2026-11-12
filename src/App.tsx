import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from './config/birthday';
import { THEMES } from './config/themes';
import { ThemeId } from './types/birthday';
import { Starfield } from './components/Background/Starfield';
import { HeaderControls } from './components/Navigation/HeaderControls';
import { CinematicIntro } from './components/Intro/CinematicIntro';
import { BirthdayReveal } from './components/BirthdayReveal/BirthdayReveal';
import { BirthdayCake } from './components/BirthdayCake/BirthdayCake';
import { BirthdayLetter } from './components/BirthdayLetter/BirthdayLetter';
import { MemoryGallery } from './components/MemoryGallery/MemoryGallery';
import { LittleSurprises } from './components/LittleSurprises/LittleSurprises';
import { GrandFinale } from './components/GrandFinale/GrandFinale';
import { soundEngine } from './utils/sound';

export function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>(
    (birthdayConfig.theme as ThemeId) || 'midnight'
  );
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState<boolean>(
    birthdayConfig.effects.soundEffects ?? true
  );

  const currentTheme = THEMES[selectedThemeId] || THEMES.midnight;

  // The complete birthday journey consists of exactly 7 slides:
  // 1: Cinematic Introduction
  // 2: Birthday Reveal
  // 3: Interactive Birthday Cake
  // 4: Birthday Letter
  // 5: Cinematic Memories
  // 6: Little Surprises
  // 7: Grand Finale
  const TOTAL_SCENES = 7;

  // Music toggle handler
  const handleToggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      soundEngine.stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      soundEngine.startAmbientMusic(birthdayConfig.music.src);
      setIsMusicPlaying(true);
    }
  }, [isMusicPlaying]);

  const handleToggleSoundEffects = useCallback(() => {
    setSoundEffectsEnabled((prev) => !prev);
  }, []);

  const handleNextScene = useCallback(() => {
    setCurrentScene((prev) => Math.min(prev + 1, TOTAL_SCENES));
  }, []);

  const handleNavigateScene = useCallback((targetScene: number) => {
    if (targetScene >= 1 && targetScene <= TOTAL_SCENES) {
      setCurrentScene(targetScene);
    }
  }, []);

  const handleReplay = useCallback(() => {
    setCurrentScene(1);
  }, []);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && currentScene < TOTAL_SCENES) {
        handleNextScene();
      } else if (e.key === 'ArrowLeft' && currentScene > 1) {
        setCurrentScene((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, handleNextScene]);

  // Extract Surprise messages supporting either array or object config structures
  const surpriseMessages = useMemo(() => {
    const raw = birthdayConfig.surprises;
    if (Array.isArray(raw)) {
      return {
        reminder: raw[0]?.message || "You bring so much warmth and light into the world!",
        future: raw[1]?.message || birthdayConfig.futureWish || "May your dreams turn into beautiful realities.",
        secret: raw[2]?.message || "P.S. You are genuinely appreciated more than words can say!",
      };
    }
    return {
      reminder: raw?.reminder?.message || "You bring so much warmth and light into the world!",
      future: raw?.futureWish?.message || birthdayConfig.futureWish || "May your dreams turn into beautiful realities.",
      secret: raw?.secretMessage?.message || "P.S. You are genuinely appreciated more than words can say!",
    };
  }, []);

  const appTitle = birthdayConfig.title || birthdayConfig.headline || "A Little Magic, Just for You";

  // Render the exact active scene out of the 7 slides
  const renderCurrentScene = () => {
    switch (currentScene) {
      // Slide 1: Cinematic Introduction
      case 1:
        return (
          <CinematicIntro
            name={birthdayConfig.name}
            theme={currentTheme}
            onEnter={() => {
              if (birthdayConfig.music.enabled && !isMusicPlaying) {
                soundEngine.startAmbientMusic(birthdayConfig.music.src);
                setIsMusicPlaying(true);
              }
              handleNavigateScene(2);
            }}
            senderName={birthdayConfig.senderName}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      // Slide 2: Birthday Reveal (Name without exclamation mark)
      case 2:
        return (
          <BirthdayReveal
            name={birthdayConfig.name}
            nickname={birthdayConfig.nickname}
            birthdayWish={birthdayConfig.birthdayWish}
            theme={currentTheme}
            onNext={() => handleNavigateScene(3)}
            confettiEnabled={birthdayConfig.effects.confetti}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      // Slide 3: Interactive Birthday Cake
      case 3:
        return (
          <BirthdayCake
            theme={currentTheme}
            onNext={() => handleNavigateScene(4)}
            confettiEnabled={birthdayConfig.effects.confetti}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      // Slide 4: Birthday Letter (Always visible on ivory parchment!)
      case 4:
        return (
          <BirthdayLetter
            name={birthdayConfig.name}
            senderName={birthdayConfig.senderName}
            personalLetter={birthdayConfig.personalLetter}
            personalSentence={birthdayConfig.personalSentence}
            theme={currentTheme}
            onNext={() => handleNavigateScene(5)}
            hasPhotos={true}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      // Slide 5: Cinematic Memories (High quality, joyful photography)
      case 5:
        return (
          <MemoryGallery
            photos={birthdayConfig.photos}
            theme={currentTheme}
            onNext={() => handleNavigateScene(6)}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      // Slide 6: Little Surprises (3 interactive cards & mystery gift box)
      case 6:
        return (
          <LittleSurprises
            theme={currentTheme}
            onNext={() => handleNavigateScene(7)}
            reminderMessage={surpriseMessages.reminder}
            futureWishMessage={surpriseMessages.future}
            secretMessage={surpriseMessages.secret}
            soundEffectsEnabled={soundEffectsEnabled}
            confettiEnabled={birthdayConfig.effects.confetti}
          />
        );

      // Slide 7: Grand Finale (Fireworks, final wishes & replay)
      case 7:
        return (
          <GrandFinale
            name={birthdayConfig.name}
            senderName={birthdayConfig.senderName}
            finalMessage={birthdayConfig.finalMessage}
            theme={currentTheme}
            onReplay={handleReplay}
            fireworksEnabled={birthdayConfig.effects.fireworks}
            confettiEnabled={birthdayConfig.effects.confetti}
            soundEffectsEnabled={soundEffectsEnabled}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Dynamic Animated Starfield & Theme Background */}
      <Starfield theme={currentTheme} enabled={birthdayConfig.effects.particles} />

      {/* Floating Header Controls */}
      <HeaderControls
        currentScene={currentScene}
        totalScenes={TOTAL_SCENES}
        onNavigateScene={handleNavigateScene}
        currentTheme={currentTheme}
        onThemeChange={setSelectedThemeId}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        soundEffectsEnabled={soundEffectsEnabled}
        onToggleSoundEffects={handleToggleSoundEffects}
        onReplay={handleReplay}
        musicTitle={birthdayConfig.music.title}
      />

      {/* Main Interactive Scene Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center pt-16 sm:pt-20 pb-12 sm:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderCurrentScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-xs text-white/40 pointer-events-none">
        <p className="font-light tracking-wider">
          {appTitle} • Dedicated to {birthdayConfig.name}
        </p>
      </footer>
    </div>
  );
}

export default App;
