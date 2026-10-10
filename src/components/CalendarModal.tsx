import React, { useEffect } from 'react';
import { WeddingEvent } from '../data/weddingData';
import { getGoogleCalendarUrl, getOutlookCalendarUrl, getYahooCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { X, Calendar as CalendarIcon, Download, ExternalLink, Clock, MapPin, Check } from 'lucide-react';

interface CalendarModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ event, onClose }) => {
  const [downloaded, setDownloaded] = React.useState(false);

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

  const handleAppleDownload = () => {
    downloadIcsFile(event);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
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
        {/* Subtle Decorative Arch Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C5A059] via-[#E8B89C] to-[#C5A059]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#72222B]/70 hover:text-[#72222B] hover:bg-[#E8B89C]/20 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="text-center pt-2">
          <span className="inline-block text-xs uppercase tracking-widest text-[#72222B] font-medium font-cinzel mb-1">
            {event.cardBadge}
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-semibold text-[#2C1810]">
            Save to Calendar
          </h3>
          <p className="font-cormorant text-lg text-[#72222B] italic mt-0.5">
            {event.title} — Moin & Rozmeen
          </p>
        </div>

        {/* Event Quick Details Card */}
        <div className="my-5 p-4 rounded-xl bg-white/70 border border-[#C5A059]/20 shadow-xs space-y-2.5">
          <div className="flex items-start gap-3 text-left">
            <CalendarIcon className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#2C1810]">{event.dateDisplay}</p>
              <p className="text-xs text-[#72222B] italic">{event.hijriDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-left">
            <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#2C1810]">{event.timeDisplay}</p>
              {event.timeNote && (
                <p className="text-xs text-[#5C4D44]">{event.timeNote}</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3 text-left">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#2C1810]">{event.venueName}</p>
              <p className="text-xs text-[#5C4D44] line-clamp-2">{event.venueAddress}</p>
            </div>
          </div>
        </div>

        {/* Calendar Action Buttons */}
        <div className="space-y-2.5">
          {/* Google Calendar */}
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 bg-[#72222B] hover:bg-[#5C1A22] text-white rounded-xl shadow-xs transition-colors group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
              </svg>
              <span className="font-medium text-sm">Google Calendar</span>
            </div>
            <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white" />
          </a>

          {/* Apple / iCalendar (.ics) */}
          <button
            onClick={handleAppleDownload}
            className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-[#FAF7F2] text-[#2C1810] border border-[#C5A059]/40 rounded-xl shadow-xs transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-[#2C1810]" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.9.04-2.02.6-2.67 1.34-.56.64-1.07 1.7-1 2.76 1.01.08 2.05-.48 2.66-1.23z" />
              </svg>
              <span className="font-medium text-sm">Apple / iCalendar (.ics)</span>
            </div>
            {downloaded ? (
              <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <Check className="w-4 h-4" /> Added
              </span>
            ) : (
              <Download className="w-4 h-4 text-[#72222B]/70 group-hover:text-[#72222B]" />
            )}
          </button>

          {/* Microsoft Outlook */}
          <a
            href={getOutlookCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-[#FAF7F2] text-[#2C1810] border border-[#C5A059]/40 rounded-xl shadow-xs transition-colors group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-[#0078D4]" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm0-4H7v-2h5v2zm0-4H7V7h5v2zm5 8h-3V7h3v10z" />
              </svg>
              <span className="font-medium text-sm">Outlook Calendar</span>
            </div>
            <ExternalLink className="w-4 h-4 text-[#72222B]/70 group-hover:text-[#72222B]" />
          </a>

          {/* Yahoo Calendar */}
          <a
            href={getYahooCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2.5 bg-transparent hover:bg-black/5 text-[#5C4D44] rounded-lg transition-colors group text-xs font-medium"
          >
            <span className="text-center w-full">Or open in Yahoo Calendar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
