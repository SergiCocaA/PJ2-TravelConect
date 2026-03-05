from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import administrador, usuari, auth, viatge, creadorViatges, missatges
from db.database import Base, engine
from models.usuariViatge import UsuariViatge

app = FastAPI(title="TravelConnect API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(administrador.router, prefix="/admin")
app.include_router(auth.router, prefix="/auth")
app.include_router(usuari.router, prefix="/users")
app.include_router(viatge.router, prefix="/viatge")
app.include_router(creadorViatges.router, prefix ="/creadorViatges")
app.include_router(missatges.router, prefix ="/missatges")

@app.get("/")
def read_root():
    return {"mensaje": "HOLA"}