import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Phone, MessageSquare, Home, Heart } from 'lucide-react';

export const ClosingInvitation: React.FC = () => {
  return (
    <footer className="relative py-20 px-4 bg-[#2C1810] text-[#FAF7F2] overflow-hidden">
      {/* Delicate gold pattern top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A059] via-[#E8B89C] to-[#C5A059]" />

      <div className="max-w-3xl mx-auto text-center space-y-12">
        {/* Couple Signature Monogram */}
        <div className="space-y-3">
          <p className="font-script text-6xl sm:text-7xl text-[#E8B89C] leading-none">
            Moin & Rozmeen
          </p>
          <p className="font-cormorant text-sm uppercase tracking-[0.3em] text-[#C5A059]">
            Begin Their New Journey Together
          </p>
        </div>

        {/* Residence & Contact Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-[#C5A059]/30 backdrop-blur-xs space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8B89C] font-cinzel">
              <Home className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>: Residence :</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-stone-200 max-w-lg mx-auto leading-relaxed">
              {WEDDING_DATA.residence.address}
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:+91${WEDDING_DATA.residence.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#72222B] hover:bg-[#8B2C37] text-white text-xs font-cinzel tracking-wider transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-200" />
              <span>Call: {WEDDING_DATA.residence.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/91${WEDDING_DATA.residence.phone}?text=Congratulations%20on%20the%20Nikaah%20and%20Walima%20of%20Moin%20and%20Rozmeen!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-cinzel tracking-wider transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
              <span>Send WhatsApp Wish</span>
            </a>
          </div>
        </div>

        {/* Compliments */}
        <div className="space-y-2 pt-2">
          <p className="font-cinzel text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            With Best Compliments From
          </p>
          <p className="font-cormorant text-xl sm:text-2xl text-stone-200 italic font-medium">
            {WEDDING_DATA.hosts.compliments}
          </p>
        </div>

        {/* Closing Warm Note */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-stone-400 font-sans">
          <span>Prayers & Warm Regards</span>
          <Heart className="w-3 h-3 text-[#E8B89C] fill-current" />
          <span>Pune · 2026</span>
        </div>
      </div>
    </footer>
  );
};
