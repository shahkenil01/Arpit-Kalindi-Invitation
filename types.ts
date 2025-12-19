// ===== RSVP FORM STATE =====
export interface RSVPFormData {
  fullName: string;
  attending: 'accept';
  guestCount: number;
}

// ===== DATABASE / ADMIN DATA =====
export interface GuestRSVP {
  id: string;
  fullName: string;
  attending: 'accept';
  guestCount: number;
  inviteType: 'small' | 'family';
  timestamp: number;
}
