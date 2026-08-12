"use client";

import { useMemo, useState } from "react";
import { Label, ToolPanel, inputClass } from "./shared";

export function QrCodeGenerator() {
  const [text, setText] = useState("https://citrusv.com");
  const [size, setSize] = useState(256);
  const src = useMemo(() => {
    if (!text.trim()) return "";
    return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(text)}`;
  }, [text, size]);
  return (
    <ToolPanel>
      <Label>Content</Label>
      <input className={inputClass} value={text} onChange={(e) => setText(e.target.value)} />
      <Label className="mt-3">Size ({size}px)</Label>
      <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
      {src ? (
        <div className="mt-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="QR code" width={size} height={size} className="rounded-lg border" />
        </div>
      ) : null}
    </ToolPanel>
  );
}
