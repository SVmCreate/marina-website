import React from 'react';
import { Header } from '../components/Header';
import { PrintsSection } from '../sections/PrintsSection';
import { Footer } from '../components/Footer';

export const Prints: React.FC = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-16">
        <PrintsSection />
      </main>
      <Footer />
    </>
  );
};
