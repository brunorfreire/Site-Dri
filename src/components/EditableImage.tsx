import React from 'react';

export interface EditableImageProps {
  storageKey?: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  aspectRatioClass?: string;
}

/**
 * Robust image presentation component for the public site:
 * - Direct, high-performance rendering of assets
 * - No editing buttons, hover controls, or file inputs for site visitors
 * - Preserves responsive overlays, badges, and visitor viewing experience
 * - Images are maintained directly in project files and code via Google AI Studio
 */
export const EditableImage: React.FC<EditableImageProps> = ({
  defaultSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  children,
  aspectRatioClass = ''
}) => {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={defaultSrc}
        alt={alt}
        className={`${className} ${aspectRatioClass}`}
        referrerPolicy="no-referrer"
      />
      {children}
    </div>
  );
};
