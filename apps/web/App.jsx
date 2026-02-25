import { useState, useEffect } from "react"
import ProductCard from "./src/components/ProductCard.jsx"
import { useCart } from "./src/contexts/CartContext.jsx"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const { cartItems, total, updateQuantity, clearCart } = useCart()
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err)
        setLoading(false)
      })
  }, [])

  const categories = ["Todos", ...new Set(products.map((p) => p.category))]

  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter((p) => p.category === selectedCategory)

  const handleCheckout = () => {
    const order = {
      items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
      total: total
    }
    console.log("Enviando pedido:", order)
    alert("Pedido enviado com sucesso! (Simulação)")
    clearCart()
    setShowCart(false)
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto", paddingBottom: "100px" }}>
      <h1 style={{ color: "#e44", textAlign: "center" }}>🍔 Lanche da Si</h1>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #e44",
              background: selectedCategory === cat ? "#e44" : "white",
              color: selectedCategory === cat ? "white" : "#e44",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />
      
      {loading ? (
        <p style={{ textAlign: "center" }}>Carregando cardápio...</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Nenhum produto encontrado nesta categoria.</p>
          )}
        </div>
      )}

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#e44",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "15px 25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            zIndex: 1000
          }}
        >
          🛒 {cartItems.length} itens - R$ {total.toFixed(2)}
        </button>
      )}

      {/* Cart Modal / Sidebar (Simples) */}
      {showCart && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1001
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "400px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <h2 style={{ marginTop: 0 }}>Seu Carrinho</h2>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <div>
                  <div style={{ fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ fontSize: "0.9em", color: "#666" }}>R$ {item.price.toFixed(2)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "5px 10px" }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "5px 10px" }}>+</button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "20px", fontSize: "1.2em", fontWeight: "bold", textAlign: "right" }}>
              Total: R$ {total.toFixed(2)}
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button 
                onClick={() => setShowCart(false)} 
                style={{ flex: 1, padding: "10px", background: "#eee", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Fechar
              </button>
              <button 
                onClick={handleCheckout}
                style={{ flex: 2, padding: "10px", background: "#e44", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
