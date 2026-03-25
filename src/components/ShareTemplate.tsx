"use client";

import { forwardRef } from "react";
import type { Quote } from "@/types";

interface ShareTemplateProps {
  quote: Quote;
  template: "ink" | "minimal" | "neo";
}

const templateStyles = {
  ink: {
    bg: "bg-amber-50",
    text: "text-stone-800",
    sub: "text-stone-500",
    source: "text-stone-400",
    accent: "border-l-2 border-stone-300 pl-4",
  },
  minimal: {
    bg: "bg-stone-900",
    text: "text-stone-100",
    sub: "text-stone-400",
    source: "text-stone-500",
    accent: "",
  },
  neo: {
    bg: "bg-gradient-to-br from-emerald-50 to-amber-50",
    text: "text-stone-800",
    sub: "text-stone-500",
    source: "text-stone-400",
    accent: "",
  },
};

const ShareTemplate = forwardRef<HTMLDivElement, ShareTemplateProps>(
  ({ quote, template }, ref) => {
    const styles = templateStyles[template];

    return (
      <div
        ref={ref}
        className={`flex flex-col justify-between ${styles.bg} p-10`}
        style={{ width: 600, height: 800 }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className={styles.accent}>
            <p
              className={`font-wenkai text-2xl leading-loose tracking-widest ${styles.text}`}
            >
              {quote.original}
            </p>
          </div>
          <p className={`mt-6 text-sm leading-relaxed ${styles.sub}`}>
            {quote.interpretation}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className={`text-xs ${styles.source}`}>—— {quote.source}</p>
          <p className={`text-xs ${styles.source}`}>菜根谭</p>
        </div>
      </div>
    );
  }
);

ShareTemplate.displayName = "ShareTemplate";

export default ShareTemplate;
