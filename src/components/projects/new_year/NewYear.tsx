import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const Newyear = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Custom "heavy" easing curve for a bespoke feel
  const customEase = [0.16, 1, 0.3, 1];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-dark p-8">
      {/* 1. The Interactive Trigger: A simple, elegant line */}
      {!isRevealed && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={() => setIsRevealed(true)}
          className="group flex flex-col items-center gap-4 transition-all"
        >
          <div className="h-12 w-[1px] bg-white/20 group-hover:bg-brand-glow group-hover:h-16 transition-all duration-700" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
            Begin the year
          </span>
        </motion.button>
      )}

      {/* 2. The Subtle Reveal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 2.5, ease: customEase }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-sans font-extralight tracking-tighter text-white/90">
              Two Thousand <br />
              <span className="italic font-serif">Twenty Five</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="font-mono text-[10px] tracking-[0.2em] max-w-xs mx-auto"
            >
              A blank canvas coded for your journey.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The Artistic "Flaw": A random floating spark */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-1/4 right-1/3 w-1 h-1 bg-brand-glow rounded-full blur-[2px]"
      />
    </div>
  );
};

export default Newyear;
