/* eslint-disable react-hooks/set-state-in-effect */
// Inside BrandLayout.tsx

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Share2 } from 'lucide-react';
import { encodeName } from '../../utils/encoding';

const FloatingWhatsApp = ({ name }: { name: string }) => {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = name ? `?u=${encodeName(name)}` : '';
    const finalUrl = baseUrl + params;

    const text = encodeURIComponent(
      `I made a digital ritual for you. Open this: \n`
    );
    setShareUrl(`https://wa.me/?text=${text}${encodeURIComponent(finalUrl)}`);
  }, [name]);

  return (
    <motion.a
      href={shareUrl}
      target="_blank"
      className="fixed bottom-8 right-8 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl"
      whileHover={{ scale: 1.1 }}
    >
      <Share2 />
    </motion.a>
  );
};

export default FloatingWhatsApp;
