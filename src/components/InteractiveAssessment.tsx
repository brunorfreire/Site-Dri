import React, { useState } from 'react';
import { CLINIC_CONTACT } from '../data/content';
import {
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface InteractiveAssessmentProps {
  initialRegion?: string;
  onClose?: () => void;
  isModal?: boolean;
  hideHeader?: boolean;
}

export const InteractiveAssessment: React.FC<InteractiveAssessmentProps> = ({
  initialRegion = 'coluna-lombar',
  onClose,
  isModal = false,
  hideHeader = false
}) => {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [duration, setDuration] = useState('1-6-meses');
  const [painLevel, setPainLevel] = useState<number>(6);
  const [primaryGoal, setPrimaryGoal] = useState('eliminar-dor');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const painRegions = [
    { id: 'coluna-lombar', label: 'Coluna Lombar / Nervo Ciático', desc: 'Pontadas, travamentos e irradiação para as pernas' },
    { id: 'cervical-ombros', label: 'Cervical, Pescoço & Ombros', desc: 'Tensão constante, dor de cabeça e queimação' },
    { id: 'joelhos-quadril', label: 'Joelhos, Tornozelos & Quadril', desc: 'Desconforto ao caminhar, agachar ou correr' },
    { id: 'postura-escoliose', label: 'Postura, Escoliose & Alinhamento', desc: 'Sensação de corpo desalinhado ou curvado' },
    { id: 'pos-operatorio', label: 'Pós-Cirúrgico / Lesão Traumática', desc: 'Recuperação de ligamentos, meniscos ou próteses' },
    { id: 'rendimento-esporte', label: 'Alta Performance Esportiva & Lutas', desc: 'Prevenção de lesões, ganho de mobilidade e força' },
  ];

  const durations = [
    { id: 'recente', label: 'Menos de 1 mês', tag: 'Quadro Recente/Agudo' },
    { id: '1-6-meses', label: 'Entre 1 e 6 meses', tag: 'Quadro Subagudo' },
    { id: 'mais-6-meses', label: 'Mais de 6 meses', tag: 'Quadro Crônico' },
    { id: 'preventivo', label: 'Não sinto dor (prevenção)', tag: 'Foco em Performance' },
  ];

  const goals = [
    { id: 'eliminar-dor', label: 'Eliminar a dor e parar de tomar remédios' },
    { id: 'voltar-esporte', label: 'Voltar a treinar ou praticar meu esporte favorito' },
    { id: 'corrigir-postura', label: 'Corrigir a postura e evitar cirurgias na coluna' },
    { id: 'ganhar-autonomia', label: 'Ganhar disposição, equilíbrio e autonomia diária' },
  ];

  const getRecommendation = () => {
    const reg = painRegions.find((r) => r.id === selectedRegion)?.label || 'Coluna e Articulações';
    const protocols: string[] = [];

    if (selectedRegion.includes('coluna') || selectedRegion.includes('postura')) {
      protocols.push('Avaliação Postural por RPG (Reeducação Postural Global)');
      protocols.push('Pilates Clínico em Aparelhos para descompressão discal');
      protocols.push('Terapia Manual Miofascial para liberação de tensões');
    } else if (selectedRegion.includes('esporte')) {
      protocols.push('Fisioterapia Desportiva e Análise Biomecânica de Movimento');
      protocols.push('Pilates Funcional de Alta Performance');
      protocols.push('Recuperação Miofascial e Prevenção de Recidivas');
    } else {
      protocols.push('Fisioterapia Traumato-Ortopédica Individualizada');
      protocols.push('Fortalecimento Guiado sem Impacto Articular');
      protocols.push('Terapia Manual e Mobilização Articular');
    }

    return {
      regionName: reg,
      protocols,
    };
  };

  const rec = getRecommendation();

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const regionObj = painRegions.find((r) => r.id === selectedRegion);
    const durationObj = durations.find((d) => d.id === duration);
    const goalObj = goals.find((g) => g.id === primaryGoal);

    const message = `Olá Dra. Adriana Martins! Realizei a triagem rápida na sua landing page:
- *Nome:* ${patientName || 'Não informado'}
- *Telefone/WhatsApp:* ${phone || 'Não informado'}
- *Região com dor/desconforto:* ${regionObj?.label}
- *Tempo sentindo isso:* ${durationObj?.label}
- *Intensidade da dor (0 a 10):* ${painLevel}/10
- *Principal objetivo:* ${goalObj?.label}

Gostaria de agendar minha avaliação clínica individual!`;

    const url = `https://wa.me/${CLINIC_CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const formContent = (
    <form
      onSubmit={handleSendToWhatsApp}
      className={`space-y-6 sm:space-y-8 ${isModal ? 'p-1 sm:p-2' : 'p-6 sm:p-8 lg:p-10'} pb-[max(2.5rem,env(safe-area-inset-bottom,20px))]`}
    >
      {/* Intro Note (Mobile-friendly, reassuring introduction) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-teal-50/90 border border-teal-200/80 text-slate-700 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
        <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-teal-950 font-bold block sm:inline">Triagem Clínica Direta:</strong>{' '}
          Responda em 1 minuto para a Dra. Adriana Martins orientar seu atendimento individualizado com hora marcada.
        </div>
      </div>

      {/* Step 1: Region */}
      <fieldset className="space-y-3">
        <legend className="block text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
          1. Onde você sente dor, incômodo ou deseja melhorar?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {painRegions.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <button
                type="button"
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer min-h-[52px] focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/25 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-1.5">
                  <span className="leading-snug">{region.label}</span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {region.desc}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2: Duration */}
      <fieldset className="space-y-3">
        <legend className="block text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
          2. Há quanto tempo esse desconforto se manifesta?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {durations.map((d) => {
            const isSelected = duration === d.id;
            return (
              <button
                type="button"
                key={d.id}
                onClick={() => setDuration(d.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer min-h-[50px] flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="text-xs sm:text-sm font-bold leading-tight">{d.label}</div>
                <div className={`text-[10px] mt-0.5 font-medium ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                  {d.tag}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Step 3: Pain Scale & Goal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Pain Scale */}
        <div className="md:col-span-5 space-y-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <label htmlFor="pain-level-slider" className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
              3. Nível de Desconforto (0 a 10)
            </label>
            <span
              className={`text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-lg ${
                painLevel <= 3
                  ? 'bg-emerald-100 text-emerald-800'
                  : painLevel <= 6
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {painLevel} / 10
            </span>
          </div>

          <input
            id="pain-level-slider"
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Escala de dor de 0 a 10"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>0 - Sem Dor</span>
            <span>5 - Moderada</span>
            <span>10 - Severa</span>
          </div>
        </div>

        {/* Primary Goal */}
        <fieldset className="md:col-span-7 space-y-3">
          <legend className="block text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900">
            4. Qual o seu principal objetivo?
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {goals.map((g) => {
              const isSelected = primaryGoal === g.id;
              return (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => setPrimaryGoal(g.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer min-h-[46px] flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isSelected
                      ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold ring-1 ring-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="leading-snug">{g.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Generated Recommendation Preview */}
      <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900">
          <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span>Indicação Terapêutica da Dra. Adriana para sua queixa:</span>
        </div>
        <div className="text-xs sm:text-sm text-slate-700 space-y-1.5">
          {rec.protocols.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span className="leading-snug">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Inputs (font-size >= 16px to prevent iOS auto-zoom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="space-y-1.5">
          <label htmlFor="patient-name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Seu Nome Completo
          </label>
          <input
            id="patient-name"
            type="text"
            required
            placeholder="Ex: João da Silva"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-base bg-white text-slate-900 scroll-mb-24 shadow-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="patient-phone" className="text-xs font-bold uppercase tracking-wider text-slate-700">
            WhatsApp / Telefone para Contato
          </label>
          <input
            id="patient-phone"
            type="tel"
            required
            placeholder="Ex: (21) 97150-2301"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-base bg-white text-slate-900 scroll-mb-24 shadow-xs"
          />
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center sm:text-left leading-relaxed">
          Seus dados serão enviados diretamente para a triagem da clínica no WhatsApp oficial.
        </div>

        <button
          type="submit"
          id="submit-triagem-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 via-teal-700 to-sky-800 hover:from-teal-700 hover:to-sky-900 shadow-lg shadow-teal-700/25 transition cursor-pointer min-h-[50px] active:scale-[0.99]"
        >
          <MessageCircle className="w-5 h-5 text-teal-200 flex-shrink-0" />
          <span>Confirmar e Enviar para Dra. Adriana</span>
        </button>
      </div>

      {isSubmitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>O WhatsApp da clínica foi aberto! Aguarde nossa confirmação ou envie a mensagem pré-formatada.</span>
        </div>
      )}
    </form>
  );

  // If inside modal and header is handled by modal container
  if (isModal && hideHeader) {
    return formContent;
  }

  // Standalone on-page section
  return (
    <div id="avaliacao" className={`${isModal ? 'p-0' : 'py-16 md:py-24 bg-gradient-to-b from-white via-teal-50/20 to-slate-50'}`}>
      <div className={`${isModal ? 'w-full' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Top Banner on Public Landing Page */}
          <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-900 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-300/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                  <span>Triagem Clínica & Agendamento</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Quero Minha Avaliação com a Dra. Adriana
                </h3>
                <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
                  Descubra em 1 minuto o protocolo terapêutico mais indicado para sua queixa antes da sua consulta individual.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-xs text-teal-200 font-medium">Tempo estimado:</span>
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  <Clock className="w-4 h-4 text-teal-300" /> 1 minuto
                </span>
              </div>
            </div>
          </div>

          {formContent}
        </div>
      </div>
    </div>
  );
};
