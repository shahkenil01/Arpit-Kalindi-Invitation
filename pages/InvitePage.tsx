import React from 'react';
import Hero from '../components/Hero';
import Venue from '../components/Venue';
import RSVPForm from '../components/RSVPForm';
import { Heart } from 'lucide-react';

interface InvitePageProps {
  type: 'small' | 'family';
}

const InvitePage: React.FC<InvitePageProps> = ({ type }) => {
  return (
    <div className="min-h-screen bg-wedding-light">
      <Hero />
      
      {/* Introduction Card */}
      <section className="px-4 -mt-20 relative z-10 mb-20">
        <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 shadow-xl text-center">
          <Heart className="w-8 h-8 text-wedding-gold mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif text-wedding-dark mb-6 leading-tight">
            Together with their families,
          </h2>
          <p className="text-lg md:text-xl font-light text-wedding-brown leading-relaxed max-w-xl mx-auto font-sans">
            We joyfully invite you to share in our happiness as we unite in marriage. Your presence would mean the world to us.
          </p>
        </div>
      </section>

      <Venue />

      <section className="bg-wedding-cream/30 pt-20 pb-10 px-4">
        <RSVPForm inviteType={type} />
      </section>

      <footer className="bg-wedding-dark text-wedding-light py-12 text-center">
        <h2 className="font-serif text-3xl mb-2">Arpit & Kalindi</h2>
        <p className="font-sans text-xs tracking-widest opacity-60">EST. 2025</p>
        <p className="mt-8 text-[10px] opacity-30 font-sans">Designed with ❤️ for our special day</p>
      </footer>
    </div>
  );
};

export default InvitePage;