import React from 'react';
import { SaveIcon } from './icons/SaveIcon';

interface DreamscapeProps {
  image: string;
  narrative: string;
  onDreamAgain: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export const Dreamscape: React.FC<DreamscapeProps> = ({ image, narrative, onDreamAgain, onSave, isSaved }) => {
  return (
    <div className="w-full max-w-4xl animate-fade-in-slow space-y-8">
      <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/50 p-4 sm:p-6 backdrop-blur-md">
        <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-slate-700">
            <img 
                src={image} 
                alt="Generated dreamscape" 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
        </div>
        <div className="mt-6 text-center">
            <p className="font-serif text-xl sm:text-2xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
                "{narrative}"
            </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={onDreamAgain}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out glow-on-hover"
        >
          Dream Again
        </button>
        <button
          onClick={onSave}
          disabled={isSaved}
          className="bg-cyan-600/80 hover:bg-cyan-500/80 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out glow-on-hover flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-cyan-600/80 disabled:glow-on-hover:shadow-none"
        >
          <SaveIcon />
          {isSaved ? 'Saved' : 'Save to Journal'}
        </button>
      </div>
    </div>
  );
};
