import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  Heart,
  Phone,
  SendHorizonal,
  Signal,
  Video,
  Wifi,
  BatteryFull,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import birthdayConfig from '../data/birthdayConfig';

const STEP_MS = 1800;
const TYPING_MS = 950;

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-md bg-zinc-700/80 px-4 py-3"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 5,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0"
          style={{ left: `${h.left}%` }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: -900, opacity: [0, 0.75, 0], x: [0, 30, -20, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Heart className="fill-white/40 text-white/40" style={{ width: h.size, height: h.size }} />
        </motion.div>
      ))}
    </div>
  );
}

export default function ChatFinale() {
  const { chatMessages, chatContact, girlfriendName } = birthdayConfig;
  const [unlocked, setUnlocked] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Automated sequence: a "typing..." bubble, then the message — one every STEP_MS. */
  useEffect(() => {
    if (!unlocked || revealed >= chatMessages.length) return;
    const gap = revealed === 0 ? 450 : STEP_MS - TYPING_MS;
    const startTyping = window.setTimeout(() => setTyping(true), gap);
    const showMessage = window.setTimeout(() => {
      setTyping(false);
      setRevealed((n) => n + 1);
    }, gap + TYPING_MS);
    return () => {
      clearTimeout(startTyping);
      clearTimeout(showMessage);
    };
  }, [unlocked, revealed, chatMessages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [revealed, typing]);

  useEffect(() => {
    if (revealed === chatMessages.length && chatMessages.length > 0) {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#fb923c', '#ec4899', '#ffffff', '#a855f7'],
        disableForReducedMotion: true,
      });
    }
  }, [revealed, chatMessages.length]);

  return (
    <section
      id="section-6"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#6b21a8] via-[#be185d] to-[#e11d48] p-6"
    >
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex h-[740px] w-[360px] max-w-full flex-col overflow-hidden rounded-[55px] border-[10px] border-zinc-800 bg-black shadow-2xl"
        style={{ maxHeight: '88vh' }}
      >
        {/* Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-7 w-28 -translate-x-1/2 rounded-full bg-black ring-1 ring-zinc-900" />

        {/* status bar */}
        <div className="relative z-20 flex shrink-0 items-center justify-between px-7 pb-1 pt-4 text-[11px] font-semibold text-white">
          <span>6:50 PM</span>
          <span className="flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <BatteryFull className="h-4 w-4" />
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* ------------------------------------------------ lock screen */}
          {!unlocked ? (
            <motion.button
              key="lock"
              type="button"
              onClick={() => setUnlocked(true)}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-8"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="grid h-24 w-24 place-items-center rounded-full bg-rose-500/15 ring-1 ring-rose-400/30"
                style={{ boxShadow: '0 0 70px rgba(244,63,94,0.45)' }}
              >
                <Heart className="h-11 w-11 fill-rose-400 text-rose-400" />
              </motion.div>
              <div className="text-center">
                <p className="font-serif text-2xl italic text-white">A little surprise for You</p>
                <motion.p
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60"
                >
                  Tap to unlock
                </motion.p>
              </div>
            </motion.button>
          ) : (
            /* ------------------------------------------------ chat app */
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="flex flex-1 flex-col overflow-hidden bg-zinc-950"
            >
              {/* header */}
              <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-zinc-900/90 px-4 py-3 backdrop-blur">
                <ChevronLeft className="h-5 w-5 shrink-0 text-blue-400" />
                <img
                  src={chatContact.avatarUrl}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/20"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{chatContact.name}</p>
                  <p className="truncate text-[10px] text-emerald-400/90">{chatContact.subtitle}</p>
                </div>
                <Video className="h-5 w-5 shrink-0 text-blue-400" />
                <Phone className="h-[18px] w-[18px] shrink-0 text-blue-400" />
              </div>

              {/* messages */}
              <div
                ref={scrollRef}
                className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-5"
              >
                <p className="mx-auto mb-1 text-[10px] font-medium uppercase tracking-widest text-white/25">
                  Today
                </p>

                {chatMessages.slice(0, revealed).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-lg"
                  >
                    {msg}
                  </motion.div>
                ))}

                <AnimatePresence>{typing && <TypingBubble key="typing" />}</AnimatePresence>

                {revealed === chatMessages.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.3 }}
                    className="ml-auto mt-1 flex items-center gap-1.5 text-rose-400"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                      >
                        <Heart className="h-4 w-4 fill-rose-400" />
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* input bar */}
              <div className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-zinc-900/90 px-3 py-3">
                <input
                  disabled
                  placeholder="Message..."
                  className="min-w-0 flex-1 cursor-not-allowed rounded-full border border-white/10 bg-zinc-800/80 px-4 py-2 text-[13px] text-white/60 placeholder:text-white/35"
                />
                <button
                  type="button"
                  disabled
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 cursor-not-allowed place-items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-70"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* home bar */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-1.5 w-32 -translate-x-1/2 rounded-full bg-white/70" />
      </motion.div>

      <p className="absolute bottom-7 left-8 z-10 whitespace-nowrap font-hand text-2xl text-white/75">
        happy birthday, {girlfriendName} ❤️
      </p>
    </section>
  );
}
