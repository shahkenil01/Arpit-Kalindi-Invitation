import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const weddingDate = new Date('2026-02-07T06:30:00');
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔧 MOBILE SAFE Time Unit
  const TimeUnit: React.FC<{ value: number; label: string; isHighlighted?: boolean }> = ({
    value,
    label,
    isHighlighted = false,
  }) => (
    <div className="flex flex-col items-center mx-1 md:mx-4">
      <div className="relative">
        {/* Glow */}
        <div
          className={`absolute inset-0 rounded-lg ${
            isHighlighted
              ? 'bg-gradient-to-br from-wedding-gold to-wedding-accent blur-md opacity-60'
              : 'bg-wedding-gold/10 blur'
          }`}
        />

        {/* Box */}
        <div
          className={`relative w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center ${
            isHighlighted
              ? 'bg-gradient-to-br from-wedding-gold to-wedding-accent text-white'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <span className="text-xl md:text-4xl font-display font-bold">
            {isClient ? value.toString().padStart(2, '0') : '00'}
          </span>

          {isHighlighted && (
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 text-white animate-pulse" />
          )}
        </div>
      </div>

      <span
        className={`text-[10px] md:text-sm uppercase tracking-widest mt-2 font-sans ${
          isHighlighted ? 'text-wedding-gold font-semibold' : 'text-white/80'
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full overflow-hidden">
      {/* Title */}
      <div className="text-center mb-6 px-4">
        <p className="text-base md:text-lg font-serif text-white/90">
          Counting down to forever
        </p>
      </div>

      {/* Units – MOBILE WRAP SAFE */}
      <div className="flex justify-center gap-2 md:gap-4 flex-wrap px-2">
        <TimeUnit value={timeLeft.days} label="Days" isHighlighted />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      {/* Days to go */}
      <div className="text-center mt-6 px-4">
        <p className="text-xs md:text-sm text-white/70 tracking-widest uppercase">
          {timeLeft.days} days to go
        </p>
      </div>

      {/* Quote */}
      <div className="text-center mt-6 px-4">
        <p className="text-white/60 font-serif italic text-sm md:text-lg max-w-xl mx-auto">
          "Every moment brings us closer to the beginning of forever"
        </p>
      </div>
    </div>
  );
};

export default Countdown;
