import "server-only";
import { dict } from "../i18n";
import { formatPKR, splitEmphasis, toWhatsApp, prettyIntl, digits } from "./format";

// Turns stored content into what the page renders, for one language.
export function buildView(content, lang) {
  const base = dict[lang];
  const ur = lang === "ur";
  const wa = toWhatsApp(content.contact.whatsapp);
  const C = {
    phone: content.contact.phone,
    phoneHref: `tel:+${toWhatsApp(content.contact.phone) || wa}`,
    whatsapp: wa,
    whatsappDisplay: prettyIntl(wa),
    email: content.contact.email,
    facebook: content.contact.facebook,
    instagram: content.contact.instagram,
  };

  const priceText = (v) => (v == null ? (ur ? "قیمت معلوم کریں" : "Ask for price") : formatPKR(v, lang));
  const quoteText = ur ? "قیمت معلوم کریں" : "Get a quote";

  const products = content.products
    .filter((p) => p.visible !== false)
    .map((p) => ({
      id: p.id,
      name: (ur && p.nameUr) || p.name,
      note: (ur && p.noteUr) || p.note,
      tag: (ur && p.tagUr) || p.tag || "",
      type: p.type,
      priceValue: p.priceValue,
      price: priceText(p.priceValue),
      img: p.img,
      illus: p.illus && !p.img?.startsWith("/api/img/"),
    }));

  const t = { ...base };
  if (!ur) {
    t.hero = {
      ...base.hero,
      pill: content.hero.pill,
      h1: splitEmphasis(content.hero.h1),
      lead: content.hero.lead,
      badgeTitle: content.hero.badgeTitle,
      badgeText: content.hero.badgeText,
    };
  } else {
    t.hero = { ...base.hero, h1: base.hero.h1 };
  }
  t.offers = content.offers.map((o) => [(ur && o.titleUr) || o.title, o.priceValue == null ? quoteText : formatPKR(o.priceValue, lang)]);
  t.faqs = content.faqs.map((f) => [(ur && f.qUr) || f.q, (ur && f.aUr) || f.a]);

  return { t, C, products, reels: content.reels, bank: content.bank, phoneDigits: digits(C.phone) };
}
