import React, { useEffect, useRef } from 'react';

const TypingIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
  </div>
);

interface StorySegment {
  id: number;
  author: 'user' | 'ai';
  text: string;
}

interface StoryDisplayProps {
  story: StorySegment[];
  isLoading: boolean;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  const endOfStoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [story]);

  if (story.length === 0) {
    return (
      <div className="bg-paper rounded-lg p-6 min-h-[300px] flex items-center justify-center text-center text-placeholder border-2 border-dashed border-subtle-border">
        <div>
          <p className="text-lg">Your story awaits.</p>
          <p className="text-sm">Enter a prompt below to begin your adventure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper rounded-lg p-6 space-y-6 min-h-[300px] overflow-y-auto max-h-[60vh] border border-subtle-border shadow-inner">
      {story.map((segment) => (
        <div
          key={segment.id}
          className={`animate-fade-in flex flex-col ${segment.author === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`max-w-xl p-4 rounded-xl whitespace-pre-wrap shadow-sm ${
              segment.author === 'user'
                ? 'bg-accent text-white rounded-br-none'
                : 'bg-accent-light text-ink rounded-bl-none'
            }`}
          >
            {segment.author === 'ai' && isLoading && segment.text === '...'
              ? <TypingIndicator />
              : segment.text}
          </div>
          <p className="text-xs text-placeholder mt-1 px-1">
            {segment.author === 'user' ? 'You' : 'The Weaver'}
          </p>
        </div>
      ))}
      <div ref={endOfStoryRef} />
    </div>
  );
};