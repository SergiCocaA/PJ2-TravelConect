from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import administrador, auth, reserva, xat, usuari,viatge
from database import Base, engine

#Crear les taules a la bd
Base.metadata.create_all(bind=engine)

app.include_router(administrador.router)
app.include_router(auth.router)
app.include_router(reserva.router)
app.include_router(xat.router)
app.include_router(usuari.router)
app.include_router(viatge.router)

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