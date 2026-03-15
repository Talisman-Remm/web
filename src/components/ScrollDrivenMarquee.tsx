import React, { useRef, useEffect } from 'react';
import { Network, Activity, Zap, TrendingUp, ImageIcon, FileCode, Calculator, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, useGSAP);
interface MarqueeItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  category: string;
}
const items: MarqueeItem[] = [
  {
    icon: <Network className="w-10 h-10 text-[#D4AF37]" />,
    title: 'Neural Networks',
    desc: 'Deep learning pipelines at scale',
    category: 'AI Services',
  },
  {
    icon: <Activity className="w-10 h-10 text-[#D4AF37]" />,
    title: 'Data Streams',
    desc: 'Real-time analytics & monitoring',
    category: 'AI Services',
  },
  {
    icon: <Zap className="w-10 h-10 text-[#D4AF37]" />,
    title: 'Quantum Processing',
    desc: 'Next-gen computational power',
    category: 'AI Services',
  },
  {
    icon: <Cpu className="w-10 h-10 text-[#D4AF37]" />,
    title: 'AI Automation',
    desc: 'End-to-end workflow automation',
    category: 'AI Services',
  },
  {
    icon: <Calculator className="w-10 h-10 text-[#D4AF37]" />,
    title: 'ROI Calculator',
    desc: 'Measure your automation returns',
    category: 'Tools',
  },
  {
    icon: <ImageIcon className="w-10 h-10 text-[#D4AF37]" />,
    title: 'PNG Generator',
    desc: 'AI-powered image creation',
    category: 'Tools',
  },
  {
    icon: <FileCode className="w-10 h-10 text-[#D4AF37]" />,
    title: 'SVG Converter',
    desc: 'Transform assets instantly',
    category: 'Tools',
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-[#D4AF37]" />,
    title: 'Trend Analyzer',
    desc: 'Spot market signals early',
    category: 'Tools',
  },
];
const MarqueeCard = ({ icon, title, desc, category }: MarqueeItem) => (
  <div className="group relative flex flex-col gap-5 mx-6 px-10 py-10 bg-[#0F0F0F] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 select-none min-w-[420px] min-h-[220px] justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <div className="flex items-center gap-6">
      <div className="flex-shrink-0 w-20 h-20 bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
        {icon}
      </div>
      <div className="relative z-10">
        <span className="block font-['Inter'] text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]/50 mb-2">
          {category}
        </span>
        <span className="block font-['Playfair_Display'] text-xl text-gray-200 group-hover:text-[#D4AF37] transition-colors duration-300 font-medium">
          {title}
        </span>
        <span className="block font-['Inter'] text-sm text-gray-500 mt-2">
          {desc}
        </span>
      </div>
    </div>
  </div>
);
const Separator = () => (
  <div className="flex items-center mx-2 select-none">
    <span className="w-2 h-2 rounded-full bg-[#D4AF37]/40 mx-5" />
  </div>
);

// ── Partículas de polvo dorado ─────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

const GoldenDust = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollDelta = scrollProgress.current - lastScrollRef.current;
      lastScrollRef.current = scrollProgress.current;
      const force = scrollDelta * 60;

      particlesRef.current.forEach((p) => {
        p.vy += force * 0.4;
        p.vx += (Math.random() - 0.5) * Math.abs(force) * 0.2;
        p.vx += (p.baseX - p.x) * 0.003;
        p.vy += (p.baseY - p.y) * 0.003;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glowOpacity = Math.min(p.opacity + speed * 0.1, 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${glowOpacity})`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${glowOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

const ScrollDrivenMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const totalScroll = track.scrollWidth - container.clientWidth;
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      },
    });
  }, []);
  const allItems = [...items, ...items];
  return (
    <div
      ref={containerRef}
      style={{ height: '100vh', overflow: 'hidden', position: 'relative', width: '100%' }}
      className="bg-[#050505] py-14"
    >
      {/* Partículas de fondo */}
      <GoldenDust scrollProgress={scrollProgress} />

      {/* Línea dorada superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-8 relative z-10" />
      {/* Label central */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 border border-[#D4AF37]/20 px-5 py-2 bg-[#0F0F0F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-['Inter'] text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]/70">
            Our Solutions
          </span>
        </div>
      </div>
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-center py-3 relative z-10"
        style={{ width: 'max-content' }}
      >
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center">
            <MarqueeCard {...item} />
            <Separator />
          </div>
        ))}
      </div>
      {/* Línea dorada inferior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-8 relative z-10" />
    </div>
  );
};
export default ScrollDrivenMarquee;