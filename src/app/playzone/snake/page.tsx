"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GRID = 20;
const TICK_MS = 120;

type Point = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

function same(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function randomFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some((s) => same(s, p)));
  return p;
}

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(true);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }] as Point[],
    dir: "right" as Dir,
    nextDir: "right" as Dir,
    food: { x: 5, y: 5 } as Point,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { snake, food } = stateRef.current;
    const size = canvas.width / GRID;

    ctx.fillStyle = "#0d2240";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(30, 144, 255, 0.15)";
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(canvas.width, i * size);
      ctx.stroke();
    }

    ctx.fillStyle = "#ff8c00";
    ctx.beginPath();
    ctx.arc(food.x * size + size / 2, food.y * size + size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((seg, i) => {
      const g = ctx.createLinearGradient(seg.x * size, seg.y * size, seg.x * size + size, seg.y * size + size);
      g.addColorStop(0, i === 0 ? "#1e90ff" : "#4da3ff");
      g.addColorStop(1, i === 0 ? "#ff8c00" : "#1e90ff");
      ctx.fillStyle = g;
      ctx.roundRect(seg.x * size + 1, seg.y * size + 1, size - 2, size - 2, 4);
      ctx.fill();
    });
  }, []);

  const step = useCallback(() => {
    const s = stateRef.current;
    s.dir = s.nextDir;
    const head = { ...s.snake[0] };
    if (s.dir === "up") head.y -= 1;
    if (s.dir === "down") head.y += 1;
    if (s.dir === "left") head.x -= 1;
    if (s.dir === "right") head.x += 1;

    if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID || s.snake.some((p) => same(p, head))) {
      setGameOver(true);
      setRunning(false);
      return;
    }

    const ate = same(head, s.food);
    s.snake = [head, ...s.snake];
    if (!ate) s.snake.pop();
    else {
      setScore((sc) => sc + 10);
      s.food = randomFood(s.snake);
    }
    draw();
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(step, TICK_MS);
    return () => clearInterval(id);
  }, [running, gameOver, step]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const s = stateRef.current;
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const next = map[e.key];
      if (!next) return;
      e.preventDefault();
      const opp: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
      if (opp[next] !== s.dir) s.nextDir = next;
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function reset() {
    stateRef.current = {
      snake: [{ x: 10, y: 10 }],
      dir: "right",
      nextDir: "right",
      food: randomFood([{ x: 10, y: 10 }]),
    };
    setScore(0);
    setGameOver(false);
    setRunning(true);
    draw();
  }

  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-gradient-to-b from-navy to-navy-dark py-8 text-white">
      <div className="container-citrus mx-auto max-w-lg px-4">
        <Link href="/playzone" className="text-sm text-brand-blue hover:underline">
          ← Back to Playzone
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-3xl font-bold"
        >
          Snake
        </motion.h1>
        <p className="mt-1 text-white/70">Arrow keys or WASD · Score: {score}</p>
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <canvas ref={canvasRef} width={400} height={400} className="mx-auto block w-full max-w-[min(100vw-2rem,400px)] touch-none" />
          {gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 backdrop-blur-sm">
              <p className="text-xl font-semibold">Game over!</p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 rounded-xl bg-brand-orange px-6 py-2 font-semibold text-navy"
              >
                Play again
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex-1 rounded-xl border border-white/20 py-2 text-sm font-medium hover:bg-white/10"
          >
            {running ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex-1 rounded-xl bg-brand-blue py-2 text-sm font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
