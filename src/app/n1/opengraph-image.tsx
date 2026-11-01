import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "Meet N1. A new perspective on business management. Coming soon.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="N1 ERP" badge="COMING SOON" title="Meet N1. A new perspective on business management." />,
    size,
  );
}
