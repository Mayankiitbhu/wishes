import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import birthdayConfig, { type ScrapbookSpread } from '../data/birthdayConfig';

/* ------------------------------------------------------------- ornaments */

function Tape({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-6 w-20 rotate-[-6deg] bg-amber-200/60 shadow-sm ${className}`}
      style={{
        clipPath: 'polygon(3% 0, 100% 6%, 97% 100%, 0 94%)',
        backdropFilter: 'blur(1px)',
      }}
    />
  );
}

function Stamp() {
  return (
    <svg width="58" height="68" viewBox="0 0 58 68" className="rotate-[8deg] drop-shadow" aria-hidden>
      <defs>
        <pattern id="stampGrain" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#be123c" opacity="0.25" />
        </pattern>
      </defs>
      <rect x="1" y="1" width="56" height="66" fill="#fff8ec" stroke="#d4c4a8" strokeDasharray="3 3" />
      <rect x="6" y="6" width="46" height="46" fill="#fecdd3" />
      <rect x="6" y="6" width="46" height="46" fill="url(#stampGrain)" />
      <path d="M29 44 C16 34, 14 22, 22 19 C26 17, 29 21, 29 24 C29 21, 32 17, 36 19 C44 22, 42 34, 29 44 Z" fill="#be123c" />
      <text x="29" y="62" textAnchor="middle" fontSize="8" fill="#9f1239" fontFamily="Inter">
        FOREVER
      </text>
    </svg>
  );
}

function Cassette() {
  return (
    <svg width="92" height="58" viewBox="0 0 92 58" className="-rotate-6 drop-shadow" aria-hidden>
      <rect x="1" y="1" width="90" height="56" rx="5" fill="#27272a" stroke="#52525b" />
      <rect x="9" y="9" width="74" height="24" rx="3" fill="#f4e7d3" />
      <circle cx="30" cy="21" r="7" fill="#27272a" />
      <circle cx="62" cy="21" r="7" fill="#27272a" />
      <circle cx="30" cy="21" r="2.4" fill="#a1a1aa" />
      <circle cx="62" cy="21" r="2.4" fill="#a1a1aa" />
      <rect x="22" y="40" width="48" height="10" rx="2" fill="#3f3f46" />
      <text x="46" y="47.6" textAnchor="middle" fontSize="6.5" fill="#fbbf24" fontFamily="Inter">
        OUR MIXTAPE
      </text>
    </svg>
  );
}

function Vinyl() {
  return (
    <svg width="66" height="66" viewBox="0 0 66 66" className="drop-shadow" aria-hidden>
      <circle cx="33" cy="33" r="32" fill="#18181b" />
      <circle cx="33" cy="33" r="24" fill="none" stroke="#3f3f46" strokeWidth="1" />
      <circle cx="33" cy="33" r="18" fill="none" stroke="#3f3f46" strokeWidth="1" />
      <circle cx="33" cy="33" r="11" fill="#e07a5f" />
      <circle cx="33" cy="33" r="2.5" fill="#18181b" />
    </svg>
  );
}

/* ------------------------------------------------------------------ page */

function PageFace({ spread, side }: { spread: ScrapbookSpread; side: 'left' | 'right' }) {
  const photos = side === 'left' ? spread.leftPhotos : spread.rightPhotos;
  const note = side === 'left' ? spread.leftNote : spread.rightNote;

  return (
    <div
      className={`paper-texture relative h-full w-full overflow-hidden ${
        side === 'left' ? 'rounded-l-md pl-10 pr-14' : 'rounded-r-md pl-14 pr-10'
      } py-9`}
      style={{
        boxShadow:
          side === 'left'
            ? 'inset -26px 0 34px -24px rgba(0,0,0,0.45)'
            : 'inset 26px 0 34px -24px rgba(0,0,0,0.45)',
      }}
    >
      {/* gingham corner accent */}
      <div
        className={`gingham pointer-events-none absolute inset-y-0 w-5 opacity-45 ${
          side === 'left' ? 'left-0' : 'right-0'
        }`}
      />

      {side === 'left' ? (
        <>
          <p className="mb-1 font-serif text-[11px] uppercase tracking-[0.3em] text-rose-700/70">
            {spread.dateLabel}
          </p>
          <h3 className="mb-5 font-serif text-3xl font-semibold text-zinc-800">{spread.title}</h3>
        </>
      ) : (
        <div className="mb-4 flex items-start justify-end gap-3">
          <Cassette />
          <Stamp />
        </div>
      )}

      <div className={`flex flex-wrap items-start gap-5 ${side === 'right' ? 'justify-end' : ''}`}>
        {photos.map((ph, i) => (
          <div
            key={i}
            className="relative bg-white p-2 pb-6 shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
            style={{ rotate: `${ph.rotation}deg` }}
          >
            <Tape className={i % 2 === 0 ? '-left-5 -top-3' : '-right-5 -top-3 rotate-[7deg]'} />
            <img
              src={ph.url}
              alt=""
              loading="lazy"
              className="h-[146px] w-[146px] object-cover sepia-[0.12]"
            />
          </div>
        ))}
      </div>

      <p
        className={`mt-6 max-w-[300px] font-hand text-[22px] leading-snug text-zinc-700 ${
          side === 'right' ? 'ml-auto text-right' : ''
        }`}
      >
        {note}
      </p>

      {/* stickers */}
      <div
        className={`absolute bottom-7 flex gap-3 text-2xl ${side === 'left' ? 'left-10' : 'right-10'}`}
      >
        {spread.stickers.map((s, i) => (
          <motion.span
            key={i}
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="drop-shadow-sm"
          >
            {s}
          </motion.span>
        ))}
      </div>

      {side === 'right' && (
        <div className="absolute bottom-6 left-24 opacity-80">
          <Vinyl />
        </div>
      )}

      <span
        className={`absolute bottom-3 font-hand text-sm text-zinc-400 ${
          side === 'left' ? 'left-10' : 'right-10'
        }`}
      >
        {side === 'left' ? spread.id * 2 - 1 : spread.id * 2}
      </span>
    </div>
  );
}

function Spine() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-10 -translate-x-1/2">
      <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-r from-black/35 via-black/10 to-black/35" />
      {Array.from({ length: 13 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 h-7 w-9 -translate-x-1/2 rounded-full border-2 border-zinc-300/90"
          style={{
            top: `${2.5 + i * 7.6}%`,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(161,161,170,0.9) 48%, rgba(82,82,91,0.9) 100%)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.45)',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ main */

export default function Scrapbook() {
  const spreads = birthdayConfig.scrapbookSpreads;
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<'next' | 'prev' | null>(null);

  const go = (dir: 'next' | 'prev') => {
    if (flip) return;
    if (dir === 'next' && index >= spreads.length - 1) return;
    if (dir === 'prev' && index <= 0) return;
    setFlip(dir);
    window.setTimeout(() => {
      setIndex((v) => (dir === 'next' ? v + 1 : v - 1));
      setFlip(null);
    }, 760);
  };

  const spread = spreads[index];
  const nextSpread = spreads[Math.min(index + 1, spreads.length - 1)];
  const prevSpread = spreads[Math.max(index - 1, 0)];

  return (
    <section
      id="section-4"
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-16"
    >
      <div className="mb-8 px-6 text-center">
        <h2 className="font-serif text-3xl italic text-white sm:text-4xl">Our scrapbook</h2>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
          Click the page edges to turn • {index + 1} of {spreads.length}
        </p>
      </div>

      {/* The book keeps its 900x560 spread and scales; the wrapper heights keep
          the surrounding layout tight, since a CSS scale doesn't shrink layout. */}
      <div className="h-[228px] origin-top scale-[0.4] sm:h-[328px] sm:scale-[0.58] md:h-[424px] md:scale-[0.75] lg:h-[560px] lg:scale-100">
        <div
          className="relative h-[560px] w-[900px] rounded-md shadow-[0_50px_90px_rgba(0,0,0,0.75)]"
          style={{ perspective: '2200px' }}
        >
          {/* static spread underneath */}
          <div className="absolute inset-0 flex">
            <div className="h-full w-1/2">
              <PageFace spread={flip === 'prev' ? prevSpread : spread} side="left" />
            </div>
            <div className="h-full w-1/2">
              <PageFace spread={flip === 'next' ? nextSpread : spread} side="right" />
            </div>
          </div>

          {/* flipping leaf */}
          <AnimatePresence>
            {flip === 'next' && (
              <motion.div
                key="leaf-next"
                className="preserve-3d absolute right-0 top-0 h-full w-1/2"
                style={{ transformOrigin: 'left center' }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.76, ease: [0.45, 0.05, 0.55, 0.95] }}
              >
                <div className="backface-hidden absolute inset-0 z-20">
                  <PageFace spread={spread} side="right" />
                </div>
                <div
                  className="backface-hidden absolute inset-0"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <PageFace spread={nextSpread} side="left" />
                </div>
              </motion.div>
            )}

            {flip === 'prev' && (
              <motion.div
                key="leaf-prev"
                className="preserve-3d absolute left-0 top-0 h-full w-1/2"
                style={{ transformOrigin: 'right center' }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.76, ease: [0.45, 0.05, 0.55, 0.95] }}
              >
                <div className="backface-hidden absolute inset-0 z-20">
                  <PageFace spread={spread} side="left" />
                </div>
                <div
                  className="backface-hidden absolute inset-0"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <PageFace spread={prevSpread} side="right" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Spine />

          {/* clickable page edges */}
          <button
            type="button"
            onClick={() => go('prev')}
            disabled={index === 0}
            aria-label="Previous page"
            className="absolute left-0 top-0 z-40 h-full w-14 cursor-w-resize disabled:cursor-default"
          />
          <button
            type="button"
            onClick={() => go('next')}
            disabled={index === spreads.length - 1}
            aria-label="Next page"
            className="absolute right-0 top-0 z-40 h-full w-14 cursor-e-resize disabled:cursor-default"
          />
        </div>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go('prev')}
          disabled={index === 0}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 disabled:opacity-25"
          aria-label="Previous spread"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {spreads.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-7 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go('next')}
          disabled={index === spreads.length - 1}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 disabled:opacity-25"
          aria-label="Next spread"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
