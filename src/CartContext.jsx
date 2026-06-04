import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, variation) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variationId === variation.id);
      if (existing) {
        return prev.map((i) =>
          i.variationId === variation.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          variationId: variation.id,
          productId: product.id,
          name: product.name,
          variationName: variation.name,
          price: variation.price,
          currency: variation.currency,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variationId) => {
    setItems((prev) => prev.filter((i) => i.variationId !== variationId));
  }, []);

  const updateQuantity = useCallback(
    (variationId, quantity) => {
      if (quantity <= 0) {
        removeItem(variationId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.variationId === variationId ? { ...i, quantity } : i))
      );
    },
    [removeItem]
  );

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
