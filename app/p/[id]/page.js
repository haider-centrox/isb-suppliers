import { getContent } from "../../lib/content";
import { buildView } from "../../lib/view";
import { SITE_URL } from "../../data";
import { KDesk } from "../../illustrations";
import { notFound } from "next/navigation";

// One small page per product. Order messages on WhatsApp link here, and WhatsApp
// shows this page's og:image, so the shop sees the product photo in the chat.

export const dynamic = "force-dynamic";

async function find(id) {
  const content = await getContent();
  const v = buildView(content, "en");
  const p = v.products.find((x) => x.id === id);
  return p ? { p, v } : null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const found = await find(id);
  if (!found) return { title: "Product not found | ISB Suppliers" };
  const { p } = found;
  const img = p.img ? `${SITE_URL}${p.img}` : `${SITE_URL}/og-image.jpg`;
  return {
    title: `${p.name} — ${p.price} | ISB Suppliers`,
    description: p.note,
    alternates: { canonical: `${SITE_URL}/p/${p.id}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/p/${p.id}`,
      siteName: "ISB Suppliers",
      title: `${p.name} — ${p.price}`,
      description: p.note,
      images: [{ url: img, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title: `${p.name} — ${p.price}`, images: [img] },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const found = await find(id);
  if (!found) notFound();
  const { p, v } = found;
  const wa = `https://wa.me/${v.C.whatsapp}?text=${encodeURIComponent(`${v.t.orderMsg}${p.name}`)}`;
  return (
    <main className="pp">
      <a href="/" className="pp-brand">
        <img src="/images/logo-mark.jpg" alt="" width="56" height="34" />
        <span>ISB Suppliers</span>
      </a>
      <article className="pp-card">
        <div className="pp-img">{p.illus ? <KDesk /> : <img src={p.img} alt={p.name} />}</div>
        <div className="pp-body">
          {p.tag && <span className="tag pp-tag">{p.tag}</span>}
          <h1>{p.name}</h1>
          <p className="muted">{p.note}</p>
          <p className="pp-price">{p.price}</p>
          <a href={wa} className="btn btn-wa btn-block" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
          <a href="/#products" className="btn btn-ghost btn-block">See all products</a>
        </div>
      </article>
    </main>
  );
}
