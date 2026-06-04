import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiCheck,
  FiPackage,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import moneyMillCard from "./assets/moneymill-card.png";
import Shop from "./Shop";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";
import ProductCard from "./ProductCard";
import { CartProvider, useCart } from "./CartContext";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

// Wraps any element with a scroll-triggered fade-up animation
function AnimateIn({ as: Tag = "section", className = "", id, children, threshold = 0.1 }) {
  const [ref, visible] = useScrollAnimation(threshold);
  return (
    <Tag
      ref={ref}
      id={id}
      className={`fade-up${visible ? " visible" : ""}${className ? " " + className : ""}`}
    >
      {children}
    </Tag>
  );
}

function Navbar() {
  const { count, setIsOpen: setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={close}>
        The Money Mill
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((m) => !m)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        <Link to="/shop" onClick={close}>Shop</Link>
        <a href="/#about" onClick={close}>About</a>
        <button
          className="cart-btn"
          onClick={() => { setCartOpen(true); close(); }}
          aria-label="Open cart"
        >
          <FiShoppingCart />
          Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </nav>
  );
}

const PROOF_ITEMS = [
  { icon: <FiCheck />, stat: "100%", label: "Authentic Products" },
  { icon: <FiPackage />, stat: "Fast", label: "Shipping & Handling" },
  { icon: <FiStar />, stat: "Trusted", label: "By Collectors" },
  { icon: <FiUsers />, stat: "5,000+", label: "Happy Collectors" },
];

const CATEGORIES = [
  {
    name: "Pokémon",
    slug: "pokemon",
    accent: "#FBBF24",
    desc: "Elite Trainer Boxes, booster boxes, Japanese releases, premium collections, and sought-after singles.",
  },
  {
    name: "One Piece",
    slug: "onepiece",
    accent: "#EF4444",
    desc: "Booster boxes, starter decks, chase cards, and sealed products from one of the fastest-growing TCGs.",
  },
  {
    name: "Dragon Ball",
    slug: "dragonball",
    accent: "#F97316",
    desc: "Competitive and collector-focused products featuring iconic characters and stunning artwork.",
  },
  {
    name: "Sports Cards",
    slug: "sports",
    accent: "#22C55E",
    desc: "Basketball, football, baseball, and other sports collectibles for investors, fans, and serious collectors.",
  },
];

const INSTA_GRADIENTS = [
  "linear-gradient(135deg, #2d174f, #7c3aed)",
  "linear-gradient(135deg, #16213e, #1a1a4e)",
  "linear-gradient(135deg, #3d0000, #7c1a1a)",
  "linear-gradient(135deg, #0d0d0d, #2d174f)",
  "linear-gradient(135deg, #1a1a1a, #5b21b6)",
  "linear-gradient(135deg, #16213e, #7c3aed)",
];

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setProducts(data.products))
      .catch(() => {});
  }, []);

  const featuredProducts = products.slice(0, 4);
  const preorderProducts = products.filter((p) =>
    p.categoryName?.toLowerCase().includes("preorder") ||
    p.categoryName?.toLowerCase().includes("pre-order")
  );

  return (
    <>
      {/* Hero — above the fold, no fade-in needed */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Trading Cards • Collectibles • Community</p>
          <h1>Where collectors turn passion into value.</h1>
          <p className="hero-text">
            The Money Mill is your destination for Pokémon, One Piece, Dragon Ball, sports cards,
            sealed products, singles, preorders, and the hobby culture that brings collectors together.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">Shop Now</Link>
            <a href="#preorders" className="secondary-btn">Upcoming Releases</a>
          </div>
        </div>
        <div className="hero-image-card">
          <img src={moneyMillCard} alt="The Money Mill trading card collection" />
        </div>
      </section>

      {/* Social Proof Bar */}
      <AnimateIn as="div" className="social-proof-bar" threshold={0.05}>
        {PROOF_ITEMS.map((item) => (
          <div className="proof-item" key={item.label}>
            <span className="proof-icon">{item.icon}</span>
            <div className="proof-text">
              <strong>{item.stat}</strong>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </AnimateIn>

      {/* Featured Products — only renders when Square returns products */}
      {featuredProducts.length > 0 && (
        <AnimateIn className="featured-products" id="featured">
          <div className="section-header">
            <div>
              <p className="eyebrow">New Arrivals</p>
              <h2>Fresh in the shop.</h2>
            </div>
            <Link to="/shop" className="secondary-btn view-all-btn">View All →</Link>
          </div>
          <div className="shop-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimateIn>
      )}

      {/* Categories */}
      <AnimateIn className="categories" id="shop">
        <h2>Explore the Hobby</h2>
        <p className="section-subtitle">
          From modern releases to collector favorites, discover products from the most popular
          trading card games and collectible brands.
        </p>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
              key={cat.slug}
              style={{ "--cat-accent": cat.accent }}
            >
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <span className="cat-cta">Shop {cat.name} →</span>
            </Link>
          ))}
        </div>
      </AnimateIn>

      {/* Preorders */}
      <AnimateIn className="preorders" id="preorders">
        <div className="preorders-text">
          <p className="eyebrow">Upcoming Releases</p>
          <h2>Secure your next chase.</h2>
          <p>
            The biggest products often sell out before release day. Reserve upcoming boxes, decks,
            and special collections through The Money Mill and stay ahead of the market.
          </p>
          <Link
            to={preorderProducts.length > 0 ? "/shop?category=Preorders" : "/shop"}
            className="primary-btn"
          >
            {preorderProducts.length > 0 ? "Browse Preorders" : "Shop All Products"}
          </Link>
        </div>

        <div className="preorders-cards">
          {preorderProducts.length > 0 ? (
            preorderProducts.slice(0, 3).map((product) => (
              <div className="preorder-card" key={product.id}>
                <div className="preorder-tag">Reserve Now</div>
                <h4>{product.name}</h4>
                <p>{product.categoryName}</p>
              </div>
            ))
          ) : (
            <>
              <div className="preorder-card locked">
                <div className="preorder-tag">Coming Soon</div>
                <h4>New Pokémon Release</h4>
                <p>Details dropping soon — follow our socials for the announcement.</p>
              </div>
              <div className="preorder-card locked">
                <div className="preorder-tag">Coming Soon</div>
                <h4>One Piece New Set</h4>
                <p>Reserve your spot before it sells out.</p>
              </div>
              <div className="preorder-card locked">
                <div className="preorder-tag">Coming Soon</div>
                <h4>Dragon Ball Set</h4>
                <p>Stay tuned for the official reveal.</p>
              </div>
            </>
          )}
        </div>
      </AnimateIn>

      {/* Instagram / Social */}
      <AnimateIn className="instagram-section">
        <div className="instagram-header">
          <div className="instagram-header-text">
            <p className="eyebrow">@themoneymill_</p>
            <h2>Follow the hobby in real time.</h2>
            <p>
              Opens, pulls, preorders, events — follow The Money Mill for daily content from
              inside the hobby.
            </p>
          </div>
          <div className="instagram-actions">
            <a
              href="https://www.instagram.com/themoneymill_/"
              target="_blank"
              rel="noreferrer"
              className="primary-btn insta-btn"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              href="https://www.tiktok.com/@uvtofficial"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              <FaTiktok /> TikTok
            </a>
          </div>
        </div>

        <div className="instagram-grid">
          {INSTA_GRADIENTS.map((gradient, i) => (
            <a
              key={i}
              href="https://www.instagram.com/themoneymill_/"
              target="_blank"
              rel="noreferrer"
              className="instagram-post"
              style={{ background: gradient }}
              aria-label="View on Instagram"
            />
          ))}
        </div>
      </AnimateIn>

      {/* About */}
      <AnimateIn className="about" id="about">
        <h2>Built by collectors. Built for collectors.</h2>
        <p>
          The Money Mill was created for people who love the thrill of opening packs, chasing
          grails, completing collections, and being part of a community that shares the same
          passion.
        </p>
      </AnimateIn>
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
