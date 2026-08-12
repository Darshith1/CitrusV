"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User, AlertCircle } from "lucide-react";

type Message = { id: string; role: "user" | "assistant"; content: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function CitrusAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Citrus AI — ask me about CitrusV services, tech ideas, or anything work-related. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setApiError(null);
    const userMsg: Message = { id: uid(), role: "user", content: text };
    const history = [...messages.filter((m) => m.id !== "welcome"), userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);
    setTyping(true);

    const assistantId = uid();
    let assistantText = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (res.status === 503) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setApiError(
          data.error ??
            "Citrus AI is not configured yet. Add OPENAI_API_KEY on the server to enable chat.",
        );
        setTyping(false);
        setStreaming(false);
        return;
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setApiError(data.error ?? `Something went wrong (${res.status}). Try again later.`);
        setTyping(false);
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setApiError("Streaming is unavailable in this browser.");
        setTyping(false);
        setStreaming(false);
        return;
      }

      setTyping(false);
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        const chunk = assistantText;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: chunk } : m)),
        );
      }
    } catch {
      setApiError("Network error — check your connection and try again.");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setTyping(false);
      setStreaming(false);
    }
  }, [input, messages, streaming]);

  return (
    <div className="relative flex min-h-[calc(100dvh-8rem)] flex-col bg-gradient-to-b from-surface via-white to-surface dark:from-navy-dark dark:via-navy dark:to-navy-dark">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute -right-24 bottom-32 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
      </div>

      <div className="container-citrus relative flex flex-1 flex-col py-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/80 px-4 py-1.5 text-sm font-medium text-navy shadow-sm backdrop-blur dark:bg-navy-light/80 dark:text-slate-100"
          >
            <Sparkles className="h-4 w-4 text-brand-orange" aria-hidden />
            Citrus AI
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl font-bold tracking-tight text-navy dark:text-slate-50 md:text-4xl"
          >
            Your <span className="text-gradient">Citrus</span> copilot
          </motion.h1>
          <p className="mx-auto mt-2 max-w-lg text-muted">
            Friendly answers powered by CitrusV — not a substitute for professional advice.
          </p>
        </header>

        <div
          role="status"
          className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            AI can make mistakes. Verify important information. Do not share passwords or
            sensitive personal data.
          </p>
        </div>

        <AnimatePresence>
          {apiError ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-500/40 dark:bg-red-950/50 dark:text-red-100"
            >
              {apiError}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          ref={listRef}
          className="glass-panel mb-4 flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl shadow-lg md:min-h-[360px]"
        >
          <ul className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 md:p-6" aria-live="polite">
            {messages.map((msg, i) => (
              <motion.li
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 28, delay: i * 0.02 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-brand-blue text-white"
                      : "bg-navy text-white dark:bg-brand-blue"
                  }`}
                  aria-hidden
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <motion.div
                  layout
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:max-w-[75%] md:text-base ${
                    msg.role === "user"
                      ? "rounded-tr-md bg-brand-blue text-white"
                      : "rounded-tl-md border border-[var(--border-subtle)] bg-white text-navy dark:bg-navy-light dark:text-slate-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content || "…"}</p>
                </motion.div>
              </motion.li>
            ))}
            {typing ? (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
                aria-label="Assistant is typing"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                  <Bot className="h-4 w-4" aria-hidden />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[var(--border-subtle)] bg-white px-4 py-3 dark:bg-navy-light">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-2 w-2 rounded-full bg-brand-blue"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              </motion.li>
            ) : null}
            <div ref={bottomRef} />
          </ul>

          <form
            className="flex gap-2 border-t border-[var(--border-subtle)] bg-white/60 p-3 backdrop-blur dark:bg-navy/60 md:p-4"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label htmlFor="citrus-ai-input" className="sr-only">
              Message
            </label>
            <input
              id="citrus-ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Citrus AI anything…"
              disabled={streaming}
              className="min-w-0 flex-1 rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3 text-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-60 dark:bg-navy-light dark:text-slate-100"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-brand-blue to-brand-orange px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        <footer className="text-center text-xs text-muted">
          Powered by{" "}
          <Link href="/" className="font-semibold text-brand-blue hover:underline">
            CitrusV
          </Link>
        </footer>
      </div>
    </div>
  );
}
