"use client";

import { useEffect, useState } from "react";
import { Label, ToolPanel, inputClass } from "./shared";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function PomodoroTimer() {
  const [work, setWork] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [seconds, setSeconds] = useState(work * 60);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"work" | "break">("work");
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          const next = phase === "work" ? "break" : "work";
          setPhase(next);
          return (next === "work" ? work : breakMin) * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase, work, breakMin]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <ToolPanel>
      <p className="text-sm text-muted capitalize">Phase: {phase}</p>
      <p className="my-6 text-center text-5xl font-bold tabular-nums">{pad(m)}:{pad(s)}</p>
      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => setRunning((r) => !r)} className="rounded-lg bg-brand-blue px-4 py-2 text-white">{running ? "Pause" : "Start"}</button>
        <button type="button" onClick={() => { setRunning(false); setPhase("work"); setSeconds(work * 60); }} className="rounded-lg border px-4 py-2">Reset</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div><Label>Work (min)</Label><input type="number" className={inputClass} value={work} onChange={(e) => setWork(Number(e.target.value))} /></div>
        <div><Label>Break (min)</Label><input type="number" className={inputClass} value={breakMin} onChange={(e) => setBreakMin(Number(e.target.value))} /></div>
      </div>
    </ToolPanel>
  );
}

export function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs((m) => m + 10), 10);
    return () => clearInterval(id);
  }, [running]);
  const total = Math.floor(ms / 1000);
  const display = `${pad(Math.floor(total / 60))}:${pad(total % 60)}.${String(Math.floor(ms % 1000)).padStart(3, "0")}`;
  return (
    <ToolPanel>
      <p className="text-center text-5xl font-mono font-bold">{display}</p>
      <div className="mt-6 flex justify-center gap-2">
        <button type="button" onClick={() => setRunning(true)} className="rounded-lg bg-brand-blue px-4 py-2 text-white">Start</button>
        <button type="button" onClick={() => setRunning(false)} className="rounded-lg border px-4 py-2">Stop</button>
        <button type="button" onClick={() => { setRunning(false); setMs(0); }} className="rounded-lg border px-4 py-2">Reset</button>
      </div>
    </ToolPanel>
  );
}

export function CountdownTimer() {
  const [target, setTarget] = useState("");
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = target ? new Date(target).getTime() - now : 0;
  const done = diff <= 0;
  const sec = Math.max(0, Math.floor(diff / 1000));
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return (
    <ToolPanel>
      <Label htmlFor="tgt">Target date & time</Label>
      <input id="tgt" type="datetime-local" className={inputClass} value={target} onChange={(e) => setTarget(e.target.value)} />
      {target ? (
        <p className="mt-6 text-center text-2xl font-semibold tabular-nums">
          {done ? "Time's up!" : `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`}
        </p>
      ) : null}
    </ToolPanel>
  );
}
