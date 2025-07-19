
import React, { useEffect, useRef } from 'react';

type StorySegment = {
  id: number | string;
  author: 'user' | 'ai';
  text: string;
};

interface StoryDisplayProps {
  story: StorySegment[];
  isLoading: boolean;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
  </div>
);

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  const endOfStoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfStoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [story]);

  if (story.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 min-h-[300px] flex items-center justify-center text-center text-gray-400 border-2 border-dashed border-gray-600">
        <div>
          <p className="text-lg">Your story awaits.</p>
          <p className="text-sm">Enter a prompt below to begin your adventure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 space-y-6 min-h-[300px] overflow-y-auto max-h-[60vh] border border-gray-700 shadow-inner">
      {story.map((segment) => (
        <div
          key={segment.id}
          className={`animate-fade-in flex flex-col ${segment.author === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`max-w-xl p-4 rounded-xl whitespace-pre-wrap ${
              segment.author === 'user'
                ? 'bg-brand-primary text-white rounded-br-none'
                : 'bg-gray-700 text-gray-200 rounded-bl-none'
            }`}
          >
            {segment.author === 'ai' && isLoading && segment.text === '...'
              ? <TypingIndicator />
              : segment.text}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {segment.author === 'user' ? 'You' : 'The Weaver'}
          </p>
        </div>
      ))}
      <div ref={endOfStoryRef} />
    </div>
  );
};
