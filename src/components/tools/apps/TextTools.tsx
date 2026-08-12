"use client";

import { useMemo, useState, useEffect } from "react";
import { CopyButton, Label, ToolPanel, inputClass, textareaClass } from "./shared";

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const lines = text ? text.split(/\n/).length : 0;
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g) || []).length || 1 : 0;
    return { words, chars, charsNoSpace, lines, sentences };
  }, [text]);
  return (
    <ToolPanel>
      <Label htmlFor="wc">Text</Label>
      <textarea id="wc" className={textareaClass} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type text…" />
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="rounded-lg bg-surface/80 px-3 py-2">
            <dt className="text-muted capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
            <dd className="text-lg font-semibold text-navy dark:text-slate-100">{v}</dd>
          </div>
        ))}
      </dl>
    </ToolPanel>
  );
}

export function CaseConvert() {
  const [text, setText] = useState("");
  const convert = (mode: string) => {
    if (mode === "upper") setText(text.toUpperCase());
    else if (mode === "lower") setText(text.toLowerCase());
    else if (mode === "title") setText(text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
    else if (mode === "sentence") setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
    else if (mode === "camel") setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()));
    else if (mode === "snake") setText(text.trim().replace(/\s+/g, "_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase());
  };
  return (
    <ToolPanel>
      <textarea className={textareaClass} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text…" />
      <div className="mt-3 flex flex-wrap gap-2">
        {["upper", "lower", "title", "sentence", "camel", "snake"].map((m) => (
          <button key={m} type="button" onClick={() => convert(m)} className="rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-medium text-white capitalize">{m}</button>
        ))}
        <CopyButton text={text} />
      </div>
    </ToolPanel>
  );
}

export function LineBreakRemover() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"spaces" | "none">("spaces");
  const out = useMemo(() => {
    if (!text) return "";
    if (mode === "none") return text.replace(/\r?\n/g, "");
    return text.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  }, [text, mode]);
  return (
    <ToolPanel>
      <textarea className={textareaClass} value={text} onChange={(e) => setText(e.target.value)} placeholder="Text with line breaks…" />
      <div className="mt-3 flex gap-2">
        <select className={inputClass} value={mode} onChange={(e) => setMode(e.target.value as "spaces" | "none")}>
          <option value="spaces">Replace with spaces</option>
          <option value="none">Remove entirely</option>
        </select>
        <CopyButton text={out} />
      </div>
      <textarea className={`${textareaClass} mt-3`} readOnly value={out} />
    </ToolPanel>
  );
}

export function TextCompare() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const same = a === b;
  const diffLines = useMemo(() => {
    const la = a.split(/\n/);
    const lb = b.split(/\n/);
    const max = Math.max(la.length, lb.length);
    const rows: { i: number; left: string; right: string; diff: boolean }[] = [];
    for (let i = 0; i < max; i++) {
      const left = la[i] ?? "";
      const right = lb[i] ?? "";
      rows.push({ i: i + 1, left, right, diff: left !== right });
    }
    return rows;
  }, [a, b]);
  return (
    <ToolPanel>
      <div className="grid gap-3 md:grid-cols-2">
        <div><Label>Text A</Label><textarea className={textareaClass} value={a} onChange={(e) => setA(e.target.value)} /></div>
        <div><Label>Text B</Label><textarea className={textareaClass} value={b} onChange={(e) => setB(e.target.value)} /></div>
      </div>
      <p className={`mt-3 text-sm font-medium ${same ? "text-green-600" : "text-brand-orange"}`}>{same ? "Texts match" : "Texts differ"}</p>
      {!same && (
        <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
          {diffLines.filter((r) => r.diff).slice(0, 50).map((r) => (
            <div key={r.i} className="grid grid-cols-2 border-b border-[var(--border-subtle)] bg-red-50/50 dark:bg-red-950/20">
              <span className="p-2">{r.left || "∅"}</span>
              <span className="p-2">{r.right || "∅"}</span>
            </div>
          ))}
        </div>
      )}
    </ToolPanel>
  );
}

const QUICKNOTE_KEY = "citrusv-quicknote";

export function QuickNote() {
  const [note, setNote] = useState("");
  useEffect(() => {
    try { setNote(localStorage.getItem(QUICKNOTE_KEY) ?? ""); } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(QUICKNOTE_KEY, note); } catch { /* ignore */ }
  }, [note]);
  return (
    <ToolPanel>
      <textarea className={`${textareaClass} min-h-[240px]`} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Autosaved in this browser…" />
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>{note.length} characters</span>
        <CopyButton text={note} />
      </div>
    </ToolPanel>
  );
}
