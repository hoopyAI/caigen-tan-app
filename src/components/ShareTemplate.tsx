"use client";

import { forwardRef } from "react";
import type { Quote } from "@/types";

export type TemplateType = "ink" | "minimal" | "neo" | "mountain" | "starfield" | "redwall" | "zen" | "sunset" | "porcelain";

interface ShareTemplateProps {
  quote: Quote;
  template: TemplateType;
}

/* ===== Shared layers ===== */

/** SVG noise texture — adds tactile grain to any background */
const noiseOverlay = (opacity = 0.05) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px 256px",
    }}
  />
);

/** Vignette — darkens edges to focus attention on center */
const vignette = (color = "0,0,0", strength = 0.4) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(${color},${strength}) 100%)`,
    }}
  />
);

/** Frosted text panel — ensures readability over busy backgrounds */
const textPanel = (children: React.ReactNode, dark = false) => (
  <div
    style={{
      background: dark
        ? "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.55) 100%)"
        : "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.45) 100%)",
      padding: "40px 56px 48px",
      marginTop: "auto",
    }}
  >
    {children}
  </div>
);

/** Standard quote content block */
function QuoteContent({ quote, textColor, subColor, sourceColor }: {
  quote: Quote;
  textColor: string;
  subColor: string;
  sourceColor: string;
}) {
  return (
    <>
      <p
        style={{
          fontFamily: '"LXGW WenKai", serif',
          fontSize: 26,
          lineHeight: 2.2,
          letterSpacing: "0.1em",
          color: textColor,
          fontWeight: 400,
        }}
      >
        {quote.original}
      </p>
      <p
        style={{
          marginTop: 24,
          fontSize: 13,
          lineHeight: 2,
          color: subColor,
          letterSpacing: "0.04em",
        }}
      >
        {quote.interpretation}
      </p>
      <p style={{ marginTop: 20, fontSize: 11, color: sourceColor, letterSpacing: "0.06em" }}>
        —— {quote.source}
      </p>
    </>
  );
}

/* ===== Templates ===== */

/**
 * 水墨 — Layered ink wash with paper texture, bokeh ink drops, warm vignette
 */
function InkTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Base: warm paper gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #f5f0e8 0%, #e8dcc8 40%, #ddd0b8 70%, #e8dfc8 100%)" }} />
      {/* Ink wash blobs — multiple soft radial gradients */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 75% 15%, rgba(80,65,45,0.12) 0%, transparent 45%), radial-gradient(ellipse at 15% 80%, rgba(60,50,35,0.1) 0%, transparent 40%), radial-gradient(ellipse at 55% 50%, rgba(90,75,55,0.05) 0%, transparent 50%)" }} />
      {/* Ink splash spots */}
      <div style={{ position: "absolute", top: 120, right: 80, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, rgba(70,55,35,0.1) 0%, rgba(70,55,35,0.04) 40%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 200, left: 60, width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle, rgba(70,55,35,0.08) 0%, transparent 60%)" }} />
      {/* Paper grain */}
      {noiseOverlay(0.06)}
      {/* Warm vignette */}
      {vignette("60,45,25", 0.15)}
      {/* Thin vertical ink line */}
      <div style={{ position: "absolute", left: 56, top: 100, bottom: 100, width: 1, background: "linear-gradient(to bottom, transparent, rgba(80,60,40,0.25) 20%, rgba(80,60,40,0.25) 80%, transparent)" }} />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "64px 56px 48px 80px" }}>
        <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 14, color: "#c4b8a8", letterSpacing: "0.2em" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <QuoteContent quote={quote} textColor="#3a3020" subColor="#7a6e5e" sourceColor="#b0a490" />
        </div>
      </div>
    </div>
  );
}

/**
 * 深夜 — Deep black with warm bokeh light spots, cinematic grain
 */
function MinimalTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Base: deep black with warm color shifts */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #080808 0%, #0e0c0a 30%, #12100d 60%, #0a0908 100%)" }} />
      {/* Warm bokeh lights */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(180,140,80,0.06) 0%, transparent 35%), radial-gradient(circle at 70% 75%, rgba(160,120,70,0.05) 0%, transparent 30%), radial-gradient(circle at 85% 30%, rgba(200,160,100,0.04) 0%, transparent 25%)" }} />
      {/* Subtle bokeh circles */}
      <div style={{ position: "absolute", top: "15%", left: "20%", width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(180,150,100,0.04)" }} />
      <div style={{ position: "absolute", top: "60%", right: "15%", width: 70, height: 70, borderRadius: "50%", border: "1px solid rgba(180,150,100,0.03)" }} />
      <div style={{ position: "absolute", top: "40%", left: "60%", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(180,150,100,0.05)" }} />
      {/* Film grain */}
      {noiseOverlay(0.08)}
      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 52, left: 52, right: 52, height: 1, background: "linear-gradient(to right, rgba(180,150,100,0.25), transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: 52, left: 52, right: 52, height: 1, background: "linear-gradient(to left, rgba(180,150,100,0.25), transparent 60%)" }} />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "76px 56px 64px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "rgba(180,150,100,0.4)" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <QuoteContent quote={quote} textColor="#e8dcc8" subColor="rgba(180,160,120,0.5)" sourceColor="rgba(180,150,100,0.3)" />
        </div>
      </div>
    </div>
  );
}

/**
 * 新中式 — Muted green tones, layered abstract mountain shapes, organic texture
 */
function NeoTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Base gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, #eae8e0 0%, #ddd8cc 40%, #d5cfc0 70%, #e0dbd0 100%)" }} />
      {/* Color washes */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 70%, rgba(92,107,76,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120,110,80,0.06) 0%, transparent 40%)" }} />
      {/* Abstract mountain layers */}
      <svg viewBox="0 0 600 800" style={{ position: "absolute", inset: 0, width: 600, height: 800 }}>
        <polygon points="0,800 0,520 100,480 200,500 300,440 400,470 500,420 600,460 600,800" fill="#b5ad98" opacity="0.08" />
        <polygon points="0,800 0,580 80,540 200,560 320,500 440,540 560,490 600,520 600,800" fill="#9a9480" opacity="0.1" />
        <polygon points="0,800 0,640 120,600 250,620 380,570 500,610 600,580 600,800" fill="#807a68" opacity="0.08" />
      </svg>
      {/* Noise */}
      {noiseOverlay(0.04)}
      {/* Soft vignette */}
      {vignette("60,55,40", 0.1)}
      {/* Corner accents */}
      <svg viewBox="0 0 60 60" style={{ position: "absolute", top: 36, right: 36, width: 36, height: 36, opacity: 0.2 }}>
        <line x1="0" y1="0" x2="60" y2="0" stroke="#6b7a60" strokeWidth="1.5" />
        <line x1="60" y1="0" x2="60" y2="60" stroke="#6b7a60" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 60 60" style={{ position: "absolute", bottom: 36, left: 36, width: 36, height: 36, opacity: 0.2 }}>
        <line x1="0" y1="60" x2="0" y2="0" stroke="#6b7a60" strokeWidth="1.5" />
        <line x1="0" y1="60" x2="60" y2="60" stroke="#6b7a60" strokeWidth="1.5" />
      </svg>
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "64px 56px 52px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 20, height: 1, background: "rgba(92,107,76,0.4)" }} />
          <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(92,107,76,0.5)" }}>菜根谭</p>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8px" }}>
          <QuoteContent quote={quote} textColor="#36362e" subColor="#7a7568" sourceColor="#a8a290" />
        </div>
      </div>
    </div>
  );
}

/**
 * 远山 — Rich layered mountains with mist, atmospheric depth, god rays
 */
function MountainTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Sky gradient — rich blue to warm horizon */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #4a6070 0%, #7a90a0 25%, #a0b0b8 40%, #c8d0d0 55%, #d8dcd4 70%, #c0c8c0 100%)" }} />
      {/* Sun glow at horizon */}
      <div style={{ position: "absolute", top: "35%", left: "30%", width: 300, height: 200, background: "radial-gradient(ellipse, rgba(240,220,180,0.15) 0%, transparent 60%)" }} />
      {/* God rays */}
      <div style={{ position: "absolute", top: 0, left: "25%", width: 200, height: "70%", background: "linear-gradient(175deg, transparent 0%, rgba(255,255,255,0.04) 30%, transparent 60%)", transform: "skewX(-5deg)" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", width: 150, height: "65%", background: "linear-gradient(172deg, transparent 0%, rgba(255,255,255,0.03) 35%, transparent 55%)", transform: "skewX(3deg)" }} />
      {/* Mountain layers */}
      <svg viewBox="0 0 600 400" style={{ position: "absolute", bottom: 0, left: 0, width: 600, height: 400 }}>
        <polygon points="0,400 0,200 60,160 150,190 240,120 330,160 420,90 510,140 600,100 600,400" fill="#6a8090" opacity="0.3" />
        <polygon points="0,400 0,240 80,200 180,220 280,150 380,190 480,120 580,170 600,150 600,400" fill="#506878" opacity="0.4" />
        <polygon points="0,400 0,280 100,240 220,260 340,190 440,230 540,170 600,200 600,400" fill="#3a5260" opacity="0.55" />
        <polygon points="0,400 0,320 120,280 250,300 370,250 470,280 570,240 600,260 600,400" fill="#2a3e4a" opacity="0.7" />
      </svg>
      {/* Mist layers */}
      <div style={{ position: "absolute", top: "42%", left: 0, right: 0, height: 80, background: "linear-gradient(180deg, transparent, rgba(200,210,210,0.3) 40%, rgba(200,210,210,0.3) 60%, transparent)" }} />
      <div style={{ position: "absolute", top: "55%", left: 0, right: 0, height: 50, background: "linear-gradient(180deg, transparent, rgba(180,195,195,0.2) 50%, transparent)" }} />
      {/* Noise */}
      {noiseOverlay(0.04)}
      {/* Vignette */}
      {vignette("20,30,40", 0.25)}
      {/* Content — top area above mountains */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "56px 52px 48px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>菜根谭</p>
        <div style={{ marginTop: 24, maxHeight: "48%" }}>
          <QuoteContent quote={quote} textColor="rgba(255,255,255,0.92)" subColor="rgba(255,255,255,0.5)" sourceColor="rgba(255,255,255,0.3)" />
        </div>
      </div>
    </div>
  );
}

/**
 * 星河 — Deep indigo night sky with star field, nebula glow, bokeh
 */
function StarfieldTemplate({ quote }: { quote: Quote }) {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 137.5 + (quote.id * 17)) % 600),
    y: ((i * 97.3 + (quote.id * 31)) % 800),
    size: (i % 5 === 0) ? 2.5 : (i % 3 === 0) ? 1.5 : 1,
    opacity: 0.2 + (i % 7) * 0.06,
  }));

  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Deep space gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #06081a 0%, #0c1228 25%, #141e38 50%, #0e1628 75%, #080c1e 100%)" }} />
      {/* Nebula color washes */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 30%, rgba(80,60,140,0.12) 0%, transparent 45%), radial-gradient(ellipse at 75% 65%, rgba(60,100,160,0.1) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(120,80,60,0.08) 0%, transparent 35%)" }} />
      {/* Milky way band */}
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "120%", height: "30%", background: "linear-gradient(160deg, transparent 20%, rgba(150,140,180,0.04) 40%, rgba(180,170,200,0.06) 50%, rgba(150,140,180,0.04) 60%, transparent 80%)", transform: "rotate(-15deg)" }} />
      {/* Stars */}
      {stars.map((star, i) => (
        <div key={i} style={{ position: "absolute", left: star.x, top: star.y, width: star.size, height: star.size, borderRadius: "50%", background: `rgba(220,215,200,${star.opacity})`, boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px rgba(220,215,200,${star.opacity * 0.5})` : "none" }} />
      ))}
      {/* Noise */}
      {noiseOverlay(0.06)}
      {/* Vignette */}
      {vignette("0,0,10", 0.4)}
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "68px 56px 56px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "rgba(200,190,170,0.3)" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <QuoteContent quote={quote} textColor="rgba(230,225,210,0.9)" subColor="rgba(180,175,160,0.45)" sourceColor="rgba(180,175,160,0.25)" />
        </div>
      </div>
    </div>
  );
}

/**
 * 红墙 — Forbidden City vermilion with gold, rich texture, double frame
 */
function RedWallTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Rich vermilion base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, #7a2525 0%, #8a2a2a 20%, #6e1e1e 50%, #5a1818 80%, #4a1212 100%)" }} />
      {/* Color depth layers */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 30%, rgba(180,80,60,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(120,40,30,0.1) 0%, transparent 45%)" }} />
      {/* Wall texture — heavy grain */}
      {noiseOverlay(0.08)}
      {/* Warm vignette */}
      {vignette("30,8,5", 0.35)}
      {/* Gold double frame */}
      <div style={{ position: "absolute", top: 36, left: 36, right: 36, bottom: 36, border: "1px solid rgba(210,180,110,0.2)" }} />
      <div style={{ position: "absolute", top: 44, left: 44, right: 44, bottom: 44, border: "1px solid rgba(210,180,110,0.1)" }} />
      {/* Gold corner ornaments */}
      {[[32, 32, "top", "left"], [32, 32, "top", "right"], [32, 32, "bottom", "left"], [32, 32, "bottom", "right"]].map(([v, h, vert, horiz], i) => (
        <div key={i} style={{ position: "absolute", [vert as string]: v, [horiz as string]: h, width: 16, height: 16, borderTop: (vert === "top") ? "2px solid rgba(210,180,110,0.35)" : "none", borderBottom: (vert === "bottom") ? "2px solid rgba(210,180,110,0.35)" : "none", borderLeft: (horiz === "left") ? "2px solid rgba(210,180,110,0.35)" : "none", borderRight: (horiz === "right") ? "2px solid rgba(210,180,110,0.35)" : "none" } as React.CSSProperties} />
      ))}
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "76px 68px 60px", textAlign: "center" }}>
        <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 13, letterSpacing: "0.3em", color: "rgba(210,180,110,0.45)" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 26, lineHeight: 2.2, letterSpacing: "0.12em", color: "#f0e2c8", fontWeight: 400 }}>{quote.original}</p>
          <div style={{ marginTop: 24, width: 50, height: 1, background: "rgba(210,180,110,0.25)" }} />
          <p style={{ marginTop: 20, fontSize: 13, lineHeight: 2, color: "rgba(210,180,110,0.4)", letterSpacing: "0.04em" }}>{quote.interpretation}</p>
          <p style={{ marginTop: 20, fontSize: 11, color: "rgba(210,180,110,0.25)", letterSpacing: "0.06em" }}>{quote.source}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 枯山水 — Raked sand with concentric arcs, stone, horizontal lines, warm cream
 */
function ZenTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Warm cream base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(175deg, #f0ece2 0%, #e8e2d5 30%, #e0d8c8 60%, #e8e2d6 100%)" }} />
      {/* Warmth wash */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(180,160,120,0.06) 0%, transparent 50%)" }} />
      {/* Sand texture — heavier noise */}
      {noiseOverlay(0.07)}
      {/* Zen patterns */}
      <svg viewBox="0 0 600 800" style={{ position: "absolute", inset: 0, width: 600, height: 800 }}>
        {/* Concentric arcs around stone — bottom right */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <circle key={`a-${i}`} cx="500" cy="680" r={50 + i * 30} fill="none" stroke="#c0b8a8" strokeWidth="1" opacity={0.15 - i * 0.012} />
        ))}
        <circle cx="500" cy="680" r="12" fill="#c8c0b0" opacity="0.15" />
        <circle cx="500" cy="680" r="5" fill="#b8b0a0" opacity="0.2" />
        {/* Second smaller stone cluster — left side */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={`b-${i}`} cx="80" cy="600" r={20 + i * 22} fill="none" stroke="#c0b8a8" strokeWidth="0.8" opacity={0.1 - i * 0.015} />
        ))}
        <circle cx="80" cy="600" r="6" fill="#c0b8a8" opacity="0.15" />
        {/* Horizontal rake lines — top area */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`l-${i}`} x1="0" y1={80 + i * 12} x2="600" y2={80 + i * 12} stroke="#c0b8a8" strokeWidth="0.6" opacity={0.1} />
        ))}
      </svg>
      {/* Soft vignette */}
      {vignette("80,70,50", 0.08)}
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "68px 56px 52px" }}>
        <div />
        <div style={{ maxWidth: 430 }}>
          <QuoteContent quote={quote} textColor="#40392e" subColor="#8a8278" sourceColor="#b8b0a0" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 13, color: "#c0b8a8", letterSpacing: "0.2em" }}>菜根谭</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 落霞 — Multi-stop sunset sky with cloud wisps, warm bokeh, horizon glow
 */
function SunsetTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Rich sunset gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #1e1535 0%, #3a2050 10%, #6a3060 22%, #a04858 35%, #cc6848 48%, #e09050 58%, #e8b868 68%, #f0d488 78%, #e8c870 88%, #d4a850 100%)" }} />
      {/* Sun glow */}
      <div style={{ position: "absolute", top: "50%", left: "40%", width: 300, height: 200, background: "radial-gradient(ellipse, rgba(255,220,140,0.2) 0%, rgba(255,180,100,0.1) 30%, transparent 60%)" }} />
      {/* Cloud wisps */}
      <div style={{ position: "absolute", top: "18%", left: 0, right: 0, height: 4, background: "linear-gradient(to right, transparent 5%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.06) 60%, transparent 80%)" }} />
      <div style={{ position: "absolute", top: "22%", left: 0, right: 0, height: 2, background: "linear-gradient(to right, transparent 15%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.08) 55%, transparent 75%)" }} />
      <div style={{ position: "absolute", top: "38%", left: 0, right: 0, height: 3, background: "linear-gradient(to right, transparent 25%, rgba(255,200,150,0.06) 45%, rgba(255,200,150,0.08) 60%, transparent 85%)" }} />
      {/* Warm bokeh */}
      <div style={{ position: "absolute", top: "30%", left: "15%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,200,120,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: "45%", right: "20%", width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,180,100,0.05) 0%, transparent 70%)" }} />
      {/* Noise */}
      {noiseOverlay(0.05)}
      {/* Vignette */}
      {vignette("15,10,25", 0.3)}
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "64px 56px 52px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "rgba(255,255,255,0.3)" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <QuoteContent quote={quote} textColor="rgba(255,255,255,0.92)" subColor="rgba(255,240,220,0.45)" sourceColor="rgba(255,240,220,0.28)" />
        </div>
      </div>
    </div>
  );
}

/**
 * 青花 — Blue-and-white porcelain with floral motifs, clean off-white, cobalt accents
 */
function PorcelainTemplate({ quote }: { quote: Quote }) {
  return (
    <div style={{ width: 600, height: 800, position: "relative", overflow: "hidden" }}>
      {/* Off-white porcelain base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #f8f9fc 0%, #f0f2f8 30%, #eaecf4 60%, #f2f4f8 100%)" }} />
      {/* Subtle blue wash */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 20%, rgba(43,80,160,0.04) 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(43,80,160,0.03) 0%, transparent 35%)" }} />
      {/* Porcelain glaze texture */}
      {noiseOverlay(0.03)}
      {/* Floral corner patterns */}
      <svg viewBox="0 0 200 200" style={{ position: "absolute", top: 20, left: 20, width: 120, height: 120, opacity: 0.08 }}>
        <circle cx="0" cy="0" r="60" fill="none" stroke="#2b5ea7" strokeWidth="1" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="150" fill="none" stroke="#2b5ea7" strokeWidth="0.3" />
        <ellipse cx="40" cy="15" rx="18" ry="8" fill="none" stroke="#2b5ea7" strokeWidth="1" transform="rotate(20,40,15)" />
        <ellipse cx="15" cy="40" rx="18" ry="8" fill="none" stroke="#2b5ea7" strokeWidth="1" transform="rotate(70,15,40)" />
        <ellipse cx="50" cy="50" rx="12" ry="5" fill="#2b5ea7" opacity="0.3" transform="rotate(45,50,50)" />
      </svg>
      <svg viewBox="0 0 200 200" style={{ position: "absolute", bottom: 20, right: 20, width: 120, height: 120, opacity: 0.08, transform: "rotate(180deg)" }}>
        <circle cx="0" cy="0" r="60" fill="none" stroke="#2b5ea7" strokeWidth="1" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="150" fill="none" stroke="#2b5ea7" strokeWidth="0.3" />
        <ellipse cx="40" cy="15" rx="18" ry="8" fill="none" stroke="#2b5ea7" strokeWidth="1" transform="rotate(20,40,15)" />
        <ellipse cx="15" cy="40" rx="18" ry="8" fill="none" stroke="#2b5ea7" strokeWidth="1" transform="rotate(70,15,40)" />
        <ellipse cx="50" cy="50" rx="12" ry="5" fill="#2b5ea7" opacity="0.3" transform="rotate(45,50,50)" />
      </svg>
      {/* Thin blue frame */}
      <div style={{ position: "absolute", top: 28, left: 28, right: 28, bottom: 28, border: "1px solid rgba(43,94,167,0.08)" }} />
      {/* Top decorative element */}
      <div style={{ position: "absolute", top: 26, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 40, height: 1, background: "rgba(43,94,167,0.12)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(43,94,167,0.15)" }} />
        <div style={{ width: 40, height: 1, background: "rgba(43,94,167,0.12)" }} />
      </div>
      {/* Vignette */}
      {vignette("30,40,80", 0.06)}
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "68px 60px 52px", textAlign: "center" }}>
        <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 13, letterSpacing: "0.3em", color: "rgba(43,94,167,0.35)" }}>菜根谭</p>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: '"LXGW WenKai", serif', fontSize: 26, lineHeight: 2.2, letterSpacing: "0.1em", color: "#2a3a55", fontWeight: 400 }}>{quote.original}</p>
          <p style={{ marginTop: 24, fontSize: 13, lineHeight: 2, color: "#6a7a90", letterSpacing: "0.04em" }}>{quote.interpretation}</p>
          <p style={{ marginTop: 20, fontSize: 11, color: "rgba(43,94,167,0.28)", letterSpacing: "0.06em" }}>{quote.source}</p>
        </div>
      </div>
    </div>
  );
}

/* ===== Main component ===== */

const ShareTemplate = forwardRef<HTMLDivElement, ShareTemplateProps>(
  ({ quote, template }, ref) => {
    return (
      <div ref={ref}>
        {template === "ink" && <InkTemplate quote={quote} />}
        {template === "minimal" && <MinimalTemplate quote={quote} />}
        {template === "neo" && <NeoTemplate quote={quote} />}
        {template === "mountain" && <MountainTemplate quote={quote} />}
        {template === "starfield" && <StarfieldTemplate quote={quote} />}
        {template === "redwall" && <RedWallTemplate quote={quote} />}
        {template === "zen" && <ZenTemplate quote={quote} />}
        {template === "sunset" && <SunsetTemplate quote={quote} />}
        {template === "porcelain" && <PorcelainTemplate quote={quote} />}
      </div>
    );
  }
);

ShareTemplate.displayName = "ShareTemplate";

export default ShareTemplate;
