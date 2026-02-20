'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const techIcons = ['</>', '{}', '[]', '=>', '||', '&&', '##', '/*', '*/', '++'];

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  icon: string;
  duration: number;
  delay: number;
}

function generateIcons(): FloatingIcon[] {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    icon: techIcons[Math.floor(Math.random() * techIcons.length)],
    duration: 20 + Math.random() * 20,
    delay: Math.random() * 5,
  }));
}

export default function Hero() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIcons(generateIcons());
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted &&
          icons.map((icon) => (
            <motion.div
              key={icon.id}
              className="absolute text-white/10 font-mono text-2xl font-bold select-none"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: icon.duration,
                delay: icon.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {icon.icon}
            </motion.div>
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            开发者小工具集
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            一站式开发者工具箱，涵盖加密解密、格式转换、网络工具、文本处理等 80+ 款实用工具
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { value: '80+', label: '在线工具' },
              { value: '10', label: '工具分类' },
              { value: '100%', label: '免费使用' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {/* Back wave - deeper, slower */}
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[200%] h-28"
          role="img"
          aria-label="Decorative wave"
        >
          <motion.path
            d="M0 50Q150 100,300 50T600 50T900 50T1200 50V120H0V50Z"
            fill="rgba(255,255,255,0.25)"
            animate={{
              x: [0, -600, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
        {/* Front wave - lighter, faster */}
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[200%] h-24"
          role="img"
          aria-label="Decorative wave"
        >
          <motion.path
            d="M0 80Q200 30,400 80T800 80T1200 80V120H0V80Z"
            fill="#f9fafb"
            animate={{
              x: [0, -600, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
      </div>
    </section>
  );
}
