"use client";

import { useMemo, useState } from "react";
import { Label, ToolPanel, inputClass } from "./shared";

export function PercentageCalculator() {
  const [a, setA] = useState("200");
  const [b, setB] = useState("15");
  const [modeSet, setMode] = useState<"of" | "change">("of");
  const result = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y)) return "—";
    if (modeSet === "of") return `${y}% of ${x} = ${(x * y) / 100}`;
    return `Change from ${x} to ${y} = ${(((y - x) / x) * 100).toFixed(2)}%`;
  }, [a, b, modeSet]);
  return (
    <ToolPanel>
      <select className={`${inputClass} mb-3 w-56`} value={modeSet} onChange={(e) => setMode(e.target.value as "of" | "change")}>
        <option value="of">X% of Y</option>
        <option value="change">Percent change</option>
      </select>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={inputClass} value={a} onChange={(e) => setA(e.target.value)} />
        <input className={inputClass} value={b} onChange={(e) => setB(e.target.value)} />
      </div>
      <p className="mt-4 text-lg font-semibold">{result}</p>
    </ToolPanel>
  );
}

export function BmiCalculator() {
  const [kg, setKg] = useState("70");
  const [cm, setCm] = useState("175");
  const bmi = useMemo(() => {
    const w = parseFloat(kg);
    const h = parseFloat(cm) / 100;
    if (!w || !h) return null;
    return w / (h * h);
  }, [kg, cm]);
  const label = bmi == null ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Weight (kg)</Label><input className={inputClass} value={kg} onChange={(e) => setKg(e.target.value)} /></div>
        <div><Label>Height (cm)</Label><input className={inputClass} value={cm} onChange={(e) => setCm(e.target.value)} /></div>
      </div>
      {bmi != null ? <p className="mt-4 text-lg">BMI: <strong>{bmi.toFixed(1)}</strong> — {label}</p> : null}
    </ToolPanel>
  );
}

export function AgeCalculator() {
  const [dob, setDob] = useState("");
  const age = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob);
    const now = new Date();
    let y = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) y--;
    return y;
  }, [dob]);
  return (
    <ToolPanel>
      <Label htmlFor="dob">Date of birth</Label>
      <input id="dob" type="date" className={inputClass} value={dob} onChange={(e) => setDob(e.target.value)} />
      {age != null ? <p className="mt-4 text-lg font-semibold">{age} years old</p> : null}
    </ToolPanel>
  );
}

export function DateDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const days = useMemo(() => {
    if (!start || !end) return null;
    const ms = new Date(end).getTime() - new Date(start).getTime();
    return Math.round(ms / (1000 * 60 * 60 * 24));
  }, [start, end]);
  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Start</Label><input type="date" className={inputClass} value={start} onChange={(e) => setStart(e.target.value)} /></div>
        <div><Label>End</Label><input type="date" className={inputClass} value={end} onChange={(e) => setEnd(e.target.value)} /></div>
      </div>
      {days != null ? <p className="mt-4 text-lg">{days} day(s) between dates</p> : null}
    </ToolPanel>
  );
}

export function SmartCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const calc = () => {
    try {
      const safe = expr.replace(/[^0-9+\-*/().%\s]/g, "");
      // eslint-disable-next-line no-new-func
      const v = Function(`"use strict"; return (${safe})`)();
      setResult(String(v));
    } catch {
      setResult("Error");
    }
  };
  return (
    <ToolPanel>
      <input className={inputClass} value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="e.g. (12 + 8) * 2" onKeyDown={(e) => e.key === "Enter" && calc()} />
      <button type="button" onClick={calc} className="mt-3 rounded-lg bg-brand-blue px-4 py-2 text-sm text-white">Calculate</button>
      {result ? <p className="mt-4 text-2xl font-bold">{result}</p> : null}
    </ToolPanel>
  );
}

export function LoanCalculator() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const payment = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (!p || !r || !n) return null;
    const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return m;
  }, [principal, rate, years]);
  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><Label>Principal</Label><input className={inputClass} value={principal} onChange={(e) => setPrincipal(e.target.value)} /></div>
        <div><Label>Rate %</Label><input className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        <div><Label>Years</Label><input className={inputClass} value={years} onChange={(e) => setYears(e.target.value)} /></div>
      </div>
      {payment != null ? <p className="mt-4 text-lg">Monthly payment: <strong>${payment.toFixed(2)}</strong></p> : null}
    </ToolPanel>
  );
}
