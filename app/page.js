import { KDesk, ErgoChair, ExecDesk, Workstation, Conference, Storage } from "./illustrations";
import NewsletterForm from "./NewsletterForm";
import WhatsAppButton from "./WhatsAppButton";

const categories = [
  { name: "Gaming Tables", count: "K-shaped & RGB", Art: KDesk, bg: "#ebebee" },
  { name: "Ergonomic Chairs", count: "Black mesh & leather", Art: ErgoChair, bg: "#e7e8ec" },
  { name: "Office Desks", count: "Executive & manager", Art: ExecDesk, bg: "#efebe6" },
  { name: "Workstations", count: "2 to 12 seats", Art: Workstation, bg: "#e9ebe9" },
];

const products = [
  { name: "K-Shape Pro Gaming Table 140cm", price: "Rs. 38,500", tag: "Bestseller", Art: KDesk, props: {} },
  { name: "ErgoMax Black Mesh Chair", price: "Rs. 42,000", tag: "Bestseller", Art: ErgoChair, props: {} },
  { name: "K-Shape Carbon Gaming Table 160cm", price: "Rs. 46,000", tag: "New", Art: KDesk, props: { accent: "#3b82f6" } },
  { name: "ErgoMax Pro Chair with Headrest", price: "Rs. 55,000", Art: ErgoChair, props: { accent: "#3b82f6" } },
  { name: "Executive Office Desk", price: "Rs. 72,000", Art: ExecDesk, props: {} },
  { name: "4-Seat Office Workstation", price: "Rs. 118,000", tag: "Bulk deal", Art: Workstation, props: {} },
];

const reasons = [
  { title: "Built for long hours", text: "Adjustable lumbar support, 4D armrests and recline lock to keep your back happy all day." },
  { title: "Sturdy K-frame steel", text: "Our gaming tables use powder-coated steel K-legs that don't wobble, even with three monitors." },
  { title: "Office & bulk orders", text: "Fitting out a whole office? Get special pricing on 5+ chairs or workstations." },
  { title: "Free delivery & assembly", text: "Free delivery and setup across Islamabad and Rawalpindi, with a 1-year warranty." },
];

const testimonials = [
  { quote: "The K-shaped table is rock solid. Two monitors, a PC and a mic arm on it and zero shake.", name: "Hamza A.", place: "Gamer, G-11" },
  { quote: "We ordered 20 black ergonomic chairs for our software house. Delivered and assembled in a day.", name: "Usman R.", place: "Office manager, Blue Area" },
  { quote: "My back pain at work is gone since switching to the ErgoMax chair. Worth every rupee.", name: "Sana M.", place: "Bahria Town" },
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
            <a href="#featured">Products</a>
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
              <p className="eyebrow">Office & gaming furniture · Islamabad</p>
              <h1>Sit better. Play longer. Work smarter.</h1>
              <p className="lead">
                K-shaped gaming tables, black ergonomic chairs and complete office setups, delivered
                and assembled for free.
              </p>
              <div className="hero-actions">
                <a href="#featured" className="btn btn-dark">Browse products</a>
                <a href="#contact" className="btn btn-ghost">Get a bulk quote</a>
              </div>
              <dl className="stats">
                <div><dt>5,000+</dt><dd>Chairs delivered</dd></div>
                <div><dt>300+</dt><dd>Offices furnished</dd></div>
                <div><dt>4.9★</dt><dd>Customer rating</dd></div>
              </dl>
            </div>
            <div className="hero-art">
              <div className="hero-glow" />
              <div className="hero-card">
                <div className="hero-scene">
                  <div className="hero-desk"><KDesk /></div>
                  <div className="hero-chair"><ErgoChair /></div>
                </div>
              </div>
              <div className="hero-badge">
                <strong>Combo deal</strong>
                <span>Gaming table + chair from Rs. 76,000</span>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Shop by category</p>
              <h2>Everything for your desk setup</h2>
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
              <p className="eyebrow">Top sellers</p>
              <h2>Gaming tables & ergonomic chairs</h2>
            </div>
            <div className="grid-3">
              {products.map(({ name, price, tag, Art, props }) => (
                <article key={name} className="product">
                  <div className="product-art">
                    {tag && <span className="tag">{tag}</span>}
                    <Art {...props} />
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
              <h2>Comfort you can feel on day one.</h2>
              <p className="muted">
                From a single gaming setup to a full office floor, we supply furniture that is built
                to handle 8+ hours of daily use, at prices that make sense.
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
              <p className="eyebrow accent">Reviews</p>
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
              <h2>Setting up an office or a battle station?</h2>
              <p className="muted">
                Call or WhatsApp us for prices, bulk quotes and custom sizes.
              </p>
              <ul className="contact-list">
                <li><span>Phone / WhatsApp</span> <a className="link" href="https://wa.me/923028599511" target="_blank" rel="noopener noreferrer">+92 302 8599511</a></li>
                <li><span>Showroom</span> Islamabad, Pakistan</li>
                <li><span>Hours</span> Mon–Sat, 10am – 8pm</li>
              </ul>
            </div>
            <div className="cta-box">
              <h3>Get deals first</h3>
              <p>New arrivals and combo offers, once a month.</p>
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

      <WhatsAppButton />
    </>
  );
}
