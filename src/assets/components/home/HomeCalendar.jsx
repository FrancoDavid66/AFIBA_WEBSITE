import React from "react";

import video1 from "../../videos/sponsors/america_force/video1.mp4";
import video2 from "../../videos/sponsors/america_force/video2.mp4";
import image1 from "../../imgs/sponsors/americaForce2.jpg";
import image2 from "../../imgs/sponsors/americaForce3.jpg";

const HomeSponsors = () => {
  const isMobileOrTablet = window.innerWidth <= 768;
  const sponsors = [{ v: video1, i: image1 }, { v: video2, i: image2 }];

  return (
    <section className="relative w-full bg-[#050505] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
          Main Sponsors
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {sponsors.map((sponsor, idx) => (
            <div key={idx} className="relative h-24 md:h-32 rounded-xl overflow-hidden bg-black/50 border border-white/5 group cursor-pointer">
              {isMobileOrTablet ? (
                <img
                  src={sponsor.i}
                  alt={`Sponsor ${idx + 1}`}
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <video
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  loop muted autoPlay playsInline
                >
                  <source src={sponsor.v} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;