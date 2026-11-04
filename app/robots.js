export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://isb-suppliers.netlify.app/sitemap.xml",
  };
}
