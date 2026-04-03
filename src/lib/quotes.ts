import quotesData from "@/data/caigen-tan.json";
import type { Quote } from "@/types";

const quotes: Quote[] = quotesData as Quote[];

export function getAllQuotes(): Quote[] {
  return quotes;
}

export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

export function getQuoteById(id: number): Quote | undefined {
  return quotes.find((q) => q.id === id);
}

export function getQuotesFormatted(): string {
  const shuffled = [...quotes].sort(() => Math.random() - 0.5);
  return shuffled
    .map((q) => `[ID:${q.id}] ${q.original}`)
    .join("\n");
}
