import { Sofa, Armchair, Bed, Dining, Desk, Lamp } from "./illustrations";
import NewsletterForm from "./NewsletterForm";

const categories = [
  { name: "Living Room", count: "48 pieces", Art: Sofa, bg: "#efe4d2" },
  { name: "Bedroom", count: "36 pieces", Art: Bed, bg: "#e6ebe3" },
  { name: "Dining", count: "22 pieces", Art: Dining, bg: "#f1e7dc" },
  { name: "Office", count: "30 pieces", Art: Desk, bg: "#e9e6df" },
];

const products = [
  { name: "Margalla 3-Seater Sofa", price: "Rs. 145,000", tag: "Bestseller", Art: Sofa, color: "#c8a46e" },
  { name: "Faisal Lounge Chair", price: "Rs. 48,500", tag: "New", Art: Armchair, color: "#7d8f7a" },
  { name: "Shakarparian King Bed", price: "Rs. 189,000", Art: Bed, color: "#d9c3a5" },
  { name: "Rawal 6-Seat Dining Set", price: "Rs. 132,000", Art: Dining, color: "#a87b51" },
  { name: "Blue Area Work Desk", price: "Rs. 54,000", tag: "New", Art: Desk, color: "#b9925f" },
  { name: "Daman Floor Lamp", price: "Rs. 14,900", Art: Lamp, color: "#e7b85a" },
];

const reasons = [
  { title: "Solid sheesham & oak", text: "Kiln-dried hardwood frames built to last decades, not seasons." },
  { title: "Made to order", text: "Pick your size, fabric and finish. Our workshop builds it for you." },
  { title: "Free delivery & fitting", text: "Free delivery and assembly across Islamabad and Rawalpindi." },
  { title: "5-year warranty", text: "Every frame is covered. If something fails, we fix it." },
];

const testimonials = [
  { quote: "The sofa arrived on time, the team set it up in ten minutes, and the stitching is perfect.", name: "Ayesha K.", place: "F-7, Islamabad" },
  { quote: "We furnished our whole office through ISB Suppliers. Great prices on bulk orders and very professional.", name: "Usman R.", place: "Blue Area" },
  { quote: "They customised our dining table to fit a small space. Honestly better than the showroom ones.", name: "Sana M.", place: "Bahria Town" },
];

function Logo() {
  return (
    <a href="#" className="logo" aria-label="ISB Suppliers home">
      <span className="logo-mark">ISB</span>
      <span className="logo-text">Suppliers</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            <a href="#categories">Shop</a>
            <a href="#featured">Featured</a>
            <a href="#why">Why us</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#featured" className="btn btn-dark btn-sm">Shop now</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Furniture suppliers · Islamabad</p>
              <h1>Furniture that makes a house feel like home.</h1>
              <p className="lead">
                Sofas, beds, dining sets and office furniture, built from solid wood in our own
                workshop and delivered to your door.
              </p>
              <div className="hero-actions">
                <a href="#featured" className="btn btn-dark">Browse collection</a>
                <a href="#contact" className="btn btn-ghost">Get a quote</a>
              </div>
              <dl className="stats">
                <div><dt>2,500+</dt><dd>Homes furnished</dd></div>
                <div><dt>15 yrs</dt><dd>In business</dd></div>
                <div><dt>4.9★</dt><dd>Customer rating</dd></div>
              </dl>
            </div>
            <div className="hero-art">
              <div className="hero-sun" />
              <div className="hero-card">
                <Sofa color="#c8a46e" />
              </div>
              <div className="hero-badge">
                <strong>Up to 20% off</strong>
                <span>Winter collection</span>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Shop by room</p>
              <h2>Find the right piece for every space</h2>
            </div>
            <div className="grid-4">
              {categories.map(({ name, count, Art, bg }) => (
                <a key={name} href="#featured" className="category" style={{ background: bg }}>
                  <div className="category-art"><Art /></div>
                  <h3>{name}</h3>
                  <span>{count} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Featured</p>
              <h2>Our most-loved pieces</h2>
            </div>
            <div className="grid-3">
              {products.map(({ name, price, tag, Art, color }) => (
                <article key={name} className="product">
                  <div className="product-art">
                    {tag && <span className="tag">{tag}</span>}
                    <Art color={color} />
                  </div>
                  <div className="product-body">
                    <h3>{name}</h3>
                    <div className="product-row">
                      <span className="price">{price}</span>
                      <a href="#contact" className="link">Order →</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="section">
          <div className="container why">
            <div className="section-head left">
              <p className="eyebrow">Why ISB Suppliers</p>
              <h2>Built properly. Priced fairly.</h2>
              <p className="muted">
                We supply homes, offices and hotels with furniture made in our own workshop, so you
                get showroom quality without the showroom markup.
              </p>
            </div>
            <div className="reasons">
              {reasons.map((r, i) => (
                <div key={r.title} className="reason">
                  <span className="reason-num">0{i + 1}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow gold">Reviews</p>
              <h2>What our customers say</h2>
            </div>
            <div className="grid-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="quote">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.place}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container cta">
            <div>
              <h2>Planning a new space?</h2>
              <p className="muted">
                Call or WhatsApp us for a free quote, or subscribe for new arrivals and offers.
              </p>
              <ul className="contact-list">
                <li><span>Phone / WhatsApp</span> +92 300 0000000</li>
                <li><span>Showroom</span> Islamabad, Pakistan</li>
                <li><span>Hours</span> Mon–Sat, 10am – 8pm</li>
              </ul>
            </div>
            <div className="cta-box">
              <h3>Get new arrivals first</h3>
              <p>One email a month. No spam.</p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <p>© {new Date().getFullYear()} ISB Suppliers. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
