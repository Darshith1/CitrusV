"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const SIZE = 4;

type Grid = number[];

function emptyIndex(g: Grid) {
  return g.indexOf(0);
}

function canMerge(line: number[]): { result: number[]; gained: number } {
  const filtered = line.filter((n) => n !== 0);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      const v = filtered[i] * 2;
      out.push(v);
      gained += v;
      i++;
    } else out.push(filtered[i]);
  }
  while (out.length < SIZE) out.push(0);
  return { result: out, gained };
}

function getRow(g: Grid, r: number) {
  return g.slice(r * SIZE, r * SIZE + SIZE);
}

function setRow(g: Grid, r: number, row: number[]) {
  const next = [...g];
  for (let c = 0; c < SIZE; c++) next[r * SIZE + c] = row[c];
  return next;
}

function getCol(g: Grid, c: number) {
  return Array.from({ length: SIZE }, (_, r) => g[r * SIZE + c]);
}

function setCol(g: Grid, c: number, col: number[]) {
  const next = [...g];
  for (let r = 0; r < SIZE; r++) next[r * SIZE + c] = col[r];
  return next;
}

function spawn(g: Grid): Grid {
  const empties = g.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
  if (!empties.length) return g;
  const idx = empties[Math.floor(Math.random() * empties.length)];
  const next = [...g];
  next[idx] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function initGrid(): Grid {
  return spawn(spawn(Array(SIZE * SIZE).fill(0)));
}

function tileColor(n: number): string {
  if (n === 0) return "bg-navy-light/50";
  if (n <= 4) return "bg-brand-blue/80 text-white";
  if (n <= 16) return "bg-brand-blue text-white";
  if (n <= 64) return "bg-brand-orange/90 text-navy";
  if (n <= 256) return "bg-brand-orange text-navy";
  return "bg-gradient-to-br from-brand-orange to-brand-blue text-white";
}

export default function NumberPuzzlePage() {
  const [grid, setGrid] = useState<Grid>(() => initGrid());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);

  const move = useCallback((dir: "left" | "right" | "up" | "down") => {
    setGrid((g) => {
      let next = [...g];
      let gained = 0;

      if (dir === "left" || dir === "right") {
        for (let r = 0; r < SIZE; r++) {
          let row = getRow(next, r);
          if (dir === "right") row = [...row].reverse();
          const { result, gained: gg } = canMerge(row);
          gained += gg;
          const out = dir === "right" ? [...result].reverse() : result;
          next = setRow(next, r, out);
        }
      } else {
        for (let c = 0; c < SIZE; c++) {
          let col = getCol(next, c);
          if (dir === "down") col = [...col].reverse();
          const { result, gained: gg } = canMerge(col);
          gained += gg;
          const out = dir === "down" ? [...result].reverse() : result;
          next = setCol(next, c, out);
        }
      }

      if (next.every((v, i) => v === g[i])) return g;
      setScore((s) => {
        const ns = s + gained;
        setBest((b) => Math.max(b, ns));
        return ns;
      });
      if (next.some((v) => v >= 2048)) setWon(true);
      const spawned = spawn(next);
      if (!canMove(spawned)) setOver(true);
      return spawned;
    });
  }, []);

  function canMove(g: Grid): boolean {
    if (g.includes(0)) return true;
    for (let r = 0; r < SIZE; r++) {
      const row = getRow(g, r);
      for (let c = 0; c < SIZE - 1; c++) if (row[c] === row[c + 1]) return true;
    }
    for (let c = 0; c < SIZE; c++) {
      const col = getCol(g, c);
      for (let r = 0; r < SIZE - 1; r++) if (col[r] === col[r + 1]) return true;
    }
    return false;
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        move(d);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  function restart() {
    setGrid(initGrid());
    setScore(0);
    setWon(false);
    setOver(false);
  }

  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-gradient-to-b from-surface to-white py-8 dark:from-navy dark:to-navy-dark">
      <div className="container-citrus mx-auto max-w-md px-4">
        <Link href="/playzone" className="text-sm text-brand-blue hover:underline">
          ← Back to Playzone
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-3xl font-bold text-navy dark:text-white"
        >
          2048-lite
        </motion.h1>
        <div className="mt-2 flex gap-4 text-sm text-muted">
          <span>Score: {score}</span>
          <span>Best: {best}</span>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl bg-navy p-3 shadow-xl">
          {grid.map((n, i) => (
            <motion.div
              key={i}
              layout
              className={`flex aspect-square items-center justify-center rounded-lg text-lg font-bold sm:text-xl ${tileColor(n)}`}
            >
              {n || ""}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
          <span />
          <button type="button" onClick={() => move("up")} className="rounded-lg bg-brand-blue py-3 text-white">
            ↑
          </button>
          <span />
          <button type="button" onClick={() => move("left")} className="rounded-lg bg-brand-blue py-3 text-white">
            ←
          </button>
          <button type="button" onClick={() => move("down")} className="rounded-lg bg-brand-blue py-3 text-white">
            ↓
          </button>
          <button type="button" onClick={() => move("right")} className="rounded-lg bg-brand-blue py-3 text-white">
            →
          </button>
        </div>
        <p className="mt-3 hidden text-center text-sm text-muted sm:block">Use arrow keys to slide tiles.</p>

        {(won || over) && (
          <div className="mt-6 rounded-xl border border-brand-orange/40 bg-brand-orange/10 p-4 text-center">
            <p className="font-semibold text-navy dark:text-white">
              {won ? "You reached 2048! Keep going or restart." : "No moves left — game over."}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-3 rounded-xl bg-brand-orange px-6 py-2 font-semibold text-navy"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
