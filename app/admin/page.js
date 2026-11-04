"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TABS = [
  ["products", "Products"],
  ["offers", "Price list"],
  ["home", "Homepage"],
  ["contact", "Contact & payment"],
  ["videos", "Videos"],
  ["faq", "FAQ"],
];
const TYPES = ["Gaming", "Executive", "Ergonomic", "Tables", "Other"];

const pkr = (n) => (n == null || n === "" ? "Ask for price" : `Rs. ${Number(n).toLocaleString("en-PK")}`);
const reelId = (s) => {
  const m = String(s).match(/(?:reel\/|videos\/|v=)(\d{6,})/) || String(s).trim().match(/^(\d{6,})$/);
  return m ? m[1] : "";
};
const move = (arr, i, d) => {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const a = [...arr];
  [a[i], a[j]] = [a[j], a[i]];
  return a;
};

// Shrinks photos in the browser before upload: faster uploads, smaller pages.
async function shrink(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("Please choose a JPG, PNG or WebP image.");
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.85));
  return blob || file;
}

function Field({ label, hint, children, wide }) {
  return (
    <label className={`adm-field${wide ? " wide" : ""}`}>
      <span className="adm-label">{label}</span>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </label>
  );
}

function ProductEditor({ product, onSave, onClose, api }) {
  const [p, setP] = useState(product);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const set = (k) => (e) => setP({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const upload = async (file) => {
    if (!file) return;
    setErr(""); setBusy(true);
    try {
      const small = await shrink(file);
      const fd = new FormData();
      fd.append("file", new File([small], "photo.webp", { type: small.type || "image/webp" }));
      const r = await api("/api/admin/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Upload failed");
      setP((x) => ({ ...x, img: j.url, illus: false }));
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    if (!p.name.trim()) return setErr("Please enter a product name.");
    if (!p.img && !p.illus) return setErr("Please add a photo.");
    onSave({ ...p, priceValue: p.priceValue === "" || p.priceValue == null ? null : Number(String(p.priceValue).replace(/\D/g, "")) });
  };

  return (
    <div className="adm-modal-wrap" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Edit product">
        <div className="adm-modal-head">
          <h2>{product.isNew ? "Add product" : "Edit product"}</h2>
          <button type="button" className="adm-x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="adm-modal-body">
          <div className="adm-photo">
            <div
              className={`adm-drop${busy ? " busy" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files?.[0]); }}
            >
              {p.img ? <img src={p.img} alt="" /> : <span>{busy ? "Uploading…" : "Click or drop a photo"}</span>}
              {busy && <div className="adm-spinner" />}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => upload(e.target.files?.[0])} />
            <button type="button" className="adm-btn" onClick={() => fileRef.current?.click()} disabled={busy}>{p.img ? "Change photo" : "Upload photo"}</button>
            <span className="adm-hint">Square or portrait photos look best. Large photos are resized automatically.</span>
          </div>
          <div className="adm-grid">
            <Field label="Product name *"><input value={p.name} onChange={set("name")} /></Field>
            <Field label="Name in Urdu"><input value={p.nameUr} onChange={set("nameUr")} dir="rtl" /></Field>
            <Field label="Short description" wide><textarea rows="2" value={p.note} onChange={set("note")} /></Field>
            <Field label="Description in Urdu" wide><textarea rows="2" value={p.noteUr} onChange={set("noteUr")} dir="rtl" /></Field>
            <Field label="Price (Rs.)" hint="Leave empty to show “Ask for price”.">
              <input value={p.priceValue ?? ""} onChange={set("priceValue")} inputMode="numeric" placeholder="e.g. 23000" />
            </Field>
            <Field label="Category">
              <select value={p.type} onChange={set("type")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Badge" hint="Optional, e.g. New, Bestseller, Sale"><input value={p.tag} onChange={set("tag")} maxLength={30} /></Field>
            <Field label="Badge in Urdu"><input value={p.tagUr} onChange={set("tagUr")} dir="rtl" maxLength={30} /></Field>
            <label className="adm-check wide">
              <input type="checkbox" checked={p.visible !== false} onChange={set("visible")} />
              <span>Show this product on the website</span>
            </label>
          </div>
          {err && <p className="adm-error">{err}</p>}
        </div>
        <div className="adm-modal-foot">
          <button type="button" className="adm-btn" onClick={onClose}>Cancel</button>
          <button type="button" className="adm-btn primary" onClick={save} disabled={busy}>{product.isNew ? "Add product" : "Done"}</button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState("products");
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | saving | saved | error | locked
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [key, setKey] = useState("");
  const [reelInput, setReelInput] = useState("");

  const api = useCallback((url, opts = {}) => {
    const k = key || (typeof window !== "undefined" ? sessionStorage.getItem("isb-admin-key") || "" : "");
    return fetch(url, { ...opts, headers: { ...(opts.headers || {}), ...(k ? { "x-admin-key": k } : {}) }, cache: "no-store" });
  }, [key]);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const r = await api("/api/admin/content");
      if (r.status === 401) return setStatus("locked");
      const j = await r.json();
      setData(j.content); setSaved(JSON.stringify(j.content)); setStatus("ready");
    } catch {
      setStatus("error"); setMsg("Could not load the content. Check your connection and refresh.");
    }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const dirty = data && saved !== JSON.stringify(data);

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = async () => {
    setStatus("saving"); setMsg("");
    try {
      const r = await api("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Save failed");
      setData(j.content); setSaved(JSON.stringify(j.content)); setStatus("saved");
      setTimeout(() => setStatus((s) => (s === "saved" ? "ready" : s)), 2500);
    } catch (e) {
      setStatus("ready"); setMsg(e.message);
    }
  };

  const reset = async () => {
    const r = await api("/api/admin/content", { method: "DELETE" });
    const j = await r.json();
    setData(j.content); setSaved(JSON.stringify(j.content)); setConfirmReset(false); setStatus("saved");
  };

  const up = (path, value) => setData((d) => ({ ...d, [path]: value }));
  const upObj = (section, k) => (e) => setData((d) => ({ ...d, [section]: { ...d[section], [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value } }));
  const upRow = (list, i, k) => (e) => setData((d) => ({ ...d, [list]: d[list].map((row, j) => (j === i ? { ...row, [k]: e.target.value } : row)) }));

  const counts = useMemo(() => data ? { products: data.products.length, offers: data.offers.length, videos: data.reels.length, faq: data.faqs.length } : {}, [data]);

  if (status === "locked") {
    return (
      <main className="adm-center">
        <form className="adm-card adm-lock" onSubmit={(e) => { e.preventDefault(); sessionStorage.setItem("isb-admin-key", key); load(); }}>
          <h1>Admin password</h1>
          <input type="password" value={key} onChange={(e) => setKey(e.target.value)} autoFocus />
          <button className="adm-btn primary">Open admin</button>
        </form>
      </main>
    );
  }

  if (!data) {
    return <main className="adm-center"><div className="adm-spinner big" />{msg && <p className="adm-error">{msg}</p>}</main>;
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-brand">
          <img src="/images/logo-mark.jpg" alt="" />
          <div><strong>ISB Suppliers</strong><span>Website admin</span></div>
        </div>
        <div className="adm-top-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn ghost">View site ↗</a>
          <button type="button" className={`adm-btn primary${dirty ? " pulse" : ""}`} onClick={save} disabled={!dirty || status === "saving"}>
            {status === "saving" ? "Saving…" : status === "saved" && !dirty ? "Saved ✓" : dirty ? "Save changes" : "All saved"}
          </button>
        </div>
      </header>

      {!data.updatedAt && <div className="adm-banner">You&apos;re seeing the original website content. Changes go live as soon as you press <b>Save changes</b>.</div>}
      {msg && <div className="adm-banner error">{msg}</div>}

      <div className="adm-body">
        <nav className="adm-tabs" aria-label="Sections">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
              {label}
              {counts[id] != null && <span>{counts[id]}</span>}
            </button>
          ))}
          <div className="adm-tabs-foot">
            {dirty && <p className="adm-unsaved">● Unsaved changes</p>}
            {!confirmReset ? (
              <button type="button" className="adm-link danger" onClick={() => setConfirmReset(true)}>Reset to original content</button>
            ) : (
              <div className="adm-confirm">
                <p>Replace everything with the original content?</p>
                <button type="button" className="adm-btn danger" onClick={reset}>Yes, reset</button>
                <button type="button" className="adm-btn" onClick={() => setConfirmReset(false)}>Cancel</button>
              </div>
            )}
          </div>
        </nav>

        <main className="adm-main">
          {tab === "products" && (
            <section>
              <div className="adm-head">
                <div><h1>Products</h1><p>Shown in the “From our showroom” section and the cart.</p></div>
                <button type="button" className="adm-btn primary" onClick={() => setEditing({ isNew: true, id: "", name: "", nameUr: "", note: "", noteUr: "", priceValue: "", tag: "", tagUr: "", type: "Executive", img: "", illus: false, visible: true })}>+ Add product</button>
              </div>
              <ul className="adm-list">
                {data.products.map((p, i) => (
                  <li key={p.id + i} className={`adm-row${p.visible === false ? " hidden" : ""}`}>
                    <div className="adm-thumb">{p.img ? <img src={p.img} alt="" /> : <span>No photo</span>}</div>
                    <div className="adm-row-main">
                      <strong>{p.name}</strong>
                      <span>{pkr(p.priceValue)} · {p.type}{p.tag ? ` · ${p.tag}` : ""}{p.visible === false ? " · Hidden" : ""}</span>
                    </div>
                    <div className="adm-row-actions">
                      <button type="button" className="adm-icon" aria-label="Move up" onClick={() => up("products", move(data.products, i, -1))} disabled={i === 0}>↑</button>
                      <button type="button" className="adm-icon" aria-label="Move down" onClick={() => up("products", move(data.products, i, 1))} disabled={i === data.products.length - 1}>↓</button>
                      <button type="button" className="adm-btn small" onClick={() => setEditing({ ...p, index: i })}>Edit</button>
                      {confirmDel === i ? (
                        <>
                          <button type="button" className="adm-btn small danger" onClick={() => { up("products", data.products.filter((_, j) => j !== i)); setConfirmDel(null); }}>Delete</button>
                          <button type="button" className="adm-btn small" onClick={() => setConfirmDel(null)}>Keep</button>
                        </>
                      ) : (
                        <button type="button" className="adm-icon danger" aria-label="Delete" onClick={() => setConfirmDel(i)}>🗑</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {data.products.length === 0 && <p className="adm-empty">No products yet. Add your first one.</p>}
            </section>
          )}

          {tab === "offers" && (
            <section>
              <div className="adm-head">
                <div><h1>Price list</h1><p>The “Current offers” list. Leave the price empty to show “Get a quote”.</p></div>
                <button type="button" className="adm-btn primary" onClick={() => up("offers", [...data.offers, { title: "", titleUr: "", priceValue: null }])}>+ Add row</button>
              </div>
              <div className="adm-table">
                <div className="adm-tr head"><span>Item</span><span>Urdu</span><span>Price (Rs.)</span><span /></div>
                {data.offers.map((o, i) => (
                  <div key={i} className="adm-tr">
                    <input value={o.title} onChange={upRow("offers", i, "title")} placeholder="e.g. Executive Office Table" />
                    <input value={o.titleUr} onChange={upRow("offers", i, "titleUr")} dir="rtl" />
                    <input value={o.priceValue ?? ""} onChange={upRow("offers", i, "priceValue")} inputMode="numeric" placeholder="Get a quote" />
                    <div className="adm-row-actions">
                      <button type="button" className="adm-icon" aria-label="Move up" onClick={() => up("offers", move(data.offers, i, -1))} disabled={i === 0}>↑</button>
                      <button type="button" className="adm-icon" aria-label="Move down" onClick={() => up("offers", move(data.offers, i, 1))} disabled={i === data.offers.length - 1}>↓</button>
                      <button type="button" className="adm-icon danger" aria-label="Delete" onClick={() => up("offers", data.offers.filter((_, j) => j !== i))}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === "home" && (
            <section>
              <div className="adm-head"><div><h1>Homepage</h1><p>The big section at the top of the website.</p></div></div>
              <div className="adm-card adm-grid">
                <Field label="Small tag above the headline" wide><input value={data.hero.pill} onChange={upObj("hero", "pill")} /></Field>
                <Field label="Headline" wide hint="Put *stars* around words to highlight them in blue, e.g. Your *trusted* partner.">
                  <input value={data.hero.h1} onChange={upObj("hero", "h1")} />
                </Field>
                <Field label="Intro text" wide><textarea rows="3" value={data.hero.lead} onChange={upObj("hero", "lead")} /></Field>
                <Field label="Price tag title"><input value={data.hero.badgeTitle} onChange={upObj("hero", "badgeTitle")} /></Field>
                <Field label="Price tag text"><input value={data.hero.badgeText} onChange={upObj("hero", "badgeText")} /></Field>
              </div>
              <div className="adm-preview">
                <span className="adm-label">Headline preview</span>
                <p className="adm-h1-preview">{String(data.hero.h1).split("*").map((s, i) => (i % 2 ? <em key={i}>{s}</em> : s))}</p>
              </div>
            </section>
          )}

          {tab === "contact" && (
            <section>
              <div className="adm-head"><div><h1>Contact &amp; payment</h1><p>Used for the call buttons, WhatsApp orders and checkout.</p></div></div>
              <div className="adm-card adm-grid">
                <Field label="Phone number" hint="Shown on the site and used for “Call now”."><input value={data.contact.phone} onChange={upObj("contact", "phone")} /></Field>
                <Field label="WhatsApp number" hint="All orders and quotes are sent here."><input value={data.contact.whatsapp} onChange={upObj("contact", "whatsapp")} /></Field>
                <Field label="Email"><input type="email" value={data.contact.email} onChange={upObj("contact", "email")} /></Field>
                <Field label="Facebook page link"><input value={data.contact.facebook} onChange={upObj("contact", "facebook")} placeholder="https://www.facebook.com/…" /></Field>
                <Field label="Instagram link"><input value={data.contact.instagram} onChange={upObj("contact", "instagram")} placeholder="https://www.instagram.com/…" /></Field>
              </div>
              <h2 className="adm-sub">Bank details for advance payment</h2>
              <div className="adm-card adm-grid">
                <Field label="Bank name"><input value={data.bank.bank} onChange={upObj("bank", "bank")} /></Field>
                <Field label="Account title"><input value={data.bank.title} onChange={upObj("bank", "title")} /></Field>
                <Field label="Account number"><input value={data.bank.account} onChange={upObj("bank", "account")} /></Field>
                <Field label="IBAN"><input value={data.bank.iban} onChange={upObj("bank", "iban")} /></Field>
                <label className="adm-check wide">
                  <input type="checkbox" checked={!!data.bank.sample} onChange={upObj("bank", "sample")} />
                  <span>Show “Sample details” label (untick once real bank details are entered)</span>
                </label>
              </div>
            </section>
          )}

          {tab === "videos" && (
            <section>
              <div className="adm-head"><div><h1>Videos</h1><p>Facebook reels shown in “Real orders, real deliveries”. Up to 12.</p></div></div>
              <form className="adm-card adm-add-reel" onSubmit={(e) => {
                e.preventDefault();
                const id = reelId(reelInput);
                if (!id) return setMsg("That doesn't look like a Facebook reel link.");
                if (data.reels.includes(id)) return setMsg("That video is already in the list.");
                setMsg(""); up("reels", [...data.reels, id].slice(0, 12)); setReelInput("");
              }}>
                <input value={reelInput} onChange={(e) => setReelInput(e.target.value)} placeholder="Paste a Facebook reel link, e.g. https://www.facebook.com/reel/123…" />
                <button className="adm-btn primary">Add video</button>
              </form>
              <ul className="adm-list">
                {data.reels.map((id, i) => (
                  <li key={id} className="adm-row">
                    <div className="adm-thumb reel">▶</div>
                    <div className="adm-row-main">
                      <strong>Video {i + 1}</strong>
                      <a href={`https://www.facebook.com/reel/${id}/`} target="_blank" rel="noopener noreferrer">facebook.com/reel/{id}</a>
                    </div>
                    <div className="adm-row-actions">
                      <button type="button" className="adm-icon" aria-label="Move up" onClick={() => up("reels", move(data.reels, i, -1))} disabled={i === 0}>↑</button>
                      <button type="button" className="adm-icon" aria-label="Move down" onClick={() => up("reels", move(data.reels, i, 1))} disabled={i === data.reels.length - 1}>↓</button>
                      <button type="button" className="adm-icon danger" aria-label="Delete" onClick={() => up("reels", data.reels.filter((_, j) => j !== i))}>🗑</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "faq" && (
            <section>
              <div className="adm-head">
                <div><h1>FAQ</h1><p>Questions and answers shown near the bottom of the site.</p></div>
                <button type="button" className="adm-btn primary" onClick={() => up("faqs", [...data.faqs, { q: "", a: "", qUr: "", aUr: "" }])}>+ Add question</button>
              </div>
              {data.faqs.map((f, i) => (
                <div key={i} className="adm-card adm-grid adm-faq">
                  <Field label={`Question ${i + 1}`}><input value={f.q} onChange={upRow("faqs", i, "q")} /></Field>
                  <Field label="Question in Urdu"><input value={f.qUr} onChange={upRow("faqs", i, "qUr")} dir="rtl" /></Field>
                  <Field label="Answer"><textarea rows="3" value={f.a} onChange={upRow("faqs", i, "a")} /></Field>
                  <Field label="Answer in Urdu"><textarea rows="3" value={f.aUr} onChange={upRow("faqs", i, "aUr")} dir="rtl" /></Field>
                  <div className="adm-row-actions wide">
                    <button type="button" className="adm-icon" aria-label="Move up" onClick={() => up("faqs", move(data.faqs, i, -1))} disabled={i === 0}>↑</button>
                    <button type="button" className="adm-icon" aria-label="Move down" onClick={() => up("faqs", move(data.faqs, i, 1))} disabled={i === data.faqs.length - 1}>↓</button>
                    <button type="button" className="adm-btn small danger" onClick={() => up("faqs", data.faqs.filter((_, j) => j !== i))}>Delete question</button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>

      {editing && (
        <ProductEditor
          product={editing}
          api={api}
          onClose={() => setEditing(null)}
          onSave={(p) => {
            const { isNew, index, ...clean } = p;
            if (isNew) {
              const base = (clean.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              let id = base || "product", n = 2;
              while (data.products.some((x) => x.id === id)) id = `${base}-${n++}`;
              up("products", [...data.products, { ...clean, id }]);
            } else {
              up("products", data.products.map((x, j) => (j === index ? clean : x)));
            }
            setEditing(null);
          }}
        />
      )}

      {dirty && (
        <div className="adm-savebar">
          <span>You have unsaved changes</span>
          <button type="button" className="adm-btn primary" onClick={save} disabled={status === "saving"}>{status === "saving" ? "Saving…" : "Save changes"}</button>
        </div>
      )}
    </div>
  );
}
