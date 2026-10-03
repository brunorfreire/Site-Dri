import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import servicoFisio from '../assets/images/servico_fisioterapia_dia_1789568720275.jpg';
import servicoManual from '../assets/images/servico_terapia_manual_1789568740537.jpg';
import estudioReformer from '../assets/images/estudio_reformer_1789568658900.jpg';
import estudioCadillac from '../assets/images/estudio_cadillac_1789568672592.jpg';
import estudioBarrel from '../assets/images/estudio_barrel_1789568687611.jpg';
import gestantesImg from '../assets/images/paraquem_gestantes_1789568608759.jpg';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const serviceCards = [
    {
      id: 'fisio-reab',
      title: 'Fisioterapia e Reabilitação',
      image: servicoFisio,
      description: 'Tratamento de lesões articulares, musculares e alívio de dor crônica na coluna.'
    },
    {
      id: 'terapia-manual',
      title: 'Terapia Manual e RPG',
      image: servicoManual,
      description: 'Reeducação Postural Global e técnicas manuais miofasciais especializadas.'
    },
    {
      id: 'pilates-clinico',
      title: 'Pilates Clínico em Aparelhos',
      image: estudioReformer,
      description: 'Fortalecimento seguro, estabilidade de core e mobilidade com orientação da fisioterapeuta.'
    },
    {
      id: 'gestantes-posparto',
      title: 'Gestantes & Pós-parto',
      image: gestantesImg,
      description: 'Prevenção de dores lombares, fortalecimento do assoalho pélvico e bem-estar materno.'
    },
    {
      id: 'cadillac-reab',
      title: 'Treinamento no Cadillac & Core',
      image: estudioCadillac,
      description: 'Exercícios suspensos e de descompressão da coluna com precisão biomecânica.'
    },
    {
      id: 'ladder-barrel',
      title: 'Alongamento no Barrel',
      image: estudioBarrel,
      description: 'Flexibilidade e extensão da coluna com suporte anatômico de alto conforto.'
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? serviceCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === serviceCards.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="servicos" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading matching mockup */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f3f48] tracking-tight">
            Nossos Serviços
          </h2>
        </div>

        {/* Carousel / Multi-card layout */}
        <div className="relative">
          {/* Navigation Controls matching mockup */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-teal-800 shadow-md items-center justify-center border border-slate-200 transition"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-teal-800 shadow-md items-center justify-center border border-slate-200 transition"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Grid / View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col group cursor-pointer"
                onClick={() => {
                  onSelectService({
                    id: item.id,
                    title: item.title,
                    subtitle: 'Atendimento Especializado com a Dra. Adriana',
                    description: item.description,
                    iconName: 'Activity',
                    tag: 'Presencial',
                    category: 'fisioterapia',
                    indications: ['Dores na coluna', 'Hérnia de disco', 'Recuperação articular'],
                    clinicalFocus: 'Biomecânica e postura'
                  });
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-700" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>

        </div>

      </div>
    </section>
  );
};
