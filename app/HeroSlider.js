"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL = 5500;

// Hero product carousel. Renders the spotlight stage (behind the hero text) and
// the slide dots. It also writes the active index to the hero section as
// data-slide, which the matching price tag in the hero uses to show itself.
export default function HeroSlider({ slides, labels }) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduce, setReduce] = useState(false);
  const mediaRef = useRef(null);
  const iRef = useRef(0);
  iRef.current = i;

  const go = useCallback((k) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    const sec = mediaRef.current?.parentElement;
    if (sec) sec.dataset.slide = String(i);
  }, [i]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    // Swipe anywhere in the hero (touch only).
    const sec = mediaRef.current?.parentElement;
    let x0 = null, y0 = null;
    const start = (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; };
    const end = (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const rtl = sec && getComputedStyle(sec).direction === "rtl";
      setI((cur) => (((cur + ((dx < 0) !== rtl ? 1 : -1)) % n) + n) % n);
    };
    sec?.addEventListener("touchstart", start, { passive: true });
    sec?.addEventListener("touchend", end, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      sec?.removeEventListener("touchstart", start);
      sec?.removeEventListener("touchend", end);
    };
  }, [n]);

  const paused = userPaused || hidden;
  const auto = n > 1 && !reduce;

  useEffect(() => {
    if (!auto || paused) return;
    const t = setTimeout(() => go(iRef.current + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, auto, paused, go]);

  return (
    <>
      <div className="hero-media" aria-hidden="true" ref={mediaRef}>
        <div className="hero-stage" data-accent={slides[i].accent}>
          <div className="hero-spot" />
          <div className="hero-spot spot-red" />
          <div className="hero-floor" />
          {slides.map((s, k) => (
            <div key={s.img} className={`hero-slide${k === i ? " on" : ""}`} data-accent={s.accent}>
              <img
                className="hero-chair"
                src={s.img}
                alt=""
                width={s.w}
                height={s.h}
                decoding="async"
                fetchPriority={k === 0 ? "high" : "low"}
              />
            </div>
          ))}
        </div>
      </div>

      {n > 1 && (
        <div className="hero-dots" role="group" aria-label={labels.group}>
          {slides.map((s, k) => (
            <button
              key={s.img}
              type="button"
              className={`hero-dot${k === i ? " on" : ""}`}
              aria-label={`${labels.slide} ${k + 1}: ${s.alt}`}
              aria-current={k === i ? "true" : undefined}
              onClick={() => go(k)}
            >
              <span>
                {k === i && (
                  <i
                    key={`p${i}`}
                    className={auto ? "run" : "full"}
                    style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </span>
            </button>
          ))}
          {auto && (
            <button
              type="button"
              className="hero-pause"
              aria-label={userPaused ? labels.play : labels.pause}
              onClick={() => setUserPaused((p) => !p)}
            >
              {userPaused ? (
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M7 5v14l12-7z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
}
