import React, { useState } from 'react';
// New Import: Specifically from motion/react
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const BrandLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-brand-dark overflow-hidden font-sans text-white">
      {/* 1. Cinematic Grain Overlay */}
      {/* Using a simple div with fixed positioning for the brand aesthetic */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("/assets/noise.png")' }}
      />

      {/* 2. Main Scene Container */}
      <main className="relative z-0 w-full h-full">{children}</main>

      {/* 3. Global Brand UI Layer */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-start pointer-events-none">
        {/* Instagram / Brand Link */}
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
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-300">
            Coded_Gifts
          </span>
        </motion.a>
      </nav>

      {/* 4. Brand Watermark (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-none flex items-center gap-2">
        <span className="font-mono text-[8px] text-white/20 tracking-widest uppercase">
          Digital expressions, crafted in code.
        </span>
        <Code2 size={12} className="text-white/10" />
      </div>
    </div>
  );
};
