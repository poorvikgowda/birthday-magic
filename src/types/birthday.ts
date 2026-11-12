export interface PhotoMemory {
  src: string;
  caption: string;
  date?: string;
  location?: string;
  isHero?: boolean;
}

export interface SurpriseItem {
  title: string;
  message: string;
  badge?: string;
  icon?: string;
}

export interface BirthdayConfig {
  name: string;
  nickname?: string;
  senderName: string;
  title?: string;
  headline?: string;
  subheadline?: string;
  age?: number | string;
  birthdayWish: string;
  personalLetter?: string;
  personalSentence?: string;
  futureWish: string;
  finalMessage: string;
  theme: 'midnight' | 'pastel' | 'golden' | 'garden';
  photos: PhotoMemory[];
  surprises?:
    | SurpriseItem[]
    | {
        reminder: {
          title: string;
          message: string;
        };
        futureWish: {
          title: string;
          message: string;
        };
        secretMessage: {
          title: string;
          message: string;
          hint?: string;
        };
      };
  music: {
    enabled: boolean;
    src: string;
    title?: string;
    artist?: string;
  };
  effects: {
    particles: boolean;
    fireworks: boolean;
    confetti: boolean;
    soundEffects: boolean;
  };
}

export type ThemeId = 'midnight' | 'pastel' | 'golden' | 'garden';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  bgGradient: string;
  accentGradient: string;
  cardBg: string;
  cardBorder: string;
  glowColor: string;
  primaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  sparkleColors: string[];
  fireworkColors: string[];
  portalGlow: string;
  envelopeColor: {
    base: string;
    flap: string;
    letter: string;
    seal: string;
  };
  cakeColors: {
    frosting: string;
    base: string;
    plate: string;
    accent: string;
  };
}
