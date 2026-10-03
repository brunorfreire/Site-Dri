import React from 'react';
import { Star, Quote, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { EditableImage } from './EditableImage';

const getInitialAvatar = (name: string, bg: string) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="${encodeURIComponent(bg)}"/><text x="50%" y="54%" font-family="system-ui, sans-serif" font-size="42" font-weight="bold" fill="%23ffffff" dominant-baseline="middle" text-anchor="middle">${initials}</text></svg>`;
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#042f2e] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stories Reflect Real Recovery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Histórias Reais de <span className="italic font-normal text-emerald-300">Superação</span> & <span className="italic font-normal text-teal-200">Vida sem Dor</span>
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed max-w-2xl mx-auto font-light">
            Veja relatos espontâneos de pacientes que recuperaram a mobilidade, evitaram cirurgias e retornaram ao esporte com a Dra. Adriana Martins.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-emerald-950/60 backdrop-blur-md rounded-3xl sm:rounded-4xl p-8 border border-emerald-800/60 shadow-xl flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 relative group"
            >
              <div>
                {/* Quote Icon & 5 Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300 stroke-none" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-700/60 group-hover:text-emerald-500/60 transition-colors" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-emerald-50/90 leading-relaxed font-light mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              {/* Patient Profile & Clinical Outcome */}
              <div className="pt-6 border-t border-emerald-900/80 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-emerald-500/40 shadow-md">
                      <EditableImage
                        storageKey={`avatar_${testimonial.id}`}
                        defaultSrc={getInitialAvatar(testimonial.name, '#064e3b')}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-emerald-300/80">
                        {testimonial.role} • {testimonial.age} anos
                      </p>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                </div>

                {/* Outcome Badge */}
                <div className="pt-1">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-900/90 border border-emerald-500/30 text-emerald-200">
                    ✓ {testimonial.outcome}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Highlight Banner below testimonials */}
        <div className="mt-14 max-w-2xl mx-auto p-5 rounded-2xl bg-emerald-900/50 border border-emerald-700/40 text-center">
          <p className="text-xs sm:text-sm text-emerald-200">
            Mais de <strong>4.800 avaliações clínicas e sessões personalizadas</strong> conduzidas com foco rigoroso em segurança biomecânica.
          </p>
        </div>

      </div>
    </section>
  );
};
