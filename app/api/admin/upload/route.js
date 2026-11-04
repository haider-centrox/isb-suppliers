import { randomUUID } from "crypto";
import { putImage, TYPES } from "../../../lib/images";
import { isAdmin, unauthorized } from "../../../lib/auth";

export const dynamic = "force-dynamic";
const MAX = 5 * 1024 * 1024;

export async function POST(req) {
  if (!isAdmin(req)) return unauthorized();
  let form;
  try { form = await req.formData(); } catch { return Response.json({ error: "Upload failed" }, { status: 400 }); }
  const file = form.get("file");
  if (!file || typeof file === "string") return Response.json({ error: "No file" }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return Response.json({ error: "Only JPG, PNG or WebP images" }, { status: 415 });
  if (file.size > MAX) return Response.json({ error: "Image must be under 5 MB" }, { status: 413 });
  const key = `${randomUUID()}.${ext}`;
  try {
    await putImage(key, await file.arrayBuffer(), file.type);
  } catch (err) {
    console.error("[admin] upload failed", err);
    return Response.json({ error: "Could not store the image" }, { status: 500 });
  }
  return Response.json({ url: `/api/img/${key}` });
}
