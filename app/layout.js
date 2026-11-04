import "./globals.css";

const SITE = "https://isb-suppliers.netlify.app";
const TITLE = "ISB Suppliers — Furniture, IT Equipment, Electronics & Office Solutions in Islamabad";
const DESC =
  "Your trusted procurement and supply partner in Islamabad. Office chairs, executive tables, IT equipment, electronics and appliances, delivered across Pakistan.";

export const metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: SITE, languages: { en: SITE, ur: `${SITE}/ur/` } },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "ISB Suppliers",
    title: "ISB Suppliers — Supplying Trust. Delivering Value.",
    description: DESC,
    locale: "en_PK",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "ISB Suppliers logo" },
      { url: "/og-square.jpg", width: 600, height: 600, alt: "ISB Suppliers logo" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISB Suppliers — Supplying Trust. Delivering Value.",
    description: DESC,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32" }, { url: "/icon-192.png", sizes: "192x192" }],
    apple: "/apple-touch-icon.png",
  },
  title: "ISB Suppliers — Furniture, IT Equipment, Electronics & Office Solutions in Islamabad",
  description:
    "Your trusted procurement and supply partner in Islamabad. Office chairs, executive tables, IT equipment, electronics and appliances, delivered across Pakistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FurnitureStore",
              name: "ISB Suppliers",
              slogan: "Supplying Trust. Delivering Value.",
              url: SITE,
              logo: `${SITE}/images/logo.jpg`,
              image: `${SITE}/og-image.jpg`,
              telephone: "+92-330-6723330",
              email: "islamabadsuppliers@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
              areaServed: ["Islamabad", "Rawalpindi"],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61594155209042",
                "https://www.instagram.com/islamabadsuppliers/",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
