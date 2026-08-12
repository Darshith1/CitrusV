"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton, Label, ToolPanel, inputClass } from "./shared";

const CHARSET = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

export function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, numbers: true, symbols: true });
  const [pwd, setPwd] = useState("");
  const generate = () => {
    let pool = "";
    if (opts.lower) pool += CHARSET.lower;
    if (opts.upper) pool += CHARSET.upper;
    if (opts.numbers) pool += CHARSET.numbers;
    if (opts.symbols) pool += CHARSET.symbols;
    if (!pool) return;
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    setPwd(Array.from(arr, (n) => pool[n % pool.length]).join(""));
  };
  useEffect(() => { generate(); }, []);
  return (
    <ToolPanel>
      <div className="flex flex-wrap items-end gap-4">
        <div><Label htmlFor="plen">Length</Label><input id="plen" type="number" min={8} max={64} className={`${inputClass} w-24`} value={len} onChange={(e) => setLen(Number(e.target.value))} /></div>
        {Object.keys(opts).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm capitalize">
            <input type="checkbox" checked={opts[k as keyof typeof opts]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} /> {k}
          </label>
        ))}
        <button type="button" onClick={generate} className="rounded-lg bg-brand-blue px-4 py-2 text-sm text-white">Generate</button>
      </div>
      <p className="mt-4 break-all font-mono text-lg">{pwd}</p>
      <div className="mt-2"><CopyButton text={pwd} /></div>
    </ToolPanel>
  );
}

export function PasswordStrength() {
  const [pwd, setPwd] = useState("");
  const score = useMemo(() => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (pwd.length >= 12) s++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^a-zA-Z0-9]/.test(pwd)) s++;
    const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
    return { s, label: labels[Math.min(s, labels.length - 1)] };
  }, [pwd]);
  return (
    <ToolPanel>
      <Label htmlFor="pwd">Password</Label>
      <input id="pwd" type="password" className={inputClass} value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
        <div className="h-full bg-brand-blue transition-all" style={{ width: `${(score.s / 5) * 100}%` }} />
      </div>
      <p className="mt-2 text-sm font-medium">{score.label}</p>
    </ToolPanel>
  );
}

export function HashCompare() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const match = a.trim() && b.trim() && a.trim().toLowerCase() === b.trim().toLowerCase();
  return (
    <ToolPanel>
      <Label>Hash A</Label>
      <input className={inputClass} value={a} onChange={(e) => setA(e.target.value)} />
      <div className="mt-3"><Label>Hash B</Label></div>
      <input className={inputClass} value={b} onChange={(e) => setB(e.target.value)} />
      <p className={`mt-3 text-sm font-medium ${match ? "text-green-600" : "text-muted"}`}>{match ? "Hashes match" : "Enter two hashes to compare"}</p>
    </ToolPanel>
  );
}

export function FakeDataGenerator() {
  const [count, setCount] = useState(5);
  const rows = useMemo(() => {
    const first = ["Alex", "Jordan", "Sam", "Taylor", "Morgan"];
    const last = ["Lee", "Patel", "Garcia", "Kim", "Brown"];
    return Array.from({ length: count }, (_, i) => ({
      name: `${first[i % first.length]} ${last[(i * 2) % last.length]}`,
      email: `user${i + 1}@example.com`,
      phone: `+1-555-${String(1000 + i).slice(-4)}`,
    }));
  }, [count]);
  const json = JSON.stringify(rows, null, 2);
  return (
    <ToolPanel>
      <Label htmlFor="cnt">Rows</Label>
      <input id="cnt" type="number" min={1} max={50} className={`${inputClass} w-24`} value={count} onChange={(e) => setCount(Number(e.target.value))} />
      <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-surface/80 p-3 text-xs">{json}</pre>
      <div className="mt-2"><CopyButton text={json} /></div>
    </ToolPanel>
  );
}
