import React, { useState, useMemo, useRef } from 'react';
import { Project } from '../types/portfolio';
import { Search, Plus, ArrowUpRight, Edit3, Eye, EyeOff, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PortfolioGridProps {
  projects: Project[];
  isAdmin: boolean;
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onAddNewProject: () => void;
  onTogglePublished: (project: Project) => void;
  onToggleFeatured: (project: Project) => void;
}

interface PortfolioCardProps {
  project: Project;
  index: number;
  isAdmin: boolean;
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onTogglePublished: (project: Project) => void;
  onToggleFeatured: (project: Project) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  index,
  isAdmin,
  onSelectProject,
  onEditProject,
  onTogglePublished,
  onToggleFeatured
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isWide = project.featured;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.05, 1.02]);

  return (
    <motion.div
      ref={cardRef}
      data-cursor="card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={`group relative flex flex-col h-full bg-[#161013]/85 border border-[#ffb703]/20 hover:border-[#ffb703]/60 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(193,74,56,0.2)] transition-all duration-300 overflow-hidden backdrop-blur-xl ${
        isWide ? 'md:col-span-2' : 'col-span-1'
      } ${!project.isPublished ? 'opacity-60' : ''}`}
    >
      {/* Visual Art Header */}
      <div
        onClick={() => onSelectProject(project)}
        className={`relative w-full overflow-hidden bg-black cursor-pointer border-b border-white/10 ${
          isWide ? 'aspect-[16/10] md:aspect-[21/10]' : 'aspect-[4/3]'
        }`}
      >
        <motion.img
          style={{ y: imgY, scale: imgScale }}
          src={project.coverImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140f10] via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity" />

        {/* Category Corner Badge in warm brick palette */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#161012]/90 backdrop-blur-md text-[#ffd166] font-mono font-medium text-[11px] uppercase tracking-wider rounded-xl border border-[#ffb703]/30 shadow-sm">
          {project.category}
        </div>

        {/* Featured Ribbon Badge */}
        {project.featured && (
          <div className="absolute bottom-3.5 left-3.5 px-2.5 py-1 bg-gradient-to-r from-[#c14a38] to-[#9e3424] text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 border border-[#ea7a65]/40">
            <Star className="w-3 h-3 fill-current text-[#ffd166]" />
            <span>ИЗБРАННОЕ</span>
          </div>
        )}

        {/* Open Case Action Button */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="absolute top-3.5 right-3.5 w-9 h-9 bg-[#c14a38] text-white rounded-xl shadow-md flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </motion.div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#c8b7a6] mb-1.5">
            <span className="text-[#ffb703]">{project.year}</span>
            <span className="text-[#5a3a40]">•</span>
            <span className="text-[#f5eee8] truncate">{project.client || 'Клиент'}</span>
          </div>

          <h3
            onClick={() => onSelectProject(project)}
            className="text-base sm:text-xl font-bold text-[#fbf8f5] font-display group-hover:text-[#ffb703] transition-colors cursor-pointer leading-snug"
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#d8c8bc] mt-2 line-clamp-2 leading-relaxed font-sans">
            {project.subtitle}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-[#201518]/90 border border-[#ffb703]/30 rounded-lg text-[11px] font-mono text-[#ffd166] uppercase tracking-wider"
                >
                  {tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Bottom Bar */}
        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onSelectProject(project)}
            className="text-xs font-bold uppercase tracking-wider text-[#ffd166] hover:text-white flex items-center gap-1.5 group/btn transition-colors cursor-pointer"
          >
            <span>Изучить проект</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ffb703] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 bg-[#140f11] p-1 rounded-xl border border-[#3d262b]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePublished(project);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  project.isPublished ? 'text-emerald-400 hover:bg-[#23171a]' : 'text-stone-500 hover:bg-stone-800'
                }`}
                title={project.isPublished ? 'Опубликован' : 'Черновик'}
              >
                {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFeatured(project);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  project.featured ? 'text-[#ffb703] hover:bg-[#23171a]' : 'text-stone-500 hover:bg-stone-800'
                }`}
                title={project.featured ? 'Избранный' : 'Обычный'}
              >
                <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProject(project);
                }}
                className="p-1.5 text-[#c8b7a6] hover:text-white hover:bg-[#23171a] rounded-lg transition-colors"
                title="Редактировать кейс"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  isAdmin,
  onSelectProject,
  onEditProject,
  onAddNewProject,
  onTogglePublished,
  onToggleFeatured
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.category)));
    return ['Все', ...list];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (!isAdmin && !project.isPublished) return false;

      const matchesCat = activeCategory === 'Все' || project.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.tags?.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery, isAdmin]);

  return (
    <section id="projects" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with Scroll Fade-in & Upward Shift */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4"
      >
        <div className="p-4 sm:p-6 rounded-2xl bg-[#161013]/85 backdrop-blur-xl border border-[#ffb703]/20 max-w-3xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24171b]/90 border border-[#ffb703]/30 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb703] shadow-[0_0_8px_#ffb703]" />
            <span className="text-xs font-mono font-bold text-[#ffb703] uppercase tracking-widest">
              ИЗБРАННЫЕ РАБОТЫ // 2024–2026
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Проекты с душой и живым характером
          </h2>
          <p className="text-sm text-[#f0e6df] mt-1.5 max-w-xl font-normal">
            Каждый кейс продуман от концепции до мельчайших деталей интерфейса. Никакого визуального шума — гармония, уют и результат.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddNewProject}
            className="self-start md:self-auto px-4 py-2.5 bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] text-white text-xs font-mono font-bold uppercase rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Добавить кейс</span>
          </button>
        )}
      </motion.div>

      {/* Filter and Search Bar with Scroll Fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-10"
      >
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-sans font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#c14a38] to-[#9e3424] text-white shadow-[0_4px_16px_rgba(193,74,56,0.35)]'
                  : 'bg-[#1c1417] text-[#c8b7a6] hover:text-white border border-[#3d262b] hover:border-[#ffb703]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:w-72">
          <Search className="w-4 h-4 text-[#ffb703]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по проектам..."
            className="w-full bg-[#1c1417] border border-[#3d262b] focus:border-[#c14a38] rounded-xl pl-9 pr-3.5 py-2 text-xs font-sans text-[#f5eee8] placeholder:text-[#a69285] outline-none transition-colors"
          />
        </div>
      </motion.div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center bg-[#1c1417]/50 rounded-3xl border border-[#3d262b] p-8">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-white font-display">Проектов не найдено</h3>
          <p className="text-xs text-[#a69285] mt-1 max-w-sm mx-auto">
            Попробуйте выбрать другую категорию или изменить поисковый запрос.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={idx}
              isAdmin={isAdmin}
              onSelectProject={onSelectProject}
              onEditProject={onEditProject}
              onTogglePublished={onTogglePublished}
              onToggleFeatured={onToggleFeatured}
            />
          ))}
        </div>
      )}
    </section>
  );
};
