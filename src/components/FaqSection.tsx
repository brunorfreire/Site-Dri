import React, { useState } from 'react';
import { FAQS } from '../data/content';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsappFaqUrl = `https://wa.me/${CLINIC_CONTACT.phoneRaw}?text=${encodeURIComponent(
    'Olá Dra. Adriana! Gostaria de tirar uma dúvida sobre a avaliação na clínica.'
  )}`;

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Dúvidas Frequentes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Perguntas <span className="italic font-normal text-emerald-800">Frequentes</span> sobre o Atendimento
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Esclareça suas dúvidas sobre a avaliação individual, a metodologia clínica e como iniciar seu tratamento.
          </p>
        </div>

        {/* Modern Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-emerald-300 bg-emerald-50/20 shadow-md shadow-emerald-950/5'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  
                  {/* Round Plus / Minus Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-emerald-900 text-white'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Prompt */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Ainda tem alguma pergunta específica?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Nossa equipe responde diretamente no WhatsApp para orientar seu caso.
            </p>
          </div>

          <a
            href={whatsappFaqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com a Dra. Adriana</span>
          </a>
        </div>

      </div>
    </section>
  );
};
