import { motion } from 'motion/react';

interface ProgressBarProps {
  currentChapter: number;
  totalChapters: number;
}

export function ProgressBar({ currentChapter, totalChapters }: ProgressBarProps) {
  const progress = (currentChapter / totalChapters) * 100;
  
  if (currentChapter === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-sm flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] font-medium text-white/50">
          {String(currentChapter).padStart(2, '0')} / {String(totalChapters).padStart(2, '0')}
        </span>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
