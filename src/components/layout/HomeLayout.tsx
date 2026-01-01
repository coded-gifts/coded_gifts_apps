import { motion } from 'motion/react';

function HomeLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Your Brand Logo / Mark */}
        {/* <div className="w-16 h-16 bg-brand-accent rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
          <span className="text-white font-black text-2xl tracking-tighter">
            CG
          </span>
        </div> */}

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
          <h1 className="font-mono text-[10px] tracking-[0.3em] uppercase ">
            Coded_Gifts
          </h1>
        </motion.a>

        <p className="text-white/40 font-serif italic text-lg max-w-sm mx-auto leading-relaxed">
          Digital expressions. crafted in code.
        </p>
      </motion.div>
    </div>
  );
}

export default HomeLayout;
