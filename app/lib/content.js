import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { dict } from "../i18n";
import { CONTACT, BANK, productMeta, reels } from "../data";

// ---------------------------------------------------------------------------
// Editable site content. Stored in Netlify Blobs on Netlify, or in a local
// JSON file during local development. Missing fields fall back to DEFAULTS.
// ---------------------------------------------------------------------------

const STORE = "site-content";
const KEY = "content.json";
const LOCAL_DIR = path.join(process.cwd(), ".data");

const numberFrom = (price) => {
  const m = String(price).replace(/,/g, "").match(/\d{3,}/);
  return m ? Number(m[0]) : null;
};

export const DEFAULTS = {
  version: 1,
  contact: {
    phone: CONTACT.phone,
    whatsapp: CONTACT.phone,
    email: CONTACT.email,
    facebook: CONTACT.facebook,
    instagram: CONTACT.instagram,
  },
  hero: {
    pill: dict.en.hero.pill,
    h1: "Your *trusted* partner in quality products & *reliable* supply.",
    lead: dict.en.hero.lead,
    badgeTitle: dict.en.hero.badgeTitle,
    badgeText: dict.en.hero.badgeText,
  },
  bank: { ...BANK },
  products: dict.en.products.map((p, i) => ({
    id: productMeta[i].id,
    name: p.name,
    nameUr: dict.ur.products[i].name,
    note: p.note,
    noteUr: dict.ur.products[i].note,
    priceValue: productMeta[i].priceValue,
    tag: p.tag || "",
    tagUr: dict.ur.products[i].tag || "",
    type: productMeta[i].type,
    img: productMeta[i].img,
    illus: !!productMeta[i].illus,
    visible: true,
  })),
  offers: dict.en.offers.map(([title, price], i) => ({
    title,
    titleUr: dict.ur.offers[i][0],
    priceValue: numberFrom(price),
  })),
  reels: [...reels],
  faqs: dict.en.faqs.map(([q, a], i) => ({ q, a, qUr: dict.ur.faqs[i][0], aUr: dict.ur.faqs[i][1] })),
};

function onNetlify() {
  return Boolean(process.env.NETLIFY_BLOBS_CONTEXT || globalThis.netlifyBlobsContext || process.env.NETLIFY);
}

// Any storage call that takes longer than this is abandoned, so a storage
// problem can never take the website down (pages fall back to DEFAULTS).
const TIMEOUT_MS = 9000;
function withTimeout(promise, label) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out after ${TIMEOUT_MS}ms`)), TIMEOUT_MS); }),
  ]).finally(() => clearTimeout(timer));
}

// Next.js replaces the global fetch inside the server; Netlify Blobs calls hang
// through it on Netlify. Give Blobs a plain fetch (undici) instead.
async function store() {
  const [{ getStore }, { fetch }] = await Promise.all([import("@netlify/blobs"), import("undici")]);
  // strong consistency: a save is visible on the very next page load.
  return getStore({ name: STORE, fetch, consistency: "strong" });
}

async function readRaw() {
  if (onNetlify()) {
    const t0 = Date.now();
    const v = await withTimeout((await store()).get(KEY, { type: "json" }), "blobs get");
    console.log(`[content] blobs get ok in ${Date.now() - t0}ms (${v ? "saved" : "empty"})`);
    return v;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, KEY), "utf8"));
  } catch {
    return null;
  }
}

async function writeRaw(obj) {
  if (onNetlify()) {
    const t0 = Date.now();
    await withTimeout((await store()).setJSON(KEY, obj), "blobs set");
    console.log(`[content] blobs set ok in ${Date.now() - t0}ms`);
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, KEY), JSON.stringify(obj, null, 2));
}

function merge(saved) {
  if (!saved || typeof saved !== "object") return structuredClone(DEFAULTS);
  return {
    ...structuredClone(DEFAULTS),
    ...saved,
    contact: { ...DEFAULTS.contact, ...(saved.contact || {}) },
    hero: { ...DEFAULTS.hero, ...(saved.hero || {}) },
    bank: { ...DEFAULTS.bank, ...(saved.bank || {}) },
  };
}

// Public pages: never fail. If storage is unavailable, show the built-in content.
export async function getContent() {
  try {
    return merge(await readRaw());
  } catch (err) {
    console.error("[content] read failed, using defaults:", err);
    return structuredClone(DEFAULTS);
  }
}

// Admin: must load the real saved content or fail loudly. Falling back to the
// defaults here could let a later Save overwrite the client's real edits.
export async function getContentStrict() {
  return merge(await readRaw());
}

export async function saveContent(content) {
  await writeRaw({ ...clean(content), version: 1, updatedAt: new Date().toISOString() });
}

export async function resetContent() {
  if (onNetlify()) {
    await withTimeout((await store()).delete(KEY), "blobs delete");
    return;
  }
  await fs.rm(path.join(LOCAL_DIR, KEY), { force: true });
}

// ---------------------------------------------------------------------------
// Validation: keep only known fields, trim and cap string lengths.
// ---------------------------------------------------------------------------
const str = (v, max = 300) => String(v ?? "").trim().slice(0, max);
const num = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Math.round(Number(String(v).replace(/[^\d.]/g, "")));
  return Number.isFinite(n) && n >= 0 && n < 100000000 ? n : null;
};
const slug = (s) =>
  str(s, 80).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `item-${Date.now().toString(36)}`;
const imgPath = (v) => {
  const s = str(v, 300);
  return /^\/(images\/|api\/img\/)[\w./-]+$/.test(s) ? s : "";
};
const url = (v) => {
  const s = str(v, 300);
  return /^https:\/\/[^\s"'<>]+$/.test(s) ? s : "";
};

export function clean(c) {
  const seen = new Set();
  const products = (Array.isArray(c.products) ? c.products : []).slice(0, 200).map((p) => {
    let id = slug(p.id || p.name);
    while (seen.has(id)) id = `${id}-2`;
    seen.add(id);
    return {
      id,
      name: str(p.name, 120) || "Untitled product",
      nameUr: str(p.nameUr, 120),
      note: str(p.note, 300),
      noteUr: str(p.noteUr, 300),
      priceValue: num(p.priceValue),
      tag: str(p.tag, 30),
      tagUr: str(p.tagUr, 30),
      type: str(p.type, 30) || "Other",
      img: imgPath(p.img),
      illus: Boolean(p.illus) && !imgPath(p.img).startsWith("/api/img/"),
      visible: p.visible !== false,
    };
  });
  return {
    contact: {
      phone: str(c.contact?.phone, 30) || DEFAULTS.contact.phone,
      whatsapp: str(c.contact?.whatsapp, 30) || DEFAULTS.contact.whatsapp,
      email: str(c.contact?.email, 120),
      facebook: url(c.contact?.facebook),
      instagram: url(c.contact?.instagram),
    },
    hero: {
      pill: str(c.hero?.pill, 80),
      h1: str(c.hero?.h1, 160) || DEFAULTS.hero.h1,
      lead: str(c.hero?.lead, 500),
      badgeTitle: str(c.hero?.badgeTitle, 40),
      badgeText: str(c.hero?.badgeText, 80),
    },
    bank: {
      sample: Boolean(c.bank?.sample),
      bank: str(c.bank?.bank, 80),
      title: str(c.bank?.title, 80),
      account: str(c.bank?.account, 40),
      iban: str(c.bank?.iban, 40),
    },
    products,
    offers: (Array.isArray(c.offers) ? c.offers : []).slice(0, 60).map((o) => ({
      title: str(o.title, 120),
      titleUr: str(o.titleUr, 120),
      priceValue: num(o.priceValue),
    })).filter((o) => o.title),
    reels: (Array.isArray(c.reels) ? c.reels : []).map((r) => String(r).replace(/\D/g, "")).filter((r) => r.length >= 6).slice(0, 12),
    faqs: (Array.isArray(c.faqs) ? c.faqs : []).slice(0, 40).map((f) => ({
      q: str(f.q, 200), a: str(f.a, 800), qUr: str(f.qUr, 200), aUr: str(f.aUr, 800),
    })).filter((f) => f.q && f.a),
  };
}
