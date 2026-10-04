import React from 'react';
import { AuthorProfile } from '../types/portfolio';
import { ArrowUp, Lock, Unlock, Play, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  profile: AuthorProfile;
  isAdmin: boolean;
  onOpenAdmin: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  isAdmin,
  onOpenAdmin,
  onReplayIntro
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#110c0d]/90 backdrop-blur-xl py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-lg font-bold text-[#fbf8f5] font-display uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb703] shadow-[0_0_8px_#ffb703]" />
              <span>{profile.name}</span>
              <span className="text-xs font-mono text-[#ea7a65]">STUDIO</span>
            </div>
            <div className="text-xs text-[#a69285] font-sans">
              {profile.role} • {profile.location}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium tracking-wider font-sans text-[#c8b7a6]">
            <a href="#projects" className="hover:text-[#ffb703] transition-colors">
              Работы
            </a>
            <a href="#services" className="hover:text-[#ffb703] transition-colors">
              Услуги
            </a>
            <a href="#about" className="hover:text-[#ffb703] transition-colors">
              О студии
            </a>
            <a
              href={`https://t.me/${profile.telegram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#ffb703] hover:text-[#ffd166] transition-colors"
            >
              Telegram
            </a>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="px-3 py-1.5 bg-[#1c1417] text-[#c8b7a6] hover:text-white border border-[#3d262b] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Посмотреть заставку"
              >
                <Play className="w-3 h-3 text-[#ffb703]" />
                <span className="hidden sm:inline">Интро</span>
              </button>
            )}

            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 bg-[#1c1417] text-[#c8b7a6] hover:text-white border border-[#3d262b] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Админ-панель"
            >
              {isAdmin ? <Unlock className="w-3.5 h-3.5 text-[#ffb703]" /> : <Lock className="w-3.5 h-3.5 text-[#a69285]" />}
              <span className="hidden sm:inline">{isAdmin ? 'Администратор' : 'Вход'}</span>
            </button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={scrollToTop}
              className="w-9 h-9 bg-[#23171a] hover:bg-[#c14a38] text-white rounded-xl border border-[#3d262b] flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="mt-8 pt-6 border-t border-[#291a1d] flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#8a7266] gap-2">
          <div>© {new Date().getFullYear()} {profile.name}. Дизайн в теплой атмосфере и с вниманием к человеку.</div>
          <div className="flex items-center gap-1.5 text-[#a69285]">
            <Coffee className="w-3 h-3 text-[#ffb703]" />
            <span>Теплый свет • Все права защищены</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
