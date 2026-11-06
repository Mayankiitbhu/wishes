/* ============================================================================
   birthdayConfig.ts  —  THE ONLY FILE YOU NEED TO EDIT
   ----------------------------------------------------------------------------
   Everything customizable lives here: her name, the ages, the song, and every
   photo / caption / note in all six sections.

   PHOTOS
   ------
   The placeholders are abstract gradient images that ship in `public/photos/`,
   so the site works offline out of the box. To use your own pictures, either
   overwrite those files keeping the same names, or drop new files into
   `public/photos/` and change the name passed to p(), e.g. p('us-at-the-beach').
   Square crops look best everywhere except the scrapbook.

   MUSIC
   -----
   Put your MP3 at `public/song.mp3` and set `song.audioUrl` to '/song.mp3'.
   Leave it as an empty string and the player still renders — it just shows
   the track as unavailable instead of throwing.
   ========================================================================== */

export interface Polaroid {
  id: number;
  imageUrl: string;
  caption: string;
  /** Starting position as a % of the board (0-100). Drag moves from here. */
  x: number;
  y: number;
  rotation: number;
}

export interface ScrapbookSpread {
  id: number;
  title: string;
  dateLabel: string;
  leftPhotos: { url: string; rotation: number }[];
  rightPhotos: { url: string; rotation: number }[];
  leftNote: string;
  rightNote: string;
  /** Emoji stickers scattered on the spread. */
  stickers: string[];
}

export interface GalaxyPhoto {
  url: string;
  position: [number, number, number];
}

/**
 * Resolves a file in `public/photos/`. BASE_URL keeps the path relative so the
 * build works from any sub-path on any static host.
 * Swap these for your own filenames — or just overwrite the files in place.
 */
const p = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpg`;
const pj = (name: string) => `${import.meta.env.BASE_URL}photos/${name}.jpeg`;

export const birthdayConfig = {
  /* ---------------------------------------------------------------- basics */
  girlfriendName: 'Reet',
  oldAge: 25,
  newAge: 26,

  /* ------------------------------------------------------------------ song */
  song: {
    title: 'Apocalypse',
    artist: 'C.A.S.',
    /** Set to '/song.mp3' after you add the file to public/. */
    audioUrl: '/song.mp3',
    coverUrl: p('song-cover'),
  },

  /* ------------------------------------- SECTION 2 — looped photo ribbon */
  ribbonPhotos: [
    pj('ribbon-001'), pj('ribbon-002'), pj('ribbon-003'), pj('ribbon-004'),
    pj('ribbon-005'), pj('ribbon-006'), pj('ribbon-007'), pj('ribbon-008'),
    pj('ribbon-009'), pj('ribbon-010'), pj('ribbon-011'), pj('ribbon-012'),
    pj('ribbon-013'), pj('ribbon-014'), pj('ribbon-015'), pj('ribbon-016'),
    pj('ribbon-017'), pj('ribbon-018'),
  ],

  greeting: {
    heading: 'Happy Birthday',
    paragraph: `Every year I think I have run out of ways to tell you how much
you mean to me, and every year you make the list longer. These are a few of
the moments I keep going back to — the loud ones, the quiet ones, the ones
where you are laughing at something only you found funny. Scroll on. All of
it is yours.`,
  },

  /* --------------------------------- SECTION 3 — draggable polaroid board */
  polaroids: [
    { id: 1, imageUrl: p('pola-1'), caption: 'Cutie ❤️',        x: 8,  y: 14, rotation: -8 },
    { id: 2, imageUrl: p('pola-2'), caption: 'Sunshine ✨',      x: 26, y: 8,  rotation: 5 },
    { id: 3, imageUrl: p('pola-3'), caption: 'Dream Girl 💕',    x: 45, y: 16, rotation: -4 },
    { id: 4, imageUrl: p('pola-4'), caption: 'My favourite 🌙', x: 64, y: 9,  rotation: 9 },
    { id: 5, imageUrl: p('pola-5'), caption: 'Troublemaker 😚',  x: 14, y: 52, rotation: 7 },
    { id: 6, imageUrl: p('pola-6'), caption: 'Us, always 🤍',    x: 34, y: 58, rotation: -6 },
    { id: 7, imageUrl: p('pola-7'), caption: 'Prettiest 🌸',     x: 55, y: 54, rotation: 4 },
    { id: 8, imageUrl: p('pola-8'), caption: 'Home 🏠',          x: 73, y: 50, rotation: -9 },
  ] as Polaroid[],

  /** Butterfly easter eggs — one note per butterfly. */
  secretNotes: [
    'You fell asleep on my shoulder on that long drive and I did not move for two hours because I did not want to wake you. Best two hours of that year.',
    'I still have the first thing you ever wrote to me. I read it more often than I will admit out loud.',
    'If I had to do all of it again — every detour, every bad day — I would, as long as it ended with you here. Happy birthday, my love.',
  ],

  /* --------------------------------- SECTION 4 — 3D spiral scrapbook */
  scrapbookSpreads: [
    {
      id: 1,
      title: 'How it started',
      dateLabel: 'the beginning',
      leftPhotos: [
        { url: p('scrap-1a'), rotation: -5 },
        { url: p('scrap-1b'), rotation: 6 },
      ],
      rightPhotos: [{ url: p('scrap-1c'), rotation: 3 }],
      leftNote: 'The first photo of us. You said you hated it. I kept it anyway.',
      rightNote: 'Day one of my favourite thing ever.',
      stickers: ['🍒', '🎀', '📼'],
    },
    {
      id: 2,
      title: 'All the little days',
      dateLabel: 'the ordinary magic',
      leftPhotos: [{ url: p('scrap-2a'), rotation: 4 }],
      rightPhotos: [
        { url: p('scrap-2b'), rotation: -7 },
        { url: p('scrap-2c'), rotation: 5 },
      ],
      leftNote: 'Tea, rain, nowhere to be. Perfect.',
      rightNote: 'You laughing at your own joke — my favourite genre of photo.',
      stickers: ['🐈', '🌼', '💌'],
    },
    {
      id: 3,
      title: 'Places we ran away to',
      dateLabel: 'the adventures',
      leftPhotos: [
        { url: p('scrap-3a'), rotation: -6 },
        { url: p('scrap-3b'), rotation: 7 },
      ],
      rightPhotos: [{ url: p('scrap-3c'), rotation: -3 }],
      leftNote: 'We got hopelessly lost and you refused to admit it.',
      rightNote: 'Worth every wrong turn.',
      stickers: ['✈️', '🗺️', '🎞️'],
    },
    {
      id: 4,
      title: 'And everything next',
      dateLabel: 'to be continued',
      leftPhotos: [{ url: p('scrap-4a'), rotation: 5 }],
      rightPhotos: [{ url: p('scrap-4b'), rotation: -5 }],
      leftNote: 'There are so many blank pages left in this thing.',
      rightNote: 'I intend to fill every single one of them with you.',
      stickers: ['🤍', '🎂', '🎈'],
    },
  ] as ScrapbookSpread[],

  /* --------------------------------- SECTION 5 — 3D starfield galaxy */
  galaxyPhotos: [
    { url: pj('ribbon-001'), position: [0, 0.5, -2] },
    { url: pj('ribbon-002'), position: [3.2, 1.4, 0.5] },
    { url: pj('ribbon-003'), position: [-3.4, 0.8, 1.2] },
    { url: pj('ribbon-004'), position: [1.8, -1.9, 2.4] },
    { url: pj('ribbon-005'), position: [-2.1, -2.2, -1.6] },
    { url: pj('ribbon-006'), position: [4.6, -0.6, -2.8] },
    { url: pj('ribbon-007'), position: [-4.8, 1.9, -1.1] },
    { url: pj('ribbon-008'), position: [0.9, 2.8, 2.9] },
    { url: pj('ribbon-009'), position: [-1.2, 3.1, -3.2] },
    { url: pj('ribbon-010'), position: [2.6, 0.2, 4.1] },
    { url: pj('ribbon-011'), position: [-2.9, -0.9, 3.8] },
    { url: pj('ribbon-012'), position: [5.4, 2.4, 1.8] },
    { url: pj('ribbon-013'), position: [-5.2, -1.8, 2.1] },
    { url: pj('ribbon-014'), position: [1.1, -3.4, -3.6] },
    { url: pj('ribbon-015'), position: [-0.8, -3.2, 4.4] },
    { url: pj('ribbon-016'), position: [3.8, -2.6, -0.8] },
    { url: pj('ribbon-017'), position: [-3.9, 3.0, 0.4] },
    { url: pj('ribbon-018'), position: [0.2, -0.8, -4.6] },
  ] as GalaxyPhoto[],

  /* --------------------------------- SECTION 6 — iPhone chat finale */
  chatMessages: [
    'Hey. Stop scrolling for a second 🤍',
    'I built this whole thing instead of sleeping, so you have to act impressed.',
    'But really — thank you for being the best part of every single day.',
    'I hope 26 is gentle with you, and loud in all the right places.',
    'Happy birthday, my love. I am so glad you were born. ❤️',
  ],

  chatContact: {
    name: 'My love ❤️',
    subtitle: 'Always online for you',
    avatarUrl: p('avatar'),
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
export default birthdayConfig;
