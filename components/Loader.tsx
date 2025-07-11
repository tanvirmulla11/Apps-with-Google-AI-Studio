import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
    <div className="w-16 h-16 border-4 border-slate-700 border-t-fuchsia-500 rounded-full animate-spin"></div>
    <h2 className="text-2xl font-serif text-slate-200 mt-4">Weaving your dream...</h2>
    <p className="text-slate-400">The astral plane is connecting.</p>
  </div>
);
