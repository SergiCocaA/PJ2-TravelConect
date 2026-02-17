from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import administrador, usuari, auth, viatge, creadorViatges, missatges, login
from db.database import Base, engine

app = FastAPI(title="TravelConnect API")


Base.metadata.create_all(bind=engine)


# COMENTAR TODOS LOS ROUTERS TEMPORALMENTE
app.include_router(administrador.router, prefix="/admin")
app.include_router(auth.router, prefix="/auth")
app.include_router(usuari.router, prefix="/users")
app.include_router(viatge.router, prefix="/viatge")
app.include_router(creadorViatges.router, prefix ="/creadorViatges")
app.include_router(missatges.router, prefix ="/missatges")
app.include_router(login.router, prefix ="/login")

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