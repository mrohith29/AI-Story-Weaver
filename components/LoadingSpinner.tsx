
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-pulse-slow flex flex-col items-center space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
            <path d="M12 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8Z"></path><path d="M18 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2"></path><path d="M12 6h-2"></path><path d="M12 10h-2"></path><path d="M12 14h-2"></path><path d="M12 18h-2"></path>
        </svg>
        <p className="text-gray-400 text-sm">The AI is weaving your story...</p>
      </div>
    </div>
  );
};
