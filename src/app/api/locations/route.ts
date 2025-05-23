import { NextResponse } from "next/server";

export async function GET() {
  const upstream = await fetch("https://api.blankstreet.com/locations");
  if (!upstream.ok) {
    return NextResponse.error();
  }
  const data = await upstream.json();
  return NextResponse.json(data);
}
