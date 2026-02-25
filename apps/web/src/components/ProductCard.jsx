import { useCart } from "../contexts/CartContext.jsx";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "#f9f9f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h3 style={{ margin: "0 0 10px 0" }}>{product.name}</h3>
        <p style={{ margin: "0", color: "#666", fontSize: "0.9em" }}>{product.category}</p>
        <p style={{ margin: "5px 0 0 0", color: "#e44", fontWeight: "bold" }}>R$ {product.price.toFixed(2)}</p>
      </div>
      <button 
        onClick={handleAdd}
        style={{ 
          background: added ? "#4caf50" : "#e44", 
          color: "white", 
          border: "none", 
          padding: "10px 15px", 
          borderRadius: "4px", 
          cursor: "pointer",
          transition: "background 0.3s"
        }}
      >
        {added ? "Adicionado!" : "Adicionar"}
      </button>
    </div>
  );
};

export default ProductCard;
