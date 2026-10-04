import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { InteractiveAssessment } from './InteractiveAssessment';
import { X, Sparkles, Clock } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Background scroll locking with position preservation
  useEffect(() => {
    if (!isOpen) return;

    // Capture currently focused element to return focus upon modal close
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // Save exact scroll position
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Ensure internal scroll container resets to 0 immediately upon open
    const resetScroll = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    };
    resetScroll();
    const frameId = requestAnimationFrame(resetScroll);

    // Initial focus on close button or first interactive element
    const timer = setTimeout(() => {
      resetScroll();
      closeButtonRef.current?.focus();
    }, 60);

    // Keyboard handlers: Escape to close and Tab cycle focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);

      // Restore body styles and original scroll position
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, scrollY);

      // Restore user focus to the button that opened the modal
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-assessment-title"
      className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col h-[100vh] h-[100dvh] max-h-[100vh] max-h-[100dvh] sm:h-auto sm:max-h-[min(92vh,92dvh)] rounded-none sm:rounded-3xl overflow-hidden border-0 sm:border sm:border-slate-200"
      >
        {/* Sticky Accessible Header with Title and Close Action (Never cut off or overlapping questions) */}
        <header className="sticky top-0 z-30 flex-shrink-0 bg-gradient-to-r from-teal-800 via-teal-700 to-sky-900 px-4 py-3 sm:px-6 sm:py-4 text-white flex items-center justify-between border-b border-teal-600/40 shadow-sm">
          <div className="flex-1 pr-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/25 border border-teal-300/30 text-teal-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-teal-300 flex-shrink-0" />
              <span>Triagem Clínica & Agendamento</span>
            </div>
            <h2
              id="modal-assessment-title"
              className="text-base sm:text-xl md:text-2xl font-extrabold text-white leading-tight truncate"
            >
              Quero Minha Avaliação com a Dra. Adriana
            </h2>
            <div className="flex items-center gap-3 text-[11px] sm:text-xs text-teal-100/90 mt-0.5">
              <span>Protocolo personalizado em 1 minuto</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-teal-200">
                <Clock className="w-3.5 h-3.5" /> 100% Individual
              </span>
            </div>
          </div>

          {/* Close Button with generous touch target >= 44x44px */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label="Fechar formulário de avaliação"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Container with Top-Reset and Mobile Padding */}
        <div
          ref={scrollContainerRef}
          tabIndex={-1}
          className="flex-1 overflow-y-auto overscroll-contain focus:outline-none bg-slate-50/50"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <InteractiveAssessment isModal={true} onClose={onClose} hideHeader={true} />
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};
