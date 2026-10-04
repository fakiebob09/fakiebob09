import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ComicFloatingElements: React.FC = () => {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollY1 = useTransform(scrollY, [0, 2000], [0, -110]);
  const scrollY2 = useTransform(scrollY, [0, 2000], [0, -170]);
  const scrollY3 = useTransform(scrollY, [0, 2000], [0, -80]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Warm Glowing Edison Bulb Light Particle (Top Right) */}
      <motion.div
        style={{
          y: scrollY1,
          x: mousePos.x * 14
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.75, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 right-12 sm:right-28 flex items-center gap-2"
      >
        <div className="w-3.5 h-3.5 rounded-full bg-[#ffb703] shadow-[0_0_20px_#ffb703]" />
        <span className="text-[10px] font-mono tracking-widest text-[#ffb703]/50 uppercase">WARM LIGHT</span>
      </motion.div>

      {/* 2. Soft Brick Ember Particle (Mid Left) */}
      <motion.div
        style={{
          y: scrollY2,
          x: mousePos.x * -16
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[48%] left-8 sm:left-20 flex items-center gap-2.5"
      >
        <div className="w-3 h-3 rounded-full bg-[#c14a38] shadow-[0_0_16px_#c14a38]" />
        <span className="text-[10px] font-mono tracking-wider text-[#ea7a65]/50">RED BRICK STUDIO</span>
      </motion.div>

      {/* 3. Tennis Ball Chartreuse Spark (Bottom Right) */}
      <motion.div
        style={{
          y: scrollY3,
          x: mousePos.x * 12
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-40 right-16 sm:right-32 flex items-center gap-2"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] shadow-[0_0_15px_#ccff00]" />
        <span className="text-[9px] font-mono tracking-wider text-[#ccff00]/40">TENNIS BALL SPARK</span>
      </motion.div>
    </div>
  );
};
