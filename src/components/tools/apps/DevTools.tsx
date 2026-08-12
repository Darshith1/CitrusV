"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CopyButton, Label, ToolPanel, inputClass, textareaClass } from "./shared";

export function JsonFormatter() {
  const [raw, setRaw] = useState('{\n  "hello": "world"\n}');
  const [indent, setIndent] = useState(2);
  const { out, err } = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return { out: JSON.stringify(parsed, null, indent), err: "" };
    } catch (e) {
      return { out: "", err: e instanceof Error ? e.message : "Invalid JSON" };
    }
  }, [raw, indent]);
  return (
    <ToolPanel>
      <div className="mb-2 flex items-center gap-2">
        <Label htmlFor="indent">Indent</Label>
        <input id="indent" type="number" min={0} max={8} className={`${inputClass} w-20`} value={indent} onChange={(e) => setIndent(Number(e.target.value))} />
        {out ? <CopyButton text={out} /> : null}
      </div>
      <textarea className={textareaClass} value={raw} onChange={(e) => setRaw(e.target.value)} />
      {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : <textarea className={`${textareaClass} mt-3`} readOnly value={out} />}
    </ToolPanel>
  );
}

export function JsonDiff() {
  const [left, setLeft] = useState("{}");
  const [right, setRight] = useState("{}");
  const diff = useMemo(() => {
    try {
      const a = JSON.parse(left) as Record<string, unknown>;
      const b = JSON.parse(right) as Record<string, unknown>;
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      const rows: string[] = [];
      keys.forEach((k) => {
        const va = JSON.stringify(a[k]);
        const vb = JSON.stringify(b[k]);
        if (va !== vb) rows.push(`${k}: ${va ?? "undefined"} → ${vb ?? "undefined"}`);
      });
      return { err: "", rows, same: rows.length === 0 };
    } catch (e) {
      return { err: e instanceof Error ? e.message : "Parse error", rows: [] as string[], same: false };
    }
  }, [left, right]);
  return (
    <ToolPanel>
      <div className="grid gap-3 md:grid-cols-2">
        <div><Label>JSON A</Label><textarea className={textareaClass} value={left} onChange={(e) => setLeft(e.target.value)} /></div>
        <div><Label>JSON B</Label><textarea className={textareaClass} value={right} onChange={(e) => setRight(e.target.value)} /></div>
      </div>
      {diff.err ? <p className="mt-2 text-sm text-red-600">{diff.err}</p> : diff.same ? <p className="mt-3 text-sm text-green-600">Objects match</p> : (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-mono">{diff.rows.map((r) => <li key={r}>{r}</li>)}</ul>
      )}
    </ToolPanel>
  );
}

export function Base64Tool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const out = useMemo(() => {
    try {
      if (mode === "encode") return btoa(unescape(encodeURIComponent(text)));
      return decodeURIComponent(escape(atob(text)));
    } catch {
      return "Invalid input";
    }
  }, [text, mode]);
  return (
    <ToolPanel>
      <select className={`${inputClass} mb-3 w-40`} value={mode} onChange={(e) => setMode(e.target.value as "encode" | "decode")}>
        <option value="encode">Encode</option>
        <option value="decode">Decode</option>
      </select>
      <textarea className={textareaClass} value={text} onChange={(e) => setText(e.target.value)} />
      <textarea className={`${textareaClass} mt-3`} readOnly value={out} />
      <div className="mt-2"><CopyButton text={out} /></div>
    </ToolPanel>
  );
}

export function UuidGenerator() {
  const [ids, setIds] = useState<string[]>([]);
  const gen = useCallback((n: number) => {
    const list = Array.from({ length: n }, () => crypto.randomUUID());
    setIds(list);
  }, []);
  useEffect(() => { gen(1); }, [gen]);
  return (
    <ToolPanel>
      <div className="flex flex-wrap gap-2">
        {[1, 5, 10].map((n) => (
          <button key={n} type="button" onClick={() => gen(n)} className="rounded-lg bg-brand-blue px-3 py-1.5 text-sm text-white">Generate {n}</button>
        ))}
      </div>
      <ul className="mt-4 space-y-2 font-mono text-sm">{ids.map((id) => <li key={id} className="flex items-center justify-between gap-2 rounded-lg bg-surface/80 px-3 py-2"><span>{id}</span><CopyButton text={id} /></li>)}</ul>
    </ToolPanel>
  );
}

export function HashGenerator() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (!text) { setHash(""); return; }
    void crypto.subtle.digest(algo, new TextEncoder().encode(text)).then((buf) => {
      const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      setHash(hex);
    });
  }, [text, algo]);
  return (
    <ToolPanel>
      <select className={`${inputClass} mb-3 w-40`} value={algo} onChange={(e) => setAlgo(e.target.value as typeof algo)}>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-384">SHA-384</option>
        <option value="SHA-512">SHA-512</option>
      </select>
      <textarea className={textareaClass} value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to hash…" />
      <p className="mt-3 break-all font-mono text-sm">{hash || "—"}</p>
      {hash ? <div className="mt-2"><CopyButton text={hash} /></div> : null}
    </ToolPanel>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [sample, setSample] = useState("");
  const result = useMemo(() => {
    if (!pattern) return { err: "", matches: [] as string[] };
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...sample.matchAll(re)].map((m) => m[0]);
      return { err: "", matches };
    } catch (e) {
      return { err: e instanceof Error ? e.message : "Invalid regex", matches: [] as string[] };
    }
  }, [pattern, flags, sample]);
  return (
    <ToolPanel>
      <div className="grid gap-2 sm:grid-cols-2">
        <div><Label>Pattern</Label><input className={inputClass} value={pattern} onChange={(e) => setPattern(e.target.value)} /></div>
        <div><Label>Flags</Label><input className={inputClass} value={flags} onChange={(e) => setFlags(e.target.value)} /></div>
      </div>
      <textarea className={`${textareaClass} mt-3`} value={sample} onChange={(e) => setSample(e.target.value)} placeholder="Sample text…" />
      {result.err ? <p className="mt-2 text-sm text-red-600">{result.err}</p> : <p className="mt-2 text-sm">{result.matches.length} match(es): {result.matches.join(", ") || "none"}</p>}
    </ToolPanel>
  );
}

function b64urlDecode(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return decodeURIComponent(escape(atob(b64)));
}

export function JwtDecoder() {
  const [token, setToken] = useState("");
  const parts = useMemo(() => {
    const seg = token.trim().split(".");
    if (seg.length < 2) return { err: "Enter a JWT with header and payload", header: "", payload: "" };
    try {
      const header = JSON.stringify(JSON.parse(b64urlDecode(seg[0])), null, 2);
      const payload = JSON.stringify(JSON.parse(b64urlDecode(seg[1])), null, 2);
      return { err: "", header, payload };
    } catch (e) {
      return { err: e instanceof Error ? e.message : "Decode failed", header: "", payload: "" };
    }
  }, [token]);
  return (
    <ToolPanel>
      <textarea className={textareaClass} value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste JWT…" />
      {parts.err ? <p className="mt-2 text-sm text-red-600">{parts.err}</p> : (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div><Label>Header</Label><textarea className={textareaClass} readOnly value={parts.header} /></div>
          <div><Label>Payload</Label><textarea className={textareaClass} readOnly value={parts.payload} /></div>
        </div>
      )}
    </ToolPanel>
  );
}

export function CodeFormatter() {
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("javascript");
  const formatted = useMemo(() => {
    const lines = code.split(/\n/).map((l) => l.trimEnd());
    let depth = 0;
    const out: string[] = [];
    for (const line of lines) {
      const t = line.trim();
      if (!t) { out.push(""); continue; }
      if (/^[}\])]/.test(t)) depth = Math.max(0, depth - 1);
      out.push("  ".repeat(depth) + t);
      if (/[{[(]\s*$/.test(t)) depth += 1;
    }
    return out.join("\n");
  }, [code, lang]);
  return (
    <ToolPanel>
      <select className={`${inputClass} mb-3 w-48`} value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
      </select>
      <textarea className={textareaClass} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste code…" />
      <textarea className={`${textareaClass} mt-3`} readOnly value={formatted} />
      <div className="mt-2"><CopyButton text={formatted} /></div>
    </ToolPanel>
  );
}
