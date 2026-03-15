import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Brain, GitMerge, ChevronRight, Mail, Building2, User, CheckCircle2, Loader2 } from 'lucide-react';

// ─── PRICING CONFIG ───────────────────────────────────────────────────────────
const AUTOMATION_TYPES = [
  {
    id: 'rpa',
    icon: Zap,
    label: 'RPA',
    sublabel: 'Internal Processes',
    basePrice: 500,
    description: 'Automate repetitive tasks in your current systems',
  },
  {
    id: 'integration',
    icon: GitMerge,
    label: 'Integration',
    sublabel: 'Between Apps',
    basePrice: 1200,
    description: 'Connect your tools and eliminate manual work',
  },
  {
    id: 'chatbot',
    icon: Bot,
    label: 'Chatbot',
    sublabel: 'Conversational AI',
    basePrice: 2500,
    description: 'Intelligent assistants for customers and teams',
  },
  {
    id: 'ai',
    icon: Brain,
    label: 'Advanced AI',
    sublabel: 'Automated Decisions',
    basePrice: 5000,
    description: 'Models that learn and decide for your business',
  },
];

const COMPLEXITY_MULTIPLIERS = {
  basic: { label: 'Basic', desc: 'Linear flow, no conditions', multiplier: 1 },
  intermediate: { label: 'Intermediate', desc: 'Conditional logic, multiple systems', multiplier: 1.5 },
  advanced: { label: 'Advanced', desc: 'AI, complex integrations, high volume', multiplier: 2.5 },
};

const TYPE_QUESTIONS = {
  rpa: [
    {
      id: 'processes',
      label: 'How many processes do you want to automate?',
      options: ['1 – 3 processes', '4 – 10 processes', '11 or more processes'],
      multipliers: [1, 1.3, 1.8],
    },
    {
      id: 'systems',
      label: 'What systems are involved?',
      options: ['Excel / Office only', 'Existing ERP / CRM', 'Custom-built systems'],
      multipliers: [1, 1.2, 1.5],
    },
  ],
  integration: [
    {
      id: 'apps',
      label: 'How many apps do you need to connect?',
      options: ['2 apps', '3 – 5 apps', 'More than 5 apps'],
      multipliers: [1, 1.4, 2],
    },
    {
      id: 'api',
      label: 'Do the apps have an available API?',
      options: ['Yes, all have an API', 'Some have an API', "I don't know / None"],
      multipliers: [1, 1.3, 1.7],
    },
  ],
  chatbot: [
    {
      id: 'channel',
      label: 'What channel will the chatbot live on?',
      options: ['Website', 'WhatsApp / Telegram', 'Multiple channels'],
      multipliers: [1, 1.2, 1.6],
    },
    {
      id: 'languages',
      label: 'How many languages must it handle?',
      options: ['1 language', '2 languages', '3 or more languages'],
      multipliers: [1, 1.3, 1.7],
    },
  ],
  ai: [
    {
      id: 'decisions',
      label: 'What type of decisions will it automate?',
      options: ['Classification / filtering', 'Predictions and alerts', 'Real-time decisions'],
      multipliers: [1, 1.5, 2.2],
    },
    {
      id: 'volume',
      label: 'What is the monthly data volume?',
      options: ['Less than 10K records', '10K – 100K records', 'More than 100K records'],
      multipliers: [1, 1.4, 2],
    },
  ],
};

const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35 },
};

const StepLabel = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-7 h-7 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
      {number}
    </span>
    <span className="font-['Playfair_Display'] text-[#D4AF37] text-lg">{title}</span>
  </div>
);

const OptionButton = ({ label, selected, onClick, desc }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`w-full text-left p-4 border transition-all duration-200 ${
      selected
        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
        : 'border-[#D4AF37]/20 bg-[#1A1A1A] text-white/70 hover:border-[#D4AF37]/50 hover:text-white'
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      {selected && <CheckCircle2 size={16} className="text-[#D4AF37]" />}
    </div>
    {desc && <p className="text-xs text-white/40 mt-1">{desc}</p>}
  </motion.button>
);

const AutomationQuoter = () => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [typeAnswers, setTypeAnswers] = useState({});
  const [complexity, setComplexity] = useState(null);
  const [contact, setContact] = useState({ name: '', company: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const typeConfig = selectedType ? AUTOMATION_TYPES.find((t) => t.id === selectedType) : null;
  const typeQuestions = selectedType ? TYPE_QUESTIONS[selectedType] : [];
  const totalSteps = 1 + typeQuestions.length + 2;

  const isTypeStep = step === 0;
  const isTypeQuestionStep = step >= 1 && step <= typeQuestions.length;
  const isComplexityStep = step === totalSteps - 2;
  const isContactStep = step === totalSteps - 1;

  const calcPrice = () => {
    if (!typeConfig) return 0;
    let price = typeConfig.basePrice;
    typeQuestions.forEach((q) => {
      const idx = typeAnswers[q.id];
      if (idx !== undefined) price *= q.multipliers[idx];
    });
    if (complexity) price *= COMPLEXITY_MULTIPLIERS[complexity].multiplier;
    return Math.round(price);
  };

  const handleTypeSelect = (id) => {
    setSelectedType(id);
    setTypeAnswers({});
    setComplexity(null);
    setTimeout(() => setStep(1), 200);
  };

  const handleTypeAnswer = (questionId, idx) => {
    setTypeAnswers((prev) => ({ ...prev, [questionId]: idx }));
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const handleComplexity = (key) => {
    setComplexity(key);
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedType(null);
    setTypeAnswers({});
    setComplexity(null);
    setContact({ name: '', company: '', email: '' });
    setSubmitted(false);
  };

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border border-[#D4AF37]/10 p-6 md:p-8 max-w-2xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-['Playfair_Display'] text-3xl font-semibold text-[#D4AF37]"
        >
          Quote Your Automation
        </motion.h2>
        <p className="text-white/40 text-sm mt-1">Answer step by step and get your estimate instantly.</p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-px bg-[#D4AF37]/10">
        <motion.div
          className="h-px bg-[#D4AF37]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">

        {/* STEP 0: Type selection */}
        {isTypeStep && (
          <motion.div key="step-type" {...fadeUp}>
            <StepLabel number="1" title="What type of automation do you need?" />
            <div className="grid grid-cols-2 gap-3">
              {AUTOMATION_TYPES.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedType === t.id;
                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleTypeSelect(t.id)}
                    className={`p-5 border text-left transition-all duration-200 space-y-2 ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#D4AF37]/20 bg-[#1A1A1A] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <Icon size={22} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-white font-semibold text-sm">{t.label}</p>
                      <p className="text-white/40 text-xs">{t.sublabel}</p>
                    </div>
                    <p className="text-white/30 text-xs leading-snug">{t.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEPS 1–N: Type-specific questions */}
        {isTypeQuestionStep && (() => {
          const q = typeQuestions[step - 1];
          if (!q) return null;
          return (
            <motion.div key={`step-q-${q.id}`} {...fadeUp}>
              <StepLabel number={step + 1} title={q.label} />
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <OptionButton
                    key={idx}
                    label={opt}
                    selected={typeAnswers[q.id] === idx}
                    onClick={() => handleTypeAnswer(q.id, idx)}
                  />
                ))}
              </div>
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-4 text-xs text-white/30 hover:text-[#D4AF37] transition-colors"
              >
                ← Back
              </button>
            </motion.div>
          );
        })()}

        {/* Complexity step */}
        {isComplexityStep && (
          <motion.div key="step-complexity" {...fadeUp}>
            <StepLabel number={step + 1} title="What is the technical complexity level?" />
            <div className="space-y-2">
              {Object.entries(COMPLEXITY_MULTIPLIERS).map(([key, val]) => (
                <OptionButton
                  key={key}
                  label={val.label}
                  desc={val.desc}
                  selected={complexity === key}
                  onClick={() => handleComplexity(key)}
                />
              ))}
            </div>
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-xs text-white/30 hover:text-[#D4AF37] transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Contact step */}
        {isContactStep && !submitted && (
          <motion.div key="step-contact" {...fadeUp}>
            <div className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 mb-6 flex items-center justify-between">
              <span className="text-white/50 text-sm">Calculated estimate</span>
              <span className="font-['Playfair_Display'] text-2xl text-[#D4AF37]">
                {formatPrice(calcPrice())}
              </span>
            </div>

            <StepLabel number={step + 1} title="Who should we send the quote to?" />
            <div className="space-y-3">
              {[
                { icon: User, key: 'name', placeholder: 'Your name', type: 'text' },
                { icon: Building2, key: 'company', placeholder: 'Company (optional)', type: 'text' },
                { icon: Mail, key: 'email', placeholder: 'Email address', type: 'email' },
              ].map(({ icon: Icon, key, placeholder, type }) => (
                <div key={key} className="relative">
                  <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" />
                  <motion.input
                    whileFocus={{ borderColor: '#D4AF37' }}
                    type={type}
                    placeholder={placeholder}
                    value={contact[key]}
                    onChange={(e) => setContact((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 pl-9 pr-4 py-3 text-white text-sm placeholder-white/30 outline-none transition-all focus:border-[#D4AF37]"
                  />
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#F4E4A6' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={sending || !contact.name || !contact.email}
              className="mt-5 w-full bg-[#D4AF37] text-[#050505] py-3 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={18} />}
              {sending ? 'Sending...' : 'See my full quote'}
            </motion.button>

            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-3 w-full text-xs text-white/30 hover:text-[#D4AF37] transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Success */}
        {submitted && (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-5 py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle2 size={48} className="text-[#D4AF37] mx-auto" />
            </motion.div>

            <div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#D4AF37]">Quote Sent!</h3>
              <p className="text-white/40 text-sm mt-1">Check your email — you'll receive the details shortly.</p>
            </div>

            <div className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5 space-y-1">
              <p className="text-white/40 text-xs uppercase tracking-widest">Your estimate</p>
              <p className="font-['Playfair_Display'] text-4xl text-[#D4AF37]">{formatPrice(calcPrice())}</p>
              <p className="text-white/30 text-xs">
                {typeConfig?.label} · {COMPLEXITY_MULTIPLIERS[complexity]?.label}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReset}
              className="w-full border border-[#D4AF37]/30 text-[#D4AF37] py-2 text-sm hover:bg-[#D4AF37]/10 transition-all"
            >
              Calculate another automation
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

export default AutomationQuoter;