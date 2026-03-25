"use client";

import { forwardRef } from "react";
import type { Quote } from "@/types";

export type TemplateType = "ink" | "minimal" | "neo" | "mountain" | "starfield" | "redwall" | "zen" | "sunset" | "porcelain";

interface ShareTemplateProps {
  quote: Quote;
  template: TemplateType;
}

/**
 * Ink Wash (水墨) — Warm xuan paper texture with ink wash aesthetic.
 * Uses radial gradients to simulate paper aging and ink diffusion.
 */
function InkTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(170deg, #f5f0e8 0%, #ebe4d4 40%, #e8dcc8 70%, #f2ece0 100%)",
      }}
    >
      {/* Paper texture grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ink wash decorative circle — top right */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,100,80,0.08) 0%, rgba(120,100,80,0.03) 50%, transparent 70%)",
        }}
      />

      {/* Ink wash decorative circle — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,85,65,0.06) 0%, rgba(100,85,65,0.02) 50%, transparent 70%)",
        }}
      />

      {/* Thin vertical line accent */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 120,
          bottom: 120,
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(100,80,60,0.2) 20%, rgba(100,80,60,0.2) 80%, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "64px 60px 48px 88px",
        }}
      >
        {/* Quote area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.12em",
              color: "#3d3528",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              lineHeight: 2,
              color: "#8a7e6e",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ fontSize: 11, color: "#b5a998", letterSpacing: "0.06em" }}>
            —— {quote.source}
          </p>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 14,
              color: "#c4b8a8",
              letterSpacing: "0.2em",
            }}
          >
            菜根谭
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal Dark (深夜) — OLED-grade deep black with refined typography.
 * High contrast, elegant gold accent, cinematic feel.
 */
function MinimalTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(175deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)",
      }}
    >
      {/* Subtle warm gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 20%, rgba(180,160,120,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Top decorative line */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 56,
          right: 56,
          height: 1,
          background: "linear-gradient(to right, rgba(180,160,120,0.3), rgba(180,160,120,0.08) 50%, transparent)",
        }}
      />

      {/* Bottom decorative line */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 56,
          right: 56,
          height: 1,
          background: "linear-gradient(to left, rgba(180,160,120,0.3), rgba(180,160,120,0.08) 50%, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "80px 56px 64px",
        }}
      >
        {/* Small label */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(180,160,120,0.5)",
          }}
        >
          菜根谭
        </p>

        {/* Quote area — centered */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 28,
              lineHeight: 2.2,
              letterSpacing: "0.1em",
              color: "#e8e0d4",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <div
            style={{
              marginTop: 28,
              width: 40,
              height: 1,
              background: "rgba(180,160,120,0.3)",
            }}
          />
          <p
            style={{
              marginTop: 24,
              fontSize: 13,
              lineHeight: 2,
              color: "rgba(180,160,120,0.5)",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 11, color: "rgba(180,160,120,0.3)", letterSpacing: "0.06em", textAlign: "right" }}>
          {quote.source}
        </p>
      </div>
    </div>
  );
}

/**
 * Neo-Chinese (新中式) — Contemporary take on Chinese aesthetics.
 * Muted sage green with geometric mountain motifs and refined spacing.
 */
function NeoTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(165deg, #f7f6f2 0%, #f0ede6 40%, #eae7df 100%)",
      }}
    >
      {/* Geometric mountain silhouette — bottom */}
      <svg
        viewBox="0 0 600 200"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 600,
          height: 200,
          opacity: 0.05,
        }}
      >
        <polygon points="0,200 80,80 160,140 250,50 340,120 420,60 500,110 600,30 600,200" fill="#5c6b56" />
        <polygon points="0,200 100,120 200,160 300,90 400,140 500,80 600,130 600,200" fill="#5c6b56" opacity="0.6" />
      </svg>

      {/* Decorative corner — top right */}
      <svg
        viewBox="0 0 80 80"
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 48,
          height: 48,
          opacity: 0.15,
        }}
      >
        <line x1="0" y1="0" x2="80" y2="0" stroke="#5c6b56" strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="80" stroke="#5c6b56" strokeWidth="1" />
        <circle cx="80" cy="0" r="4" fill="none" stroke="#5c6b56" strokeWidth="1" />
      </svg>

      {/* Decorative corner — bottom left */}
      <svg
        viewBox="0 0 80 80"
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 48,
          height: 48,
          opacity: 0.15,
        }}
      >
        <line x1="0" y1="80" x2="0" y2="0" stroke="#5c6b56" strokeWidth="1" />
        <line x1="0" y1="80" x2="80" y2="80" stroke="#5c6b56" strokeWidth="1" />
        <circle cx="0" cy="80" r="4" fill="none" stroke="#5c6b56" strokeWidth="1" />
      </svg>

      {/* Sage green accent dot */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 56,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(92,107,86,0.25)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "72px 56px 56px",
        }}
      >
        {/* Top label with sage accent */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 20, height: 1, background: "rgba(92,107,86,0.4)" }} />
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(92,107,86,0.5)",
            }}
          >
            菜根谭
          </p>
        </div>

        {/* Quote area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 8, paddingRight: 8 }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.1em",
              color: "#3a3a32",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              lineHeight: 2,
              color: "#8a8578",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          <p style={{ fontSize: 11, color: "#b0aa9c", letterSpacing: "0.06em" }}>
            {quote.source}
          </p>
          <div style={{ width: 20, height: 1, background: "rgba(92,107,86,0.3)" }} />
        </div>
      </div>
    </div>
  );
}

/**
 * Mountain (远山) — Layered mountain silhouettes with mist gradients.
 * 3-4 layers from dark foreground to light background, like a minimal landscape painting.
 */
function MountainTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #d4dbe0 0%, #c8d0d8 30%, #b8c4ce 60%, #a8b8c6 100%)",
      }}
    >
      {/* Mist layer */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(180deg, transparent, rgba(210,218,224,0.6) 40%, rgba(210,218,224,0.6) 60%, transparent)",
        }}
      />

      {/* Mountain layer 4 — furthest, lightest */}
      <svg viewBox="0 0 600 300" style={{ position: "absolute", bottom: 0, left: 0, width: 600, height: 300 }}>
        <polygon points="0,300 0,180 60,140 150,170 220,100 300,130 380,80 460,120 540,90 600,110 600,300" fill="#8a9caa" opacity="0.3" />
      </svg>

      {/* Mountain layer 3 */}
      <svg viewBox="0 0 600 250" style={{ position: "absolute", bottom: 0, left: 0, width: 600, height: 250 }}>
        <polygon points="0,250 0,160 80,120 170,150 260,80 350,110 450,60 530,100 600,70 600,250" fill="#6b7f8e" opacity="0.4" />
      </svg>

      {/* Mountain layer 2 */}
      <svg viewBox="0 0 600 200" style={{ position: "absolute", bottom: 0, left: 0, width: 600, height: 200 }}>
        <polygon points="0,200 0,130 100,90 200,120 280,60 380,100 480,50 560,80 600,60 600,200" fill="#4d6272" opacity="0.5" />
      </svg>

      {/* Mountain layer 1 — nearest, darkest */}
      <svg viewBox="0 0 600 150" style={{ position: "absolute", bottom: 0, left: 0, width: 600, height: 150 }}>
        <polygon points="0,150 0,100 80,70 180,90 270,40 370,80 470,30 560,60 600,40 600,150" fill="#3a4f5e" opacity="0.6" />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "64px 56px 48px",
        }}
      >
        <div style={{ maxHeight: "55%" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.1em",
              color: "#2a3a45",
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
              color: "#5a6a76",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <div style={{ flex: 1 }} />

        <p style={{ fontSize: 11, color: "rgba(42,58,69,0.4)", letterSpacing: "0.06em" }}>
          —— {quote.source}
        </p>
      </div>
    </div>
  );
}

/**
 * Starfield (星河) — Deep indigo with scattered star dots.
 * Contemplative night sky feel, warm gold text.
 */
function StarfieldTemplate({ quote }: { quote: Quote }) {
  // Generate deterministic star positions from quote id
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: ((i * 137.5 + (quote.id * 17)) % 600),
    y: ((i * 97.3 + (quote.id * 31)) % 800),
    size: (i % 3 === 0) ? 2 : 1,
    opacity: 0.15 + (i % 5) * 0.08,
  }));

  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(170deg, #0c1220 0%, #141e30 30%, #1a2640 60%, #0f1825 100%)",
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: `rgba(220,210,180,${star.opacity})`,
          }}
        />
      ))}

      {/* Nebula glow — top */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -50,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,100,160,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Nebula glow — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,90,60,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "72px 56px 56px",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(200,185,150,0.35)",
          }}
        >
          菜根谭
        </p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.12em",
              color: "#d8d0c0",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <div style={{ marginTop: 28, width: 30, height: 1, background: "rgba(200,185,150,0.2)" }} />
          <p
            style={{
              marginTop: 24,
              fontSize: 13,
              lineHeight: 2,
              color: "rgba(180,170,150,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <p style={{ fontSize: 11, color: "rgba(200,185,150,0.25)", letterSpacing: "0.06em", textAlign: "right" }}>
          {quote.source}
        </p>
      </div>
    </div>
  );
}

/**
 * Red Wall (红墙) — Forbidden City inspiration.
 * Deep vermilion with gold accents and dark ornamental textures.
 */
function RedWallTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(175deg, #6b1a1a 0%, #7a2020 30%, #6e1c1c 60%, #5a1515 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gold border frame */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
          border: "1px solid rgba(200,170,100,0.2)",
        }}
      />

      {/* Inner frame */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 48,
          right: 48,
          bottom: 48,
          border: "1px solid rgba(200,170,100,0.08)",
        }}
      />

      {/* Gold corner ornaments */}
      {[
        { top: 36, left: 36 },
        { top: 36, right: 36 },
        { bottom: 36, left: 36 },
        { bottom: 36, right: 36 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 12,
            height: 12,
            borderTop: i < 2 ? "2px solid rgba(200,170,100,0.35)" : "none",
            borderBottom: i >= 2 ? "2px solid rgba(200,170,100,0.35)" : "none",
            borderLeft: i % 2 === 0 ? "2px solid rgba(200,170,100,0.35)" : "none",
            borderRight: i % 2 === 1 ? "2px solid rgba(200,170,100,0.35)" : "none",
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "80px 72px 64px",
        }}
      >
        <p
          style={{
            fontFamily: '"LXGW WenKai", serif',
            fontSize: 13,
            letterSpacing: "0.3em",
            color: "rgba(200,170,100,0.5)",
            textAlign: "center",
          }}
        >
          菜根谭
        </p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.12em",
              color: "#f0e6d0",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {quote.original}
          </p>
          <div style={{ marginTop: 28, marginLeft: "auto", marginRight: "auto", width: 50, height: 1, background: "rgba(200,170,100,0.25)" }} />
          <p
            style={{
              marginTop: 24,
              fontSize: 13,
              lineHeight: 2,
              color: "rgba(200,170,100,0.45)",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <p style={{ fontSize: 11, color: "rgba(200,170,100,0.3)", letterSpacing: "0.06em", textAlign: "center" }}>
          {quote.source}
        </p>
      </div>
    </div>
  );
}

/**
 * Zen Garden (枯山水) — Concentric arc patterns simulating raked sand.
 * Light grey/cream with minimal line work.
 */
function ZenTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f5f3ee 0%, #edeae3 50%, #f0ede6 100%)",
      }}
    >
      {/* Zen sand arc patterns */}
      <svg viewBox="0 0 600 800" style={{ position: "absolute", inset: 0, width: 600, height: 800 }}>
        {/* Concentric arcs — bottom right cluster */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle
            key={`br-${i}`}
            cx="520"
            cy="700"
            r={60 + i * 28}
            fill="none"
            stroke="#c8c0b4"
            strokeWidth="0.8"
            opacity={0.2 - i * 0.02}
          />
        ))}
        {/* Stone — a small filled circle */}
        <circle cx="520" cy="700" r="8" fill="#c8c0b4" opacity="0.15" />

        {/* Parallel horizontal lines — top area */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`line-${i}`}
            x1="0"
            y1={100 + i * 14}
            x2="600"
            y2={100 + i * 14}
            stroke="#c8c0b4"
            strokeWidth="0.5"
            opacity={0.12}
          />
        ))}
      </svg>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "72px 56px 56px",
        }}
      >
        <div />

        <div style={{ maxWidth: 440 }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.4,
              letterSpacing: "0.1em",
              color: "#4a4540",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              lineHeight: 2,
              color: "#9a9488",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ fontSize: 11, color: "#c0b8ac", letterSpacing: "0.06em" }}>
            —— {quote.source}
          </p>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 13,
              color: "#c8c0b4",
              letterSpacing: "0.2em",
            }}
          >
            菜根谭
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Sunset (落霞) — Multi-stop gradient from deep purple to warm gold.
 * Warm, healing, cinematic sky feel.
 */
function SunsetTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #2d1b4e 0%, #5a3066 15%, #8b4068 30%, #c4705a 50%, #e0a050 70%, #e8c878 85%, #f0dca0 100%)",
      }}
    >
      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "-10%",
          right: "-10%",
          height: 200,
          background: "radial-gradient(ellipse at 50% 50%, rgba(240,200,100,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Cloud wisps */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(to right, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 90%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "24%",
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent 20%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 60%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "72px 56px 56px",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          菜根谭
        </p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <p
            style={{
              marginTop: 28,
              fontSize: 13,
              lineHeight: 2,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textAlign: "right" }}>
          {quote.source}
        </p>
      </div>
    </div>
  );
}

/**
 * Blue Porcelain (青花) — White base with cobalt blue geometric floral motifs.
 * Classical but not old-fashioned.
 */
function PorcelainTemplate({ quote }: { quote: Quote }) {
  return (
    <div
      style={{
        width: 600,
        height: 800,
        position: "relative",
        overflow: "hidden",
        background: "#fafbfd",
      }}
    >
      {/* Corner floral pattern — top left */}
      <svg viewBox="0 0 120 120" style={{ position: "absolute", top: 32, left: 32, width: 80, height: 80, opacity: 0.12 }}>
        <circle cx="0" cy="0" r="40" fill="none" stroke="#2b5ea7" strokeWidth="1" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="80" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="120" y2="120" stroke="#2b5ea7" strokeWidth="0.5" />
        {/* Petal shapes */}
        <ellipse cx="30" cy="10" rx="12" ry="5" fill="none" stroke="#2b5ea7" strokeWidth="0.8" transform="rotate(20,30,10)" />
        <ellipse cx="10" cy="30" rx="12" ry="5" fill="none" stroke="#2b5ea7" strokeWidth="0.8" transform="rotate(70,10,30)" />
      </svg>

      {/* Corner floral pattern — bottom right */}
      <svg viewBox="0 0 120 120" style={{ position: "absolute", bottom: 32, right: 32, width: 80, height: 80, opacity: 0.12, transform: "rotate(180deg)" }}>
        <circle cx="0" cy="0" r="40" fill="none" stroke="#2b5ea7" strokeWidth="1" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="80" fill="none" stroke="#2b5ea7" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="120" y2="120" stroke="#2b5ea7" strokeWidth="0.5" />
        <ellipse cx="30" cy="10" rx="12" ry="5" fill="none" stroke="#2b5ea7" strokeWidth="0.8" transform="rotate(20,30,10)" />
        <ellipse cx="10" cy="30" rx="12" ry="5" fill="none" stroke="#2b5ea7" strokeWidth="0.8" transform="rotate(70,10,30)" />
      </svg>

      {/* Thin blue border */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          right: 28,
          bottom: 28,
          border: "1px solid rgba(43,94,167,0.1)",
        }}
      />

      {/* Top decorative line with dot */}
      <div style={{ position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 40, height: 1, background: "rgba(43,94,167,0.15)" }} />
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(43,94,167,0.2)" }} />
        <div style={{ width: 40, height: 1, background: "rgba(43,94,167,0.15)" }} />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "72px 64px 56px",
        }}
      >
        <p
          style={{
            fontFamily: '"LXGW WenKai", serif',
            fontSize: 13,
            letterSpacing: "0.3em",
            color: "rgba(43,94,167,0.4)",
            textAlign: "center",
          }}
        >
          菜根谭
        </p>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: '"LXGW WenKai", serif',
              fontSize: 26,
              lineHeight: 2.2,
              letterSpacing: "0.1em",
              color: "#2a3a50",
              fontWeight: 400,
            }}
          >
            {quote.original}
          </p>
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              lineHeight: 2,
              color: "#7a8a9a",
              letterSpacing: "0.04em",
            }}
          >
            {quote.interpretation}
          </p>
        </div>

        <p style={{ fontSize: 11, color: "rgba(43,94,167,0.3)", letterSpacing: "0.06em", textAlign: "center" }}>
          {quote.source}
        </p>
      </div>
    </div>
  );
}

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
