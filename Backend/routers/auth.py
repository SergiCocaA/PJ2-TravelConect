from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
from auth.utils import authenticate_user, create_access_token
import models.usuari as modelsUsuari
import crud.usuari as crudUsuari
#Autentica las credenciales del usuario en la base de datos y genera un token temporal con su ID de usuario para permitir el acceso a rutas protegidas
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
import crud.auth as crud_auth
from auth.utils import create_access_token 

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    usuari = crud_auth.autenticar_usuari(db, form_data.username, form_data.password)
    
    if not usuari:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Email o contrasenya incorrectes")
    
    access_token = create_access_token(data={"sub": str(usuari.usuaris_id), "rol": usuari.rol})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "rol": usuari.rol 
    } 

@router.post("/register")
def register(db: Session = Depends(get_db), data: dict=Body(...)):
    usuari = db.query(modelsUsuari.Usuari).filter(modelsUsuari.Usuari.email == data["email"]).first()
    if usuari:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    return crudUsuari.crear_usuari(db, data)
