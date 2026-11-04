export const dynamic = "force-dynamic";

import Site from "../Site";

const SITE = "https://isb-suppliers.netlify.app";

export const metadata = {
  title: "ISB Suppliers — اسلام آباد میں فرنیچر، آئی ٹی آلات، الیکٹرانکس اور آفس سلوشنز",
  description:
    "کنٹینر سے براہِ راست ہماری دکان تک، کوئی مڈل مین نہیں۔ آفس چیئرز، ایگزیکٹو ٹیبلز، آئی ٹی آلات اور الیکٹرانکس سب سے کم ریٹ پر۔",
  alternates: { canonical: `${SITE}/ur` },
  // Hidden for now: no language switch on the site, so keep this page out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: `${SITE}/ur`,
    siteName: "ISB Suppliers",
    title: "ISB Suppliers — اعتماد کی سپلائی، بہترین ویلیو",
    description: "کنٹینر سے براہِ راست ہماری دکان تک، کوئی مڈل مین نہیں۔ اعلیٰ معیار، سب سے کم ریٹ۔",
    locale: "ur_PK",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ISB Suppliers" }],
  },
};

export default function UrduHome() {
  return <Site lang="ur" />;
}
