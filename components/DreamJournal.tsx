import React from 'react';
import { TrashIcon } from './icons/TrashIcon';

interface Dream {
  id: string;
  image: string;
  narrative: string;
  themes: string[];
}

interface DreamJournalProps {
  dreams: Dream[];
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const DreamJournal: React.FC<DreamJournalProps> = ({ dreams, onDelete, onClose }) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-slow p-4 sm:p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Your Dream Journal
        </h2>
        <button
          onClick={onClose}
          className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          &larr; Back to Creation
        </button>
      </div>

      {dreams.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700">
          <h3 className="text-2xl font-serif text-slate-300">Your journal is empty.</h3>
          <p className="mt-2 text-slate-400">Go design a dream and save it to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dreams.map(dream => (
            <div key={dream.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg overflow-hidden group relative animate-fade-in">
              <img src={dream.image} alt="A saved dream" className="w-full h-48 object-cover"/>
              <div className="p-4">
                <p className="font-serif text-slate-200 leading-snug italic">"{dream.narrative}"</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dream.themes.map(theme => (
                    <span key={theme} className="bg-cyan-900/70 text-cyan-200 text-xs font-medium px-2 py-1 rounded-full">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => onDelete(dream.id)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-slate-300 hover:bg-red-500/80 hover:text-white scale-0 group-hover:scale-100 transition-all"
                aria-label="Delete dream"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
