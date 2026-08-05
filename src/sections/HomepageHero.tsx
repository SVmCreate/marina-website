import React from 'react';
import { HERO_IMAGE_URL } from '../data/portfolioData';
import { ResponsiveImage } from '../components/ResponsiveImage';

export const HomepageHero: React.FC = () => {
  return (
    <section id="hero" className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Vertical Photograph Container */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-[440px] shadow-sm transition-all duration-300 group">
          <div className="aspect-[3/4] overflow-hidden relative">
            <ResponsiveImage 
              src={HERO_IMAGE_URL} 
              alt="Silence & Light, 2025 by Marina"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Caption Below Image (Never Overlaid) */}
        <div className="mt-8 md:mt-12 text-center max-w-lg px-4 space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em] text-[#1A1A1A] font-light">
            SILENCE & LIGHT, 2025
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#555046] tracking-wide leading-relaxed font-light">
            An exploration of architectural form, shadow, and quiet human presence in Mediterranean light.
          </p>
          
          <div className="pt-2 text-[10px] uppercase tracking-[0.2em] text-[#8A857C]">
            Series N° 04 · Archival Pigment Print
          </div>
        </div>

      </div>
    </section>
  );
};
