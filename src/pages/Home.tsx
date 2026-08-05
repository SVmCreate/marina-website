import React from 'react';
import { Header } from '../components/Header';
import { MainGallery } from '../sections/MainGallery';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-16">
        <MainGallery />
      </main>
      <Footer />
    </>
  );
};
