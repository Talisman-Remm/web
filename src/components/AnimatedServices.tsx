"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Activity, Zap, TrendingUp, ImageIcon, FileCode, Calculator, Cpu } from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  category: string;
}

// ── Items (mismos que InfiniteMarquee) ─────────────────────────────────────
const items: ServiceItem[] = [
  {
    icon: <Network className="w-8 h-8 text-[#D4AF37]" />,
    title: "Neural Networks",
    desc: "Deep learning pipelines at scale. We design and deploy custom neural architectures tailored to your data, enabling real-time inference and continuous model improvement across your entire operation.",
    category: "AI Services",
  },
  {
    icon: <Activity className="w-8 h-8 text-[#D4AF37]" />,
    title: "Data Streams",
    desc: "Real-time analytics & monitoring. Our streaming infrastructure processes millions of events per second, giving you live dashboards, instant anomaly detection, and actionable insights without delay.",
    category: "AI Services",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#D4AF37]" />,
    title: "Quantum Processing",
    desc: "Next-gen computational power. Harness quantum-inspired algorithms to solve optimization problems that are intractable for classical hardware, unlocking new frontiers in simulation and cryptography.",
    category: "AI Services",
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#D4AF37]" />,
    title: "AI Automation",
    desc: "End-to-end workflow automation. From document parsing to decision-making pipelines, our AI agents eliminate manual bottlenecks, reduce operational costs, and scale effortlessly with your business.",
    category: "AI Services",
  },
  {
    icon: <Calculator className="w-8 h-8 text-[#D4AF37]" />,
    title: "ROI Calculator",
    desc: "Measure your automation returns. Our proprietary model benchmarks your current processes, projects cost savings over 12–36 months, and delivers a board-ready report with clear ROI milestones.",
    category: "Tools",
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-[#D4AF37]" />,
    title: "PNG Generator",
    desc: "AI-powered image creation. Generate production-ready visuals — from marketing assets to technical diagrams — in seconds. Style-consistent, brand-aligned, and ready for immediate use.",
    category: "Tools",
  },
  {
    icon: <FileCode className="w-8 h-8 text-[#D4AF37]" />,
    title: "SVG Converter",
    desc: "Transform assets instantly. Upload any raster image and receive a clean, optimized SVG in return. Perfect for icons, logos, and illustrations that need to scale perfectly at any resolution.",
    category: "Tools",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#D4AF37]" />,
    title: "Trend Analyzer",
    desc: "Spot market signals early. Our AI scans thousands of data sources in real time, surfaces emerging patterns before they hit the mainstream, and delivers concise briefs directly to your team.",
    category: "Tools",
  },
];

// ── Utilidad cn ────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── Componente principal ───────────────────────────────────────────────────
export const AnimatedServices = ({
  autoplay = false,
}: {
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  }, []);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Rotaciones aleatorias fijas por índice (igual que Aceternity)
  const randomRotations = [-5, 3, -3, 5, -7, 2, -4, 6];

  return (
    <section className="relative py-16 bg-[#050505] overflow-hidden">
      {/* Línea dorada superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-12" />

      {/* Label central */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-2 border border-[#D4AF37]/20 px-4 py-1.5 bg-[#0F0F0F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-['Inter'] text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70">
            Our Solutions
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 antialiased font-sans">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* ── Lado izquierdo: stack de iconos animados ── */}
          <div className="relative h-72 w-full">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotations[index % randomRotations.length],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index)
                      ? 0
                      : randomRotations[index % randomRotations.length],
                    zIndex: isActive(index)
                      ? 40
                      : items.length - Math.abs(active - index),
                    y: isActive(index) ? [0, -10, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotations[index % randomRotations.length],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {/* Recuadro del ícono — reemplaza la foto de persona */}
                  <div
                    className={cn(
                      "w-full h-full bg-[#0F0F0F] border flex flex-col items-center justify-center gap-4 transition-all duration-300",
                      isActive(index)
                        ? "border-[#D4AF37]/60"
                        : "border-[#D4AF37]/20"
                    )}
                  >
                    {/* Glow fondo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

                    {/* Ícono grande */}
                    <div className="relative z-10 w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                      {item.icon}
                      {/* Destellos en esquinas */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]/60" />
                      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]/60" />
                      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]/60" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]/60" />
                    </div>

                    {/* Título y categoría debajo del ícono */}
                    <div className="relative z-10 text-center px-4">
                      <p className="font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/50 mb-1">
                        {item.category}
                      </p>
                      <p className="font-['Playfair_Display'] text-lg text-gray-200 font-medium">
                        {item.title}
                      </p>
                    </div>

                    {/* Línea decorativa inferior */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Lado derecho: descripción animada ── */}
          <div className="flex flex-col justify-between py-4 h-full">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Categoría */}
              <p className="font-['Inter'] text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/50 mb-3">
                {items[active].category}
              </p>

              {/* Título principal */}
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {items[active].title}
              </h3>

              {/* Línea dorada separadora */}
              <div className="w-12 h-px bg-[#D4AF37]/60 mb-6" />

              {/* Descripción con palabras animadas */}
              <motion.p className="font-['Inter'] text-sm text-gray-400 leading-relaxed">
                {items[active].desc.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(6px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * i,
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* ── Controles de navegación ── */}
            <div className="flex gap-4 pt-10 mt-auto">
              <button
                onClick={handlePrev}
                className="group w-10 h-10 border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 bg-[#0F0F0F] flex items-center justify-center transition-all duration-300"
                aria-label="Previous service"
              >
                {/* Flecha izquierda */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors"
                >
                  <path
                    d="M9 2L4 7L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="group w-10 h-10 border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 bg-[#0F0F0F] flex items-center justify-center transition-all duration-300"
                aria-label="Next service"
              >
                {/* Flecha derecha */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors"
                >
                  <path
                    d="M5 2L10 7L5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Indicador de posición */}
              <div className="flex items-center gap-2 ml-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "transition-all duration-300",
                      isActive(i)
                        ? "w-6 h-1 bg-[#D4AF37]"
                        : "w-1 h-1 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/50"
                    )}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea dorada inferior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-12" />
    </section>
  );
};

export default AnimatedServices;