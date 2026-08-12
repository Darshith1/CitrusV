"use client";

import { useMemo, useState } from "react";
import { Label, ToolPanel, inputClass } from "./shared";

export function TemperatureConverter() {
  const [c, setC] = useState("20");
  const f = useMemo(() => {
    const v = parseFloat(c);
    return Number.isNaN(v) ? "—" : ((v * 9) / 5 + 32).toFixed(2);
  }, [c]);
  const k = useMemo(() => {
    const v = parseFloat(c);
    return Number.isNaN(v) ? "—" : (v + 273.15).toFixed(2);
  }, [c]);
  return (
    <ToolPanel>
      <Label>Celsius</Label>
      <input className={inputClass} value={c} onChange={(e) => setC(e.target.value)} />
      <p className="mt-4 text-sm">Fahrenheit: <strong>{f}</strong></p>
      <p className="text-sm">Kelvin: <strong>{k}</strong></p>
    </ToolPanel>
  );
}

const UNITS: Record<string, Record<string, number>> = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084 },
  weight: { kg: 1, g: 1000, lb: 2.20462, oz: 35.274 },
};

export function UnitConverter() {
  const [family, setFamily] = useState<keyof typeof UNITS>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const units = UNITS[family];
  const out = useMemo(() => {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return "—";
    const base = v / units[from];
    return (base * units[to]).toFixed(4);
  }, [value, from, to, units]);
  return (
    <ToolPanel>
      <select className={`${inputClass} mb-3`} value={family} onChange={(e) => { const f = e.target.value as keyof typeof UNITS; setFamily(f); const keys = Object.keys(UNITS[f]); setFrom(keys[0]); setTo(keys[1] ?? keys[0]); }}>
        <option value="length">Length</option>
        <option value="weight">Weight</option>
      </select>
      <input className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <select className={inputClass} value={from} onChange={(e) => setFrom(e.target.value)}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select>
        <select className={inputClass} value={to} onChange={(e) => setTo(e.target.value)}>{Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}</select>
      </div>
      <p className="mt-4 text-lg font-semibold">{out} {to}</p>
    </ToolPanel>
  );
}

const ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Kolkata", "Australia/Sydney"];

export function TimezoneConverter() {
  const [when, setWhen] = useState(() => new Date().toISOString().slice(0, 16));
  const [zone, setZone] = useState("America/New_York");
  const formatted = useMemo(() => {
    try {
      const d = new Date(when);
      return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: zone }).format(d);
    } catch {
      return "Invalid date";
    }
  }, [when, zone]);
  return (
    <ToolPanel>
      <Label>Local datetime</Label>
      <input type="datetime-local" className={inputClass} value={when} onChange={(e) => setWhen(e.target.value)} />
      <Label htmlFor="tz">Timezone</Label>
      <select id="tz" className={inputClass} value={zone} onChange={(e) => setZone(e.target.value)}>
        {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
      </select>
      <p className="mt-4 text-lg">{formatted}</p>
    </ToolPanel>
  );
}
