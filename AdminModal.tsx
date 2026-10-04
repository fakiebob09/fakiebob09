import React, { useState } from 'react';
import { Project, AuthorProfile, ClientInquiry, ProjectTemplate } from '../types/portfolio';
import { PROJECT_TEMPLATES, DEFAULT_PROFILE } from '../data/defaultProjects';
import { StorageService } from '../services/storage';
import {
  X,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  EyeOff,
  Sparkles,
  Inbox,
  User,
  Shield,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  Mail,
  Lock,
  Unlock,
  KeyRound,
  Zap
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  profile: AuthorProfile;
  inquiries: ClientInquiry[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onAddNewProject: () => void;
  onApplyTemplate: (tpl: ProjectTemplate) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (id: string) => void;
  onReorderProject: (id: string, direction: 'up' | 'down') => void;
  onTogglePublished: (project: Project) => void;
  onToggleFeatured: (project: Project) => void;
  onUpdateProfile: (profile: AuthorProfile) => void;
  onUpdateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onResetToDemo: () => void;
  onDataImported: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  profile,
  inquiries,
  isAdmin,
  setIsAdmin,
  onAddNewProject,
  onApplyTemplate,
  onEditProject,
  onDeleteProject,
  onDuplicateProject,
  onReorderProject,
  onTogglePublished,
  onToggleFeatured,
  onUpdateProfile,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onResetToDemo,
  onDataImported
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'profile' | 'settings'>('projects');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [editingProfile, setEditingProfile] = useState<AuthorProfile>({ ...profile });
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  const [newPin, setNewPin] = useState('');
  const [pinSavedToast, setPinSavedToast] = useState(false);

  const importInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVerifyPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPin = StorageService.getAdminPin();
    if (pinInput.trim() === correctPin || pinInput.trim() === '1234') {
      setIsAdmin(true);
      setPinError('');
    } else {
      setPinError('Неверный PIN-код. Попробуйте еще раз или используйте 1234.');
    }
  };

  const handleQuickUnlock = () => {
    setIsAdmin(true);
    setPinError('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editingProfile);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim() || newPin.length < 4) {
      alert('PIN-код должен содержать минимум 4 символа');
      return;
    }
    StorageService.setAdminPin(newPin.trim());
    setNewPin('');
    setPinSavedToast(true);
    setTimeout(() => setPinSavedToast(false), 3000);
  };

  const handleExportBackup = () => {
    const backupJson = StorageService.exportBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = StorageService.importBackup(content);
      if (res.success) {
        alert(res.message);
        onDataImported();
      } else {
        alert(res.message);
      }
    };
    reader.readAsText(file);
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-md animate-fade-in">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="relative w-full max-w-sm sm:max-w-md bg-zinc-950 border-3 sm:border-4 border-black shadow-[6px_6px_0px_#e11d48] sm:shadow-[10px_10px_0px_#e11d48] p-5 sm:p-8 z-10 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-block px-2.5 py-0.5 bg-[#e11d48] text-white font-display font-black text-[10px] sm:text-xs uppercase tracking-wider border-2 border-black">
              ACCESS GATE
            </div>
            <button
              onClick={onClose}
              className="min-h-[36px] min-w-[36px] p-1 text-white hover:text-[#e11d48] transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#e11d48] border-3 border-black text-white flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000000]">
              <KeyRound className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
              Вход в админ-панель
            </h3>
            <p className="text-xs text-zinc-400 font-medium">
              Управление проектами, загрузка изображений и просмотр заявок клиентов.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="PIN (по умолчанию: 1234)"
                className="w-full min-h-[46px] px-4 py-2.5 sm:py-3 text-center text-lg sm:text-xl tracking-widest font-mono font-bold bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                autoFocus
              />
              {pinError && (
                <div className="text-xs text-[#e11d48] font-bold mt-2 text-center">{pinError}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] py-3 text-xs font-black uppercase tracking-wider font-display text-white bg-[#e11d48] hover:bg-[#be123c] border-2 border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            >
              Войти
            </button>
          </form>

          <div className="pt-3 sm:pt-4 border-t-2 border-zinc-900 text-center">
            <button
              onClick={handleQuickUnlock}
              className="text-xs text-[#e11d48] hover:text-white underline font-mono font-bold cursor-pointer"
            >
              Быстрый вход в 1 клик (без ввода)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-6xl bg-zinc-950 border-3 sm:border-4 border-black shadow-[6px_6px_0px_#e11d48] sm:shadow-[12px_12px_0px_#e11d48] overflow-hidden z-10 my-auto max-h-[96vh] sm:max-h-[94vh] flex flex-col">
        {/* Admin Bar Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b-2 sm:border-b-3 border-black bg-zinc-900 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#e11d48] border-2 border-black text-white flex items-center justify-center font-bold shrink-0">
              <Unlock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-white font-display uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 truncate">
                <span>Админ-панель</span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500 text-black font-bold border border-black">
                  ONLINE
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono truncate hidden xs:block">
                Редактирование кейсов и просмотр лидов
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsAdmin(false)}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-white border border-zinc-700 bg-zinc-900 hover:bg-black transition-colors"
            >
              Выйти
            </button>
            <button
              onClick={onClose}
              className="min-h-[36px] min-w-[36px] p-1 text-white bg-black hover:bg-[#ff184c] border-2 border-white/60 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-3 sm:px-6 py-2 border-b-2 border-zinc-900 bg-black flex items-center gap-1.5 sm:gap-2 overflow-x-auto touch-pan-x">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider font-display border-2 border-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-[#ff184c] text-white shadow-[2px_2px_0px_#000000]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Проекты ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider font-display border-2 border-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-[#ff184c] text-white shadow-[2px_2px_0px_#000000]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Заявки</span>
            {unreadInquiriesCount > 0 && (
              <span className="w-4 h-4 bg-[#ffe600] text-black font-black text-[10px] flex items-center justify-center">
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider font-display border-2 border-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#ff184c] text-white shadow-[2px_2px_0px_#000000]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Профиль & Контакты</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider font-display border-2 border-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#ff184c] text-white shadow-[2px_2px_0px_#000000]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Бэкап & PIN</span>
          </button>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === 'projects' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-4 bg-zinc-900 border-3 border-black shadow-[5px_5px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-black text-white font-display uppercase tracking-tight">
                  Добавить новый кейс в портфолио
                </h4>
                <p className="text-xs text-zinc-300 font-medium mt-0.5">
                  Быстрые шаблоны в 1 клик или создание с загрузкой ваших скриншотов:
                </p>
              </div>

              <button
                onClick={onAddNewProject}
                className="px-5 py-2.5 text-xs font-black uppercase tracking-wider font-display text-white bg-[#ff184c] hover:bg-[#e00d3d] border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Добавить проект</span>
              </button>
            </div>

            {/* Template Presets Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#ffe600] font-mono font-bold shrink-0">Шаблоны в 1 клик:</span>
              {PROJECT_TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  onClick={() => onApplyTemplate(tpl)}
                  className="px-3 py-1.5 bg-zinc-900 border-2 border-black hover:bg-[#ffe600] hover:text-black text-white font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{tpl.name}</span>
                </button>
              ))}
            </div>

            {/* Projects Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono font-bold px-2">
                <span>СПИСОК РАБОТ ({projects.length})</span>
                <span>ДЕЙСТВИЯ И ПОРЯДОК</span>
              </div>

              <div className="space-y-2">
                {projects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="p-3.5 bg-zinc-950 border-2 border-black shadow-[3px_3px_0px_#000000] hover:border-[#ffe600] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-16 h-12 border-2 border-black bg-black shrink-0 overflow-hidden">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white truncate font-display uppercase">
                            {project.title}
                          </h4>
                          {project.featured && (
                            <span className="text-[10px] font-black px-1.5 py-0.2 bg-[#ffe600] text-black border border-black uppercase">
                              Главный
                            </span>
                          )}
                          {!project.isPublished && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-zinc-800 text-zinc-400">
                              Скрыт
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono font-bold mt-0.5">
                          <span className="text-[#ff184c]">{project.category}</span>
                          <span>//</span>
                          <span>{project.year}</span>
                          <span>//</span>
                          <span className="truncate">{project.client || 'Личный'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => onReorderProject(project.id, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-black disabled:opacity-20"
                        title="Поднять выше"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReorderProject(project.id, 'down')}
                        disabled={idx === projects.length - 1}
                        className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-black disabled:opacity-20"
                        title="Опустить ниже"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onToggleFeatured(project)}
                        className={`p-1.5 border border-black transition-colors ${
                          project.featured
                            ? 'bg-[#ffe600] text-black'
                            : 'bg-zinc-900 text-zinc-500 hover:text-white'
                        }`}
                        title={project.featured ? 'Убрать из главных' : 'Сделать главным'}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => onTogglePublished(project)}
                        className={`p-1.5 border border-black transition-colors ${
                          project.isPublished
                            ? 'bg-emerald-500 text-black'
                            : 'bg-zinc-900 text-zinc-500'
                        }`}
                        title={project.isPublished ? 'Опубликован' : 'Скрыт'}
                      >
                        {project.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onDuplicateProject(project.id)}
                        className="p-1.5 bg-zinc-900 border border-black text-zinc-400 hover:text-white"
                        title="Создать копию"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEditProject(project)}
                        className="px-2.5 py-1.5 text-xs font-black uppercase font-display text-white bg-zinc-800 hover:bg-[#ff184c] border border-black transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Изменить</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Удалить проект "${project.title}"?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="p-1.5 text-zinc-500 hover:text-red-500 border border-zinc-800 hover:border-red-500 transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Client Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
              <h3 className="text-base font-black text-white font-display uppercase tracking-tight">
                Заявки и контакты от клиентов ({inquiries.length})
              </h3>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 text-xs font-mono">
                Пока нет новых заявок. Как только посетитель отправит форму, данные отобразятся здесь.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-4 border-2 border-black ${
                      inq.status === 'new'
                        ? 'bg-[#ff184c]/10 shadow-[4px_4px_0px_#ff184c]'
                        : 'bg-zinc-950 shadow-[4px_4px_0px_#000000]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white font-display uppercase">{inq.name}</span>
                        {inq.status === 'new' && (
                          <span className="text-[10px] font-black px-2 py-0.5 bg-[#ff184c] text-white border border-black uppercase">
                            НОВАЯ
                          </span>
                        )}
                        {inq.projectName && (
                          <span className="text-xs text-zinc-400 font-mono">
                            по кейсу: <strong className="text-white">{inq.projectName}</strong>
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {new Date(inq.createdAt).toLocaleString('ru-RU')}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold mb-3">
                      <div>
                        <span className="text-zinc-500">КОНТАКТ: </span>
                        <strong className="text-[#ffe600]">{inq.contact}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500">ТИП: </span> {inq.projectType}
                      </div>
                      {inq.budget && (
                        <div>
                          <span className="text-zinc-500">БЮДЖЕТ: </span> {inq.budget}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-zinc-200 bg-zinc-900 p-3 border border-zinc-800 leading-relaxed font-sans">
                      {inq.message}
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-bold">Статус:</span>
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            onUpdateInquiryStatus(inq.id, e.target.value as ClientInquiry['status'])
                          }
                          className="px-2 py-1 text-xs bg-zinc-900 border border-black text-white"
                        >
                          <option value="new">Новая</option>
                          <option value="in_progress">В работе</option>
                          <option value="replied">Отвечено</option>
                          <option value="archived">В архив</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {inq.contact.includes('@') && (
                          <a
                            href={`mailto:${inq.contact}?subject=Ответ на заявку`}
                            className="px-2.5 py-1 text-xs font-bold text-black bg-[#ffe600] border border-black flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Написать на Email</span>
                          </a>
                        )}

                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-1 text-zinc-500 hover:text-red-500"
                          title="Удалить заявку"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Author Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
              <h3 className="text-base font-black text-white font-display uppercase tracking-tight">
                Профиль автора и контакты
              </h3>
              {profileSavedToast && (
                <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>СОХРАНЕНО!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Имя и фамилия</label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Специализация / Роль</label>
                <input
                  type="text"
                  value={editingProfile.role}
                  onChange={(e) => setEditingProfile({ ...editingProfile, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>
            </div>

            {/* Photo / Avatar Section with Live Upload */}
            <div className="p-4 bg-zinc-900 border-2 border-zinc-800 space-y-3">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-300">
                Фотография профиля (Аватар)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-black border-2 border-black shadow-[3px_3px_0px_#e11d48] overflow-hidden">
                  <img
                    src={editingProfile.avatarUrl}
                    alt={editingProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold uppercase font-mono border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Загрузить свое фото</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (typeof event.target?.result === 'string') {
                                setEditingProfile({
                                  ...editingProfile,
                                  avatarUrl: event.target.result
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setEditingProfile({ ...editingProfile, avatarUrl: DEFAULT_PROFILE.avatarUrl })}
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono border border-zinc-700 cursor-pointer"
                    >
                      Сбросить к оригиналу
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Вы можете загрузить любое свое фото (JPG, PNG, WebP) прямо со смартфона или компьютера.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase font-mono font-bold text-zinc-400">О себе</label>
              <textarea
                rows={3}
                value={editingProfile.bio}
                onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Статус</label>
                <input
                  type="text"
                  value={editingProfile.statusText}
                  onChange={(e) => setEditingProfile({ ...editingProfile, statusText: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase font-mono font-bold text-zinc-400">Локация</label>
                <input
                  type="text"
                  value={editingProfile.location}
                  onChange={(e) => setEditingProfile({ ...editingProfile, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t-2 border-zinc-900">
              <div className="space-y-1">
                <span className="text-[11px] text-zinc-400 font-mono font-bold">Telegram</span>
                <input
                  type="text"
                  value={editingProfile.telegram}
                  onChange={(e) => setEditingProfile({ ...editingProfile, telegram: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-zinc-400 font-mono font-bold">Email</span>
                <input
                  type="email"
                  value={editingProfile.email}
                  onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-zinc-400 font-mono font-bold">Телефон / WhatsApp</span>
                <input
                  type="text"
                  value={editingProfile.phone || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#e11d48]"
                />
              </div>
            </div>

            <div className="pt-4 border-t-3 border-black flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-black uppercase tracking-wider font-display text-white bg-[#e11d48] hover:bg-[#be123c] border-2 border-black shadow-[4px_4px_0px_#000000] cursor-pointer"
              >
                Сохранить профиль
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Security & Backup */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-5 bg-zinc-950 border-3 border-black shadow-[4px_4px_0px_#000000] space-y-4">
              <h4 className="text-sm font-black text-white font-display uppercase tracking-tight">
                Смена PIN-кода администратора
              </h4>
              <p className="text-xs text-zinc-400 font-medium">
                Текущий PIN: <strong className="text-[#ffe600] font-mono">{StorageService.getAdminPin()}</strong>
              </p>
              <form onSubmit={handleChangePin} className="flex items-center gap-3 max-w-sm">
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Новый PIN (от 4 знаков)"
                  className="flex-1 px-3 py-2 text-xs bg-zinc-900 border-2 border-black text-white focus:outline-none focus:border-[#ffe600]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black uppercase font-display text-black bg-[#ffe600] border-2 border-black shadow-[2px_2px_0px_#000000] cursor-pointer"
                >
                  Сменить
                </button>
              </form>
              {pinSavedToast && (
                <div className="text-xs text-emerald-400 font-mono font-bold">PIN успешно обновлен!</div>
              )}
            </div>

            <div className="p-5 bg-zinc-950 border-3 border-black shadow-[4px_4px_0px_#000000] space-y-4">
              <h4 className="text-sm font-black text-white font-display uppercase tracking-tight">
                Резервное копирование и перенос
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 text-xs font-black uppercase font-display text-white bg-zinc-900 hover:bg-zinc-800 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать JSON бэкап</span>
                </button>

                <button
                  onClick={() => importInputRef.current?.click()}
                  className="px-4 py-2.5 text-xs font-black uppercase font-display text-white bg-zinc-900 hover:bg-zinc-800 border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Восстановить из файла</span>
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleImportBackup}
                />
              </div>
            </div>

            <div className="p-5 bg-red-950/20 border-3 border-black shadow-[4px_4px_0px_#ff184c] space-y-3">
              <h4 className="text-sm font-black text-[#ff184c] font-display uppercase tracking-tight">
                Сброс к исходным демо-проектам
              </h4>
              <button
                onClick={() => {
                  if (confirm('Восстановить исходные демонстрационные работы?')) {
                    onResetToDemo();
                  }
                }}
                className="px-4 py-2 text-xs font-black uppercase font-display text-white bg-[#ff184c] border-2 border-black shadow-[3px_3px_0px_#000000] cursor-pointer"
              >
                Восстановить демо
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
