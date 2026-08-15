import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../../config';

export function Finale() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [skip, setSkip] = useState(false);
  
  const finalPhoto = CONFIG.photos[14] || CONFIG.photos[0];
  const collagePhotos = CONFIG.photos.slice(10, 14); 

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: skip ? 0.1 : d, duration: skip ? 0.5 : 1.5, ease: "easeOut" }
    })
  };

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    confetti({ particleCount: 100, spread: 70, origin: { y: 1, x: 0 }, colors: ['#ff1493', '#ff69b4', '#ffffff', '#ffd700'] });
    confetti({ particleCount: 100, spread: 70, origin: { y: 1, x: 1 }, colors: ['#ff1493', '#ff69b4', '#ffffff', '#ffd700'] });

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff1493', '#ffffff']
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ffd700']
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (skip) {
      setShowSurprise(true);
    } else {
      const surpriseTimer = setTimeout(() => {
        setShowSurprise(true);
      }, 34000);
      return () => clearTimeout(surpriseTimer);
    }
  }, [skip]);

  return (
    <div 
      className="flex flex-col items-center w-full max-w-4xl mx-auto py-10 px-4 text-center min-h-[90vh] cursor-pointer"
      onClick={() => setSkip(true)}
    >
      <motion.h1 custom={2} initial="hidden" animate="visible" variants={variants} className="text-4xl md:text-6xl font-heading text-gradient mb-16 leading-tight z-20">
        Happy Birthday, {CONFIG.name} ❤️
      </motion.h1>

      <div className="space-y-12 z-20 w-full max-w-2xl">
        <motion.div custom={6} initial="hidden" animate="visible" variants={variants}>
          <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed mb-4">
            Pata nahi future mein kya likha hai...<br />
            pata nahi waqt humein kahan le jayega...<br/>
            par ek baat ke liye main hamesha grateful rahunga...
          </p>
        </motion.div>

        <motion.p custom={10} initial="hidden" animate="visible" variants={variants} className="text-xl md:text-3xl font-heading text-pink-200 leading-relaxed">
          Ki meri life mein tum aayi.
        </motion.p>

        <motion.p custom={14} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Chahe kitni bhi doori ho...<br />
          tum mere liye kabhi ordinary nahi ho sakti.
        </motion.p>
        
        <motion.p custom={18} initial="hidden" animate="visible" variants={variants} className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
          Aur agar kabhi tumhe lage ki tumhe koi yaad nahi kar raha...<br/>
          toh bas itna yaad rakhna...
        </motion.p>
        
        <motion.h2 custom={22.5} initial="hidden" animate="visible" variants={variants} className="text-3xl md:text-4xl font-heading text-pink-100">
          Kahin na kahin...<br/>main tumhe yaad kar raha honga. ❤️
        </motion.h2>

        <motion.p custom={26} initial="hidden" animate="visible" variants={variants} className="text-xl md:text-2xl font-light text-white/90 italic pt-6">
          Happy Birthday, beautiful.
        </motion.p>
      </div>

      {/* Collage Area */}
      <div className="mt-24 w-full min-h-[60vh] relative flex flex-col items-center justify-center">
        {/* Background Collage Layers */}
        {collagePhotos.map((photo, i) => (
          <motion.div
            key={i}
            custom={29 + i * 0.5}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="absolute z-0 opacity-40 blur-[1px] hidden md:block"
            style={{
              top: `${10 + (i * 15)}%`,
              left: i % 2 === 0 ? `${10 + i * 5}%` : undefined,
              right: i % 2 !== 0 ? `${10 + i * 5}%` : undefined,
              transform: `rotate(${i % 2 === 0 ? 12 : -12}deg) scale(${0.7 + i * 0.1})`,
            }}
          >
            <div className="w-48 h-64 bg-stone-900 rounded-lg overflow-hidden border border-white/10 p-1">
              <img src={photo} className="w-full h-full object-cover rounded-sm" />
            </div>
          </motion.div>
        ))}

        {/* Main Final Photo */}
        <motion.div 
          custom={32} 
          initial="hidden" 
          animate="visible" 
          variants={variants}
          className="relative z-20 w-full max-w-md"
        >
          <div className="w-full aspect-[4/5] p-3 md:p-4 bg-white/10 backdrop-blur-md glass-panel rounded-sm shadow-2xl mb-8">
            <div className="w-full h-full bg-stone-950 overflow-hidden relative flex items-center justify-center border border-stone-800">
              <motion.img 
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ delay: skip ? 0.1 : 32, duration: 15, ease: "linear" }}
                src={finalPhoto} 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/70 font-light tracking-wide mb-6">
              This little world was made for you.
            </p>
            <h3 className="text-2xl font-heading text-white/90 mb-2">
              Happy Birthday, {CONFIG.name}.
            </h3>
            <p className="text-white/50 tracking-[0.3em] text-sm font-light mb-8">
              {CONFIG.birthday} ❤️
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hidden Surprise */}
      <div className="mt-16 w-full flex flex-col items-center pb-24 z-30">
        <AnimatePresence>
          {showSurprise && !surpriseRevealed && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="cursor-pointer py-4 px-8 rounded-full hover:bg-white/5 transition-colors"
              onClick={(e) => { e.stopPropagation(); setSurpriseRevealed(true); }}
            >
              <p className="text-white/40 text-sm tracking-wide">
                P.S. ...there's one more thing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {surpriseRevealed && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }} 
              animate={{ opacity: 1, height: "auto", y: 0 }} 
              transition={{ duration: 1.5 }}
              className="mt-8 space-y-8 max-w-lg mx-auto text-center"
            >
              <p className="text-lg font-light text-white/80 leading-relaxed">
                Tumhe shayad ye website ek din yaad na rahe...<br />
                shayad iske words bhi nahi...<br />
                par meri ek wish hai...
              </p>
              <p className="text-xl font-light text-white/90 leading-relaxed italic">
                Jab bhi 16 August aaye,<br/>
                tumhe ek baar zaroor yaad aaye<br/>
                ki kisi ne tumhare liye<br/>
                poori ek chhoti si duniya banayi thi.
              </p>
              <p className="text-2xl font-heading text-pink-200 mt-6">
                That someone was me. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
