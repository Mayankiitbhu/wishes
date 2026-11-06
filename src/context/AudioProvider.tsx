import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import birthdayConfig from '../data/birthdayConfig';

interface AudioState {
  /** True once the curtain has been opened — gates the mini player. */
  started: boolean;
  isPlaying: boolean;
  /** No audioUrl configured, or the file failed to load. */
  unavailable: boolean;
  start: () => void;
  toggle: () => void;
}

const AudioCtx = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(!birthdayConfig.song.audioUrl);

  // Create the element once, outside React's tree, so re-renders never restart it.
  useEffect(() => {
    if (!birthdayConfig.song.audioUrl) return;
    const el = new Audio(birthdayConfig.song.audioUrl);
    el.loop = true;
    el.preload = 'auto';
    el.volume = 0.65;
    const onError = () => {
      setUnavailable(true);
      setIsPlaying(false);
    };
    el.addEventListener('error', onError);
    audioRef.current = el;
    return () => {
      el.removeEventListener('error', onError);
      el.pause();
      audioRef.current = null;
    };
  }, []);

  /** Called from the curtain click — a real user gesture, so autoplay is allowed. */
  const start = useCallback(() => {
    setStarted(true);
    const el = audioRef.current;
    if (!el) return;
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, []);

  const value = useMemo(
    () => ({ started, isPlaying, unavailable, start, toggle }),
    [started, isPlaying, unavailable, start, toggle]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>');
  return ctx;
}
