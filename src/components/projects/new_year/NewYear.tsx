/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
import { useState, useEffect, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei'; // No Float needed, direct particles
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { useTheme } from '../../../hooks/useThemeContext';
import Typewriter from '../../common/Typewriter';
import { Focus, Timer } from 'lucide-react';
import { decodeName } from '../../../utils/encoding';

// --- Day.js Plugins ---
dayjs.extend(duration);

// --- 1. THE ARTISTIC 3D BACKGROUND (React Three Fiber) ---
function FloatingParticles({
  color1,
  color2,
}: {
  color1: string;
  color2: string;
}) {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const points = new Float32Array(5000 * 3); // More particles for denser feel
    for (let i = 0; i < 5000; i++) {
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

  useFrame((state, delta) => {
    // Subtle rotation and movement
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.03;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Gentle sway
  });

  const randomVal = useMemo(() => Math.random(), []); // stable random per mount

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={randomVal > 0.5 ? color1 : color2} // Mix colors randomly
          size={0.03} // Slightly larger, more visible particles
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- 2. CUSTOM TYPEWRITER COMPONENT ---

// --- MAIN PROJECT COMPONENT ---
function NewYearProject() {
  const [targetName, setTargetName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('u');
    if (encoded) {
      const decoded = decodeName(encoded);
      if (decoded) setTargetName(decoded);
    }
  }, []);

  const { theme } = useTheme();
  const [phase, setPhase] = useState<'COUNTDOWN' | 'CELEBRATION' | 'FOCUS'>(
    'COUNTDOWN'
  );
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // --- Theme-dependent colors for particles ---
  const particleColors = useMemo(
    () => ({
      color1: theme === 'dark' ? '#7c3aed' : '#f0f4f8', // Violet for dark, light blue-gray for light
      color2: theme === 'dark' ? '#a78bfa' : '#c3dae8', // Lighter violet for dark, another light blue-gray for light
      accent: theme === 'dark' ? '#ff9900' : '#d97706', // Gold/Orange for celebration
    }),
    [theme]
  );

  // --- Logic for Phase & Countdown ---

  // useEffect(() => {
  //   // --- TEST MODE CONFIG ---
  //   // Sets 'New Year' to 60 seconds from now
  //   // Sets 'Focus Phase' to 120 seconds from now
  //   const startTime = dayjs();
  //   const testNewYear = startTime.add(60, 'seconds');
  //   const testFocusStart = startTime.add(120, 'seconds');

  //   const update = () => {
  //     const now = dayjs();

  //     // 1. Determine Phase based on Test Timers
  //     if (now.isAfter(testFocusStart)) {
  //       setPhase('FOCUS');
  //     } else if (now.isAfter(testNewYear)) {
  //       setPhase('CELEBRATION');
  //     } else {
  //       setPhase('COUNTDOWN');
  //     }

  //     // 2. Update Countdown (counting down to our Test New Year)
  //     const diff = dayjs.duration(testNewYear.diff(now));

  //     if (diff.asSeconds() > 0) {
  //       setTimeLeft({
  //         days: '00', // Kept at 00 for the test
  //         hours: '00',
  //         minutes: diff.minutes().toString().padStart(2, '0'),
  //         seconds: diff.seconds().toString().padStart(2, '0'),
  //       });
  //     } else {
  //       setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  //     }
  //   };

  //   const timer = setInterval(update, 1000);
  //   update();
  //   return () => clearInterval(timer);
  // }, []);

  //PROD
  useEffect(() => {
    const update = () => {
      const now = dayjs();
      // !!! FOR TESTING ONLY: UNCOMMENT AND ADJUST TO TEST PHASES RAPIDLY !!!
      // const startTime = dayjs();
      // const targetNewYear = startTime.add(1, 'minute'); // New Year in 1 min
      // const targetFocusStart = startTime.add(2, 'minute'); // Focus in 2 min

      // Production Dates:
      const targetNewYear = dayjs('2026-01-01T00:00:00');
      const targetFocusStart = dayjs('2026-01-02T00:00:00');

      // Determine Phase
      if (now.isAfter(targetFocusStart)) setPhase('FOCUS');
      else if (now.isAfter(targetNewYear)) setPhase('CELEBRATION');
      else setPhase('COUNTDOWN');

      // Update Countdown (only if still in countdown phase)
      if (now.isBefore(targetNewYear)) {
        const diff = dayjs.duration(targetNewYear.diff(now));
        setTimeLeft({
          days: Math.floor(diff.asDays()).toString().padStart(2, '0'),
          hours: diff.hours().toString().padStart(2, '0'),
          minutes: diff.minutes().toString().padStart(2, '0'),
          seconds: diff.seconds().toString().padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    const timer = setInterval(update, 1000);
    update(); // Initial call
    return () => clearInterval(timer);
  }, []);

  // --- Confetti & Balloons Effect ---
  useEffect(() => {
    if (phase === 'CELEBRATION') {
      const fireConfetti = (
        angle: number,
        originX: number,
        colors: string[]
      ) => {
        confetti({
          particleCount: 50,
          angle,
          spread: 70,
          origin: { x: originX, y: 0.6 },
          colors: colors,
        });
      };

      const firecrackers = setInterval(() => {
        fireConfetti(60, 0, [
          '#ff4500',
          '#ffa500',
          '#ffd700',
          particleColors.color1,
        ]); // Warm fiery colors
        fireConfetti(120, 1, [
          '#8a2be2',
          '#4b0082',
          '#9400d3',
          particleColors.color2,
        ]); // Cool purple colors
      }, 500); // More frequent bursts

      const balloons = setInterval(() => {
        confetti({
          particleCount: 10,
          angle: 90,
          spread: 80,
          startVelocity: 40,
          decay: 0.9,
          gravity: 0.5,
          scalar: 1.2, // Larger confetti for balloons
          shapes: ['circle', 'square'], // Simple shapes for balloons
          colors: [
            '#ff69b4',
            '#00bfff',
            '#ffea00',
            '#adff2f',
            particleColors.accent,
          ], // Bright, varied balloon colors
        });
      }, 1000); // Slower for balloons

      return () => {
        clearInterval(firecrackers);
        clearInterval(balloons);
      };
    }
  }, [phase, particleColors]);

  return (
    <div>
      {/* 3D Canvas - Always running in the background for depth */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <FloatingParticles
            color1={particleColors.color1}
            color2={particleColors.color2}
          />
        </Canvas>
      </div>

      {/* Global Brand Header & Theme Toggle */}

      <main className="relative z-10 h-dvh flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* PHASE 1: COUNTDOWN */}
          {phase === 'COUNTDOWN' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.1,
                filter: 'blur(20px)',
                transition: { duration: 1.5 },
              }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-8 gap-2 text-[#7c3aed]">
                <Timer size={14} className="animate-pulse" />
                {}
                <span className="font-mono font-semibold text-[14px] tracking-[0.5em] uppercase">
                  {targetName && targetName !== ''
                    ? `Loading 2026 digital keepsake for ${targetName}...`
                    : 'Loading 2026 '}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-10 font-bold text-6xl md:text-9xl tracking-tighter">
                {Object.entries(timeLeft).map(([unit, val]) => (
                  <div key={unit} className="flex flex-col">
                    <span className="tabular-nums">{val}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-50 mt-2">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PHASE 2: CELEBRATION */}
          {phase === 'CELEBRATION' && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 max-w-3xl"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-white">
                Happy New Year, <br />
                <span className="text-brand-accent">
                  {targetName || '2026'}
                </span>
              </h1>
              <p className="text-xl md:text-3xl font-serif text-gray-300 leading-relaxed max-w-2xl mx-auto">
                <Typewriter
                  text="Turning the page to a fresh start, filled with new energy and bigger goals. May your 2026 be a year of less worrying and more winning."
                  className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400"
                />
              </p>
            </motion.div>
          )}

          {/* PHASE 3: FOCUS */}
          {phase === 'FOCUS' && (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center max-w-lg"
            >
              <Focus size={32} className="mb-8 opacity-20" />
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                The celebration is over. <br />
                <span className="font-bold text-[#a78bfa]">
                  The work begins.
                </span>
              </h2>
              <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
                <p className="font-mono text-xs text-primary/40 leading-loose lowercase text-left">
                  {`// Ritual Update`} <br />
                  {`// Phase: Execute`} <br />
                  {`// 2026 Status: 0.3% Complete`} <br /> <br />
                  Be obsessed with your focus. Discipline is the only gift you
                  owe yourself this year.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default NewYearProject;
