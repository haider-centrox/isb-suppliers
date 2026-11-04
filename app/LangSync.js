"use client";

import { useEffect } from "react";

// Keeps <html lang/dir> in step with the page's language (the root layout is shared).
export default function LangSync({ lang, dir }) {
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = dir;
  }, [lang, dir]);
  return null;
}
