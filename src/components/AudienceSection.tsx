import React, { useState } from 'react';
import { AUDIENCES, CLINIC_CONTACT } from '../data/content';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { EditableImage } from './EditableImage';
import {
  Trophy,
  Heart,
  Baby,
  Dumbbell,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

interface AudienceSectionProps {
  onOpenAssessment: () => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ onOpenAssessment }) => {
  const [selectedAudience, setSelectedAudience] = useState<string>(AUDIENCES[0].id);

  const active = AUDIENCES.find((a) => a.id === selectedAudience) || AUDIENCES[0];

  const getAudienceIcon = (id: string) => {
    switch (id) {
      case 'atletas':
        return <Trophy className="w-5 h-5" />;
      case 'idosos':
        return <Heart className="w-5 h-5" />;
      case 'gestantes':
        return <Baby className="w-5 h-5" />;
      case 'homens':
        return <Dumbbell className="w-5 h-5" />;
      case 'reabilitacao-coluna':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const whatsappAudienceUrl = CLINIC_CONTACT.whatsappUrl;

  return (
    <section id="para-quem" className="py-20 md:py-28 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <span>Cuidado Especializado para Cada Momento da Vida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Para Quem É a Clínica da Dra. Adriana Martins?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Não importa a sua idade ou nível de condicionamento: o protocolo é desenhado para as particularidades da sua anatomia e do seu objetivo de vida.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {AUDIENCES.map((item) => {
            const isSelected = item.id === selectedAudience;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAudience(item.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/25 scale-102'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {getAudienceIcon(item.id)}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Audience Active Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-teal-900/40 relative overflow-hidden">
          
          {/* Subtle light accents */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  {active.badge}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Atendimento Clínico Guiado
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {active.title}
                </h3>
                <p className="text-sm sm:text-base text-teal-200/90 font-medium">
                  {active.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {active.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Como a Dra. Adriana atua no seu caso:
                </div>
                {active.highlights.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-teal-500/20 transition cursor-pointer"
                >
                  <span>Agendar Avaliação para {active.title.split('&')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappAudienceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conversar com Adriana no WhatsApp"
                  title="Conversar com Adriana no WhatsApp"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition"
                >
                  <MessageCircle className="w-4 h-4 text-teal-300" />
                  <span>Dúvida Rápida no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Side: Key Pillars & Community Focus */}
            <div className="lg:col-span-5 space-y-4">
              {/* Audience Specific Visual with Drag & Drop replacement */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-slate-900 h-48 sm:h-52 relative">
                <EditableImage
                  storageKey={`audience_${active.id}`}
                  defaultSrc={clinicImg}
                  alt={`Atendimento especializado para ${active.title}`}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                  label="Substituir Foto"
                  compact={true}
                  buttonPosition="top-right"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                    <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">
                      {active.badge} • Foco Clínico
                    </span>
                    <p className="text-xs font-semibold text-white truncate">
                      {active.subtitle}
                    </p>
                  </div>
                </EditableImage>
              </div>

              <div className="rounded-2xl bg-white/5 backdrop-blur-md p-6 border border-white/10 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Pilares de Segurança & Eficácia
                </div>
                
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between">
                    <span>Sem Turmas Superlotadas</span>
                    <strong className="text-teal-400">Exclusivo 1:1</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between">
                    <span>Aparelhos Oficiais de Pilates</span>
                    <strong className="text-teal-400">Linha Completa</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between">
                    <span>Evolução Documentada</span>
                    <strong className="text-teal-400">Métrica a Métrica</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-1">
                  * Pacientes de todas as idades relatam ganho substancial de mobilidade já nas primeiras 4 semanas de tratamento.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-900/40 border border-teal-500/30 text-center">
                <span className="text-xs text-teal-200">
                  Aparelhos: <strong>Reformer • Cadillac • Ladder Barrel • Step Chair • Maca de Terapia Manual</strong>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
