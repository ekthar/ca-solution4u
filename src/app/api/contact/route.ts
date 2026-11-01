import { NextResponse, type NextRequest } from "next/server";
import { parseContactPayload, validateContact, type ContactApiResponse } from "@/lib/contact";
import { isEmailDeliveryConfigured, sendContactEmail } from "@/lib/email";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16 * 1024;
/** A human takes longer than this to fill five fields. Bots usually do not. */
const MIN_FILL_MS = 2500;

/**
 * Best-effort, per-instance rate limit. On serverless hosts each instance
 * keeps its own counter, so add a platform rate limit for stronger protection.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) return json({ ok: false, reason: "invalid" }, 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, reason: "invalid" }, 400);
  }

  const fields = parseContactPayload(payload);
  if (!fields) return json({ ok: false, reason: "invalid" }, 400);

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) return json({ ok: false, reason: "invalid", errors }, 422);

  const record = payload as Record<string, unknown>;
  // Honeypot: the hidden "website" field is invisible to people. Answer like
  // a success so bots learn nothing.
  if (record.website) return json({ ok: true }, 200);

  // Timing trap: a submit faster than a person can type is asked to retry.
  const startedAt = typeof record.startedAt === "number" ? record.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: false, reason: "rate-limited" }, 429);
  }

  if (!isEmailDeliveryConfigured()) return json({ ok: false, reason: "not-configured" }, 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return json({ ok: false, reason: "rate-limited" }, 429);

  try {
    const sent = await sendContactEmail(fields);
    return sent ? json({ ok: true }, 200) : json({ ok: false, reason: "failed" }, 502);
  } catch {
    return json({ ok: false, reason: "failed" }, 502);
  }
}
