import { getImage, KEY_RE } from "../../../lib/images";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const { key } = await params;
  if (!KEY_RE.test(key)) return new Response("Not found", { status: 404 });
  const img = await getImage(key);
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(img.data, {
    headers: {
      "Content-Type": img.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
