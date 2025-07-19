import React, { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  hasStory: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading, hasStory }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const placeholderText = hasStory 
    ? "What happens next?..." 
    : "e.g., A lone spaceship drifted silently through the asteroid field...";

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4 animate-fade-in">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholderText}
          rows={3}
          disabled={isLoading}
          className="w-full p-4 pr-32 bg-paper border-2 border-subtle-border rounded-lg text-ink focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 placeholder:text-placeholder"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-zinc-400 disabled:cursor-not-allowed flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          {isLoading ? 'Weaving...' : (hasStory ? 'Continue' : 'Start')}
        </button>
      </div>
    </form>
  );
};