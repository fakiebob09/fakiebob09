import React, { useState, useRef } from 'react';
import { AuthorProfile } from '../types/portfolio';
import { Lock, Unlock, Menu, X, Coffee, Send, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorageService } from '../services/storage';

interface NavbarProps {
  profile: AuthorProfile;
  isAdmin: boolean;
  onOpenAdmin: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isAdmin,
  onOpenAdmin,
  onOpenInquiry
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        StorageService.setCustomBackground(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 bg-[#161012]/85 backdrop-blur-xl border-b border-[#3d262b]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Zone 1: Clean Wordmark */}
        <a
          href="#top"
          className="group flex items-center transition-transform hover:-translate-y-0.5"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#fbf8f5] font-display uppercase whitespace-nowrap">
            {profile.name}
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider font-sans text-[#c8b7a6]">
          <a
            href="#projects"
            className="hover:text-[#ffb703] transition-colors relative py-1 hover:translate-y-[-1px]"
          >
            Работы
          </a>
          <a
            href="#services"
            className="hover:text-[#ffb703] transition-colors relative py-1 hover:translate-y-[-1px]"
          >
            Услуги
          </a>
          <a
            href="#about"
            className="hover:text-[#ffb703] transition-colors relative py-1 hover:translate-y-[-1px]"
          >
            О студии
          </a>
          <a
            href={`https://t.me/${profile.telegram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#ffb703] hover:text-[#ffd166] transition-colors relative py-1 hover:translate-y-[-1px] font-medium"
          >
            Telegram
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Photo Background Upload Button */}
          <input
            ref={bgInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBgUpload}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => bgInputRef.current?.click()}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-xl border border-[#3d262b] hover:border-[#ffb703]/50 bg-[#1c1417] text-[#c8b7a6] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Загрузить ваше фото на фон (1 клик)"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#ffb703]" />
            <span className="hidden sm:inline">Сменить фон</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAdmin}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-mono font-medium rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              isAdmin
                ? 'bg-[#ffb703] text-black border-[#ffd166] shadow-[0_0_12px_rgba(255,183,3,0.4)]'
                : 'bg-[#1c1417] text-[#c8b7a6] border-[#3d262b] hover:border-[#ffb703]/50 hover:text-white'
            }`}
            title="Админ-панель"
          >
            {isAdmin ? <Unlock className="w-3.5 h-3.5 text-black" /> : <Lock className="w-3.5 h-3.5 text-[#ffb703]/60" />}
            <span className="hidden sm:inline">{isAdmin ? 'Администратор' : 'Вход'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenInquiry}
            className="min-h-[38px] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] rounded-xl shadow-[0_4px_16px_rgba(193,74,56,0.35)] transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span className="hidden xs:inline">Обсудить проект</span>
            <span className="xs:hidden">Бриф</span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c8b7a6] hover:text-white rounded-xl bg-[#1c1417] border border-[#3d262b]"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#161012] border-b border-[#3d262b] px-4 py-5 space-y-4"
          >
            <nav className="flex flex-col space-y-3 font-semibold text-sm text-[#f5eee8]">
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#ffb703] transition-colors"
              >
                Работы
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#ffb703] transition-colors"
              >
                Услуги
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#ffb703] transition-colors"
              >
                О студии
              </a>
              <a
                href={`https://t.me/${profile.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-1 text-[#ffb703] transition-colors"
              >
                Telegram ({profile.telegram})
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
