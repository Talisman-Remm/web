// searchData.js — Índice de búsqueda completo del sitio AI Automation
// Usado por SearchModal.jsx con Fuse.js

export const searchData = [
  // ── NAVEGACIÓN ──────────────────────────────────────────────────────────
  {
    id: 'nav-solutions',
    title: 'Solutions',
    description: 'Explore our AI services and automation tools',
    content: 'solutions ai services automation neural networks data streams quantum processing',
    category: 'Navigation',
    href: '#solutions',
    section: 'nav',
  },
  {
    id: 'nav-puzzles',
    title: 'Puzzles',
    description: 'Challenge your mind with sophisticated logic problems',
    content: 'puzzles automation logic challenge cognitive',
    category: 'Navigation',
    href: '#puzzles',
    section: 'nav',
  },
  {
    id: 'nav-tools',
    title: 'Tools',
    description: 'Enterprise-grade automation tools at your fingertips',
    content: 'tools suite intelligent enterprise automation',
    category: 'Navigation',
    href: '#tools',
    section: 'nav',
  },
  {
    id: 'nav-about',
    title: 'About',
    description: 'Learn about AI Automation and our mission',
    content: 'about mission ai automation company',
    category: 'Navigation',
    href: '#about',
    section: 'nav',
  },

  // ── HERO ─────────────────────────────────────────────────────────────────
  {
    id: 'hero-main',
    title: 'Master the Logic of Efficiency',
    description: 'Elevate your cognitive prowess through AI-driven automation puzzles. Where precision meets intelligence, and logic transforms into power.',
    content: 'master logic efficiency cognitive AI driven automation puzzles precision intelligence power begin journey',
    category: 'Hero',
    href: '#hero',
    section: 'hero',
  },

  // ── PUZZLES ──────────────────────────────────────────────────────────────
  {
    id: 'puzzle-neural',
    title: 'The Neural Link',
    description: 'Connect autonomous agents through intricate pathways. Optimize data flow across distributed networks.',
    content: 'neural link autonomous agents pathways optimize data flow distributed networks advanced difficulty 12 stages deep learning',
    category: 'Puzzles',
    href: '#puzzles',
    section: 'puzzles',
    meta: 'Difficulty: Advanced · 12 Stages',
  },
  {
    id: 'puzzle-datastream',
    title: 'Data Stream Flow',
    description: 'Master the art of real-time data processing. Balance throughput with precision in dynamic environments.',
    content: 'data stream flow real-time processing throughput precision dynamic environments expert difficulty 18 stages analytics monitoring',
    category: 'Puzzles',
    href: '#puzzles',
    section: 'puzzles',
    meta: 'Difficulty: Expert · 18 Stages',
  },
  {
    id: 'puzzle-quantum',
    title: 'Quantum Sequence',
    description: 'Decode complex algorithmic patterns. Navigate probabilistic decision trees with mathematical elegance.',
    content: 'quantum sequence algorithmic patterns probabilistic decision trees mathematical elegance master difficulty 24 stages computational',
    category: 'Puzzles',
    href: '#puzzles',
    section: 'puzzles',
    meta: 'Difficulty: Master · 24 Stages',
  },

  // ── AI SERVICES (InfiniteMarquee / MegaMenu / ScrollDrivenMarquee) ──────
  {
    id: 'service-neural',
    title: 'Neural Networks',
    description: 'Deep learning pipelines at scale.',
    content: 'neural networks deep learning pipelines scale AI services machine learning training inference',
    category: 'AI Services',
    href: '#puzzles',
    section: 'solutions',
  },
  {
    id: 'service-datastreams',
    title: 'Data Streams',
    description: 'Real-time analytics & monitoring.',
    content: 'data streams real-time analytics monitoring live dashboard metrics performance',
    category: 'AI Services',
    href: '#puzzles',
    section: 'solutions',
  },
  {
    id: 'service-quantum',
    title: 'Quantum Processing',
    description: 'Next-gen computational power.',
    content: 'quantum processing next generation computational power speed performance advanced computing',
    category: 'AI Services',
    href: '#puzzles',
    section: 'solutions',
  },
  {
    id: 'service-automation',
    title: 'AI Automation',
    description: 'End-to-end workflow automation.',
    content: 'AI automation end to end workflow automation business process robotic process rpa enterprise',
    category: 'AI Services',
    href: '#solutions',
    section: 'solutions',
  },

  // ── TOOLS ────────────────────────────────────────────────────────────────
  {
    id: 'tool-roi',
    title: 'ROI Calculator',
    description: 'Measure your automation returns. Calculate monthly savings, time recovered and expected ROI.',
    content: 'ROI calculator return on investment automation savings employees hours weekly rate monthly yearly productivity boost efficiency tasks automated email data entry report generation meeting scheduling customer support invoice social media document classification',
    category: 'Tools',
    href: '#tools',
    section: 'tools',
  },
  {
    id: 'tool-png',
    title: 'PNG Generator',
    description: 'AI-powered image creation. Generate custom PNG assets for your brand instantly.',
    content: 'PNG generator AI powered image creation brand logo assets graphics design instant download',
    category: 'Tools',
    href: '#tools',
    section: 'tools',
  },
  {
    id: 'tool-svg',
    title: 'SVG Converter',
    description: 'Transform assets instantly. Convert and optimize SVG files with precision.',
    content: 'SVG converter transform assets instantly vector graphics convert optimize files code',
    category: 'Tools',
    href: '#tools',
    section: 'tools',
  },
  {
    id: 'tool-trend',
    title: 'Trend Analyzer',
    description: 'Spot market signals early. Analyze crypto and market trends on demand.',
    content: 'trend analyzer crypto market signals early detection charts graphs analytics finance trading bitcoin ethereum',
    category: 'Tools',
    href: '#trends',
    section: 'tools',
  },

  // ── SYSTEM STATUS / TOOLS SUITE ──────────────────────────────────────────
  {
    id: 'tools-suite',
    title: 'Intelligent Tools Suite',
    description: 'Enterprise-grade automation at your fingertips. Neural Processing Engine, Performance Analytics, Distributed Computing.',
    content: 'intelligent tools suite enterprise automation neural processing engine performance analytics distributed computing load balance efficiency uptime active processes tasks completed verified realtime instant',
    category: 'Tools',
    href: '#tools',
    section: 'tools',
  },

  // ── CHANGELOG ────────────────────────────────────────────────────────────
  {
    id: 'changelog',
    title: 'Changelog',
    description: 'System update history. Track the latest improvements and new features released.',
    content: 'changelog updates history releases improvements new features version system log',
    category: 'System',
    href: '#changelog',
    section: 'changelog',
  },

  // ── CONTACT ──────────────────────────────────────────────────────────────
  {
    id: 'contact',
    title: 'Contact & Book a Demo',
    description: 'Get in touch with our team. Ready to automate your workflow? Book a demo and unlock your savings.',
    content: 'contact form book demo get started schedule meeting team reach out automate workflow savings enterprise',
    category: 'Contact',
    href: '#contact',
    section: 'contact',
  },

  // ── ROI — TAREAS AUTOMATIZABLES ──────────────────────────────────────────
  {
    id: 'roi-tasks',
    title: 'Automatable Business Tasks',
    description: 'Email filtering, data entry, report generation, meeting scheduling, customer support, invoice processing, social media posting, document classification.',
    content: 'automatable tasks email filtering responses data entry processing report generation meeting scheduling customer support tickets invoice processing social media posting document classification workflow repetitive business process',
    category: 'Tools',
    href: '#tools',
    section: 'tools',
  },
];