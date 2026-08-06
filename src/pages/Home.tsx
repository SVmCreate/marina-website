import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { MainGallery } from '../sections/MainGallery';
import { Footer } from '../components/Footer';
import { getSanityAllSeries } from '../lib/sanityQueries';
import { SeriesData } from '../data/seriesData';

export const Home: React.FC = () => {
  const [seriesList, setSeriesList] = useState<SeriesData[]>([]);

  useEffect(() => {
    getSanityAllSeries().then((data) => {
      if (data && data.length > 0) {
        setSeriesList(data);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-16">
        <MainGallery seriesList={seriesList.length > 0 ? seriesList : undefined} />
      </main>
      <Footer />
    </>
  );
};
