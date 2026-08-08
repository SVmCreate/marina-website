import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { EXHIBITIONS_DATA } from '../data/portfolioData';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getSanityAbout } from '../lib/sanityQueries';

export const AboutSection: React.FC = () => {
  const { i18n } = useTranslation();
  const [aboutData, setAboutData] = useState<any>(null);

  const getLangCode = useCallback((overrideLang?: string) => {
    if (overrideLang) return overrideLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
    const stored = localStorage.getItem('app_lang') || 'ENG';
    return stored === 'RUS' || i18n.language === 'ru' ? 'ru' : 'en';
  }, [i18n.language]);

  const loadData = useCallback((targetLang?: string) => {
    const langCode = getLangCode(targetLang);

    getSanityAbout(langCode).then((res) => {
      console.log('Sanity fetched data:', res);
      setAboutData(res || {});
    });
  }, [getLangCode]);

  useEffect(() => {
    loadData();

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      loadData(customEvent.detail);
    };

    window.addEventListener('app_lang_change', handleLangChange);
    return () => window.removeEventListener('app_lang_change', handleLangChange);
  }, [loadData]);

  useEffect(() => {
    loadData(i18n.language);
  }, [i18n.language, loadData]);

  // Парсим строку biography из Sanity на массив отдельных абзацев
  const getParagraphs = (): string[] => {
    const bio = aboutData?.biography;
    if (!bio) return [];
    
    if (typeof bio === 'string') {
      return bio.split(/\n+/).map((p) => p.trim()).filter(Boolean);
    }
    
    if (Array.isArray(bio)) {
      return bio
        .map((b) => (typeof b === 'string' ? b : b?.children?.map((c: any) => c.text).join('')))
        .filter(Boolean);
    }
    
    return [];
  };

  const paragraphs = getParagraphs();

  // Распределяем абзацы из массива Sanity по структуре верстки:
  const p1 = paragraphs[0] || '';
  const beat1_1 = paragraphs[1] || '';
  const beat1_2 = paragraphs[2] || '';
  const beat1_3 = paragraphs[3] || '';
  const beat2_1 = paragraphs[4] || '';
  const beat2_2 = paragraphs[5] || '';
  const beat2_3 = paragraphs[6] || '';

  const isRu = getLangCode() === 'ru';
  const defaultExhibitionsTitle = isRu
    ? 'ВЫБРАННЫЕ ВЫСТАВКИ, МОНОГРАФИИ И ГОСУДАРСТВЕННЫЕ КОЛЛЕКЦИИ'
    : 'SELECTED EXHIBITIONS, MONOGRAPHS & PUBLIC COLLECTIONS';

  return (
    <section id="about" className="py-20 md:py-28 px-6 space-y-24 md:space-y-36 max-w-6xl mx-auto">
      
      {/* BLOCK ONE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* Left Image */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24 space-y-2">
            <div className="overflow-hidden shadow-xs relative rounded-xs min-h-[300px]">
              {aboutData?.portraitImageUrl && (
                <ResponsiveImage 
                  src={aboutData.portraitImageUrl} 
                  alt="Marina Portrait" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto block"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 pt-2 md:pt-4">
          
          {/* Title из Sanity */}
          {aboutData?.title && (
            <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-light leading-snug uppercase tracking-wide">
              {aboutData.title}
            </h2>
          )}

          {/* Первый главный абзац */}
          {p1 && (
            <p className="font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light">
              {p1}
            </p>
          )}

          <div className="pt-6 border-t border-[#EAE6DF]" />

          {/* Story Beats Block 1 */}
          <div className="space-y-10">
            {(beat1_1 || beat1_2 || beat1_3) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4 font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light"
              >
                {beat1_1 && <p>{beat1_1}</p>}
                {beat1_2 && <p>{beat1_2}</p>}
                {beat1_3 && <p>{beat1_3}</p>}
              </motion.div>
            )}

            <hr className="border-[#EAE6DF]" />

            {/* Story Beats Block 2 */}
            {(beat2_1 || beat2_2 || beat2_3) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4 font-sans text-sm md:text-base text-[#4A453C] leading-relaxed font-light"
              >
                {beat2_1 && (
                  <p className="font-serif italic text-base md:text-lg text-[#1A1A1A]">
                    {beat2_1}
                  </p>
                )}
                {beat2_2 && <p>{beat2_2}</p>}
                {beat2_3 && <p>{beat2_3}</p>}
              </motion.div>
            )}
          </div>

        </div>

      </div>

      {/* BLOCK TWO — Exhibitions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pt-12 border-t border-[#EAE6DF]/80">
        <div className="md:col-span-5">
          <div className="overflow-hidden shadow-xs relative rounded-xs min-h-[300px]">
            {aboutData?.galleryImageUrl && (
              <ResponsiveImage 
                src={aboutData.galleryImageUrl} 
                alt="Exhibition Fine Art Photograph" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            )}
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center space-y-6 pt-2 md:pt-4">
          <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-light uppercase leading-snug">
            {aboutData?.exhibitionsTitle || defaultExhibitionsTitle}
          </h3>

          <div className="divide-y divide-[#EAE6DF] border-t border-b border-[#EAE6DF]">
            {(aboutData?.exhibitions || EXHIBITIONS_DATA).map((item: any, index: number) => (
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
        </div>
      </div>

    </section>
  );
};