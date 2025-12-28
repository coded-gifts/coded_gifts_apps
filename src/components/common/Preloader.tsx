import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const loadingLines = [
  '> Initializing...',
  '> Loading assets...',
  '> Ready to reveal.',
];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < loadingLines.length) {
      const timeout = setTimeout(() => setIndex(index + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 800);
      return () => clearTimeout(finalTimeout);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md font-mono">
        <div className="space-y-2">
          {loadingLines.slice(0, index + 1).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                i === loadingLines.length - 1
                  ? 'text-brand-glow'
                  : 'text-gray-500'
              } text-xs sm:text-sm tracking-tight`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-8 h-[2px] w-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-full bg-brand-accent shadow-[0_0_10px_#7c3aed]"
          />
        </div>
      </div>
    </motion.div>
  );
};
