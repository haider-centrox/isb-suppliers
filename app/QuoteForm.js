"use client";

import { useState } from "react";

// Builds a WhatsApp message from the form — no data is stored or sent anywhere else.
export default function QuoteForm({ whatsapp, t }) {
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState({ name: "", qty: "1", city: t.cities[0], notes: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggle = (item) => setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      t.msg.hello,
      form.name && `${t.msg.name}: ${form.name}`,
      `${t.msg.items}: ${picked.length ? picked.join(", ") : t.msg.unsure}`,
      `${t.msg.qty}: ${form.qty}`,
      `${t.msg.city}: ${form.city}`,
      form.notes && `${t.msg.details}: ${form.notes}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  };

  return (
    <form className="quote" onSubmit={submit}>
      <h3>{t.h3}</h3>
      <p>{t.text}</p>
      <fieldset className="chips">
        <legend className="sr-only">{t.itemsLegend}</legend>
        {t.items.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip${picked.includes(item) ? " is-on" : ""}`}
            aria-pressed={picked.includes(item)}
            onClick={() => toggle(item)}
          >
            {item}
          </button>
        ))}
      </fieldset>
      <div className="quote-row">
        <label>
          <span>{t.name}</span>
          <input value={form.name} onChange={set("name")} placeholder={t.optional} autoComplete="name" />
        </label>
        <label>
          <span>{t.qty}</span>
          <input type="number" min="1" value={form.qty} onChange={set("qty")} inputMode="numeric" />
        </label>
      </div>
      <label>
        <span>{t.city}</span>
        <select value={form.city} onChange={set("city")}>
          {t.cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>
        <span>{t.notes}</span>
        <textarea rows="2" value={form.notes} onChange={set("notes")} placeholder={t.notesPh} />
      </label>
      <button type="submit" className="btn btn-wa">
        <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.36 4 14.98c0 2.32.66 4.5 1.82 6.35L4 29l7.88-1.77A12.1 12.1 0 0 0 16.04 27C22.68 27 28 21.6 28 14.98 28 8.36 22.68 3 16.04 3Zm0 21.8c-1.86 0-3.6-.5-5.1-1.4l-.37-.22-4.68 1.05 1.08-4.5-.24-.38A9.7 9.7 0 0 1 6.3 15c0-5.38 4.37-9.76 9.74-9.76 5.36 0 9.66 4.38 9.66 9.76 0 5.37-4.3 9.8-9.66 9.8Z" /></svg>
        {t.send}
      </button>
    </form>
  );
}
