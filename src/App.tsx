import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StoryDisplay } from './components/StoryDisplay';
import { PromptInput } from './components/PromptInput';
import AdSenseUnit from './components/AdSenseUnit';
import { LoadingSpinner } from './components/LoadingSpinner';
import { createChatSession } from './services/geminiService';
import type { Chat } from '@google/genai';

interface StorySegment {
  id: number;
  author: 'user' | 'ai';
  text: string;
}

const App = () => {
  const [story, setStory] = useState<StorySegment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  const handleNewStory = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setStory([]);
    chatRef.current = createChatSession();

    const firstSegment: StorySegment = { id: Date.now(), author: 'user', text: prompt };
    setStory([firstSegment]);
    
    try {
      if (!chatRef.current) throw new Error("Chat not initialized");
      const stream = await chatRef.current.sendMessageStream({ message: prompt });
      
      let newStoryText = '';
      const aiSegmentId = Date.now() + 1;
      
      setStory(prev => [...prev, { id: aiSegmentId, author: 'ai', text: '...' }]);

      for await (const chunk of stream) {
        newStoryText += chunk.text;
        setStory(prev => prev.map(seg => seg.id === aiSegmentId ? { ...seg, text: newStoryText } : seg));
      }
      
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the story. Please try again.');
      setStory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleContinueStory = useCallback(async (prompt: string) => {
    if (!chatRef.current) {
        setError("No active story session. Please start a new story.");
        return;
    }
    setIsLoading(true);
    setError(null);

    const userSegment: StorySegment = { id: Date.now(), author: 'user', text: prompt };
    setStory(prev => [...prev, userSegment]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: prompt });
      let newStoryText = '';
      const aiSegmentId = Date.now() + 1;

      setStory(prev => [...prev, { id: aiSegmentId, author: 'ai', text: '...' }]);
      
      for await (const chunk of stream) {
        newStoryText += chunk.text;
        setStory(prev => prev.map(seg => seg.id === aiSegmentId ? { ...seg, text: newStoryText } : seg));
      }

    } catch(e) {
        console.error(e);
        setError('An error occurred while continuing the story. Please try again.');
    } finally {
        setIsLoading(false);
    }

  }, []);

  const handleSubmit = (prompt: string) => {
    if (story.length === 0) {
      handleNewStory(prompt);
    } else {
      handleContinueStory(prompt);
    }
  };

  const startNew = () => {
    setStory([]);
    setError(null);
    chatRef.current = null;
  }

  return (
    <div className="min-h-screen bg-parchment text-ink font-sans flex flex-col">
      <Header />
      <main className="flex-grow p-4 w-full">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Ad Panel (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pt-16">
            {/* TODO: Replace XXXXXXXXXX with your AdSense Ad Slot ID */}
            <AdSenseUnit slot="9818995672" className="h-64 bg-paper rounded-lg border border-subtle-border" />
            <AdSenseUnit slot="9818995672" className="h-64 bg-paper rounded-lg border border-subtle-border" />
          </aside>
  
          {/* Main Content */}
          <div className="w-full lg:col-span-3 flex flex-col space-y-6">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-center text-ink">
              {story.length === 0 ? "Weave Your Tale" : "The Unfolding Saga"}
            </h2>
            
            {error && <div className="bg-red-500/10 border border-red-400 text-red-700 p-3 rounded-md text-center">{error}</div>}

            <StoryDisplay story={story} isLoading={isLoading} />
            
            {story.length > 0 && !isLoading && (
              <div className="animate-fade-in text-center">
                <button 
                  onClick={startNew} 
                  className="bg-paper hover:bg-zinc-100 text-ink font-bold py-2 px-4 rounded-lg transition-colors duration-300 border border-subtle-border shadow-sm">
                    Start a New Story
                </button>
              </div>
            )}
            
            <PromptInput onSubmit={handleSubmit} isLoading={isLoading} hasStory={story.length > 0} />
            
            {isLoading && <LoadingSpinner />}
          </div>
          
          {/* Right Ad Panel (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pt-16">
            {/* TODO: Replace XXXXXXXXXX with your AdSense Ad Slot ID */}
            <AdSenseUnit slot="9818995672" className="h-64 bg-paper rounded-lg border border-subtle-border" />
            <AdSenseUnit slot="9818995672" className="h-64 bg-paper rounded-lg border border-subtle-border" />
          </aside>

          {/* Mobile Ad (Mobile Only) */}
          <div className="lg:hidden w-full mt-4">
            {/* TODO: Replace XXXXXXXXXX with your AdSense Ad Slot ID */}
            <AdSenseUnit slot="9818995672" className="h-48 bg-paper rounded-lg border border-subtle-border" />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;