import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { MainGallery } from '../sections/MainGallery';
import { Footer } from '../components/Footer';
import { getSanityAllSeries } from '../lib/sanityQueries';
import { SeriesData } from '../data/seriesData';

export const Home: React.FC = () => {
  const { i18n } = useTranslation();
  const [seriesList, setSeriesList] = useState<SeriesData[]>([]);

  useEffect(() => {
    getSanityAllSeries(i18n.language).then((data) => {
      if (data && data.length > 0) {
        setSeriesList(data);
      }
    });
  }, [i18n.language]);

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