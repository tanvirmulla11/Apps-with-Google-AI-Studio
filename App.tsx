import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ThemeInput } from './components/ThemeInput';
import { Dreamscape } from './components/Dreamscape';
import { Loader } from './components/Loader';
import { generateDreamScene, generateDreamNarrative } from './services/geminiService';
import { DreamJournal } from './components/DreamJournal';
import { JournalIcon } from './components/icons/JournalIcon';

// Define the structure of a dream object
interface Dream {
  id: string; // A unique identifier, e.g., narrative + image
  image: string;
  narrative: string;
  themes: string[];
}

// A curated list of themes for the "Surprise Me" feature
const surpriseThemes = [
  'City made of glass', 'Floating library', 'Forest of giant mushrooms', 'Clockwork animals',
  'Underwater ballroom', 'Stairway to the stars', 'Singing flowers', 'Crystal caves',
  'A ship sailing on clouds', 'Living graffiti', 'A world inside a snow globe', 'Neon desert',
  'Glacier of memories', 'Childhood home in the jungle', 'Aurora-lit canyon', 'Whispering statues'
];

const App: React.FC = () => {
  // State for the dream creation process
  const [themes, setThemes] = useState<string[]>(['Floating island', 'Dragonfruit sky', 'Childhood home']);
  const [dreamImage, setDreamImage] = useState<string | null>(null);
  const [dreamNarrative, setDreamNarrative] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for the Dream Journal feature
  const [savedDreams, setSavedDreams] = useState<Dream[]>([]);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);

  // Load dreams from localStorage on initial render
  useEffect(() => {
    try {
      const storedDreams = localStorage.getItem('dreamJournal');
      if (storedDreams) {
        setSavedDreams(JSON.parse(storedDreams));
      }
    } catch (e) {
      console.error("Failed to load dreams from localStorage", e);
    }
  }, []);

  // Save dreams to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem('dreamJournal', JSON.stringify(savedDreams));
    } catch (e) {
      console.error("Failed to save dreams to localStorage", e);
    }
  }, [savedDreams]);

  const handleGenerateDream = useCallback(async (promptThemes: string[]) => {
    if (promptThemes.length === 0) {
      setError('Please add at least one theme to design your dream.');
      return;
    }
    
    setIsJournalOpen(false);
    setIsLoading(true);
    setError(null);
    setDreamImage(null);
    setDreamNarrative(null);

    try {
      const imagePrompt = `A surreal, ethereal, vibrant dreamscape featuring: ${promptThemes.join(', ')}. Digital painting, high detail, fantasy art, cinematic lighting, dramatic atmosphere.`;
      const narrativePrompt = `Craft a short, calming, and poetic dream narrative introduction based on these themes: ${promptThemes.join(', ')}. Start the narrative directly. Keep it to 2-4 beautiful sentences.`;

      const [imageUrl, narrative] = await Promise.all([
        generateDreamScene(imagePrompt),
        generateDreamNarrative(narrativePrompt)
      ]);
      
      setThemes(promptThemes); // ensure themes are set from surprise me
      setDreamImage(imageUrl);
      setDreamNarrative(narrative);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate dream. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSurpriseMe = () => {
    const shuffled = surpriseThemes.sort(() => 0.5 - Math.random());
    const newThemes = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3 themes
    setThemes(newThemes);
    handleGenerateDream(newThemes);
  };

  const handleSaveDream = () => {
    if (dreamImage && dreamNarrative) {
      const newDream: Dream = {
        id: dreamNarrative + dreamImage, // simple unique ID
        image: dreamImage,
        narrative: dreamNarrative,
        themes: themes
      };
      // Prevent duplicates
      if (!savedDreams.some(d => d.id === newDream.id)) {
        setSavedDreams(prevDreams => [newDream, ...prevDreams]);
      }
    }
  };

  const handleDeleteDream = (id: string) => {
    setSavedDreams(prevDreams => prevDreams.filter(dream => dream.id !== id));
  };

  const resetDream = () => {
    setDreamImage(null);
    setDreamNarrative(null);
    setError(null);
  }
  
  const isCurrentDreamSaved = dreamImage && dreamNarrative 
    ? savedDreams.some(d => d.id === dreamNarrative + dreamImage) 
    : false;

  return (
    <div className="min-h-screen antialiased selection:bg-fuchsia-500/50">
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">
        <header className="text-center w-full max-w-6xl mx-auto flex justify-between items-center">
            <div className="w-16"></div> {/* Spacer */}
            <div className="flex-1">
                <Header />
            </div>
            <div className="w-16 flex justify-end">
                <button 
                    onClick={() => setIsJournalOpen(!isJournalOpen)}
                    className="bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold p-3 rounded-full transition-all duration-300 glow-on-hover"
                    aria-label={isJournalOpen ? "Close Dream Journal" : "Open Dream Journal"}
                >
                    <JournalIcon />
                </button>
            </div>
        </header>

        <main className="w-full max-w-6xl mx-auto mt-8 sm:mt-12 flex-grow flex flex-col items-center">
          {isJournalOpen ? (
            <DreamJournal dreams={savedDreams} onDelete={handleDeleteDream} onClose={() => setIsJournalOpen(false)} />
          ) : (
            <>
              {!isLoading && !dreamImage && (
                <ThemeInput 
                  themes={themes}
                  setThemes={setThemes}
                  onGenerate={() => handleGenerateDream(themes)}
                  onSurprise={handleSurpriseMe}
                />
              )}

              {isLoading && <Loader />}
              
              {error && (
                <div className="mt-8 text-center bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                  <p className="font-semibold">Oh no, a nightmare!</p>
                  <p className="mt-2 text-sm">{error}</p>
                </div>
              )}

              {!isLoading && dreamImage && dreamNarrative && (
                <Dreamscape 
                  image={dreamImage} 
                  narrative={dreamNarrative} 
                  onDreamAgain={resetDream}
                  onSave={handleSaveDream}
                  isSaved={isCurrentDreamSaved}
                />
              )}
            </>
          )}
        </main>
        
        <footer className="w-full text-center p-4 mt-12 text-slate-500 text-sm">
          <p>Crafted with Gemini & Imagen. Find your peace.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;