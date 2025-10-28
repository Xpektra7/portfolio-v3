import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ success: 0, message: "No URL provided" });

  // If it's an image URL, return image payload
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
    return NextResponse.json({
      success: 1,
      file: { url },
    });
  }

  // Otherwise, handle link preview
  try {
    const res = await fetch(url);
    const html = await res.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/i);

    return NextResponse.json({
      success: 1,
      meta: {
        title: titleMatch ? titleMatch[1] : url,
        description: descMatch ? descMatch[1] : "No description available.",
        image: { url: imageMatch ? imageMatch[1] : "" },
      },
    });
  } catch {
    return NextResponse.json({ success: 0, message: "Failed to fetch metadata" });
  }
}
