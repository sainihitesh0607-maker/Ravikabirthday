import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter6({ onNext, onStateChange }: { onNext: () => void, onStateChange: (state: any) => void }) {
  const [skip, setSkip] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: skip ? 0.1 : d, duration: skip ? 0.5 : 1.5, ease: "easeOut" }
    })
  };

  const lines = [
    { text: "Hamare beech jo bhi hai...\nshayad duniya ko uska naam bhi na pata ho.", delay: 3.5 },
    { text: "Aur sach kahun...\nMujhe usse koi problem bhi nahi hai.", delay: 7.5 },
    { text: "Har khoobsurat cheez duniya ko dikhani zaroori nahi hoti.", delay: 11.5 },
    { text: "Kuch feelings bas do logon ke beech achhi lagti hain...\njahan na koi audience hoti hai, na koi explanation.", delay: 15.5 },
    { text: "Bas tum samjho...\naur main samjhun.", delay: 20 },
  ];

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-4 text-center cursor-pointer"
      onClick={() => setSkip(true)}
    >
      <BackgroundPhoto src={CONFIG.photos[10]} opacity={0.25} />

      <motion.h1 custom={1} initial="hidden" animate="visible" variants={variants} className="text-3xl md:text-5xl font-heading text-gradient leading-tight mb-16">
        Some Stories Are Meant To Stay Between Two People.
      </motion.h1>

      <div className="space-y-12 mb-20 w-full">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            custom={line.delay}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-lg md:text-xl font-light text-white/90 whitespace-pre-line leading-relaxed"
          >
            {line.text}
          </motion.p>
        ))}
      </div>
      
      <div className="space-y-8 mb-20 w-full">
        <motion.h2 custom={24} initial="hidden" animate="visible" variants={variants} className="text-3xl md:text-4xl font-heading text-pink-200">
          Maybe the world doesn't know...<br/>but you do.
        </motion.h2>
        <motion.p custom={28} initial="hidden" animate="visible" variants={variants} className="text-xl md:text-2xl font-light text-white/90 italic">
          Aur mere liye...<br/>shayad itna hi kaafi hai.
        </motion.p>
      </div>

      <motion.div custom={31.5} initial="hidden" animate="visible" variants={variants} className="pb-10">
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="px-10 py-4 rounded-full glass-panel border-white/20 hover:bg-white/10 hover:scale-105 transition-all font-medium tracking-wide text-sm text-pink-100 cursor-pointer">
          One Last Thing, Ravika...
        </button>
      </motion.div>
    </div>
  );
}
