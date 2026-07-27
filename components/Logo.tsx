import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center ${className}`}>
    <img 
      src="/images/linhlabs-logo.png" 
      alt="Linh Labs - YOUR AI PARTNER" 
      className="h-14 w-auto object-contain"
    />
  </div>
);