from fastapi import FastAPI

app = FastAPI(title="OpenClaw API", version="0.1.0")

@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok", "version": "0.1.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
