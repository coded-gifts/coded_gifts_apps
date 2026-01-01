import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const Typewriter = ({
  text,
  delay = 60,
  className = '',
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
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
  }, [currentIndex, text, delay]);

  return (
    <span className={`${className} inline-block`}>
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-6 bg-brand-accent ml-1 align-middle rounded-sm" // Larger, softer cursor
      />
    </span>
  );
};

export default Typewriter;
