import { motion } from 'motion/react';
import { useState } from 'react';
import { CONFIG } from '../../config';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter7({ onNext }: { onNext: () => void }) {
  const [celebrating, setCelebrating] = useState(false);
  const [skip, setSkip] = useState(false);

  const handleCelebrate = (e: any) => {
    e.stopPropagation();
    setCelebrating(true);
    onNext();
  };

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
      className="flex flex-col items-center w-full max-w-2xl mx-auto py-10 px-4 text-center cursor-pointer min-h-[80vh]"
      onClick={() => setSkip(true)}
    >
      <BackgroundPhoto src={CONFIG.photos[12]} opacity={0.35} />

      <motion.div custom={0.5} initial="hidden" animate="visible" variants={variants} className="text-4xl mb-6">
        🎂
      </motion.div>
      <motion.h1 custom={2} initial="hidden" animate="visible" variants={variants} className="text-3xl md:text-5xl font-heading text-gradient mb-12">
        My Wish For You
      </motion.h1>

      <div className="space-y-10 w-full">
        <motion.p custom={4.5} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Meri wish simple si hai...<br/>Tum hamesha khush raho.
        </motion.p>

        <motion.p custom={8} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Itni khush...<br/>ki kabhi tumhe apni smile ka reason dhoondhna na pade.
        </motion.p>
        
        <motion.div custom={11.5} initial="hidden" animate="visible" variants={variants} className="py-4 space-y-5 text-white/80 text-lg">
          <p>Tumhare saare dreams poore hon.</p>
          <p>Tum jahan jaana chahti ho, wahan tak pahucho.</p>
        </motion.div>

        <motion.p custom={15.5} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Aur life chahe jitni bhi badal jaye...<br/>tumhari ye beautiful si smile kabhi mat badalna.
        </motion.p>

        <motion.p custom={19.5} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/80 leading-relaxed pt-6">
          Aur agar meri koi selfish si wish ho...<br/>Toh bas itni...
        </motion.p>

        <motion.p custom={23.5} initial="hidden" animate="visible" variants={variants} className="text-2xl md:text-3xl font-heading text-pink-200 leading-relaxed italic pt-4 pb-12">
          Ki aane wale waqt mein...<br/>hamare paas yaad karne ke liye<br/>aur bhi bahut saare moments hon.
        </motion.p>
      </div>

      <motion.div 
        custom={27} 
        initial="hidden" 
        animate={celebrating ? { opacity: 0 } : "visible"} 
        variants={variants}
      >
        <button 
          onClick={handleCelebrate} 
          disabled={celebrating}
          className="px-12 py-5 rounded-full glass-panel border-white/20 bg-pink-500/20 hover:bg-pink-500/40 hover:scale-105 transition-all font-medium tracking-widest text-sm text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
        >
          Celebrate ❤️
        </button>
      </motion.div>
    </div>
  );
}
