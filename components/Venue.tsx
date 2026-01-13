import React from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

const Venue: React.FC = () => {
  const events = [
    { time: '7:30 AM', title: 'Ganesh Sthapana', icon: 'ॐ' },
    { time: '8:00 AM', title: 'Mandap Muhurat', icon: '🕉️' },
    { time: '9:30 AM', title: 'Grah Shanti Puja', icon: '🪔' },
    { time: '10:00 AM', title: 'Haldi Ceremony', icon: '💛' },
    { time: '11:30 AM', title: 'Dinner', icon: '🍴' }
  ];

  return (
    <section className="py-2 px-4 bg-wedting-light relative">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display text-wedting-dark mb-6">
            Wedding <span className="text-wedding-gold">Functions</span>
          </h2>
          <p className="text-xl font-serif text-wedting-brown/80">
            Join us as we exchange vows and celebrate our eternal bond
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <div className="space-y-10">

            {/* Date */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-wedding-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-wedting-dark mb-2">
                    Date & Time
                  </h3>
                  <p className="font-serif text-lg text-wedting-brown">
                    Saturday, February 7th, 2026
                  </p>
                  <div className="flex items-center text-wedting-sage mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-sans">8:00 AM Onwards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-wedding-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-wedting-dark mb-2">
                    Venue
                  </h3>
                  <p className="font-serif text-lg text-wedting-brown">
                    Laxmikant Wadi
                  </p>
                  <p className="font-sans text-wedting-brown/70 text-sm mt-1">
                    Laxmikant Society Ni Wadi, Near Vadla Circle,<br />
                    Gajera Road, Katargam, Surat, Gujarat, 395004
                  </p>
                  <a
                    href="https://maps.app.goo.gl/2LyjmUYnCJSmVnE69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-wedding-gold border-b border-wedding-gold/40 hover:text-wedting-dark"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream">
              <div className="flex items-center space-x-6 mb-6">
                <Users className="w-7 h-7 text-wedding-gold" />
                <h3 className="font-display text-2xl text-wedting-dark">
                  Day Schedule
                </h3>
              </div>
              <div className="space-y-4">
                {events.map((e, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <span className="w-20 font-display text-wedting-dark">
                      {e.time}
                    </span>
                    <span className="text-2xl">{e.icon}</span>
                    <span className="font-serif text-wedting-brown">
                      {e.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – MAP */}
          <div className="sticky top-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-wedding-cream">

              {/* Header */}
              <div className="bg-black/90 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  <span className="font-sans text-sm">Venue Location</span>
                </div>
                <span className="text-xs bg-wedding-gold/20 px-3 py-1 rounded-full">
                  Satellite View
                </span>
              </div>

              {/* SATELLITE MAP */}
              <div className="h-[500px] w-full">
                <iframe
                  title="Laxmikant Wadi Satellite Map"
                  src="https://maps.google.com/maps?q=Laxmikant%20Wadi%20Katargam%20Surat&t=k&z=18&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Footer */}
              <div className="bg-black/80 text-white text-center p-3 text-sm">
                📍 Laxmikant Wadi, Katargam – Surat
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-wedding-cream">
              <h4 className="font-display text-xl text-wedting-dark mb-4">Important Notes</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-wedding-gold"></div>
                  <span className="font-sans text-wedting-brown/80">Traditional Indian attire preferred</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-wedding-gold"></div>
                  <span className="font-sans text-wedting-brown/80">Flowers and blessings welcome</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-wedding-gold"></div>
                  <span className="font-sans text-wedting-brown/80">Valet parking available</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Venue;
