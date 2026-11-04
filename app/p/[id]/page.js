import { dict } from "../../i18n";
import { CONTACT, SITE_URL, productMeta } from "../../data";
import { KDesk } from "../../illustrations";

// One small page per product. Order messages on WhatsApp link here, and WhatsApp
// shows this page's og:image, so the shop sees the product photo in the chat.

export const dynamicParams = false;

export function generateStaticParams() {
  return productMeta.map((p) => ({ id: p.id }));
}

function find(id) {
  const i = productMeta.findIndex((p) => p.id === id);
  return i < 0 ? null : { ...dict.en.products[i], ...productMeta[i] };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = find(id);
  const img = `${SITE_URL}${p.img}`;
  return {
    title: `${p.name} — ${p.price} | ISB Suppliers`,
    description: p.note,
    alternates: { canonical: `${SITE_URL}/p/${p.id}/` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/p/${p.id}/`,
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
  const p = find(id);
  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`${dict.en.orderMsg}${p.name}`)}`;
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
