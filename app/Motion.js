"use client";

import { useEffect } from "react";

// Adds scroll reveals, counters, nav state, card spotlight and hero parallax.
// Everything is progressive: without JS (or with reduced motion) the page is fully visible.
const REVEAL_GROUPS = [
  ".section-head",
  ".strip-item",
  ".category",
  ".product",
  ".offer-list li",
  ".reel",
  ".cta > *",
  ".marquee",
  ".badge",
];

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    // Nav shadow / compact state on scroll
    const nav = document.querySelector(".nav");
    const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (reduce) return () => cleanups.forEach((f) => f());

    root.classList.add("motion");

    // Scroll reveal with per-group stagger
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            el.classList.add("in");
            io.unobserve(el);
            // Once revealed, drop the reveal classes so normal hover transitions take over.
            const d = parseInt(el.style.getPropertyValue("--d")) || 0;
            setTimeout(() => el.classList.remove("reveal", "in"), 1000 + d);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    REVEAL_GROUPS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const siblings = el.parentElement ? [...el.parentElement.children] : [el];
        const i = Math.max(0, siblings.indexOf(el));
        el.classList.add("reveal");
        el.style.setProperty("--d", `${Math.min(i, 8) * 80}ms`);
        io.observe(el);
      });
    });
    cleanups.push(() => io.disconnect());

    // Count-up stats
    document.querySelectorAll(".stats dt").forEach((dt) => {
      const m = dt.textContent.match(/^(\d+)(.*)$/);
      if (!m) return;
      const target = +m[1];
      const suffix = m[2];
      const start = performance.now() + 500;
      const dur = 1400;
      dt.textContent = `0${suffix}`;
      const tick = (t) => {
        const p = Math.min(1, Math.max(0, (t - start) / dur));
        const eased = 1 - Math.pow(1 - p, 3);
        dt.textContent = `${Math.round(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // Spotlight that follows the cursor on cards
    const onMove = (e) => {
      const card = e.target.closest?.(".product, .category, .cta-box");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", onMove));

    // Gentle parallax on hero photos (desktop pointers only)
    const art = document.querySelector(".hero-art");
    if (art && window.matchMedia("(pointer: fine)").matches) {
      const onHero = (e) => {
        const r = art.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        art.style.setProperty("--px", x.toFixed(3));
        art.style.setProperty("--py", y.toFixed(3));
      };
      const reset = () => { art.style.setProperty("--px", 0); art.style.setProperty("--py", 0); };
      art.addEventListener("pointermove", onHero);
      art.addEventListener("pointerleave", reset);
      cleanups.push(() => { art.removeEventListener("pointermove", onHero); art.removeEventListener("pointerleave", reset); });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
