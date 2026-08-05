import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#EAE6DF] py-12 md:py-16 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Brand & Studio Location */}
        <div className="space-y-1.5">
          <Link 
            to="/" 
            className="font-serif text-base tracking-[0.18em] text-[#1A1A1A] uppercase hover:opacity-70 transition-opacity block"
          >
            MARINA
          </Link>
          <p className="font-mono text-[11px] tracking-wider text-[#8A857C] uppercase">
            Editorial & Fine Art Photography · Lisbon / Paris
          </p>
        </div>

        {/* Minimal Nav Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 font-serif text-xs uppercase tracking-[0.15em] text-[#666055]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Portfolio</Link>
          <Link to="/series/same-planet-other-worlds" className="hover:text-[#1A1A1A] transition-colors">Series</Link>
          <Link to="/about" className="hover:text-[#1A1A1A] transition-colors">About</Link>
          <Link to="/contacts" className="hover:text-[#1A1A1A] transition-colors">Contacts</Link>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#8A857C] uppercase">
          © {new Date().getFullYear()} MARINA · ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
};
