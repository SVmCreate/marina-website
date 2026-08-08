import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { Header } from '../components/Header';
import { MainGallery } from '../sections/MainGallery';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { Footer } from '../components/Footer';
import { getSeriesBySlug, SeriesData, SeriesPhoto } from '../data/seriesData';
import { getSanitySeriesBySlug } from '../lib/sanityQueries';
import { NotFound } from './NotFound';

interface ZoomedPhoto {
  imageUrl: string;
  title: string;
  caption?: string;
}

export const SeriesDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [series, setSeries] = useState<SeriesData | undefined>(() => getSeriesBySlug(slug || '', i18n.language));
  const [loading, setLoading] = useState(true);

  const [zoomedPhoto, setZoomedPhoto] = useState<ZoomedPhoto | null>(null);

  // Scroll to top and fetch Sanity series when slug or language changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      setLoading(true);
      getSanitySeriesBySlug(slug, i18n.language).then((res) => {
        if (res) {
          setSeries(res);
        }
        setLoading(false);
      });
    }
  }, [slug, i18n.language]);

  // Close zoomed photo on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedPhoto(null);
      }
    };

    if (zoomedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [zoomedPhoto]);

  if (!series) {
    return <NotFound />;
  }

  const heroPhoto: ZoomedPhoto = {
    imageUrl: series.coverImageUrl,
    title: `${series.title} Cover`,
    caption: `${series.title} · ${series.year}`
  };

  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-20 md:pt-28">
        
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column — Title, Description & Metadata */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest text-[#8A857C] uppercase block">
                  [ SERIES ARCHIVE ]
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-wide uppercase leading-tight">
                  {series.title}
                </h1>
              </div>

              <p className="font-sans text-xs md:text-sm text-[#555046] font-light leading-relaxed max-w-md">
                {series.description}
              </p>

              {/* Metadata Block */}
              <div className="pt-4 border-t border-[#EAE6DF] space-y-2.5 text-xs text-[#4A453C]">
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DF]/60">
                  <span className="font-mono text-[11px] text-[#8A857C] uppercase tracking-wider">Year</span>
                  <span className="font-sans font-light text-[#1A1A1A]">{series.year}</span>
                </div>
                {series.location && (
                  <div className="flex justify-between items-center py-1 border-b border-[#EAE6DF]/60">
                    <span className="font-mono text-[11px] text-[#8A857C] uppercase tracking-wider">Location</span>
                    <span className="font-sans font-light text-[#1A1A1A]">{series.location}</span>
                  </div>
                )}
                {series.technique && (
                  <div className="flex justify-between items-center py-1 border-b border-[#EAE6DF]/60">
                    <span className="font-mono text-[11px] text-[#8A857C] uppercase tracking-wider">Technique</span>
                    <span className="font-sans font-light text-[#1A1A1A]">{series.technique}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1">
                  <span className="font-mono text-[11px] text-[#8A857C] uppercase tracking-wider">Works</span>
                  <span className="font-sans font-light text-[#1A1A1A]">{series.photoCount} Photographs</span>
                </div>
              </div>
            </div>

            {/* Right Column — Preview Hero Photograph */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div 
                onClick={() => setZoomedPhoto(heroPhoto)}
                className="w-full max-w-md lg:max-w-none aspect-[3/4] overflow-hidden relative shadow-xs cursor-zoom-in group"
              >
                <ResponsiveImage 
                  src={series.coverImageUrl} 
                  alt={`${series.title} Hero Photography`} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] [backface-visibility:hidden]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-mono text-[10px] uppercase tracking-widest bg-black/70 px-3 py-1.5 transition-opacity duration-300">
                    {t("zoomPhoto")}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Grid for Series Photographs */}
        <div className="mt-20 md:mt-32">
          <MainGallery 
            showHeading={false} 
            showDescriptions={true}
            isSeriesView={true}
            photos={series.photos}
            onPhotoClick={(item: SeriesPhoto) => setZoomedPhoto({ imageUrl: item.imageUrl, title: item.title, caption: item.filename })}
          />
        </div>

      </main>

      {/* Lightbox / Zoom-In Modal */}
      {zoomedPhoto && (
        <div 
          onClick={() => setZoomedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#1A1A1A]/85 backdrop-blur-md transition-all duration-300 animate-fadeIn cursor-zoom-out"
        >
          {/* Close button at top right */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setZoomedPhoto(null);
            }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/80 hover:text-white transition-colors flex items-center space-x-2 bg-black/40 hover:bg-black/60 px-3.5 py-2 rounded-xs border border-white/10 font-mono text-xs uppercase tracking-widest z-10 cursor-pointer"
            aria-label={t("close")}
          >
            <span>{t("close")}</span>
            <X className="w-4 h-4" />
          </button>

          {/* Zoomed Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[85vh] flex flex-col items-center justify-center cursor-default"
          >
            <ResponsiveImage 
              src={zoomedPhoto.imageUrl} 
              alt={zoomedPhoto.title}
              loading="eager"
              decoding="async"
              className="max-h-[80vh] max-w-[90vw] md:max-w-[80vw] object-contain shadow-2xl rounded-xs border border-white/10"
            />
            {zoomedPhoto.title && (
              <div className="mt-4 text-center">
                <p className="font-serif text-sm md:text-base text-white/90 font-light tracking-wide uppercase">
                  {zoomedPhoto.title}
                </p>
                {zoomedPhoto.caption && (
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-widest mt-1">
                    Filename: {zoomedPhoto.caption}
                  </p>
                )}
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                  Click anywhere outside or press ESC to close
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};