import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <main className="relative z-10 pt-28 pb-24 px-6 min-h-[70vh] flex items-center justify-center text-center">
        <div className="max-w-md space-y-6">
          <span className="font-mono text-xs text-[#8A857C] uppercase tracking-[0.2em] block">
            404 · Page Not Found
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light uppercase tracking-wide leading-tight">
            UNEXPLORED WATERS
          </h1>
          <p className="font-sans text-xs md:text-sm text-[#555046] font-light leading-relaxed">
            The page or photographic series you are looking for could not be found or has moved.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#1A1A1A] text-white font-sans text-xs uppercase tracking-[0.15em] hover:bg-[#33302A] transition-colors rounded-xs"
            >
              Return to Portfolio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
