import React from 'react';
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
  if (!service) return null;

  const whatsappUrl = CLINIC_CONTACT.whatsappUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col justify-between">
        
        {/* Header with Visual Banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-emerald-950">
          <EditableImage
            storageKey={`treatment_${service.id}`}
            defaultSrc={clinicImg}
            alt={service.title}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
            label="Substituir Foto"
            compact={true}
            buttonPosition="top-left"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent pointer-events-none" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 inline-block mb-1.5">
                {service.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {service.title}
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                {service.subtitle}
              </p>
            </div>
          </EditableImage>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sobre o Tratamento
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
                Principais Indicações:
              </h5>
              <div className="space-y-1.5">
                {service.indications.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
                Benefícios Clínicos:
              </h5>
              <div className="space-y-1.5">
                {service.benefits.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-teal-600" />
              Duração da Sessão: <strong>50 a 60 minutos individuais</strong>
            </span>
            <span className="text-teal-800 font-bold">100% Guiado por Fisioterapeuta</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            Voltar
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com Adriana no WhatsApp"
            title="Conversar com Adriana no WhatsApp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Este Tratamento</span>
          </a>
        </div>

      </div>
    </div>
  );
};
