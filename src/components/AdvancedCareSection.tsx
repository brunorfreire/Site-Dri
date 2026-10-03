import React from 'react';
import { Target, Compass, Award, ShieldCheck, Trophy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import worldMasterImg from '../assets/images/dra_adriana_world_master_1789567604246.jpg';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { CREDENTIALS } from '../data/content';
import { EditableImage } from './EditableImage';

interface AdvancedCareSectionProps {
  onOpenAssessment?: () => void;
}

export const AdvancedCareSection: React.FC<AdvancedCareSectionProps> = ({ onOpenAssessment }) => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Advanced Care & Reabilitação Funcional</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Excelência Clínica Moldada por <br className="hidden sm:inline" />
            <span className="italic font-normal text-emerald-800">Duas Décadas de Ciência</span> e <span className="italic font-normal text-teal-700">Mentalidade Campeã</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sob a liderança técnica da <strong>Dra. Adriana Martins</strong>, nossa prática clínica transcendeu o modelo tradicional de estúdio para se tornar um centro integrado de reabilitação e alta performance individual.
          </p>
        </div>

        {/* Main Grid: Visuals + Mission & Vision + Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Visual Proof & World Master Authority Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900">
              <EditableImage
                storageKey="advanced_care_dra_adriana"
                defaultSrc={worldMasterImg}
                alt="Dra. Adriana Martins campeã com a medalha World Master IBJJF Jiu-Jitsu 2024"
                className="w-full h-auto object-cover aspect-[3/4]"
                containerClassName="w-full"
                label="Substituir Foto"
                buttonPosition="top-right"
              >
                {/* Tournament Ribbon Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-transparent p-6 sm:p-8 text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-300" />
                    <span className="text-xs font-black tracking-widest uppercase text-amber-300">
                      WORLD MASTER IBJJF 2024
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                    Medalha de Ouro & Superação Esportiva
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/80 mt-1.5 leading-relaxed font-light">
                    A vivência direta no esporte de alto rendimento permite compreender a dor, a fadiga tecidual e a urgência de retornar ao movimento com segurança biomecânica máxima.
                  </p>
                </div>
              </EditableImage>
            </div>

            {/* Micro quote banner */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-emerald-50/70 border border-emerald-100 text-slate-700">
              <p className="text-xs sm:text-sm italic font-serif text-emerald-950 leading-relaxed">
                &ldquo;Conheça todas as teorias, domine todas as técnicas, mas ao tocar uma alma humana, seja apenas outra alma humana.&rdquo;
              </p>
              <span className="block text-[11px] font-bold text-emerald-700 mt-2 uppercase tracking-wider">
                — Filosofia clínica que orienta cada avaliação da Dra. Adriana
              </span>
            </div>
          </div>

          {/* Right Column: Mission, Vision & Curriculum Details */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Cuidado individualizado com foco na <span className="italic font-normal text-emerald-800">causa real</span> da disfunção, e não apenas no sintoma.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada corpo possui uma história mecânica única. Unimos a precisão analítica da fisioterapia ortopédica e do RPG à ergonomia dos aparelhos originais de Pilates (Reformer, Cadillac, Barrel e Chair) para promover alívio definitivo e ganho de força duradouro.
              </p>
            </div>

            {/* Mission & Vision Cards with Refined Thin Icons (Flexra Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Mission Card */}
              <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-800 flex items-center justify-center shadow-xs">
                  <Target className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Nossa Missão <span className="italic font-normal text-emerald-700 text-sm">(Mission)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Eliminar a dor crônica, recuperar lesões osteoarticulares e devolver a autonomia funcional de cada paciente por meio de ciência biomecânica e acolhimento humano.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-emerald-800 flex items-center justify-center shadow-xs">
                  <Compass className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Nossa Visão <span className="italic font-normal text-emerald-700 text-sm">(Vision)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ser o centro de referência máxima em reabilitação de alta performance e fisioterapia integrada, provando que longevidade ativa e movimento sem dor são acessíveis a todos.
                </p>
              </div>

            </div>

            {/* Academic Credentials extracted from bio */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Principais Credenciais Técnicas:</span>
              </h4>

              <div className="space-y-2.5">
                {[
                  {
                    title: 'Graduação em Fisioterapia (UNESA, 2004)',
                    desc: '20 anos de prática clínica ininterrupta com milhares de pacientes atendidos.'
                  },
                  {
                    title: 'Pós-Graduação em Traumato-Ortopedia e Desportiva (UGF)',
                    desc: 'Especialização em diagnóstico cinético-funcional e reabilitação de alta precisão.'
                  },
                  {
                    title: 'Especialista em RPG, Terapia Manual e Drenagem Linfática',
                    desc: 'Alinhamento postural das cadeias musculares e descompressão vertebral.'
                  },
                  {
                    title: 'Certificação em Pilates Clínico (Metacorpus, D&D, Vipilates)',
                    desc: 'Domínio de equipamentos originais (Cadillac, Reformer, Barrel e Chair).'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-emerald-200 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            {onOpenAssessment && (
              <div className="pt-2">
                <button
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition cursor-pointer"
                >
                  <span>Agendar Consulta com a Dra. Adriana</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
