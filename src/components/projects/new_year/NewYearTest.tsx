import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import confetti from 'canvas-confetti';
import * as THREE from 'three';

dayjs.extend(duration);

// --- 1. THE ARTISTIC 3D BACKGROUND ---
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const points = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      points.set(
        [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        i * 3
      );
    }
    return points;
  });

  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#7c3aed"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- 2. CUSTOM TYPEWRITER COMPONENT ---
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="font-mono tracking-tight">
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-5 bg-brand-accent ml-1 align-middle"
      />
    </span>
  );
};

// --- MAIN COMPONENT ---
export default function CodedNewYear() {
  const [phase, setPhase] = useState<'COUNTDOWN' | 'CELEBRATION' | 'FOCUS'>(
    'COUNTDOWN'
  );
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    // --- TEST MODE CONFIG ---
    // Sets 'New Year' to 60 seconds from now
    // Sets 'Focus Phase' to 120 seconds from now
    const startTime = dayjs();
    const testNewYear = startTime.add(60, 'seconds');
    const testFocusStart = startTime.add(120, 'seconds');

    const update = () => {
      const now = dayjs();

      // 1. Determine Phase based on Test Timers
      if (now.isAfter(testFocusStart)) {
        setPhase('FOCUS');
      } else if (now.isAfter(testNewYear)) {
        setPhase('CELEBRATION');
      } else {
        setPhase('COUNTDOWN');
      }

      // 2. Update Countdown (counting down to our Test New Year)
      const diff = dayjs.duration(testNewYear.diff(now));

      if (diff.asSeconds() > 0) {
        setTimeLeft({
          days: '00', // Kept at 00 for the test
          hours: '00',
          minutes: diff.minutes().toString().padStart(2, '0'),
          seconds: diff.seconds().toString().padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    const timer = setInterval(update, 1000);
    update();
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const update = () => {
  //     const now = dayjs();
  //     // TEST: Change these to startTime.add(1, 'minute') to test locally
  //     const newYear = dayjs('2026-01-01T00:00:00');
  //     const focusStart = dayjs('2026-01-02T00:00:00');

  //     if (now.isAfter(focusStart)) setPhase('FOCUS');
  //     else if (now.isAfter(newYear)) setPhase('CELEBRATION');
  //     else setPhase('COUNTDOWN');

  //     const diff = dayjs.duration(newYear.diff(now));
  //     if (diff.asSeconds() > 0) {
  //       setTimeLeft({
  //         days: Math.floor(diff.asDays()).toString().padStart(2, '0'),
  //         hours: diff.hours().toString().padStart(2, '0'),
  //         minutes: diff.minutes().toString().padStart(2, '0'),
  //         seconds: diff.seconds().toString().padStart(2, '0'),
  //       });
  //     }
  //   };
  //   const timer = setInterval(update, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    if (phase === 'CELEBRATION') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#ffffff'],
      });
    }
  }, [phase]);

  return (
    <div className="relative h-screen w-full bg-[#050505] text-white overflow-hidden">
      {/* 3D Canvas - Always running in the background for depth */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <FloatingParticles />
        </Canvas>
      </div>

      <main className="relative z-10 h-full flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {phase === 'COUNTDOWN' && (
            <motion.div
              key="cd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              className="text-center"
            >
              <div className="flex gap-4 md:gap-10 font-black text-6xl md:text-9xl tracking-tighter">
                {Object.entries(timeLeft).map(([unit, val]) => (
                  <div key={unit} className="flex flex-col">
                    <span className="tabular-nums">{val}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'CELEBRATION' && (
            <motion.div
              key="cel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 max-w-3xl"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic">
                HAPPY 2026
              </h1>
              <div className="text-xl md:text-3xl font-light text-gray-400 h-20">
                <Typewriter text="Page 1 of 365: Code your own destiny in 2026." />
              </div>
              <p className="font-mono text-[10px] tracking-widest text-brand-accent uppercase opacity-50 pt-10">
                // Ritual active. DM for personalization.
              </p>
            </motion.div>
          )}

          {phase === 'FOCUS' && (
            <motion.div
              key="foc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-brand-accent font-mono text-xs border border-brand-accent/20 px-4 py-1 rounded-full inline-block mb-4">
                DAY 01 ARCHIVED
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Focus &gt; Celebration.
              </h2>
              <p className="text-white/40 font-mono text-sm max-w-md mx-auto leading-relaxed">
                The fireworks have faded. The noise has settled. Now, only the
                execution remains. Build something this year that outlasts the
                countdown.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
