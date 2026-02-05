from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
import crud.usuari as crud_usuari
import models.usuari as models_usuari
from auth.utils import create_access_token

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    usuari = crud_usuari.autenticar_usuari(db, form_data.username, form_data.password)
    
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
