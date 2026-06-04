import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';

function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get('category') ?? 'All'
  );
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
