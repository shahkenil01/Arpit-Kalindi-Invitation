// src/types.ts

export interface WeddingDetails {
  bride: string;
  groom: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl: string;
  rsvpDeadline: string;
}

export interface GuestConfig {
  type: "family" | "friends" | "general";
  maxGuests: number;
  label: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  isError?: boolean;
}
