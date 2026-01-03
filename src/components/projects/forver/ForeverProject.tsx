/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
import { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { decodeWeddingData } from '../../../utils/encoding';

// --- 1. AMBIENT 3D BACKGROUND (THE "DUST" SYSTEM) ---
function AmbientBackground() {
  const count = 600;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#C29147"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

// --- 2. CALCULATING PHASE (ARCHITECTURAL TYPOGRAPHY) ---
function CalculatingPhase({
  daysLeft,
  onComplete,
}: {
  daysLeft: number;
  onComplete: () => void;
}) {
  const [displayValue, setDisplayValue] = useState(daysLeft);
  const [unit, setUnit] = useState('Din');

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    const seq = [
      { val: daysLeft, label: 'Days', hindi: 'दिन' },
      { val: daysLeft * 24, label: 'Hours', hindi: 'घंटे' },
      { val: daysLeft * 1440, label: 'Minutes', hindi: 'मिनट' },
      { val: daysLeft * 86400, label: 'Seconds', hindi: 'सेकंड' },
    ];

    seq.forEach((step) => {
      tl.to(
        {},
        {
          duration: 1.6,
          onStart: () => {
            setUnit(step.label);
            gsap.to(
              { v: displayValue },
              {
                v: step.val,
                duration: 1,
                ease: 'power3.out',
                onUpdate: function () {
                  setDisplayValue(Math.floor(this.targets()[0].v));
                },
              }
            );
          },
        }
      );
    });
  }, [daysLeft, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="relative z-30 w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Large "Ghost" Unit Label */}
      <motion.div
        key={unit + 'bg'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1.1 }}
        className="absolute inset-0 flex items-center justify-center text-[25vw] font-serif italic pointer-events-none select-none"
      >
        {unit}
      </motion.div>

      <div className="relative text-center z-10 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          className="text-[10px] font-mono tracking-[0.6em] uppercase mb-4 text-[#2D2D2D]"
        >
          The Distance to forever
        </motion.p>

        {/* The Counter */}
        <div className="relative inline-block">
          <motion.h1
            key={unit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-serif font-bold italic tracking-tighter tabular-nums text-[#2D2D2D]"
          >
            {displayValue.toLocaleString()}
          </motion.h1>

          {/* Unit Badge */}
          <motion.div
            key={unit + 'label'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-4 -top-2 bg-[#C29147] text-white px-2 py-1 text-[10px] font-bold rounded-sm shadow-lg rotate-12"
          >
            {unit.toUpperCase()}
          </motion.div>
        </div>

        {/* Hindi Sub-label */}
        <div className="mt-8 flex flex-col items-center">
          {/* Animated Temporal Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 6, ease: 'linear' }}
            className="h-[2px] bg-[#C29147]/40 mt-6 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
// --- 3. 3D CONVERGENCE SCENE ---
function Scene({
  progress,
  setProgress,
}: {
  progress: number;
  setProgress: (v: number) => void;
}) {
  const count = 2800;
  const [p1, p2, heart] = useMemo(
    () => [
      generateSphere(count, 1.8),
      generateSphere(count, 1.8),
      generateHeart(count, 0.18),
    ],
    []
  );
  const ref1 = useRef<THREE.Points>(null!);
  const ref2 = useRef<THREE.Points>(null!);

  useEffect(() => {
    gsap.to(
      { val: 0 },
      {
        val: 1,
        duration: 7,
        ease: 'power2.inOut',
        delay: 1,
        onUpdate: function () {
          setProgress(this.targets()[0].val);
        },
      }
    );
  }, [setProgress]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref1.current.position.x = THREE.MathUtils.lerp(-3.5, 0, progress);
    ref2.current.position.x = THREE.MathUtils.lerp(3.5, 0, progress);
    ref1.current.rotation.y = t * 0.12;
    ref2.current.rotation.y = -t * 0.12;
    if (progress > 0.98) {
      const s = 1 + Math.sin(t * 3) * 0.05;
      ref1.current.scale.setScalar(s);
      ref2.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <Points ref={ref1} positions={progress < 0.98 ? p1 : heart} stride={3}>
        <PointMaterial
          transparent
          color="#C29147"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      <Points ref={ref2} positions={progress < 0.98 ? p2 : heart} stride={3}>
        <PointMaterial
          transparent
          color="#2D2D2D"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

// --- 4. MAIN COMPONENT ---
function ForeverProject() {
  const [phase, setPhase] = useState<
    'CALCULATING' | 'AUR_PHIR' | 'CONVERGENCE'
  >('CALCULATING');
  const [data, setData] = useState({
    n1: 'Partner 1',
    n2: 'Partner 2',
    date: new Date().toISOString(),
  });
  const [mergeProgress, setMergeProgress] = useState(0);

  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('u');
    if (u) {
      const decoded = decodeWeddingData(u);
      if (decoded) setData(decoded);
    }
  }, []);

  const daysLeft = useMemo(() => {
    const wedding = new Date(data.date);
    const diff = wedding.getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [data.date]);

  return (
    <div className="relative w-full h-screen bg-[#FAF9F6] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AmbientBackground />
        </Canvas>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#FAF9F6_90%)]" />

      <AnimatePresence mode="wait">
        {phase === 'CALCULATING' && (
          <CalculatingPhase
            key="calc"
            daysLeft={daysLeft}
            onComplete={() => setPhase('AUR_PHIR')}
          />
        )}
        {phase === 'AUR_PHIR' && (
          <motion.div
            key="aur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() =>
              setTimeout(() => setPhase('CONVERGENCE'), 1500)
            }
            className="relative z-30 w-full h-full flex items-center justify-center"
          >
            <h2 className="text-3xl font-serif italic text-[#2D2D2D]/30 tracking-[0.2em]">
              Aur phir...
            </h2>
          </motion.div>
        )}
        {phase === 'CONVERGENCE' && (
          <motion.div
            key="scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-30 w-full h-full"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-between py-32 z-40 pointer-events-none text-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif italic text-[#2D2D2D]">
                  {data.n1} & {data.n2}
                </h2>
                <p className="mt-4 text-[11px] font-serif italic tracking-[0.3em] text-[#C29147]">
                  Two lives, one shared path
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.4em] text-black/30 uppercase mb-2">
                  The Wedding Day
                </p>
                <p className="text-xl font-serif text-[#2D2D2D]">
                  {new Date(data.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
              <Scene progress={mergeProgress} setProgress={setMergeProgress} />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MATH HELPERS ---
function generateSphere(count: number, r: number) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    p[i * 3] = r * Math.cos(theta) * Math.sin(phi);
    p[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
}

function generateHeart(count: number, s: number) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    p[i * 3] = x * s;
    p[i * 3 + 1] = y * s;
    p[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }
  return p;
}

export default ForeverProject;
