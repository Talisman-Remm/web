import { Network, Activity, Zap, TrendingUp, ImageIcon, FileCode, Calculator, ArrowRight, Cpu, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MegaMenu = () => {
  const { t } = useTranslation();

  const col1 = [
    {
      icon: <Network className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Neural Networks',
      desc: 'Deep learning pipelines at scale',
      href: '#puzzles',
    },
    {
      icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Data Streams',
      desc: 'Real-time analytics & monitoring',
      href: '#puzzles',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Quantum Processing',
      desc: 'Next-gen computational power',
      href: '#puzzles',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#D4AF37]" />,
      title: 'AI Automation',
      desc: 'End-to-end workflow automation',
      href: '#solutions',
    },
  ];

  const col2 = [
    {
      icon: <Calculator className="w-5 h-5 text-[#D4AF37]" />,
      title: 'ROI Calculator',
      desc: 'Measure your automation returns',
      href: '#tools',
    },
    {
      icon: <ImageIcon className="w-5 h-5 text-[#D4AF37]" />,
      title: 'PNG Generator',
      desc: 'AI-powered image creation',
      href: '#tools',
    },
    {
      icon: <FileCode className="w-5 h-5 text-[#D4AF37]" />,
      title: 'SVG Converter',
      desc: 'Transform assets instantly',
      href: '#tools',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Trend Analyzer',
      desc: 'Spot market signals early',
      href: '#trends',
    },
  ];

  return (
    // group wrapper — el hover se mantiene activo mientras el cursor esté
    // en cualquier parte de este div (ítem + panel)
    <div className="relative group">

      {/* ── Disparador ── */}
      <button className="flex items-center space-x-1 text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-light font-['Inter'] group-hover:text-[#D4AF37]">
        <span>Solutions</span>
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {/* ── Panel del mega menú ──
          hidden por defecto, group-hover:block lo muestra
          mientras el cursor esté dentro del div.group */}
      <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">

        {/* Flecha decorativa */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0F0F0F] border-l border-t border-[#D4AF37]/30 rotate-45 z-10" />

        {/* Panel principal */}
        <div className="relative bg-[#0F0F0F] border border-[#D4AF37]/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-[780px]">

          {/* Línea dorada superior */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="grid grid-cols-3 divide-x divide-[#D4AF37]/10 p-2">

            {/* ── Columna 1: AI Services ── */}
            <div className="px-6 py-5">
              <p className="font-['Playfair_Display'] text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-4 opacity-70">
                AI Services
              </p>
              <ul className="space-y-3">
                {col1.map((item) => (
                  <li key={item.title}>
                    <motion.a
                      href={item.href}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                      className="flex items-start space-x-3 group/item p-2 hover:bg-[#D4AF37]/5 transition-colors duration-200"
                    >
                      <span className="mt-0.5 flex-shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block font-['Inter'] text-sm text-gray-200 group-hover/item:text-[#D4AF37] transition-colors duration-200 font-medium">
                          {item.title}
                        </span>
                        <span className="block font-['Inter'] text-xs text-gray-500 mt-0.5">
                          {item.desc}
                        </span>
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Columna 2: Tools ── */}
            <div className="px-6 py-5">
              <p className="font-['Playfair_Display'] text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-4 opacity-70">
                Tools
              </p>
              <ul className="space-y-3">
                {col2.map((item) => (
                  <li key={item.title}>
                    <motion.a
                      href={item.href}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                      className="flex items-start space-x-3 group/item p-2 hover:bg-[#D4AF37]/5 transition-colors duration-200"
                    >
                      <span className="mt-0.5 flex-shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block font-['Inter'] text-sm text-gray-200 group-hover/item:text-[#D4AF37] transition-colors duration-200 font-medium">
                          {item.title}
                        </span>
                        <span className="block font-['Inter'] text-xs text-gray-500 mt-0.5">
                          {item.desc}
                        </span>
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Columna 3: Get Started ── */}
            <div className="px-6 py-5 flex flex-col justify-between">
              <div>
                <p className="font-['Playfair_Display'] text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-4 opacity-70">
                  Get Started
                </p>
                <p className="font-['Inter'] text-gray-400 text-sm leading-relaxed mb-6">
                  Ready to automate your workflow? Let's build something extraordinary together.
                </p>

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="font-['Inter'] text-xs text-[#D4AF37] font-medium tracking-wide">
                    Systems Online
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* CTA primario */}
                <motion.a
                  href="#contact"
                  whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(212,175,55,0.35)' }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                  className="flex items-center justify-between w-full px-5 py-3 bg-[#D4AF37] text-[#050505] font-['Inter'] text-sm font-semibold hover:bg-[#D4AF37]/90 transition-colors duration-200 group/cta"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </motion.a>

                {/* CTA secundario */}
                <motion.a
                  href="#tools"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                  className="flex items-center justify-between w-full px-5 py-3 border border-[#D4AF37]/30 text-[#D4AF37] font-['Inter'] text-sm font-medium hover:bg-[#D4AF37]/10 transition-colors duration-200 group/cta2"
                >
                  <span>Explore Tools</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta2:translate-x-1" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Línea dorada inferior */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;