import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { EditableImage } from './EditableImage';

interface TherapeuticTreatmentsProps {
  onSelectService: (service: ServiceItem) => void;
}

export const TherapeuticTreatments: React.FC<TherapeuticTreatmentsProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fisioterapia' | 'pilates' | 'performance'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  // Curated imagery matching therapeutic modalities
  const treatmentImages: Record<string, string> = {
    'fisioterapia-ortopedica': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    'rpg-reeducacao-postural': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    'terapia-manual': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    'drenagem-linfatica': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=80',
    'pilates-clinico': clinicImg,
    'reabilitacao-desportiva': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  };

  return (
    <section id="servicos" className="py-24 md:py-32 bg-[#f4fbf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Serif & Italic */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tratamentos & Programas de Cuidado</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Nossos Tratamentos <br className="hidden sm:inline" />
            <span className="italic font-normal text-emerald-800">Terapêuticos</span> & <span className="italic font-normal text-teal-700">Clínicos Especializados</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Metodologias individualizadas orientadas pela Dra. Adriana Martins, unindo precisão biomecânica a aparelhos de ponta para restaurar seu bem-estar.
          </p>
        </div>

        {/* Filter Tabs with Rounded-2xl */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {[
            { id: 'all', label: 'Todos os Tratamentos' },
            { id: 'fisioterapia', label: 'Fisioterapia & RPG' },
            { id: 'pilates', label: 'Pilates Clínico em Aparelhos' },
            { id: 'performance', label: 'Desportiva & Alta Performance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white text-slate-700 hover:bg-emerald-50/60 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid with Scroll Reveal Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const cardImg = treatmentImages[service.id] || clinicImg;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectService(service)}
                className="group bg-white rounded-3xl sm:rounded-4xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Treatment Image with rounded-2xl */}
                  <div className="relative h-52 sm:h-56 w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-5 bg-slate-100">
                    <EditableImage
                      storageKey={`treatment_${service.id}`}
                      defaultSrc={cardImg}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      containerClassName="w-full h-full"
                      label="Substituir"
                      compact={true}
                      buttonPosition="top-right"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating Tag */}
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-emerald-900 shadow-xs pointer-events-none">
                        {service.tag}
                      </span>
                    </EditableImage>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5 mb-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Indications Checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {service.indications.slice(0, 2).map((ind, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Price/Time & Directional Arrow Button (Flexra requirement) */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Atendimento
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Sessão Individual (50 min)
                    </span>
                  </div>

                  {/* Round Top-Right Directional Arrow Button */}
                  <div className="w-12 h-12 rounded-full bg-emerald-900 text-white flex items-center justify-center group-hover:bg-emerald-700 group-hover:rotate-45 group-hover:scale-105 transition-all duration-300 shadow-md shadow-emerald-900/20">
                    <ArrowUpRight className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="mt-16 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold">
              Não sabe qual tratamento é o mais indicado para a sua queixa?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl font-light">
              Realize nossa triagem digital rápida de 1 minuto. A Dra. Adriana Martins analisará seus sintomas e indicará o protocolo mais seguro.
            </p>
          </div>

          <a
            href="#avaliacao"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-emerald-300 hover:bg-white text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>Iniciar Triagem de Dor</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
