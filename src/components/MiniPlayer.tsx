import { AnimatePresence, motion } from 'framer-motion';
import { Music2, Pause, Play } from 'lucide-react';
import birthdayConfig from '../data/birthdayConfig';
import { useAudio } from '../context/AudioProvider';

/**
 * Floating Spotify-style mini player. Mounts only after the curtain opens.
 */
export default function MiniPlayer() {
  const { started, isPlaying, unavailable, toggle } = useAudio();
  const { song } = birthdayConfig;

  return (
    <AnimatePresence>
      {started && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-[2147483647]"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-white shadow-2xl backdrop-blur-md">
            {/* Spinning album art */}
            <div className="relative h-10 w-10 shrink-0">
              <img
                src={song.coverUrl}
                alt=""
                className={`h-10 w-10 rounded-full object-cover ring-1 ring-white/20 ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 ring-1 ring-white/30" />
            </div>

            <div className="min-w-0 pr-1">
              <p className="truncate text-sm font-semibold leading-tight">{song.title}</p>
              <p className="truncate text-[11px] leading-tight text-white/55">
                {unavailable ? 'add song.mp3 to play' : song.artist}
              </p>
            </div>

            <button
              type="button"
              onClick={toggle}
              disabled={unavailable}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/50"
            >
              {unavailable ? (
                <Music2 className="h-4 w-4" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 translate-x-[1px]" />
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
