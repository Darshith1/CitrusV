"use client";

import { useState } from "react";
import { Label, ToolPanel, inputClass, textareaClass } from "./shared";

type AiToolProps = {
  title: string;
  systemPrompt: string;
  placeholder?: string;
  multiline?: boolean;
};

function AiChatForm({ title, systemPrompt, placeholder, multiline }: AiToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [{ role: "user", content: input }],
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || res.statusText);
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setOutput(acc);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPanel>
      <Label htmlFor="ai-in">{title}</Label>
      {multiline ? (
        <textarea id="ai-in" className={textareaClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} />
      ) : (
        <input id="ai-in" className={inputClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} />
      )}
      <button type="button" disabled={loading} onClick={() => void submit()} className="mt-3 rounded-lg bg-brand-blue px-4 py-2 text-sm text-white disabled:opacity-50">
        {loading ? "Generating…" : "Generate"}
      </button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {output ? <textarea className={`${textareaClass} mt-4`} readOnly value={output} /> : null}
    </ToolPanel>
  );
}

export function AiRephraser() {
  return (
    <AiChatForm
      title="Text to rephrase"
      systemPrompt="You are a writing assistant. Rephrase the user's text clearly while preserving meaning. Return only the rephrased text."
      placeholder="Paste text to rephrase…"
      multiline
    />
  );
}

export function AiCaptionGenerator() {
  return (
    <AiChatForm
      title="Describe your post or image"
      systemPrompt="Write engaging social media captions. Provide 3 caption options, each on its own line."
      placeholder="Beach sunset product launch…"
      multiline
    />
  );
}

export function HashtagGenerator() {
  return (
    <AiChatForm
      title="Topic or niche"
      systemPrompt="Suggest 15 relevant hashtags for social media. Return hashtags only, space-separated."
      placeholder="fitness coaching…"
    />
  );
}

export function SocialBioCreator() {
  return (
    <AiChatForm
      title="About you or your brand"
      systemPrompt="Write a concise social media bio under 160 characters. Return 3 bio options separated by blank lines."
      placeholder="Designer, coffee lover, building apps…"
      multiline
    />
  );
}
