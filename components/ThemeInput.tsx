import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';
import { SparkleIcon } from './icons/SparkleIcon';

interface ThemeInputProps {
  themes: string[];
  setThemes: React.Dispatch<React.SetStateAction<string[]>>;
  onGenerate: () => void;
  onSurprise: () => void;
}

export const ThemeInput: React.FC<ThemeInputProps> = ({ themes, setThemes, onGenerate, onSurprise }) => {
  const [currentTheme, setCurrentTheme] = useState('');

  const handleAddTheme = () => {
    if (currentTheme.trim() && !themes.includes(currentTheme.trim())) {
      setThemes([...themes, currentTheme.trim()]);
      setCurrentTheme('');
    }
  };

  const handleRemoveTheme = (themeToRemove: string) => {
    setThemes(themes.filter(theme => theme !== themeToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTheme();
    }
  };
  
  return (
    <div className="w-full max-w-2xl p-6 bg-slate-800/40 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
      <div className="flex flex-col gap-4">
        <label htmlFor="theme-input" className="text-slate-300 font-medium">
          Combine themes to build your dreamscape...
        </label>
        <div className="flex gap-2">
          <input
            id="theme-input"
            type="text"
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Bioluminescent ocean"
            className="flex-grow bg-slate-900/70 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
          />
          <button
            onClick={handleAddTheme}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            aria-label="Add theme"
          >
            <PlusIcon />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-slate-400 text-sm mb-3">Your dream elements:</h3>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {themes.map(theme => (
            <span key={theme} className="bg-fuchsia-900/60 text-fuchsia-200 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2 animate-fade-in">
              {theme}
              <button onClick={() => handleRemoveTheme(theme)} className="text-fuchsia-300 hover:text-white" aria-label={`Remove ${theme}`}>
                <XIcon />
              </button>
            </span>
          ))}
          {themes.length === 0 && (
              <p className="text-slate-500 text-sm italic">Add some elements to begin...</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onSurprise}
          className="w-full sm:w-auto flex-shrink-0 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out glow-on-hover flex items-center justify-center gap-2"
        >
          <SparkleIcon />
          Surprise Me
        </button>
        <button
          onClick={onGenerate}
          disabled={themes.length === 0}
          className="w-full flex-grow bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-600 hover:to-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none btn-primary-glow"
        >
          Design Your Dream
        </button>
      </div>
    </div>
  );
};
