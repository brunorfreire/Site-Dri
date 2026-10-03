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
}

export const InteractiveAssessment: React.FC<InteractiveAssessmentProps> = ({
  initialRegion = 'coluna-lombar',
  onClose,
  isModal = false
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
    { id: 'preventivo', label: 'Não sinto dor (prevenção/treino)', tag: 'Foco em Performance' },
  ];

  const goals = [
    { id: 'eliminar-dor', label: 'Eliminar a dor e parar de tomar remédios' },
    { id: 'voltar-esporte', label: 'Voltar a treinar ou praticar meu esporte favorito' },
    { id: 'corrigir-postura', label: 'Corrigir a postura e evitar cirurgias na coluna' },
    { id: 'ganhar-autonomia', label: 'Ganhar disposição, equilíbrio e autonomia diária' },
  ];

  const getRecommendation = () => {
    const reg = painRegions.find((r) => r.id === selectedRegion)?.label || 'Coluna e Articulações';
    let protocols: string[] = [];

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
      protocols.push('Terapia Manual e Mobilização');
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

  return (
    <div id="avaliacao" className={`${isModal ? 'p-0' : 'py-16 md:py-24 bg-gradient-to-b from-white via-teal-50/20 to-slate-50'}`}>
      <div className={`${isModal ? 'w-full' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Banner */}
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

          {/* Form / Triage Body */}
          <form onSubmit={handleSendToWhatsApp} className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Step 1: Region */}
            <div className="space-y-3">
              <label className="block text-sm font-extrabold uppercase tracking-wide text-slate-800">
                1. Onde você sente dor, incômodo ou deseja melhorar?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {painRegions.map((region) => (
                  <button
                    type="button"
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedRegion === region.id
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between">
                      <span>{region.label}</span>
                      {selectedRegion === region.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {region.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div className="space-y-3">
              <label className="block text-sm font-extrabold uppercase tracking-wide text-slate-800">
                2. Há quanto tempo esse desconforto se manifesta?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      duration === d.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{d.label}</div>
                    <div className={`text-[10px] mt-0.5 ${duration === d.id ? 'text-teal-200' : 'text-slate-400'}`}>
                      {d.tag}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pain Scale & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Pain Scale */}
              <div className="md:col-span-5 space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                    3. Nível de Desconforto (0 a 10)
                  </label>
                  <span className={`text-sm font-black px-2 py-0.5 rounded-md ${
                    painLevel <= 3
                      ? 'bg-emerald-100 text-emerald-800'
                      : painLevel <= 6
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {painLevel} / 10
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 - Nenhuma Dor</span>
                  <span>5 - Moderada</span>
                  <span>10 - Incapacitante</span>
                </div>
              </div>

              {/* Primary Goal */}
              <div className="md:col-span-7 space-y-3">
                <label className="block text-sm font-extrabold uppercase tracking-wide text-slate-800">
                  4. Qual o seu principal objetivo?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goals.map((g) => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setPrimaryGoal(g.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        primaryGoal === g.id
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold ring-1 ring-teal-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Generated Recommendation Preview */}
            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Indicação Personalizada da Clínica:</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                {rec.protocols.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label htmlFor="patient-name" className="text-xs font-bold text-slate-700">
                  Seu Nome Completo
                </label>
                <input
                  id="patient-name"
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="patient-phone" className="text-xs font-bold text-slate-700">
                  WhatsApp / Telefone para Contato
                </label>
                <input
                  id="patient-phone"
                  type="tel"
                  required
                  placeholder="Ex: (21) 97150-2301"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Seus dados serão enviados com segurança para a triagem da equipe da Dra. Adriana Martins.
              </div>

              <button
                type="submit"
                id="submit-triagem-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-teal-600 via-teal-700 to-sky-800 hover:from-teal-700 hover:to-sky-900 shadow-lg shadow-teal-700/25 transition cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-teal-200" />
                <span>Confirmar e Enviar para Dra. Adriana</span>
              </button>
            </div>

            {isSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>O WhatsApp da clínica foi aberto! Aguarde nosso contato ou envie a mensagem pronta.</span>
              </div>
            )}

          </form>

        </div>

      </div>
    </div>
  );
};
