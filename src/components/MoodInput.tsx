"use client";

import { useState } from "react";

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading: boolean;
}

export default function MoodInput({ onSubmit, isLoading }: MoodInputProps) {
  const [mood, setMood] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim() && !isLoading) {
      onSubmit(mood.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md px-6">
      <textarea
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="说说你现在的心情…"
        rows={3}
        className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 font-wenkai text-base text-stone-700 placeholder-stone-300 shadow-sm transition focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300"
      />
      <button
        type="submit"
        disabled={!mood.trim() || isLoading}
        className="mt-3 w-full rounded-xl bg-stone-800 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "正在寻找…" : "寻一句话"}
      </button>
    </form>
  );
}
