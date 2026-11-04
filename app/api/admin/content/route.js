import { getContent, saveContent, resetContent, DEFAULTS } from "../../../lib/content";
import { isAdmin, unauthorized, adminProtected } from "../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  return Response.json({ content: await getContent(), protected: adminProtected() }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req) {
  if (!isAdmin(req)) return unauthorized();
  const text = await req.text();
  if (text.length > 400_000) return Response.json({ error: "Content too large" }, { status: 413 });
  let body;
  try { body = JSON.parse(text); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  try {
    await saveContent(body);
    return Response.json({ ok: true, content: await getContent() });
  } catch (err) {
    console.error("[admin] save failed", err);
    return Response.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAdmin(req)) return unauthorized();
  await resetContent();
  return Response.json({ ok: true, content: structuredClone(DEFAULTS) });
}
