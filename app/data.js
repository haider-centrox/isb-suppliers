// Content taken from the ISB Suppliers Facebook page.

export const CONTACT = {
  phone: "0330-6723330",
  phoneHref: "tel:+923306723330",
  whatsapp: "923028599511",
  whatsappDisplay: "+92 302 8599511",
  email: "islamabadsuppliers@gmail.com",
  city: "Islamabad, Pakistan",
  hours: "Open 7 days, always available",
  facebook: "https://www.facebook.com/profile.php?id=61594155209042",
  instagram: "https://www.instagram.com/islamabadsuppliers/",
};

export const categories = [
  { name: "Furniture", text: "Office chairs, executive tables, conference tables, gaming setups.", icon: "chair" },
  { name: "IT Equipment", text: "Computers, monitors, printers and networking for your office.", icon: "it" },
  { name: "Electronics", text: "LEDs, screens and everyday electronics at competitive prices.", icon: "tv" },
  { name: "Appliances", text: "Fridges, washing machines, microwaves and more.", icon: "appliance" },
  { name: "Office Solutions", text: "Complete office setups, designed and delivered.", icon: "office" },
];

export const products = [
  { name: "Gaming Chair", note: "Red & black, racing style with neck and lumbar pillows", price: "Rs. 10,000", tag: "Hot deal", img: "/images/chair-gaming-red-relax.jpg" },
  { name: "Executive Mesh Chair", note: "Black mesh, adjustable headrest and armrests", price: "Rs. 23,000", tag: "Bestseller", img: "/images/chair-black-mesh-executive.jpg" },
  { name: "Premium Ergonomic Chair", note: "Full mesh back with built-in lumbar support", price: "Rs. 45,000", tag: "Premium", img: "/images/chair-ergonomic-premium.jpg" },
  { name: "Executive Chair", note: "High-back mesh with headrest, chrome base", price: "Rs. 15,000", img: "/images/chair-grey-mesh-headrest.jpg" },
  { name: "Gaming Chair — White Edition", note: "Black & white with neck and lumbar pillows", price: "Rs. 10,000", img: "/images/chair-gaming-white-black.jpg" },
];

export const offers = [
  { title: "Executive Office Table", price: "Rs. 28,000" },
  { title: "Gaming Chair + Table (sale)", price: "Rs. 18,500" },
  { title: "Table + Chair Set", price: "Rs. 15,000" },
  { title: "Student Offer: Table + Chair", price: "Rs. 10,000" },
  { title: "Gaming Chair", price: "Rs. 10,000" },
  { title: "Executive Chair", price: "Rs. 15,000" },
  { title: "Executive Mesh Chair", price: "Rs. 23,000" },
  { title: "Customized Conference Tables", price: "Get a quote" },
  { title: "K-Shaped Gaming Tables", price: "Get a quote" },
  { title: "Complete Office Setup", price: "Get a quote" },
];

export const features = [
  { title: "Quality Products", text: "Every piece checked before it leaves our warehouse." },
  { title: "On Time Delivery", text: "Real orders, delivered when we promise." },
  { title: "Trusted Partner", text: "8,000+ followers across Facebook and Instagram." },
  { title: "Nationwide Supply", text: "Based in Islamabad, delivering across Pakistan." },
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
// empty slots render as "Add number" placeholders; filled ones show the number and a Verify link.
export const registrations = [
  { body: "FBR", name: "Federal Board of Revenue", label: "NTN", number: "", verifyUrl: "https://www.fbr.gov.pk/",
    seal: { abbr: "FBR", ring: "TAX REGISTERED • NTN •", color: "#0b5d3b", accent: "#2f9a64" } },
  { body: "FBR", name: "Sales Tax Registered", label: "STRN", number: "", verifyUrl: "https://www.fbr.gov.pk/",
    seal: { abbr: "STRN", ring: "SALES TAX • REGISTERED •", color: "#14532d", accent: "#3aa76d" } },
  { body: "SECP", name: "Securities & Exchange Commission of Pakistan", label: "Reg. No.", number: "", verifyUrl: "https://www.secp.gov.pk/",
    seal: { abbr: "SECP", ring: "INCORPORATED • COMPANY •", color: "#0b3a6b", accent: "#2f74c0" } },
  { body: "ICCI", name: "Islamabad Chamber of Commerce & Industry", label: "Member No.", number: "", verifyUrl: "https://www.icci.com.pk/",
    seal: { abbr: "ICCI", ring: "CHAMBER • MEMBER • ISLAMABAD •", color: "#7a1f2b", accent: "#c2414f" } },
  { body: "e-PADS", name: "PPRA Registered Government Supplier", label: "Supplier ID", number: "", verifyUrl: "https://eprocure.gov.pk/",
    seal: { abbr: "PPRA", ring: "GOVT SUPPLIER • e-PADS •", color: "#5b3a00", accent: "#c08a1e" } },
];
