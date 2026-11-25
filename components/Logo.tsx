import React from 'react';

export const Logo: React.FC<{ className?: string; imgClassName?: string }> = ({ className, imgClassName }) => (
  <div className={`flex items-center ${className || ''}`}>
    <img 
      src="/images/linhlabs-logo-crop.png" 
      alt="Linh Labs - YOUR AI PARTNER" 
      className={imgClassName || "h-8 md:h-10 w-auto object-contain transition-all duration-300"}
    />
  </div>
);