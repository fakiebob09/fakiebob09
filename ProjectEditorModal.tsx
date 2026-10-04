import React, { useState, useRef } from 'react';
import { Project, ProjectTemplate } from '../types/portfolio';
import { PROJECT_TEMPLATES, createSvgCover } from '../data/defaultProjects';
import { StorageService } from '../services/storage';
import {
  X,
  Upload,
  Sparkles,
  Trash2,
  Plus,
  Check,
  Zap,
  Star
} from 'lucide-react';

interface ProjectEditorModalProps {
  projectToEdit: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

const CATEGORY_PRESETS = [
  'Веб-дизайн',
  'Брендинг',
  'Мобильные приложения',
  '3D & Графика',
  'Разработка',
  'E-commerce'
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  projectToEdit,
  onSave,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(projectToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(projectToEdit?.subtitle || '');
  const [category, setCategory] = useState(projectToEdit?.category || 'Веб-дизайн');
  const [year, setYear] = useState(projectToEdit?.year || new Date().getFullYear().toString());
  const [client, setClient] = useState(projectToEdit?.client || '');
  const [role, setRole] = useState(projectToEdit?.role || 'Lead Designer');
  const [coverImage, setCoverImage] = useState(
    projectToEdit?.coverImage ||
      createSvgCover('Новый проект', 'ДИЗАЙН', '#121218', '#ff184c', '#ffe600', 'abstract-dynamism')
  );
  const [gallery, setGallery] = useState<string[]>(projectToEdit?.gallery || []);
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [liveUrl, setLiveUrl] = useState(projectToEdit?.liveUrl || '');
  const [tagsInput, setTagsInput] = useState(projectToEdit?.tags ? projectToEdit.tags.join(', ') : 'UI/UX, Дизайн, 2026');
  const [servicesInput, setServicesInput] = useState(
    projectToEdit?.services ? projectToEdit.services.join(', ') : 'UI/UX Дизайн, Прототипирование, Адаптивная верстка'
  );
  const [featured, setFeatured] = useState(projectToEdit?.featured || false);
  const [isPublished, setIsPublished] = useState(projectToEdit ? projectToEdit.isPublished : true);

  const [stat1Label, setStat1Label] = useState(projectToEdit?.stats?.[0]?.label || 'Срок проекта');
  const [stat1Val, setStat1Val] = useState(projectToEdit?.stats?.[0]?.value || '3 недели');
  const [stat2Label, setStat2Label] = useState(projectToEdit?.stats?.[1]?.label || 'Рост конверсии');
  const [stat2Val, setStat2Val] = useState(projectToEdit?.stats?.[1]?.value || '+45%');

  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleApplyTemplate = (tpl: ProjectTemplate) => {
    setTitle(tpl.title);
    setSubtitle(tpl.subtitle);
    setCategory(tpl.category);
    setClient(tpl.client);
    setRole(tpl.role);
    setCoverImage(tpl.coverImage);
    setDescription(tpl.description);
    setTagsInput(tpl.tags.join(', '));
    setServicesInput(tpl.services.join(', '));
    if (tpl.stats?.[0]) {
      setStat1Label(tpl.stats[0].label);
      setStat1Val(tpl.stats[0].value);
    }
    if (tpl.stats?.[1]) {
      setStat2Label(tpl.stats[1].label);
      setStat2Val(tpl.stats[1].value);
    }
  };

  const handleGeneratePresetCover = (geometry: 'speed-device' | 'isometric-bastion' | 'ink-stationery' | 'kinetic-sculpture' | 'abstract-dynamism') => {
    const accents = ['#ff184c', '#ffe600', '#00f0ff', '#a855f7'];
    const randomAccent = accents[Math.floor(Math.random() * accents.length)];
    const generated = createSvgCover(title || 'Новый проект', category, '#121218', randomAccent, '#ffffff', geometry);
    setCoverImage(generated);
  };

  const handleUploadCoverFile = async (file: File) => {
    try {
      setIsProcessingImage(true);
      const dataUrl = await StorageService.processImageFile(file);
      setCoverImage(dataUrl);
    } catch (err) {
      console.error('Error processing image', err);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleUploadGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      setIsProcessingImage(true);
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await StorageService.processImageFile(files[i]);
        newImages.push(dataUrl);
      }
      setGallery((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error('Error adding gallery files', err);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Пожалуйста, введите название проекта');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const services = servicesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const stats = [];
    if (stat1Label.trim() && stat1Val.trim()) {
      stats.push({ label: stat1Label.trim(), value: stat1Val.trim() });
    }
    if (stat2Label.trim() && stat2Val.trim()) {
      stats.push({ label: stat2Label.trim(), value: stat2Val.trim() });
    }

    const projectData: Project = {
      id: projectToEdit ? projectToEdit.id : 'proj-' + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || 'Кейс по дизайну и разработке',
      category: category.trim(),
      year: year.trim() || new Date().getFullYear().toString(),
      client: client.trim() || 'Клиент',
      role: role.trim() || 'Дизайнер',
      coverImage,
      gallery,
      description: description.trim() || 'Описание проекта в процессе наполнения.',
      services: services.length > 0 ? services : ['UI/UX Дизайн'],
      tags: tags.length > 0 ? tags : [category],
      liveUrl: liveUrl.trim() || undefined,
      featured,
      isPublished,
      order: projectToEdit ? projectToEdit.order : 1,
      stats: stats.length > 0 ? stats : undefined,
      createdAt: projectToEdit ? projectToEdit.createdAt : Date.now()
    };

    onSave(projectData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/95 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Comic Box */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border-3 sm:border-4 border-black shadow-[6px_6px_0px_#ffe600] sm:shadow-[12px_12px_0px_#ffe600] overflow-hidden z-10 my-auto max-h-[96vh] sm:max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b-2 sm:border-b-3 border-black bg-zinc-900 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ff184c] border border-black rotate-45" />
            <h2 className="text-sm sm:text-lg font-black text-white font-display uppercase tracking-tight">
              {projectToEdit ? 'Редактировать кейс' : 'Добавить новый кейс'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="min-h-[38px] min-w-[38px] p-1.5 text-white bg-black hover:bg-[#ff184c] border-2 border-white/60 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* 1-Click Fast Presets Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black border-b-2 border-zinc-900 flex items-center gap-2 overflow-x-auto touch-pan-x text-xs">
          <span className="text-[#ffe600] font-display font-black uppercase text-[10px] sm:text-[11px] shrink-0 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-current" />
            В 1 клик:
          </span>
          {PROJECT_TEMPLATES.map((tpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyTemplate(tpl)}
              className="px-2.5 sm:px-3 py-1 font-bold text-xs bg-zinc-900 hover:bg-[#ff184c] hover:text-white text-zinc-300 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 cursor-pointer"
            >
              {tpl.name}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* 1. Image Upload Section */}
          <div className="space-y-3">
            <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
              Обложка проекта (Главное изображение)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Preview */}
              <div className="md:col-span-5 relative aspect-[16/10] border-3 border-black shadow-[4px_4px_0px_#000000] bg-black overflow-hidden group">
                <img
                  src={coverImage}
                  alt="Предпросмотр"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {isProcessingImage && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-xs text-[#ffe600] font-mono font-bold">
                    ОБРАБОТКА...
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="md:col-span-7 space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleUploadCoverFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#ffe600] bg-[#ffe600]/10'
                      : 'border-zinc-700 bg-zinc-900/60 hover:border-white'
                  }`}
                >
                  <Upload className="w-6 h-6 text-[#ff184c] mx-auto mb-2" />
                  <div className="text-xs font-black uppercase font-display text-white">
                    Перетащите изображение сюда или выберите файл
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    PNG, JPG, WebP, SVG, GIF (авто-сжатие до 1600px)
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUploadCoverFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>

                {/* Instant Cover Art Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-zinc-400">
                  <span className="font-mono font-bold text-[#ffe600]">Генератор арта:</span>
                  <button
                    type="button"
                    onClick={() => handleGeneratePresetCover('speed-device')}
                    className="px-2.5 py-1 bg-zinc-900 border border-black hover:bg-[#ff184c] text-white transition-colors"
                  >
                    Интерфейс
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGeneratePresetCover('isometric-bastion')}
                    className="px-2.5 py-1 bg-zinc-900 border border-black hover:bg-[#ff184c] text-white transition-colors"
                  >
                    Архитектура
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGeneratePresetCover('ink-stationery')}
                    className="px-2.5 py-1 bg-zinc-900 border border-black hover:bg-[#ff184c] text-white transition-colors"
                  >
                    Брендинг
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGeneratePresetCover('kinetic-sculpture')}
                    className="px-2.5 py-1 bg-zinc-900 border border-black hover:bg-[#ff184c] text-white transition-colors"
                  >
                    3D Объект
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Gallery Images */}
          <div className="space-y-3 pt-3 border-t-2 border-zinc-900">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-mono font-bold text-zinc-400">
                Галерея скриншотов ({gallery.length})
              </label>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="text-xs font-black uppercase font-display text-[#ffe600] hover:text-white inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Загрузить фото в галерею</span>
              </button>
              <input
                ref={galleryInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadGalleryFiles(e.target.files)}
              />
            </div>

            {gallery.length > 0 ? (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-16 border-2 border-black shrink-0 group">
                    <img src={img} alt={`Gallery item ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 font-mono">
                Нет дополнительных изображений.
              </p>
            )}
          </div>

          {/* 3. Title & Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t-2 border-zinc-900">
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
                Название проекта *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Aura Capital — Необанк нового поколения"
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
                Краткий подзаголовок
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Мобильное приложение и веб-платформа для инвесторов"
                className="w-full px-3.5 py-2.5 text-sm bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
          </div>

          {/* 4. Category */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
              Категория
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_PRESETS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-xs font-black uppercase font-display border-2 border-black transition-all ${
                    category === cat
                      ? 'bg-[#ff184c] text-white shadow-[2px_2px_0px_#000000]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Или своя категория..."
              className="w-full px-3.5 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600] mt-1"
            />
          </div>

          {/* 5. Client, Role, Year, Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Клиент</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Aura Group"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Роль</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Designer"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Год</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Ссылка на сайт</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
          </div>

          {/* 6. Description */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
              Подробное описание проекта (Кейс)
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о задаче, процессе проектирования, принятых решениях и результате..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600] font-sans"
            />
          </div>

          {/* 7. Services & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
                Услуги (через запятую)
              </label>
              <input
                type="text"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                placeholder="Product Design, UI/UX, Design System"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">
                Теги (через запятую)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="FinTech, iOS, Figma, Dark Mode"
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
              />
            </div>
          </div>

          {/* 8. Visibility Toggles */}
          <div className="pt-3 border-t-2 border-zinc-900 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-bold">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 border-2 border-black text-[#ffe600] bg-zinc-900 focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#ffe600] fill-[#ffe600]" />
                Главный кейс (Bento широкий блок)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-bold">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 border-2 border-black text-emerald-500 bg-zinc-900 focus:ring-0"
              />
              <span className="text-emerald-400">
                Опубликовать сразу (виден клиентам)
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t-2 sm:border-t-3 border-black flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white text-center"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-3 text-xs font-black uppercase tracking-wider font-display text-white bg-[#ff184c] hover:bg-[#e00d3d] border-2 border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Сохранить проект</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
