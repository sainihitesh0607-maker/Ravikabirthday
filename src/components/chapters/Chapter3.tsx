import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter3({ onNext }: { onNext: () => void }) {
  const [skip, setSkip] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: skip ? 0.1 : d, duration: skip ? 0.4 : 1.2, ease: "easeOut" }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: skip ? 0.1 : d, duration: skip ? 0.4 : 1.5, ease: "easeOut" }
    })
  };

  const cards = [
    {
      title: "✨ Your Unmatched Kindness",
      desc: "Tumhari sabse khoobsurat baat shayad ye hai...\nki tumhe khud pata bhi nahi hota ki tum kisi ki life ko kitna achha bana deti ho.",
      delay: 2,
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "😊 That Smile",
      desc: "Tumhari smile ke baare mein kya bolun...\nBas itna samajh lo, kabhi kabhi bina wajah bhi smile aa jaati hai...\nsirf tum yaad aa jao toh.",
      delay: 5,
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: "🌟 Your Radiant Spirit",
      desc: "Tumhari ek photo...\nkabhi kabhi poora mood badal deti hai.",
      delay: 8,
      className: "md:col-span-1 md:row-span-1",
      image: CONFIG.photos[3]
    },
    {
      title: "💫 The Little Things",
      desc: "Mujhe tumhari sirf badi-badi baatein yaad nahi rehti...\ntumhari chhoti-chhoti aadatein bhi yaad reh jaati hain.",
      delay: 11,
      className: "md:col-span-2 md:row-span-1"
    }
  ];

  return (
    <div 
      className="flex flex-col items-center w-full max-w-5xl mx-auto py-8 cursor-pointer min-h-[80vh] px-4"
      onClick={() => setSkip(true)}
    >
      <BackgroundPhoto src={CONFIG.photos[3]} opacity={0.25} position="top" />
      <motion.h1 custom={0.5} initial="hidden" animate="visible" variants={textVariants} className="text-3xl md:text-4xl font-heading text-gradient text-center mb-12">
        A Few Things I Adore About You
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={card.delay}
            initial="hidden"
            animate="visible"
            variants={variants}
            className={`glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden ${card.className}`}
          >
            {card.image && (
              <div className="absolute inset-0 z-0 opacity-20">
                 <img src={card.image} className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
              </div>
            )}
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-heading text-pink-100 mb-4">{card.title}</h3>
              <p className="text-white/80 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div custom={14} initial="hidden" animate="visible" variants={textVariants} className="mt-16 text-center">
         <p className="text-xl md:text-2xl font-light text-white/90 italic">"Tum door ho... par yaadon mein nahi."</p>
      </motion.div>

      <motion.div custom={16.5} initial="hidden" animate="visible" variants={textVariants} className="pt-12 w-full flex justify-center pb-8">
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="px-10 py-4 rounded-full glass-panel border-white/10 hover:bg-white/20 transition-all duration-300 font-medium tracking-wide text-sm cursor-pointer hover:scale-105"
        >
          There's something I haven't told you...
        </button>
      </motion.div>
    </div>
  );
}
