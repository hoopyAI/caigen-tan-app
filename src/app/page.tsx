"use client";

import { useState, useEffect } from "react";
import type { Quote, Favorite } from "@/types";
import Header from "@/components/Header";
import MoodInput from "@/components/MoodInput";
import QuoteCard from "@/components/QuoteCard";
import ActionButtons from "@/components/ActionButtons";
import Favorites from "@/components/Favorites";
import SharePreview from "@/components/SharePreview";
import { getRandomQuote } from "@/lib/quotes";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorited,
} from "@/lib/favorites";

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [shareQuote, setShareQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load initial random quote and favorites
  useEffect(() => {
    const initial = getRandomQuote();
    setQuote(initial);
    setSaved(isFavorited(initial.id));
    setIsVisible(true);
    setFavorites(getFavorites());
  }, []);

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setIsVisible(false);
    setError(null);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();

      if (!res.ok || !data.quote) {
        setError(data.error || "匹配失败，请稍后再试");
        setIsVisible(true); // re-show previous quote
        return;
      }

      // Small delay for fade-out to complete
      setTimeout(() => {
        setQuote(data.quote);
        setSaved(isFavorited(data.quote.id));
        setIsVisible(true);
      }, 300);
    } catch (err) {
      console.error("Failed to match:", err);
      setError("网络错误，请检查连接后重试");
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (quote) {
      const updated = addFavorite(quote);
      setFavorites(updated);
      setSaved(true);
    }
  };

  const handleRemoveFavorite = (quoteId: number) => {
    const updated = removeFavorite(quoteId);
    setFavorites(updated);
    if (quote?.id === quoteId) setSaved(false);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />

      {error && (
        <div className="mx-auto mt-4 max-w-md px-6">
          <p className="text-center text-sm text-red-400">{error}</p>
        </div>
      )}

      {quote && (
        <>
          <div className="mt-8">
            <QuoteCard quote={quote} isVisible={isVisible} />
          </div>
          {isVisible && (
            <ActionButtons
              onSave={handleSave}
              onShare={() => setShareQuote(quote)}
              isSaved={saved}
            />
          )}
        </>
      )}

      <Favorites
        favorites={favorites}
        onRemove={handleRemoveFavorite}
        onShare={(fav) => setShareQuote(fav.quote)}
      />

      {shareQuote && (
        <SharePreview
          quote={shareQuote}
          onClose={() => setShareQuote(null)}
        />
      )}
    </main>
  );
}
