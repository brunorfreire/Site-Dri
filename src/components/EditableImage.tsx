import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Check, RotateCcw } from 'lucide-react';

export interface EditableImageProps {
  storageKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  label?: string;
  compact?: boolean;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  allowReset?: boolean;
  onImageChange?: (newSrc: string) => void;
  children?: React.ReactNode;
  dragOverlayText?: string;
  aspectRatioClass?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  storageKey,
  defaultSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  label = 'Substituir Foto',
  compact = false,
  buttonPosition = 'top-right',
  allowReset = true,
  onImageChange,
  children,
  dragOverlayText = 'Solte a imagem aqui para substituir',
  aspectRatioClass = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from localStorage or fallback
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    try {
      return localStorage.getItem(`img_${storageKey}`) || defaultSrc;
    } catch {
      return defaultSrc;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Keep in sync if defaultSrc changes and no custom was saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`img_${storageKey}`);
      if (!saved) {
        setCurrentSrc(defaultSrc);
      }
    } catch {
      setCurrentSrc(defaultSrc);
    }
  }, [defaultSrc, storageKey]);

  const handleProcessFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCurrentSrc(dataUrl);
        try {
          localStorage.setItem(`img_${storageKey}`, dataUrl);
        } catch (err) {
          console.warn('Storage limit reached, cached in session', err);
        }

        // Post to backend for persistent file storage
        fetch('/api/save-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: storageKey, base64Data: dataUrl })
        }).catch(() => {});

        setIsSuccessToast(true);
        setTimeout(() => setIsSuccessToast(false), 3000);
        onImageChange?.(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSrc(defaultSrc);
    try {
      localStorage.removeItem(`img_${storageKey}`);
    } catch {}
    onImageChange?.(defaultSrc);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  // Button positioning classes
  const positionClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3'
  }[buttonPosition];

  const isCustomImage = currentSrc !== defaultSrc;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group overflow-hidden ${containerClassName} ${
        isDragging ? 'ring-4 ring-emerald-400 border-emerald-400' : ''
      }`}
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleProcessFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Rendered Image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${aspectRatioClass} transition-transform duration-500`}
        referrerPolicy="no-referrer"
      />

      {/* Optional Children (overlays, badges, content) */}
      {children}

      {/* Action Controls: Substituir Foto & Restaurar */}
      <div
        className={`absolute ${positionClasses} z-20 flex items-center gap-1.5 transition-opacity duration-200 ${
          compact ? 'opacity-90 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100' : 'opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Clique para escolher uma imagem ou arraste e solte o arquivo aqui"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/85 hover:bg-emerald-900 text-emerald-200 hover:text-white border border-emerald-400/40 text-[11px] font-bold shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          {compact ? (
            <>
              <Camera className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden xs:inline">{label}</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-emerald-300" />
              <span>{label}</span>
            </>
          )}
        </button>

        {/* Restore Original Button */}
        {allowReset && isCustomImage && (
          <button
            type="button"
            onClick={handleReset}
            title="Restaurar imagem padrão"
            className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 border border-white/20 text-[10px] font-medium shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-slate-300" />
            <span className="hidden sm:inline">Padrão</span>
          </button>
        )}
      </div>

      {/* Success Toast */}
      {isSuccessToast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 px-3.5 py-2 rounded-xl bg-emerald-600/95 text-white text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-fade-in pointer-events-none">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Foto atualizada com sucesso!</span>
        </div>
      )}

      {/* Drag & Drop Visual Indicator Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-40 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-emerald-400 rounded-inherit pointer-events-none animate-fade-in">
          <Upload className="w-10 h-10 text-emerald-300 animate-bounce mb-2" />
          <p className="text-white font-bold text-xs sm:text-sm">{dragOverlayText}</p>
          <p className="text-emerald-200/80 text-[11px] mt-0.5">Arraste e solte o arquivo PNG ou JPG</p>
        </div>
      )}
    </div>
  );
};
