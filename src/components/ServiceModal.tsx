import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { EditableImage } from './EditableImage';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenAssessment: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenAssessment
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!service) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

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
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);

      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, scrollY);

      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [service, onClose]);

  if (!service) return null;

  const whatsappUrl = CLINIC_CONTACT.whatsappUrl;

  const modalContent = (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
      className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-none sm:rounded-3xl max-w-2xl w-full h-[100vh] h-[100dvh] max-h-[100vh] max-h-[100dvh] sm:h-auto sm:max-h-[min(90vh,90dvh)] shadow-2xl border-0 sm:border sm:border-slate-100 flex flex-col justify-between overflow-hidden"
      >
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Header with Visual Banner */}
          <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-emerald-950 flex-shrink-0">
            <EditableImage
              storageKey={`treatment_${service.id}`}
              defaultSrc={clinicImg}
              alt={service.title}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent pointer-events-none" />
              
              {/* Close Button >= 44x44px */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 active:bg-black text-white flex items-center justify-center transition cursor-pointer border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label="Fechar detalhes do tratamento"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 inline-block mb-1.5">
                  {service.tag}
                </span>
                <h2 id="modal-service-title" className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                  {service.title}
                </h2>
                <p className="text-xs text-emerald-200/90 mt-0.5 line-clamp-1">
                  {service.subtitle}
                </p>
              </div>
            </EditableImage>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Sobre o Tratamento
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
                  Principais Indicações:
                </h4>
                <div className="space-y-1.5">
                  {service.indications.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
                  Benefícios Clínicos:
                </h4>
                <div className="space-y-1.5">
                  {service.benefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                Duração da Sessão: <strong>50 a 60 min individuais</strong>
              </span>
              <span className="text-teal-800 font-bold">100% Guiado por Fisioterapeuta</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 flex-shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,16px))]">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={onOpenAssessment}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Fazer Triagem Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com Adriana no WhatsApp"
            title="Conversar com Adriana no WhatsApp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};
