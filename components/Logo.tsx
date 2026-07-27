import React from 'react';

export const Logo: React.FC<{ className?: string; imgClassName?: string }> = ({ className, imgClassName }) => (
  <div className={`flex items-center ${className || ''}`}>
    <img 
      src="/images/linhlabs-logo.png" 
      alt="Linh Labs - YOUR AI PARTNER" 
      className={imgClassName || "h-20 md:h-24 w-auto object-contain transition-all duration-300"}
    />
  </div>
);