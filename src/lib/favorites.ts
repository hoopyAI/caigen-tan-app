import type { Quote, Favorite } from "@/types";

const STORAGE_KEY = "caigen-tan-favorites";

export function getFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addFavorite(quote: Quote): Favorite[] {
  const favorites = getFavorites();
  if (favorites.some((f) => f.quote.id === quote.id)) return favorites;
  const updated = [
    { quote, savedAt: new Date().toISOString() },
    ...favorites,
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function removeFavorite(quoteId: number): Favorite[] {
  const favorites = getFavorites().filter((f) => f.quote.id !== quoteId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorited(quoteId: number): boolean {
  return getFavorites().some((f) => f.quote.id === quoteId);
}
