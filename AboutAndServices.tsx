import React from 'react';
import { AuthorProfile } from '../types/portfolio';
import { Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { TelegramIcon } from './TelegramIcon';

interface AboutAndServicesProps {
  profile: AuthorProfile;
  onOpenInquiry: () => void;
}

const SERVICES = [
  {
    number: '01',
    title: 'Веб-дизайн & UI/UX Архитектура',
    description:
      'Создание адаптивных цифровых сервисов, корпоративных сайтов и платформ с фокусом на спокойствие, удобство взаимодействия и безупречную типографику.',
    deliverables: ['Интерфейсы в Figma', 'Дизайн-системы & UI Kit', 'Адаптивная верстка', 'Аудит юзабилити']
  },
  {
    number: '02',
    title: 'Брендинг & Теплая айдентика',
    description:
      'Разработка запоминающегося характера бренда: от логотипа и натуральных цветовых палитр до брендбуков, упаковки и физических носителей.',
    deliverables: ['Логотип и знак', 'Фирменные цвета и шрифты', 'Оформление упаковки', 'Гайдлайны для веба и печати']
  },
  {
    number: '03',
    title: 'Мобильные интерфейсы iOS & Android',
    description:
      'Проектирование пользовательских путей и нативных экранов мобильных приложений с заботой о внимании и времени пользователя.',
    deliverables: ['UX-исследования и тесты', 'Экраны iOS & Android', 'Плавная микро-анимация', 'Handoff для разработки']
  },
  {
    number: '04',
    title: '3D Визуализация & Моушн-дизайн',
    description:
      'Трехмерные рендеры продуктов с физически корректным мягким светом, текстурами дерева, камня и стекла для презентации инноваций.',
    deliverables: ['3D моделирование продуктов', 'Текстуры и физический свет', 'Анимационные промо-ролики', 'Рендеры в высоком разрешении']
  }
];

export const AboutAndServices: React.FC<AboutAndServicesProps> = ({
  profile,
  onOpenInquiry
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-20">
      {/* 1. Services Section */}
      <motion.section
        id="services"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 pb-4"
        >
          <div className="p-4 sm:p-6 rounded-2xl bg-[#161013]/85 backdrop-blur-xl border border-[#ffb703]/20 max-w-3xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24171b]/90 border border-[#ffb703]/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ffb703] shadow-[0_0_8px_#ffb703]" />
              <span className="text-xs font-mono font-bold text-[#ffb703] uppercase tracking-widest">
                НАПРАВЛЕНИЯ // ЭКСПЕРТИЗА
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Услуги и компетенции
            </h2>
            <p className="text-sm text-[#f0e6df] mt-2 max-w-xl font-normal">
              Помогаю компаниям и авторам создавать продукты, в которых приятно находиться — без лишнего шума, навязчивой рекламы и визуального стресса.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.number}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-6 sm:p-8 bg-[#161013]/85 border border-[#ffb703]/20 hover:border-[#ffb703]/60 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(193,74,56,0.2)] transition-all flex flex-col justify-between backdrop-blur-xl"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#ffb703] mb-2">
                  // {srv.number} НАПРАВЛЕНИЕ
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-display uppercase tracking-tight mb-3">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#f0e6df] leading-relaxed mb-6 font-normal">
                  {srv.description}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 space-y-2.5">
                <div className="text-[11px] uppercase font-mono font-medium text-[#ffd166]">
                  Результаты и артефакты:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#f5eee8]">
                  {srv.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffb703] shrink-0" />
                      <span className="font-medium text-[#e4d7cc]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 2. Philosophy & Warm Atelier Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-6 sm:p-10 md:p-12 bg-[#161013]/90 border border-[#ffb703]/20 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl">
          {/* Warm background brick and amber glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c14a38]/20 via-[#ffb703]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#23171a] border border-[#ffb703]/40 rounded-full text-xs font-mono font-medium text-[#ffd166]">
                <Flame className="w-3.5 h-3.5 text-[#c14a38]" />
                <span>ФИЛОСОФИЯ УЮТНОЙ СТУДИИ</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Простота, душевность и отсутствие визуального шума
              </h2>

              <p className="text-sm sm:text-base text-[#f0e6df] leading-relaxed font-sans font-normal">
                В мире, перегруженном агрессивными баннерами и кричащей рекламой, побеждает спокойный, интуитивно понятный и душевный дизайн. Я проектирую интерфейсы, которые уважают внимание пользователя.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#ffb703] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#f0e6df] font-sans">
                    <strong className="text-white">Честность и реальный опыт:</strong> Никаких вымышленных наград и пустых обещаний. Только проверенные решения и прозрачный рабочий процесс.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#ffb703] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#f0e6df] font-sans">
                    <strong className="text-white">Забота о пользователе:</strong> Логичные сценарии, удобный шрифт, контрастность по стандартам WCAG и естественная визуальная иерархия.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#ffb703] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#f0e6df] font-sans">
                    <strong className="text-white">Быстрая и чистая разработка:</strong> Все макеты и компоненты готовы к переносу в код без лишней суеты.
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenInquiry}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#c14a38] via-[#b34030] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_6px_20px_rgba(193,74,56,0.35)] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <TelegramIcon className="w-4 h-4 text-[#ffd166]" />
                  <span>Обсудить задачу в Telegram</span>
                </button>
              </div>
            </div>

            {/* Right quote block */}
            <div className="lg:col-span-5 bg-[#1a1215]/90 p-6 sm:p-8 rounded-3xl border border-[#ffb703]/20 space-y-4 backdrop-blur-md">
              <div className="text-3xl text-[#ffb703] font-serif">“</div>
              <p className="text-sm text-[#f5eee8] leading-relaxed italic font-sans">
                Хороший дизайн делает сложное простым, а бренд — теплым и узнаваемым с первого взгляда. Моя цель — чтобы вам и вашим клиентам было комфортно.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white uppercase font-display">{profile.name}</div>
                  <div className="text-[11px] text-[#ffb703] font-mono">{profile.role}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-[#23171a] text-[#ffd166] border border-[#ffb703]/30 rounded-lg">
                    3+ лет опыта
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
