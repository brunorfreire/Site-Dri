import React, { useState } from 'react';
import { CLINIC_CONTACT } from '../data/content';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = CLINIC_CONTACT.whatsappUrl;

  return (
    <aside
      aria-label="Atendimento rápido WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto"
    >
      {/* Tooltip speech bubble (constrained so it never causes horizontal overflow on 320px) */}
      {showTooltip && (
        <div className="bg-white text-slate-800 text-xs font-semibold px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 max-w-[calc(100vw-3rem)] sm:max-w-xs animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          <span className="leading-snug">Olá! Deseja agendar sua avaliação com a Dra. Adriana?</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer focus:outline-none min-w-[28px] min-h-[28px] flex items-center justify-center flex-shrink-0"
            aria-label="Fechar mensagem de WhatsApp"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Action Button (At least 44x44px target) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-teal-400/50 cursor-pointer min-w-[48px] min-h-[48px]"
        aria-label="Conversar com Dra. Adriana Martins no WhatsApp"
        title="Conversar com Dra. Adriana Martins no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/10 group-hover:rotate-6 transition-transform" />
      </a>
    </aside>
  );
};
