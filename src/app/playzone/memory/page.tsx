"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["🍊", "🍋", "🫐", "🍇", "🥝", "🍉", "🌿", "☀️"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstPick, setFirstPick] = useState<number | null>(null);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setCards(buildDeck());
  }, []);

  const flip = useCallback(
    (index: number) => {
      if (lock) return;
      setCards((prev) => {
        const c = prev[index];
        if (c.flipped || c.matched) return prev;
        const next = prev.map((card, i) => (i === index ? { ...card, flipped: true } : card));
        return next;
      });

      if (firstPick === null) {
        setFirstPick(index);
        return;
      }
      if (firstPick === index) return;

      setLock(true);
      setMoves((m) => m + 1);
      const a = cards[firstPick]?.emoji;
      const b = cards[index]?.emoji;

      if (a === b) {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstPick || i === index ? { ...card, matched: true, flipped: true } : card,
          ),
        );
        setFirstPick(null);
        setLock(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === firstPick || i === index ? { ...card, flipped: false } : card,
            ),
          );
          setFirstPick(null);
          setLock(false);
        }, 700);
      }
    },
    [cards, firstPick, lock],
  );

  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) setWon(true);
  }, [cards]);

  function restart() {
    setCards(buildDeck());
    setFirstPick(null);
    setLock(false);
    setMoves(0);
    setWon(false);
  }

  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-gradient-to-b from-surface to-white py-8 dark:from-navy-dark dark:to-navy">
      <div className="container-citrus mx-auto max-w-2xl px-4">
        <Link href="/playzone" className="text-sm text-brand-blue hover:underline">
          ← Back to Playzone
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-3xl font-bold text-navy dark:text-white"
        >
          Memory Match
        </motion.h1>
        <p className="mt-1 text-muted">Moves: {moves}</p>

        <ul className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((card, index) => (
            <li key={card.id + "-" + index}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => flip(index)}
                disabled={card.matched}
                className={`aspect-square w-full rounded-xl text-2xl font-bold shadow-md transition sm:text-3xl ${
                  card.flipped || card.matched
                    ? "bg-white text-navy dark:bg-navy-light dark:text-white"
                    : "bg-gradient-to-br from-brand-blue to-brand-orange text-transparent"
                } ${card.matched ? "ring-2 ring-brand-orange opacity-80" : ""}`}
                aria-label={card.flipped ? card.emoji : "Hidden card"}
              >
                {card.flipped || card.matched ? card.emoji : "?"}
              </motion.button>
            </li>
          ))}
        </ul>

        {won ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 p-6 text-center"
          >
            <p className="text-lg font-semibold text-navy dark:text-white">You matched them all in {moves} moves!</p>
            <button
              type="button"
              onClick={restart}
              className="mt-4 rounded-xl bg-brand-blue px-6 py-2 font-semibold text-white"
            >
              Play again
            </button>
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={restart}
            className="mt-6 w-full rounded-xl border border-[var(--border-subtle)] py-2 text-sm font-medium text-navy dark:text-white"
          >
            Shuffle & restart
          </button>
        )}
      </div>
    </div>
  );
}
