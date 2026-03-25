"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllQuotes } from "@/lib/quotes";
import type { Quote } from "@/types";

type Collection = "全部" | "前集" | "后集";

export default function BrowsePage() {
  const allQuotes = getAllQuotes();
  const [activeCollection, setActiveCollection] = useState<Collection>("全部");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCollection === "全部"
      ? allQuotes
      : allQuotes.filter((q) => q.collection === activeCollection);

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="pt-12 pb-6 text-center">
        <Link
          href="/"
          className="inline-block text-sm text-stone-400 hover:text-stone-600 transition mb-4"
        >
          ← 返回
        </Link>
        <h1 className="font-wenkai text-3xl font-bold tracking-wide text-stone-800">
          菜根谭
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          洪应明 · 明代 · 共 {allQuotes.length} 则
        </p>
      </header>

      {/* Collection filter */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex justify-center gap-2 mb-8">
          {(["全部", "前集", "后集"] as Collection[]).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCollection(c)}
              className={`rounded-lg px-4 py-1.5 text-sm transition ${
                activeCollection === c
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {c}
              <span className="ml-1 text-xs opacity-60">
                {c === "全部"
                  ? allQuotes.length
                  : allQuotes.filter((q) => q.collection === c).length}
              </span>
            </button>
          ))}
        </div>

        {/* Quote list */}
        <div className="space-y-3">
          {filtered.map((quote) => (
            <QuoteItem
              key={quote.id}
              quote={quote}
              isExpanded={expandedId === quote.id}
              onToggle={() =>
                setExpandedId(expandedId === quote.id ? null : quote.id)
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function QuoteItem({
  quote,
  isExpanded,
  onToggle,
}: {
  quote: Quote;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl bg-white p-5 shadow-sm cursor-pointer transition hover:shadow-md"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-wenkai text-base leading-relaxed text-stone-800 flex-1">
          {quote.original}
        </p>
        <span className="text-xs text-stone-300 shrink-0 mt-1">
          {quote.source.replace("菜根谭·", "")}
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-100">
          <p className="text-sm leading-relaxed text-stone-500">
            {quote.interpretation}
          </p>
        </div>
      )}
    </div>
  );
}
