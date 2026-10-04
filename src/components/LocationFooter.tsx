import React, { useState } from 'react';
import { CLINIC_CONTACT } from '../data/content';
import { Logo } from './Logo';
import {
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  Instagram,
  Navigation,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LocationFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'fisioterapia-ortopedica',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, Adriana! Vim pelo seu site e gostaria de saber mais sobre os atendimentos e agendar uma avaliação.

Informações de contato:
- *Nome:* ${formData.name}
- *Telefone/WhatsApp:* ${formData.phone}
- *Serviço de Interesse:* ${formData.service}
- *Mensagem:* ${formData.message || 'Gostaria de verificar horários disponíveis para avaliação.'}`;

    const url = `https://wa.me/${CLINIC_CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const whatsappDirect = CLINIC_CONTACT.whatsappUrl;

  return (
    <footer id="contato" className="bg-[#042f2e] text-white relative pt-24 pb-12 overflow-hidden border-t border-emerald-900/60">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact & Map Card */}
        <div className="bg-emerald-950/70 backdrop-blur-md rounded-3xl sm:rounded-4xl border border-emerald-800/60 p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Contact Information & Hours */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Localização & Atendimento</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Venha Conhecer Nossa Clínica
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 leading-relaxed font-light">
                  Ambiente exclusivo com climatização, estacionamento e infraestrutura completa de Pilates clínico e fisioterapia de alta precisão.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-4 pt-1">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900/90 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-700/50">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Endereço</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{CLINIC_CONTACT.address}</div>
                    <div className="text-xs text-emerald-200/70 mt-0.5">Barra da Tijuca • Fácil acesso com estacionamento</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900/90 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-700/50">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Horários de Atendimento</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{CLINIC_CONTACT.hours}</div>
                    <div className="text-xs text-emerald-200/70 mt-0.5">Sessões individuais de 50 a 60 minutos com hora marcada</div>
                  </div>
                </div>

                {/* WhatsApp & Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900/90 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-700/50">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">WhatsApp & Telefone</div>
                    <a
                      href={whatsappDirect}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-emerald-300 transition flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      aria-label="Conversar com Adriana no WhatsApp"
                      title="Conversar com Adriana no WhatsApp"
                    >
                      <span>{CLINIC_CONTACT.phone}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                    <div className="text-xs text-emerald-300 mt-0.5 font-medium">Resposta rápida da recepção clínica</div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900/90 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-700/50">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Instagram Oficial</div>
                    <a
                      href={CLINIC_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-emerald-300 transition flex items-center gap-1.5 mt-0.5 cursor-pointer"
                      aria-label="Visitar Instagram @pilatesmoradadosol"
                      title="Visitar Instagram @pilatesmoradadosol"
                    >
                      <span>{CLINIC_CONTACT.instagram}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                    <div className="text-xs text-emerald-200/70 mt-0.5">Acompanhe rotina, posturas e novidades</div>
                  </div>
                </div>
              </div>

              {/* Interactive Stylized Map */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-800/80 bg-emerald-950 p-4 relative">
                <div className="flex items-center justify-between text-xs text-emerald-200 mb-2">
                  <span className="font-semibold flex items-center gap-1.5 text-emerald-300">
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    Como Chegar (Google Maps & Waze)
                  </span>
                  <span className="text-[10px] text-emerald-300/70">Jardim Oceânico / Barra</span>
                </div>

                {/* SVG Visual Map Interface */}
                <div className="w-full h-40 rounded-xl bg-slate-900 relative overflow-hidden border border-emerald-800 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,40 Q150,60 300,30 T600,50" stroke="#10b981" strokeWidth="4" fill="none" />
                      <path d="M50,0 Q70,120 90,200" stroke="#334155" strokeWidth="6" fill="none" />
                      <path d="M220,0 L240,200" stroke="#0ea5e9" strokeWidth="3" fill="none" />
                      <path d="M0,130 L600,110" stroke="#475569" strokeWidth="5" fill="none" />
                    </svg>
                  </div>

                  {/* Clinic Pin */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce">
                    <div className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Clínica Dra. Adriana Martins
                    </div>
                    <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-emerald-600" />
                  </div>

                  <a
                    href="https://maps.google.com/?q=Barra+da+Tijuca+Rio+de+Janeiro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-white text-[11px] font-bold border border-emerald-700/60 flex items-center gap-1.5 shadow"
                  >
                    <span>Abrir no GPS</span>
                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right: Direct Contact Form (Without Email) */}
            <div className="lg:col-span-6 bg-emerald-900/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-700/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Envie uma Mensagem Direta
                  </h4>
                  <p className="text-xs text-emerald-100/80">
                    Nossa equipe responderá com horários disponíveis e instruções para sua primeira avaliação.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="footer-name" className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
                      Seu Nome Completo
                    </label>
                    <input
                      id="footer-name"
                      type="text"
                      required
                      placeholder="Ex: Amanda Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-300/40 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="footer-phone" className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
                      WhatsApp ou Telefone
                    </label>
                    <input
                      id="footer-phone"
                      type="tel"
                      required
                      placeholder="Ex: (21) 97150-2301"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-300/40 min-h-[48px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="footer-service" className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
                      Serviço Desejado
                    </label>
                    <select
                      id="footer-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[48px]"
                    >
                      <option value="fisioterapia-ortopedica">Fisioterapia Traumato-Ortopédica</option>
                      <option value="rpg-postural">RPG - Reeducação Postural Global</option>
                      <option value="pilates-clinico">Pilates Clínico em Aparelhos</option>
                      <option value="terapia-manual">Terapia Manual & Liberação Miofascial</option>
                      <option value="desportiva-alta-performance">Fisioterapia Desportiva & Performance</option>
                      <option value="drenagem-linfatica">Drenagem Linfática Especializada</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="footer-message" className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
                      Descreva brevemente sua queixa ou dor
                    </label>
                    <textarea
                      id="footer-message"
                      rows={3}
                      placeholder="Ex: Sinto dores na coluna lombar ao sentar ou treinar..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-300/40 min-h-[80px]"
                    />
                  </div>

                  <button
                    type="submit"
                    aria-label="Conversar com Adriana no WhatsApp"
                    title="Conversar com Adriana no WhatsApp"
                    className="w-full py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[50px] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem pelo WhatsApp</span>
                  </button>

                  {submitted && (
                    <div className="p-3.5 rounded-2xl bg-emerald-800/80 border border-emerald-400/50 text-emerald-100 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      <span>Mensagem formatada com sucesso! Redirecionando para o WhatsApp.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Fast Direct WhatsApp Button */}
              <div className="pt-5 mt-5 border-t border-emerald-800/80">
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conversar com Adriana no WhatsApp"
                  title="Conversar com Adriana no WhatsApp"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-950/90 hover:bg-emerald-950 text-emerald-200 border border-emerald-600/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Agendamento Rápido no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Direct Channels Showcase Row (Replaces Email Newsletter) */}
        <div className="p-8 sm:p-10 rounded-3xl sm:rounded-4xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 border border-emerald-700/50 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Canais Oficiais de Contato</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Acompanhe a Dra. Adriana no Instagram & WhatsApp
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-light leading-relaxed">
              Conteúdos práticos de postura, bastidores clínicos e atendimento direto sem intermediários.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <a
              href={CLINIC_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Instagram @pilatesmoradadosol"
              title="Visitar Instagram @pilatesmoradadosol"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-600 hover:from-fuchsia-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Visitar Instagram @pilatesmoradadosol</span>
            </a>

            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar com Adriana no WhatsApp"
              title="Conversar com Adriana no WhatsApp"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Logo, Navigation Links, Copyright & CREFITO */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-emerald-200/70">
          <Logo variant="compact" lightMode={true} />

          <div className="text-center md:text-left space-y-1">
            <p>
              © {new Date().getFullYear()} Dra. Adriana Martins | Fisioterapia & Alta Performance. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-emerald-400">
              Responsabilidade Técnica: Dra. Adriana Martins • {CLINIC_CONTACT.crefito}
            </p>
          </div>

          <div className="flex items-center gap-3.5 text-xs font-medium flex-wrap justify-center">
            <a href="#inicio" className="hover:text-white transition">Início</a>
            <span>•</span>
            <a href="#sobre" className="hover:text-white transition">Sobre Nós</a>
            <span>•</span>
            <a href="#servicos" className="hover:text-white transition">Tratamentos</a>
            <span>•</span>
            <a href="#avaliacao" className="hover:text-white transition">Triagem</a>
            <span>•</span>
            <a
              href={CLINIC_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition inline-flex items-center gap-1 text-emerald-300"
              aria-label="Visitar Instagram @pilatesmoradadosol"
              title="Visitar Instagram @pilatesmoradadosol"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@pilatesmoradadosol</span>
            </a>
            <span>•</span>
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition inline-flex items-center gap-1 text-emerald-300"
              aria-label="Conversar com Adriana no WhatsApp"
              title="Conversar com Adriana no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>(21) 97150-2301</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
