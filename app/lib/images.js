import "server-only";
import { promises as fs } from "fs";
import path from "path";

const STORE = "site-images";
const LOCAL_DIR = path.join(process.cwd(), ".data", "img");
export const KEY_RE = /^[a-z0-9-]{8,60}\.(jpg|png|webp)$/;
export const TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MIME = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

function onNetlify() {
  return Boolean(process.env.NETLIFY_BLOBS_CONTEXT || globalThis.netlifyBlobsContext || process.env.NETLIFY);
}

async function store() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: STORE });
}

export async function putImage(key, buf, contentType) {
  if (onNetlify()) {
    await (await store()).set(key, buf, { metadata: { contentType } });
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, key), Buffer.from(buf));
}

export async function getImage(key) {
  const type = MIME[key.split(".").pop()];
  if (onNetlify()) {
    const data = await (await store()).get(key, { type: "arrayBuffer" });
    return data ? { data, type } : null;
  }
  try {
    return { data: await fs.readFile(path.join(LOCAL_DIR, key)), type };
  } catch {
    return null;
  }
}
