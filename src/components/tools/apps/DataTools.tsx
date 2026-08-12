"use client";

import { useMemo, useState } from "react";
import { CopyButton, ToolPanel, textareaClass } from "./shared";
export { JsonDiff } from "./DevTools";

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = (cols[i] ?? "").trim(); });
    return row;
  });
}

export function CsvToJson() {
  const [csv, setCsv] = useState("name,email\nAlex,alex@example.com");
  const json = useMemo(() => JSON.stringify(parseCsv(csv), null, 2), [csv]);
  return (
    <ToolPanel>
      <textarea className={textareaClass} value={csv} onChange={(e) => setCsv(e.target.value)} />
      <textarea className={`${textareaClass} mt-3`} readOnly value={json} />
      <div className="mt-2"><CopyButton text={json} /></div>
    </ToolPanel>
  );
}

function formatXml(xml: string): string {
  let formatted = "";
  let pad = 0;
  xml.replace(/>\s*</g, "><").split(/>\s*</).forEach((node, i) => {
    if (!node) return;
    const n = (i ? "<" : "") + node + (i ? ">" : "");
    if (n.match(/^<\//)) pad = Math.max(0, pad - 1);
    formatted += "  ".repeat(pad) + n + "\n";
    if (n.match(/^<[^!?/][^>]*[^/]>$/)) pad++;
  });
  return formatted.trim();
}

export function XmlFormatter() {
  const [raw, setRaw] = useState("<root><item>Hello</item></root>");
  const out = useMemo(() => {
    try { return formatXml(raw); } catch { return "Could not format"; }
  }, [raw]);
  return (
    <ToolPanel>
      <textarea className={textareaClass} value={raw} onChange={(e) => setRaw(e.target.value)} />
      <textarea className={`${textareaClass} mt-3`} readOnly value={out} />
      <div className="mt-2"><CopyButton text={out} /></div>
    </ToolPanel>
  );
}
