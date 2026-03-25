"use client";

interface ActionButtonsProps {
  onSave: () => void;
  onShare: () => void;
  isSaved: boolean;
}

export default function ActionButtons({
  onSave,
  onShare,
  isSaved,
}: ActionButtonsProps) {
  return (
    <div className="mx-auto mt-4 flex max-w-md justify-center gap-4 px-6">
      <button
        onClick={onSave}
        className={`rounded-lg px-5 py-2 text-sm transition ${
          isSaved
            ? "bg-stone-100 text-stone-400 cursor-default"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        }`}
        disabled={isSaved}
      >
        {isSaved ? "已收藏" : "收藏"}
      </button>
      <button
        onClick={onShare}
        className="rounded-lg bg-stone-100 px-5 py-2 text-sm text-stone-600 transition hover:bg-stone-200"
      >
        生成分享图
      </button>
    </div>
  );
}
