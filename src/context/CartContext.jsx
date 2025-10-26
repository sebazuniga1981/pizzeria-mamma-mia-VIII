import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🧮 Calcula el total automáticamente
  useEffect(() => {
    const newTotal = cart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);
    setTotal(newTotal);
  }, [cart]);

  // ➕ Agregar una pizza al carrito
  const addToCart = (pizza) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === pizza.id);
      if (existing) {
        return prev.map((p) =>
          p.id === pizza.id ? { ...p, count: p.count + 1 } : p
        );
      } else {
        return [...prev, { ...pizza, count: 1 }];
      }
    });
  };

  // ➕ Incrementar cantidad
  const increment = (id) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, count: p.count + 1 } : p))
    );
  };

  // ➖ Decrementar cantidad
  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );
  };

  // 🗑 Eliminar pizza del carrito
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // 🧹 Vaciar todo el carrito (para usar en checkout)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
