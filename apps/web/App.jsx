import { useState, useEffect } from "react"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#e44", textAlign: "center" }}>🍔 Lanche da Si</h1>
      <hr />
      
      {loading ? (
        <p>Carregando cardápio...</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {products.map((p, i) => (
            <div key={i} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "#f9f9f9" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{p.name}</h3>
              <p style={{ margin: "0", color: "#666" }}>Preço: R$ {p.price.toFixed(2)}</p>
              <button style={{ marginTop: "10px", background: "#e44", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
