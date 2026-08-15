import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuroraBackground } from './components/AuroraBackground';
import { ThreeHearts } from './components/ThreeHearts';
import { AudioPlayer, AudioPlayerRef } from './components/AudioPlayer';
import { ProgressBar } from './components/ProgressBar';

import { Chapter1 } from './components/chapters/Chapter1';
import { Chapter2 } from './components/chapters/Chapter2';
import { Chapter3 } from './components/chapters/Chapter3';
import { Chapter4 } from './components/chapters/Chapter4';
import { Chapter5 } from './components/chapters/Chapter5';
import { Chapter6 } from './components/chapters/Chapter6';
import { Chapter7 } from './components/chapters/Chapter7';
import { Finale } from './components/chapters/Finale';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const audioRef = useRef<AudioPlayerRef>(null);

  const handleNext = () => {
    if (currentChapter === 0 && audioRef.current) {
      audioRef.current.play();
    }
    setCurrentChapter(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFinale = currentChapter === 7;
  const isSecret = currentChapter === 5; // Chapter 6 slows down

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AuroraBackground 
        reduced={isSecret} 
        brighten={isFinale} 
      />
      <ThreeHearts 
        active={!isFinale || currentChapter < 8} 
        finale={isFinale} 
      />
      <AudioPlayer ref={audioRef} />
      {currentChapter > 0 && currentChapter < 7 && (
        <ProgressBar currentChapter={currentChapter} totalChapters={7} />
      )}

      <main className="relative z-10 min-h-screen w-full pt-12 pb-24 md:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -30 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[80vh] w-full flex flex-col items-center justify-center p-4 md:p-8"
          >
            {currentChapter === 0 && <Chapter1 onNext={handleNext} />}
            {currentChapter === 1 && <Chapter2 onNext={handleNext} />}
            {currentChapter === 2 && <Chapter3 onNext={handleNext} />}
            {currentChapter === 3 && <Chapter4 onNext={handleNext} />}
            {currentChapter === 4 && <Chapter5 onNext={handleNext} />}
            {currentChapter === 5 && <Chapter6 onNext={handleNext} onStateChange={() => {}} />}
            {currentChapter === 6 && <Chapter7 onNext={handleNext} />}
            {currentChapter === 7 && <Finale />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
