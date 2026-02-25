from fastapi import FastAPI
from typing import List, Dict

app = FastAPI(title="Lanche da Si API", version="0.1.0")

# Mock de banco de dados
products = [
    {"id": 1, "name": "X-Burguer", "price": 15.0, "category": "Lanches", "image": "https://via.placeholder.com/150"},
    {"id": 2, "name": "X-Salada", "price": 18.0, "category": "Lanches", "image": "https://via.placeholder.com/150"},
    {"id": 3, "name": "Coca-Cola 350ml", "price": 6.0, "category": "Bebidas", "image": "https://via.placeholder.com/150"},
    {"id": 4, "name": "Suco de Laranja", "price": 8.0, "category": "Bebidas", "image": "https://via.placeholder.com/150"},
    {"id": 5, "name": "Batata Frita G", "price": 12.0, "category": "Acompanhamentos", "image": "https://via.placeholder.com/150"},
]

@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok", "version": "0.1.0"}

@app.get("/products", response_model=List[Dict])
async def list_products():
    return products

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
