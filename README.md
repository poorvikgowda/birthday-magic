# ✨ A Little Magic, Just for You ❤️
> *"Some days are special. Some people make every day special."*

A luxury, cinematic, and deeply emotional birthday surprise web experience crafted with React, TypeScript, Tailwind CSS, Framer Motion, and Web Audio API.

Designed to make whoever opens it feel truly special, appreciated, and celebrated.

---

## 🌟 The 7 Cinematic Scenes

1. **Scene 1: Magical Introduction** — Ethereal midnight sky with drifting celestial particles, mysterious intro (*"Hey, Someone Special..."*, *"I have a little surprise waiting for you."*), and an elegant glowing button: **"Open Your Surprise ✨"**.
2. **Scene 2: Grand Birthday Reveal** — Golden typography animation unveiling **`HAPPY BIRTHDAY, [NAME]!`**, optional nickname, personalized birthday wish, celebratory confetti, and flower petal bursts.
3. **Scene 3: Interactive Birthday Cake** — Tiered cake with flickering flames. Features **dual blow detection**: blow air into your **microphone** (via real-time RMS acoustic analysis) **or tap the one-click blow button**. Blowing out the candles generates realistic rising smoke wisps and a celebratory fanfare.
4. **Scene 4: A Letter From the Heart** — Realistic wax-sealed envelope that unseals with authentic paper rustle sounds and reveals a heartfelt, natural letter in elegant serif typography with optional personal sentence support.
5. **Scene 5: Cinematic Memory Gallery** — Editorial memory album inspired by 35mm film:
   - **Hero Photograph**: 16:9/21:9 anamorphic frame with cinematic zoom-in motion, film sprocket codes, and elegant caption.
   - **Creative Memory Gallery**: Asymmetric layouts with varying dimensions, film borders, and subtle rotations.
   - **Full-Screen Lightbox**: Interactive viewer with **mobile swipe touch gesture support**, background blur, and metadata.
   - **Final Memory Message**: *"Some moments pass, some memories stay, and some people make those memories beautiful."*
   - *(Gracefully and automatically omitted if no photos are configured!)*
6. **Scene 6: Three Little Surprises** — Interactive surprises: *“A Little Reminder”*, *“A Wish for Your Future”*, and an animated 3D-styled **Mystery Gift Box** (*“One More Surprise”*) that unboxes with confetti.
7. **Scene 7: Cinematic Grand Finale** — Countdown anticipation (3... 2... 1...), 60fps canvas fireworks, sparkling particles, final emotional wish, warm signoff from `[SENDER NAME]`, and a one-tap **"Experience Again ✨"** replay button.

---

## 🎨 4 Premium Themes Included

| Theme | Color Palette | Atmosphere |
| :--- | :--- | :--- |
| **Midnight Magic** *(Default)* | Deep cosmic navy, purple & champagne gold | Deep, mysterious, luxurious |
| **Dreamy Pastel** | Soft rose quartz, dreamy lavender & cream | Soft, warm, soothing |
| **Golden Celebration** | Deep velvet noir & 24k champagne gold | Opulent, timeless, prestigious |
| **Enchanted Garden** | Deep botanical emerald, cream & flora | Organic, vibrant, magical |

Visitors can switch themes dynamically in real-time via the palette icon in the top header.

---

## 🛠️ Quick Start & Local Development

### 1. Requirements
- Node.js (v18 or higher)
- npm

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 💌 Personalization Guide — Single Configuration File

**You never need to touch the code or React components.**

To personalize the entire experience for another friend, simply edit:
👉 `src/config/birthday.ts`

```typescript
export const birthdayConfig = {
  // 1. Friend's Details
  name: "name",
  nickname: "",                  // Optional nickname (leave "" if none)
  senderName: "Poorvik",         // Your name (used on letter and finale)

  // 2. Titles & Wishes
  title: "A Little Magic, Just for You",
  headline: "A Little Magic, Just for You",
  subheadline: "Some days are special. Some people make every day special.",
  birthdayWish: "Wishing you endless happiness, beautiful adventures, and countless reasons to smile.",

  // 3. Digital Birthday Letter (Scene 4)
  // If left empty (""), automatically uses the natural, warm default letter!
  personalLetter: "",

  // Optional personal sentence inserted smoothly into the letter
  personalSentence: "",

  // 4. Future Wish & Final Thoughts (Scene 6 & 7)
  futureWish: "May your dreams turn into beautiful realities.",
  finalMessage: "Here's to another beautiful chapter!",

  // 5. Visual Theme ('midnight' | 'pastel' | 'golden' | 'garden')
  theme: "midnight",

  // 6. Photographs (0 to 10 photos)
  photos: [
    {
      src: "/memories/photo1.jpg",
      caption: "A moment worth remembering.",
      date: "Golden Moments",
      location: "Good vibes",
      isHero: true,
    },
    {
      src: "/memories/photo2.jpg",
      caption: "Little moments, big smiles.",
      date: "Adventure Days",
      location: "On the journey",
    },
  ],

  // 7. Three Little Surprises (Scene 6)
  surprises: [
    {
      title: "A Little Reminder",
      message: "You are stronger than you think, kinder than you know...",
    },
    {
      title: "A Wish for Your Future",
      message: "May this new chapter bring you peace, clarity, and breakthroughs...",
    },
    {
      title: "One More Surprise",
      message: "P.S. Don't forget how rare and valuable your genuine friendship is!",
    },
  ],

  // 8. Background Music
  music: {
    enabled: false,
    src: "", // or "/music/your-song.mp3"
    title: "Celestial Chimes & Ambient Harmony",
  },

  // 9. Visual & Audio Effects
  effects: {
    particles: true,
    fireworks: true,
    confetti: true,
    soundEffects: true,
  },
};
```

### Adding Local Photos:
1. Copy your photos into `public/memories/` (e.g. `photo1.jpg`).
2. In `src/config/birthday.ts`, set `src: "/memories/photo1.jpg"`.
3. To disable photos completely, just set `photos: []` — Scene 5 will cleanly disappear without breaking the website flow.

---

## 🚀 Deploying to Vercel

```bash
npm run build
```
Push to GitHub and import the repository into [Vercel](https://vercel.com) with framework preset **Vite**.

---

## 🔒 Privacy & Boundaries
- Warm, respectful, friendly, and appropriate for any friend.
- Zero romantic, flirtatious, or possessive assumptions.
- Microphone permission is strictly optional for blowing out the candle; a one-tap button alternative is always provided.

Crafted with care, magic, and joy ✨
