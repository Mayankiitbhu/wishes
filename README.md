# Birthday Surprise 🎂

An interactive, six-part birthday site built with React + Vite + TypeScript, Tailwind, Framer Motion and react-three-fiber.

```
1. Red curtain reveal → slot-machine age → candle melt → 23 + balloons, cake, confetti
2. "Happy Birthday <name>" + 18 photos along a looping ribbon path (B&W → colour on hover)
3. Draggable polaroid pinboard + 3 butterfly easter eggs with secret notes
4. 3D spiral-bound scrapbook, 4 spreads, page-turn flips
5. Three.js starfield galaxy of floating photos you can orbit and zoom
6. iPhone lock screen → auto-playing chat finale
```

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Make it yours

**Everything you need to change lives in one file: `src/data/birthdayConfig.ts`.**

| What | Where in the config |
| --- | --- |
| Her name, the ages | `girlfriendName`, `oldAge`, `newAge` |
| The song | `song` |
| Section 2 ribbon (18 photos) | `ribbonPhotos` |
| Section 2 heading + paragraph | `greeting` |
| Section 3 polaroids (8) | `polaroids` |
| Butterfly secret notes (3) | `secretNotes` |
| Section 4 scrapbook (4 spreads) | `scrapbookSpreads` |
| Section 5 galaxy (15 photos + `[x,y,z]`) | `galaxyPhotos` |
| Section 6 messages (5) | `chatMessages`, `chatContact` |

### Photos

Drop your images into `public/photos/`, then reference them by path:

```ts
ribbonPhotos: ['/photos/first-date.jpg', '/photos/goa.jpg', ...]
```

Square crops look best everywhere except the scrapbook. The placeholders are
remote URLs so the site works out of the box — replace them all before you send it.

### Music

1. Put your MP3 at `public/song.mp3`
2. Set `song.audioUrl: '/song.mp3'` in the config

The player is already wired for play/pause and starts when the curtain opens
(a real click, so browser autoplay rules are satisfied). With no file set, the
player still renders and simply shows the track as unavailable.

> Use a file you have the right to use. Don't ship a ripped commercial track on a public URL.

## Deploy

`npm run build` produces a fully static `dist/` folder with relative asset
paths — drop it on Netlify, Vercel, GitHub Pages, Cloudflare Pages or any
static host, no configuration needed.

## Notes

- Desktop-first, but every section reflows down to phone width. The scrapbook
  scales rather than reflowing, which keeps the spread intact on small screens.
- Page scroll is locked on the curtain until it's clicked.
- Confetti and the heavier motion respect `prefers-reduced-motion` where
  canvas-confetti supports it.
