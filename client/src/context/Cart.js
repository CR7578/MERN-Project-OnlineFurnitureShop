import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartitems = localStorage.getItem("cart");
    if (existingCartitems) setCart(JSON.parse(existingCartitems));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//Custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
