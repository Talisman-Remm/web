import React, { useState } from 'react';
import { supabase } from '/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [esRegistro, setEsRegistro] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensajeError('');
    setMensajeExito(false);

    if (esRegistro) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) {
        setMensajeError(error.message.toUpperCase());
      } else {
        setMensajeExito(true);
        setEmail('');
        setPassword('');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMensajeError('INCORRECT CREDENTIALS OR UNVERIFIED ACCOUNT');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-white font-['Inter']">
      {/* FONDO ANIMADO */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* LOGO */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-10"
        >
          <div className="w-12 h-12 mx-auto mb-4">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d="M8 44L16 20H20L28 44H24L22.2 38H13.8L12 44H8ZM14.8 34H21.2L18 24L14.8 34Z"
                fill="#D4AF37"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                d="M28 44L36 20H40L48 44H44L42.2 38H33.8L32 44H28ZM34.8 34H41.2L38 24L34.8 34Z"
                fill="#D4AF37"
              />
            </svg>
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#D4AF37] tracking-wide uppercase">
            AI Automation
          </h1>
          <p className="text-gray-500 mt-2 font-light tracking-widest text-xs uppercase">Elite Access Only</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleAuth}
          className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#D4AF37]/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* TABS */}
          <div className="flex mb-10 border-b border-[#D4AF37]/10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`flex-1 pb-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                !esRegistro ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-600'
              }`}
              onClick={() => {
                setEsRegistro(false);
                setMensajeError('');
                setMensajeExito(false);
              }}
            >
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`flex-1 pb-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                esRegistro ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-600'
              }`}
              onClick={() => {
                setEsRegistro(true);
                setMensajeError('');
                setMensajeExito(false);
              }}
            >
              Register
            </motion.button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 mb-2 font-semibold">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                type="email"
                required
                value={email}
                className="w-full bg-[#050505] border border-[#D4AF37]/10 p-4 text-white text-sm focus:outline-none transition-all"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMensajeError('');
                  setMensajeExito(false);
                }}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 mb-2 font-semibold">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: '#D4AF37' }}
                type="password"
                required
                value={password}
                className="w-full bg-[#050505] border border-[#D4AF37]/10 p-4 text-white text-sm focus:outline-none transition-all"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMensajeError('');
                  setMensajeExito(false);
                }}
              />
            </div>

            {/* MENSAJES */}
            <div className="min-h-[30px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {mensajeError && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-red-500 text-[10px] uppercase tracking-widest text-center animate-pulse"
                  >
                    {mensajeError}
                  </motion.p>
                )}
                {mensajeExito && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 py-2"
                  >
                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] text-center font-semibold">
                      CONFIRMATION SENT. CHECK YOUR EMAIL.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#F4E4A6' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#050505] font-bold py-4 tracking-[0.3em] uppercase text-xs transition-all duration-500 shadow-[0_10px_20px_rgba(212,175,55,0.1)] disabled:opacity-50"
            >
              {loading ? 'Procesando...' : esRegistro ? 'Create Account' : 'Log in'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}