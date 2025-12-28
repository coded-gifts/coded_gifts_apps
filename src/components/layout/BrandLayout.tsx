import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useThemeContext';

export const BrandLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* 1. Artist Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* 2. Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center pointer-events-none">
        <motion.a
          href="https://instagram.com/coded_gifts"
          target="_blank"
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // New standard: use arrays for custom cubics
          }}
          className="pointer-events-auto glass-panel flex items-center gap-3 px-4 py-2 rounded-full group"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-accent/30 blur-lg"
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase ">
            Coded_Gifts
          </span>
        </motion.a>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={toggleTheme}
            className="glass-panel p-3 rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 10, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -10, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* 3. Main Content */}
      <main className="relative z-0">{children}</main>

      {/* 4. The Brand Signature */}
      <footer className="fixed bottom-10 left-0 w-full z-40 pointer-events-none flex flex-col items-center">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-30">
          Digital expressions, crafted in code
        </p>
      </footer>
    </div>
  );
};
