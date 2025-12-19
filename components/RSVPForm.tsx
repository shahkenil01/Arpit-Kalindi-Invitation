import React, { useState } from 'react';
import { RSVPFormData } from '../types';
import { saveRSVP } from '../services/storage';
import { CheckCircle, Mail, User, Users, MessageSquare } from 'lucide-react';

interface RSVPFormProps {
  inviteType: 'small' | 'family';
}

const RSVPForm: React.FC<RSVPFormProps> = ({ inviteType }) => {
  const maxGuests = inviteType === 'family' ? 6 : 2;

  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    email: '',
    attending: 'accept',
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
      <div className="relative max-w-xl mx-auto">
        {/* Success Animation Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/10 via-transparent to-wedding-accent/10 rounded-2xl"></div>
        
        <div className="relative bg-white/95 backdrop-blur-sm p-16 text-center rounded-2xl shadow-2xl border border-wedding-cream">
          {/* Animated Checkmark */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-wedding-gold to-wedding-accent rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 border-4 border-wedding-gold/30 rounded-full animate-ping"></div>
          </div>
          
          <h3 className="text-4xl font-display text-wedting-dark mb-6">Thank You!</h3>
          <p className="text-xl font-serif text-wedting-brown mb-8">
            Your presence confirmation has been received. We're thrilled to celebrate with you!
          </p>
          
          <div className="inline-flex items-center space-x-2 text-wedding-gold">
            <div className="w-8 h-px bg-wedding-gold"></div>
            <span className="font-sans uppercase tracking-widest text-sm">See You Soon</span>
            <div className="w-8 h-px bg-wedding-gold"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Form Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-12 h-px bg-wedding-gold"></div>
          <span className="mx-4 text-wedding-gold uppercase tracking-widest text-sm font-sans">Kindly Respond</span>
          <div className="w-12 h-px bg-wedding-gold"></div>
        </div>
        <h2 className="text-5xl font-display text-wedting-dark mb-4">
          R.S.V.P
        </h2>
        <p className="text-lg font-serif text-wedting-brown/80">
          Please confirm your attendance by{' '}
          <span className="font-serif font-normal text-wedding-dark tracking-wide">
            February <span className="text-wedding-gold">1</span><sup className="text-xs">st</sup>, 2026
          </span>
        </p>
      </div>

      {/* Form Container */}
      <div className="relative bg-white/95 backdrop-blur-sm p-8 md:p-12 pb-12 md:pb-16 rounded-2xl shadow-2xl border border-wedding-cream">
        {/* Decorative Corner */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/50"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/50"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-wedding-gold/50"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold/50"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div className="group">
            <label className="flex items-center text-sm uppercase tracking-wider mb-3 text-wedting-dark/70">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-0 py-4 border-b-2 border-wedding-cream focus:border-wedding-gold outline-none transition-all duration-300 bg-transparent text-lg font-serif"
            />
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="flex items-center text-sm uppercase tracking-wider mb-3 text-wedting-dark/70">
              <Mail className="w-4 h-4 mr-2" />
              Email / Mobile
            </label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email or mobile number"
              className="w-full px-0 py-4 border-b-2 border-wedding-cream focus:border-wedding-gold outline-none transition-all duration-300 bg-transparent text-lg font-serif"
            />
          </div>

          {/* Guests Field */}
          <div className="group">
            <label className="flex items-center text-sm uppercase tracking-wider mb-3 text-wedting-dark/70">
              <Users className="w-4 h-4 mr-2" />
              Number of Guests
            </label>
            <div className="relative">
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full px-0 py-2 border-b-2 border-wedding-cream focus:border-wedding-gold outline-none transition-all duration-300 bg-transparent font-sans tracking-wide appearance-none"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>
                    {n} Guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className={`text-sm mt-2 font-sans ${inviteType === 'family' ? 'text-wedding-gold' : 'text-wedding-sage'}`}>
              {inviteType === 'family'
                ? '🎉 Family Invite: Up to 6 guests welcome'
                : '💫 Small Invite: Up to 2 guests welcome'}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full bg-gradient-to-r from-wedding-dark to-black text-white py-3 uppercase tracking-widest text-lg font-sans rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-2xl md:hover:scale-[1.02]"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Your Response...
                </>
              ) : (
                'Confirm Your Attendance'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVPForm;