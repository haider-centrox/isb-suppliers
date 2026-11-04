"use client";

import { useState } from "react";
import { KDesk } from "./illustrations";

const FILTERS = ["All", "Gaming", "Executive", "Ergonomic", "Tables"];

export default function ProductGrid({ products, whatsapp }) {
  const [active, setActive] = useState("All");
  const items = [
    ...products,
    { name: "K-Shaped Gaming Table", note: "Sturdy steel K-frame, black top, room for multiple monitors", price: "Ask for price", tag: "Custom", type: "Tables", illus: true },
  ];
  const shown = active === "All" ? items : items.filter((p) => p.type === active);
  const wa = (name) =>
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ISB Suppliers, I want to order: ${name}`)}`;

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter products">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={`filter${active === f ? " is-active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
            <span className="filter-count">{f === "All" ? items.length : items.filter((p) => p.type === f).length}</span>
          </button>
        ))}
      </div>
      <div className="grid-3 product-grid" key={active}>
        {shown.map((p, i) => (
          <article key={p.name + (p.img || "")} className="product pop" style={{ "--i": i }}>
            <div className={`product-art${p.illus ? " illus" : ""}`}>
              {p.tag && <span className="tag">{p.tag}</span>}
              {p.illus ? <KDesk /> : <img src={p.img} alt={p.name} />}
            </div>
            <div className="product-body">
              <h3>{p.name}</h3>
              <p className="muted small">{p.note}</p>
              <div className="product-row">
                <span className="price">{p.price}</span>
                <a href={wa(p.name)} target="_blank" rel="noopener noreferrer" className="link">Order →</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
