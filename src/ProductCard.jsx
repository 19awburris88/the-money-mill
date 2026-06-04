import { useState } from 'react';
import { useCart } from './CartContext';

export const fmt = (amount, currency = 'USD') =>
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

export default ProductCard;
