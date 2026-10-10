import { WeddingEvent } from '../data/weddingData';

/**
 * Generates a Google Calendar event URL
 */
export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', `${event.title} — Moin & Rozmeen`);
  url.searchParams.set('dates', `${event.startIsoUtc}/${event.endIsoUtc}`);
  url.searchParams.set('details', `${event.description}\n\nVenue: ${event.venueName}, ${event.venueAddress}`);
  url.searchParams.set('location', `${event.venueName}, ${event.venueAddress}`);
  return url.toString();
}

/**
 * Generates a Microsoft Outlook Web calendar link
 */
export function getOutlookCalendarUrl(event: WeddingEvent): string {
  const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  url.searchParams.set('subject', `${event.title} — Moin & Rozmeen`);
  url.searchParams.set('startdt', event.startIsoUtc);
  url.searchParams.set('enddt', event.endIsoUtc);
  url.searchParams.set('body', `${event.description}\n\nVenue: ${event.venueName}, ${event.venueAddress}`);
  url.searchParams.set('location', `${event.venueName}, ${event.venueAddress}`);
  return url.toString();
}

/**
 * Generates Yahoo Calendar link
 */
export function getYahooCalendarUrl(event: WeddingEvent): string {
  const url = new URL('https://calendar.yahoo.com/');
  url.searchParams.set('v', '60');
  url.searchParams.set('view', 'd');
  url.searchParams.set('type', '20');
  url.searchParams.set('title', `${event.title} — Moin & Rozmeen`);
  url.searchParams.set('st', event.startIsoUtc);
  url.searchParams.set('et', event.endIsoUtc);
  url.searchParams.set('desc', `${event.description}\n\nVenue: ${event.venueName}, ${event.venueAddress}`);
  url.searchParams.set('in_loc', `${event.venueName}, ${event.venueAddress}`);
  return url.toString();
}

/**
 * Generates and triggers download of a standardized .ics calendar file
 * Compatible with Apple Calendar (macOS, iOS), Outlook Desktop, Google, etc.
 */
export function downloadIcsFile(event: WeddingEvent): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Moin and Rozmeen Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-20261031@moin-rozmeen.wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${event.startIsoUtc}`,
    `DTEND:${event.endIsoUtc}`,
    `SUMMARY:${event.title} — Moin & Rozmeen`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')} Venue: ${event.venueName}, ${event.venueAddress}`,
    `LOCATION:${event.venueName}, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `${event.id}-moin-rozmeen.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
