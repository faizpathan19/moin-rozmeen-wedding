import React, { useState, useEffect } from 'react';
import { WeddingEvent } from '../data/weddingData';
import { X, MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

interface LocationModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ event, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1511]/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#C5A059]/40 overflow-hidden p-6 sm:p-8 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C5A059] via-[#E8B89C] to-[#C5A059]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#72222B]/70 hover:text-[#72222B] hover:bg-[#E8B89C]/20 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <span className="inline-block text-xs uppercase tracking-widest text-[#72222B] font-medium font-cinzel mb-1">
            {event.cardBadge} Venue
          </span>
          <h3 className="font-cinzel text-2xl font-semibold text-[#2C1810]">
            {event.venueName}
          </h3>
          <p className="font-cormorant text-base text-[#5C4D44] mt-1">
            Pune, Maharashtra
          </p>
        </div>

        <div className="my-6 p-4 rounded-xl bg-white border border-[#C5A059]/20 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#72222B] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-0.5">Exact Address</p>
              <p className="text-sm text-[#2C1810] leading-relaxed font-sans">{event.venueAddress}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#72222B] hover:bg-[#5C1A22] text-white font-medium text-sm rounded-xl shadow-xs transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#FAF7F2] text-[#2C1810] border border-[#C5A059]/40 rounded-xl font-medium text-sm transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Address Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#72222B]" />
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
