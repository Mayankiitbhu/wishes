import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import birthdayConfig from '../data/birthdayConfig';

const BUTTERFLY_SPOTS = [
  { left: '88%', top: '22%' },
  { left: '6%', top: '74%' },
  { left: '50%', top: '86%' },
];

function Butterfly({ onClick, delay }: { onClick: () => void; delay: number }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open a secret note"
      className="group absolute z-30 cursor-pointer"
      animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      whileHover={{ scale: 1.2 }}
    >
      <svg width="54" height="46" viewBox="0 0 54 46" aria-hidden>
        <defs>
          <linearGradient id={`wing${delay}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        {/* left wings */}
        <motion.g
          style={{ originX: '27px', originY: '23px' }}
          animate={{ scaleX: [1, 0.35, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M27 23 C12 2, 0 10, 6 22 C0 26, 10 42, 27 23 Z" fill={`url(#wing${delay})`} />
          <path d="M27 23 C14 7, 5 13, 9 21 Z" fill="#fff" opacity="0.28" />
        </motion.g>
        {/* right wings */}
        <motion.g
          style={{ originX: '27px', originY: '23px' }}
          animate={{ scaleX: [1, 0.35, 1] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M27 23 C42 2, 54 10, 48 22 C54 26, 44 42, 27 23 Z" fill={`url(#wing${delay})`} />
          <path d="M27 23 C40 7, 49 13, 45 21 Z" fill="#fff" opacity="0.28" />
        </motion.g>
        {/* body + antennae */}
        <ellipse cx="27" cy="24" rx="2" ry="11" fill="#3f2512" />
        <path d="M27 14 q-5 -6 -8 -8" stroke="#3f2512" strokeWidth="1.3" fill="none" />
        <path d="M27 14 q5 -6 8 -8" stroke="#3f2512" strokeWidth="1.3" fill="none" />
      </svg>
      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-zinc-500 opacity-0 transition group-hover:opacity-100">
        click me
      </span>
    </motion.button>
  );
}

export default function PolaroidBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [topCard, setTopCard] = useState<number | null>(null);
  const [openNote, setOpenNote] = useState<number | null>(null);
  const { polaroids, secretNotes } = birthdayConfig;

  return (
    <section
      id="section-3"
      className="relative min-h-screen overflow-hidden bg-[#e5e5e5] py-16"
      style={{
        backgroundImage:
          'radial-gradient(circle at 18% 12%, rgba(255,255,255,0.9), transparent 45%), radial-gradient(circle at 82% 88%, rgba(0,0,0,0.05), transparent 50%)',
      }}
    >
      <div className="relative z-20 mx-auto mb-6 max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl italic text-zinc-800 sm:text-4xl">The memory board</h2>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Drag the memories around • Click the butterflies for secret notes
        </p>
      </div>

      {/* ------------------------------------------------------- the board */}
      <div ref={boardRef} className="relative mx-auto h-[720px] w-full max-w-6xl px-4">
        {polaroids.map((pl, i) => (
          <motion.div
            key={pl.id}
            drag
            dragMomentum={false}
            dragConstraints={boardRef}
            dragElastic={0.08}
            onPointerDown={() => setTopCard(pl.id)}
            whileDrag={{ scale: 1.05, boxShadow: '0 30px 60px rgba(0,0,0,0.35)' }}
            initial={{ opacity: 0, y: 40, rotate: pl.rotation * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: pl.rotation }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 180, damping: 18 }}
            className="absolute w-[176px] cursor-grab touch-none rounded-[3px] bg-white p-3 pb-10 shadow-[0_12px_28px_rgba(0,0,0,0.22)] active:cursor-grabbing sm:w-[200px]"
            style={{
              left: `${pl.x}%`,
              top: `${pl.y}%`,
              zIndex: topCard === pl.id ? 40 : 10 + i,
            }}
          >
            {/* heart pushpin */}
            <span className="absolute -right-2 -top-3 z-10 drop-shadow-md">
              <Heart className="h-7 w-7 fill-red-500 text-red-600" />
            </span>

            <img
              src={pl.imageUrl}
              alt=""
              loading="lazy"
              draggable={false}
              className="aspect-square w-full select-none object-cover"
            />
            <p className="absolute inset-x-0 bottom-2 text-center font-hand text-2xl text-zinc-700">
              {pl.caption}
            </p>
          </motion.div>
        ))}

        {secretNotes.map((_, i) => (
          <div key={i} className="absolute" style={BUTTERFLY_SPOTS[i % BUTTERFLY_SPOTS.length]}>
            <Butterfly delay={i * 0.6} onClick={() => setOpenNote(i)} />
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------- the modal */}
      <AnimatePresence>
        {openNote !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenNote(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/55 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md rounded-2xl border border-white/15 bg-zinc-900/95 p-6 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenNote(null)}
                aria-label="Close note"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-300/80">
                Secret note {openNote + 1}
              </p>
              <p className="font-serif text-lg italic leading-relaxed text-white/90">
                {secretNotes[openNote]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
