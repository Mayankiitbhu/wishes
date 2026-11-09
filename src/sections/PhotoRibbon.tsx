import { useMemo } from 'react';
import { motion } from 'framer-motion';
import birthdayConfig from '../data/birthdayConfig';

const VB = 640; // SVG viewBox is VB x VB
const A = 258; // lemniscate scale

/** Vertical figure-eight (ribbon loop / alpha). t -> point in viewBox space. */
function lemniscate(t: number): [number, number] {
  const d = 1 + Math.sin(t) * Math.sin(t);
  const u = (A * Math.cos(t)) / d;
  const v = (A * Math.sin(t) * Math.cos(t)) / d;
  // swap axes so the loop stands upright, then tilt it ~12deg for a ribbon feel
  const x = v;
  const y = u;
  const r = (12 * Math.PI) / 180;
  return [
    VB / 2 + (x * Math.cos(r) - y * Math.sin(r)) * 1.05,
    VB / 2 + (x * Math.sin(r) + y * Math.cos(r)),
  ];
}

export default function PhotoRibbon() {
  const { ribbonPhotos, girlfriendName, greeting } = birthdayConfig;

  /** Dense samples for the drawn path + arc-length-even slots for the photos. */
  const { pathD, slots } = useMemo(() => {
    const SAMPLES = 900;
    const pts: [number, number][] = [];
    for (let i = 0; i <= SAMPLES; i++) pts.push(lemniscate((i / SAMPLES) * Math.PI * 2));

    const cum: number[] = [0];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i - 1][0];
      const dy = pts[i][1] - pts[i - 1][1];
      cum.push(cum[i - 1] + Math.hypot(dx, dy));
    }
    const total = cum[cum.length - 1];

    const n = ribbonPhotos.length;
    const picked: { x: number; y: number; angle: number }[] = [];
    let cursor = 0;
    for (let k = 0; k < n; k++) {
      const target = (k / n) * total;
      while (cursor < cum.length - 2 && cum[cursor] < target) cursor++;
      const i = cursor;
      const [x, y] = pts[i];
      const [nx, ny] = pts[Math.min(i + 6, pts.length - 1)];
      picked.push({ x, y, angle: (Math.atan2(ny - y, nx - x) * 180) / Math.PI });
    }

    const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ') + ' Z';
    return { pathD: d, slots: picked };
  }, [ribbonPhotos.length]);

  return (
    <section
      id="section-2"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f5f5f7] px-6 py-20 text-zinc-900 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* ------------------------------------------------ left: typography */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-zinc-400">
            Chapter one
          </p>
          <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            {greeting.heading}
          </h2>
          <p className="mt-1 font-serif text-5xl italic leading-tight text-coral sm:text-6xl lg:text-7xl">
            {girlfriendName}
          </p>
          <p className="mt-8 max-w-md text-[15px] leading-7 text-zinc-600">{greeting.paragraph}</p>
          <p className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            <span className="inline-block h-px w-10 bg-zinc-300" />
            Hover a photo to bring it back to life
          </p>
        </motion.div>

        {/* ------------------------------------------- right: the loop ribbon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto aspect-square w-full max-w-[600px]"
        >
          <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="ribbonStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e07a5f" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#f2cc8f" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e07a5f" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#ribbonStroke)"
              strokeWidth="26"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </svg>

          {ribbonPhotos.map((url, i) => {
            const s = slots[i];
            return (
              <motion.div
                key={i}
                className="group absolute hover:z-30"
                style={{
                  left: `${(s.x / VB) * 100}%`,
                  top: `${(s.y / VB) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.055, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div
                  className="h-[58px] w-[58px] overflow-hidden rounded-xl bg-white p-[3px] shadow-md transition-all duration-300 hover:z-20 hover:scale-125 hover:shadow-xl sm:h-[72px] sm:w-[72px]"
                  style={{ rotate: `${s.angle * 0.12}deg` }}
                >
                  <img
                    src={url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full rounded-lg object-cover brightness-90 grayscale transition-all duration-300 group-hover:brightness-100 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
