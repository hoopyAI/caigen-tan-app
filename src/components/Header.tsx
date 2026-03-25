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
        className="mt-4 inline-block rounded-lg bg-stone-100 px-4 py-1.5 text-sm text-stone-500 hover:bg-stone-200 transition"
      >
        浏览全部菜根谭 →
      </Link>
    </header>
  );
}
