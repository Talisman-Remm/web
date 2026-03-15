import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '/lib/supabase';

type ChangelogEntry = {
  id: string;
  title: string;
  description: string;
  type: string;
  created_at: string;
  tags: string;
};

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  feature:         { label: 'Feature',         color: 'text-emerald-400',  bg: 'bg-emerald-400/10 border-emerald-400/30' },
  improvement:     { label: 'Improvement',     color: 'text-blue-400',     bg: 'bg-blue-400/10 border-blue-400/30' },
  fix:             { label: 'Fix',             color: 'text-red-400',      bg: 'bg-red-400/10 border-red-400/30' },
  announcement:    { label: 'Announcement',    color: 'text-purple-400',   bg: 'bg-purple-400/10 border-purple-400/30' },
  new_integration: { label: 'New Integration', color: 'text-[#D4AF37]',    bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/30' },
  deprecation:     { label: 'Deprecation',     color: 'text-orange-400',   bg: 'bg-orange-400/10 border-orange-400/30' },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// Animaciones alternas igual que Puzzles
const cardVariants = [fadeInLeft, fadeInUp, fadeInRight];

export default function Changelog() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [newEntryId, setNewEntryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase
        .from('changelog')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setEntries(data);
    };

    fetchEntries();

    const channel = supabase
      .channel('changelog-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'changelog' },
        (payload) => {
          const newEntry = payload.new as ChangelogEntry;
          setEntries((prev) => [newEntry, ...prev]);
          setNewEntryId(newEntry.id);
          setTimeout(() => setNewEntryId(null), 3000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

const timeAgo = (dateStr: string) => {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};

  return (
    <section id="changelog" className="py-20 px-6 bg-gradient-to-b from-transparent to-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="font-['Playfair_Display'] text-5xl font-bold text-center mb-4 text-[#D4AF37]"
        >
          Changelog
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
          }}
          className="font-['Inter'] text-gray-400 text-center mb-6 text-lg font-light"
        >
          Live updates
        </motion.p>

        {/* Live indicator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInRight}
          className="flex items-center justify-end mb-12"
        >
          <span className="flex items-center space-x-2 text-xs font-['Inter'] text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Listening for updates</span>
          </span>
        </motion.div>

        {/* Grid de cards */}
        <AnimatePresence>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {entries.map((entry, index) => {
              const type = typeConfig[entry.type] ?? {
                label: entry.type,
                color: 'text-gray-400',
                bg: 'bg-gray-400/10 border-gray-400/30',
              };
              const isNew = entry.id === newEntryId;
              const variant = cardVariants[index % 3];

              return (
                <motion.div
                  key={entry.id}
                  layout
                  variants={variant}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative bg-gradient-to-b from-[#0F0F0F] to-[#050505] border p-8 h-full transition-all duration-500 ${
                    isNew
                      ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                      : 'border-[#D4AF37]/20'
                  }`}
                >
                  {/* Glow hover — igual que Puzzles */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badge "Just added" */}
                  {isNew && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 text-xs font-['Inter'] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1"
                    >
                      Just added ✦
                    </motion.span>
                  )}

                  <div className="relative z-10 flex flex-col h-full">

                    {/* Type badge + fecha */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className={`text-xs font-['Inter'] font-semibold px-3 py-1 border ${type.bg} ${type.color}`}>
                        {type.label}
                      </span>
                      <div className="flex flex-col">
                      <span className="font-['Inter'] text-xs text-gray-500">
                        {formatDate(entry.created_at)}
                      </span>
                      <span className="font-['Inter'] text-xs text-gray-600 italic">
                        {timeAgo(entry.created_at)}
                      </span>
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3 text-[#D4AF37]">
                      {entry.title}
                    </h3>

                    {/* Descripción */}
                    <p className="font-['Inter'] text-gray-400 leading-relaxed mb-6 flex-grow">
                      {entry.description}
                    </p>

                    {/* Tags */}
                    {entry.tags && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {entry.tags.split(',').map((tag) => (
                          <span
                            key={tag.trim()}
                            className="font-['Inter'] text-xs text-gray-500 bg-white/5 border border-white/10 px-2 py-1"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}