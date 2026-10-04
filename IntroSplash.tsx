import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, ArrowRight } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
  authorName: string;
}

interface LogEntry {
  text: string;
  sub: string;
}

const STUDIO_STEPS: LogEntry[] = [
  { text: 'Зажигаем теплый свет гирлянд в студии...', sub: 'WARM_LIGHTS_ON' },
  { text: 'Настраиваем палитру: красный кирпич, янтарь и дерево...', sub: 'PALETTE_INIT' },
  { text: 'Подготавливаем избранные авторские кейсы...', sub: 'PORTFOLIO_SYNC' },
  { text: 'Все готово. Добро пожаловать!', sub: 'WELCOME' }
];

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete, authorName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(25);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next < STUDIO_STEPS.length) {
          setProgress(Math.round(((next + 1) / STUDIO_STEPS.length) * 100));
          return next;
        } else {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => setIsExiting(true), 250);
          setTimeout(() => onComplete(), 700);
          return prev;
        }
      });
    }, 420);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => onComplete(), 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#110c0d] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
        >
          {/* Ambient Warm Golden & Brick Hearth Glow */}
          <div className="absolute inset-0 bg-radial from-[#ffb703]/12 via-[#c14a38]/08 to-transparent pointer-events-none" />

          {/* Central Warm Studio Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg bg-[#1b1316]/95 border border-[#3d262b] rounded-3xl shadow-[0_20px_60px_rgba(20,10,12,0.7)] p-6 sm:p-8 relative z-10 backdrop-blur-xl"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#3d262b]">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#ffb703] shadow-[0_0_12px_#ffb703] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#ffd166] tracking-wider uppercase">
                  FAKIEBOB // BRICK STUDIO
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#ffd166]/80">
                {progress}%
              </span>
            </div>

            {/* Glowing Lamp Graphic */}
            <div className="flex justify-center my-4">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  filter: [
                    'drop-shadow(0 0 15px rgba(255, 183, 3, 0.4))',
                    'drop-shadow(0 0 25px rgba(255, 183, 3, 0.7))',
                    'drop-shadow(0 0 15px rgba(255, 183, 3, 0.4))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffb703] to-[#c14a38] flex items-center justify-center text-black shadow-lg"
              >
                <Coffee className="w-8 h-8 text-black fill-black/20" />
              </motion.div>
            </div>

            {/* Studio Welcome Text */}
            <div className="text-center my-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#fbf8f5] font-display uppercase tracking-tight">
                {authorName}
              </h2>
              <p className="text-xs sm:text-sm text-[#d8c8bc] font-sans mt-1">
                {STUDIO_STEPS[Math.min(currentStep, STUDIO_STEPS.length - 1)].text}
              </p>
            </div>

            {/* Warm Progress Bar */}
            <div className="w-full bg-[#140f11] h-2 rounded-full overflow-hidden border border-[#2d1e21] my-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c14a38] via-[#e06b52] to-[#ffb703]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Skip Button */}
            <div className="flex items-center justify-between pt-4 border-t border-[#2d1e21] text-[11px] font-mono text-[#a69285]">
              <span>Теплая авторская атмосфера</span>
              <button
                onClick={handleSkip}
                className="hover:text-[#ffd166] transition-colors flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>Войти сразу</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
