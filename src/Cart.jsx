import { useState } from 'react';
import { useCart } from './CartContext';

const fmt = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);

function Cart() {
  const { items, removeItem, updateQuantity, total, count, isOpen, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />

      <div className="cart-drawer">
        <div className="cart-header">
          <h2>
            Cart
            {count > 0 && <span className="cart-count-badge">{count}</span>}
          </h2>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.variationId}>
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>{item.name[0]}</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    {item.variationName !== 'Regular' && (
                      <p className="cart-item-variation">{item.variationName}</p>
                    )}
                    <p className="cart-item-price">{fmt(item.price, item.currency)}</p>
                  </div>

                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.variationId, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variationId, item.quantity + 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.variationId)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{fmt(total)}</strong>
              </div>

              {error && <p className="cart-error">{error}</p>}

              <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting to Square...' : 'Checkout →'}
              </button>

              <p className="cart-note">Shipping & taxes calculated at checkout</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
