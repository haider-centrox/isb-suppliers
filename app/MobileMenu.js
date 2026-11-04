"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["#direct", "Why us"],
  ["#products", "Products"],
  ["#how", "How to order"],
  ["#offers", "Prices"],
  ["#videos", "Videos"],
  ["#verified", "Verified"],
  ["#faq", "FAQ"],
  ["#contact", "Contact"],
];

export default function MobileMenu({ phoneHref, phone }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`burger${open ? " is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <div id="mobile-menu" className={`mmenu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map(([href, label], i) => (
            <a key={href} href={href} style={{ "--i": i }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
        <a href={phoneHref} className="btn btn-dark mmenu-call" tabIndex={open ? 0 : -1}>Call {phone}</a>
      </div>
    </>
  );
}
