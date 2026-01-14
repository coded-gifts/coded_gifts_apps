import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Stars, Float, Cloud } from '@react-three/drei';

const PAGES = [
  {
    id: 'haldi',
    title: 'Haldi',
    tagline: 'A Splash of Sun & Tradition',
    date: '7 Feb 2026 • 10:00 AM',
    venue: 'The Royal Court, Mumbai',
    color: '#EAB308',
    bg: '/haldi.png',
    icon: '🌼',
    pageBg: '#FFFDF0',
  },
  {
    id: 'mehndi',
    title: 'Mehndi',
    tagline: 'Tracing the Patterns of Forever',
    date: '7 Feb 2026 • 06:00 PM',
    venue: 'Green Veranda Gardens',
    color: '#166534',
    bg: '/mehndi.png',
    icon: '🌿',
    pageBg: '#F2F7F2',
  },
  {
    id: 'wedding',
    title: 'The Pheras',
    tagline: 'Seven Vows, One Soul',
    date: '8 Feb 2026 • 1:00 PM',
    venue: 'Grand Palace Mandap',
    color: '#BE185D',
    bg: '/wedding.png',
    icon: '🌸',
    pageBg: '#FFF5F7',
  },
  {
    id: 'reception',
    title: 'Reception',
    tagline: 'Toast to Today, Cheers to Always',
    date: '8 JFeb 2026 • 09:00 PM',
    venue: 'Royal Ballroom, The Oberoi',
    color: '#1E3A8A',
    bg: '/reception.png',
    icon: '✨',
    pageBg: '#0F0F1A',
  },
];

export default function WeddingBook() {
  const [index, setIndex] = useState(0);
  const [envIndex, setEnvIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Initial auto-open
  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(openTimer);
  }, []);

  // Quick-flip Loop logic
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      // 1. Flip the content index immediately
      setIndex((prev) => (prev + 1) % PAGES.length);

      // 2. Sync background environment halfway through the 0.8s flip
      setTimeout(() => {
        setEnvIndex((prev) => (prev + 1) % PAGES.length);
      }, 400);
    }, 2500);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <div
      className="relative w-full h-screen transition-colors duration-[1000ms] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: PAGES[envIndex].pageBg }}
    >
      {/* Three.js Layer: Atmosphere component is strictly inside Canvas to avoid R3F hook errors */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Atmosphere index={envIndex} />
        </Canvas>
      </div>

      <motion.div
        initial={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 0.8 }}
        animate={isOpen ? { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: 'anticipate' }}
        className="relative z-10 w-[92vw] md:w-[500px] aspect-[1/1.5] perspective-[3500px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* PHYSICAL BASE (The reveals) */}
        <div
          className="absolute inset-0 rounded-r-3xl shadow-2xl border-r-[20px] border-b-[6px] border-white/90 overflow-hidden translate-z-[-15px] transition-colors duration-700"
          style={{ backgroundColor: PAGES[index].pageBg }}
        >
          <PageContent data={PAGES[index]} />
        </div>

        {/* THE FLIPPING PAGE (Snappy 0.8s flip) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            style={{ originX: 0, transformStyle: 'preserve-3d' }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            {/* Front of flipping page (Shows previous content) */}
            <div className="absolute inset-0 backface-hidden rounded-r-3xl shadow-md border-l-[1px] border-black/5 overflow-hidden">
              <PageContent data={PAGES[index === 0 ? 3 : index - 1]} />
            </div>

            {/* Back of flipping page (Paper texture) */}
            <div className="absolute inset-0 bg-[#F2F2EC] rounded-l-3xl rotate-y-180 backface-hidden shadow-inner border-r border-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* SKEUOMORPHIC COVER */}
        {!isOpen && (
          <motion.div
            style={{ originX: 0, transformStyle: 'preserve-3d' }}
            className="absolute inset-0 z-50"
          >
            <div className="absolute inset-0 backface-hidden bg-sky-500 rounded-r-3xl shadow-2xl flex flex-col items-center justify-center p-12 border-l-[15px] border-sky-700 text-white text-center">
              <img src="/ganpati.png" width={'150'} height={'150'} />
              <h1 className="text-5xl font-serif italic mb-3">
                The Wedding Card
              </h1>
              <p className="text-[12px] tracking-[0.7em] uppercase opacity-80">
                Suraj & Parmita
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* SYNCED DOTS */}
      <div className="absolute bottom-10 flex gap-6 items-center z-50">
        {PAGES.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] transition-all duration-700 rounded-full ${i === envIndex ? 'w-16 bg-[#C29147]' : 'w-4 bg-black/10'}`}
          />
        ))}
      </div>
    </div>
  );
}

function PageContent({ data }: { data: (typeof PAGES)[0] }) {
  const isDark = data.id === 'reception';

  return (
    <div
      className={`w-full h-full flex flex-col transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}
      style={{ backgroundColor: data.pageBg }}
    >
      <div className="h-[50%] w-full relative overflow-hidden">
        <img
          src={data.bg}
          className="w-full h-full object-cover"
          alt={data.title}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-1000 ${isDark ? 'from-[#0F0F1A]' : 'from-white'}`}
        />
        <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-full text-3xl shadow-xl border border-black/5">
          {data.icon}
        </div>
      </div>
      <div className="flex-1 p-10 flex flex-col justify-between text-center">
        <div className="space-y-4">
          <p className="text-[12px] font-mono tracking-[0.6em] uppercase opacity-50">
            {data.tagline}
          </p>
          <h2
            className="text-5xl font-serif italic"
            style={{ color: data.color }}
          >
            {data.title}
          </h2>
        </div>
        <div className="space-y-6 pb-6">
          <p className="text-lg font-serif italic opacity-90">{data.date}</p>
          <p className="text-sm font-serif italic opacity-60 border-t border-black/5 pt-6">
            {data.venue}
          </p>
        </div>
      </div>
    </div>
  );
}

function Atmosphere({ index }: { index: number }) {
  const active = PAGES[index];
  return (
    <>
      <ambientLight intensity={index === 3 ? 0.3 : 1} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={active.color} />
      {index === 3 ? (
        <group>
          <Stars
            radius={100}
            depth={50}
            count={6000}
            factor={6}
            saturation={0}
            fade
            speed={1.5}
          />
          <Cloud
            opacity={0.3}
            speed={0.4}
            segments={25}
            position={[0, -3, -8]}
          />
        </group>
      ) : (
        <group>
          <Sparkles
            count={250}
            scale={12}
            size={5}
            color={active.color}
            speed={0.7}
          />
          <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            <mesh position={[-3, 2, -2]}>
              <octahedronGeometry args={[0.2]} />
              <meshStandardMaterial
                color={active.color}
                emissive={active.color}
                emissiveIntensity={2}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        </group>
      )}
    </>
  );
}
