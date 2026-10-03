import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'monogram';
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  lightMode = false
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Exact AM Monogram with Vertebral Spine curve matching mockup */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 110 60"
          className="h-10 sm:h-12 w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Vertebral Spine in soft mint-cyan */}
          <path
            d="M42 52 C38 42, 34 32, 38 22 C41 16, 38 10, 36 6"
            stroke="#5fa8ab"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="1.5 4"
          />
          {/* Spine Vertebrae Discs */}
          <circle cx="36" cy="6" r="2.2" fill="#5fa8ab" />
          <circle cx="38" cy="13" r="2.4" fill="#5fa8ab" />
          <circle cx="39" cy="21" r="2.5" fill="#5fa8ab" />
          <circle cx="37" cy="30" r="2.5" fill="#5fa8ab" />
          <circle cx="35" cy="38" r="2.4" fill="#5fa8ab" />
          <circle cx="37" cy="45" r="2.2" fill="#5fa8ab" />
          <circle cx="42" cy="52" r="2" fill="#5fa8ab" />

          {/* Letter A in elegant serif typeface */}
          <path
            d="M8 50 L18 50 M13 50 L27 8 L32 8 L46 50 M41 50 L51 50"
            stroke={lightMode ? '#ffffff' : '#27525d'}
            strokeWidth="3.4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M20 34 L39 34"
            stroke={lightMode ? '#ffffff' : '#27525d'}
            strokeWidth="2.4"
          />

          {/* Letter M in elegant serif typeface */}
          <path
            d="M48 50 L56 50 M52 50 L52 8 M47 8 L55 8"
            stroke={lightMode ? '#ffffff' : '#27525d'}
            strokeWidth="3.2"
            strokeLinecap="square"
          />
          <path
            d="M52 8 L70 42 L88 8"
            stroke={lightMode ? '#ffffff' : '#27525d'}
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M88 8 L88 50 M84 50 L92 50 M84 8 L92 8"
            stroke={lightMode ? '#ffffff' : '#27525d'}
            strokeWidth="3.2"
            strokeLinecap="square"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span
            className={`text-sm font-extrabold tracking-tight font-serif ${
              lightMode ? 'text-white' : 'text-[#234b56]'
            }`}
          >
            ADRIANA MARTINS
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-teal-600">
            Fisioterapia & Pilates
          </span>
        </div>
      )}
    </div>
  );
};
