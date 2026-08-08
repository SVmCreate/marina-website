import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSanitySiteSettings } from '../lib/sanityQueries';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'MARINA',
    siteDescription: 'Editorial & Fine Art Photography · Lisbon / Paris',
  });

  // Определение текущего кода языка ('en' | 'ru')
  const getLangCode = useCallback((overrideLang?: string) => {
    if (overrideLang) return overrideLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
    const stored = localStorage.getItem('app_lang') || 'ENG';
    return stored === 'RUS' || i18n.language === 'ru' ? 'ru' : 'en';
  }, [i18n.language]);

  // Загрузка данных из Sanity с передачей текущего языка
  const loadData = useCallback((targetLang?: string) => {
    const langCode = getLangCode(targetLang);

    getSanitySiteSettings(langCode).then((res) => {
      if (res) {
        setSiteSettings({
          siteTitle: res.siteTitle || 'MARINA',
          siteDescription: res.siteDescription || (langCode === 'ru' ? 'Эдиториал и Арт Фотография · Лиссабон / Париж' : 'Editorial & Fine Art Photography · Lisbon / Paris'),
        });
      }
    });
  }, [getLangCode]);

  useEffect(() => {
    // Первоначальная загрузка
    loadData();

    // Слушатель кастомного события смены языка (без F5)
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      loadData(customEvent.detail);
    };

    window.addEventListener('app_lang_change', handleLangChange);
    return () => window.removeEventListener('app_lang_change', handleLangChange);
  }, [loadData]);

  // Следим за изменениями i18n
  useEffect(() => {
    loadData(i18n.language);
  }, [i18n.language, loadData]);

  const currentLang = getLangCode();
  const isRu = currentLang === 'ru';

  return (
    <footer className="border-t border-[#EAE6DF] py-12 md:py-16 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Brand & Studio Location */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <Link 
            to="/" 
            className="hover:opacity-70 transition-opacity inline-block"
          >
            <img
              src="/logo.svg"
              alt={siteSettings.siteTitle}
              className="w-24 h-auto"
            />
          </Link>
          <p className="font-mono text-[11px] tracking-wider text-[#8A857C] uppercase">
            {siteSettings.siteDescription}
          </p>
        </div>

        {/* Minimal Nav Links (Локализация ссылок) */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 font-serif text-xs uppercase tracking-[0.15em] text-[#666055]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
            {t('nav.portfolio', isRu ? 'Портфолио' : 'Portfolio')}
          </Link>
          <Link to="/series/same-planet-other-worlds" className="hover:text-[#1A1A1A] transition-colors">
            {t('nav.series', isRu ? 'Серии' : 'Series')}
          </Link>
          <Link to="/about" className="hover:text-[#1A1A1A] transition-colors">
            {t('nav.about', isRu ? 'Обо мне' : 'About')}
          </Link>
          <Link to="/contacts" className="hover:text-[#1A1A1A] transition-colors">
            {t('nav.contacts', isRu ? 'Контакты' : 'Contacts')}
          </Link>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#8A857C] uppercase">
          © {new Date().getFullYear()} {siteSettings.siteTitle} · {t('footer.rights', isRu ? 'ВСЕ ПРАВА ЗАЩИЩЕНЫ' : 'ALL RIGHTS RESERVED')}
        </div>

      </div>
    </footer>
  );
};