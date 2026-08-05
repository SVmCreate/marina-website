import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRINTS_SERIES } from '../data/portfolioData';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getSanityPrints } from '../lib/sanityQueries';

export const PrintsSection: React.FC = () => {
  const [printsData, setPrintsData] = useState({
    title: 'PRINTS & ARCHIVAL EDITIONS',
    description: 'Museum-grade archival pigment & silver gelatin prints, produced in signed, numbered limited editions.',
    printSeries: PRINTS_SERIES,
  });

  useEffect(() => {
    getSanityPrints().then((res) => {
      if (res) {
        setPrintsData({
          title: res.title || 'PRINTS & ARCHIVAL EDITIONS',
          description: res.description || 'Museum-grade archival pigment & silver gelatin prints, produced in signed, numbered limited editions.',
          printSeries: res.printSeries && res.printSeries.length > 0 ? res.printSeries : PRINTS_SERIES,
        });
      }
    });
  }, []);

  return (
    <section id="prints" className="py-20 md:py-28 px-6 border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] font-light tracking-wide uppercase">
            {printsData.title}
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#666055] max-w-md font-light leading-relaxed">
            {printsData.description}
          </p>
        </div>

        {/* Prints Gallery Grid - 3 Columns with Metadata & Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
          {printsData.printSeries.map((series) => (
            <Link to="/series/same-planet-other-worlds" key={series.id} className="flex flex-col group cursor-pointer block">
              
              {/* Image Frame */}
              <div className="aspect-[3/4] overflow-hidden mb-6 relative shadow-xs">
                <ResponsiveImage 
                  src={series.imageUrl} 
                  alt={series.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Caption & Print Details */}
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="font-serif text-xl text-[#1A1A1A] font-light uppercase">{series.title}</span>
                  <span className="text-[#8A857C] font-mono text-[11px]">{series.year}</span>
                </div>
                
                <p className="text-xs text-[#555046] font-light leading-relaxed pt-1">
                  {series.description}
                </p>
                
                {/* Print Info Line */}
                <div className="pt-2 flex items-center justify-between text-[10px] text-[#8A857C] border-t border-[#EAE6DF] mt-3 font-mono">
                  <span>{series.dimensions}</span>
                  <span className="italic">{series.medium}</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
