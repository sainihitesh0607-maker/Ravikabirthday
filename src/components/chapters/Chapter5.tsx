import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter5({ onNext }: { onNext: () => void }) {
  const [skip, setSkip] = useState(false);
  const photo = CONFIG.photos[9] || CONFIG.photos[0];

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
      className="flex flex-col items-center w-full max-w-2xl mx-auto py-10 px-4 cursor-pointer min-h-[80vh]"
      onClick={() => setSkip(true)}
    >
      <BackgroundPhoto src={CONFIG.photos[8]} opacity={0.3} />

      <motion.h1 custom={1} initial="hidden" animate="visible" variants={variants} className="text-3xl md:text-4xl font-heading text-gradient text-center mb-12">
        Even From Far Away...
      </motion.h1>

      <motion.div custom={2.5} initial="hidden" animate="visible" variants={variants} className="w-full max-w-[280px] md:max-w-sm mb-12 relative">
        <div className="absolute -inset-4 bg-pink-500/20 blur-2xl rounded-full opacity-50 mix-blend-screen" />
        <div className="aspect-[4/5] bg-stone-950 rounded-lg overflow-hidden relative z-10 shadow-2xl border border-white/10 flex items-center justify-center p-1">
          <img 
            src={photo} 
            className="w-full h-full object-contain rounded-md" 
          />
        </div>
      </motion.div>

      <div className="space-y-8 text-center w-full">
        <motion.p custom={5} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Tumse door rehna kabhi kabhi sach mein bahut ajeeb lagta hai.
        </motion.p>
        <motion.p custom={8.5} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Kyunki kuch moments aise hote hain...<br />
          jab bas mann karta hai ki tum paas hoti.
        </motion.p>
        
        <motion.div custom={12.5} initial="hidden" animate="visible" variants={variants} className="py-6 space-y-4 text-white/80 text-lg">
          <p>Koi badi cheez nahi chahiye...</p>
          <p>bas tum saamne hoti,</p>
          <p>hum baat karte, thoda haste,</p>
          <p>aur shayad bina kuch bole bhi ek saath baithe rehte.</p>
        </motion.div>

        <motion.p custom={17} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          I miss those little things...<br/>even the ones we haven't had yet.
        </motion.p>
        
        <motion.p custom={21} initial="hidden" animate="visible" variants={variants} className="text-xl md:text-3xl font-heading text-pink-200 leading-relaxed italic pt-6">
          Doori hai...<br />
          par tum mere dil se door nahi ho.
        </motion.p>
      </div>

      <motion.div custom={25} initial="hidden" animate="visible" variants={variants} className="pt-16 pb-8">
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="px-10 py-4 rounded-full glass-panel border-white/20 hover:bg-white/20 hover:scale-105 transition-all font-medium tracking-wide text-sm cursor-pointer">
          And maybe that's our little secret...
        </button>
      </motion.div>
    </div>
  );
}
