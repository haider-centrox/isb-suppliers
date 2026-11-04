"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart, formatPKR } from "./CartContext";
import { KDesk } from "./illustrations";

function orderNumber() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `ISB-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function CopyBtn({ text, t }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text.replace(/\s/g, "")); setOk(true); setTimeout(() => setOk(false), 1500); } catch {}
      }}
    >
      {ok ? t.copied : t.copy}
    </button>
  );
}

export default function CartDrawer({ t, lang, whatsapp, bank, siteUrl, cities }) {
  const { items, count, subtotal, hasQuote, setQty, clear, open, setOpen, toast, products } = useCart();
  const [step, setStep] = useState("cart"); // cart | checkout | done
  const [form, setForm] = useState({ name: "", phone: "", city: cities[0], address: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [sentNo, setSentNo] = useState("");
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: false });
  };
  const money = (n) => formatPKR(n, lang);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open && step === "done") setStep("cart");
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, setOpen]);

  useEffect(() => { if (count === 0 && step === "checkout") setStep("cart"); }, [count, step]);

  const totalText = useMemo(
    () => (hasQuote ? `${money(subtotal)} ${t.plusQuote}` : money(subtotal)),
    [subtotal, hasQuote, t, lang] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const placeOrder = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!/^[+\d][\d\s-]{9,}$/.test(form.phone.trim())) err.phone = true;
    if (!form.address.trim()) err.address = true;
    setErrors(err);
    if (Object.keys(err).length) return;

    const no = orderNumber();
    const lines = [
      `*${t.msg.title}*`,
      `${t.msg.orderNo}: ${no}`,
      "",
      `*${t.msg.items}*`,
      ...items.flatMap((i, n) => [
        `${n + 1}. ${i.name} × ${i.qty} — ${i.priceValue != null ? money(i.priceValue * i.qty) : t.onRequest}`,
        `   ${t.msg.photo}: ${siteUrl}/p/${i.id}/`,
      ]),
      "",
      `*${t.msg.total}:* ${totalText}`,
      "",
      `*${t.msg.customer}*`,
      `${t.name}: ${form.name.trim()}`,
      `${t.phone}: ${form.phone.trim()}`,
      `${t.city}: ${form.city}`,
      `${t.address}: ${form.address.trim()}`,
      form.notes.trim() ? `${t.notes}: ${form.notes.trim()}` : null,
      "",
      `*${t.msg.payment}:* ${t.msg.paymentText}`,
    ].filter((l) => l !== null);

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSentNo(no);
    setStep("done");
  };

  const toastItem = toast && products.find((p) => p.id === toast.id);

  return (
    <>
      {toastItem && !open && (
        <div className="cart-toast" key={toast.at} role="status">
          <span className="cart-toast-ic">✓</span>
          <span><strong>{toastItem.name}</strong> {t.addedToCart}</span>
          <button type="button" onClick={() => setOpen(true)}>{t.view}</button>
        </div>
      )}

      <div className={`drawer-backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`drawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.title} aria-hidden={!open}>
        <header className="drawer-head">
          {step === "checkout" ? (
            <button type="button" className="drawer-back" onClick={() => setStep("cart")}>{t.back}</button>
          ) : (
            <h3>{t.title} {count > 0 && <span className="drawer-count">{count}</span>}</h3>
          )}
          <button type="button" className="mmenu-close" aria-label={t.close} onClick={() => setOpen(false)}><span /><span /></button>
        </header>

        {step === "cart" && (
          <>
            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-ic">🛒</div>
                  <p>{t.empty}</p>
                  <a href="#products" className="btn btn-dark" onClick={() => setOpen(false)}>{t.browse}</a>
                </div>
              ) : (
                <ul className="cart-lines">
                  {items.map((i) => (
                    <li key={i.id} className="cart-line">
                      <div className="cart-thumb">{i.illus ? <KDesk /> : <img src={i.img} alt="" />}</div>
                      <div className="cart-info">
                        <strong>{i.name}</strong>
                        <span className="muted small">{i.priceValue != null ? money(i.priceValue) : t.onRequest}</span>
                        <div className="qty">
                          <button type="button" aria-label={t.less} onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                          <span aria-live="polite">{i.qty}</span>
                          <button type="button" aria-label={t.more} onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                        </div>
                      </div>
                      <div className="cart-line-end">
                        <strong>{i.priceValue != null ? money(i.priceValue * i.qty) : "—"}</strong>
                        <button type="button" className="cart-remove" onClick={() => setQty(i.id, 0)}>{t.remove}</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <footer className="drawer-foot">
                <div className="cart-total"><span>{t.total}</span><strong>{money(subtotal)}{hasQuote && <small>{t.plusQuote}</small>}</strong></div>
                {hasQuote && <p className="cart-note">{t.quoteNote}</p>}
                <button type="button" className="btn btn-dark btn-block" onClick={() => setStep("checkout")}>{t.checkout}</button>
              </footer>
            )}
          </>
        )}

        {step === "checkout" && (
          <form className="drawer-body checkout" onSubmit={placeOrder} noValidate>
            <h3>{t.yourDetails}</h3>
            <label className={errors.name ? "has-error" : ""}>
              <span>{t.name} *</span>
              <input value={form.name} onChange={set("name")} autoComplete="name" />
            </label>
            <label className={errors.phone ? "has-error" : ""}>
              <span>{t.phone} *</span>
              <input value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX-XXXXXXX" dir="ltr" />
              {errors.phone && <em>{t.phoneError}</em>}
            </label>
            <label>
              <span>{t.city}</span>
              <select value={form.city} onChange={set("city")}>{cities.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className={errors.address ? "has-error" : ""}>
              <span>{t.address} *</span>
              <textarea rows="2" value={form.address} onChange={set("address")} autoComplete="street-address" />
            </label>
            <label>
              <span>{t.notes}</span>
              <textarea rows="2" value={form.notes} onChange={set("notes")} placeholder={t.notesPh} />
            </label>

            <div className="bank">
              <div className="bank-head">
                <h4>{t.bankTitle}</h4>
                {bank.sample && <span className="sample-tag">{t.sample}</span>}
              </div>
              <p className="small muted">{t.bankText}</p>
              <dl>
                <div><dt>{t.bankName}</dt><dd>{bank.bank}</dd></div>
                <div><dt>{t.accTitle}</dt><dd>{bank.title}</dd></div>
                <div><dt>{t.accNo}</dt><dd dir="ltr">{bank.account}</dd><CopyBtn text={bank.account} t={t} /></div>
                <div><dt>IBAN</dt><dd dir="ltr">{bank.iban}</dd><CopyBtn text={bank.iban} t={t} /></div>
              </dl>
            </div>

            <div className="checkout-summary">
              <span>{count} {t.itemsWord}</span>
              <strong>{money(subtotal)}{hasQuote && <small>{t.plusQuote}</small>}</strong>
            </div>
            <button type="submit" className="btn btn-wa btn-block">
              <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.36 4 14.98c0 2.32.66 4.5 1.82 6.35L4 29l7.88-1.77A12.1 12.1 0 0 0 16.04 27C22.68 27 28 21.6 28 14.98 28 8.36 22.68 3 16.04 3Zm0 21.8c-1.86 0-3.6-.5-5.1-1.4l-.37-.22-4.68 1.05 1.08-4.5-.24-.38A9.7 9.7 0 0 1 6.3 15c0-5.38 4.37-9.76 9.74-9.76 5.36 0 9.66 4.38 9.66 9.76 0 5.37-4.3 9.8-9.66 9.8Z" /></svg>
              {t.placeOrder}
            </button>
            <p className="cart-note center-text">{t.placeNote}</p>
          </form>
        )}

        {step === "done" && (
          <div className="drawer-body order-done">
            <div className="done-ic">✓</div>
            <h3>{t.doneTitle}</h3>
            <p className="muted">{t.doneText}</p>
            <p className="order-no" dir="ltr">{sentNo}</p>
            <button type="button" className="btn btn-dark btn-block" onClick={() => { clear(); setOpen(false); }}>{t.newOrder}</button>
            <button type="button" className="btn btn-ghost btn-block" onClick={() => setStep("checkout")}>{t.resend}</button>
          </div>
        )}
      </aside>
    </>
  );
}
