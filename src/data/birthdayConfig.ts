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
  /** The curtain stays shut until this moment: 11 Nov 2026, 00:00 IST. */
  unlockAt: '2026-11-19T12:45:00+05:30',

  /* ------------------------------------------------------------------ song */
  song: {
    title: 'Apocalypse',
    artist: 'C.A.S.',
    /** Set to '/song.mp3' after you add the file to public/. */
    audioUrl: `${import.meta.env.BASE_URL}song.mp3`,
    coverUrl: p('song-cover'),
  },

  /* ------------------------------------- SECTION 2 — looped photo ribbon */
  ribbonPhotos: [
    pj('ribbon-001'), pj('pol-004'), pj('ribbon-003'), pj('pol-002'),
    pj('ribbon-005'), pj('ribbon-006'), pj('ribbon-007'), pj('ribbon-008'),
    pj('ribbon-009'), pj('ribbon-010'), pj('ribbon-011'), pj('ribbon-012'),
    pj('ribbon-013'), pj('ribbon-014'), pj('ribbon-015'), pj('ribbon-016'),
    pj('ribbon-017'), pj('ribbon-018'),
  ],

  greeting: {
    heading: 'Happy Birthday',
    paragraph: `I know I don't always find the right words to tell you how much you mean to me, so I put my heart into making this. I find myself constantly replaying all the beautiful moments we've shared, and putting this together brought every single one of them rushing back. Make sure the volume is up — I had to include our song. Take your time scrolling through. Every detail here is something that I cherish, and this little space is entirely yours. Happy Birthday. I can't wait for all the memories we haven't even made yet. ❤️`,
  },

  /* --------------------------------- SECTION 3 — draggable polaroid board */
  polaroids: [
    { id: 1, imageUrl: pj('ribbon-010'), caption: 'Cutie ❤️',        x: 8,  y: 14, rotation: -8 },
    { id: 2, imageUrl: pj('pol-002'), caption: 'Sunshine ✨',      x: 26, y: 8,  rotation: 5 },
    { id: 3, imageUrl: pj('ribbon-006'), caption: 'Dream Girl 💕',    x: 45, y: 16, rotation: -4 },
    { id: 4, imageUrl: pj('gal-007'), caption: 'My favourite 🌙', x: 64, y: 9,  rotation: 9 },
    { id: 5, imageUrl: pj('gal-016'), caption: 'Sexiest 😚',  x: 14, y: 52, rotation: 7 },
    { id: 6, imageUrl: pj('ribbon-001'), caption: 'Us, always 🤍',    x: 34, y: 58, rotation: -6 },
    { id: 7, imageUrl: pj('pol-003'), caption: 'Prettiest 🌸',     x: 55, y: 54, rotation: 4 },
    { id: 8, imageUrl: pj('pol-004'), caption: 'Home 🏠',          x: 73, y: 50, rotation: -9 },
  ] as Polaroid[],

  /** Butterfly easter eggs — one note per butterfly. */
  secretNotes: [
    'I planned to ask you out after every badminton session, but I always got so so nervous around you! Your cuteness always has that effect on me. I’m so glad you said yes when I finally did ask.',
    'I can remember more sexy photos, but all of them were view once sadly, but they literally made it "hard" to work!!',
    'I told you before that i like your voice, but I like it more when your thighs are wrapped around me. I love your voice and your taste',
  ],

  /* --------------------------------- SECTION 4 — 3D spiral scrapbook */
  scrapbookSpreads: [
    {
      id: 1,
      title: 'How it started',
      dateLabel: 'the beginning',
      leftPhotos: [{ url: pj('scrap-002'), rotation: -5 }],
      rightPhotos: [{ url: pj('scrap-01'), rotation: 3 }],
      leftNote: 'The first photo of us. But I started getting mesmerized by you wayyy before this.',
      rightNote: 'Day one of my favourite thing ever.',
      stickers: ['🍒', '🎀', '📼'],
    },
    {
      id: 2,
      title: 'All the little days',
      dateLabel: 'the ordinary magic',
      leftPhotos: [{ url: pj('scrap-003'), rotation: 4 }],
      rightPhotos: [
        { url: pj('ribbon-002'), rotation: -7 },
        { url: pj('ribbon-004'), rotation: 5 },
      ],
      leftNote: 'Warm, cozy, nowhere to be. Perfect.',
      rightNote: 'You said you hated, I still kept it — My body yet to be marked by you.',
      stickers: ['🐈', '🌼', '💌'],
    },
    {
      id: 3,
      title: 'Showing up for it all',
      dateLabel: 'always and everyday',
      leftPhotos: [
        { url: pj('ribbon-018'), rotation: -6 },
        { url: pj('ribbon-006'), rotation: 7 },
      ],
      rightPhotos: [{ url: pj('scrap-004'), rotation: -3 }],
      leftNote: 'Ill be there for your boring days, when you are tired or done being kind to this shitty world',
      rightNote: 'You still owe me the dance video from this night!',
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
    { url: pj('ribbon-0015'), position: [-2.1, -2.2, -1.6] },
    { url: pj('ribbon-006'), position: [4.6, -0.6, -2.8] },
    { url: pj('gal-007'), position: [-4.8, 1.9, -1.1] },
    { url: pj('ribbon-008'), position: [0.9, 2.8, 2.9] },
    { url: pj('gal-009'), position: [-1.2, 3.1, -3.2] },
    { url: pj('gal-010'), position: [2.6, 0.2, 4.1] },
    { url: pj('gal-011'), position: [-2.9, -0.9, 3.8] },
    { url: pj('gal-012'), position: [5.4, 2.4, 1.8] },
    { url: pj('ribbon-014'), position: [1.1, -3.4, -3.6] },
    { url: pj('pol-004'), position: [-0.8, -3.2, 4.4] },
    { url: pj('gal-016'), position: [3.8, -2.6, -0.8] },
    { url: pj('gal-017'), position: [-3.9, 3.0, 0.4] },
    { url: pj('ribbon-018'), position: [0.2, -0.8, -4.6] },
  ] as GalaxyPhoto[],

  /* --------------------------------- SECTION 6 — iPhone chat finale */
  chatMessages: [
    'Hey. Stop scrolling for a second 🤍',
    'Unfortunately, you have to bear with these small efforts only for now. Eagerly waiting to come back to you!!',
    'But really — thank you for being the best part of every single day.',
    'I hope 26 is gentle with you, and loud in all the right places.',
    'Happy birthday, dear. I am so glad you were born. ❤️',
  ],

  chatContact: {
    name: 'Pohaaaa ❤️',
    subtitle: 'Always online for you',
    avatarUrl: p('avatar'),
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
export default birthdayConfig;
