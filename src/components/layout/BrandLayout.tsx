import { motion, AnimatePresence } from 'motion/react';
import { Check, Link2, Zap } from 'lucide-react';
import { useState } from 'react';
import { encodeName } from '../../utils/encoding';

export const BrandLayout = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isEncoding, setIsEncoding] = useState(false);

  const handleCopy = () => {
    setIsEncoding(true);

    // Simulate an "Encoding Protocol" for the artist vibe
    setTimeout(() => {
      const baseUrl = window.location.origin + window.location.pathname;
      const finalUrl = name ? `${baseUrl}?u=${encodeName(name)}` : baseUrl;

      navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setIsEncoding(false);

      setTimeout(() => setCopied(false), 2000);
    }, 800);
  };

  return (
    <div className="relative min-h-screen">
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

        {/* */}
      </nav>

      {/* 3. Main Content */}
      <div>{children}</div>

      {/* RECIPIENT BUILDER INTERFACE */}
      <div className="fixed bottom-20 w-full flex flex-col items-center z-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-1 rounded-2xl flex items-center gap-2 w-full max-w-sm border border-white/10 shadow-2xl"
        >
          <div className="flex-1 flex items-center px-4 gap-3">
            <span className="font-mono text-[8px] text-brand-accent uppercase tracking-widest opacity-50">
              To:
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name to personalize..."
              className="bg-transparent border-none outline-none text-[13px] font-sans w-full text-white placeholder:text-white/10 py-3"
            />
          </div>

          <button
            onClick={handleCopy}
            disabled={isEncoding}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white p-3 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              {isEncoding ? (
                <motion.div
                  key="encoding"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Zap size={18} />
                </motion.div>
              ) : copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="link"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-1"
                >
                  <Link2 size={18} />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                    Get Link
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        <AnimatePresence>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-brand-accent font-mono text-[7px] mt-4 uppercase tracking-[0.4em]"
            >
              Protocol Encrypted // Link Copied to Clipboard
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 4. The Brand Signature */}
      <footer className="fixed bottom-10 left-0 w-full z-40 pointer-events-none flex flex-col items-center">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-30">
          Digital expressions, crafted in code
        </p>
      </footer>
    </div>
  );
};
