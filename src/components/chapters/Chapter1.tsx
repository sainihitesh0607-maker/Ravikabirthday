import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';

export function Chapter1({ onNext }: { onNext: () => void }) {
  const [skip, setSkip] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: skip ? 0.1 : d, duration: skip ? 0.4 : 1.5, ease: "easeOut" }
    })
  };

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 cursor-pointer"
      onClick={() => setSkip(true)}
    >
      <div className="max-w-lg space-y-12">
        <motion.p custom={1} initial="hidden" animate="visible" variants={variants} className="text-white/60 tracking-widest text-sm uppercase leading-relaxed">
          A little world made for one person...
        </motion.p>
        
        <motion.h1 custom={2.5} initial="hidden" animate="visible" variants={variants} className="text-5xl md:text-7xl font-heading text-gradient tracking-wide py-4">
          {CONFIG.name} <span className="text-pink-500 inline-block">❤️</span>
        </motion.h1>

        <div className="space-y-6">
          <motion.p custom={4.5} initial="hidden" animate="visible" variants={variants} className="text-xl font-light text-white/80 leading-relaxed">
            Ye bas ek birthday wish nahi hai.
          </motion.p>
          <motion.p custom={6.5} initial="hidden" animate="visible" variants={variants} className="text-xl font-light text-white/80 leading-relaxed">
            Thoda sa waqt hai...<br/>
            jo maine sirf tumhare liye rakha hai.
          </motion.p>
          <motion.p custom={9.5} initial="hidden" animate="visible" variants={variants} className="text-xl font-light text-white/80 leading-relaxed">
            Isliye headphones laga lo...<br/>
            aur bas kuch der ke liye,<br/>
            meri banayi hui is chhoti si duniya mein aa jao.
          </motion.p>
          <motion.p custom={12.5} initial="hidden" animate="visible" variants={variants} className="text-white/50 tracking-[0.3em] text-sm pt-4">
            {CONFIG.birthday}
          </motion.p>
        </div>

        <motion.div custom={15} initial="hidden" animate="visible" variants={variants} className="pt-12 space-y-8 flex flex-col items-center w-full">
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="px-10 py-4 rounded-full glass-panel border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 font-medium tracking-[0.2em] uppercase text-sm cursor-pointer w-full max-w-[280px]"
          >
            Tap to Enter ❤️
          </button>
        </motion.div>
      </div>
    </div>
  );
}
