import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const Venue: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-wedding-light">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Text Details */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-wedding-dark mb-2">
            The Ceremony
          </h2>
          <p className="text-wedding-brown font-sans italic text-lg">
            We can't wait to celebrate with you.
          </p>
          
          <div className="space-y-8 mt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-wedding-cream flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-wedding-dark" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-wedding-dark">
                  Saturday, February 7th, 2026
                </h3>
                <p className="text-wedding-brown font-sans mt-1">
                  Ganesh Sthapana: 6:30 AM <br />
                  Haldi: 7:30 PM <br />
                  Grah Shanti: 9:30 PM <br />
                  Dinner & Reception: 12:30 PM
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-wedding-cream flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-wedding-dark" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-wedding-dark">
                  Laxmikant Wadi
                </h3>
                <p className="text-wedding-brown font-sans mt-1">
                  Laxmikant Society Ni Wadi, Near Vadla Circle, <br />
                  Gajera Road, Katargam, Surat, Gujarat, 395004.
                </p>
                <a
                  href="https://maps.app.goo.gl/2LyjmUYnCJSmVnE69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm border-b border-wedding-gold text-wedding-gold hover:text-wedding-dark transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
          <iframe
            title="Laxmikant Wadi Location"
            src="https://www.google.com/maps?q=Laxmikant+Wadi+Katargam+Surat&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
};

export default Venue;
