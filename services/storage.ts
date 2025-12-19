import { GuestRSVP } from '../types';

const STORAGE_KEY = 'wedding_rsvps';

export const saveRSVP = async (data: Omit<GuestRSVP, 'id' | 'timestamp'>): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const newRSVP: GuestRSVP = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  const existingData = getRSVPs();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingData, newRSVP]));
};

export const getRSVPs = (): GuestRSVP[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};