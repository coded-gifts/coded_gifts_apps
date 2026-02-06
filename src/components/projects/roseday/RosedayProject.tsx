import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

// Petal messages - customize these!
const petalMessages = [
  'Wishing you a day as wonderful as you are.',
  'Happy rose day',
  'Always appreciated.',
  'Simply for you.',
  'For your kindness.',
  'Keep blooming.',
  'A small token of care',
];

// Floating Particles Component
function FloatingParticles() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 8,
    x: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: '-10px',
            background: `radial-gradient(circle, rgba(220, 20, 60, 0.8), rgba(139, 0, 0, 0.3))`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(particle.id) * 40],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Floating Rose Petals in Background
function BackgroundRosePetals() {
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 20,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-20"
          style={{
            width: petal.size,
            height: petal.size * 1.5,
            left: `${petal.x}%`,
            top: '-100px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotate: [petal.rotation, petal.rotation + 360],
            x: [0, Math.sin(petal.id) * 60],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 100 150" className="w-full h-full">
            <ellipse cx="50" cy="75" rx="35" ry="60" fill="url(#bgPetalGrad)" />
            <defs>
              <radialGradient id="bgPetalGrad">
                <stop offset="0%" stopColor="#DC143C" />
                <stop offset="100%" stopColor="#8B0000" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Heart shapes floating in background
function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 25 + 15,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 6,
    x: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-500 opacity-10"
          style={{
            fontSize: heart.size,
            left: `${heart.x}%`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(heart.id) * 50],
            opacity: [0, 0.15, 0.1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

// Ultra Realistic SVG Rose Component
function SVGRose({ onPetalClick }: { onPetalClick: (index: number) => void }) {
  const [hoveredPetal, setHoveredPetal] = useState<number | null>(null);

  // Helper to create realistic petal path
  const createPetalPath = (
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number
  ) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const cp1x = x + cos * width * 0.3 - sin * height * 0.8;
    const cp1y = y + sin * width * 0.3 + cos * height * 0.8;
    const cp2x = x - cos * width * 0.3 - sin * height * 0.8;
    const cp2y = y - sin * width * 0.3 + cos * height * 0.8;
    const tipx = x - sin * height;
    const tipy = y + cos * height;

    return `M ${x} ${y} Q ${cp1x} ${cp1y} ${tipx} ${tipy} Q ${cp2x} ${cp2y} ${x} ${y}`;
  };

  return (
    <motion.svg
      viewBox="0 0 500 600"
      className="w-full max-w-lg mx-auto drop-shadow-2xl"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        {/* Enhanced gradients for clickable petals */}
        <radialGradient id="clickablePetalGradient" cx="30%" cy="25%">
          <stop offset="0%" stopColor="#ff2a52" />
          <stop offset="40%" stopColor="#ff0a3a" />
          <stop offset="100%" stopColor="#c41e3a" />
        </radialGradient>
        <radialGradient id="petalGradient2" cx="35%" cy="25%">
          <stop offset="0%" stopColor="#ff1a47" />
          <stop offset="60%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#6b0000" />
        </radialGradient>
        <radialGradient id="petalGradient3" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#c41e3a" />
          <stop offset="70%" stopColor="#8B0000" />
          <stop offset="100%" stopColor="#4a0000" />
        </radialGradient>
        <radialGradient id="stemGradient">
          <stop offset="0%" stopColor="#3d7024" />
          <stop offset="100%" stopColor="#1a3010" />
        </radialGradient>
        <radialGradient id="leafGradient">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>
      </defs>

      {/* Stem with realistic curve */}
      <motion.path
        d="M 250 420 Q 245 480 248 520 Q 250 550 252 580"
        stroke="url(#stemGradient)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
      />

      {/* Thorns */}
      <motion.path
        d="M 245 460 L 238 458"
        stroke="#1a3010"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      />
      <motion.path
        d="M 252 490 L 259 488"
        stroke="#1a3010"
        strokeWidth="3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      />

      {/* Leaves with veins */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <ellipse
          cx="220"
          cy="480"
          rx="35"
          ry="20"
          fill="url(#leafGradient)"
          transform="rotate(-40 220 480)"
          filter="drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"
        />
        <path
          d="M 220 475 Q 210 480 200 485"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
          transform="rotate(-40 220 480)"
        />
      </motion.g>

      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <ellipse
          cx="278"
          cy="510"
          rx="32"
          ry="18"
          fill="url(#leafGradient)"
          transform="rotate(35 278 510)"
          filter="drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"
        />
        <path
          d="M 278 505 Q 285 510 290 514"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="none"
          transform="rotate(35 278 510)"
        />
      </motion.g>

      {/* CLICKABLE Outer Petals Layer - 8 petals (BOLD and PROMINENT) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = i * 45 - 90;
        const radius = 130;
        const x = 250 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 250 + Math.sin((angle * Math.PI) / 180) * radius;
        const petalAngle = angle + (i % 2 === 0 ? 10 : -10);

        return (
          <motion.path
            key={`outer-${i}`}
            d={createPetalPath(x, y, 55, 90, petalAngle)}
            fill="url(#clickablePetalGradient)"
            stroke="#ff0a3a"
            strokeWidth={hoveredPetal === i ? '3' : '2'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredPetal(i)}
            onMouseLeave={() => setHoveredPetal(null)}
            onClick={() => onPetalClick(i)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2 + i * 0.05,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ scale: 1.12 }}
            style={{
              filter:
                hoveredPetal === i
                  ? 'drop-shadow(0 0 20px rgba(255,20,60,1)) brightness(1.3)'
                  : 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 8px rgba(255,20,60,0.4))',
            }}
          />
        );
      })}

      {/* Second Petal Layer - 6 petals (non-clickable) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = i * 60 - 60;
        const radius = 75;
        const x = 250 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 250 + Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.path
            key={`second-${i}`}
            d={createPetalPath(x, y, 38, 65, angle)}
            fill="url(#petalGradient2)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.04 }}
            style={{ filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.3))' }}
          />
        );
      })}

      {/* Inner Petals - tightly curled (non-clickable) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = i * 72 - 90;
        const radius = 25;
        const x = 250 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 250 + Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.ellipse
            key={`inner-${i}`}
            cx={x}
            cy={y}
            rx="16"
            ry="26"
            fill="url(#petalGradient3)"
            transform={`rotate(${angle} ${x} ${y})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.03 }}
            style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.4))' }}
          />
        );
      })}

      {/* Center Bud */}
      <motion.circle
        cx="250"
        cy="250"
        r="15"
        fill="#3d0000"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' }}
      />

      {/* Highlights for realism */}
      <motion.ellipse
        cx="235"
        cy="240"
        rx="6"
        ry="10"
        fill="rgba(255,255,255,0.5)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4 }}
      />
      <motion.ellipse
        cx="260"
        cy="245"
        rx="4"
        ry="7"
        fill="rgba(255,255,255,0.4)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      />
    </motion.svg>
  );
}

// Main App Component
export default function RoseDayGift() {
  const [selectedPetal, setSelectedPetal] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handlePetalClick = (index: number) => {
    setSelectedPetal(index);

    // Enhanced confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#DC143C', '#ff1a47', '#8B0000'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff4060', '#c41e3a', '#6b0000'],
      });
    }, 250);
  };

  const closeMessage = () => {
    setSelectedPetal(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative flex items-center justify-center">
      {/* Enhanced Background with grain texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-red-950 opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* Background Elements */}
      <FloatingParticles />
      <BackgroundRosePetals />
      <FloatingHearts />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-red-600/20 opacity-60" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-red-600/20 opacity-60" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-red-600/20 opacity-60" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-red-600/20 opacity-60" />

      {/* Intro Animation with fade only */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4"
            >
              <h1
                className="text-7xl md:text-9xl font-bold text-red-600 mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow:
                    '0 0 40px rgba(220, 20, 60, 0.5), 0 0 80px rgba(220, 20, 60, 0.3)',
                  letterSpacing: '0.02em',
                }}
              >
                Happy Rose Day
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center justify-center h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-red-600 mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 50px rgba(220, 20, 60, 0.6)',
              letterSpacing: '0.01em',
            }}
          >
            Happy Rose Day
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-red-300/90"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.08em',
              fontWeight: 300,
            }}
          >
            Click on any outer petal to reveal a message 🌹
          </motion.p>
        </motion.div>

        {/* Rose */}
        <div className="flex justify-center items-center flex-1 w-full max-w-2xl">
          <SVGRose onPetalClick={handlePetalClick} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        ></motion.div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedPetal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden"
            onClick={closeMessage}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative bg-gradient-to-br from-red-950/90 to-black/90 border-2 border-red-600/50 rounded-3xl p-8 md:p-12 lg:p-16 max-w-3xl mx-4 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow:
                  '0 0 60px rgba(220, 20, 60, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-red-500/40" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-red-500/40" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-red-500/40" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-red-500/40" />

              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block mb-8"
                >
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 30px rgba(220, 20, 60, 0.6)' }}
                  >
                    <span className="text-4xl md:text-5xl">🌹</span>
                  </div>
                </motion.div>

                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-400 mb-6 md:mb-8"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '0.02em',
                  }}
                >
                  Petal #{selectedPetal + 1}
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl lg:text-4xl text-red-100 leading-relaxed mb-8 md:mb-10"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                  }}
                >
                  "{petalMessages[selectedPetal % petalMessages.length]}"
                </motion.p>

                <button
                  onClick={closeMessage}
                  className="group bg-red-600 hover:bg-red-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg relative overflow-hidden"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)',
                  }}
                >
                  <span className="relative z-10">Close</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
