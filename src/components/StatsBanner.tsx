import React from 'react';
import { Award, Users, Activity, ShieldCheck } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      value: '20+',
      label: 'Anos de Experiência',
      detail: 'Prática clínica contínua desde 2004',
      icon: Award
    },
    {
      value: '4.8K+',
      label: 'Pacientes Reabilitados',
      detail: 'Casos resolvidos de dor e pós-cirúrgico',
      icon: Users
    },
    {
      value: '99%',
      label: 'Recuperação Funcional',
      detail: 'Índice de alívio e retomada da rotina',
      icon: Activity
    },
    {
      value: '1:1',
      label: 'Atendimento Individual',
      detail: 'Aparelhos originais sem salas lotadas',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="relative z-20 -mt-8 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl sm:rounded-4xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-2 sm:p-4 lg:px-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2.5 sm:mb-3">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>
                <div className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 max-w-[180px] leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
