/* eslint-disable react-hooks/purity */
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export default function GoodMorningRiya() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Automatic trigger for a seamless "Gift" experience
    setIsLoaded(true);

    // Subtle, loving confetti pop after the heart draws
    const timer = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ffc0cb', '#ff4d4d', '#ffffff'],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#fffcfc] flex flex-col items-center justify-center font-serif overflow-hidden select-none">
      {/* 1. BRANDING: Subtle Coded_Gifts Identity */}
      <div className="absolute top-12 flex items-center gap-4 opacity-20">
        <div className="w-8 h-[1px] bg-pink-600" />
        <span className="text-pink-600 text-[9px] tracking-[0.6em] uppercase">
          Coded_Gifts
        </span>
        <div className="w-8 h-[1px] bg-pink-600" />
      </div>

      {/* 2. AMBIENT BACKGROUND: Soft floating love elements */}
      <AmbientLoveParticles />

      {/* 3. MINI CARD CONTAINER: Aspect ratio box for Riya */}
      <div className="relative z-10 w-[85%] max-w-md aspect-[4/5] flex flex-col items-center justify-center p-10 rounded-[3.5rem] bg-white/70 backdrop-blur-md border border-pink-50 shadow-[0_30px_60px_rgba(255,192,203,0.15)]">
        {/* 4. MAIN VISUAL: DOTTED HEART (Staggered Draw) */}
        <div className="flex-1 w-full flex items-center justify-center relative">
          <DottedHeartVisual isVisible={isLoaded} />
        </div>

        {/* 5. MESSAGING REVEAL: Layered loving messages */}
        <div className="w-full text-center space-y-5 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
          >
            <p className="text-pink-400 text-[10px] tracking-[0.5em] uppercase mb-3 font-mono opacity-80">
              Morning Ritual
            </p>
            <h1 className="text-stone-800 text-5xl md:text-6xl font-light italic tracking-tighter">
              Good Morning Riya
            </h1>
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={isLoaded ? { opacity: 0.7, filter: 'blur(0px)' } : {}}
              transition={{ delay: 3, duration: 1.5 }}
              className="text-stone-500 text-sm italic font-light max-w-[240px] mx-auto leading-relaxed"
            >
              "May your day be as bright and beautiful as your smile."
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 0.4 } : {}}
              transition={{ delay: 4.5, duration: 1.2 }}
              className="text-pink-900 text-[8px] tracking-[0.3em] uppercase font-mono italic"
            >
              Sending you a digital wish to start your day.
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ delay: 3.5, duration: 2, ease: 'easeInOut' }}
            className="w-16 h-[1px] bg-pink-100 mx-auto mt-8"
          />
        </div>
      </div>
    </div>
  );
}

// 4. VISUAL COMPONENT: DottedHeartVisual (Mathematical Heart)
function DottedHeartVisual({ isVisible }: { isVisible: boolean }) {
  const points = useMemo(() => {
    const pts = [];
    const count = 380;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Parametric Heart Equation for perfect symmetry
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      // Scale and position
      pts.push({ x: x * 4.2, y: y * 4.2, i });
    }
    return pts;
  }, []);

  return (
    <svg
      viewBox="-100 -100 200 200"
      className="w-[90%] h-full drop-shadow-[0_0_15px_rgba(255,192,203,0.3)]"
    >
      {points.map((p) => (
        <motion.circle
          key={p.i}
          cx={p.x}
          cy={-p.y} // Inverting Y for SVG coordinates
          r={Math.random() * 0.9 + 0.5}
          fill={
            p.i % 3 === 0 ? '#f472b6' : p.i % 2 === 0 ? '#fbcfe8' : '#fdf2f8'
          }
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 2.2,
            delay: p.i * 0.006, // Staggered draw effect
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </svg>
  );
}

// 2. BACKGROUND COMPONENT: AmbientLoveParticles
function AmbientLoveParticles() {
  const particles = useMemo(() => Array.from({ length: 25 }), []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-pink-100/40 rounded-full"
          style={{
            width: Math.random() * 5 + 3,
            height: Math.random() * 5 + 3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
