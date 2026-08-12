"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Cell = "X" | "O" | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b: Board): Cell | "draw" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  if (b.every(Boolean)) return "draw";
  return null;
}

function emptyIndices(b: Board): number[] {
  return b.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
}

function cpuMove(b: Board): number {
  const empties = emptyIndices(b);
  for (const i of empties) {
    const trial = [...b] as Board;
    trial[i] = "O";
    if (winner(trial) === "O") return i;
  }
  for (const i of empties) {
    const trial = [...b] as Board;
    trial[i] = "X";
    if (winner(trial) === "X") return i;
  }
  if (b[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => b[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empties[Math.floor(Math.random() * empties.length)];
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [status, setStatus] = useState<string>("Your turn (X)");
  const [gameOver, setGameOver] = useState(false);

  const applyMove = useCallback((next: Board, msg: string, over: boolean) => {
    setBoard(next);
    setStatus(msg);
    setGameOver(over);
  }, []);

  const playerClick = (i: number) => {
    if (gameOver || board[i]) return;
    const next = [...board] as Board;
    next[i] = "X";
    const w = winner(next);
    if (w === "X") return applyMove(next, "You win! 🎉", true);
    if (w === "draw") return applyMove(next, "Draw — nice game!", true);
    applyMove(next, "CPU is thinking…", false);
  };

  useEffect(() => {
    if (gameOver) return;
    if (board.some((c) => c === null) && status.startsWith("CPU")) {
      const t = setTimeout(() => {
        setBoard((current) => {
          const w0 = winner(current);
          if (w0) return current;
          const idx = cpuMove(current);
          const next = [...current] as Board;
          next[idx] = "O";
          const w = winner(next);
          if (w === "O") {
            setStatus("CPU wins — try again!");
            setGameOver(true);
          } else if (w === "draw") {
            setStatus("Draw — nice game!");
            setGameOver(true);
          } else {
            setStatus("Your turn (X)");
          }
          return next;
        });
      }, 450);
      return () => clearTimeout(t);
    }
  }, [board, gameOver, status]);

  function reset() {
    setBoard(Array(9).fill(null));
    setStatus("Your turn (X)");
    setGameOver(false);
  }

  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-gradient-to-b from-navy-light to-navy py-8 text-white">
      <div className="container-citrus mx-auto max-w-md px-4">
        <Link href="/playzone" className="text-sm text-brand-blue hover:underline">
          ← Back to Playzone
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-3xl font-bold"
        >
          Tic-Tac-Toe vs CPU
        </motion.h1>
        <p className="mt-2 text-white/75" aria-live="polite">
          {status}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
          {board.map((cell, i) => (
            <motion.button
              key={i}
              type="button"
              whileHover={{ scale: cell ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => playerClick(i)}
              disabled={gameOver || Boolean(cell) || status.startsWith("CPU")}
              className="flex aspect-square items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-4xl font-bold shadow-lg disabled:cursor-not-allowed sm:text-5xl"
            >
              <span className={cell === "X" ? "text-brand-blue" : cell === "O" ? "text-brand-orange" : ""}>
                {cell ?? ""}
              </span>
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-8 w-full rounded-xl bg-brand-orange py-3 font-semibold text-navy"
        >
          New game
        </button>
      </div>
    </div>
  );
}
