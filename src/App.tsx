import { Cpu, Zap, Network, Activity, TrendingUp, CheckCircle, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomChat } from './components/CustomChat';
import './i18n';
import { TrendAnalyzer } from './components/TrendAnalyzer';
import ContactForm from './components/ContactForm';
import ScrollVideo from './components/ScrollVideo';
import Registro from './components/Registro';
import { supabase } from '/lib/supabase';
import Hero from './components/Hero';
import { FlipCard } from './components/FlipCard';
import ROICalculator from './components/ROICalculator';
import PNGGenerator from './components/PNGGenerator';
import SVGConverter from './components/SVGConverter';
import { ImageIcon, FileCode } from 'lucide-react';
import { Loader } from './components/Loader';
import MakeChatPanel from './components/MakeChatPanel'; // Ajusta la ruta si es necesario
import SideNav from './components/SideNav';
import MegaMenu from './components/MegaMenu';
import Changelog from './components/Changelog';
import InfiniteMarquee from './components/InfiniteMarquee';
import ScrollDrivenMarquee from './components/ScrollDrivenMarquee';
import SearchModal from './components/SearchModal';
import { seedEmbeddings } from './components/seedEmbeddings';
import AnimatedServices from "./components/AnimatedServices";
import RuixenMoonChat from './components/RuixenChat';
import AutomationQuoter from './components/AutomationQuoter';

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'ru')) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      navigate('/en', { replace: true });
    }
  }, [lang, i18n, navigate]);
  
  return <>{children}</>;
};

function App() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const [isRealTimeActive, setIsRealTimeActive] = React.useState(false);
  const [isPngModeActive, setIsPngModeActive] = React.useState(false);
  const [isSvgModeActive, setIsSvgModeActive] = React.useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isMarqueeOpen, setIsMarqueeOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const handleSearchShortcut = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };
  window.addEventListener('keydown', handleSearchShortcut);
  return () => window.removeEventListener('keydown', handleSearchShortcut);
}, []);

  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const refKey = urlParams.get('ref') || 'default';
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const changeLanguage = (langCode: string) => {
    window.location.href = `/${langCode}${window.location.search}`;
    setIsLanguageMenuOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];
  
  const getHeroContent = () => {
    const validRefs = ['default', 'google', 'linkedin', 'facebook', 'youtube', 'newsletter', 'jointherealworld'];
    const ref = validRefs.includes(refKey) ? refKey : 'default';
    return {
      title: t(`hero.${ref}.title`),
      subtitle: t(`hero.${ref}.subtitle`)
    };
  };

  const heroContent = getHeroContent();
  const opacity = Math.max(0, 1 - scrollY / 400);

  const handleLoaderComplete = () => {
    setLoaderComplete(true);
    setTimeout(() => setShowLoader(false), 800);
  };

  // 🎬 VARIANTES DE ANIMACIÓN MEJORADAS
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Loader inicial */}
      <AnimatePresence>
        {showLoader && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaderComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-[#050505] text-white"
      >
        <SideNav />
        {/* NAVBAR con animación mejorada */}
<motion.nav
  key={loaderComplete ? "active-nav" : "waiting-nav"} // ESTA ES LA CLAVE
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#D4AF37]/10"
>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 44L16 20H20L28 44H24L22.2 38H13.8L12 44H8ZM14.8 34H21.2L18 24L14.8 34Z" fill="#D4AF37"/>
                  <path d="M28 44L36 20H40L48 44H44L42.2 38H33.8L32 44H28ZM34.8 34H41.2L38 24L34.8 34Z" fill="#D4AF37"/>
                </svg>
              </div>
              <span className="text-[#D4AF37] font-['Playfair_Display'] text-xl font-semibold tracking-wide">
                AI Automation
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 font-['Inter']">
            {['solutions', 'puzzles', 'tools', 'quoter', 'about'].map((item, idx) => (
              item === 'solutions' ? (
                <MegaMenu key="solutions" />
              ) : (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                  whileHover={{ y: -3, color: '#D4AF37' }}
                  className="text-gray-300 transition-colors text-sm font-light"
                  >
                    {t(`nav.${item}`)}
                  </motion.a>
                )
              ))}

              <button 
                onClick={() => setIsChatOpen(true)}
                className="font-['Playfair_Display'] text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Consulting IA
              </button>

              {/* Botón de búsqueda */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                title="Search (⌘K)"
                className="flex items-center gap-2 px-3 py-2 border border-[#D4AF37]/20 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                <span className="font-['Inter'] text-xs text-gray-600 hidden lg:inline border border-gray-700 px-1.5 py-0.5">⌘K</span>
              </motion.button>
              
              {/* Selector de Idioma */}
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="px-4 py-2 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm font-medium flex items-center space-x-2"
                >
                  <span>{currentLanguage.flag}</span>
                  <span>{currentLanguage.code.toUpperCase()}</span>
                  <motion.svg 
                    animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsLanguageMenuOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 bg-[#0F0F0F] border border-[#D4AF37]/20 min-w-[180px] z-50 shadow-lg overflow-hidden"
                      >
                        {languages.map((language, idx) => (
                          <motion.button
                            key={language.code}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', x: 5 }}
                            onClick={() => changeLanguage(language.code)}
                            className={`w-full px-4 py-3 text-left transition-all flex items-center space-x-3 ${
                              i18n.language === language.code ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-300'
                            }`}
                          >
                            <span className="text-xl">{language.flag}</span>
                            <span className="text-sm font-medium">{language.name}</span>
                            {i18n.language === language.code && (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.span>
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMarqueeOpen(!isMarqueeOpen)}
                className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 text-sm font-light font-['Inter'] flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Solutions</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: '#D4AF37', 
                  color: '#050505',
                  boxShadow: '0 0 20px rgba(212,175,55,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] transition-all duration-300 text-sm font-medium"
              >
                <a href="#contact">
                  {t('nav.getStarted')}
                </a>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isMarqueeOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-40"
                onClick={() => setIsMarqueeOpen(false)}
              />
        
              {/* Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="fixed top-[72px] left-0 right-0 z-50 bg-[#050505] border-b border-[#D4AF37]/20"
              >
                <InfiniteMarquee />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div id="hero">
          <Hero refKey={refKey} opacity={opacity} loaderComplete={loaderComplete}/>
        </div>
        <ScrollVideo />
        <ScrollDrivenMarquee />
        {/* CTA Button con animación mejorada */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: '0 0 60px rgba(212,175,55,0.6)',
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-10 py-4 bg-[#D4AF37] text-[#050505] font-['Inter'] font-semibold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            {t('hero.default.cta')}
          </motion.button>
        </motion.div>

        <div id="trends">
          <TrendAnalyzer />
        </div>

        {/* ========================================
            SECCIÓN PUZZLES - CON ANIMACIONES LATERALES
        ======================================== */}
        <section id="puzzles" className="py-20 px-6 bg-gradient-to-b from-transparent to-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            {/* Título desde arriba con fade */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="font-['Playfair_Display'] text-5xl font-bold text-center mb-4 text-[#D4AF37]"
            >
              {t('puzzles.title')}
            </motion.h2>

            {/* Subtítulo con delay */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 }
                }
              }}
              className="font-['Inter'] text-gray-400 text-center mb-16 text-lg font-light"
            >
              {t('puzzles.subtitle')}
            </motion.p>

            {/* Grid de cards - cada una desde un lado diferente */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
              style={{ minHeight: '500px' }}
            >
              {/* Card 1: desde la IZQUIERDA */}
              <motion.div variants={fadeInLeft}>
                <FlipCard
                  className="min-h-[450px]"
                  frontContent={
                    <div className="group relative bg-gradient-to-b from-[#0F0F0F] to-[#050505] border border-[#D4AF37]/20 p-8 h-full transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 bg-[#D4AF37]/10 flex items-center justify-center">
                          <Network className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          {t('puzzles.neural.title')}
                        </h3>
                        <p className="font-['Inter'] text-gray-400 mb-6 leading-relaxed">
                          {t('puzzles.neural.description')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="font-['Inter'] text-[#D4AF37] font-medium">
                            {t('puzzles.neural.difficulty')}
                          </span>
                          <span className="font-['Inter'] text-gray-500">
                            {t('puzzles.neural.stages')}
                          </span>
                        </div>
                        <div className="mt-6 text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to learn more →</span>
                        </div>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="bg-gradient-to-b from-[#D4AF37]/10 to-[#050505] border border-[#D4AF37] p-8 h-full">
                      <div className="relative z-10 h-full flex flex-col">
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          Technical Details
                        </h3>
                        <ul className="font-['Inter'] text-gray-300 space-y-3 mb-6 flex-grow">
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Real-time processing</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Deep learning algorithms</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Automatic optimization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Unlimited scalability</span>
                          </li>
                        </ul>
                        <div className="mt-auto text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to go back ←</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>

              {/* Card 2: desde ABAJO (centro) */}
              <motion.div variants={fadeInUp}>
                <FlipCard
                  className="min-h-[450px]"
                  frontContent={
                    <div className="group relative bg-gradient-to-b from-[#0F0F0F] to-[#050505] border border-[#D4AF37]/20 p-8 h-full transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 bg-[#D4AF37]/10 flex items-center justify-center">
                          <Activity className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          {t('puzzles.dataStream.title')}
                        </h3>
                        <p className="font-['Inter'] text-gray-400 mb-6 leading-relaxed">
                          {t('puzzles.dataStream.description')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="font-['Inter'] text-[#D4AF37] font-medium">
                            {t('puzzles.dataStream.difficulty')}
                          </span>
                          <span className="font-['Inter'] text-gray-500">
                            {t('puzzles.dataStream.stages')}
                          </span>
                        </div>
                        <div className="mt-6 text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to learn more →</span>
                        </div>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="bg-gradient-to-b from-[#D4AF37]/10 to-[#050505] border border-[#D4AF37] p-8 h-full">
                      <div className="relative z-10 h-full flex flex-col">
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          Key Features
                        </h3>
                        <ul className="font-['Inter'] text-gray-300 space-y-3 mb-6 flex-grow">
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Advanced predictive analytics</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Live data visualization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Smart alerts & notifications</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Multi-platform integration</span>
                          </li>
                        </ul>
                        <div className="mt-auto text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to go back ←</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>

              {/* Card 3: desde la DERECHA */}
              <motion.div variants={fadeInRight}>
                <FlipCard
                  className="min-h-[450px]"
                  frontContent={
                    <div className="group relative bg-gradient-to-b from-[#0F0F0F] to-[#050505] border border-[#D4AF37]/20 p-8 h-full transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 bg-[#D4AF37]/10 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          {t('puzzles.quantum.title')}
                        </h3>
                        <p className="font-['Inter'] text-gray-400 mb-6 leading-relaxed">
                          {t('puzzles.quantum.description')}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="font-['Inter'] text-[#D4AF37] font-medium">
                            {t('puzzles.quantum.difficulty')}
                          </span>
                          <span className="font-['Inter'] text-gray-500">
                            {t('puzzles.quantum.stages')}
                          </span>
                        </div>
                        <div className="mt-6 text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to learn more →</span>
                        </div>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="bg-gradient-to-b from-[#D4AF37]/10 to-[#050505] border border-[#D4AF37] p-8 h-full">
                      <div className="relative z-10 h-full flex flex-col">
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          Quantum Technology
                        </h3>
                        <ul className="font-['Inter'] text-gray-300 space-y-3 mb-6 flex-grow">
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Ultra-fast processing power</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Next-gen cryptography</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Complex optimization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#D4AF37] mr-2">•</span>
                            <span>Advanced simulations</span>
                          </li>
                        </ul>
                        <div className="mt-auto text-center">
                          <span className="font-['Inter'] text-xs text-[#D4AF37]/60">Click to go back ←</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AnimatedServices />
        
        <div id="changelog">
          <Changelog />
        </div>
                
        {/* ========================================
            SECCIÓN TOOLS - CON CONTENEDOR ANIMADO
        ======================================== */}
        <section id="tools" className="py-20 px-6 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            {/* Título desde la izquierda */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
              className="font-['Playfair_Display'] text-5xl font-bold text-center mb-4 text-[#D4AF37]"
            >
              {t('tools.title')}
            </motion.h2>

            {/* Subtítulo desde la derecha */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="font-['Inter'] text-gray-400 text-center mb-16 text-lg font-light"
            >
              {t('tools.subtitle')}
            </motion.p>

            {/* Contenedor principal con escala */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="bg-gradient-to-br from-[#0F0F0F] to-[#050505] border border-[#D4AF37]/20 p-10"
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Columna izquierda - Barras (puedes agregar contenido aquí) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Aquí van tus barras de Neural, Analytics, etc. si las tienes */}
                </motion.div>

                {/* Columna derecha - Herramientas dinámicas */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {isRealTimeActive ? (
                      <motion.div
                        key="roi"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ROICalculator />
                      </motion.div>
                    ) : isPngModeActive ? (
                      <motion.div
                        key="png"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <PNGGenerator />
                      </motion.div>
                    ) : isSvgModeActive ? (
                      <motion.div
                        key="svg"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <SVGConverter />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-6"
                      >
                        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4 text-[#D4AF37]">
                          {t('tools.systemStatus.title')}
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-gray-400">{t('tools.systemStatus.activeProcesses')}</span>
                            <span className="font-['Inter'] text-[#D4AF37] font-semibold">2,847</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Grid de badges con stagger */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-4 gap-4"
                  >
                    <motion.div
                      variants={scaleIn}
                      whileHover={{ scale: 1.1, borderColor: '#D4AF37', y: -5 }}
                      className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-4 text-center transition-all cursor-pointer"
                    >
                      <CheckCircle className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                      <span className="font-['Inter'] text-xs text-gray-500">{t('tools.badges.verified')}</span>
                    </motion.div>

                    <motion.button
                      variants={scaleIn}
                      whileHover={{ scale: 1.1, borderColor: '#D4AF37', y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                      className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-4 text-center transition-all cursor-pointer"
                    >
                      <Activity className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                      <span className="font-['Inter'] text-xs text-gray-500">{t('tools.badges.realtime')}</span>
                    </motion.button>

                    <motion.button
                      variants={scaleIn}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsPngModeActive(!isPngModeActive);
                        setIsSvgModeActive(false);
                        setIsRealTimeActive(false);
                      }}
                      className={`bg-[#0A0A0A] border p-4 text-center transition-all cursor-pointer ${
                        isPngModeActive ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/10'
                      }`}
                    >
                      <ImageIcon className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                      <span className="font-['Inter'] text-xs text-gray-500">PNG</span>
                    </motion.button>

                    <motion.button
                      variants={scaleIn}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsSvgModeActive(!isSvgModeActive);
                        setIsPngModeActive(false);
                        setIsRealTimeActive(false);
                      }}
                      className={`bg-[#0A0A0A] border p-4 text-center transition-all cursor-pointer ${
                        isSvgModeActive ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/10'
                      }`}
                    >
                      <FileCode className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                      <span className="font-['Inter'] text-xs text-gray-500">SVG</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================
            SECCIÓN QUOTER
        ======================================== */}
        <section id="quoter" className="py-20 px-6 bg-[#050505]">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="font-['Playfair_Display'] text-5xl font-bold text-center mb-4 text-[#D4AF37]"
            >
              {t('nav.quoter')}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <AutomationQuoter />
            </motion.div>
          </div>
        </section>

        <div id="contact">
          <ContactForm />
        </div>
        <CustomChat />
        <MakeChatPanel />

        {/* Footer con fade */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-12 px-6 border-t border-[#D4AF37]/10"
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-['Inter'] text-gray-500 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </motion.footer>
      </motion.div>
      {import.meta.env.DEV && (
  <button
    onClick={seedEmbeddings}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      background: '#D4AF37',
      color: '#050505',
      padding: '10px 20px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Seed Embeddings
  </button>
)}

{isChatOpen && (
  <div className="fixed inset-0 z-[999]">
    <button 
      onClick={() => setIsChatOpen(false)}
      className="absolute top-5 right-5 z-[1000] text-white/70 hover:text-[#D4AF37] text-2xl"
    >
      ✕
    </button>
    <RuixenMoonChat />
  </div>
)}
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export { App, LanguageWrapper };