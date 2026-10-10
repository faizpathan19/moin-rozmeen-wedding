import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';

export const QuranicBlessing: React.FC = () => {
  return (
    <section className="relative py-20 px-4 bg-[#FAF7F2] overflow-hidden text-center">
      <div className="max-w-3xl mx-auto">
        <div className="relative p-8 sm:p-14 rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border border-[#C5A059]/30 shadow-lg space-y-6">
          {/* Subtle Decorative Emblem */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 sm:w-20 h-px bg-[#C5A059]/50" />
            <span className="text-[#72222B] text-xl">﷽</span>
            <span className="w-12 sm:w-20 h-px bg-[#C5A059]/50" />
          </div>

          {/* Arabic Ayah */}
          <blockquote className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#72222B] leading-loose sm:leading-loose font-medium pt-2" dir="rtl">
            {WEDDING_DATA.blessing.arabic}
          </blockquote>

          {/* English Translation */}
          <p className="font-cormorant text-base sm:text-xl text-[#2C1810] italic max-w-2xl mx-auto leading-relaxed">
            "{WEDDING_DATA.blessing.translation}"
          </p>

          {/* Reference Citation */}
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#C5A059] font-medium pt-1">
            — {WEDDING_DATA.blessing.surah} —
          </p>
        </div>
      </div>
    </section>
  );
};
