import React, { useState } from 'react';
import { CLINIC_CONTACT } from '../data/content';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = CLINIC_CONTACT.whatsappUrl;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 max-w-xs animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          <span>Olá! Deseja agendar sua avaliação com a Dra. Adriana?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-teal-400/50 cursor-pointer"
        aria-label="Conversar com Adriana no WhatsApp"
        title="Conversar com Adriana no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/10 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
