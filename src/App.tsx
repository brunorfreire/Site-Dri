/**
 * Landing Page Oficial - Dra. Adriana Martins Fisioterapia & Alta Performance
 * Design System "Flexra": Header Parallax, Paleta Deep Emerald, Tipografia Serif Elegante,
 * Faixa de Estatísticas, Advanced Care (Mission/Vision), Tratamentos Terapêuticos com ArrowUpRight,
 * Vídeo com Movimento Dinâmico por Rolagem, Depoimentos em Fundo Escuro, Accordion FAQ e Footer com Newsletter.
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { AdvancedCareSection } from './components/AdvancedCareSection';
import { TherapeuticTreatments } from './components/TherapeuticTreatments';
import { ScrollDrivenVideoSection } from './components/ScrollDrivenVideoSection';
import { AudienceSection } from './components/AudienceSection';
import { ClinicGallery } from './components/ClinicGallery';
import { InteractiveAssessment } from './components/InteractiveAssessment';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { LocationFooter } from './components/LocationFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceModal } from './components/ServiceModal';
import { AssessmentModal } from './components/AssessmentModal';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  const handleOpenAssessment = () => {
    setIsAssessmentModalOpen(true);
  };

  const handleCloseAssessment = () => {
    setIsAssessmentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* Dynamic Navbar */}
      <Navbar onOpenAssessment={handleOpenAssessment} />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Parallax Scroll Header with Deep Emerald Overlay & Modern Clinic Background */}
        <Hero onOpenAssessment={handleOpenAssessment} />

        {/* 2. Floating Statistics Banner (Flexra Style) */}
        <StatsBanner />

        {/* 3. Advanced Care & Sobre Nós (Mission, Vision & Dra. Adriana Authority) */}
        <AdvancedCareSection onOpenAssessment={handleOpenAssessment} />

        {/* 4. Therapeutic Treatments Grid with ArrowUpRight Buttons & Scroll Reveal */}
        <TherapeuticTreatments onSelectService={(service) => setSelectedService(service)} />

        {/* 5. Scroll-Driven Biomechanical Video Showcase with Telemetry */}
        <ScrollDrivenVideoSection onOpenAssessment={handleOpenAssessment} />

        {/* 6. Target Audience Showcase ("Para Quem") */}
        <AudienceSection onOpenAssessment={handleOpenAssessment} />

        {/* 7. Clinic & Infrastructure Gallery */}
        <ClinicGallery />

        {/* 8. Interactive Pain & Objectives Assessment Triage */}
        <InteractiveAssessment />

        {/* 9. Stories Reflect Real Recovery (Deep Emerald Testimonials) */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions (Accordion) */}
        <FaqSection />
      </main>

      {/* 11. Modern Footer with Newsletter & Map */}
      <LocationFooter />

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenAssessment={() => {
          setSelectedService(null);
          setIsAssessmentModalOpen(true);
        }}
      />

      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={handleCloseAssessment}
      />
    </div>
  );
}
