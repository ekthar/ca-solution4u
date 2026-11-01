import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#090A0C",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path d="M8 23 16 7l3.2 6.4L13.6 23z" fill="#fff" />
        <path d="M16.8 23 21 14.6 24 23z" fill="#527BFF" />
      </svg>
    </div>,
    size,
  );
}
