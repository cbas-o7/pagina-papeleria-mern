import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Aquí puedes agregar funciones para manipular el carrito
  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
