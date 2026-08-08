import React, { useState, useEffect } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSanityContact } from '../lib/sanityQueries';

interface RepresentationItem {
  city?: string;
  gallery?: string;
  address?: string;
}

interface SocialLinkItem {
  label?: string;
  url?: string;
}

export const ContactCard: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [contactData, setContactData] = useState<{
    title: string;
    email: string;
    phone: string;
    location: string;
    representation: RepresentationItem[];
    socialLinks: SocialLinkItem[];
  }>({
    title: 'CONTACT',
    email: 'info@marinaphotography.com',
    phone: '+351 912 345 678',
    location: 'Lisbon Studio · Paris Representation',
    representation: [],
    socialLinks: []
  });

  useEffect(() => {
    getSanityContact(currentLang).then((res) => {
      if (res) {
        setContactData({
          title: res.title || (currentLang === 'ru' ? 'КОНТАКТЫ' : 'CONTACT'),
          email: res.email || 'info@marinaphotography.com',
          phone: res.phone || '+351 912 345 678',
          location: res.location || '',
          representation: res.representation || res.socials || [],
          socialLinks: res.socialLinks || res.socials || []
        });
      }
    });
  }, [currentLang]);

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(emailStr);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const isRu = currentLang.toLowerCase().includes('ru');

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-2xl mx-auto space-y-16 md:space-y-20 text-center">
        
        {/* Centered Header Block */}
        <div className="space-y-4">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-wide uppercase">
            {contactData.title}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#555046] font-light leading-relaxed max-w-lg mx-auto">
            {isRu
              ? 'По вопросам приобретения авторских отпечатков, архивных серий, прессы или съемки по всему миру, свяжитесь напрямую или через галерею.'
              : 'For fine art print acquisitions, archival series, press inquiries, or worldwide commissioned photographic work, please reach out directly or through gallery representation.'}
          </p>
        </div>

        {/* Stacked Clean Contact Channels */}
        <div className="space-y-12 text-left">
          
          {/* Section 1: Direct Studio */}
          <div className="space-y-6 border-t border-[#EAE6DF] pt-8">
            <h3 className="font-serif text-sm md:text-base text-[#1A1A1A] font-light uppercase tracking-widest text-center">
              {isRu ? 'ПРАМЫЕ КОНТАКТЫ' : 'DIRECT STUDIO'}
            </h3>

            <div className="space-y-4 text-xs md:text-sm text-[#4A453C]">
              {/* Print Acquisitions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#EAE6DF]/60 gap-1">
                <span className="text-[#8A857C] text-[11px] font-mono uppercase tracking-wider">
                  {isRu ? 'Электронная почта' : 'Print Acquisitions & Sales'}
                </span>
                <button 
                  onClick={() => handleCopyEmail(contactData.email)}
                  className="text-[#1A1A1A] hover:text-[#666055] font-light transition-colors cursor-pointer flex items-center space-x-2 group"
                >
                  <span className="group-hover:underline">{contactData.email}</span>
                  {copiedEmail === contactData.email ? (
                    <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {isRu ? 'скопировано' : 'copied'}
                    </span>
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8A857C] group-hover:text-[#1A1A1A] transition-colors" />
                  )}
                </button>
              </div>

              {/* Telephone */}
              {contactData.phone && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#EAE6DF]/60 gap-1">
                  <span className="text-[#8A857C] text-[11px] font-mono uppercase tracking-wider">
                    {isRu ? 'Телефон студии' : 'Studio Phone / Signal'}
                  </span>
                  <span className="text-[#1A1A1A] font-light font-mono text-xs">
                    {contactData.phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Representation & Locations */}
          <div className="space-y-6 border-t border-[#EAE6DF] pt-8">
            <h3 className="font-serif text-sm md:text-base text-[#1A1A1A] font-light uppercase tracking-widest text-center">
              {isRu ? 'ПРЕДСТАВИТЕЛЬСТВА И АРХИВЫ' : 'REPRESENTATION & ARCHIVES'}
            </h3>

            <div className="space-y-4 text-xs md:text-sm text-[#4A453C]">
              {/* Dynamic Representation List */}
              {contactData.representation.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#EAE6DF]/60 gap-1">
                  <span className="text-[#8A857C] text-[11px] font-mono uppercase tracking-wider">
                    {item.city || `Representation ${idx + 1}`}
                  </span>
                  <span className="text-[#1A1A1A] font-light sm:text-right">
                    {item.gallery || item.address || ''}
                  </span>
                </div>
              ))}

              {/* Dynamic Social Links */}
              {contactData.socialLinks.map((social, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#EAE6DF]/60 gap-1">
                  <span className="text-[#8A857C] text-[11px] font-mono uppercase tracking-wider">
                    {social.label || 'Social'}
                  </span>
                  <a 
                    href={social.url || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#1A1A1A] hover:text-[#666055] font-light transition-colors inline-flex items-center space-x-1 group"
                  >
                    <span className="group-hover:underline">{social.label || social.url}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8A857C] group-hover:text-[#1A1A1A]" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar Details */}
        <div className="border-t border-[#EAE6DF] pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#8A857C] gap-4">
          <div>
            {contactData.location || 'Lisbon Studio · UTC+0 / WET'}
          </div>
          <div>
            {isRu ? 'Доступна для съемок по всему миру' : 'Available for global commissions'}
          </div>
        </div>

      </div>
    </section>
  );
};