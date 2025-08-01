import React, { useState, useCallback, useRef } from 'react';
import { Header } from './src/components/Header';
import { Footer } from './src/components/Footer';
import { StoryDisplay } from './src/components/StoryDisplay';
import { PromptInput } from './src/components/PromptInput';
import AdSenseUnit from './src/components/AdSenseUnit';
import { LoadingSpinner } from './src/components/LoadingSpinner';
import { createChatSession } from './services/geminiService';

type StorySegment = {
  id: number;
  author: 'user' | 'ai';
  text: string;
};

type Chat = {
  sendMessageStream: (args: { message: string }) => AsyncIterable<{ text: string }> | Promise<AsyncIterable<{ text: string }>>;
};

const App = () => {
  const [story, setStory] = useState<StorySegment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  const handleNewStory = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setStory([]);
    chatRef.current = createChatSession() as Chat;

    const firstSegment: StorySegment = { id: Date.now(), author: 'user', text: prompt };
    setStory([firstSegment]);
    try {
      if (!chatRef.current) throw new Error('Chat not initialized');
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
      setError('No active story session. Please start a new story.');
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
    } catch (e) {
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
  };

  return (
    <div className="min-h-screen bg-brand-secondary text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow p-4 w-full">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Ad Panel (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-1 pt-16">
            <AdSenseUnit slot="9818995672" className="h-64 mb-8" showPlaceholder />
          </aside>

          {/* Main Content */}
          <div className="w-full lg:col-span-3 flex flex-col space-y-6">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-center text-white">
              {story.length === 0 ? "Weave Your Tale" : "The Unfolding Saga"}
            </h2>
            {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md text-center">{error}</div>}
            <StoryDisplay story={story} isLoading={isLoading} />
            {story.length > 0 && !isLoading && (
              <div className="animate-fade-in text-center">
                <button 
                  onClick={startNew} 
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    Start a New Story
                </button>
              </div>
            )}
            <PromptInput onSubmit={handleSubmit} isLoading={isLoading} hasStory={story.length > 0} />
            {isLoading && <LoadingSpinner />}
            {/* Inline Ad (visible on all screens, but styled for mobile) */}
            <div className="my-6">
              <AdSenseUnit slot="9818995672" className="h-32 w-full" showPlaceholder />
            </div>
          </div>

          {/* Right Ad Panel (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-1 pt-16">
            <AdSenseUnit slot="9818995672" className="h-64 mb-8" showPlaceholder />
          </aside>
        </div>

        {/* Mobile Ad (Mobile Only, at the bottom) */}
        <div className="lg:hidden w-full mt-4">
          <AdSenseUnit slot="9818995672" className="h-32 w-full" showPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;