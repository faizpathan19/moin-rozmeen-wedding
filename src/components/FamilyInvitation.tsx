import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';

export const FamilyInvitation: React.FC = () => {
  return (
    <section id="invitation" className="relative py-16 sm:py-24 px-4 bg-[#FAF7F2] overflow-hidden">
      {/* Delicate background decorative elements */}
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#FFFFFF] rounded-2xl p-8 sm:p-14 border border-[#C5A059]/35 shadow-xl text-center space-y-8">
          {/* Ornate corner flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/60 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/60 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/60 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/60 rounded-br-sm pointer-events-none" />

          {/* Top Calligraphy / Bismillah */}
          <div className="space-y-2">
            <p className="font-arabic text-2xl sm:text-3xl text-[#72222B] font-bold" dir="rtl">
              {WEDDING_DATA.bismillah.arabic}
            </p>
            <p className="font-cormorant text-sm sm:text-base text-[#5C4D44] italic">
              {WEDDING_DATA.bismillah.translation}
            </p>
          </div>

          {/* Host Inviting */}
          <div className="space-y-3">
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-semibold text-[#72222B] tracking-wide">
              {WEDDING_DATA.hosts.inviter}
            </h2>
            <p className="font-cormorant text-base sm:text-lg text-[#2C1810] max-w-xl mx-auto leading-relaxed italic">
              {WEDDING_DATA.hosts.relationTextNikkah}
            </p>
          </div>

          {/* Groom and Bride Spread */}
          <div className="py-2 space-y-6">
            {/* Groom Details */}
            <div className="space-y-1">
              <h3 className="font-script text-5xl sm:text-7xl text-[#72222B] leading-tight">
                {WEDDING_DATA.couple.groom.name}
              </h3>
              <p className="font-cormorant text-base sm:text-lg text-[#5C4D44] italic">
                (S/o {WEDDING_DATA.couple.groom.father})
              </p>
            </div>

            {/* "With" transition */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 sm:w-16 bg-[#C5A059]/50" />
              <span className="font-cormorant text-xl sm:text-2xl text-[#C5A059] italic">With</span>
              <span className="h-px w-10 sm:w-16 bg-[#C5A059]/50" />
            </div>

            {/* Bride Details */}
            <div className="space-y-1">
              <h3 className="font-script text-5xl sm:text-7xl text-[#72222B] leading-tight">
                {WEDDING_DATA.couple.bride.name}
              </h3>
              <p className="font-cormorant text-base sm:text-lg text-[#5C4D44] italic">
                (D/o {WEDDING_DATA.couple.bride.father})
              </p>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-[#C5A059]">❖</span>
            <span className="w-16 h-px bg-[#C5A059]/40" />
            <span className="text-[#C5A059]">❖</span>
          </div>

          {/* Compliments */}
          <div className="space-y-1 pt-1">
            <p className="font-cinzel text-xs uppercase tracking-widest text-[#72222B] font-semibold">
              With Best Compliments From
            </p>
            <p className="font-cormorant text-base sm:text-lg text-[#2C1810] italic">
              {WEDDING_DATA.hosts.compliments}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
