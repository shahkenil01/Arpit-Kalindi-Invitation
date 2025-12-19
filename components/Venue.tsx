import React from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

const Venue: React.FC = () => {
  const events = [
    { time: '6:30 AM', title: 'Ganesh Sthapana', icon: '🕉️' },
    { time: '7:30 PM', title: 'Haldi Ceremony', icon: '💛' },
    { time: '9:30 PM', title: 'Grah Shanti Puja', icon: '🪔' },
    { time: '12:30 PM', title: 'Dinner & Reception', icon: '🎉' },
  ];

  return (
    <section className="py-2 px-4 bg-wedting-light relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gold-gradient rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-wedding-gold"></div>
            <span className="mx-4 text-wedding-gold uppercase tracking-widest text-sm font-sans">The Celebration</span>
            <div className="w-12 h-px bg-wedding-gold"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-display text-wedting-dark mb-6">
            Wedding <span className="text-wedding-gold">Ceremony</span>
          </h2>
          <p className="text-xl font-serif text-wedting-brown/80 max-w-2xl mx-auto">
            Join us as we exchange vows and celebrate our eternal bond
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Details */}
          <div className="space-y-10">
            {/* Date Card */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-7 h-7 text-wedding-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-wedting-dark mb-2">Date & Time</h3>
                  <p className="font-serif text-lg text-wedting-brown mb-3">
                    Saturday, February 7th, 2026
                  </p>
                  <div className="flex items-center text-wedting-sage">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-sans">6:30 AM Onwards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Card */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7 text-wedding-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-wedting-dark mb-2">Venue</h3>
                  <p className="font-serif text-lg text-wedting-brown mb-2">
                    Laxmikant Wadi
                  </p>
                  <p className="font-sans text-wedting-brown/70 text-sm leading-relaxed mb-4">
                    Laxmikant Society Ni Wadi, Near Vadla Circle,<br />
                    Gajera Road, Katargam, Surat, Gujarat, 395004.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/2LyjmUYnCJSmVnE69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-wedding-gold hover:text-wedting-dark transition-colors group"
                  >
                    <span className="font-sans text-sm border-b border-wedding-gold/30 group-hover:border-wedting-dark">
                      Get Directions
                    </span>
                    <MapPin className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Events Timeline */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-wedding-cream">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/10 flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7 text-wedding-gold" />
                </div>
                <h3 className="font-display text-2xl text-wedting-dark">Day Schedule</h3>
              </div>
              
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-wedting-cream/30 rounded-lg transition-colors">
                    <div className="w-16 text-center">
                      <span className="font-display text-xl text-wedting-dark">{event.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{event.icon}</span>
                        <span className="font-serif text-lg text-wedting-brown">{event.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="sticky top-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-wedding-cream">
              {/* Map Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-wedting-dark to-black/90 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-wedding-gold" />
                    <span className="font-sans">Wedding Venue Location</span>
                  </div>
                  <span className="text-xs bg-wedding-gold/20 px-3 py-1 rounded-full">Surat, Gujarat</span>
                </div>
              </div>
              
              {/* Map */}
              <div className="h-[500px] w-full">
                <iframe
                  title="Laxmikant Wadi Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.068069064751!2d72.83112331540271!3d21.15080858821384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f0d6e8e3c9d%3A0x8f1b6b6b6b6b6b6b!2sLaxmikant%20Wadi%2C%20Katargam%2C%20Surat%2C%20Gujarat%20395004!5e0!3m2!1sen!2sin!4v1641234567890!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              
              {/* Map Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 text-center">
                <p className="font-sans text-sm">
                  <span className="text-wedding-gold">📍</span> Parking available on premises
                </p>
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