import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { StorageService } from '../services/storage';

export const LivingBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const [currentBg, setCurrentBg] = useState<string>(() => {
    return StorageService.getCustomBackground() || '/background.jpg';
  });

  useEffect(() => {
    const handleBgUpdate = () => {
      const custom = StorageService.getCustomBackground();
      setCurrentBg(custom || '/background.jpg');
    };

    window.addEventListener('portfolio_bg_updated', handleBgUpdate);
    window.addEventListener('storage', handleBgUpdate);
    return () => {
      window.removeEventListener('portfolio_bg_updated', handleBgUpdate);
      window.removeEventListener('storage', handleBgUpdate);
    };
  }, []);

  // Soft vertical parallax only, NO ZOOM/SCALE on scroll as requested
  const bgY = useTransform(scrollY, [0, 3000], [0, -50]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0e0a0c]">
      {/* 1. Full-screen Background Image (Fixed scale, no zoom on scroll) */}
      <motion.div
        style={{
          y: bgY,
          scale: 1,
          backgroundImage: `url(${currentBg})`
        }}
        className="absolute inset-0 w-full h-[110%] will-change-transform bg-cover bg-center bg-no-repeat"
      >
        <img
          src={currentBg}
          alt="Portfolio Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.86] contrast-[1.04]"
        />
      </motion.div>

      {/* 2. Lightened Ambient Tint & Soft Vignette (Subtle darkening reduced as requested) */}
      <div className="absolute inset-0 bg-[#0c0809]/25 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 95% 75% at 50% 25%, transparent 20%, rgba(12, 8, 9, 0.35) 85%),
            linear-gradient(to bottom, rgba(12, 8, 9, 0.4) 0%, rgba(12, 8, 9, 0.12) 30%, rgba(12, 8, 9, 0.25) 70%, rgba(12, 8, 9, 0.65) 100%)
          `
        }}
      />

      {/* 3. Warm Ambient Street Light Tone */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[30vh] bg-gradient-to-b from-[#ffb703]/10 via-[#c14a38]/06 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
