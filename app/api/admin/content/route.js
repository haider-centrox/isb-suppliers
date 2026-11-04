import { getContentStrict, saveContent, resetContent, DEFAULTS } from "../../../lib/content";
import { isAdmin, unauthorized, adminProtected } from "../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    return Response.json({ content: await getContentStrict(), protected: adminProtected() }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[admin] load failed", err);
    return Response.json({ error: "Could not load the saved content. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export async function PUT(req) {
  if (!isAdmin(req)) return unauthorized();
  const text = await req.text();
  if (text.length > 400_000) return Response.json({ error: "Content too large" }, { status: 413 });
  let body;
  try { body = JSON.parse(text); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  try {
    await saveContent(body);
    return Response.json({ ok: true, content: await getContentStrict() });
  } catch (err) {
    console.error("[admin] save failed", err);
    return Response.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    await resetContent();
  } catch (err) {
    console.error("[admin] reset failed", err);
    return Response.json({ error: "Could not reset. Please try again." }, { status: 500 });
  }
  return Response.json({ ok: true, content: structuredClone(DEFAULTS) });
}
