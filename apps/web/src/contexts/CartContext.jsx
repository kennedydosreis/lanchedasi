import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('lanchedasi_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('lanchedasi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const checkout = async () => {
    // Simulação de chamada API
    console.log("Enviando pedido...", cartItems);
    return new Promise((resolve) => {
      setTimeout(() => {
        clearCart();
        resolve({ success: true, orderId: Math.floor(Math.random() * 1000) });
      }, 1000);
    });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      checkout,
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};
