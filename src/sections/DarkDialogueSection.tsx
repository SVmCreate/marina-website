import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DIALOGUE_ITEMS, EXHIBITIONS_DATA } from '../data/portfolioData';
import { getSanityAbout } from '../lib/sanityQueries';

export const DarkDialogueSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [openCategoryIds, setOpenCategoryIds] = useState<Set<string>>(
    new Set(['exhibitions', 'curiosity-process'])
  );

  const [dialogues, setDialogues] = useState(DIALOGUE_ITEMS);
  const [exhibitions, setExhibitions] = useState(EXHIBITIONS_DATA);

  // Нормализация языка к 'en' | 'ru'
  const getLangCode = useCallback((overrideLang?: string) => {
    if (overrideLang) {
      const lower = overrideLang.toLowerCase();
      if (lower.startsWith('ru') || lower === 'rus') return 'ru';
      return 'en';
    }
    const stored = localStorage.getItem('app_lang') || 'ENG';
    const currentI18n = i18n.language ? i18n.language.toLowerCase() : 'en';
    return stored === 'RUS' || currentI18n.startsWith('ru') ? 'ru' : 'en';
  }, [i18n.language]);

  const loadData = useCallback((targetLang?: string) => {
    const langCode = getLangCode(targetLang);

    getSanityAbout(langCode).then((res) => {
      if (res) {
        if (res.dialogues && res.dialogues.length > 0) {
          setDialogues(res.dialogues);
        }
        if (res.exhibitions && res.exhibitions.length > 0) {
          setExhibitions(res.exhibitions);
        }
      }
    });
  }, [getLangCode]);

  // Загрузка при монтировании и при изменении i18n.language
  useEffect(() => {
    loadData(i18n.language);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      loadData(customEvent.detail);
    };

    window.addEventListener('app_lang_change', handleLangChange);
    return () => window.removeEventListener('app_lang_change', handleLangChange);
  }, [i18n.language, loadData]);

  const currentLang = getLangCode();
  const isRu = currentLang === 'ru';

  const RECOGNITION_CATEGORIES = [
    {
      id: 'exhibitions',
      title: t('dialogue.cat_exhibitions', isRu ? 'ВЫСТАВКИ И МУЗЕЙНЫЕ ПРОЕКТЫ' : 'EXHIBITIONS & MUSEUM SHOWS'),
      type: 'exhibitions',
    },
    {
      id: 'curiosity-process',
      title: t('dialogue.cat_curiosity', isRu ? 'ДИАЛОГ О ВДОХНОВЕНИИ, ВИДЕНИИ И ВОДЕ' : 'DIALOGUE ON CURIOSITY, VISION & WATER'),
      type: 'dialogue',
      qIndexes: [0, 1, 2, 3]
    },
    {
      id: 'presence-freediving',
      title: t('dialogue.cat_presence', isRu ? 'ДИАЛОГ О ПРИСУТСТВИИ, ФРИДАЙВИНГЕ И ТВОРЧЕСТВЕ' : 'DIALOGUE ON PRESENCE, FREEDIVING & CREATION'),
      type: 'dialogue',
      qIndexes: [4, 5, 6]
    },
    {
      id: 'perception-mediums',
      title: t('dialogue.cat_perception', isRu ? 'ДИАЛОГ О ВОСПРИЯТИИ, ТАЙНЕ И МЕДИУМАХ' : 'DIALOGUE ON PERCEPTION, MYSTERY & MEDIUMS'),
      type: 'dialogue',
      qIndexes: [7, 8, 9, 10]
    }
  ];

  const toggleCategory = (id: string) => {
    setOpenCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="dark-dialogue" className="py-24 md:py-32 px-6 md:px-12 bg-[#20232A] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-5 md:sticky md:top-28">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase leading-tight">
              {t('dialogue.title', isRu ? 'ДИАЛОГ О ВИДЕНИИ И МЕТОДЕ' : 'DIALOGUE ON VISION & METHOD')}
            </h2>
            <p className="mt-4 text-xs md:text-sm text-[#94A3B8] font-light leading-relaxed max-w-sm">
              {t('dialogue.subtitle', isRu ? 'Размышления о преломлении света, невесомости человеческой формы и музейных отпечатках.' : 'Conversations on light refraction, weightless human form, and archival silver gelatin prints.')}
            </p>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7">
            <div className="border-t border-[#373C47] divide-y divide-[#373C47]">
              
              {RECOGNITION_CATEGORIES.map((cat) => {
                const isOpen = openCategoryIds.has(cat.id);

                return (
                  <div key={cat.id} className="py-5 transition-colors duration-200">
                    
                    {/* Header */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full text-left flex items-center space-x-3 group cursor-pointer focus:outline-none py-1"
                      aria-expanded={isOpen}
                    >
                      <span className="text-white group-hover:text-[#94A3B8] transition-colors">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 stroke-[1.5]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
                        )}
                      </span>

                      <h3 className="font-sans text-xs md:text-sm tracking-[0.2em] font-medium text-white uppercase group-hover:text-[#CBD5E1] transition-colors">
                        {cat.title}
                      </h3>
                    </button>

                    {/* Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2 pl-7 space-y-4">
                            
                            {/* Exhibitions */}
                            {cat.type === 'exhibitions' && (
                              <div className="divide-y divide-[#2C313B] border-t border-b border-[#2C313B] my-1">
                                {exhibitions.map((exh, idx) => (
                                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group">
                                    <div className="space-y-1">
                                      <div className="font-serif text-base md:text-lg text-white font-light tracking-wide group-hover:text-[#CBD5E1] transition-colors">
                                        {exh.title}
                                      </div>
                                      <div className="font-sans text-xs md:text-sm text-[#94A3B8] font-light">
                                        {exh.venue} <span className="text-[#475569] mx-1">|</span> <span className="text-[#64748B]">{exh.location}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-4 shrink-0 sm:text-right">
                                      <span className="text-[10px] tracking-wider uppercase font-sans text-[#94A3B8]">
                                        {exh.type}
                                      </span>
                                      <span className="font-mono text-xs text-[#64748B] tracking-wider">
                                        {exh.year}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Dialogue Items */}
                            {cat.type === 'dialogue' && cat.qIndexes && (
                              <div className="space-y-6 pt-1">
                                {cat.qIndexes.map((idx) => {
                                  const dialogue = dialogues[idx];
                                  if (!dialogue) return null;

                                  return (
                                    <div key={idx} className="space-y-2 border-b border-[#2C313B] pb-4 last:border-0">
                                      <div className="flex items-baseline space-x-2">
                                        <h4 className="font-sans text-sm md:text-[15px] text-[#F1F5F9] font-normal leading-snug">
                                          {dialogue.question}
                                        </h4>
                                      </div>
                                      <p className="text-xs md:text-sm text-[#CBD5E1] font-light leading-relaxed pl-5 border-l border-[#373C47]">
                                        {dialogue.answer}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};