import { BirthdayConfig } from '../types/birthday';

/**
 * ========================================================================
 * 🌟 A LITTLE MAGIC, JUST FOR YOU — CENTRAL BIRTHDAY CONFIGURATION
 * ========================================================================
 *
 * To personalize this entire website for your friend, you ONLY need to
 * edit this single file! No component or code editing required.
 *
 * Available themes:
 * - 'midnight': Deep cosmic navy, purple & champagne gold (Default)
 * - 'pastel': Soft rose quartz, dreamy lavender & cream
 * - 'golden': Deep black velvet & 24k champagne gold
 * - 'garden': Enchanted emerald, cream & magical flora
 */
export const birthdayConfig: BirthdayConfig = {
  // 1. The star of the celebration!
  name: "name",

  // Optional nickname (leave empty "" if not needed)
  nickname: "",

  // Your name (the sender)
  senderName: "Poorvik",

  // Project title and tagline
  title: "A Little Magic, Just for You",
  headline: "A Little Magic, Just for You",
  subheadline: "Some days are special. Some people make every day special.",

  // Scene 2: Grand Reveal birthday wish
  birthdayWish:
    "Wishing you endless happiness, beautiful adventures, and countless reasons to smile.",

  // Scene 4: Digital Birthday Letter
  // Leave empty ("") to automatically use the warm, natural default letter.
  // Or provide your own custom letter text if desired.
  personalLetter: "",

  // Optional personal sentence inserted smoothly into the letter
  // (e.g. "I'm so grateful for our late-night chai chats.")
  personalSentence: "",

  // Scene 6: Future wish
  futureWish:
    "May your dreams turn into beautiful realities.",

  // Scene 7: Grand Finale closing declaration
  finalMessage:
    "Here's to new beginnings and unforgettable memories.",

  // Selected visual theme: 'midnight' | 'pastel' | 'golden' | 'garden'
  theme: "midnight",

  /**
   * Scene 5: Cinematic Memory Gallery
   * Breathtaking, uplifting photography that evokes warmth, joy and beauty.
   * If personal photos are provided (e.g. "/memories/photo1.jpg"), they will be displayed.
   * If left empty or using the defaults below, the website renders this inspirational visual gallery!
   */
  photos: [
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
      caption: "Chasing golden sunsets and endless horizons.",
      date: "Golden Hour",
      location: "Coastline Dreams",
      isHero: true,
    },
    {
      src: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1000&q=85",
      caption: "May life bloom with vibrant colors and joy.",
      date: "Spring Morning",
      location: "Wildflower Fields",
    },
    {
      src: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=1000&q=85",
      caption: "Every moment is an occasion to celebrate.",
      date: "Midnight Celebration",
      location: "Starry Night",
    },
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
      caption: "New heights, brave dreams, and big adventures.",
      date: "Alpine Light",
      location: "Mountain Peaks",
    },
  ],

  // Scene 6: Three Little Surprises
  surprises: [
    {
      title: "A Little Reminder",
      message:
        "You are stronger than you think, kinder than you know, and your presence genuinely makes the world brighter for everyone around you.",
    },
    {
      title: "A Wish for Your Future",
      message:
        "May this new chapter bring you peace in your heart, clarity in your path, endless health, and breakthroughs in everything you care about.",
    },
    {
      title: "One More Surprise",
      message:
        "P.S. Don't forget how rare and valuable your genuine friendship is. You deserve every ounce of joy coming your way today!",
    },
  ],

  // Background audio settings
  music: {
    enabled: false,
    src: "",
    title: "Celestial Chimes & Ambient Harmony",
    artist: "Magic Soundscape",
  },

  // Interactive visual & audio effects
  effects: {
    particles: true,
    fireworks: true,
    confetti: true,
    soundEffects: true,
  },
};
