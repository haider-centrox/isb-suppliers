"use client";

import { useState } from "react";
import { KDesk } from "./illustrations";
import AddToCart from "./AddToCart";

const FILTER_KEYS = ["All", "Gaming", "Executive", "Ergonomic", "Tables"];

export default function ProductGrid({ products, whatsapp, filters, filterAria, orderLabel, orderMsg, addLabel, addedLabel }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? products : products.filter((p) => p.type === active);
  const wa = (name) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(`${orderMsg}${name}`)}`;

  return (
    <>
      <div className="filters" role="tablist" aria-label={filterAria}>
        {FILTER_KEYS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={`filter${active === f ? " is-active" : ""}`}
            onClick={() => setActive(f)}
          >
            {filters[f]}
            <span className="filter-count">{f === "All" ? products.length : products.filter((p) => p.type === f).length}</span>
          </button>
        ))}
      </div>
      <div className="grid-3 product-grid" key={active}>
        {shown.map((p, i) => (
          <article key={p.name} className="product pop" style={{ "--i": i }}>
            <div className={`product-art${p.illus ? " illus" : ""}`}>
              {p.tag && <span className="tag">{p.tag}</span>}
              {p.illus ? <KDesk /> : <img src={p.img} alt={p.name} />}
            </div>
            <div className="product-body">
              <h3>{p.name}</h3>
              <p className="muted small">{p.note}</p>
              <div className="product-row">
                <span className="price">{p.price}</span>
                <a href={wa(p.name)} target="_blank" rel="noopener noreferrer" className="link">{orderLabel}</a>
              </div>
              <AddToCart id={p.id} label={addLabel} addedLabel={addedLabel} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
