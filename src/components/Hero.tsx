import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import heroImg from '../assets/images/hero_arch_floral_1791486279471.jpg';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuickSaveDate: (eventId: 'nikkah' | 'walima') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuickSaveDate }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 sm:py-12 overflow-hidden text-center">
      {/* Background with luxury arch and soft atmospheric gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Mughal architectural archway with floral arrangement"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim for luxury clarity and high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/75 to-[#FAF7F2]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85)_0%,rgba(250,247,242,0.92)_70%)]" />
      </div>

      {/* Top Section: Arabic Bismillah & Invocation */}
      <div className="relative z-10 pt-4 sm:pt-6 max-w-2xl mx-auto space-y-2 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs tracking-widest text-[#72222B] uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Islamic Wedding Invitation</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </div>

        {/* Bismillah Calligraphy */}
        <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#72222B] font-bold tracking-normal pt-1 drop-shadow-xs" dir="rtl">
          {WEDDING_DATA.bismillah.arabic}
        </h2>

        <p className="font-cormorant text-sm sm:text-base text-[#5C4D44] italic tracking-wide">
          "{WEDDING_DATA.bismillah.translation}"
        </p>
      </div>

      {/* Center Section: Main Couple Name Anchor */}
      <div className="relative z-10 my-auto py-8 max-w-3xl mx-auto space-y-4">
        <div className="space-y-1">
          <p className="font-cormorant text-base sm:text-lg uppercase tracking-[0.3em] text-[#72222B] font-medium">
            Together With Their Families
          </p>
        </div>

        {/* Couple Names */}
        <div className="space-y-2 py-2">
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl text-[#72222B] leading-none drop-shadow-sm select-none">
            Moin
          </h1>

          <div className="flex items-center justify-center gap-4 my-2">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <span className="font-cormorant text-2xl sm:text-3xl text-[#C5A059] italic font-light">&</span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          </div>

          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl text-[#72222B] leading-none drop-shadow-sm select-none">
            Rozmeen
          </h1>
        </div>

        {/* Subtitle & Dates Indicator */}
        <div className="pt-2 space-y-3">
          <p className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#2C1810] uppercase font-medium">
            Nikaah & Walima Celebrations
          </p>

          <p className="font-cormorant text-base sm:text-lg text-[#5C4D44] italic">
            Pune, Maharashtra · 31st October & 01st November 2026
          </p>
        </div>

        {/* Quick Save Date Floating Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onQuickSaveDate('nikkah')}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#72222B] border border-[#C5A059]/40 hover:border-[#72222B] rounded-full shadow-xs text-xs font-cinzel tracking-wider transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#72222B] transition-colors" />
            <span>Nikaah: 31 Oct 2026</span>
          </button>

          <button
            onClick={() => onQuickSaveDate('walima')}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#72222B] border border-[#C5A059]/40 hover:border-[#72222B] rounded-full shadow-xs text-xs font-cinzel tracking-wider transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#72222B] transition-colors" />
            <span>Walima: 01 Nov 2026</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Scroll down invite prompt */}
      <div className="relative z-10 pb-2">
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-1.5 text-xs text-[#5C4D44] hover:text-[#72222B] font-cinzel tracking-widest uppercase transition-colors cursor-pointer"
          aria-label="Scroll to wedding invitation details"
        >
          <span>View Formal Invitation</span>
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-[#C5A059]/50 group-hover:border-[#72222B] transition-colors">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#72222B]" />
          </div>
        </button>
      </div>
    </section>
  );
};
