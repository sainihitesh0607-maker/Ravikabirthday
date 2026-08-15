import { motion } from "motion/react";

interface AuroraProps {
  reduced?: boolean;
  brighten?: boolean;
}

export function AuroraBackground({ reduced = false, brighten = false }: AuroraProps) {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0c0a09]">
      <motion.div
        animate={{
          opacity: brighten ? 0.9 : reduced ? 0.3 : 0.6,
          scale: brighten ? 1.05 : 1,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <motion.div 
          animate={{
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-10%", "5%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full blur-[100px] opacity-50 mix-blend-screen"
          style={{ background: "radial-gradient(circle, hsla(333,70%,55%,0.8) 0%, transparent 70%)" }}
        />
        <motion.div 
          animate={{
            x: ["0%", "-15%", "10%", "0%"],
            y: ["0%", "15%", "-5%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[0%] w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[120px] opacity-40 mix-blend-screen"
          style={{ background: "radial-gradient(circle, hsla(282,82%,54%,0.7) 0%, transparent 70%)" }}
        />
        <motion.div 
          animate={{
            x: ["0%", "10%", "-10%", "0%"],
            y: ["0%", "5%", "15%", "0%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[10%] w-[130vw] h-[130vw] md:w-[80vw] md:h-[80vw] rounded-full blur-[100px] opacity-40 mix-blend-screen"
          style={{ background: "radial-gradient(circle, hsla(210,89%,60%,0.6) 0%, transparent 70%)" }}
        />
        <motion.div 
          animate={{
            x: ["0%", "-5%", "15%", "0%"],
            y: ["0%", "-15%", "5%", "0%"],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -right-[10%] w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[90px] opacity-40 mix-blend-screen"
          style={{ background: "radial-gradient(circle, hsla(35,90%,60%,0.5) 0%, transparent 70%)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0c0a09]/40 backdrop-blur-[4px]" />
    </div>
  );
}
