from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import usuari, viatges, auth 

app = FastAPI(title="TravelConnect API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"mensaje": "HOLA"}