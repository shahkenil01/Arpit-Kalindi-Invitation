import React, { useState } from 'react';
import { RSVPFormData } from '../types';
import { saveRSVP } from '../services/storage';

interface RSVPFormProps {
  inviteType: 'small' | 'family';
}

const RSVPForm: React.FC<RSVPFormProps> = ({ inviteType }) => {
  const maxGuests = inviteType === 'family' ? 6 : 2;

  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    email: '',
    attending: 'accept', // AUTO accept
    guestCount: 1,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveRSVP({
        fullName: formData.fullName,
        email: formData.email,
        attending: 'accept',
        guestCount: Number(formData.guestCount),
        message: formData.message,
        inviteType,
      });
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto bg-white p-12 text-center rounded-sm shadow-2xl border-t-4 border-wedding-gold">
        <h3 className="text-3xl font-serif text-wedding-dark mb-4">Thank You!</h3>
        <p className="text-wedding-brown mb-6">
          Your response has been recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-sm -mt-20 mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-wedding-dark mb-3">
          R.S.V.P
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border-b py-2 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider mb-1">
            Email / Mobile
          </label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b py-2 outline-none"
          />
        </div>

        {/* Guests – ALWAYS visible */}
        <div>
          <label className="block text-xs uppercase tracking-wider mb-1">
            Number of Guests
          </label>
          <select
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full border-b py-2 outline-none"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <p className="text-xs mt-1 text-wedding-gold italic">
            {inviteType === 'family'
              ? 'Family Invite: Up to 6 guests'
              : 'Small Invite: Up to 2 guests'}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-wedding-dark text-white py-4 uppercase tracking-widest"
        >
          {isSubmitting ? 'Sending...' : 'Confirm RSVP'}
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
