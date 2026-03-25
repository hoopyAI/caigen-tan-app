"use client";

import { forwardRef } from "react";
import type { Quote } from "@/types";

interface ShareTemplateProps {
  quote: Quote;
  template: "ink" | "minimal" | "neo";
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

const ShareTemplate = forwardRef<HTMLDivElement, ShareTemplateProps>(
  ({ quote, template }, ref) => {
    return (
      <div ref={ref}>
        {template === "ink" && <InkTemplate quote={quote} />}
        {template === "minimal" && <MinimalTemplate quote={quote} />}
        {template === "neo" && <NeoTemplate quote={quote} />}
      </div>
    );
  }
);

ShareTemplate.displayName = "ShareTemplate";

export default ShareTemplate;
