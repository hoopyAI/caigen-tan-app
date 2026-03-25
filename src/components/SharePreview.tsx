"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Quote } from "@/types";
import ShareTemplate, { type TemplateType } from "./ShareTemplate";
import { generateShareImage, downloadImage } from "@/lib/share";

interface SharePreviewProps {
  quote: Quote;
  onClose: () => void;
}

const templates: TemplateType[] = [
  "ink", "minimal", "neo", "mountain", "starfield", "redwall", "zen", "sunset", "porcelain",
];

const templateNames: Record<TemplateType, string> = {
  ink: "水墨",
  minimal: "深夜",
  neo: "新中式",
  mountain: "远山",
  starfield: "星河",
  redwall: "红墙",
  zen: "枯山水",
  sunset: "落霞",
  porcelain: "青花",
};

export default function SharePreview({ quote, onClose }: SharePreviewProps) {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("ink");
  const [isGenerating, setIsGenerating] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSave = async () => {
    if (!templateRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await generateShareImage(templateRef.current);
      downloadImage(dataUrl, `caigen-tan-${quote.id}-${activeTemplate}.png`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Template switcher — wrapping grid */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTemplate(t)}
              className={`rounded-lg px-3 py-1.5 text-xs transition ${
                activeTemplate === t
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {templateNames[t]}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="flex justify-center overflow-hidden rounded-xl" style={{ height: 400 }}>
          <div style={{ transform: "scale(0.5)", transformOrigin: "top center", width: 600, height: 800 }}>
            <ShareTemplate
              ref={templateRef}
              quote={quote}
              template={activeTemplate}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-stone-100 py-2.5 text-sm text-stone-500 transition hover:bg-stone-200"
          >
            关闭
          </button>
          <button
            onClick={handleSave}
            disabled={isGenerating}
            className="flex-1 rounded-xl bg-stone-800 py-2.5 text-sm text-white transition hover:bg-stone-700 disabled:opacity-40"
          >
            {isGenerating ? "生成中…" : "保存图片"}
          </button>
        </div>
      </div>
    </div>
  );
}
