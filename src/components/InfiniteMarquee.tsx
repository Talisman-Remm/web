import { Network, Activity, Zap, TrendingUp, ImageIcon, FileCode, Calculator, Cpu } from 'lucide-react';
import Marquee from "./marquee";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface MarqueeItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  category: string;
}

// ── Items (mismos que MegaMenu) ────────────────────────────────────────────
const items: MarqueeItem[] = [
  {
    icon: <Network className="w-5 h-5 text-[#D4AF37]" />,
    title: 'Neural Networks',
    desc: 'Deep learning pipelines at scale',
    category: 'AI Services',
  },
  {
    icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
    title: 'Data Streams',
    desc: 'Real-time analytics & monitoring',
    category: 'AI Services',
  },
  {
    icon: <Zap className="w-5 h-5 text-[#D4AF37]" />,
    title: 'Quantum Processing',
    desc: 'Next-gen computational power',
    category: 'AI Services',
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#D4AF37]" />,
    title: 'AI Automation',
    desc: 'End-to-end workflow automation',
    category: 'AI Services',
  },
  {
    icon: <Calculator className="w-5 h-5 text-[#D4AF37]" />,
    title: 'ROI Calculator',
    desc: 'Measure your automation returns',
    category: 'Tools',
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-[#D4AF37]" />,
    title: 'PNG Generator',
    desc: 'AI-powered image creation',
    category: 'Tools',
  },
  {
    icon: <FileCode className="w-5 h-5 text-[#D4AF37]" />,
    title: 'SVG Converter',
    desc: 'Transform assets instantly',
    category: 'Tools',
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[#D4AF37]" />,
    title: 'Trend Analyzer',
    desc: 'Spot market signals early',
    category: 'Tools',
  },
];

// ── Card individual ────────────────────────────────────────────────────────
const MarqueeCard = ({ icon, title, desc, category }: MarqueeItem) => (
  <div className="group relative flex items-center gap-4 mx-4 px-6 py-4 bg-[#0F0F0F] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 cursor-default select-none min-w-[260px]">
    {/* Glow hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Ícono */}
    <div className="flex-shrink-0 w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
      {icon}
    </div>

    {/* Texto */}
    <div className="relative z-10">
      <span className="block font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/50 mb-0.5">
        {category}
      </span>
      <span className="block font-['Playfair_Display'] text-sm text-gray-200 group-hover:text-[#D4AF37] transition-colors duration-300 font-medium">
        {title}
      </span>
      <span className="block font-['Inter'] text-xs text-gray-500 mt-0.5">
        {desc}
      </span>
    </div>
  </div>
);

// ── Separador decorativo ───────────────────────────────────────────────────
const Separator = () => (
  <div className="flex items-center mx-2 text-[#D4AF37]/30 select-none">
    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40 mx-3" />
  </div>
);

// ── Componente principal ───────────────────────────────────────────────────
const InfiniteMarquee = () => {
  return (
    <section className="relative py-10 bg-[#050505] overflow-hidden">
      {/* Línea dorada superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-6" />

      {/* Label central */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 border border-[#D4AF37]/20 px-4 py-1.5 bg-[#0F0F0F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-['Inter'] text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70">
            Our Solutions
          </span>
        </div>
      </div>

      {/* Fade masks izquierda y derecha */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Marquee */}
      <Marquee
        pauseOnHover
        repeat={4}
        className="[--duration:35s] [--gap:0px]"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <MarqueeCard {...item} />
            <Separator />
          </div>
        ))}
      </Marquee>

      {/* Línea dorada inferior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-6" />
    </section>
  );
};

export default InfiniteMarquee;