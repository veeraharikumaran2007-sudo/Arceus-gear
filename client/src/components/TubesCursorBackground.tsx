import React, { useEffect, useRef, useState, useCallback } from 'react';

// Crystal Glass & Vibrant Samurai Ribbons (Clear, Visible & Well-Defined)
const GLASS_SAMURAI_PALETTES = [
  {
    name: 'Crystal Crimson & Amber Katana',
    tubes: ['#F43F5E', '#FB923C', '#FFFFFF'], // Vibrant Rose Glass, Warm Amber, Pure Crystal
    lights: ['#E11D48', '#EA580C', '#FDA4AF', '#FFFFFF'],
    intensity: 24 // Clear & defined without glare
  },
  {
    name: 'Moonlit Ice & Damascus Steel',
    tubes: ['#38BDF8', '#818CF8', '#FFFFFF'], // Sky Blue Ice, Royal Violet Frost, Pure Ice
    lights: ['#0284C7', '#4F46E5', '#BAE6FD', '#FFFFFF'],
    intensity: 22
  },
  {
    name: 'Sakura Petal Golden Glass',
    tubes: ['#F472B6', '#FBBF24', '#FFFFFF'], // Blossom Pink, Golden Dawn, Pure Crystal
    lights: ['#E11D48', '#F59E0B', '#FDF2F8', '#FFFFFF'],
    intensity: 22
  },
  {
    name: 'Ronin Amber Flame',
    tubes: ['#F97316', '#FBBF24', '#FFFFFF'], // Flame Orange, Warm Amber, Crystal
    lights: ['#C2410C', '#D97706', '#FED7AA', '#FFFFFF'],
    intensity: 24
  }
];

interface TubesCursorBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export const TubesCursorBackground: React.FC<TubesCursorBackgroundProps> = ({
  children,
  className = '',
  enableClickInteraction = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is mobile or touch-only (screens under 768px or touch screen)
    const isMobileOrTouch = typeof window !== 'undefined' && 
      (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024));
    
    setIsTouchDevice(isMobileOrTouch);

    // If mobile or touch device, DO NOT initialize heavy WebGL tubes to avoid hanging/freezing
    if (isMobileOrTouch) {
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        let module: any;
        try {
          const importFn = new Function('url', 'return import(url)');
          module = await importFn('/tubes1.min.js');
        } catch {
          const importFn = new Function('url', 'return import(url)');
          module = await importFn('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        }

        const TubesCursor = module.default;
        if (!mounted || !canvasRef.current) return;

        // Soft, subtle glass ribbons tuned for samurai background
        const initial = GLASS_SAMURAI_PALETTES[0];
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: initial.tubes,
            lights: {
              intensity: initial.intensity,
              colors: initial.lights
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const container = containerRef.current;
        const canvas = canvasRef.current;

        const forwardPointer = (e: PointerEvent | MouseEvent) => {
          if (!canvas) return;
          const clientX = e.clientX;
          const clientY = e.clientY;

          if (e.target !== canvas) {
            const simulated = new PointerEvent(e.type, {
              clientX,
              clientY,
              bubbles: true,
              cancelable: true,
              pointerType: 'mouse'
            });
            canvas.dispatchEvent(simulated);
          }
        };

        if (container) {
          container.addEventListener('pointermove', forwardPointer, { passive: true });
          container.addEventListener('pointerenter', forwardPointer, { passive: true });
        }

        cleanup = () => {
          if (container) {
            container.removeEventListener('pointermove', forwardPointer);
            container.removeEventListener('pointerenter', forwardPointer);
          }
          if (app && typeof app.dispose === 'function') {
            try {
              app.dispose();
            } catch {}
          }
        };
      } catch (err) {
        console.warn('TubesCursor initialization skipped:', err);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = useCallback(() => {
    if (!enableClickInteraction || !tubesRef.current || isTouchDevice) return;

    // Cycle between delicate glass samurai palettes
    const nextIdx = (paletteIndex + 1) % GLASS_SAMURAI_PALETTES.length;
    setPaletteIndex(nextIdx);

    const target = GLASS_SAMURAI_PALETTES[nextIdx];

    try {
      if (tubesRef.current.tubes) {
        tubesRef.current.tubes.setColors(target.tubes);
        tubesRef.current.tubes.setLightsColors(target.lights);
      }
    } catch {}
  }, [enableClickInteraction, paletteIndex, isTouchDevice]);

  // On mobile/touch devices: zero WebGL overhead, pristine 60-120fps performance
  if (isTouchDevice) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* 3D WebGL Frosted Glass Streamer Canvas - Soft Translucent Blend */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full block z-0 transition-opacity duration-1000 mix-blend-screen pointer-events-none ${
          isLoaded ? 'opacity-80' : 'opacity-0'
        }`}
        style={{ touchAction: 'none' }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default TubesCursorBackground;
