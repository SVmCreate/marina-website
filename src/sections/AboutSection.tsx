import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ABOUT_PORTRAIT_URL, ABOUT_GALLERY_URL, EXHIBITIONS_DATA } from '../data/portfolioData';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getSanityAbout } from '../lib/sanityQueries';

export const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState({
    title: "MARINA VALITOVA DIDN'T SET OUT TO BECOME AN ARTIST.",
    portraitImageUrl: ABOUT_PORTRAIT_URL,
    galleryImageUrl: ABOUT_GALLERY_URL,
    exhibitions: EXHIBITIONS_DATA,
  });

  useEffect(() => {
    getSanityAbout().then((res) => {
      if (res) {
        setAboutData({
          title: res.title || "MARINA VALITOVA DIDN'T SET OUT TO BECOME AN ARTIST.",
          portraitImageUrl: res.portraitImageUrl || ABOUT_PORTRAIT_URL,
          galleryImageUrl: res.galleryImageUrl || ABOUT_GALLERY_URL,
          exhibitions: res.exhibitions && res.exhibitions.length > 0 ? res.exhibitions : EXHIBITIONS_DATA,
        });
      }
    });
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 px-6 space-y-24 md:space-y-36 max-w-6xl mx-auto">
      
      {/* BLOCK ONE (Two-column layout - First to appear on page) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left: Vertical Portrait Image (Sticky on Desktop) */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24 space-y-2">
            <div className="overflow-hidden shadow-xs relative rounded-xs">
              <ResponsiveImage 
                src={aboutData.portraitImageUrl} 
                alt="Marina Portrait" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

        {/* Right: Section 1 (Top Summary) & Section 2 (Full Story Beats) */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 pt-2 md:pt-4">
          
          {/* Section 1 — Top Summary */}
          <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-light leading-snug uppercase tracking-wide">
            {aboutData.title}
          </h2>

          <p className="font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light">
            She grew up in Western Siberia, where long winters shaped an early fascination with the natural world.
          </p>

          <p className="font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light">
            Before she picked up a camera, she had already lived several lives. She trained as a petroleum geologist. She competed in swimming from the age of twelve. She crossed the Bosphorus in Istanbul, learned to skydive, and later performed underwater in one of the world's largest aquariums, in Shanghai. None of it was part of a plan. She simply wanted to see what was beyond the familiar.
          </p>

          {/* Divider between Section 1 and Section 2 */}
          <div className="pt-6 border-t border-[#EAE6DF]" />

          {/* Section 2 — Full Story (Beat 1 & Beat 2) */}
          <div className="space-y-10">
            
            {/* Beat 1 — Photography enters */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-4 font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light"
            >
              <p>
                Photography entered her life much later.
              </p>
              <p>
                By then, she had spent years underwater — as a freediver, a performer, a model. The camera became a natural extension of that world. Not because she wanted to document it, but because she had found a place where gravity, movement, and the human body worked differently.
              </p>
              <p>
                Her photographs are often called surreal. Nothing in them is AI constructed. Every image is made in camera, underwater, through breath, movement, and light. The impossible, achieved physically — not with AI.
              </p>
            </motion.div>

            {/* Subtle Horizontal Rule between Beats */}
            <hr className="border-[#EAE6DF]" />

            {/* Beat 2 — Same Planet, Other Worlds */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-4 font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light"
            >
              <p>
                <em className="italic">Same Planet. Other Worlds</em> is her first major body of artistic work. Rather than imagining another planet, the series asks us to look at this one differently. Water becomes more than a setting — it becomes a space where the usual rules dissolve, and new relationships between bodies, light, and perception can emerge.
              </p>
              <p>
                It's only the first chapter.
              </p>
              <p>
                Marina isn't interested in repeating herself, or settling into a recognisable style. Every new body of work starts with a question she can't yet answer. Sometimes it leads to a new visual universe. Sometimes it becomes a deeply human story. Photography is simply how she goes looking for the answer.
              </p>
            </motion.div>

          </div>

        </div>

      </div>

      {/* BLOCK TWO (Selected Exhibitions) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pt-12 border-t border-[#EAE6DF]/80">
        
        {/* Left: Vertical Image (Repeated Layout Component) */}
        <div className="md:col-span-5">
          <div className="overflow-hidden shadow-xs relative rounded-xs">
            <ResponsiveImage 
              src={aboutData.galleryImageUrl} 
              alt="Exhibition Fine Art Photograph" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Right: Awards / Galleries Content */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 pt-2 md:pt-4">
          <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-light uppercase leading-snug">
            SELECTED EXHIBITIONS, MONOGRAPHS & PUBLIC COLLECTIONS
          </h3>

          {/* Exhibition List */}
          <div className="divide-y divide-[#EAE6DF] border-t border-b border-[#EAE6DF]">
            {aboutData.exhibitions.map((item, index) => (
              <div key={index} className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group">
                <div className="space-y-1">
                  <div className="font-serif text-lg md:text-xl text-[#1A1A1A] font-light tracking-wide group-hover:text-[#666055] transition-colors">
                    {item.title}
                  </div>
                  <div className="font-sans text-xs md:text-sm text-[#4A453C] font-light">
                    {item.venue} <span className="text-[#C4C0B5] mx-1.5">•</span> <span className="text-[#8A857C]">{item.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 sm:text-right">
                  <span className="text-[11px] tracking-wider uppercase font-sans text-[#8A857C]">
                    {item.type}
                  </span>
                  <span className="font-mono text-xs text-[#8A857C] tracking-wider w-10 text-right">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#8A857C] italic font-light">
            * Full list of institutional loans and permanent gallery installations available upon request.
          </p>
        </div>

      </div>

    </section>
  );
};

