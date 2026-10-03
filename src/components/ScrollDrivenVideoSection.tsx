import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Activity,
  ShieldCheck,
  Compass,
  RotateCw,
  ArrowRight,
  Gauge,
  Layers,
  Move3d,
  Sliders,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { CLINIC_CONTACT } from '../data/content';

interface ScrollDrivenVideoSectionProps {
  onOpenAssessment: () => void;
}

interface ExerciseMovement {
  id: string;
  name: string;
  category: string;
  videoSrc: string;
  fallbackSrc: string;
  focusArea: string;
  description: string;
  indicators: {
    coreActivation: number;
    jointAngle: string;
    spinalDecompression: string;
    cadence: string;
  };
}

const MOVEMENTS: ExerciseMovement[] = [
  {
    id: 'reformer-pilates',
    name: 'Pilates Clínico em Reformer',
    category: 'Estabilização de Core & Articulações',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-pilates-on-a-machine-42415-large.mp4',
    fallbackSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    focusArea: 'Cadeia Posterior & Lombar',
    description: 'Movimento guiado por molas de precisão biomecânica. Recrutamento da musculatura profunda (transverso do abdômen e multífidos) sem impacto articular.',
    indicators: {
      coreActivation: 92,
      jointAngle: '90° a 135°',
      spinalDecompression: 'Descompressão L4-S1 Ativa',
      cadence: '4s excêntrica / 2s concêntrica'
    }
  },
  {
    id: 'rpg-coluna',
    name: 'RPG & Realinhamento Postural',
    category: 'Descompressão Vertebral & Cadeias Musculares',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-exercises-on-a-pilates-machine-42416-large.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-female-athlete-stretching-and-doing-exercises-43306-large.mp4',
    focusArea: 'Cervical, Torácica e Lombar',
    description: 'Trabalho de tração axial e respiração diafragmática para restaurar o espaço entre as vértebras e corrigir desvios como escoliose e hiperlordose.',
    indicators: {
      coreActivation: 86,
      jointAngle: 'Alinhamento Escapular 100%',
      spinalDecompression: 'Ganho Foraminal Contínuo',
      cadence: 'Respiração profunda guiada'
    }
  },
  {
    id: 'desportiva-alta-performance',
    name: 'Reabilitação Desportiva & Alta Performance',
    category: 'Retorno ao Esporte & Prevenção de Lesões',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-female-athlete-stretching-and-doing-exercises-43306-large.mp4',
    fallbackSrc: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-pilates-on-a-machine-42415-large.mp4',
    focusArea: 'Potência, Agilidade & Joelho/Ombro',
    description: 'Protocolos de nível campeã mundial para reatletaçāo progressiva, propriocepção refinada e ganho de força excêntrica para quem pratica esportes.',
    indicators: {
      coreActivation: 98,
      jointAngle: 'Amplitude Funcional Total',
      spinalDecompression: 'Absorção de Impacto Otimizada',
      cadence: 'Velocidade e Controle Motor'
    }
  }
];

export const ScrollDrivenVideoSection: React.FC<ScrollDrivenVideoSectionProps> = ({ onOpenAssessment }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastPercentRef = useRef<number>(0);

  const [activeMovement, setActiveMovement] = useState<ExerciseMovement>(MOVEMENTS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isScrollSync, setIsScrollSync] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(15);

  // Scroll tracking across this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth springs for fluid, silky 3D transforms
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  // 3D Tilt and Perspective transitions as user scrolls - safe ranges
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.02, 0.95], { clamp: true });
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [12, 0, -8], { clamp: true });
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-3, 0, 3], { clamp: true });
  const y = useTransform(smoothProgress, [0, 0.5, 1], [40, 0, -30], { clamp: true });
  const progressScaleX = useTransform(smoothProgress, [0, 1], [0.05, 1], { clamp: true });

  // Parallax elements moving at varied speeds
  const badgeParallaxY1 = useTransform(smoothProgress, [0, 1], [-20, 30], { clamp: true });
  const badgeParallaxY2 = useTransform(smoothProgress, [0, 1], [30, -30], { clamp: true });

  // Sync scroll with video playback time if toggle is enabled (safe & throttled)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawPct = Math.round(latest * 100);
    // Throttle state update to avoid React re-render flooding
    if (Math.abs(rawPct - lastPercentRef.current) >= 2) {
      lastPercentRef.current = rawPct;
      setScrollPercent(rawPct);
    }

    if (isScrollSync && videoRef.current) {
      try {
        const vid = videoRef.current;
        if (vid.readyState >= 1 && isFinite(vid.duration) && vid.duration > 0) {
          const targetTime = Math.max(0, Math.min(vid.duration, latest * vid.duration));
          if (isFinite(targetTime) && Math.abs(vid.currentTime - targetTime) > 0.1) {
            vid.currentTime = targetTime;
          }
        }
      } catch {
        // Silently catch seek errors in browser
      }
    }
  });

  // Handle Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch {
      // Ignore
    }
  };

  // Handle Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Switch exercise movement
  const handleSelectMovement = (movement: ExerciseMovement) => {
    setActiveMovement(movement);
    setVideoLoaded(false);
    setHasVideoError(false);
    if (videoRef.current) {
      videoRef.current.src = movement.videoSrc;
      videoRef.current.load();
      if (!isScrollSync) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  // Dynamic biomechanical phase computation based on scroll
  const getPhaseData = () => {
    if (scrollPercent < 35) {
      return {
        phase: 'Fase 1: Diagnóstico e Mobilidade Articular',
        badge: 'Avaliação & Alívio Miofascial',
        description: 'Descompressão vertebral inicial e desativação de nós de tensão nos tecidos moles.'
      };
    } else if (scrollPercent < 70) {
      return {
        phase: 'Fase 2: Estabilização de Core & Aparelhos',
        badge: 'Controle Motor & Força Profunda',
        description: 'Ativação do transverso do abdômen e multífidos nos aparelhos originais de Pilates.'
      };
    } else {
      return {
        phase: 'Fase 3: Alta Performance & Movimento sem Dor',
        badge: 'Autonomia & Reatletaçāo',
        description: 'Retorno seguro às atividades diárias e aos treinos de alta intensidade sem limitações.'
      };
    }
  };

  const currentPhase = getPhaseData();

  // Biomechanical Angle animation for SVG Fallback/Overlay
  const spineAngle = Math.sin((scrollPercent / 100) * Math.PI) * 18;

  return (
    <section
      ref={containerRef}
      id="video-movimento"
      className="relative py-20 md:py-28 bg-gradient-to-b from-white via-slate-900 to-slate-950 text-white overflow-hidden"
    >
      {/* Background Ambient Lighting & Pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-black uppercase tracking-widest shadow-sm">
            <Move3d className="w-4 h-4 text-teal-400" />
            <span>Vídeo em Movimento com a Rolagem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Veja a Biomecânica se Transformar <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-sky-300">
              Conforme Você Rola a Página
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experimente em tempo real como o movimento guiado e o alinhamento da coluna operam em cada fase da sua reabilitação clínica com a <strong>Dra. Adriana Martins</strong>.
          </p>

          {/* Interactive Mode Toggles */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsScrollSync(!isScrollSync)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isScrollSync
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 ring-2 ring-teal-300'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/15'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isScrollSync ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span>Sincronizado com a Rolagem {isScrollSync ? '(Ativado)' : '(Pausado)'}</span>
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>Rolagem: <strong className="text-teal-300">{scrollPercent}%</strong></span>
            </div>
          </div>
        </div>

        {/* Movement Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {MOVEMENTS.map((mov) => {
            const isSelected = mov.id === activeMovement.id;
            return (
              <button
                key={mov.id}
                onClick={() => handleSelectMovement(mov)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-600/30 ring-1 ring-teal-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-teal-300" />
                <span>{mov.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Scroll-Driven Video Showcase Canvas */}
        <div className="relative mx-auto max-w-5xl" style={{ perspective: '1200px' }}>
          
          {/* Floating Parallax Badge 1: Real-Time Joint Telemetry (Moves on scroll) */}
          <motion.div
            style={{ y: badgeParallaxY1 }}
            className="hidden md:flex absolute -top-8 -left-6 z-30 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-teal-500/40 shadow-2xl text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center flex-shrink-0">
              <Gauge className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-400">
                Ativação Muscular do Core
              </div>
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{Math.min(99, activeMovement.indicators.coreActivation + Math.round((scrollPercent % 20) / 4))}%</span>
                <span className="text-[10px] font-normal text-emerald-400 font-mono">ESTÁVEL</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {activeMovement.indicators.spinalDecompression}
              </div>
            </div>
          </motion.div>

          {/* Floating Parallax Badge 2: Spine Alignment HUD (Moves inversely on scroll) */}
          <motion.div
            style={{ y: badgeParallaxY2 }}
            className="hidden md:flex absolute -bottom-8 -right-6 z-30 items-center gap-3 p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-teal-500/40 shadow-2xl text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-sky-300">
                Alinhamento Biomecânico
              </div>
              <div className="text-sm font-extrabold text-white">
                Ângulo: {activeMovement.indicators.jointAngle}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {activeMovement.indicators.cadence}
              </div>
            </div>
          </motion.div>

          {/* The Scroll-Driven 3D Transforming Container */}
          <motion.div
            style={{
              scale,
              rotateX,
              rotateY,
              y
            }}
            className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-teal-500/40 shadow-[0_20px_70px_rgba(13,148,136,0.3)] transition-shadow duration-300"
          >
            {/* Top Bar of the Video Player with Status HUD */}
            <div className="px-5 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-white tracking-wide">
                  {activeMovement.name}
                </span>
                <span className="hidden sm:inline text-slate-400 text-[11px]">
                  • {activeMovement.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                  {currentPhase.badge}
                </span>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition cursor-pointer"
                  title={isMuted ? 'Ativar Áudio' : 'Mutar Áudio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
                </button>
              </div>
            </div>

            {/* Video Viewport with Fallback Visual Simulation */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden group">
              {/* HTML5 Video element */}
              <video
                ref={videoRef}
                src={activeMovement.videoSrc}
                autoPlay={true}
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                onLoadedData={() => {
                  setVideoLoaded(true);
                  setHasVideoError(false);
                }}
                onError={() => {
                  setHasVideoError(true);
                  if (videoRef.current && activeMovement.fallbackSrc) {
                    videoRef.current.src = activeMovement.fallbackSrc;
                  }
                }}
                className={`w-full h-full object-cover select-none pointer-events-none transition-opacity duration-500 ${
                  videoLoaded && !hasVideoError ? 'opacity-90' : 'opacity-40'
                }`}
              />

              {/* Biomechanical Spine & Joint Articulation Overlay (Reacts continuously to scroll) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full max-w-lg opacity-40 mix-blend-screen"
                >
                  {/* Dynamic vertebral column articulating with scroll */}
                  <g transform={`rotate(${spineAngle} 200 100)`}>
                    <path
                      d={`M 140 100 Q 200 ${90 + spineAngle * 1.5} 260 100`}
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                    {[140, 165, 190, 215, 240, 265].map((cx, i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={100 + Math.sin(i + (scrollPercent / 10)) * 6}
                        r="4"
                        fill="#38bdf8"
                      />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Scanning telemetry line that sweeps along scroll */}
              <div
                className="absolute inset-x-0 h-0.5 bg-teal-400/60 shadow-[0_0_12px_#2dd4bf] pointer-events-none transition-all duration-100"
                style={{ top: `${Math.max(5, Math.min(95, scrollPercent))}%` }}
              />

              {/* Center Play/Pause button for manual control */}
              {!isScrollSync && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-teal-600/80 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-xl cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </button>
              )}

              {/* Floating Live Telemetry Overlay inside video */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div className="p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-left max-w-md">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{currentPhase.phase}</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2 leading-relaxed">
                    {currentPhase.description}
                  </p>
                </div>

                <div className="hidden sm:block text-right p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">RESPONSÁVEL TÉCNICA</span>
                  <span className="text-xs font-bold text-teal-300">Dra. Adriana Martins</span>
                  <span className="text-[10px] text-slate-400 block">CREFITO-2 / 68.421-F</span>
                </div>
              </div>
            </div>

            {/* Dynamic Bottom Scroll Progress Scrubber Bar */}
            <div className="p-4 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="w-full sm:w-2/3 flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                  Progresso: {scrollPercent}%
                </span>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-sky-400 rounded-full"
                    style={{ scaleX: progressScaleX, transformOrigin: 'left' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={onOpenAssessment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <span>Agendar Minha Sessão</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </motion.div>

        </div>

        {/* 3 Step Interactive Rehabilitation Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className={`p-6 rounded-2xl border transition-all ${
            scrollPercent < 35
              ? 'bg-slate-900 border-teal-500/60 ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10'
              : 'bg-slate-900/50 border-white/10 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-teal-500/20 text-teal-300">
                FASE 1 (0% - 35%)
              </span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Alívio da Dor & Descompressão
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Terapia manual, RPG e liberação miofascial para aliviar espasmos agudos e desobstruir pinçamentos nos nervos (como o ciático).
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            scrollPercent >= 35 && scrollPercent < 70
              ? 'bg-slate-900 border-teal-500/60 ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10'
              : 'bg-slate-900/50 border-white/10 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-teal-500/20 text-teal-300">
                FASE 2 (35% - 70%)
              </span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Estabilização nos Aparelhos
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pilates clínico individual nos aparelhos (Reformer, Cadillac, Barrel). Fortalecimento profundo para criar uma cinta muscular protetora.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            scrollPercent >= 70
              ? 'bg-slate-900 border-teal-500/60 ring-2 ring-teal-500/20 shadow-lg shadow-teal-500/10'
              : 'bg-slate-900/50 border-white/10 text-slate-400'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-teal-500/20 text-teal-300">
                FASE 3 (70% - 100%)
              </span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Alta Performance & Retorno Seguro
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Retorno pleno aos esportes (lutas, corrida, musculação) ou à rotina diária sem limitações, sob acompanhamento de campeã mundial.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
