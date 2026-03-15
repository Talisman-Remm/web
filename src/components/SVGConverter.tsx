import React, { useState } from 'react';
import { FileCode, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SVGConverter = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [svgFile, setSvgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertToSvg = async () => {
    if (!imageUrl) return;
    setLoading(true);
    setSvgFile(null);
    try {
      const response = await fetch(import.meta.env.VITE_SVG, {
        method: 'POST',
        body: JSON.stringify({ image_data: imageUrl }),
        headers: { 'Content-Type': 'application/json' }
      });
      const svgData = await response.json();
      
      const svgString = JSON.stringify(svgData);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(blob);
      setSvgFile(url);
    } catch (error) {
      console.error("Error convirtiendo a SVG:", error);
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
        PNG to SVG Converter
      </motion.h3>
      
      <div className="space-y-4">
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Pega la URL de tu imagen PNG..."
          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 p-3 text-white focus:border-[#D4AF37] outline-none transition-all"
        />
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={convertToSvg}
          disabled={loading || !imageUrl}
          className="w-full border border-[#D4AF37] text-[#D4AF37] py-3 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <FileCode size={20} />}
          Convert to SVG
        </motion.button>
      </div>

      <AnimatePresence>
        {svgFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="border-t border-[#D4AF37]/10 pt-6"
          >
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: '#F4E4A6' }}
              href={svgFile}
              download="logo.svg"
              className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-[#050505] py-3 font-bold transition-all"
            >
              <Download size={16} /> Download SVG
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SVGConverter;