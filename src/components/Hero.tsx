import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Activity,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
  Camera,
  Check,
} from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';
import clinicBg from '../assets/images/clinic_pilates_rehab_1789567620427.jpg';
import adrianaPhysioImg from '../assets/images/dra_adriana_fisioterapia.jpg';

interface HeroProps {
  onOpenAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssessment }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(adrianaPhysioImg);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Parallax scroll effect on header background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const handleFileUpload = async (file: File) => {
    if (!import.meta.env.DEV) return;
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataBase64 = reader.result as string;
      try {
        const res = await fetch('/api/save-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: 'dra_adriana_fisioterapia.jpg',
            dataBase64,
          }),
        });
        if (res.ok) {
          setImageSrc(dataBase64);
          setStatusMsg('Foto permanente salva!');
          setTimeout(() => setStatusMsg(null), 4000);
        }
      } catch (err) {
        console.error('Failed to save permanent image:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Background shifts smoothly downward on scroll (gentle parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4]);

  const whatsappUrl = CLINIC_CONTACT.whatsappUrl;

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden bg-emerald-950 text-white"
    >
      {/* Parallax Background Image with Modern Clinic & Pilates Equipment */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={clinicBg}
          alt="Sala moderna de Pilates e Fisioterapia Clínica Dra. Adriana Martins"
          className="w-full h-full object-cover object-center filter brightness-90"
          referrerPolicy="no-referrer"
        />
      </motion.div>

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
                aria-label="Conversar com Adriana no WhatsApp"
                title="Conversar com Adriana no WhatsApp"
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

              {/* Main Card */}
              <div
                className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-slate-900 p-2.5 shadow-2xl border border-white/20 group"
                onMouseEnter={() => import.meta.env.DEV && setIsHovered(true)}
                onMouseLeave={() => import.meta.env.DEV && setIsHovered(false)}
                onDragOver={(e) => {
                  if (import.meta.env.DEV) {
                    e.preventDefault();
                    setIsHovered(true);
                  }
                }}
                onDrop={(e) => {
                  if (import.meta.env.DEV) {
                    e.preventDefault();
                    setIsHovered(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileUpload(file);
                  }
                }}
              >
                <img
                  src={imageSrc}
                  alt="Adriana Martins em ambiente de fisioterapia"
                  className="w-full h-auto object-cover object-top rounded-2xl sm:rounded-3xl aspect-[3/4]"
                  referrerPolicy="no-referrer"
                />

                {/* Dev-Only Photo Replacement Trigger (Excluded from production build) */}
                {import.meta.env.DEV && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      accept="image/*"
                      className="hidden"
                    />

                    {isHovered && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 cursor-pointer rounded-2xl sm:rounded-3xl transition-opacity animate-in fade-in duration-200 z-20"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center mb-3 shadow-lg">
                          <Camera className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white tracking-wide">
                          Substituir Foto Permanente
                        </span>
                        <span className="text-xs text-emerald-200/80 mt-1 max-w-[220px]">
                          Clique ou solte o arquivo JPG aqui para salvar diretamente no projeto
                        </span>
                      </div>
                    )}

                    {statusMsg && (
                      <div className="absolute top-4 left-4 right-4 z-30 p-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 shadow-lg border border-emerald-400">
                        <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                        <span>{statusMsg}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Floating Authority Badge */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-emerald-950/90 backdrop-blur-md border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white font-serif">
                        Dra. Adriana Martins
                      </h2>
                      <p className="text-[11px] sm:text-xs font-semibold text-emerald-300">
                        Fisioterapeuta Responsável • CREFITO-2 / 68.421-F
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-emerald-100/70 mt-0.5">
                        Especialista em Traumato-Ortopedia & RPG
                      </p>
                    </div>

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800/80 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
                      <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
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
