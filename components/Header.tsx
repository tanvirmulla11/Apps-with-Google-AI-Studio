import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center w-full">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500">
      DreamMix
    </h1>
    <p className="mt-2 text-md sm:text-lg text-slate-300">
      Design your dreams before you sleep.
    </p>
  </header>
);
