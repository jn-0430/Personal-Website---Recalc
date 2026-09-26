import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function matchesPassword(supplied: string, expected: string) {
  const suppliedHash = createHash("sha256").update(supplied).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

export async function POST(request: NextRequest) {
  const password = process.env.PORTFOLIO_PASSWORD;
  const sessionSecret = process.env.PORTFOLIO_SESSION_SECRET;

  if (!password || !sessionSecret || sessionSecret.length < 32) {
    return NextResponse.json(
      { error: "Local access is not configured. Add the required environment variables." },
      { status: 503 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || "local";
  const now = Date.now();
  const record = attempts.get(clientKey);

  if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a password to continue." }, { status: 400 });
  }

  const supplied = typeof body.password === "string" ? body.password : "";
  if (!matchesPassword(supplied, password)) {
    const nextRecord = record && record.resetAt > now
      ? { count: record.count + 1, resetAt: record.resetAt }
      : { count: 1, resetAt: now + WINDOW_MS };
    attempts.set(clientKey, nextRecord);
    return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  }

  attempts.delete(clientKey);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: await createSessionToken(sessionSecret),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
