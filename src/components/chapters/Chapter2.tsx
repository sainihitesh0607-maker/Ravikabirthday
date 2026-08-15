import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter2({ onNext }: { onNext: () => void }) {
  const [skip, setSkip] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: skip ? 0.1 : d,
        duration: skip ? 0.4 : 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div 
      className="flex flex-col items-center justify-center w-full min-h-[70vh] cursor-pointer"
      onClick={() => setSkip(true)}
    >
      {/* Chapter 2 background photo — CENTER */}
      <BackgroundPhoto
        src={CONFIG.photos[2]}
        opacity={0.4}
        position="center"
      />
      
      <div className="flex flex-col items-center text-center space-y-12 max-w-xl mx-auto py-10 px-4">
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-4xl md:text-5xl font-heading text-gradient leading-tight"
        >
          Happy Birthday, {CONFIG.name} ❤️
        </motion.h1>

        <div className="space-y-10 pt-6">
          <motion.p
            custom={3.5}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-lg md:text-xl font-light text-white/90 leading-relaxed"
          >
            Aaj tumhara birthday hai...<br/>
            aur pata nahi kyun, mujhe lagta hai aaj tumhe sirf wish karna kaafi nahi hoga.
          </motion.p>
          
          <motion.p
            custom={7.5}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-lg md:text-xl font-light text-white/90 leading-relaxed"
          >
            Kuch logon ke liye 'Happy Birthday' bas do words hote hain...
          </motion.p>
          
          <motion.p
            custom={10.5}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="text-xl md:text-2xl font-heading text-pink-200 leading-relaxed italic pt-4"
          >
            par tumhare liye,<br/>
            mere paas un do words se kahin zyada hai.
          </motion.p>
        </div>

        <motion.div
          custom={14}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="pt-12 w-full flex justify-center"
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="px-10 py-4 rounded-full glass-panel border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium tracking-wide text-sm cursor-pointer"
          >
            Read on...
          </button>
        </motion.div>
      </div>
    </div>
  );
}
