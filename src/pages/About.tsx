import React from 'react';
import { Header } from '../components/Header';
import { AboutSection } from '../sections/AboutSection';
import { DarkDialogueSection } from '../sections/DarkDialogueSection';
import { Footer } from '../components/Footer';

export const About: React.FC = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-16">
        <AboutSection />
        <DarkDialogueSection />
      </main>
      <Footer />
    </>
  );
};
