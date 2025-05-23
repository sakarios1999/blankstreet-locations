import { NextResponse } from "next/server";

/**
 * Proxy server‑side fetch to avoid CORS. Cached for 60s.
 */
export async function GET() {
  const res = await fetch("https://api.blankstreet.com/locations", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Upstream fetch failed" },
      { status: 502 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
