import React from 'react';
import Hero from '../components/Hero';
import Venue from '../components/Venue';
import RSVPForm from '../components/RSVPForm';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

interface InvitePageProps {
  type: 'small' | 'family';
}

const InvitePage: React.FC<InvitePageProps> = ({ type }) => {
  return (
    <div className="min-h-screen bg-wedting-light">
      <Hero />
      
      {/* Introduction Card with Premium Design */}
      <section className="px-4 mt-16 relative z-10 mb-16">
        <div className="relative max-w-4xl mx-auto">
          {/* Decorative Corner Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-wedding-gold"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-wedding-gold"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-wedding-gold"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-wedding-gold"></div>
          
          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm p-12 md:p-20 shadow-2xl border border-wedding-cream/50 text-center">
            {/* Decorative Icon */}
            <div className="relative inline-block mb-8">
              <Flower2 className="w-12 h-12 text-wedding-gold animate-pulse-slow" />
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-wedding-accent" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display text-wedting-dark mb-8 leading-tight">
              Together With Our Families
            </h2>
            
            <div className="my-8">
              <Heart className="w-6 h-6 text-wedding-gold mx-auto opacity-80 animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl font-serif text-wedting-brown/80 leading-relaxed max-w-2xl mx-auto mb-6">
              We joyfully invite you to witness and celebrate our union as we embark on this beautiful journey together.
            </p>
            
            <p className="text-lg font-sans text-wedting-sage italic mt-8">
              Your presence is the greatest gift we could ask for
            </p>
          </div>
        </div>
      </section>

      <Venue />

      {/* RSVP Section with Background Pattern */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-wedting-cream/20">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4AF37' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px'
          }}></div>
        </div>
        
        <RSVPForm inviteType={type} />
      </section>

      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-b from-wedting-dark to-black text-wedting-light py-16 text-center overflow-hidden">
        {/* Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent"></div>
        
        <div className="relative z-10">
          <h2 className="font-display text-5xl mb-4 tracking-wider">Arpit & Kalindi</h2>
          <p className="font-sans text-sm tracking-[0.5em] uppercase opacity-60 mb-8">Est. February 7th, 2026</p>
          
          <div className="flex justify-center items-center space-x-8 mt-12 mb-8">
            <div className="w-16 h-px bg-wedding-gold/30"></div>
            <Heart className="w-6 h-6 text-wedding-gold animate-pulse" />
            <div className="w-16 h-px bg-wedding-gold/30"></div>
          </div>
          
          <p className="mt-12 text-xs uppercase tracking-widest opacity-30 font-sans">
            Crafted with love for our forever beginning
          </p>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-wedding-gold/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default InvitePage;