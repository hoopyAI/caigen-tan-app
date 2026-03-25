export interface Quote {
  id: number;
  collection: "前集" | "后集";
  original: string;
  interpretation: string;
  source: string;
}

export interface Favorite {
  quote: Quote;
  savedAt: string; // ISO date string
}
