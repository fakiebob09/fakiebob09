import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, Coffee, Star } from 'lucide-react';

interface MarqueeSectionProps {
  text?: string[];
  theme?: 'brick' | 'amber' | 'dark';
  reverse?: boolean;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({
  text = [
    'ДИЗАЙН С ДУШОЙ',
    'ТЕПЛАЯ АТМОСФЕРА',
    'ЖИВЫЕ ИНТЕРФЕЙСЫ',
    'ПРОДУМАННЫЙ UI/UX',
    'БРЕНДИНГ С ХАРАКТЕРОМ',
    'ВНИМАНИЕ К ДЕТАЛЯМ',
    'АВТОРСКИЙ ПОДХОД',
    'БЕЗ ВИЗУАЛЬНОГО ШУМА'
  ],
  theme = 'brick',
  reverse = false
}) => {
  const items = [...text, ...text, ...text];

  const bgColor =
    theme === 'brick'
      ? 'bg-[#1b1215] text-[#ffd166] border-y border-[#3d262b]'
      : theme === 'amber'
      ? 'bg-[#24171a] text-[#ffb703] border-y border-[#ffb703]/30'
      : 'bg-[#140f10] text-[#c8b7a6] border-y border-[#291a1d]';

  return (
    <div className={`relative overflow-hidden py-3 select-none ${bgColor} shadow-sm backdrop-blur-sm`}>
      <motion.div
        className="flex whitespace-nowrap gap-6 sm:gap-10 font-sans font-semibold text-xs sm:text-sm uppercase tracking-widest items-center"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28
        }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 sm:gap-6 shrink-0">
            <span>{item}</span>
            {idx % 4 === 0 ? (
              <Sparkles className="w-3.5 h-3.5 text-[#ffb703] shrink-0" />
            ) : idx % 4 === 1 ? (
              <Flame className="w-3.5 h-3.5 text-[#c14a38] shrink-0" />
            ) : idx % 4 === 2 ? (
              <Star className="w-3.5 h-3.5 text-[#ffd166] shrink-0" />
            ) : (
              <Coffee className="w-3.5 h-3.5 text-[#e5a84b] shrink-0" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
