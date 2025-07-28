import React from 'react';

const AdPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center bg-gray-700 text-gray-400 rounded-lg border border-dashed border-gray-500 ${className}`}
    style={{ minHeight: 64 }}
    aria-label="Ad Placeholder"
  >
    Ad Placeholder
  </div>
);

export default AdPlaceholder; 