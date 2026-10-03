import React, { useState, useEffect } from 'react';
import { Swords } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 750; // smooth 750ms entrance

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 400); // 400ms fade transition
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050811] transition-all duration-500 ease-out select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Red Samurai Backlight */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-600/15 blur-[120px] pointer-events-none" />

      {/* Central Samurai Crest */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-4">
        {/* Animated Katana Icon */}
        <div className="relative w-16 h-16 rounded-2xl bg-slate-900/90 border border-rose-500/40 flex items-center justify-center shadow-2xl shadow-rose-950/80">
          <div className="absolute inset-0 rounded-2xl bg-rose-500/20 animate-ping opacity-30" />
          <Swords size={28} className="text-rose-400 animate-pulse" />
        </div>

        {/* Branding & Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-black text-2xl tracking-wider text-white">
              ARCEUS
            </span>
            <span className="font-display font-black text-2xl tracking-wider text-rose-500">
              GEAR
            </span>
          </div>
          <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            侍 SAMURAI BLADE TELEMETRY
          </p>
        </div>

        {/* Smooth Laser Progress Bar */}
        <div className="w-56 h-1 bg-slate-900 rounded-full overflow-hidden border border-white/10 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-rose-600 via-amber-400 to-rose-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="font-mono text-xs font-bold text-slate-400">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default CinematicLoader;
