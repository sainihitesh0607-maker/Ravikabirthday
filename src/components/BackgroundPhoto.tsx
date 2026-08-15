import { motion } from 'motion/react';

export function BackgroundPhoto({ src, opacity = 0.35, position = "center" }: { src: string, opacity?: number, position?: "center" | "top" }) {
  if (!src) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 4, ease: "easeInOut" }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      <img 
        src={src} 
        className="w-full h-full object-cover" 
        style={{ objectPosition: position === 'top' ? 'center top' : 'center center' }}
        alt="" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/80 to-[#0c0a09]/50" />
      <div className="absolute inset-0 bg-[#0c0a09]/30 backdrop-blur-[4px]" />
    </motion.div>
  );
}
