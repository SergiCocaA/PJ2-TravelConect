from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import models.usuari as models
import crud.usuari as crud  # Importem el teu crud d'usuaris

router = APIRouter()

# USUARI

@router.get("/users/me")
def perfil_usuari(usuari_actual: models.Usuari = Depends(get_current_user)):
    return usuari_actual

@router.put("/users/me/{nom}/{bio}")
def actualizar_perfil(
    nom: str, 
    bio: str,
    db: Session = Depends(get_db),
    usuari_actual: models.Usuari = Depends(get_current_user) 
):
    return crud.actualitzar_perfil_usuari(db, usuari_actual.usuaris_id, nom, bio)