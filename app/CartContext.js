"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "isb-cart-v1";
const CartCtx = createContext(null);

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// Cart lines are { id, qty }. Product details come from the page, so prices/names stay current.
export function CartProvider({ products, children }) {
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(load().filter((l) => products.some((p) => p.id === l.id)));
    setReady(true);
  }, [products]);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((id, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found ? ls.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l)) : [...ls, { id, qty }];
    });
    setToast({ id, at: Date.now() });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l))));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const items = lines
      .map((l) => ({ ...products.find((p) => p.id === l.id), qty: l.qty }))
      .filter((i) => i.id);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + (i.priceValue || 0) * i.qty, 0);
    const hasQuote = items.some((i) => i.priceValue == null);
    return { items, count, subtotal, hasQuote, add, setQty, clear, open, setOpen, toast, products };
  }, [lines, products, add, setQty, clear, open, toast]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  return useContext(CartCtx);
}

export { formatPKR } from "./lib/format";
