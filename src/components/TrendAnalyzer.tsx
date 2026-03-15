import React, { useState } from 'react';
import { Search, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTrendData } from '../TrendsService';
import { motion, AnimatePresence } from 'framer-motion';

export const TrendAnalyzer = () => {
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchTrendData(term);
    setResult(data);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 max-w-5xl mx-auto p-8 bg-[#0F0F0F] border border-[#D4AF37]/30 rounded-lg"
    >
      {/* Input */}
      <div className="flex gap-4 mb-8">
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
          className="flex-1 bg-[#050505] border border-[#D4AF37]/20 px-6 py-3 text-white focus:outline-none transition-all"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Analyze trend..."
        />
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#F4E4A6' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="px-8 py-3 bg-[#D4AF37] text-black font-bold transition-all"
        >
          {loading ? '...' : 'Analyze'}
        </motion.button>
      </div>

      {/* Gráfico */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-80 w-full mb-8"
      >
        <AnimatePresence mode="wait">
          {result?.chartData ? (
            <motion.div
              key="chart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #D4AF37', color: '#fff' }} />
                  <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full border border-dashed border-[#D4AF37]/20 text-gray-500 italic"
            >
              Search for a term to see popularity insights.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats Cards */}
      <AnimatePresence>
        {result?.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Current Interest', value: result.stats.current, suffix: '/ 100', icon: Activity, color: 'D4AF37' },
              { label: 'Peak Interest', value: result.stats.peak, date: result.stats.peakDate, icon: ArrowUpRight, color: 'green-500' },
              { label: 'Lowest Interest', value: result.stats.lowest, date: result.stats.lowestDate, icon: ArrowDownRight, color: 'orange-500' },
              { label: 'Trend Status', value: result.stats.status, icon: TrendingUp, color: 'pink-500', isText: true }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: `var(--${stat.color})` }}
                className={`p-4 bg-[#0A0A0A] border border-${stat.color}/20 rounded shadow-xl transition-all`}
              >
                <div className="flex justify-between text-gray-400 mb-2 italic">
                  <span className="text-xs">{stat.label}</span>
                  <stat.icon size={14} className={`text-${stat.color}`} />
                </div>
                <div className={`${stat.isText ? 'text-xl' : 'text-3xl'} font-bold text-white`}>
                  {stat.value} {stat.suffix && <span className="text-xs text-gray-500">{stat.suffix}</span>}
                </div>
                {stat.date && <div className={`text-[10px] text-${stat.color} uppercase`}>{stat.date}</div>}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};