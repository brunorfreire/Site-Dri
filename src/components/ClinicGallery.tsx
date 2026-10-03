import React from 'react';
import { Sparkles, Shield, Award, HeartHandshake, Eye, Check } from 'lucide-react';
import clinicImg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import { EditableImage } from './EditableImage';

export const ClinicGallery: React.FC = () => {
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
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
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
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full">
            <EditableImage
              storageKey="clinic_gallery_main"
              defaultSrc={clinicImg}
              alt="Clínica da Dra. Adriana Martins com equipamentos modernos de fisioterapia e pilates clínico"
              className="w-full h-full object-cover min-h-[340px]"
              containerClassName="w-full h-full"
              label="Substituir Foto da Clínica"
              buttonPosition="top-left"
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
                {/* Photo for this clinic space with Drag & Drop */}
                <div className="h-36 w-full rounded-xl overflow-hidden mb-3.5 relative bg-slate-100">
                  <EditableImage
                    storageKey={`gallery_feature_${item.id}`}
                    defaultSrc={clinicImg}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    label="Foto"
                    compact={true}
                    buttonPosition="top-right"
                  />
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
    </section>
  );
};
