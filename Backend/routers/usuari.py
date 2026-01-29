from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import models.usuari as models


#USUARIS
@router.get("/users/me")
def perfil_usuari(usuari_actual: models.Usuari = Depends(get_current_user)):
    return usuari_actual

@router.put("/users/me/{nom}/{bio}")
def actualizar_perfil(
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

