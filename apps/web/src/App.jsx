import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./contexts/CartContext.jsx";
import ProductCard from "./components/ProductCard.jsx";

const Header = () => {
  const { cartItems, total, checkout } = useCart();
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (count === 0) return alert("Carrinho vazio!");
    if (!confirm("Confirmar pedido?")) return;
    
    setIsCheckingOut(true);
    await checkout();
    setIsCheckingOut(false);
    alert("Pedido realizado com sucesso!");
  };

  return (
    <header style={{ 
      background: "#e44", 
      color: "white", 
      padding: "1rem", 
      display: "flex", 
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🍔 Lanchedasi</h1>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span style={{ fontWeight: "bold" }}>R$ {total.toFixed(2)}</span>
        <button 
          onClick={handleCheckout}
          disabled={isCheckingOut}
          style={{ 
            background: "white", 
            color: "#e44", 
            border: "none", 
            padding: "5px 15px", 
            borderRadius: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: isCheckingOut ? 0.7 : 1
          }}>
          {isCheckingOut ? "Enviando..." : `🛒 ${count}`}
        </button>
      </div>
    </header>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular fetch da API (já que o backend ainda está sendo debatido)
  // Num cenário real: fetch('https://lanchedasi.koyeb.app/api/products')
  useEffect(() => {
    // Mock de dados para garantir que o Front funcione independente da API hoje
    const mockProducts = [
      { id: 1, name: "X-Salada", category: "Lanches", price: 18.90 },
      { id: 2, name: "X-Bacon", category: "Lanches", price: 22.50 },
      { id: 3, name: "Coca-Cola 350ml", category: "Bebidas", price: 6.00 },
      { id: 4, name: "Batata Frita", category: "Acompanhamentos", price: 12.00 },
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Carregando cardápio...</div>;

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", borderBottom: "2px solid #e44", paddingBottom: "10px" }}>Cardápio</h2>
      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

const App = () => {
  return (
    <CartProvider>
      <div style={{ fontFamily: "Arial, sans-serif", background: "#f0f0f0", minHeight: "100vh" }}>
        <Header />
        <ProductList />
      </div>
    </CartProvider>
  );
};

export default App;
