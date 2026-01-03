import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { encodeWeddingData } from '../../utils/encoding';

export function BrandLayout({ children }: { children: React.ReactNode }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ n1: '', n2: '', date: '' });
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerate = () => {
    if (form.n1 && form.n2 && form.date) {
      const encoded = encodeWeddingData(form.n1, form.n2, form.date);
      const url = `${window.location.origin}/forever?u=${encoded}`;
      setGeneratedUrl(url);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#1a1a1a] overflow-x-hidden">
      {/* Brand Header */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[60]">
        <motion.a
          href="https://instagram.com/coded_gifts"
          target="_blank"
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // New standard: use arrays for custom cubics
          }}
          className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full group border"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-accent/30 blur-lg n"
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase ">
            Coded_Gifts
          </span>
        </motion.a>

        <button
          onClick={() => setShowForm(true)}
          className="text-[9px] font-mono tracking-widest uppercase cursor-pointer border-b border-black/10 pb-1"
        >
          Create Yours
        </button>
      </nav>

      {/* Content Injection */}
      <main className="relative z-10 w-full h-screen">{children}</main>

      {/* Input Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-white p-10 rounded-[2rem] shadow-xl space-y-8 text-center"
            >
              <h3 className="text-2xl font-serif italic">Its all yours</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.n1}
                  onChange={(e) => setForm({ ...form, n1: e.target.value })}
                  className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none focus:ring-1 ring-[#D4AF37] text-sm"
                />
                <input
                  type="text"
                  placeholder="Second Name"
                  value={form.n2}
                  onChange={(e) => setForm({ ...form, n2: e.target.value })}
                  className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none focus:ring-1 ring-[#D4AF37] text-sm"
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#FAF9F6] p-4 rounded-xl outline-none focus:ring-1 ring-[#D4AF37] text-sm font-mono text-black/40"
                />
              </div>

              {generatedUrl ? (
                <div className="space-y-3">
                  <div className="p-3 bg-black/5 rounded-lg text-[10px] break-all font-mono opacity-60">
                    {generatedUrl}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedUrl);
                      alert('Copied!');
                    }}
                    className="w-full bg-black text-white py-4 rounded-xl text-[10px] font-mono tracking-widest"
                  >
                    Copy Link
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGenerate}
                  className="w-full bg-black text-white py-4 rounded-xl text-[10px] font-mono tracking-widest hover:bg-[#D4AF37] transition-colors"
                >
                  Generate Keepsake
                </button>
              )}
              <button
                onClick={() => setShowForm(false)}
                className="text-[10px] font-mono opacity-20 uppercase tracking-widest"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
