/** Shared artwork for generated Open Graph images (rendered by next/og). */
export const ogSize = { width: 1200, height: 630 };

export function OgCard({ eyebrow, title, badge }: { eyebrow: string; title: string; badge?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(circle at 80% 0%, rgba(82,123,255,0.35), transparent 55%), #090A0C",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="8" fill="#1a1d24" />
          <path d="M8 23 16 7l3.2 6.4L13.6 23z" fill="#fff" />
          <path d="M16.8 23 21 14.6 24 23z" fill="#527BFF" />
        </svg>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>CA SOLUTION4U</div>
        {badge ? (
          <div
            style={{
              display: "flex",
              marginLeft: 16,
              padding: "8px 18px",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 999,
              fontSize: 18,
              letterSpacing: 4,
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 24, color: "#92949C", letterSpacing: 3, textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div
          style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
