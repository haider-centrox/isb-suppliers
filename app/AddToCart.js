"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function AddToCart({ id, label, addedLabel }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`btn btn-dark btn-cart${done ? " is-added" : ""}`}
      onClick={() => {
        add(id);
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
    >
      {done ? (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
      )}
      {done ? addedLabel : label}
    </button>
  );
}
