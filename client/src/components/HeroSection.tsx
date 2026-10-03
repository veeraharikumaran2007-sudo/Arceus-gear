import React, { useState, useEffect } from 'react';
import { ArrowRight, Swords, Cpu, Laptop, Flame, Zap, Sparkles } from 'lucide-react';
import { GeminiStarIcon } from './GeminiAiModal';
import { TubesCursorBackground } from './TubesCursorBackground';

interface HeroSectionProps {
  onOpenAI: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAI, onExplore }) => {
  const line1Words = ['INTELLIGENT', 'HARDWARE.'];
  const line2Words = ['Immersive', 'Experiences.'];
  const line3Words = ['BUILT', 'FOR', 'NEXT-GEN.'];

  // Smooth Interactive 3D Mouse Parallax (Desktop Only)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable parallax on desktop
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <TubesCursorBackground
      className="relative bg-transparent text-white min-h-[calc(100vh-80px)] flex flex-col justify-center items-center cursor-default overflow-hidden perspective-1000 py-6 sm:py-10"
      enableClickInteraction={true}
    >
      {/* Ambient Red Samurai Autumn Warmth */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[180px] sm:h-[300px] bg-rose-600/10 blur-[100px] sm:blur-[160px] pointer-events-none -z-10" />

      {/* Main Hero Split Grid Container with 3D Parallax Tilt */}
      <div
        className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 my-auto preserve-3d"
        style={{
          transform: typeof window !== 'undefined' && window.innerWidth >= 1024
            ? `perspective(1000px) rotateX(${mouseOffset.y * -2.5}deg) rotateY(${mouseOffset.x * 2.5}deg) translate3d(${mouseOffset.x * 5}px, ${mouseOffset.y * 3}px, 0)`
            : 'none',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Book Antiqua Typography, Description, & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">

            {/* Book Antiqua Font Headline */}
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-white leading-tight select-none animate-entrance-reveal"
              style={{ fontFamily: "'Book Antiqua', Palatino, 'Palatino Linotype', Georgia, serif" }}
            >
              {/* Line 1 */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 sm:gap-x-3 gap-y-1">
                {line1Words.map((word, wIdx) => (
                  <span
                    key={word}
                    className="animate-letter-blast inline-block tracking-widest text-white drop-shadow-md"
                    style={{ animationDelay: `${wIdx * 0.08}s` }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Line 2 in Italic Book Antiqua with Autumn Sunset Gradient */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 sm:gap-x-3 gap-y-1 mt-1 sm:mt-2">
                {line2Words.map((word, wIdx) => (
                  <span
                    key={word}
                    className="animate-letter-blast italic font-normal inline-block text-rose-300 drop-shadow-md"
                    style={{ animationDelay: `${0.2 + wIdx * 0.1}s` }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Line 3 */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 sm:gap-x-3 gap-y-1 mt-1 sm:mt-2">
                {line3Words.map((word, wIdx) => (
                  <span
                    key={word}
                    className="animate-letter-blast inline-block text-slate-200 tracking-wider drop-shadow-sm"
                    style={{ animationDelay: `${0.4 + wIdx * 0.07}s` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>

            {/* Description - Book Antiqua */}
            <p 
              className="text-xs sm:text-sm text-slate-300/90 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed drop-shadow-md select-none animate-entrance-reveal px-2 sm:px-0"
              style={{ fontFamily: "'Book Antiqua', Palatino, Georgia, serif" }}
            >
              Engineered battle rigs, RTX 40-series monsters, and optical-magnetic peripherals with simulated instant checkout and INFY AI shopping intelligence.
            </p>

            {/* Quick Specs Highlights Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Zap size={12} className="text-amber-400" />
                <span>RTX 4090 24GB</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Flame size={12} className="text-rose-400" />
                <span>300Hz OLED Laptops</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Sparkles size={12} className="text-sky-400" />
                <span>Instant Simulated UPI</span>
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 pointer-events-auto animate-entrance-reveal max-w-md sm:max-w-none mx-auto lg:mx-0 w-full px-4 sm:px-0">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-rose-600/40 interactive-btn flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <span>Explore Arsenal</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenAI}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-900 border border-rose-200 font-bold text-xs sm:text-sm interactive-btn flex items-center justify-center gap-2 shadow-xl shadow-rose-950/20 cursor-pointer transition"
              >
                <GeminiStarIcon className="w-4 h-4 animate-pulse" />
                <span>Ask INFY AI</span>
              </button>
            </div>

            {/* Katana hint - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 text-slate-400/80 text-[11px] font-mono select-none pt-1">
              <Swords size={13} className="text-rose-400 animate-pulse" />
              <span>Move cursor to guide Katana slash &bull; Click anywhere to shift blade aura</span>
            </div>

          </div>

          {/* Right Column: High-End Hardware Battlestation & Gaming Laptop Showcase */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative rounded-3xl bg-slate-950/70 border border-white/15 p-3.5 sm:p-5 backdrop-blur-2xl shadow-2xl shadow-rose-950/30 group hover:border-rose-500/40 transition-all duration-300">
              
              {/* Ambient Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600/20 via-blue-600/20 to-amber-600/20 rounded-3xl blur-xl opacity-60 -z-10 pointer-events-none" />

              {/* Hardware Header Bar */}
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-xs text-rose-300 font-bold">
                  <Laptop size={14} className="text-rose-400" />
                  <span>ROG Zephyrus G14 &bull; 2026 Rare Launch</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>LIVE TELEMETRY</span>
                </div>
              </div>

              {/* Main Hardware Showcase Image with Glass Framing */}
              <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-rose-500/30 transition-all flex items-center justify-center">
                <img
                  src="/rare-laptop.png"
                  alt="ASUS ROG Zephyrus G14 2026 Rare Launch"
                  className="w-full h-full object-contain bg-[#0c101d] p-1.5 transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glass RARE Badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xl border border-white/30 text-white font-black tracking-widest text-xs shadow-2xl flex items-center gap-1.5 animate-pulse">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>💎 RARE</span>
                </div>

                {/* Top-Right Price Chip with Discount */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white font-mono shadow-lg flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold text-[10px]">5% OFF</span>
                  <span>₹1,89,999</span>
                </div>

                {/* Bottom Floating Spec Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[11px] sm:text-[12px] truncate">
                      ASUS ROG Zephyrus G14 (2026 Rare Launch)
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      AMD Ryzen™ AI 9 HX 370 • RTX 5060 • 3K 120Hz OLED • 73Whr
                    </p>
                  </div>
                  <button
                    onClick={onExplore}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] shrink-0 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Micro-Telemetry Specs Footer with Processors */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
                <div className="p-1.5 rounded-xl bg-white/[0.03]">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">PROCESSOR CPU</p>
                  <p className="text-[11px] sm:text-xs font-bold text-white truncate px-1">
                    Ryzen AI 9 HX
                  </p>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.03]">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">BOOST CLOCK</p>
                  <p className="text-[11px] sm:text-xs font-bold text-amber-400">
                    5.1 GHz Boost
                  </p>
                </div>
                <div className="p-1.5 rounded-xl bg-white/[0.03]">
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">GRAPHICS GPU</p>
                  <p className="text-[11px] sm:text-xs font-bold text-emerald-400 truncate px-1">
                    RTX 5060 8GB
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </TubesCursorBackground>
  );
};

export default HeroSection;
