import React, { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollVideo: React.FC<{ onProgress?: (progress: number) => void }> = ({ onProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const [loaded, setLoaded] = useState(0);
  const frameCount = 60;

  // Carga imágenes
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        images.current[i] = img;
        if (loadedCount === 1) renderFrame(1);
      };
      img.onerror = () => console.error(`Frame ${i} falló`);
      images.current[i] = img;
    }
  }, []);

  // Renderiza frame
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images.current[index];
    if (!img || !img.complete) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const { width: cw, height: ch } = canvas;
    const { width: iw, height: ih } = img;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // GSAP setup
  useGSAP(() => {
    if (loaded < frameCount || !containerRef.current || !canvasRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`, // espacio para completar ~2 vh de scroll, ajusta si necesitas más/menos
        scrub: true,
        pin: true, // mantiene el canvas sticky hasta que termine
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.max(1, Math.min(frameCount, Math.round(progress * frameCount)));
          renderFrame(frameIndex);
          if (onProgress) onProgress(progress);
        },
      },
    });

    // Resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
      renderFrame(1); // redraw inicial
    };
    window.addEventListener('resize', handleResize);

    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded, onProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '125vh', // inicial, GSAP ajusta el pin/end para no dejar vacío extra
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
};

export default ScrollVideo;