export interface WeddingEvent {
  id: 'nikkah' | 'walima';
  title: string;
  cardBadge: string;
  subtitle: string;
  dateDisplay: string;
  dayOfWeek: string;
  hijriDate: string;
  timeDisplay: string;
  timeNote?: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  startIsoUtc: string; // for calendar format: YYYYMMDDTHHmmssZ
  endIsoUtc: string;
  description: string;
}

export const WEDDING_DATA = {
  couple: {
    groom: {
      name: "Moin",
      fullName: "Moin Pathan",
      father: "Mr. Noorkhan Munirkhan Pathan",
      grandfather: "Late Mr. Munirkhan Pathan",
    },
    bride: {
      name: "Rozmeen",
      fullName: "Rozmeen Beldar",
      father: "Mr. Rahim Shaikh Chand Beldar",
    },
  },
  hosts: {
    inviter: "Late Mr. Munirkhan Pathan",
    relationTextNikkah: "request the pleasure of your company with family & friends at the auspicious occasion of the Nikaah ceremony of his beloved Grandson",
    relationTextWalima: "request the pleasure of your company with family & friends at the auspicious occasion of the Reception ceremony of his beloved Grandson",
    compliments: "Pathan Family, all Relatives, Friends & Well Wishers",
  },
  events: [
    {
      id: 'nikkah' as const,
      title: "Nikaah Ceremony",
      cardBadge: "❖ NIKAAH ❖",
      subtitle: "The Sacred Covenant",
      dateDisplay: "Saturday, 31st October 2026",
      dayOfWeek: "Saturday",
      hijriDate: "19th Jamaadil Awwal 1448 Hijri",
      timeDisplay: "11:00 AM",
      timeNote: "Insha Allah at 11 am",
      venueName: "Veer Lahuji Wastad Hall",
      venueAddress: "Sr. No 12, Laxmi Nagar, Near Urdu School, Yerwada Pune - 411 006",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Veer+Lahuji+Wastad+Hall,+Sr.+No+12,+Laxmi+Nagar,+Near+Urdu+School,+Yerwada,+Pune+411006",
      startIsoUtc: "20261031T053000Z", // 11:00 AM IST = 05:30 UTC
      endIsoUtc: "20261031T083000Z",   // 02:00 PM IST = 08:30 UTC
      description: "Nikaah ceremony of Moin (S/o Mr. Noorkhan Munirkhan Pathan) and Rozmeen (D/o Mr. Rahim Shaikh Chand Beldar). Insha Allah on Saturday 31st October 2026 (19th Jamaadil Awwal 1448 Hijri) at 11 am.",
    },
    {
      id: 'walima' as const,
      title: "Dawat -E- Walima",
      cardBadge: "❖ WALIMA (RECEPTION) ❖",
      subtitle: "The Auspicious Celebration",
      dateDisplay: "Sunday, 01st November 2026",
      dayOfWeek: "Sunday",
      hijriDate: "20th Jamaadil Awwal 1448 Hijri",
      timeDisplay: "7:00 PM Onwards",
      timeNote: "Baad Namaz-E-Magrib 7.00 pm onwards",
      venueName: "Husenshah Baba Dargah Hall",
      venueAddress: "Mental Corner, Opp. Commerzone, Vishrantwadi, Pune - 6",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Husenshah+Baba+Dargah+Hall,+Mental+Corner,+Opp.+Commerzone,+Vishrantwadi,+Pune+411006",
      startIsoUtc: "20261101T133000Z", // 07:00 PM IST = 13:30 UTC
      endIsoUtc: "20261101T173000Z",   // 11:00 PM IST = 17:30 UTC
      description: "Dawat-E-Walima (Reception) ceremony of Moin & Rozmeen. Inshaallah On Sunday 01st November 2026 (20th Jamaadil Awwal 1448 Hijri) Baad Namaz-E-Magrib 7.00 pm onwards.",
    },
  ],
  residence: {
    address: "Sr. No. 10, Kamrajnagar, Near Noorani Masjid, Yerwada Pune - 411006",
    phone: "7888192744",
    phoneDisplay: "+91 78881 92744",
  },
  blessing: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.",
    surah: "Surah Ar-Rum 30:21",
  },
  bismillah: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "In the name of Allah, the most Gracious, the most Merciful",
  },
};
