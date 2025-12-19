import { GuestRSVP } from '../types';

export const saveRSVP = async (data: GuestRSVP) => {
  const res = await fetch('/.netlify/functions/saveRSVP', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to save RSVP');
  }
};

export const getRSVPs = async (): Promise<GuestRSVP[]> => {
  const res = await fetch('/.netlify/functions/getRSVPs');
  return res.json();
};
