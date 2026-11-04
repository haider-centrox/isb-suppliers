// Plain helpers usable from both server and client code.

export const formatPKR = (n, lang) =>
  lang === "ur" ? `${Number(n).toLocaleString("en-PK")} روپے` : `Rs. ${Number(n).toLocaleString("en-PK")}`;

// "Your *trusted* partner" -> ["Your ", "trusted", " partner"] (odd indexes are emphasised)
export const splitEmphasis = (s) => String(s || "").split("*");

export const digits = (s) => String(s || "").replace(/\D/g, "");

// WhatsApp needs the international number with no "+" or leading zero: 0330... -> 92330...
export const toWhatsApp = (s) => {
  const d = digits(s);
  if (d.startsWith("0")) return `92${d.slice(1)}`;
  return d;
};

export const prettyIntl = (w) => (w.length >= 12 ? `+${w.slice(0, 2)} ${w.slice(2, 5)} ${w.slice(5)}` : `+${w}`);

// Accepts a reel id or any facebook.com/reel/<id> or watch?v=<id> link.
export const reelId = (s) => {
  const str = String(s || "").trim();
  const m = str.match(/(?:reel\/|videos\/|v=)(\d{6,})/) || str.match(/^(\d{6,})$/);
  return m ? m[1] : "";
};
