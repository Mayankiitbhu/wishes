import { useCallback, useEffect, useState } from 'react';
import { AudioProvider } from './context/AudioProvider';
import MiniPlayer from './components/MiniPlayer';
import CurtainReveal from './sections/CurtainReveal';
import PhotoRibbon from './sections/PhotoRibbon';
import PolaroidBoard from './sections/PolaroidBoard';
import Scrapbook from './sections/Scrapbook';
import PhotoGalaxy from './sections/PhotoGalaxy';
import ChatFinale from './sections/ChatFinale';

export default function App() {
  const [opened, setOpened] = useState(false);

  // Keep the page locked on the curtain until she opens it.
  useEffect(() => {
    document.body.dataset.locked = opened ? 'false' : 'true';
    return () => {
      document.body.dataset.locked = 'false';
    };
  }, [opened]);

  const handleOpened = useCallback(() => setOpened(true), []);

  return (
    <AudioProvider>
      <main className="relative">
        <CurtainReveal onOpened={handleOpened} />
        <PhotoRibbon />
        <PolaroidBoard />
        <Scrapbook />
        <PhotoGalaxy />
        <ChatFinale />
      </main>
      <MiniPlayer />
    </AudioProvider>
  );
}
