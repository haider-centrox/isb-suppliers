"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu({ links, labels, lang, dir, home, brand, phoneHref, callText, switchTo }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tab = open ? 0 : -1;

  // Rendered into <body> so the header's blur effect can't trap or clip it.
  const panel = (
    <div
      id="mobile-menu"
      lang={lang}
      dir={dir}
      className={`mmenu site-${lang}${open ? " is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
    >
      <div className="mmenu-top">
        <a href={home} className="logo" onClick={() => setOpen(false)} tabIndex={tab}>
          <img src="/images/logo-mark.jpg" alt="" width="56" height="34" />
          <span className="logo-text">{brand}</span>
        </a>
        <button type="button" className="mmenu-close" aria-label={labels.close} onClick={() => setOpen(false)} tabIndex={tab}>
          <span /><span />
        </button>
      </div>
      <nav aria-label={labels.title}>
        {links.map(([href, label], i) => (
          <a key={href} href={href} style={{ "--i": i }} onClick={() => setOpen(false)} tabIndex={tab}>
            <span>{label}</span>
            <svg className="chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </a>
        ))}
      </nav>
      {switchTo && <a href={switchTo.href} className="mmenu-lang" tabIndex={tab}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>
        {switchTo.label}
      </a>}
      <a href={phoneHref} className="btn btn-dark mmenu-call" tabIndex={tab}>{callText}</a>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="burger"
        aria-label={labels.open}
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
