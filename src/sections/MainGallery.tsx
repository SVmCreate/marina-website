import React from 'react';
import { Link } from 'react-router-dom';
import { SERIES_LIST, SeriesData, SeriesPhoto } from '../data/seriesData';
import { ResponsiveImage } from '../components/ResponsiveImage';

interface MainGalleryProps {
  showHeading?: boolean;
  showDescriptions?: boolean;
  onPhotoClick?: (item: SeriesPhoto) => void;
  isSeriesView?: boolean;
  photos?: SeriesPhoto[];
  seriesList?: SeriesData[];
}

export const MainGallery: React.FC<MainGalleryProps> = ({ 
  showHeading = false, 
  showDescriptions = true,
  onPhotoClick,
  isSeriesView = false,
  photos,
  seriesList = SERIES_LIST
}) => {
  

  return (
    <section id="gallery" className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">

        
        {/* Section Header */}
        {showHeading && (
          <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-light tracking-wide uppercase">
              SELECTED SERIES
            </h3>
          </div>
        )}

        {/* Series Detail Photo Grid View */}
        {isSeriesView && photos ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">
            {photos.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onPhotoClick && onPhotoClick(item)}
                className="flex flex-col group cursor-zoom-in text-left w-full outline-none"
              >
                {/* Image Frame */}
                <div className="aspect-[3/4] overflow-hidden relative shadow-xs w-full">
                  <ResponsiveImage 
                    src={item.imageUrl} 
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-mono text-[10px] uppercase tracking-widest bg-black/60 px-3 py-1.5 backdrop-blur-xs transition-opacity duration-300 flex items-center gap-1.5">
                      Zoom Photo
                    </span>
                  </div>
                </div>

                {/* Photo Title/Filename Caption */}
                {showDescriptions && (
                  <div className="mt-3.5 flex items-center justify-between">
                    <h4 className="font-serif text-xl text-[#1A1A1A] font-light uppercase tracking-wide group-hover:text-[#000000] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* Homepage Series List View (6 Real Series) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">
            {seriesList.map((series) => (
              <Link 
                to={`/series/${series.slug}`} 
                key={series.id} 
                className="flex flex-col group cursor-pointer text-left w-full"
              >
                {/* Image Frame - Cover Photo */}
                <div className="aspect-[3/4] overflow-hidden relative shadow-xs w-full">
                  <ResponsiveImage
                     src={series.coverImageUrl}
                     alt={series.title}
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-mono text-[10px] uppercase tracking-widest bg-black/60 px-3 py-1.5 backdrop-blur-xs transition-opacity duration-300 flex items-center gap-1.5">
                      View Series
                    </span>
                  </div>
                </div>

                {/* Series Title & Navigation Arrow */}
                {showDescriptions && (
                  <div className="mt-3.5 flex items-center justify-between">
                    <h4 className="font-serif text-xl text-[#1A1A1A] font-light uppercase tracking-wide group-hover:text-[#000000] transition-colors">
                      {series.title}
                    </h4>
                    <span className="font-mono text-[10px] text-[#8A857C] uppercase tracking-widest group-hover:text-[#1A1A1A] transition-colors">
                      Series →
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};


