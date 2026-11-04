"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Rendered into <body> so the header's blur effect can't trap or clip it.
  const panel = (
    <div id="mobile-menu" className={`mmenu${open ? " is-open" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="mmenu-top">
        <a href="#" className="logo" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          <img src="/images/logo-mark.jpg" alt="" width="56" height="34" />
          <span className="logo-text">ISB Suppliers</span>
        </a>
        <button type="button" className="mmenu-close" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          <span /><span />
        </button>
      </div>
      <nav aria-label="Mobile">
        {LINKS.map(([href, label], i) => (
          <a key={href} href={href} style={{ "--i": i }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <span>{label}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </a>
        ))}
      </nav>
      <a href={phoneHref} className="btn btn-dark mmenu-call" tabIndex={open ? 0 : -1}>Call {phone}</a>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span /><span /><span />
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
