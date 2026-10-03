import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Calendar, Menu, X, MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';

interface NavbarProps {
  onOpenAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssessment }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Tratamentos', href: '#servicos' },
    { label: 'Vídeo Biomecânica', href: '#video-movimento' },
    { label: 'Para Quem', href: '#para-quem' },
    { label: 'Triagem', href: '#avaliacao' },
    { label: 'Contato', href: '#contato' },
  ];

  const whatsappUrl = `https://wa.me/${CLINIC_CONTACT.phoneRaw}?text=${encodeURIComponent(CLINIC_CONTACT.whatsappMessage)}`;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-slate-900/5 py-3 border-b border-slate-100'
          : 'bg-emerald-950/75 backdrop-blur-md py-4 border-b border-emerald-900/40 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with dynamic lightMode */}
        <a href="#inicio" className="focus:outline-none" aria-label="Dra. Adriana Martins - Início">
          <Logo variant="full" lightMode={!scrolled} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-wider py-1 relative group transition-colors ${
                scrolled
                  ? 'text-slate-600 hover:text-emerald-900'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                  scrolled ? 'bg-emerald-800' : 'bg-emerald-400'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-btn"
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-colors border ${
              scrolled
                ? 'text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                : 'text-emerald-200 bg-white/10 hover:bg-white/15 border-white/20'
            }`}
            title="Conversar no WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>

          <button
            onClick={onOpenAssessment}
            id="nav-cta-avaliacao"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md ${
              scrolled
                ? 'text-white bg-emerald-900 hover:bg-emerald-800 shadow-emerald-900/20'
                : 'text-emerald-950 bg-emerald-300 hover:bg-white shadow-emerald-950/30'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Quero Minha Avaliação</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAssessment}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-950 bg-emerald-300 hover:bg-white transition"
          >
            Avaliação
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className={`p-2 rounded-xl focus:outline-none ${
              scrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-5 pt-4 pb-7 space-y-4 text-slate-800">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-sm text-white bg-emerald-900 hover:bg-emerald-800 shadow-md transition"
            >
              QUERO MINHA AVALIAÇÃO
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-center font-semibold text-sm text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
