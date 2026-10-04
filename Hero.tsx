import React, { useState, useRef } from 'react';
import { AuthorProfile } from '../types/portfolio';
import { ArrowDown, Upload, Camera, Send, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { FakiebobPortrait } from './FakiebobPortrait';
import { TelegramIcon } from './TelegramIcon';

interface HeroProps {
  profile: AuthorProfile;
  onUpdateProfile?: (profile: AuthorProfile) => void;
  onOpenInquiry: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onUpdateProfile,
  onOpenInquiry,
  isAdmin,
  onOpenAdmin
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          onUpdateProfile?.({ ...profile, avatarUrl: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          onUpdateProfile?.({ ...profile, avatarUrl: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="top" className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Text & Stats wrapped in frosted card for guaranteed high contrast */}
          <div className="lg:col-span-6 space-y-6 p-6 sm:p-8 rounded-3xl bg-[#140f11]/85 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Headline in Fraunces organic serif */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white font-display leading-[1.12] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Дизайн с{' '}
              <motion.span
                animate={{
                  color: ['#e06b52', '#ffb703', '#e06b52']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#e06b52] italic"
              >
                душой
              </motion.span>
              , характером и живым теплом
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#f0e6df] font-sans leading-relaxed max-w-xl font-normal"
            >
              Привет! Я Fakiebob. Создаю авторские веб-сервисы, продуманные интерфейсы и брендинг с душевной атмосферой. Без лишнего шума и суеты — теплота кирпичных улочек, мягкий свет и внимание к человеку.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="min-h-[44px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] rounded-xl shadow-[0_4px_16px_rgba(193,74,56,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Смотреть работы</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </motion.a>

              <motion.button
                onClick={onOpenInquiry}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="min-h-[44px] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#f5eee8] bg-[#22171a] hover:bg-[#2c1d22] border border-[#ffb703]/30 hover:border-[#ffb703] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <TelegramIcon className="w-4 h-4 text-[#ffd166]" />
                <span>Обсудить задачу</span>
              </motion.button>
            </motion.div>

            {/* Exact Statistics: 3+ лет в дизайне, 12 проектов, 8 довольных клиентов (No dark separator line) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              <div className="p-3.5 bg-[#1e1518]/90 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#ffb703] font-display">
                  3+
                </div>
                <div className="text-xs font-sans text-[#e4d7cc] mt-1 leading-snug">
                  лет в дизайне
                </div>
              </div>

              <div className="p-3.5 bg-[#1e1518]/90 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#ea7a65] font-display">
                  12
                </div>
                <div className="text-xs font-sans text-[#e4d7cc] mt-1 leading-snug">
                  проектов
                </div>
              </div>

              <div className="p-3.5 bg-[#1e1518]/90 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-[#ffd166] font-display">
                  8
                </div>
                <div className="text-xs font-sans text-[#e4d7cc] mt-1 leading-snug">
                  довольных клиентов
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Photo WITHOUT FRAME, sized to match left text, with Telegram Button directly under photo */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[420px] flex flex-col items-center"
            >
              {/* Photo Alone without frame / border */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                title="Нажмите или перетащите сюда фото, чтобы обновить оригинал"
                className={`relative w-full aspect-[4/5] flex items-center justify-center group cursor-pointer transition-transform duration-300 ${
                  isDragging ? 'scale-105' : ''
                }`}
              >
                {/* Soft Warm Brick & Amber Aura Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c14a38]/25 via-[#ffb703]/20 to-transparent rounded-full blur-3xl transform scale-95 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

                {/* Organic blurred mask container: NO BORDER, arbitrary organic shape, feathered blurred edges */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full overflow-hidden select-none"
                  style={{
                    borderRadius: '48% 52% 64% 36% / 40% 60% 40% 60%',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 50%, rgba(0,0,0,0.85) 72%, transparent 98%)',
                    maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 50%, rgba(0,0,0,0.85) 72%, transparent 98%)',
                    filter: 'contrast(1.04) brightness(1.02)'
                  }}
                >
                  <FakiebobPortrait avatarUrl={profile.avatarUrl} className="w-full h-full object-cover" />
                </motion.div>

                {/* Hover Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <span className="px-3.5 py-2 bg-black/90 backdrop-blur-md border border-[#ffb703] text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center gap-2 shadow-xl">
                    <Camera className="w-4 h-4 text-[#ffb703]" />
                    <span>Сменить фото</span>
                  </span>
                </div>
              </div>

              {/* Direct Telegram Button strictly UNDER THE PHOTO */}
              <div className="w-full mt-5 space-y-2">
                <motion.a
                  href={`https://t.me/${profile.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#c14a38] via-[#a83b2b] to-[#8e2f22] hover:from-[#d45d47] hover:to-[#c14a38] border border-[#ffb703]/40 rounded-2xl text-white shadow-[0_6px_20px_rgba(193,74,56,0.35)] transition-all group/btn cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-black/30 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#ffd166]" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd166]">
                        Прямая связь
                      </div>
                      <div className="text-sm font-bold text-white">
                        Написать напрямую в Telegram
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-black/40 rounded-lg text-xs font-mono text-[#ffd166] font-bold">
                    {profile.telegram} →
                  </span>
                </motion.a>

                {/* Drag-and-drop subtle hint */}
                <div className="flex items-center justify-center pt-1">
                  <span className="text-[11px] text-[#f0e6df] font-mono px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                    Перетащите ваше фото на аватар, чтобы сменить
                  </span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
