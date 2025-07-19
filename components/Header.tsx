export const Header = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm shadow-lg w-full p-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent mr-3"><path d="M12 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8Z"></path><path d="M18 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2"></path><path d="M12 6h-2"></path><path d="M12 10h-2"></path><path d="M12 14h-2"></path><path d="M12 18h-2"></path></svg>
        <h1 style={{fontFamily: "'Playfair Display', serif"}} className="text-2xl font-bold text-white tracking-wider">
          AI Story Weaver
        </h1>
      </div>
    </header>
  );
};
