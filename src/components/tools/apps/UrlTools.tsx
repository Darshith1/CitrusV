"use client";

import { useMemo, useState } from "react";
import { CopyButton, Label, ToolPanel, inputClass, textareaClass } from "./shared";

export function UtmBuilder() {
  const [base, setBase] = useState("https://example.com/page");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("spring_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const url = useMemo(() => {
    try {
      const u = new URL(base);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      if (term) u.searchParams.set("utm_term", term);
      if (content) u.searchParams.set("utm_content", content);
      return u.toString();
    } catch {
      return "Enter a valid base URL";
    }
  }, [base, source, medium, campaign, term, content]);
  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label>Base URL</Label><input className={inputClass} value={base} onChange={(e) => setBase(e.target.value)} /></div>
        <div><Label>utm_source</Label><input className={inputClass} value={source} onChange={(e) => setSource(e.target.value)} /></div>
        <div><Label>utm_medium</Label><input className={inputClass} value={medium} onChange={(e) => setMedium(e.target.value)} /></div>
        <div><Label>utm_campaign</Label><input className={inputClass} value={campaign} onChange={(e) => setCampaign(e.target.value)} /></div>
        <div><Label>utm_term</Label><input className={inputClass} value={term} onChange={(e) => setTerm(e.target.value)} /></div>
        <div className="sm:col-span-2"><Label>utm_content</Label><input className={inputClass} value={content} onChange={(e) => setContent(e.target.value)} /></div>
      </div>
      <p className="mt-4 break-all text-sm font-mono">{url}</p>
      <div className="mt-2"><CopyButton text={url} /></div>
    </ToolPanel>
  );
}

export function UrlEncoder() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const out = useMemo(() => {
    try {
      return mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
    } catch {
      return "Invalid encoded string";
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

type Preview = { title?: string; description?: string; image?: string; url?: string; error?: string };

export function LinkPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Preview | null>(null);
  const fetchPreview = async () => {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      const json = (await res.json()) as Preview;
      setData(json);
    } catch {
      setData({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ToolPanel>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
        <button type="button" disabled={loading || !url} onClick={() => void fetchPreview()} className="rounded-lg bg-brand-blue px-4 py-2 text-sm text-white disabled:opacity-50">{loading ? "Loading…" : "Preview"}</button>
      </div>
      {data?.error ? <p className="mt-3 text-sm text-red-600">{data.error}</p> : null}
      {data && !data.error ? (
        <div className="mt-4 flex gap-4 rounded-lg border border-[var(--border-subtle)] p-4">
          {data.image ? <img src={data.image} alt="" className="h-24 w-24 rounded object-cover" /> : null}
          <div>
            <p className="font-semibold text-navy dark:text-slate-100">{data.title || "No title"}</p>
            <p className="mt-1 text-sm text-muted">{data.description || "No description"}</p>
            <p className="mt-2 text-xs text-brand-blue break-all">{data.url}</p>
          </div>
        </div>
      ) : null}
    </ToolPanel>
  );
}

export function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState<{ url: string; status?: number }[]>([]);
  const [err, setErr] = useState("");
  const check = async () => {
    setLoading(true);
    setErr("");
    setChain([]);
    try {
      const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}&redirects=1`);
      const json = await res.json();
      if (json.error) setErr(json.error);
      else setChain(json.redirectChain ?? [{ url: json.finalUrl || url, status: json.statusCode }]);
    } catch {
      setErr("Request failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ToolPanel>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
        <button type="button" disabled={loading || !url} onClick={() => void check()} className="rounded-lg bg-brand-blue px-4 py-2 text-sm text-white disabled:opacity-50">Check</button>
      </div>
      {err ? <p className="mt-3 text-sm text-red-600">{err}</p> : null}
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
        {chain.map((c, i) => (
          <li key={`${c.url}-${i}`} className="break-all">{c.status ? `[${c.status}] ` : ""}{c.url}</li>
        ))}
      </ol>
    </ToolPanel>
  );
}
