"use client";

import { useMemo, useState } from "react";
import { CopyButton, Label, ToolPanel, inputClass } from "./shared";

export function CssGradientGenerator() {
  const [c1, setC1] = useState("#2563eb");
  const [c2, setC2] = useState("#f97316");
  const [angle, setAngle] = useState(135);
  const css = useMemo(() => `background: linear-gradient(${angle}deg, ${c1}, ${c2});`, [c1, c2, angle]);
  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><Label>Color 1</Label><input type="color" className="h-10 w-full" value={c1} onChange={(e) => setC1(e.target.value)} /></div>
        <div><Label>Color 2</Label><input type="color" className="h-10 w-full" value={c2} onChange={(e) => setC2(e.target.value)} /></div>
        <div><Label>Angle ({angle}°)</Label><input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="mt-4 h-32 rounded-xl border" style={{ background: `linear-gradient(${angle}deg, ${c1}, ${c2})` }} />
      <pre className="mt-4 rounded-lg bg-surface/80 p-3 text-sm">{css}</pre>
      <CopyButton text={css} />
    </ToolPanel>
  );
}
