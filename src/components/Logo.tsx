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
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Stylized AM Spinal & Dynamic Motion Monogram Icon */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-sky-700 shadow-md shadow-teal-500/15 p-1 sm:p-1.5 ring-1 ring-white/20">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Vertebral Column Arc Guides */}
          <path
            d="M50 14 C43 28, 57 42, 50 56 C43 70, 56 82, 50 88"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 6"
          />
          {/* Vertebral disc nodes */}
          <circle cx="50" cy="18" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="48" cy="36" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="52" cy="54" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="48" cy="72" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="50" cy="86" r="2" fill="#ffffff" opacity="0.9" />

          {/* Letter 'A' sweeping upward with spinal curve */}
          <path
            d="M20 84 L38 22 C42 16, 48 16, 51 22 L62 50"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dynamic A-Crossbar extending into wave motion */}
          <path
            d="M26 62 C34 58, 48 60, 58 62"
            stroke="#99f6e4"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Letter 'M' flowing with athletic curvature */}
          <path
            d="M50 84 L56 36 C59 28, 67 28, 71 36 L79 56 C82 62, 87 62, 89 54 L92 42"
            stroke="#e0f2fe"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M72 38 L84 84"
            stroke="#ffffff"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {variant !== 'monogram' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight text-sm sm:text-lg leading-tight ${
                lightMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              DRA. ADRIANA MARTINS
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-teal-600 uppercase">
              Fisioterapia
            </span>
            <span className="text-slate-300">•</span>
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase ${
                lightMode ? 'text-teal-200' : 'text-sky-800'
              }`}
            >
              Alta Performance
            </span>
          </div>
          {variant === 'full' && (
            <span
              className={`hidden sm:block text-[9px] font-medium tracking-wide ${
                lightMode ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              RPG • Terapia Manual • Pilates Clínico
            </span>
          )}
        </div>
      )}
    </div>
  );
};
