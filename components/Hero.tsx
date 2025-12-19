import React from 'react';
import Countdown from './Countdown';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Parallax-like feel (fixed) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale&blur=2")',
        }}
      >
        {/* Dark Overlay for text readability (increased opacity for better contrast with new green theme if needed, staying with black/40 is safe) */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <p className="text-sm md:text-lg uppercase tracking-[0.3em] mb-4 opacity-0 animate-slide-up font-sans">
          The Wedding Of
        </p>
        
        <h1 className="text-5xl md:text-8xl font-serif mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Arpit & Kalindi
        </h1>
        
        <div className="w-24 h-[1px] bg-white/50 mx-auto my-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
        
        <p className="text-xl md:text-2xl font-light tracking-wide mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          February 7th, 2026
        </p>

        <Countdown />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;