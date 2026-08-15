import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { CONFIG } from '../../config';
import { cn } from '../../lib/utils';
import { BackgroundPhoto } from '../BackgroundPhoto';

export function Chapter4({ onNext }: { onNext: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [skip, setSkip] = useState(false);

  const textVariants = {
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

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (custom: any) => ({
      opacity: 1,
      scale: 1,
      x: custom.x,
      y: custom.y,
      rotate: custom.rotate,
      transition: {
        delay: skip ? 0.1 : custom.delay,
        duration: skip ? 0.5 : 1.5,
        type: "spring",
        bounce: 0.3
      }
    })
  };

  const collagePhotos = CONFIG.photos.slice(3, 8);

  const captions = [
    "Our favorite memory.",
    "Ye moment yaad hai? Mujhe toh abhi bhi yaad hai.",
    "Kaash kuch moments ko save button milta.",
    "Some memories don't need a date. They just stay.",
    "Agar waqt wapas milta... shayad main isi moment ko choose karta."
  ];

  return (
    <div
      className="flex flex-col items-center w-full max-w-5xl mx-auto py-8 px-4 min-h-[80vh] cursor-pointer"
      onClick={() => {
        if (selectedPhoto === null) setSkip(true);
      }}
    >

      {/* Chapter 4 background — TOP POSITION */}
      <BackgroundPhoto
        src={CONFIG.photos[3]}
        opacity={0.25}
        position="top"
      />

      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-3xl md:text-5xl font-heading text-gradient text-center mb-8"
      >
        Some Memories Don't Need Words.
      </motion.h1>

      <div className="text-center space-y-8 mb-12">
        <motion.p
          custom={3.5}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-lg md:text-xl font-light text-white/90"
        >
          Kuch photos sirf photos nahi hoti...<br/>
          unhe dekhte hi ek poora moment wapas aa jata hai.
        </motion.p>

        <motion.p
          custom={7}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-lg md:text-xl font-light text-white/90"
        >
          Aur tumhari kuch tasveerein... bas dekhne ke liye nahi hain.
        </motion.p>

        <motion.p
          custom={10.5}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-xl md:text-2xl font-heading text-pink-200 italic"
        >
          Unhe dekh kar lagta hai... kaash waqt thoda ruk jata.
        </motion.p>
      </div>

      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center mt-8">
        {collagePhotos.map((photo, i) => {
          const isMain = i === 0;
          const rotation = isMain ? -3 : (i % 2 === 0 ? 8 * i : -6 * i);
          const xOffset = isMain ? 0 : (i % 2 === 0 ? 45 * i : -45 * i);
          const yOffset = isMain ? 0 : (i % 3 === 0 ? -25 * i : 25 * i);

          return (
            <motion.div
              key={i}
              custom={{
                delay: 14 + i * 1.5,
                x: xOffset,
                y: yOffset,
                rotate: rotation
              }}
              initial="hidden"
              animate="visible"
              variants={photoVariants}
              className={cn(
                "absolute p-3 md:p-4 bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md cursor-pointer hover:z-30 transition-shadow",
                isMain ? "z-20 w-64 md:w-80" : "z-10 w-48 md:w-60"
              )}
              whileHover={{
                scale: 1.05,
                zIndex: 40,
                rotate: 0
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(i);
              }}
            >
              <div className="w-full aspect-[4/5] bg-stone-950 overflow-hidden relative rounded-sm flex items-center justify-center p-1 border border-stone-800">
                <img
                  src={photo}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        custom={22}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="pt-20 w-full flex justify-center pb-8 z-50"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="px-10 py-4 rounded-full glass-panel border-white/10 hover:bg-white/20 transition-all duration-300 font-medium tracking-wide text-sm cursor-pointer hover:scale-105"
        >
          Even from far away...
        </button>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={collagePhotos[selectedPhoto]}
                alt="Selected memory"
                className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
              />

              <p className="text-white/90 font-heading text-xl mt-6 text-center">
                {captions[selectedPhoto]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
