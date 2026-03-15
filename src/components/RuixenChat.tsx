"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon,
  FileUp,
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  Code2,
  Palette,
  Layers,
  Rocket,
  Loader2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

export default function RuixenChat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSend = async (input?: string) => {
    const text = (input ?? message).trim();
    if (!text || loading) return;

    const newHistory: Message[] = [...chatHistory, { role: "user", content: text }];
    setChatHistory(newHistory);
    setMessage("");
    adjustHeight(true);
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are AI AUTOMATION,an elite automation assistant for a luxury automation agency called Ruixen. Your goal is to qualify leads and guide users toward booking a consultation.

STRICT RULES:
1. Your FIRST message must be: "Welcome to AA AUTOMATION. I'm here to help you."
2. Do NOT assist the user until you have their name.
3.Once you have their name, ask for their email address for further interaction and to obtain complete information. If you discuss topics, respond briefly and ask for their email address so you can provide more information via email.
4. After gathering their information, ask about their business and what they want to automate, using their username for a more personalized interaction.
5. Guide the conversation toward a call with the Ruixen team.
6. Keep tone elite, professional, concise. English only.`,
            },
            ...newHistory,
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content ?? "Something went wrong.";
      setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: <Code2 className="w-4 h-4" />, label: "Automate Workflows" },
    { icon: <Rocket className="w-4 h-4" />, label: "Launch AI Agent" },
    { icon: <Layers className="w-4 h-4" />, label: "System Integration" },
    { icon: <Palette className="w-4 h-4" />, label: "Custom Solutions" },
    { icon: <CircleUserRound className="w-4 h-4" />, label: "CRM Automation" },
    { icon: <MonitorIcon className="w-4 h-4" />, label: "Dashboard Setup" },
    { icon: <FileUp className="w-4 h-4" />, label: "Data Migration" },
    { icon: <ImageIcon className="w-4 h-4" />, label: "Content AI" },
  ];

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center bg-[#050505]/80 backdrop-blur-sm"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      {/* Chat or Hero */}
      <div className="relative z-10 flex-1 w-full max-w-3xl flex flex-col overflow-y-auto px-4 pt-10">
        <AnimatePresence>
          {chatHistory.length === 0 ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center flex-1 text-center mt-[20vh]"
            >
              <h1 className="text-5xl font-semibold text-white tracking-tight mb-3">
                AA AUTOMATION
              </h1>
              <p className="text-[#D4AF37] font-light tracking-[0.2em] uppercase text-xs">
                Excellence in Automation
              </p>
            </motion.div>
          ) : (
            <div className="w-full space-y-5 pb-4 mt-4">
              {chatHistory.map((chat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-5 py-4 text-sm font-light leading-relaxed ${
                      chat.role === "user"
                        ? "bg-white/5 border border-white/10 text-white rounded-2xl"
                        : "bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-neutral-200 rounded-2xl"
                    }`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {chat.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl px-5 py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Box */}
      <div className="relative z-10 w-full max-w-3xl px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-2xl rounded-2xl border border-[#D4AF37]/10 shadow-2xl"
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="How can we help you?"
            className="w-full px-5 py-4 bg-transparent text-white text-sm focus:outline-none resize-none min-h-[48px] placeholder:text-neutral-600 font-light"
            style={{ fontFamily: "sans-serif", overflow: "hidden" }}
          />

          <div className="flex items-center justify-between px-4 pb-4 border-t border-[#D4AF37]/5 pt-3">
            <button className="text-neutral-600 hover:text-[#D4AF37] transition-colors">
              <Paperclip size={18} />
            </button>

            <button
              onClick={() => handleSend()}
              disabled={!message.trim() || loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${
                message.trim() && !loading
                  ? "bg-[#D4AF37] text-black hover:scale-105"
                  : "bg-neutral-900 text-neutral-600 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ArrowUpIcon size={14} />
              )}
              Send
            </button>
          </div>
        </motion.div>

        {/* Quick Actions — only when no chat */}
        <AnimatePresence>
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center flex-wrap gap-3 mt-5"
            >
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.label)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-black/50 text-neutral-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all text-xs"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}