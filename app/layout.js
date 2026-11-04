import "./globals.css";

export const metadata = {
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%231b2337'/><text x='16' y='21' font-family='Arial' font-weight='700' font-size='12' text-anchor='middle' fill='%2378a6ee'>ISB</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
