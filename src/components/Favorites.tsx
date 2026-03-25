"use client";

import { useState } from "react";
import type { Favorite } from "@/types";

interface FavoritesProps {
  favorites: Favorite[];
  onRemove: (quoteId: number) => void;
  onShare: (favorite: Favorite) => void;
}

export default function Favorites({
  favorites,
  onRemove,
  onShare,
}: FavoritesProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (favorites.length === 0) return null;

  return (
    <section className="mx-auto mt-12 max-w-md px-6 pb-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm text-stone-400 transition hover:text-stone-600"
      >
        <span>收藏 ({favorites.length})</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {favorites.map((fav) => (
            <div
              key={fav.quote.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              <p className="font-wenkai text-sm leading-relaxed text-stone-700">
                {fav.quote.original}
              </p>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => onShare(fav)}
                  className="text-xs text-stone-400 hover:text-stone-600"
                >
                  分享
                </button>
                <button
                  onClick={() => onRemove(fav.quote.id)}
                  className="text-xs text-stone-400 hover:text-red-400"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
