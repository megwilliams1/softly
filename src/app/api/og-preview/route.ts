import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 8000;
const MAX_BYTES = 200_000;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SoftlyBot/1.0)",
        Accept: "text/html",
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ ogImage: null }, { status: 200 });
    }

    // Read only the first ~200KB to find the <head> section
    const reader = response.body?.getReader();
    if (!reader) {
      return NextResponse.json({ ogImage: null }, { status: 200 });
    }

    let html = "";
    const decoder = new TextDecoder();
    let bytesRead = 0;

    while (bytesRead < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (html.includes("</head>")) break;
    }

    reader.cancel();

    // Extract og:image — handle both attribute orderings
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    return NextResponse.json({ ogImage: ogMatch?.[1] ?? null }, { status: 200 });
  } catch {
    return NextResponse.json({ ogImage: null }, { status: 200 });
  }
}
