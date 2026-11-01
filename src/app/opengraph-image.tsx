import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "CA SOLUTION4U. Clarity for every number. Confidence for every decision.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard
      eyebrow="Tax · GST · Accounting · Advisory"
      title="Clarity for every number. Confidence for every decision."
    />,
    size,
  );
}
