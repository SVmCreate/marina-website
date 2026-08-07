import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getSanitySiteSettings } from '../lib/sanityQueries';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'MARINA',
    siteDescription: 'Editorial & Fine Art Photography · Lisbon / Paris',
    mainNavigation: [
      { label: 'Portfolio', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Contacts', url: '/contacts' }
    ]
  });
  const [lang, setLang] = useState<'ENG' | 'RUS'>(() => {
    return (localStorage.getItem('app_lang') as 'ENG' | 'RUS') || 'ENG';
  });
  

  useEffect(() => {
    getSanitySiteSettings().then((res) => {
      if (res) {
        setSiteSettings({
          siteTitle: res.siteTitle || 'MARINA',
          siteDescription: res.siteDescription || 'Editorial & Fine Art Photography · Lisbon / Paris',
          mainNavigation: res.mainNavigation && res.mainNavigation.length > 0 
            ? res.mainNavigation.map((n: any) => ({ label: n.label, url: n.url }))
            : [
                { label: 'Portfolio', url: '/' },
                { label: 'About', url: '/about' },
                { label: 'Contacts', url: '/contacts' }
              ]
        });
      }
    });
  }, []);

  const handleLangChange = (newLang: 'ENG' | 'RUS') => {
  setLang(newLang);

  const language = newLang === 'ENG' ? 'en' : 'ru';

  i18n.changeLanguage(language);

  localStorage.setItem('app_lang', newLang);
  };

  const navItems = siteSettings.mainNavigation.map((n) => ({
    path: n.url,
    label: n.label,
  }));

  console.log("SITE SETTINGS", siteSettings.mainNavigation);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5F3EF]/90 backdrop-blur-sm border-b border-[#EAE6DF] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/"
              className="text-left font-serif text-lg tracking-[0.18em] text-[#1A1A1A] hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteSettings.siteTitle}
            </Link>
          </div>

          {/* Desktop Navigation & Language Switcher */}
          <div className="hidden md:flex items-center space-x-8 md:space-x-10">
            <nav className="flex items-center space-x-8 md:space-x-10">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-xs md:text-sm tracking-[0.12em] uppercase transition-all duration-200 relative py-1 ${
                      isActive 
                        ? 'text-[#1A1A1A] font-medium' 
                        : 'text-[#666055] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {t(item.label.toLowerCase())}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1A1A1A]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switch */}
            <div className="flex items-center space-x-2 text-xs md:text-sm tracking-[0.12em] font-sans border-l border-[#EAE6DF] pl-6 text-[#8A857C]">
              <button
                type="button"
                onClick={() => handleLangChange('ENG')}
                className={`transition-colors cursor-pointer uppercase ${
                  lang === 'ENG' ? 'text-[#1A1A1A] font-semibold' : 'text-[#8A857C] hover:text-[#1A1A1A]'
                }`}
              >
                ENG
              </button>
              <span className="text-[#C4C0B5]">/</span>
              <button
                type="button"
                onClick={() => handleLangChange('RUS')}
                className={`transition-colors cursor-pointer uppercase ${
                  lang === 'RUS' ? 'text-[#1A1A1A] font-semibold' : 'text-[#8A857C] hover:text-[#1A1A1A]'
                }`}
              >
                RUS
              </button>
            </div>
          </div>

          {/* Mobile Burger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-2 text-[#1A1A1A] hover:text-[#666055] focus:outline-none transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#F5F3EF] flex flex-col justify-between p-6 sm:p-8 animate-fadeIn overflow-y-auto">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between h-16 border-b border-[#EAE6DF] -mx-6 sm:-mx-8 px-6 sm:px-8 -mt-6 sm:-mt-8 mb-6">
            <Link 
              to="/"
              className="font-serif text-lg tracking-[0.18em] text-[#1A1A1A] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteSettings.siteTitle}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-[#1A1A1A] hover:text-[#666055] focus:outline-none transition-colors cursor-pointer"
              aria-label={t("closeMenu")}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items & Mobile Language Switch */}
          <div className="space-y-8 my-auto py-8">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-3xl tracking-[0.15em] uppercase transition-colors flex items-center justify-between py-1 ${
                      isActive 
                        ? 'text-[#1A1A1A] font-light' 
                        : 'text-[#8A857C] hover:text-[#1A1A1A]'
                    }`}
                  >
                    <span>{t(item.label.toLowerCase())}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Language Switcher in Mobile Dropdown */}
            <div className="pt-6 border-t border-[#EAE6DF] flex items-center justify-between">
              <span className="font-sans text-xs text-[#8A857C] uppercase tracking-widest">Language</span>
              <div className="flex items-center space-x-3 text-xs tracking-wider font-sans uppercase">
                <button
                  type="button"
                  onClick={() => handleLangChange('ENG')}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    lang === 'ENG'
                      ? 'bg-[#1A1A1A] text-white font-medium'
                      : 'text-[#8A857C] hover:text-[#1A1A1A] border border-[#EAE6DF]'
                  }`}
                >
                  ENG
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange('RUS')}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    lang === 'RUS'
                      ? 'bg-[#1A1A1A] text-white font-medium'
                      : 'text-[#8A857C] hover:text-[#1A1A1A] border border-[#EAE6DF]'
                  }`}
                >
                  RUS
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Info Block in Mobile Menu */}
          <div className="pt-6 border-t border-[#EAE6DF] space-y-2 text-left">
            <p className="font-sans text-xs text-[#8A857C] uppercase tracking-widest">
              Lisbon Studio · Paris Representation
            </p>
            <a 
              href="mailto:info@marinaphotography.com" 
              className="font-serif text-sm tracking-wider text-[#4A453C] hover:text-[#1A1A1A] transition-colors block"
            >
              info@marinaphotography.com
            </a>
          </div>
        </div>
      )}
    </>
  );
};

