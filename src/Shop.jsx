import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

const fmt = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0] ?? null);

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>{product.categoryName || 'Item'}</span>
        )}
      </div>

      <div className="product-info">
        {product.categoryName && (
          <p className="product-category">{product.categoryName}</p>
        )}
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}

        <div className="product-bottom">
          <strong>
            {selectedVariation
              ? selectedVariation.price > 0
                ? fmt(selectedVariation.price, selectedVariation.currency)
                : 'Free'
              : 'Coming Soon'}
          </strong>

          {selectedVariation && (
            <div className="product-actions">
              {product.variations.length > 1 && (
                <select
                  className="variation-select"
                  value={selectedVariation.id}
                  onChange={(e) =>
                    setSelectedVariation(
                      product.variations.find((v) => v.id === e.target.value)
                    )
                  }
                >
                  {product.variations.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="add-to-cart-btn"
                onClick={() => addItem(product, selectedVariation)}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load products');
        return r.json();
      })
      .then((data) => {
        setProducts(data.products);
        setCategories(data.categories.filter(Boolean));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.categoryName === activeCategory);

  return (
    <section className="shop-page">
      <div className="shop-hero">
        <p className="eyebrow">The Money Mill Shop</p>
        <h1>Shop trading cards, sealed products, and collector favorites.</h1>
        <p>
          Browse Pokémon, One Piece, Dragon Ball, sports cards, singles, preorders, and
          collector-focused products.
        </p>
      </div>

      {!loading && !error && categories.length > 0 && (
        <div className="shop-toolbar">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="shop-status">
          <div className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="shop-status">
          <p style={{ color: '#f87171' }}>Couldn't load products right now. Try again later.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="shop-status">
          <p>No products in this category yet.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="shop-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;
