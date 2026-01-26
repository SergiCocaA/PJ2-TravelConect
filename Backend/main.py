from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Importamos tus cosas (ajusta los nombres de tus archivos si hace falta)
from db.database import get_db
from auth.deps import get_current_user 
import models.usuari as models 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#TOKEN
#Autentica las credenciales del usuario en la base de datos y genera un token temporal con su ID de usuario para permitir el acceso a rutas protegidas
@app.post("/token")
def token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


#USUARIS
@app.get("/users/me")
def perfil_usuari(usuari_actual: models.Usuari = Depends(get_current_user)):
    return usuari_actual

@app.put("/users/me/{nom}/{bio}")
def actualizarPerfil(
    nom: str, 
    bio: str
    db: Session = Depends(get_db)
    usuari_actual: models.usuari = Depends(get_usuari_actual) 
):
    usuari_actual.full_name = nom
    usuari_actual.bio = bio
    db.commit()
    db.refresh(usuari_actual)
    return{"mensaje:""Perfil actualizado", "user:" usuari_actual}


#VIATGERS
@app.get("/trips")
def listarViajesDisponibles()
    return()

@app.get("/trips/{id}")
def verDetallesID()
    return()

@app.post("/trips/enroll/{id}")
def insribirID()
    return()

@app.post("/trips/leave/{id}")
def desinsribirID()
    return()

@app.post("/promote-request")
def crearPeticio()
    return()


#CREADORS DE VIATGES
@app.post("/creator/trips")
def crearViaje()
    return()

@app.put("/creator/trips/{id}")
def editarViaje()
    return()

@app.delete("/creator/trips/{id}")
def eliminarViaje()
    return()