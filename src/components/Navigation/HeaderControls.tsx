import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Palette, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { ThemeConfig, ThemeId } from '../../types/birthday';
import { THEMES } from '../../config/themes';

interface HeaderControlsProps {
  currentScene: number;
  totalScenes: number;
  onNavigateScene: (index: number) => void;
  currentTheme: ThemeConfig;
  onThemeChange: (themeId: ThemeId) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: () => void;
  onReplay: () => void;
  musicTitle?: string;
  hasPhotos?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentScene,
  totalScenes = 7,
  onNavigateScene,
  currentTheme,
  onThemeChange,
  isMusicPlaying,
  onToggleMusic,
  soundEffectsEnabled,
  onToggleSoundEffects,
  onReplay,
  musicTitle = 'Celestial Ambience',
}) => {
  const [showThemePicker, setShowThemePicker] = useState(false);

  const sceneLabels = [
    'Cinematic Introduction',
    'Birthday Reveal',
    'Interactive Cake',
    'Birthday Letter',
    'Cinematic Memories',
    'Little Surprises',
    'Grand Finale',
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 flex items-center justify-between pointer-events-none">
      {/* Left: Brand & Scene Title */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-lg text-xs font-medium text-amber-200/90">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-display tracking-wider hidden sm:inline">A Little Magic</span>
          <span className="text-white/40">|</span>
          <span className="text-white/90">
            {sceneLabels[currentScene - 1] || `Scene ${currentScene}`}
          </span>
          <span className="text-amber-300 font-mono font-semibold ml-1">
            ({currentScene}/{totalScenes})
          </span>
        </div>
      </div>

      {/* Center: Scene Step Dots */}
      <div className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 pointer-events-auto">
        {Array.from({ length: totalScenes }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentScene;
          const isPast = stepNum < currentScene;

          return (
            <button
              key={idx}
              onClick={() => onNavigateScene(stepNum)}
              title={`${sceneLabels[idx]} (${stepNum}/${totalScenes})`}
              className={`h-2 transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-7 bg-gradient-to-r from-amber-300 to-amber-500 shadow-sm shadow-amber-400'
                  : isPast
                  ? 'w-2 bg-amber-200/60 hover:bg-amber-200'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          );
        })}
      </div>

      {/* Right Controls: Previous, Next, Music, SFX, Theme, Replay */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 pointer-events-auto">
        {/* Previous Scene Button */}
        {currentScene > 1 && (
          <button
            onClick={() => onNavigateScene(currentScene - 1)}
            title="Previous slide"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs border border-white/15 backdrop-blur-md transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
        )}

        {/* Next Scene Button */}
        {currentScene < totalScenes && (
          <button
            onClick={() => onNavigateScene(currentScene + 1)}
            title="Next slide"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs border border-white/15 backdrop-blur-md transition-all"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Background Music Toggle */}
        <button
          onClick={onToggleMusic}
          title={isMusicPlaying ? `Music Playing: ${musicTitle}` : 'Play Ambient Music'}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border ${
            isMusicPlaying
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-500/30'
              : 'bg-slate-900/60 text-white/60 hover:text-white border-white/10'
          }`}
        >
          <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
        </button>

        {/* Sound Effects Toggle */}
        <button
          onClick={onToggleSoundEffects}
          title={soundEffectsEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border ${
            soundEffectsEnabled
              ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
              : 'bg-slate-900/60 text-white/40 border-white/10'
          }`}
        >
          {soundEffectsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme Picker Button */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            title="Change Visual Theme"
            className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
          >
            <Palette className="w-4 h-4" />
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl p-2 bg-slate-950/95 backdrop-blur-xl border border-white/15 shadow-2xl z-50 text-xs">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                Select Theme
              </div>
              {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                const item = THEMES[themeKey];
                const isSelected = item.id === currentTheme.id;
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      onThemeChange(themeKey);
                      setShowThemePicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs">{item.name}</div>
                      <div className="text-[10px] text-white/40 truncate max-w-[150px]">{item.tagline}</div>
                    </div>
                    {isSelected && <span className="text-amber-400 text-xs">●</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Replay Button */}
        {currentScene > 1 && (
          <button
            onClick={onReplay}
            title="Replay Experience"
            className="p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
