import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Eye, X, ZoomIn } from 'lucide-react';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { EditableImage } from './EditableImage';

interface GalleryModalItem {
  src: string;
  title: string;
  desc?: string;
  tag?: string;
}

export const ClinicGallery: React.FC = () => {
  const [activeModalImage, setActiveModalImage] = useState<GalleryModalItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalImage(null);
      }
    };
    if (activeModalImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalImage]);

  const clinicFeatures = [
    {
      id: 'aparelhos',
      title: 'Aparelhos Originais de Pilates',
      desc: 'Reformer, Cadillac, Step Chair e Ladder Barrel em madeira nobre com molas reguladas para proteção articular.',
      tag: 'Biomecânica de Ponta'
    },
    {
      id: 'rpg',
      title: 'Espaço de RPG & Terapia Manual',
      desc: 'Ambiente tranquilo e isolado para ajustes posturais finos, liberação miofascial e tração vertebral manual.',
      tag: 'Alívio Imediato'
    },
    {
      id: 'propriocepcao',
      title: 'Propriocepção & Retorno ao Esporte',
      desc: 'Bolas suíças, rolos miofasciais, faixas elásticas e discos de equilíbrio para estabilização de alto nível.',
      tag: 'Performance'
    },
    {
      id: 'privacidade',
      title: 'Privacidade & Atendimento Individual',
      desc: 'Sem a agitação de academias ou estúdios lotados: aqui seu tratamento acontece em ambiente calmo e focado.',
      tag: 'Conforto & Respeito'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden" id="espaco">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Infraestrutura Clínica de Alta Precisão</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Um Ambiente Projetado para a Sua Recuperação
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Esqueça clínicas impessoais ou salas de aula barulhentas. Nosso espaço foi pensado em cada detalhe para promover acolhimento, concentração biomecânica e reabilitação eficaz.
          </p>
        </div>

        {/* Large Clinic Feature Banner */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white mb-12 grid grid-cols-1 lg:grid-cols-12">
          <div
            className="lg:col-span-7 relative min-h-[340px] lg:min-h-full cursor-pointer group"
            onClick={() => setActiveModalImage({
              src: clinicImg,
              title: 'Espaço Integrado de Pilates Clínico e Fisioterapia',
              desc: 'Equipamentos originais, molas calibradas e espaço climatizado e acolhedor.',
              tag: 'Studio Morada do Sol'
            })}
            title="Clique para ampliar a imagem do espaço clínico"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalImage({
                  src: clinicImg,
                  title: 'Espaço Integrado de Pilates Clínico e Fisioterapia',
                  desc: 'Equipamentos originais, molas calibradas e espaço climatizado e acolhedor.',
                  tag: 'Studio Morada do Sol'
                });
              }
            }}
          >
            <EditableImage
              storageKey="clinic_gallery_main"
              defaultSrc={clinicImg}
              alt="Clínica da Dra. Adriana Martins com equipamentos modernos de fisioterapia e pilates clínico"
              className="w-full h-full object-cover min-h-[340px] group-hover:scale-102 transition-transform duration-500"
              containerClassName="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden pointer-events-none" />
              <div className="absolute bottom-4 left-4 lg:hidden text-white pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                  Aparelhos Originais
                </span>
                <p className="text-sm font-semibold">
                  Cadillac, Reformer, Chair & Barrel
                </p>
              </div>

              {/* View Magnifier hint */}
              <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                <span>Ampliar</span>
              </div>
            </EditableImage>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
                Padrão Ouro de Reabilitação
              </span>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                A precisão dos aparelhos a favor do seu corpo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As molas e resistências progressivas permitem recrutar os músculos estabilizadores mais profundos da coluna vertebral sem provocar qualquer impacto nas cartilagens desgastadas.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {['Avaliação postural cinético-funcional minuciosa',
                'Supervisão contínua a cada respiração e alinhamento',
                'Higiene impecável e esterilização constante de materiais',
                'Espaço climatizado com iluminação natural revigorante'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#avaliacao"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 hover:text-teal-950 underline underline-offset-4"
              >
                <span>Agendar visita e conhecer a clínica</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo for this clinic space with Zoom capability */}
                <div
                  className="h-36 w-full rounded-xl overflow-hidden mb-3.5 relative bg-slate-100 cursor-pointer group"
                  onClick={() => setActiveModalImage({
                    src: clinicImg,
                    title: item.title,
                    desc: item.desc,
                    tag: item.tag
                  })}
                  title={`Clique para ampliar foto de ${item.title}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalImage({
                        src: clinicImg,
                        title: item.title,
                        desc: item.desc,
                        tag: item.tag
                      });
                    }
                  }}
                >
                  <EditableImage
                    storageKey={`gallery_feature_${item.id}`}
                    defaultSrc={clinicImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="p-2 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                      <Eye className="w-4 h-4 text-teal-300" />
                    </span>
                  </div>
                </div>

                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200/60 mb-2">
                  {item.tag}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Visitor Lightbox Viewer */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalImage.title}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              aria-label="Fechar visualização da imagem"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Enlarged Image */}
            <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-6 bg-slate-900 text-white space-y-2">
              {activeModalImage.tag && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-900/80 text-teal-300 border border-teal-500/30">
                  {activeModalImage.tag}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-bold font-serif">
                {activeModalImage.title}
              </h3>
              {activeModalImage.desc && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalImage.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
