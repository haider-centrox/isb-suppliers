// TEMPORARY diagnostics for the Netlify Blobs hang (preview only). Remove after.
export const dynamic = "force-dynamic";

const race = (p, ms, label) => Promise.race([p.then((v) => ({ ok: true, v })), new Promise((r) => setTimeout(() => r({ ok: false, v: `${label} timeout ${ms}ms` }), ms))]).catch((e) => ({ ok: false, v: String(e) }));

export async function GET() {
  const out = {};
  const ctx = process.env.NETLIFY_BLOBS_CONTEXT || globalThis.netlifyBlobsContext;
  out.hasContext = Boolean(ctx);
  try {
    const parsed = JSON.parse(Buffer.from(String(ctx), "base64").toString());
    out.contextKeys = Object.keys(parsed);
    out.edgeHost = parsed.edgeURL ? new URL(parsed.edgeURL).host : null;
  } catch (e) { out.contextParse = String(e).slice(0, 80); }
  out.fetchPatched = Boolean(globalThis.fetch && (globalThis.fetch.__nextPatched || globalThis.fetch._nextOriginalFetch));

  let t = Date.now();
  out.plainFetch = await race(fetch("https://api.netlify.com/api/v1/").then((r) => r.status), 5000, "plain fetch");
  out.plainFetchMs = Date.now() - t;

  const { fetch: uFetch } = await import("undici");
  t = Date.now();
  out.undiciFetch = await race(uFetch("https://api.netlify.com/api/v1/").then((r) => r.status), 5000, "undici fetch");
  out.undiciFetchMs = Date.now() - t;

  const { getStore } = await import("@netlify/blobs");
  t = Date.now();
  out.blobsDefault = await race(getStore("diag").get("x").then((v) => `got ${v === null ? "null" : "value"}`), 6000, "blobs default");
  out.blobsDefaultMs = Date.now() - t;

  t = Date.now();
  out.blobsUndici = await race(getStore({ name: "diag", fetch: uFetch }).get("x").then((v) => `got ${v === null ? "null" : "value"}`), 6000, "blobs undici");
  out.blobsUndiciMs = Date.now() - t;

  return Response.json(out, { headers: { "Cache-Control": "no-store" } });
}
