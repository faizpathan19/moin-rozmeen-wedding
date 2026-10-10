import React from 'react';
import { WeddingEvent } from '../data/weddingData';
import floralBorder from '../assets/images/peach_roses_border_1791486333711.jpg';
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';
import { ScratchCard } from './ScratchCard';

interface NikkahSectionProps {
  event: WeddingEvent;
  onDateClick: (event: WeddingEvent) => void;
  onLocationClick: (event: WeddingEvent) => void;
}

export const NikkahSection: React.FC<NikkahSectionProps> = ({
  event,
  onDateClick,
  onLocationClick,
}) => {
  return (
    <section id="nikkah" className="relative py-20 px-4 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Luxury Invitation Spread */}
        <div className="relative bg-[#FFFFFF] rounded-3xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-12 md:p-16 overflow-hidden">
          {/* Subtle Top Floral Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 opacity-30 pointer-events-none overflow-hidden">
            <img
              src={floralBorder}
              alt="Blush floral garland"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFFFFF]" />
          </div>

          <div className="relative z-10 text-center space-y-8">
            {/* Header Badge */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#72222B] font-semibold font-cinzel">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                {event.cardBadge}
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              </span>
              <h2 className="font-script text-6xl sm:text-7xl md:text-8xl text-[#72222B] leading-none">
                Nikaah Ceremony
              </h2>
              <p className="font-cormorant text-base sm:text-lg text-[#5C4D44] italic">
                Insha Allah on the auspicious occasion
              </p>
            </div>

            {/* Central Interactive Clickable Date with Gold Foil Scratch Card */}
            <div className="py-2">
              <ScratchCard
                eventId="nikkah"
                eventTitle="Nikaah Ceremony"
              >
                <button
                  type="button"
                  onClick={() => onDateClick(event)}
                  className="group relative block w-full p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] hover:bg-[#F5EFE6] border border-[#C5A059]/40 transition-all duration-300 shadow-xs cursor-pointer text-center"
                  aria-label="Click to save Nikaah date to calendar"
                >
                  {/* Visual tap hint badge */}
                  <div className="flex items-center justify-center gap-1.5 text-xs font-cinzel text-[#72222B] tracking-wider mb-2">
                    <Calendar className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                    <span className="underline decoration-[#C5A059]/60 underline-offset-4 group-hover:decoration-[#72222B]">
                      Tap Date to Add to Calendar
                    </span>
                  </div>

                  {/* Primary Date Text */}
                  <div className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2C1810] tracking-wide group-hover:text-[#72222B] transition-colors">
                    {event.dateDisplay}
                  </div>

                  {/* Hijri Date Display from Card */}
                  <p className="font-cormorant text-lg sm:text-xl text-[#72222B] italic mt-1 font-medium">
                    ({event.hijriDate})
                  </p>

                  {/* Time Display */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm sm:text-base text-[#5C4D44]">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-medium text-[#2C1810]">at 11:00 AM</span>
                  </div>
                </button>
              </ScratchCard>
            </div>

            {/* Venue & Location Spread */}
            <div className="max-w-xl mx-auto space-y-4 pt-2">
              <div className="space-y-1">
                <p className="font-cinzel text-xs uppercase tracking-widest text-[#72222B] font-semibold">
                  -: Venue :-
                </p>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2C1810]">
                  {event.venueName}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#5C4D44] leading-relaxed pt-1">
                  {event.venueAddress}
                </p>
              </div>

              {/* View Location Action */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#72222B] hover:bg-[#5C1A22] text-white font-cinzel text-xs uppercase tracking-widest rounded-xl shadow-xs transition-colors group"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
                  <span>View Location on Map</span>
                </a>

                <button
                  onClick={() => onLocationClick(event)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#FAF7F2] text-[#2C1810] border border-[#C5A059]/40 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#72222B]" />
                  <span>Venue Info & Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

