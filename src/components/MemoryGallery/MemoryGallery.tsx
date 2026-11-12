import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2, ArrowRight, Film, Heart } from 'lucide-react';
import { PhotoMemory, ThemeConfig } from '../../types/birthday';
import { soundEngine } from '../../utils/sound';

interface MemoryGalleryProps {
  photos?: PhotoMemory[];
  theme: ThemeConfig;
  onNext: () => void;
  soundEffectsEnabled: boolean;
}

// Curated high-quality cinematic inspirational photographs used whenever no personal photos are configured
const DEFAULT_INSPIRATIONAL_PHOTOS: PhotoMemory[] = [
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    caption: 'Chasing golden sunsets and endless horizons.',
    date: 'Golden Hour',
    location: 'Coastline Dreams',
    isHero: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1000&q=85',
    caption: 'May life bloom with vibrant colors and joy.',
    date: 'Spring Morning',
    location: 'Wildflower Fields',
  },
  {
    src: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=1000&q=85',
    caption: 'Every moment is an occasion to celebrate.',
    date: 'Midnight Celebration',
    location: 'Starry Night',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    caption: 'New heights, brave dreams, and big adventures.',
    date: 'Alpine Light',
    location: 'Mountain Peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85',
    caption: 'A sky full of stars shining just for you.',
    date: 'Infinite Skies',
    location: 'Celestial Wonder',
  },
];

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  theme,
  onNext,
  soundEffectsEnabled,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Fall back to inspirational gallery if photos array is empty or undefined
  const displayPhotos =
    photos && photos.length > 0 ? photos : DEFAULT_INSPIRATIONAL_PHOTOS;

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current || selectedPhotoIndex === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedPhotoIndex < displayPhotos.length - 1) {
      setSelectedPhotoIndex((prev) => (prev !== null ? prev + 1 : 0));
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex((prev) => (prev !== null ? prev - 1 : 0));
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev < displayPhotos.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : displayPhotos.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, displayPhotos.length]);

  const heroPhoto = displayPhotos[0];
  const galleryPhotos = displayPhotos.slice(1);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center z-10 py-14">
      {/* Ambient background glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[120px] opacity-20"
        style={{ background: theme.glowColor }}
      />

      <div className="relative max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-md mb-3 shadow-lg">
            <Film className="w-4 h-4 text-amber-300" />
            <span className="text-xs uppercase tracking-widest text-amber-200/90 font-display">
              Cinematic Retrospective
            </span>
          </div>

          <h2 className="font-serif italic text-4xl sm:text-6xl text-white font-light tracking-wide">
            Memories in Time
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 mt-2 font-sans font-light max-w-lg mx-auto">
            Every picture holds a story worth remembering.
          </p>
        </motion.div>

        {/* =========================================================================
            A. CINEMATIC HERO PHOTOGRAPH (Large, breathtaking visual)
           ========================================================================= */}
        {heroPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onClick={() => {
              if (soundEffectsEnabled) soundEngine.playSparkle();
              setSelectedPhotoIndex(0);
            }}
            className="group cursor-pointer relative w-full max-w-4xl rounded-3xl overflow-hidden border border-amber-300/30 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-10 transition-all duration-500 hover:border-amber-300/60 hover:shadow-[0_30px_70px_rgba(212,175,55,0.25)] select-none text-left"
          >
            {/* 16:9 Anamorphic Hero Frame */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black">
              <motion.img
                src={heroPhoto.src}
                alt={heroPhoto.caption}
                loading="lazy"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />

              {/* Cinematic Vignette & Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/60 pointer-events-none" />

              {/* Film Sprocket Decor */}
              <div className="absolute top-3 left-4 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-amber-200/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Cinematic Visuals • Frame 01</span>
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-3 right-4 p-2.5 rounded-full bg-black/60 text-white/80 group-hover:text-white group-hover:bg-black/80 backdrop-blur-md transition-all">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Hero Caption & Metadata Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-widest font-sans text-amber-300/80 font-medium">
                    {heroPhoto.date || 'Golden Light'} {heroPhoto.location ? `• ${heroPhoto.location}` : ''}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white mt-1 leading-snug drop-shadow-md">
                    &ldquo;{heroPhoto.caption}&rdquo;
                  </h3>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 text-xs text-amber-200/80 font-sans">
                  <span>Click to expand full screen</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            B. CREATIVE ASYMMETRIC PHOTOGRAPHY GALLERY
           ========================================================================= */}
        {galleryPhotos.length > 0 && (
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-4">
            {galleryPhotos.map((photo, index) => {
              const photoIndex = index + 1;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={photoIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  onClick={() => {
                    if (soundEffectsEnabled) soundEngine.playSparkle();
                    setSelectedPhotoIndex(photoIndex);
                  }}
                  className={`group cursor-pointer relative rounded-2xl overflow-hidden p-3.5 bg-gradient-to-b from-slate-900/90 to-indigo-950/90 border border-white/15 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-300/50 hover:shadow-2xl hover:shadow-amber-500/15 text-left select-none ${
                    isEven ? 'rotate-[-1deg]' : 'rotate-[1deg]'
                  }`}
                >
                  {/* Film Strip Header Code */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pb-2 px-1 border-b border-white/10 mb-2">
                    <span>FRAME #{String(photoIndex + 1).padStart(2, '0')}</span>
                    <span>35MM CINEMA</span>
                  </div>

                  {/* Photograph Frame */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-3 px-1">
                    <p className="font-serif italic text-base text-amber-100 leading-snug line-clamp-2">
                      {photo.caption}
                    </p>
                    {(photo.date || photo.location) && (
                      <p className="font-sans text-[11px] text-purple-200/60 mt-1">
                        {[photo.date, photo.location].filter(Boolean).join(' • ')}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            E. FINAL MEMORY MESSAGE
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-2xl mt-10 p-6 sm:p-8 rounded-3xl bg-white/5 border border-amber-300/25 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full filter blur-2xl pointer-events-none" />

          <p className="font-serif italic text-lg sm:text-xl text-amber-100/95 leading-relaxed">
            &ldquo;Some moments pass, some memories stay, and some people make those memories beautiful.&rdquo;
          </p>

          <div className="mt-3 flex items-center justify-center space-x-1.5 text-xs text-amber-300/70 font-sans uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Cherished Moments</span>
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </motion.div>

        {/* Proceed to Slide 6 Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12"
        >
          <button
            onClick={onNext}
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-sans font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/25 transition-all duration-300"
          >
            <span>Discover Little Surprises ✨</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* =========================================================================
          C. FULL-SCREEN PHOTO VIEWER (LIGHTBOX WITH MOBILE SWIPE SUPPORT)
         ========================================================================= */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/92 backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            {displayPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : displayPhotos.length - 1));
                }}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50 hidden sm:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center bg-[#150d28] border border-amber-300/30 text-white rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              <div className="relative max-h-[68vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black">
                <img
                  src={displayPhotos[selectedPhotoIndex].src}
                  alt={displayPhotos[selectedPhotoIndex].caption}
                  className="max-h-[68vh] w-auto object-contain rounded-xl"
                />
              </div>

              <div className="w-full mt-4 text-center">
                <p className="font-serif italic text-xl sm:text-2xl text-amber-100">
                  &ldquo;{displayPhotos[selectedPhotoIndex].caption}&rdquo;
                </p>
                {(displayPhotos[selectedPhotoIndex].date || displayPhotos[selectedPhotoIndex].location) && (
                  <p className="font-sans text-xs text-purple-200/70 mt-1">
                    {[displayPhotos[selectedPhotoIndex].date, displayPhotos[selectedPhotoIndex].location]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                )}
                <div className="text-[11px] text-white/40 mt-2 font-mono">
                  {selectedPhotoIndex + 1} OF {displayPhotos.length} • SWIPE OR USE ARROWS
                </div>
              </div>
            </motion.div>

            {/* Right Nav */}
            {displayPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex((prev) => (prev !== null && prev < displayPhotos.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50 hidden sm:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
