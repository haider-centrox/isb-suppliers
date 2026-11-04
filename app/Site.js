import Icon from "./icons";
import Seal from "./Seal";
import WhatsAppButton from "./WhatsAppButton";
import Motion from "./Motion";
import MobileMenu from "./MobileMenu";
import BackToTop from "./BackToTop";
import ProductGrid from "./ProductGrid";
import QuoteForm from "./QuoteForm";
import LangSync from "./LangSync";
import { CartProvider } from "./CartContext";
import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import { SHOW_LANG_SWITCH, SITE_URL, categoryIcons, featureIcons, registrations } from "./data";
import { getContent } from "./lib/content";
import { buildView } from "./lib/view";

function Logo({ home, brand }) {
  return (
    <a href={home} className="logo" aria-label={brand}>
      <img src="/images/logo-mark.jpg" alt="" width="56" height="34" />
      <span className="logo-text">{brand}</span>
    </a>
  );
}

function LangSwitch({ t, className = "" }) {
  return (
    <a href={t.switchTo.href} className={`lang-switch ${className}`} hrefLang={t.lang === "en" ? "ur" : "en"} aria-label={t.switchTo.aria}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
      </svg>
      <span>{t.switchTo.label}</span>
    </a>
  );
}

export default async function Site({ lang = "en" }) {
  const content = await getContent();
  const { t, C, products, reels, bank } = buildView(content, lang);
  const home = lang === "en" ? "/" : "/ur";
  const wa = `https://wa.me/${C.whatsapp}`;
  const navLinks = t.nav.filter(([href]) => href !== "#verified");

  return (
    <CartProvider products={products}>
    <div lang={t.lang} dir={t.dir} className={`site site-${t.lang}`}>
      <LangSync lang={t.lang} dir={t.dir} />
      <header className="nav">
        <div className="container nav-inner">
          <Logo home={home} brand={t.brand} />
          <nav className="nav-links" aria-label="Main">
            {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            {SHOW_LANG_SWITCH && <LangSwitch t={t} />}
            <CartButton label={t.cart.open} />
            <a href={C.phoneHref} className="btn btn-dark btn-sm nav-call" aria-label={`${t.call} ${C.phone}`}>
              <Icon name="phone" size={17} />
              <span className="nav-call-label">{t.callNow}</span>
            </a>
            <MobileMenu
              links={t.nav}
              labels={t.menu}
              lang={t.lang}
              dir={t.dir}
              home={home}
              brand={t.brand}
              phoneHref={C.phoneHref}
              callText={`${t.call} ${C.phone}`}
              switchTo={SHOW_LANG_SWITCH ? t.switchTo : null}
            />
          </div>
        </div>
      </header>

      <main>
        <section className="hero hero-bg">
          <div className="hero-media" aria-hidden="true">
            <div className="hero-stage">
              <div className="hero-spot" />
              <div className="hero-floor" />
              <img className="hero-chair" src="/images/hero-chair-cutout.webp" alt="" fetchPriority="high" width="652" height="1134" />
            </div>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="pill-live">{t.hero.pill}</span></p>
              <h1>
                {t.hero.h1.map((seg, i) => (i % 2 ? <em key={i}>{seg}</em> : seg))}
              </h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="hero-actions">
                <a href="#products" className="btn btn-dark">{t.hero.see}</a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t.hero.wa}</a>
              </div>
              <dl className="stats">
                {t.hero.stats.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
              </dl>
            </div>
            <div className="hero-art">
              <div className="hero-badge">
                <strong>{t.hero.badgeTitle}</strong>
                <span>{t.hero.badgeText}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="strip">
          <div className="container strip-inner">
            {t.features.map(([title, text], i) => (
              <div key={title} className="strip-item">
                <Icon name={featureIcons[i]} />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="direct" className="section direct">
          <div className="container direct-inner">
            <div className="section-head left">
              <p className="eyebrow">{t.direct.eyebrow}</p>
              <h2>{t.direct.h2[0]}<em>{t.direct.h2[1]}</em></h2>
              <p className="muted">{t.direct.text}</p>
              <ul className="direct-points">
                {t.direct.points.map(([b, rest], i) => (
                  <li key={b}><Icon name={["tag", "shield", "ship"][i]} size={20} /><span><strong>{b}</strong>{rest}</span></li>
                ))}
              </ul>
            </div>

            <div className="chain-card">
              <div className="chain chain-us">
                <span className="chain-label">{t.direct.us}</span>
                <div className="chain-row">
                  {t.direct.usNodes.map((label, i) => (
                    <div key={label} className="node" style={{ "--n": i }}>
                      <span className="node-ic"><Icon name={["factory", "ship", "store", "user"][i]} size={22} /></span>
                      <span className="node-t">{label}</span>
                    </div>
                  ))}
                  <div className="flow" aria-hidden="true"><i /></div>
                </div>
                <div className="chain-result good"><strong>{t.direct.usResult[0]}</strong>{t.direct.usResult[1]}</div>
              </div>

              <div className="chain chain-them">
                <span className="chain-label">{t.direct.them}</span>
                <div className="chain-row">
                  {t.direct.themNodes.map((label, i) => (
                    <div key={label} className={`node${i > 0 && i < 4 ? " node-mid" : ""}`}>
                      <span className="node-ic"><Icon name={["factory", "ship", "store", "store", "user"][i]} size={18} /></span>
                      <span className="node-t">{label}</span>
                      {i > 0 && i < 4 && <span className="markup">{t.direct.margin}</span>}
                    </div>
                  ))}
                </div>
                <div className="chain-result bad">{t.direct.themResult}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{t.categoriesHead[0]}</p>
              <h2>{t.categoriesHead[1]}</h2>
            </div>
            <div className="grid-5">
              {t.categories.map(([name, text], i) => (
                <div key={name} className="category">
                  <span className="category-icon"><Icon name={categoryIcons[i]} size={28} /></span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{t.productsHead[0]}</p>
              <h2>{t.productsHead[1]}</h2>
            </div>
            <ProductGrid
              products={products}
              whatsapp={C.whatsapp}
              filters={t.filters}
              filterAria={t.filterAria}
              orderLabel={t.order}
              orderMsg={t.orderMsg}
              addLabel={t.cart.add}
              addedLabel={t.cart.added}
            />
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{t.howHead[0]}</p>
              <h2>{t.howHead[1]}</h2>
            </div>
            <ol className="steps">
              {t.steps.map(([title, text], i) => (
                <li key={title} className="step">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-group">
                {t.marquee.map((m) => <span key={m}>{m}<i>✦</i></span>)}
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="section">
          <div className="container offers">
            <div className="section-head left">
              <p className="eyebrow">{t.offersHead.eyebrow}</p>
              <h2>{t.offersHead.h2}</h2>
              <p className="muted">{t.offersHead.text}</p>
              <a href={C.phoneHref} className="btn btn-dark" style={{ marginTop: 24 }}>
                {t.call} <span dir="ltr">{C.phone}</span>
              </a>
            </div>
            <ul className="offer-list">
              {t.offers.map(([title, price]) => (
                <li key={title}>
                  <span>{title}</span>
                  <strong>{price}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="videos" className="section section-dark">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow accent">{t.videos.eyebrow}</p>
              <h2>{t.videos.h2}</h2>
              <p className="muted-light">{t.videos.text}</p>
            </div>
            <div className="reels">
              {reels.map((id) => (
                <div key={id} className="reel">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${id}/`)}&show_text=false&width=267`}
                    title={t.videos.title}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
            <div className="center">
              <a href={C.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-gold">{t.videos.fb}</a>
              <a href={C.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-insta">{t.videos.ig}</a>
            </div>
          </div>
        </section>

        <section id="verified" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">{t.verified.eyebrow}</p>
              <h2>{t.verified.h2}</h2>
              <p className="muted">{t.verified.text}</p>
            </div>
            <div className="badges">
              {registrations.map((r, i) => (
                <div key={r.seal.abbr} className={`badge${r.number ? "" : " badge-empty"}`} style={{ "--seal": r.seal.color }}>
                  <Seal {...r.seal} />
                  <strong className="badge-body" dir="ltr">{r.body}</strong>
                  <span className="badge-name">{t.verified.names[i]}</span>
                  {r.number ? (
                    <>
                      <span className="badge-num">{t.verified.labels[i]}: <span dir="ltr">{r.number}</span></span>
                      <a href={r.verifyUrl} target="_blank" rel="noopener noreferrer" className="link small">{t.verified.verify}</a>
                    </>
                  ) : (
                    <span className="badge-num placeholder">{t.verified.labels[i]} · {t.verified.pending}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faq-wrap">
            <div className="section-head left">
              <p className="eyebrow">{t.faqHead.eyebrow}</p>
              <h2>{t.faqHead.h2}</h2>
              <p className="muted">{t.faqHead.text}</p>
            </div>
            <div className="faq">
              {t.faqs.map(([q, a], i) => (
                <details key={q} open={i === 0}>
                  <summary>{q}<span className="faq-icon" aria-hidden="true" /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="container cta">
            <div>
              <img src="/images/logo.jpg" alt={t.contact.logoAlt} className="cta-logo" width="230" height="155" />
              <h2>{t.contact.h2}</h2>
              <p className="muted">{t.contact.text}</p>
              <ul className="contact-list">
                <li><Icon name="phone" size={20} /><a href={C.phoneHref} dir="ltr">{C.phone}</a></li>
                <li><Icon name="phone" size={20} /><a href={wa} target="_blank" rel="noopener noreferrer">{t.contact.whatsapp} <span dir="ltr">{C.whatsappDisplay}</span></a></li>
                <li><Icon name="mail" size={20} /><a href={`mailto:${C.email}`} dir="ltr">{C.email}</a></li>
                <li><Icon name="pin" size={20} /><span>{t.contact.city}</span></li>
                <li><Icon name="clock" size={20} /><span>{t.contact.hours}</span></li>
                <li><Icon name="globe" size={20} /><span><a href={C.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> · <a href={C.instagram} target="_blank" rel="noopener noreferrer" dir="ltr">Instagram @islamabadsuppliers</a></span></li>
              </ul>
            </div>
            <div className="cta-box">
              <QuoteForm whatsapp={C.whatsapp} t={t.quote} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo home={home} brand={t.brand} />
          <div className="socials">
            <a href={C.facebook} target="_blank" rel="noopener noreferrer" className="link">Facebook</a>
            <a href={C.instagram} target="_blank" rel="noopener noreferrer" className="link">Instagram</a>
            {SHOW_LANG_SWITCH && <LangSwitch t={t} className="lang-switch-footer" />}
          </div>
          <p>© {new Date().getFullYear()} {t.brand}. {t.footer}</p>
        </div>
      </footer>

      <WhatsAppButton number={C.whatsapp} message={t.waFloat.msg} label={t.waFloat.label} aria={t.waFloat.aria} />
      <BackToTop label={t.toTop} />
      <CartDrawer t={t.cart} lang={t.lang} whatsapp={C.whatsapp} bank={bank} siteUrl={SITE_URL} cities={t.quote.cities} />
      <Motion />
    </div>
    </CartProvider>
  );
}
