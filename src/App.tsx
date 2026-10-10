/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WEDDING_DATA, WeddingEvent } from './data/weddingData';
import { Hero } from './components/Hero';
import { FamilyInvitation } from './components/FamilyInvitation';
import { NikkahSection } from './components/NikkahSection';
import { WalimaSection } from './components/WalimaSection';
import { QuranicBlessing } from './components/QuranicBlessing';
import { ClosingInvitation } from './components/ClosingInvitation';
import { CalendarModal } from './components/CalendarModal';
import { LocationModal } from './components/LocationModal';
import { AudioAmbience } from './components/AudioAmbience';
import { FallingPetals } from './components/FallingPetals';

export default function App() {
  const [calendarEvent, setCalendarEvent] = useState<WeddingEvent | null>(null);
  const [locationEvent, setLocationEvent] = useState<WeddingEvent | null>(null);
  const [showPetals, setShowPetals] = useState(true);

  const nikkahEvent = WEDDING_DATA.events.find((e) => e.id === 'nikkah')!;
  const walimaEvent = WEDDING_DATA.events.find((e) => e.id === 'walima')!;

  const handleQuickSave = (eventId: 'nikkah' | 'walima') => {
    const selected = WEDDING_DATA.events.find((e) => e.id === eventId);
    if (selected) {
      setCalendarEvent(selected);
    }
  };

  const scrollToInvitation = () => {
    const element = document.getElementById('invitation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col paper-pattern selection:bg-[#E8B89C]/30 selection:text-[#72222B] relative">
      {/* Falling Flowers & Hearts Shower when scrolling */}
      {showPetals && <FallingPetals />}

      {/* 1. Cinematic Hero */}
      <Hero
        onExploreClick={scrollToInvitation}
        onQuickSaveDate={handleQuickSave}
      />

      {/* 2. Family & Grandfather Invitation */}
      <FamilyInvitation />

      {/* 3. Nikkah Ceremony Spread */}
      <NikkahSection
        event={nikkahEvent}
        onDateClick={(ev) => setCalendarEvent(ev)}
        onLocationClick={(ev) => setLocationEvent(ev)}
      />

      {/* 4. Walima (Reception) Ceremony Spread */}
      <WalimaSection
        event={walimaEvent}
        onDateClick={(ev) => setCalendarEvent(ev)}
        onLocationClick={(ev) => setLocationEvent(ev)}
      />

      {/* 5. Islamic / Quranic Blessing */}
      <QuranicBlessing />

      {/* 6. Closing Invitation, Residence & RSVP Contact */}
      <ClosingInvitation />

      {/* Interactive Calendar Modal (Triggered by clicking any event date) */}
      <CalendarModal
        event={calendarEvent}
        onClose={() => setCalendarEvent(null)}
      />

      {/* Interactive Location / Venue Modal */}
      <LocationModal
        event={locationEvent}
        onClose={() => setLocationEvent(null)}
      />

      {/* Subtle Melodic Audio Ambience & Petals Toggle */}
      <AudioAmbience
        showPetals={showPetals}
        onTogglePetals={() => setShowPetals((prev) => !prev)}
      />
    </main>
  );
}
