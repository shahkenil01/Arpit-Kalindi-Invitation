import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // February 7, 2026
    const weddingDate = new Date('2026-02-07T00:00:00');
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6">
      <span className="text-3xl md:text-5xl font-serif text-wedding-gold font-light">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-wedding-brown mt-2 font-sans">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl text-wedding-gold font-serif -mt-6">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl text-wedding-gold font-serif -mt-6">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl text-wedding-gold font-serif -mt-6">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;