import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, Wind, Snowflake, CloudRain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  rainChance: number;
  loading: boolean;
}

interface HeroProps {
  refKey?: string;
  opacity?: number;
  loaderComplete?: boolean;
}

const Hero: React.FC<HeroProps> = ({ refKey = 'default', opacity = 1, loaderComplete = false }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData>({
    city: 'Detectando...',
    temp: 0,
    condition: 'sunny',
    rainChance: 0,
    loading: true
  });

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch('https://hook.us2.make.com/g3o9n7k7hvv1gw9gdke8au1w2f5nmt3r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: refKey })
      });
      const data = await response.json();
      
      setWeather({
        city: data.city || 'Unknown',
        temp: data.temperature || 0,
        condition: data.condition?.toLowerCase() || 'sunny',
        rainChance: data.rainChance || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(prev => ({ ...prev, loading: false, city: 'Error' }));
    }
  };

  const getWeatherMood = () => {
    const condition = weather.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        name: 'rainy',
        bg: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 50%, #050505 100%)',
        particles: 'rain',
        glow: 'rgba(100, 149, 237, 0.15)',
        icon: CloudRain
      };
    }
    
    if (condition.includes('snow')) {
      return {
        name: 'snowy',
        bg: 'linear-gradient(180deg, #2d3561 0%, #1a1f3a 50%, #050505 100%)',
        particles: 'snow',
        glow: 'rgba(200, 220, 255, 0.12)',
        icon: Snowflake
      };
    }
    
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return {
        name: 'overcast',
        bg: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #050505 100%)',
        particles: 'overcast-flow',
        glow: 'rgba(169, 169, 169, 0.1)',
        icon: Cloud
      };
    }
    
    if (condition.includes('storm') || condition.includes('thunder')) {
      return {
        name: 'stormy',
        bg: 'linear-gradient(180deg, #1c1c3a 0%, #0d0d1f 50%, #050505 100%)',
        particles: 'storm',
        glow: 'rgba(138, 43, 226, 0.15)',
        icon: Wind
      };
    }
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      return {
        name: 'sunny',
        bg: 'linear-gradient(180deg, #2d1b00 0%, #1a1000 50%, #050505 100%)',
        particles: 'sunny',
        glow: 'rgba(212, 175, 55, 0.2)',
        icon: Sun
      };
    }
    
    return {
      name: 'default',
      bg: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #050505 100%)',
      particles: 'none',
      glow: 'rgba(212, 175, 55, 0.15)',
      icon: Cloud
    };
  };

  const mood = getWeatherMood();
  const WeatherIcon = mood.icon;

  const getHeroContent = () => {
    const validRefs = ['default', 'google', 'linkedin', 'facebook', 'youtube', 'newsletter', 'jointherealworld', 'mexico', 'españa', 'rusia', 'francia'];
    const ref = validRefs.includes(refKey) ? refKey : 'default';
    return {
      title: t(`hero.${ref}.title`),
      subtitle: t(`hero.${ref}.subtitle`)
    };
  };

  const heroContent = getHeroContent();

  // 🎬 VARIANTES DE ANIMACIÓN PARA EL TÍTULO
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9] // Curva de animación suave
      }
    }
  };

  // 🎬 VARIANTES PARA EL SUBTÍTULO (entra desde los lados alternadamente)
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  };

  // 🎬 VARIANTES PARA EL BOTÓN CTA
  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.9,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: mood.bg }}
    >
      <WeatherParticles type={mood.particles} />
      
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${mood.glow}, transparent 70%)`
        }}
      />

      {/* Weather Info - Animado desde arriba */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto w-full relative z-10 mb-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05, borderColor: 'rgba(212, 175, 55, 0.6)' }}
          className="inline-flex items-center space-x-4 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 px-6 py-3 rounded-sm transition-all"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <WeatherIcon className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-[#D4AF37]/70 text-xs font-['Inter'] uppercase tracking-wider">Ciudad:</span>
              <span className="text-white font-['Inter'] font-medium text-sm">
                {weather.loading ? (
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Detectando...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {weather.city}
                  </motion.span>
                )}
              </span>
            </div>

            {!weather.loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center space-x-6"
              >
                <div className="h-4 w-px bg-[#D4AF37]/30" />
                
                <div className="flex items-center space-x-2">
                  <span className="text-[#D4AF37]/70 text-xs font-['Inter'] uppercase tracking-wider">Temp:</span>
                  <motion.span
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-white font-['Inter'] font-semibold text-sm"
                  >
                    {weather.temp}°C
                  </motion.span>
                </div>

                <div className="h-4 w-px bg-[#D4AF37]/30" />
                
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white font-['Inter'] font-medium text-sm">{weather.rainChance}%</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Content - AQUÍ ESTÁN LAS ANIMACIONES MEJORADAS */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* TÍTULO - Animación épica con escala y fade */}
        <motion.h1
          key={`title-${loaderComplete}`}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-['Playfair_Display'] text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#D4AF37] bg-clip-text text-transparent leading-tight"
        >
          {/* Animación letra por letra (opcional, puedes comentar si es mucho) */}
          {heroContent.title.split('').map((char, index) => (
            <motion.span
              key={`char-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.03, // Cada letra con delay incremental
                ease: "easeOut"
              }}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* SUBTÍTULO - Entra desde la izquierda con fade */}
        <motion.p
          key={`subtitle-${loaderComplete}`}
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="font-['Inter'] text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          {heroContent.subtitle}
        </motion.p>
        
        {/* BOTÓN CTA - Entra con bounce */}
        <motion.button
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          whileHover={{ 
            scale: 1.08, 
            boxShadow: '0 0 60px rgba(212,175,55,0.6)',
            y: -8,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-[#D4AF37] text-[#050505] font-['Inter'] font-semibold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t('hero.default.cta')}
          </motion.span>
        </motion.button>
      </div>

      {/* Mood indicator - Animado desde la derecha */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(212, 175, 55, 0.6)' }}
        className="absolute bottom-8 right-8 z-10"
      >
        <div className="bg-black/30 backdrop-blur-sm border border-[#D4AF37]/20 px-4 py-2 rounded-sm transition-all">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[#D4AF37]/60 text-xs font-['Inter'] uppercase tracking-widest"
          >
            Mood: {mood.name}
          </motion.span>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Componente de partículas (sin cambios - ya está perfecto)
const WeatherParticles: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'rain') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}
          />
        ))}
        <style>{`
          .rain-drop {
            position: absolute;
            top: -10px;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, rgba(100, 149, 237, 0.5), rgba(100, 149, 237, 0));
            animation: rain-fall linear infinite;
          }
          @keyframes rain-fall {
            to { transform: translateY(100vh); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'snow') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="snow-flake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 10}px`
            }}
          >
            ❄
          </div>
        ))}
        <style>{`
          .snow-flake {
            position: absolute;
            top: -20px;
            color: rgba(255, 255, 255, 0.7);
            animation: snow-fall linear infinite;
          }
          @keyframes snow-fall {
            to { transform: translateY(100vh) rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'overcast-flow') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="cloud-drift"
            style={{
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.1 + Math.random() * 0.1
            }}
          />
        ))}
        <style>{`
          .cloud-drift {
            position: absolute;
            left: -200px;
            width: 200px;
            height: 60px;
            background: radial-gradient(ellipse, rgba(169, 169, 169, 0.4), transparent);
            filter: blur(20px);
            animation: cloud-move linear infinite;
          }
          @keyframes cloud-move {
            to { transform: translateX(calc(100vw + 200px)); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'sunny') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sun-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        <style>{`
          .sun-sparkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #D4AF37;
            border-radius: 50%;
            animation: sparkle ease-in-out infinite;
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'storm') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="lightning-flash"
            style={{ animationDelay: `${i * 3}s` }}
          />
        ))}
        <style>{`
          .lightning-flash {
            position: absolute;
            inset: 0;
            background: rgba(138, 43, 226, 0.1);
            animation: flash 9s infinite;
          }
          @keyframes flash {
            0%, 95%, 100% { opacity: 0; }
            96%, 97% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default Hero;