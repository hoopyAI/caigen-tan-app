"use client";

import type { Quote } from "@/types";

interface QuoteCardProps {
  quote: Quote;
  isVisible: boolean;
}

export default function QuoteCard({ quote, isVisible }: QuoteCardProps) {
  return (
    <div
      className={`mx-auto max-w-md px-6 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <blockquote className="font-wenkai text-lg leading-relaxed text-stone-800 tracking-wide">
          {quote.original}
        </blockquote>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          {quote.interpretation}
        </p>
        <p className="mt-4 text-xs text-stone-300">
          —— {quote.source}
        </p>
      </div>
    </div>
  );
}
