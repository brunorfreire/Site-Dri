import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Activity,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Camera,
  Upload,
  Check
} from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';
import clinicBg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import defaultDraAdrianaImg from '../assets/images/dra_adriana_hero_1789567477809.jpg';
import worldMasterDraAdrianaImg from '../assets/images/dra_adriana_world_master_1789567604246.jpg';

interface HeroProps {
  onOpenAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssessment }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgFileInputRef = useRef<HTMLInputElement>(null);

  // Custom background photo state
  const [heroBgPhoto, setHeroBgPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('hero_bg_photo') || clinicBg;
    } catch {
      return clinicBg;
    }
  });

  // Custom photo state with localStorage persistence
  const [heroPhoto, setHeroPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('dra_adriana_hero_photo') || defaultDraAdrianaImg;
    } catch {
      return defaultDraAdrianaImg;
    }
  });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);
  const [isBgUpdated, setIsBgUpdated] = useState(false);

  // Parallax scroll effect on header background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Background shifts smoothly downward on scroll (gentle parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4]);

  const handleImageFileChange = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setHeroPhoto(dataUrl);
        try {
          localStorage.setItem('dra_adriana_hero_photo', dataUrl);
        } catch (err) {
          console.warn('Storage limit reached, keeping in memory', err);
        }

        // Post to backend to save persistently in /src/assets/images
        fetch('/api/save-hero-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data: dataUrl })
        }).catch(() => {});

        setIsPhotoUpdated(true);
        setTimeout(() => setIsPhotoUpdated(false), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBgFileChange = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setHeroBgPhoto(dataUrl);
        try {
          localStorage.setItem('hero_bg_photo', dataUrl);
        } catch {}
        fetch('/api/save-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: 'hero_bg', base64Data: dataUrl })
        }).catch(() => {});
        setIsBgUpdated(true);
        setTimeout(() => setIsBgUpdated(false), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHoveringCard(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileChange(e.dataTransfer.files[0]);
    }
  };

  const whatsappUrl = `https://wa.me/${CLINIC_CONTACT.phoneRaw}?text=${encodeURIComponent(
    'Olá Dra. Adriana! Gostaria de agendar uma avaliação inicial na clínica.'
  )}`;

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden bg-emerald-950 text-white"
    >
      {/* Hidden input for background image replacement */}
      <input
        ref={bgFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleBgFileChange(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Parallax Background Image with Modern Clinic & Pilates Equipment */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={heroBgPhoto}
          alt="Sala moderna de Pilates e Fisioterapia Clínica Dra. Adriana Martins"
          className="w-full h-full object-cover object-center filter brightness-90"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Button to change Hero Background in top-left */}
      <div className="absolute top-24 left-6 z-20 hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={() => bgFileInputRef.current?.click()}
          title="Substituir foto de fundo do cabeçalho (Parallax)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-emerald-200 hover:text-white border border-white/15 text-[11px] font-medium backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-300" />
          <span>Trocar Fundo</span>
        </button>
        {heroBgPhoto !== clinicBg && (
          <button
            type="button"
            onClick={() => {
              setHeroBgPhoto(clinicBg);
              try { localStorage.removeItem('hero_bg_photo'); } catch {}
            }}
            title="Restaurar imagem de fundo original"
            className="px-2 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/15 text-[10px] backdrop-blur-md cursor-pointer"
          >
            Fundo Padrão
          </button>
        )}
      </div>

      {/* Toast for Background Updated */}
      {isBgUpdated && (
        <div className="absolute top-28 left-6 z-30 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl animate-fade-in pointer-events-none">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Fundo do cabeçalho atualizado!</span>
        </div>
      )}

      {/* Sophisticated Deep Emerald & Teal Translucent Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/88 to-emerald-900/80 backdrop-blur-[2px]" />

      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Foreground Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        style={{ opacity: contentOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Narrative & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Clínica de Fisioterapia & Alta Performance</span>
            </div>

            {/* Main Headline with Serif Typography & Italic Touches */}
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight text-white leading-[1.14]">
                Sua Jornada para um <br className="hidden sm:inline" />
                <span className="italic font-normal text-emerald-300">Corpo sem Dor</span> e em <br className="hidden sm:inline" />
                <span className="italic font-normal text-teal-200">Movimento Pleno</span> Começa Aqui.
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-light">
                Sob o atendimento direto da <strong>Dra. Adriana Martins</strong> (Fisioterapeuta graduada em 2004, Especialista em Traumato-Ortopedia pela UGF e Campeã Mundial Master), unimos diagnóstico biomecânico, RPG, terapia manual e Pilates clínico em aparelhos para devolver sua liberdade de viver e treinar.
              </p>
            </div>

            {/* Highlight Badges with Rounded Corners */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <ShieldCheck className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">+20 Anos</div>
                  <div className="text-[11px] text-emerald-200/80">Prática Clínica</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <Award className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">World Master</div>
                  <div className="text-[11px] text-emerald-200/80">Campeã IBJJF 2024</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <Activity className="w-5 h-5 text-teal-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">100% Individual</div>
                  <div className="text-[11px] text-emerald-200/80">Aparelhos Clínicos</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenAssessment}
                id="hero-cta-avaliacao"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold uppercase tracking-wider text-emerald-950 bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 hover:from-white hover:to-emerald-100 shadow-xl shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>QUERO MINHA AVALIAÇÃO</span>
                <ArrowRight className="w-5 h-5 text-emerald-950" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-whatsapp"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-emerald-300" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

            {/* Reassurance Micro-copy */}
            <div className="flex items-center gap-2 text-xs text-emerald-200/80 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Avaliação cinético-funcional minuciosa de 60 minutos com diagnóstico da causa raiz.</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Portrait Card with Rounded-3xl */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative background glow behind portrait */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl sm:rounded-4xl transform rotate-3 scale-102 opacity-30 blur-sm -z-10" />

              {/* Main Card with Drag & Drop Replacement Support */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsHoveringCard(true); }}
                onDragLeave={() => setIsHoveringCard(false)}
                onDrop={handleDrop}
                className={`relative overflow-hidden rounded-3xl sm:rounded-4xl bg-slate-900 p-2.5 shadow-2xl border transition-all duration-300 group ${
                  isHoveringCard
                    ? 'border-emerald-400 ring-4 ring-emerald-400/40 scale-102'
                    : 'border-white/20'
                }`}
              >
                {/* The Target Image Element (Direct match to focus selector) */}
                <img
                  src={heroPhoto}
                  alt="Dra. Adriana Martins Fisioterapeuta e Campeã Mundial Master"
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl aspect-[3/4] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Hidden File Input for Native File Selection */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFileChange(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* Quick Image Replacement & Switcher Overlay */}
                <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 flex-wrap justify-end">
                  {/* Switch to World Master or Clinic Photo */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextPhoto = heroPhoto === defaultDraAdrianaImg ? worldMasterDraAdrianaImg : defaultDraAdrianaImg;
                      setHeroPhoto(nextPhoto);
                      try {
                        localStorage.setItem('dra_adriana_hero_photo', nextPhoto);
                      } catch {}
                    }}
                    title="Alternar versão da foto da Dra. Adriana"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-950/85 hover:bg-emerald-900 text-emerald-200 hover:text-white border border-emerald-400/40 text-[11px] font-medium shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-teal-300" />
                    <span>{heroPhoto === worldMasterDraAdrianaImg ? 'Ver Clínica' : 'Ver Campeã'}</span>
                  </button>

                  {/* Upload Custom Image from attachment */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Carregar foto em anexo da Dra. Adriana"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/90 hover:bg-emerald-800 text-white border border-emerald-400/50 text-[11px] font-bold shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Substituir Foto</span>
                  </button>

                  {/* Reset to Default if Custom Photo is active */}
                  {heroPhoto !== defaultDraAdrianaImg && heroPhoto !== worldMasterDraAdrianaImg && (
                    <button
                      type="button"
                      onClick={() => {
                        setHeroPhoto(defaultDraAdrianaImg);
                        try {
                          localStorage.removeItem('dra_adriana_hero_photo');
                        } catch {}
                      }}
                      title="Restaurar foto oficial original"
                      className="px-2 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 text-[10px] transition-all cursor-pointer"
                    >
                      Padrão
                    </button>
                  )}
                </div>

                {/* Drag and Drop Active Overlay */}
                {isHoveringCard && (
                  <div className="absolute inset-0 z-30 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-emerald-400 rounded-2xl sm:rounded-3xl pointer-events-none animate-fade-in">
                    <Upload className="w-12 h-12 text-emerald-300 animate-bounce mb-3" />
                    <p className="text-white font-bold text-sm">Solte a foto da Dra. Adriana aqui</p>
                    <p className="text-emerald-200 text-xs mt-1">Atualização instantânea em alta definição</p>
                  </div>
                )}

                {/* Toast Notification when Photo is Updated */}
                {isPhotoUpdated && (
                  <div className="absolute top-16 left-5 right-5 z-30 p-2.5 rounded-xl bg-emerald-500 text-emerald-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xl animate-fade-in">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Foto da modelo atualizada em 2K!</span>
                  </div>
                )}

                {/* Floating Authority Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-emerald-950/90 backdrop-blur-md border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white font-serif">
                        Dra. Adriana Martins
                      </h2>
                      <p className="text-xs font-semibold text-emerald-300">
                        Fisioterapeuta Responsável • CREFITO-2 / 68.421-F
                      </p>
                      <p className="text-[11px] text-emerald-100/70 mt-0.5">
                        Especialista em Traumato-Ortopedia & RPG
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Status Pill */}
              <div className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2 bg-emerald-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400/30 text-xs font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Atendimento Personalizado 1:1</span>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
