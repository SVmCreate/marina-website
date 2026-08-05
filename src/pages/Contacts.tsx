import React from 'react';
import { Header } from '../components/Header';
import { ContactCard } from '../sections/ContactCard';
import { Footer } from '../components/Footer';

export const Contacts: React.FC = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 transition-all duration-300 pt-16">
        <ContactCard />
      </main>
      <Footer />
    </>
  );
};
