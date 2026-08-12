import { NextRequest, NextResponse } from "next/server";

const MAX_REDIRECTS = 8;

function pickMeta(html: string, property: string): string | undefined {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const m = html.match(re);
  if (m?.[1]) return m[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i",
  );
  return html.match(re2)?.[1];
}

async function followUrl(url: string, redirects = false) {
  const chain: { url: string; status: number }[] = [];
  let current = url;
  for (let i = 0; i < MAX_REDIRECTS; i++) {
    const res = await fetch(current, {
      redirect: "manual",
      headers: { "User-Agent": "CitrusV-LinkPreview/1.0" },
    });
    chain.push({ url: current, status: res.status });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) break;
      current = new URL(loc, current).toString();
      continue;
    }
    const html = await res.text();
    return { chain, finalUrl: current, statusCode: res.status, html };
  }
  return { chain, finalUrl: current, statusCode: 0, html: "" };
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  const redirects = req.nextUrl.searchParams.get("redirects") === "1";
  if (!raw) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const { chain, finalUrl, statusCode, html } = await followUrl(parsed.toString(), redirects);
    const title =
      pickMeta(html, "og:title") ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
    const description =
      pickMeta(html, "og:description") || pickMeta(html, "description");
    const image = pickMeta(html, "og:image");

    const body: Record<string, unknown> = {
      url: parsed.toString(),
      finalUrl,
      statusCode,
      title,
      description,
      image: image ? new URL(image, finalUrl).toString() : undefined,
    };
    if (redirects) body.redirectChain = chain;
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "Failed to fetch URL" }, { status: 502 });
  }
}
