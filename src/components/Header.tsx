"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="pt-12 pb-6 text-center">
      <h1 className="font-wenkai text-3xl font-bold tracking-wide text-stone-800">
        菜根谭
      </h1>
      <p className="mt-2 text-sm text-stone-400">
        说说你的心情，听一句古人的话
      </p>
      <Link
        href="/browse"
        className="mt-3 inline-block text-xs text-stone-300 hover:text-stone-500 transition"
      >
        浏览全部 →
      </Link>
    </header>
  );
}
