import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import moneyMillCard from "./assets/moneymill-card.png";
import Shop from "./Shop";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";
import { CartProvider, useCart } from "./CartContext";

function Navbar() {
  const { count, setIsOpen } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        The Money Mill
      </Link>

      <div className="nav-links">
        <Link to="/shop">Shop</Link>
        <a href="/#preorders">Preorders</a>
        <a href="/#about">About</a>

        <button className="cart-btn" onClick={() => setIsOpen(true)} aria-label="Open cart">
          <FiShoppingCart />
          Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Trading Cards • Collectibles • Community</p>
          <h1>Where collectors turn passion into value.</h1>
          <p className="hero-text">
            The Money Mill is your destination for Pokémon, One Piece, Dragon Ball, sports
            cards, sealed products, singles, preorders, and the hobby culture that brings
            collectors together.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">
              Shop Now
            </Link>
            <a href="#preorders" className="secondary-btn">
              Upcoming Releases
            </a>
          </div>
        </div>

        <div className="hero-image-card">
          <img src={moneyMillCard} alt="The Money Mill trading card collection" />
        </div>
      </section>

      <section className="categories" id="shop">
        <h2>Explore the Hobby</h2>
        <p className="section-subtitle">
          From modern releases to collector favorites, discover products from the most popular
          trading card games and collectible brands.
        </p>

        <div className="category-grid">
          <div className="category-card">
            <h3>Pokémon</h3>
            <p>
              Elite Trainer Boxes, booster boxes, Japanese releases, premium collections, and
              sought-after singles.
            </p>
          </div>

          <div className="category-card">
            <h3>One Piece</h3>
            <p>
              Booster boxes, starter decks, chase cards, and sealed products from one of the
              fastest-growing TCGs.
            </p>
          </div>

          <div className="category-card">
            <h3>Dragon Ball</h3>
            <p>
              Competitive and collector-focused products featuring iconic characters and
              stunning artwork.
            </p>
          </div>

          <div className="category-card">
            <h3>Sports Cards</h3>
            <p>
              Basketball, football, baseball, and other sports collectibles for investors, fans,
              and serious collectors.
            </p>
          </div>
        </div>
      </section>

      <section className="preorders" id="preorders">
        <div>
          <p className="eyebrow">Upcoming Releases</p>
          <h2>Secure your next chase.</h2>
          <p>
            The biggest products often sell out before release day. Reserve upcoming boxes,
            decks, and special collections through The Money Mill and stay ahead of the market.
          </p>
        </div>

        <div className="policy-box">
          <h3>Why Collectors Trust Us</h3>
          <ul>
            <li>100% authentic products</li>
            <li>Carefully packaged shipments</li>
            <li>Transparent preorder process</li>
            <li>Reliable customer service</li>
            <li>Collector-focused community</li>
          </ul>
        </div>
      </section>

      <section className="about" id="about">
        <h2>Built by collectors. Built for collectors.</h2>
        <p>
          The Money Mill was created for people who love the thrill of opening packs, chasing
          grails, completing collections, and being part of a community that shares the same
          passion.
        </p>
      </section>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <main className="site">
          <Navbar />
          <Cart />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>

          <footer>
            <div className="footer-content">
              <h3>The Money Mill</h3>
              <p>
                Your destination for trading cards, collectibles, sealed products, singles, and
                hobby culture.
              </p>

              <h4 className="social-heading">Follow The Mill</h4>

              <div className="social-links">
                <a
                  href="https://www.instagram.com/themoneymill_/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.tiktok.com/@uvtofficial"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>

                <a href="mailto:info@uvtofficial.com" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>

              <p className="copyright">© 2026 The Money Mill. All Rights Reserved.</p>
            </div>
          </footer>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
