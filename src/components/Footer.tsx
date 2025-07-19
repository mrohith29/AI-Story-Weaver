import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full p-4 mt-12 border-t border-subtle-border">
      <div className="max-w-6xl mx-auto text-center text-placeholder text-sm">
        <div className="flex justify-center space-x-4 mb-2">
          {/* TODO: Create pages/modals for these links */}
          <a href="/about.html" className="hover:text-accent transition-colors">About</a>
          <a href="/privacy.html" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="/contact.html" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} AI Story Weaver. All rights reserved.</p>
        <p className="mt-1">Crafted with creativity and code.</p>
      </div>
    </footer>
  );
};