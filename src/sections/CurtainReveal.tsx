import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import birthdayConfig from '../data/birthdayConfig';
import { useAudio } from '../context/AudioProvider';

type Stage = 'curtain' | 'rolling' | 'locked' | 'melting' | 'celebrate';

const DIGIT_H = 200; // px per digit cell in the odometer reel
const CYCLES = 6; // full 0-9 passes before locking

/* --------------------------------------------------------------- odometer */

function DigitReel({ digit, index, onDone }: { digit: number; index: number; onDone?: () => void }) {
  const cells = useMemo(() => {
    const out: number[] = [];
    for (let c = 0; c < CYCLES; c++) for (let n = 0; n <= 9; n++) out.push(n);
    out.push(digit);
    return out;
  }, [digit]);

  const finalY = -(cells.length - 1) * DIGIT_H;

  return (
    <div className="overflow-hidden" style={{ height: DIGIT_H }}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: finalY }}
        transition={{ duration: 2 + index * 0.3, ease: [0.17, 0.84, 0.12, 1] }}
        onAnimationComplete={onDone}
      >
        {cells.map((n, i) => (
          <div
            key={i}
            className="flex items-center justify-center font-extrabold leading-none text-white"
            style={{ height: DIGIT_H, fontSize: '12rem' }}
          >
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------- decoration */

const BALLOON_COLORS = ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#22d3ee', '#84cc16', '#fb7185'];

function Balloons() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        id: i,
        left: 4 + i * 8.6 + (i % 3) * 2,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: 54 + (i % 4) * 14,
        delay: (i % 5) * 0.35,
        duration: 7 + (i % 4) * 1.6,
        drift: i % 2 === 0 ? 34 : -28,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-0"
          style={{ left: `${b.left}%` }}
          initial={{ y: 160, opacity: 0 }}
          animate={{ y: -1100, x: [0, b.drift, 0], opacity: [0, 1, 1, 0.9] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'linear',
            x: { duration: b.duration / 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          }}
        >
          <div
            className="rounded-[50%] shadow-xl"
            style={{
              width: b.size,
              height: b.size * 1.22,
              background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 14%, ${b.color} 46%, rgba(0,0,0,0.45) 100%)`,
            }}
          />
          <div
            className="mx-auto h-0 w-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `10px solid ${b.color}`,
            }}
          />
          <div className="mx-auto h-24 w-px bg-white/25" />
        </motion.div>
      ))}
    </div>
  );
}

function Cake() {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.35 }}
      className="pointer-events-none absolute bottom-24 left-1/2"
    >
      <svg width="190" height="170" viewBox="0 0 190 170" aria-hidden>
        <defs>
          <radialGradient id="cakeGlow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <ellipse cx="95" cy="110" rx="92" ry="58" fill="url(#cakeGlow)" />

        {/* candles */}
        {[70, 95, 120].map((x, i) => (
          <g key={x}>
            <rect x={x - 3} y={58} width="6" height="24" rx="2" fill="#fef9c3" />
            <motion.ellipse
              cx={x}
              cy={50}
              rx="5"
              ry="9"
              fill="#fb923c"
              animate={{ ry: [9, 12, 9], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx={x}
              cy={52}
              rx="2.4"
              ry="5"
              fill="#fef08a"
              animate={{ ry: [5, 7, 5] }}
              transition={{ duration: 0.4 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        ))}

        {/* tiers */}
        <rect x="52" y="80" width="86" height="34" rx="8" fill="url(#tier2)" />
        <rect x="34" y="112" width="122" height="42" rx="10" fill="url(#tier1)" />
        <path
          d="M34 118 q15 14 30 0 q15 14 30 0 q15 14 30 0 q15 14 32 0 v-6 H34 z"
          fill="#fff1f2"
          opacity="0.9"
        />
        <rect x="26" y="150" width="138" height="10" rx="5" fill="#e4e4e7" />
      </svg>
    </motion.div>
  );
}

function FlameParticles() {
  const bits = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        size: 8 + Math.random() * 26,
        delay: Math.random() * 0.7,
        duration: 0.9 + Math.random() * 0.9,
        hue: Math.random() > 0.5 ? '#f97316' : '#dc2626',
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute bottom-0 rounded-full blur-[3px]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 50% 70%, #fde68a 0%, ${b.hue} 55%, rgba(220,38,38,0) 75%)`,
          }}
          initial={{ y: 40, opacity: 0, scale: 0.5 }}
          animate={{ y: -230, opacity: [0, 1, 0], scale: [0.5, 1.15, 0.3] }}
          transition={{ duration: b.duration, delay: b.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- countdown */

const UNLOCK_MS = new Date(birthdayConfig.unlockAt).getTime();

/** Milliseconds left until the curtain may be opened (0 once reached). */
function useRemaining() {
  const [left, setLeft] = useState(() => Math.max(0, UNLOCK_MS - Date.now()));
  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => {
      const next = Math.max(0, UNLOCK_MS - Date.now());
      setLeft(next);
      if (next <= 0) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, [left <= 0]); // eslint-disable-line react-hooks/exhaustive-deps
  return left;
}

function Countdown({ ms }: { ms: number }) {
  const total = Math.ceil(ms / 1000);
  const parts = [
    { label: 'days', value: Math.floor(total / 86400) },
    { label: 'hours', value: Math.floor((total % 86400) / 3600) },
    { label: 'minutes', value: Math.floor((total % 3600) / 60) },
    { label: 'seconds', value: total % 60 },
  ];
  return (
    <div className="flex items-start gap-3 sm:gap-6" role="timer" aria-live="off">
      {parts.map((p) => (
        <div key={p.label} className="flex min-w-[3.5rem] flex-col items-center sm:min-w-[5rem]">
          <span className="font-serif text-4xl font-bold tabular-nums text-amber-50 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:text-6xl">
            {String(p.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.35em] text-amber-100/60 sm:text-xs">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ main */

export default function CurtainReveal({ onOpened }: { onOpened: () => void }) {
  const { oldAge, newAge, girlfriendName } = birthdayConfig;
  const { start } = useAudio();
  const [stage, setStage] = useState<Stage>('curtain');
  const remaining = useRemaining();
  const unlocked = remaining <= 0;

  const oldDigits = useMemo(() => String(oldAge).split('').map(Number), [oldAge]);

  const openCurtain = useCallback(() => {
    if (stage !== 'curtain' || !unlocked) return;
    setStage('rolling');
    onOpened();
  }, [stage, unlocked, onOpened]);

  const blowOut = useCallback(() => {
    if (stage !== 'locked') return;
    setStage('melting');
    start(13); // music begins at 0:13 when the candle is blown out
  }, [stage, start]);

  // Melt runs for 1.8s, then the new age arrives with confetti.
  useEffect(() => {
    if (stage !== 'melting') return;
    const t = setTimeout(() => setStage('celebrate'), 1800);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'celebrate') return;
    const fire = (x: number, angle: number) =>
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { x, y: 0.72 },
        angle,
        startVelocity: 55,
        colors: ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#22d3ee', '#ffffff'],
        disableForReducedMotion: true,
      });
    fire(0.5, 90);
    const t1 = setTimeout(() => fire(0.15, 60), 260);
    const t2 = setTimeout(() => fire(0.85, 120), 440);
    const t3 = setTimeout(() => fire(0.5, 90), 900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [stage]);

  const showNumber = stage === 'rolling' || stage === 'locked' || stage === 'melting';

  return (
    <section
      id="section-1"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* SVG melt filter — turbulence + displacement, animated via SMIL. */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="meltFilter" x="-30%" y="-30%" width="160%" height="190%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="3" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="1.8s"
              values="0.015 0.04; 0.03 0.12; 0.05 0.2"
              fill="freeze"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" dur="1.8s" values="0; 34; 90" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>

      {/* stage glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,180,120,0.14),transparent_62%)]" />

      {stage === 'celebrate' && <Balloons />}

      {/* ----------------------------------------------- the number */}
      <div
        className="relative z-10 flex flex-col items-center transition-[margin] duration-700"
        // Lift the number + caption clear of the cake (it occupies the bottom ~270px).
        style={{ marginBottom: stage === 'celebrate' ? 280 : 0 }}
      >
        <AnimatePresence mode="wait">
          {showNumber && (
            <motion.div
              key="old"
              className="relative"
              animate={
                stage === 'melting'
                  ? { scaleY: 0.42, y: 120, opacity: 0, filter: 'blur(2px)' }
                  : { scaleY: 1, y: 0, opacity: 1 }
              }
              transition={{ duration: stage === 'melting' ? 1.8 : 0.3, ease: 'easeIn' }}
              style={stage === 'melting' ? { filter: 'url(#meltFilter)' } : undefined}
            >
              <button
                type="button"
                onClick={blowOut}
                disabled={stage !== 'locked'}
                aria-label={`Blow out the candle on ${oldAge}`}
                className="flex cursor-pointer select-none gap-1 disabled:cursor-default"
              >
                {oldDigits.map((d, i) => (
                  <DigitReel
                    key={i}
                    digit={d}
                    index={i}
                    onDone={i === oldDigits.length - 1 ? () => setStage('locked') : undefined}
                  />
                ))}
              </button>
              {stage === 'melting' && <FlameParticles />}
            </motion.div>
          )}

          {stage === 'celebrate' && (
            <motion.div
              key="new"
              initial={{ scale: 0.2, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
              className="text-shadow-glow font-extrabold leading-none text-white"
              style={{ fontSize: '12rem' }}
            >
              {newAge}
            </motion.div>
          )}
        </AnimatePresence>

        {/* hint / caption under the number */}
        <div className="mt-4 h-10">
          <AnimatePresence mode="wait">
            {stage === 'locked' && (
              <motion.p
                key="hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0.35, 1, 0.35], y: 0 }}
                exit={{ opacity: 0, y: 0, transition: { duration: 0.15, repeat: 0 } }}
                transition={{ opacity: { duration: 2, repeat: Infinity }, y: { duration: 0.4 } }}
                className="text-sm font-medium uppercase tracking-[0.3em] text-white/70"
              >
                Click the number to blow out the candle
              </motion.p>
            )}
            {stage === 'celebrate' && (
              <motion.p
                key="cheer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-serif text-2xl italic text-white/90"
              >
                Twenty-sixth looks good on you, {girlfriendName}.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {stage === 'celebrate' && <Cake />}

      {/* scroll cue */}
      {stage === 'celebrate' && (
        <motion.a
          href="#section-2"
          initial={{ opacity: 0, x: '-50%' }}
          animate={{ opacity: 1, x: '-50%', y: [0, 8, 0] }}
          transition={{ opacity: { delay: 2.4 }, y: { duration: 1.8, repeat: Infinity, delay: 2.4 } }}
          className="absolute bottom-8 left-1/2 z-20 text-white/55 hover:text-white"
          aria-label="Scroll to the next section"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.a>
      )}

      {/* ----------------------------------------------- the curtain */}
      <AnimatePresence>
        {stage === 'curtain' && (
          <motion.button
            type="button"
            onClick={openCurtain}
            exit={{ opacity: 1 }}
            className={`absolute inset-0 z-40 ${unlocked ? 'cursor-pointer' : 'cursor-default'}`}
            aria-label={unlocked ? 'Open the curtains' : 'Curtains open at midnight'}
          >
            {/* top valance */}
            <div className="velvet absolute inset-x-0 top-0 z-10 h-16 shadow-[0_14px_40px_rgba(0,0,0,0.8)]" />

            {(['left', 'right'] as const).map((side) => (
              <motion.div
                key={side}
                className="velvet absolute inset-y-0 w-1/2"
                style={side === 'left' ? { left: 0 } : { right: 0 }}
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: side === 'left' ? '-102%' : '102%' }}
                transition={{ duration: 1.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <div
                  className={`absolute inset-y-0 w-24 ${side === 'left' ? 'right-0' : 'left-0'}`}
                  style={{
                    background:
                      side === 'left'
                        ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.75))'
                        : 'linear-gradient(to left, transparent, rgba(0,0,0,0.75))',
                  }}
                />
              </motion.div>
            ))}

            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {unlocked ? (
                <>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-serif text-4xl italic text-amber-50 drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] md:text-5xl"
                  >
                    Click anywhere
                  </motion.p>
                  <p className="text-xs uppercase tracking-[0.45em] text-amber-100/60">
                    something is waiting for you
                  </p>
                </>
              ) : (
                <>
                  <Countdown ms={remaining} />
                  <p className="mt-3 text-xs uppercase tracking-[0.45em] text-amber-100/60">
                    something is waiting for you
                  </p>
                </>
              )}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
