import React from 'react';
import { Award, GraduationCap, Activity, CheckCircle2, ShieldCheck, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { CREDENTIALS } from '../data/content';
import worldMasterImg from '../assets/images/dra_adriana_quimono_preto.jpg';
import { EditableImage } from './EditableImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Autoridade & Experiência Comprovada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sobre a Dra. Adriana Martins
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Mais do que aplicar protocolos genéricos, a Dra. Adriana une <strong>20 anos de formação acadêmica rigorosa</strong> à mentalidade e biomecânica de uma <strong>atleta campeã mundial</strong>.
          </p>
        </div>

        {/* Main Content Grid: Athlete Photo + World Master Proof + Full Resume */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left: World Master Photo & Sports Authority Highlight */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 ring-1 ring-slate-200">
              <EditableImage
                storageKey="about_world_master"
                defaultSrc={worldMasterImg}
                alt="Dra. Adriana Martins com quimono preto - Campeã World Master IBJJF"
                className="w-full h-auto object-cover object-top aspect-[3/4]"
                containerClassName="w-full"
              >
                {/* Tournament Ribbon Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-black tracking-widest uppercase text-amber-300">
                      WORLD MASTER IBJJF 2024
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Medalha de Ouro & Superação Esportiva
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    A vivência direta nas competições de alto rendimento permite entender as dores, a fadiga articular e a urgência do paciente em retornar às atividades com segurança máxima.
                  </p>
                </div>
              </EditableImage>
            </div>

            {/* Micro quote below photo */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <p className="text-xs italic text-slate-700 font-medium">
                &ldquo;Conheça todas as teorias, domine todas as técnicas, mas ao tocar uma alma humana, seja apenas outra alma humana.&rdquo;
              </p>
              <span className="block text-[11px] font-semibold text-teal-700 mt-1">
                — Princípio que guia cada atendimento da Dra. Adriana
              </span>
            </div>
          </div>

          {/* Right: Academic Resume & Clinical Capabilities */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Uma trajetória moldada pela excelência técnica e cuidado humano
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Fundadora da clínica e responsável técnica por cada plano terapêutico, a Dra. Adriana Martins fez a transição de um estúdio tradicional para um <strong>centro de reabilitação e alta performance</strong> que atende desde pessoas da terceira idade que buscam independência e alívio de dores crônicas até atletas de alto rendimento.
              </p>
            </div>

            {/* Curriculum Cards extracted directly from official bio */}
            <div className="space-y-3.5 pt-2">
              {CREDENTIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 hover:bg-teal-50/50 border border-slate-200/80 hover:border-teal-300/80 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100/80 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    {idx === 0 && <GraduationCap className="w-5 h-5" />}
                    {idx === 1 && <Award className="w-5 h-5" />}
                    {idx === 2 && <Activity className="w-5 h-5" />}
                    {idx === 3 && <CheckCircle2 className="w-5 h-5" />}
                    {idx === 4 && <Trophy className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {item.yearOrDetail}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal-700">
                      {item.institution}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clinical Pillars */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>O Diferencial do Nosso Atendimento</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Aqui você nunca é apenas &ldquo;mais um aluno na sala&rdquo;. Cada sessão é <strong>100% personalizada e conduzida com olhar de fisioterapeuta</strong>, unindo maca clínica para ajustes miofasciais com aparelhos originais de Pilates para fortalecimento seguro.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
