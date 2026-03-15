import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// CONFIGURACIÓN DE SECCIONES
// Ajusta los `id` para que coincidan exactamente con los ids
// en tu HTML/JSX (ver App.tsx y componentes hijos).
// ============================================================
const SECTIONS = [
  { id: 'hero',     label: 'Home',     icon: '◆' },
  { id: 'trends', label: 'Trends', icon: '◇' },
  { id: 'puzzles',  label: 'Puzzles',  icon: '◈' },
  { id: 'tools',    label: 'Tools',    icon: '◉' },
  { id: 'contact',  label: 'Contact',  icon: '◎' },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ─── IntersectionObserver: detecta sección visible ───────
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Filtramos las secciones que están intersectando
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      // Zona de detección: cuando la sección ocupa al menos el 30% del viewport
      threshold: 0.3,
      rootMargin: '-10% 0px -10% 0px',
    });

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ─── Scroll suave al hacer clic ──────────────────────────
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // ── Contenedor fijo, lado derecho, centrado verticalmente ──
    <nav
      aria-label="Navegación de secciones"
      className="fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-6"
    >
      {/* Línea conectora vertical decorativa */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none" />

      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        const isHovered = hoveredId === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* ── Tooltip de texto (aparece al hover, a la izquierda) ── */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-10 flex items-center gap-2 pointer-events-none select-none"
                >
                  {/* Línea conectora del tooltip */}
                  <div className="w-6 h-px bg-[#D4AF37]/50" />

                  {/* Caja del tooltip */}
                  <div
                    className={`
                      px-3 py-1.5 text-xs font-['Inter'] font-medium tracking-widest uppercase
                      border whitespace-nowrap
                      ${isActive
                        ? 'bg-[#D4AF37] text-[#050505] border-[#D4AF37]'
                        : 'bg-[#0F0F0F]/90 text-[#D4AF37] border-[#D4AF37]/30 backdrop-blur-sm'
                      }
                    `}
                  >
                    {section.label}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Punto / Indicador clickeable ── */}
            <motion.button
              onClick={() => scrollTo(section.id)}
              aria-label={`Ir a ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {/* Anillo exterior pulsante cuando está activo */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Círculo principal */}
              <motion.span
                animate={{
                  width:  isActive ? 14 : 8,
                  height: isActive ? 14 : 8,
                  backgroundColor: isActive ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                  boxShadow: isActive
                    ? '0 0 12px rgba(212,175,55,0.8), 0 0 24px rgba(212,175,55,0.3)'
                    : '0 0 0px transparent',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-full block"
              />
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}