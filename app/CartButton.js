"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";

export default function CartButton({ label }) {
  const { count, setOpen } = useCart();
  const [bump, setBump] = useState(false);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  return (
    <button type="button" className={`cart-btn${bump ? " bump" : ""}`} aria-label={`${label} (${count})`} onClick={() => setOpen(true)}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
        <circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" />
      </svg>
      {count > 0 && <span className="cart-count">{count > 99 ? "99+" : count}</span>}
    </button>
  );
}
