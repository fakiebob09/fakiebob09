import React, { useEffect, useState } from 'react';
import { Project } from '../types/portfolio';
import { X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, Zap, CheckCircle2, Edit3, ArrowUpRight, Coffee, Sparkles, Leaf } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiryForProject: (projectName: string) => void;
  isAdmin?: boolean;
  onEditProject?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenInquiryForProject,
  isAdmin,
  onEditProject
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = project ? [project.coverImage, ...(project.gallery || [])] : [];

  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (e.key === 'ArrowLeft' && allImages.length > 1) {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
      }
      if (e.key === 'ArrowRight' && allImages.length > 1) {
        setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isZoomed, allImages.length]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Warm Brick Showcase Card */}
      <div className="relative w-full max-w-5xl bg-[#1b1316] border border-[#3d262b] rounded-3xl shadow-[0_25px_70px_rgba(20,10,12,0.8)] overflow-hidden z-10 my-auto flex flex-col max-h-[95vh] sm:max-h-[92vh] backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-[#2d1e21] bg-[#140f11] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 bg-[#23171a] text-[#ffd166] font-mono font-medium text-[11px] uppercase tracking-wider rounded-xl border border-[#ffb703]/30">
              {project.category}
            </span>
            <span className="text-[#5a3a40] font-mono">•</span>
            <span className="text-xs text-[#ffb703] font-mono font-bold">{project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && onEditProject && (
              <button
                onClick={() => {
                  onClose();
                  onEditProject(project);
                }}
                className="min-h-[36px] px-3 py-1.5 text-xs font-mono font-medium text-[#c8b7a6] bg-[#23171a] hover:bg-[#c14a38] hover:text-white border border-[#3d262b] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Редактировать кейс"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Редактировать</span>
              </button>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="min-h-[36px] px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <span className="hidden xs:inline">Перейти на сайт</span>
                <span className="xs:hidden">Сайт</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl text-[#ffd166] bg-[#23171a] hover:bg-[#c14a38] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
              title="Закрыть (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Main Media Showcase */}
          <div className="relative w-full aspect-[16/10] bg-black rounded-2xl border border-stone-850 shadow-md overflow-hidden group">
            <img
              src={allImages[activeImageIndex] || project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 p-2 bg-black/80 backdrop-blur-md text-white border border-stone-700 hover:border-transparent rounded-xl hover:bg-[#e11d48] transition-colors"
              title={isZoomed ? 'Уменьшить' : 'Увеличить'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/80 backdrop-blur-md text-white border border-stone-700 hover:border-transparent rounded-xl hover:bg-[#e11d48] transition-colors"
                  title="Назад"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/80 backdrop-blur-md text-white border border-stone-700 hover:border-transparent rounded-xl hover:bg-[#e11d48] transition-colors"
                  title="Вперед"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#e11d48] shadow-md scale-105'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} preview ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Project Header Info */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-medium max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Key Facts Graphic Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-zinc-900 border-2 border-black shadow-[5px_5px_0px_#000000]">
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Клиент</div>
              <div className="text-sm font-black text-white font-display uppercase mt-1">
                {project.client || 'Конфиденциально'}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Роль в проекте</div>
              <div className="text-sm font-black text-white font-display uppercase mt-1">
                {project.role || 'Дизайнер'}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Год выпуска</div>
              <div className="text-sm font-black text-white font-display uppercase mt-1">{project.year}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-zinc-400">Направление</div>
              <div className="text-sm font-black text-[#e11d48] font-display uppercase mt-1">
                {project.category}
              </div>
            </div>
          </div>

          {/* Quantitative Proof / Metrics */}
          {project.stats && project.stats.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs uppercase font-mono font-black tracking-widest text-[#e11d48]">
                // РЕЗУЛЬТАТЫ И БИЗНЕС-МЕТРИКИ
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_#e11d48]">
                    <div className="text-2xl sm:text-3xl font-black text-white font-display tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-400 font-bold uppercase font-display mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description & Narrative (Case Study Body) */}
          <div className="space-y-4 pt-4 border-t-2 border-zinc-900">
            <div className="text-xs uppercase font-mono font-black tracking-widest text-[#e11d48]">
              // ПОДРОБНОЕ ОПИСАНИЕ КЕЙСА
            </div>
            <div className="p-5 sm:p-6 bg-zinc-900/60 border-2 border-black text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-medium">
              {project.description}
            </div>
          </div>

          {/* Deliverables / Services */}
          {project.services && project.services.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#2d1e21]">
              <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#ffb703]">
                // ВЫПОЛНЕННЫЕ РАБОТЫ И АРТЕФАКТЫ
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#f5eee8]">
                {project.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#140f11] rounded-xl border border-[#2d1e21]">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffb703] shrink-0" />
                    <span className="font-medium text-xs text-[#d8c8bc]">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="pt-4 border-t border-[#2d1e21] space-y-2">
              <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#ffd166]/70">
                // КЛЮЧЕВЫЕ ТЕХНОЛОГИИ И КОМПЕТЕНЦИИ
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#140f11] border border-[#3d262b] rounded-xl text-xs font-mono text-[#c8b7a6] uppercase tracking-wider"
                  >
                    {tag.replace(/^#/, '')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-[#2d1e21] bg-[#140f11] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-normal text-[#d8c8bc] text-center sm:text-left">
            Нужен проект с теплой атмосферой и максимальным вниманием к деталям?
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenInquiryForProject(project.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>Обсудить похожий проект</span>
          </button>
        </div>
      </div>
    </div>
  );
};
