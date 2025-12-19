import React from 'react';
import Countdown from './Countdown';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-visible">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl text-white flex flex-col items-center gap-6">

        <p className="uppercase tracking-[0.35em] text-sm font-sans opacity-80">
          The Wedding Of
        </p>

        {/* Names */}
        <h1
          className="font-display leading-tight"
          style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)' }}
        >
          Arpit
          <span className="block text-wedding-gold text-[0.6em] my-2">&</span>
          Kalindi
        </h1>

        {/* Divider */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent my-4" />

        <p className="text-xl md:text-2xl font-serif tracking-widest">
          February 7th, 2026
        </p>

        {/* Countdown stays INSIDE flow */}
        <div className="w-full max-w-full overflow-hidden">
          <Countdown />
        </div>

      </div>

      {/* Bottom fade ONLY visual */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wedding-light to-transparent" />
    </section>
  );
};

export default Hero;
