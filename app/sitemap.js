export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: "https://isb-suppliers.netlify.app/", changeFrequency: "weekly", priority: 1 },
    { url: "https://isb-suppliers.netlify.app/ur/", changeFrequency: "weekly", priority: 0.9 },
  ];
}
