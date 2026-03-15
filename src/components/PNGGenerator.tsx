import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PNGGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [pngData, setPngData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateLogo = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_LOGO, {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setPngData(data.data);
    } catch (error) {
      console.error("Error generando logo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-6 space-y-6"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]"
      >
        PNG Logo Generator
      </motion.h3>
      
      <div className="space-y-4">
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe tu logo..."
          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 p-3 text-white focus:border-[#D4AF37] outline-none transition-all"
        />
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, backgroundColor: '#F4E4A6' }}
          whileTap={{ scale: 0.98 }}
          onClick={generateLogo}
          disabled={loading}
          className="w-full bg-[#D4AF37] text-[#050505] py-3 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
          Generate PNG
        </motion.button>
      </div>

      <AnimatePresence>
        {pngData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="border-t border-[#D4AF37]/10 pt-6 space-y-4"
          >
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              src={pngData}
              alt="Logo"
              className="w-40 h-40 mx-auto border border-[#D4AF37]/20"
            />
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              href={pngData}
              download="logo.png"
              className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] border border-[#D4AF37]/20 py-2 text-[#D4AF37] transition-all"
            >
              <Download size={16} /> Download PNG
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PNGGenerator;