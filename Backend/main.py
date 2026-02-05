from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import administrador, auth, usuari, viatge, creadorViatges, login, missatges
from db.database import Base, engine

#Crear les taules a la bd
Base.metadata.create_all(bind=engine)

app.include_router(administrador.router, prefix="/admin")
app.include_router(auth.router, prefix="/auth")
app.include_router(usuari.router, prefix="/usuari")
app.include_router(viatge.router, prefix="/viatge")
app.include_router(creadorViatgges.router, prefix ="/creadorViatges")
app.include_router(missatges.router, prefix ="/missatges")
app.include_router(login.router, prefix ="/login")


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

