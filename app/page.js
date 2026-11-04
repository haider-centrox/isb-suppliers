import Icon from "./icons";
import Seal from "./Seal";
import WhatsAppButton from "./WhatsAppButton";
import Motion from "./Motion";
import MobileMenu from "./MobileMenu";
import BackToTop from "./BackToTop";
import ProductGrid from "./ProductGrid";
import QuoteForm from "./QuoteForm";
import { CONTACT, categories, products, offers, features, reels, registrations, steps, faqs } from "./data";

function Logo() {
  return (
    <a href="#" className="logo" aria-label="ISB Suppliers home">
      <img src="/images/logo-mark.jpg" alt="" width="56" height="34" />
      <span className="logo-text">ISB Suppliers</span>
    </a>
  );
}

const featureIcons = ["ship", "truck", "tag", "globe"];

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            <a href="#direct">Why us</a>
            <a href="#products">Products</a>
            <a href="#how">How to order</a>
            <a href="#offers">Prices</a>
            <a href="#videos">Videos</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <a href={CONTACT.phoneHref} className="btn btn-dark btn-sm">Call now</a>
            <MobileMenu phoneHref={CONTACT.phoneHref} phone={CONTACT.phone} />
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
              <p className="eyebrow"><span className="pill-live">Direct import · No middleman</span></p>
              <h1>
                Your <em>trusted</em> partner in quality products &amp; <em>reliable</em> supply.
              </h1>
              <p className="lead">
                High-quality furniture, IT equipment and office solutions, imported by container
                straight to our shop in Islamabad. No dealers, no middlemen, so you pay the
                lowest rates in the market.
              </p>
              <div className="hero-actions">
                <a href="#products" className="btn btn-dark">See products</a>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Order on WhatsApp</a>
              </div>
              <dl className="stats">
                <div><dt>8K+</dt><dd>Facebook &amp; Instagram followers</dd></div>
                <div><dt>5</dt><dd>Product categories</dd></div>
                <div><dt>🇵🇰</dt><dd>Nationwide delivery</dd></div>
              </dl>
            </div>
            <div className="hero-art">
              <div className="hero-badge">
                <strong>Container prices</strong>
                <span>Executive mesh chairs from Rs. 23,000</span>
              </div>
            </div>
          </div>
        </section>

        <section className="strip">
          <div className="container strip-inner">
            {features.map((f, i) => (
              <div key={f.title} className="strip-item">
                <Icon name={featureIcons[i]} />
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="direct" className="section direct">
          <div className="container direct-inner">
            <div className="section-head left">
              <p className="eyebrow">Why we&apos;re cheaper</p>
              <h2>Straight from the container to our shop. <em>No middleman.</em></h2>
              <p className="muted">
                Most furniture passes through an importer, a wholesaler and a dealer before it reaches
                you, and each one adds their margin. We import directly, so that markup stays in your
                pocket. Same high-quality products, at the lowest rates.
              </p>
              <ul className="direct-points">
                <li><Icon name="tag" size={20} /><span><strong>Lowest rates</strong> with no dealer markup</span></li>
                <li><Icon name="shield" size={20} /><span><strong>High quality</strong> checked by us at the source</span></li>
                <li><Icon name="ship" size={20} /><span><strong>Fresh container stock</strong> arriving regularly</span></li>
              </ul>
            </div>

            <div className="chain-card">
              <div className="chain chain-us">
                <span className="chain-label">ISB Suppliers</span>
                <div className="chain-row">
                  {[["factory", "Factory"], ["ship", "Container"], ["store", "Our shop"], ["user", "You"]].map(([ic, t], i) => (
                    <div key={t} className="node" style={{ "--n": i }}>
                      <span className="node-ic"><Icon name={ic} size={22} /></span>
                      <span className="node-t">{t}</span>
                    </div>
                  ))}
                  <div className="flow" aria-hidden="true"><i /></div>
                </div>
                <div className="chain-result good"><strong>Lowest price</strong> · 0 middlemen</div>
              </div>

              <div className="chain chain-them">
                <span className="chain-label">Typical market</span>
                <div className="chain-row">
                  {[["factory", "Factory"], ["ship", "Importer"], ["store", "Wholesaler"], ["store", "Dealer"], ["user", "You"]].map(([ic, t], i) => (
                    <div key={t} className={`node${i > 0 && i < 4 ? " node-mid" : ""}`}>
                      <span className="node-ic"><Icon name={ic} size={18} /></span>
                      <span className="node-t">{t}</span>
                      {i > 0 && i < 4 && <span className="markup">+ margin</span>}
                    </div>
                  ))}
                </div>
                <div className="chain-result bad">Higher price · 3 middlemen</div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">What we supply</p>
              <h2>Everything your office needs, from one supplier</h2>
            </div>
            <div className="grid-5">
              {categories.map((c) => (
                <div key={c.name} className="category">
                  <span className="category-icon"><Icon name={c.icon} size={28} /></span>
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">From our showroom</p>
              <h2>Office, executive &amp; gaming chairs</h2>
            </div>
            <ProductGrid products={products} whatsapp={CONTACT.whatsapp} />
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">How to order</p>
              <h2>From message to delivery in four simple steps</h2>
            </div>
            <ol className="steps">
              {steps.map((st, i) => (
                <li key={st.title} className="step">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-group">
                {["Executive Chairs", "Gaming Chairs", "Conference Tables", "Executive Tables", "K-Shaped Gaming Tables", "Office Workstations", "IT Equipment", "Electronics", "Appliances", "Complete Office Setups"].map((t) => (
                  <span key={t}>{t}<i>✦</i></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="section">
          <div className="container offers">
            <div className="section-head left">
              <p className="eyebrow">Price list</p>
              <h2>Current offers</h2>
              <p className="muted">
                Executive tables, customized conference tables, student desks and complete office
                setups. Prices change with stock, so message us for today&apos;s rate.
              </p>
              <a href={CONTACT.phoneHref} className="btn btn-dark" style={{ marginTop: 24 }}>Call {CONTACT.phone}</a>
            </div>
            <ul className="offer-list">
              {offers.map((o) => (
                <li key={o.title}>
                  <span>{o.title}</span>
                  <strong>{o.price}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="videos" className="section section-dark">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow accent">Watch</p>
              <h2>Real orders, real deliveries</h2>
              <p className="muted-light">Product reels, deliveries and customer feedback from our Facebook page.</p>
            </div>
            <div className="reels">
              {reels.map((id) => (
                <div key={id} className="reel">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${id}/`)}&show_text=false&width=267`}
                    title="ISB Suppliers video"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
            <div className="center">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-gold">More on Facebook</a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-insta">Follow on Instagram</a>
            </div>
          </div>
        </section>

        <section id="verified" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Registrations</p>
              <h2>A registered business you can verify</h2>
              <p className="muted">Our registration details, so companies and government offices can buy from us with confidence.</p>
            </div>
            <div className="badges">
              {registrations.map((r) => (
                <div key={r.body + r.label} className={`badge${r.number ? "" : " badge-empty"}`} style={{ "--seal": r.seal.color }}>
                  <Seal {...r.seal} />
                  <strong className="badge-body">{r.body}</strong>
                  <span className="badge-name">{r.name}</span>
                  {r.number ? (
                    <>
                      <span className="badge-num">{r.label}: {r.number}</span>
                      <a href={r.verifyUrl} target="_blank" rel="noopener noreferrer" className="link small">Verify →</a>
                    </>
                  ) : (
                    <span className="badge-num placeholder">{r.label} · pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faq-wrap">
            <div className="section-head left">
              <p className="eyebrow">FAQ</p>
              <h2>Questions customers ask us</h2>
              <p className="muted">Can&apos;t find your answer? Message us on WhatsApp and we&apos;ll reply quickly.</p>
            </div>
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}<span className="faq-icon" aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="container cta">
            <div>
              <img src="/images/logo.jpg" alt="ISB Suppliers logo" className="cta-logo" width="230" height="155" />
              <h2>Order now</h2>
              <p className="muted">Call, WhatsApp or email us for prices, bulk orders and custom office setups.</p>
              <ul className="contact-list">
                <li><Icon name="phone" size={20} /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li><Icon name="phone" size={20} /><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsappDisplay}</a></li>
                <li><Icon name="mail" size={20} /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li><Icon name="pin" size={20} /><span>{CONTACT.city} · delivering across Pakistan</span></li>
                <li><Icon name="clock" size={20} /><span>{CONTACT.hours}</span></li>
                <li><Icon name="globe" size={20} /><span><a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> · <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram @islamabadsuppliers</a></span></li>
              </ul>
            </div>
            <div className="cta-box">
              <QuoteForm whatsapp={CONTACT.whatsapp} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <div className="socials">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="link">Facebook</a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="link">Instagram</a>
          </div>
          <p>© {new Date().getFullYear()} ISB Suppliers. All rights reserved.</p>
        </div>
      </footer>

      <WhatsAppButton />
      <BackToTop />
      <Motion />
    </>
  );
}
