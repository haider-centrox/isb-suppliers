// Shared, non-text values. All visible text lives in i18n.js (English + Urdu).

export const CONTACT = {
  phone: "0330-6723330",
  phoneHref: "tel:+923306723330",
  whatsapp: "923306723330",
  whatsappDisplay: "+92 330 6723330",
  email: "islamabadsuppliers@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61594155209042",
  instagram: "https://www.instagram.com/islamabadsuppliers/",
};

// Set to true to show the English/Urdu switch (header, mobile menu, footer).
export const SHOW_LANG_SWITCH = false;

export const categoryIcons = ["chair", "it", "tv", "appliance", "office"];
export const featureIcons = ["ship", "truck", "tag", "globe"];

// Same order as `products` in i18n.js. `illus` items use a drawn illustration instead of a photo.
export const productMeta = [
  { type: "Gaming", img: "/images/chair-gaming-red-relax.jpg" },
  { type: "Executive", img: "/images/chair-black-mesh-executive.jpg" },
  { type: "Ergonomic", img: "/images/chair-ergonomic-premium.jpg" },
  { type: "Executive", img: "/images/chair-grey-mesh-headrest.jpg" },
  { type: "Gaming", img: "/images/chair-gaming-white-black.jpg" },
  { type: "Tables", illus: true },
];

// Public Facebook reels from the page, shown with Facebook's own embed player.
export const reels = [
  "1906899526965798",
  "1597627431679705",
  "1517067320479806",
  "2286018758849032",
  "1595050959056770",
  "1800155827934011",
];

// Business registrations. Leave `number` empty until the client provides the real value:
// empty slots render as "pending"; filled ones show the number and a Verify link.
// Same order as `verified.names` / `verified.labels` in i18n.js.
export const registrations = [
  { body: "FBR", number: "", verifyUrl: "https://www.fbr.gov.pk/",
    seal: { abbr: "FBR", ring: "TAX REGISTERED • NTN •", color: "#0b5d3b", accent: "#2f9a64" } },
  { body: "FBR", number: "", verifyUrl: "https://www.fbr.gov.pk/",
    seal: { abbr: "STRN", ring: "SALES TAX • REGISTERED •", color: "#14532d", accent: "#3aa76d" } },
  { body: "SECP", number: "", verifyUrl: "https://www.secp.gov.pk/",
    seal: { abbr: "SECP", ring: "INCORPORATED • COMPANY •", color: "#0b3a6b", accent: "#2f74c0" } },
  { body: "ICCI", number: "", verifyUrl: "https://www.icci.com.pk/",
    seal: { abbr: "ICCI", ring: "CHAMBER • MEMBER • ISLAMABAD •", color: "#7a1f2b", accent: "#c2414f" } },
  { body: "e-PADS", number: "", verifyUrl: "https://eprocure.gov.pk/",
    seal: { abbr: "PPRA", ring: "GOVT SUPPLIER • e-PADS •", color: "#5b3a00", accent: "#c08a1e" } },
];
