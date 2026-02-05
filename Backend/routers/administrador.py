from sqlalchemy.orm import Session
from db.database import get_db
from models.usuari import Usuari
from schemas.usuari import UsuariCreate, UsuariResponse
from fastapi import APIRouter, Depends, HTTPException, Body
from auth.deps import get_current_user

router = APIRouter(prefix="/admin", tags=["Administrador"])

@router.get("/users", response_model=list[UsuariResponse])
def get_users(db: Session = Depends(get_db)):
    db_users = get_users(db)
    if not db_users:
        raise HTTPException(status_code=404, detail="Usuarios no encontrados")
    return db_users

@router.put("/users/{user_id}/promote", response_model=UsuariResponse)
def change_rol( user_id: int,db: Session =Depends(get_db), new_rol: str=Body(...,embed=True)):
    db_rol = change_rol(db, user_id)
    if not db_rol:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.commit()
    db.refresh(db_rol)
    return db_rol


@router.get ("/users/promotions", response_model=list[UsuariResponse])
def get_promocions(db:Session = Depends(get_db)):
    db_promocions = get_promocions(db)
    if not db_promocions:
        raise HTTPException(status_code=404, detail="Promociones no encontradas")
    return db_promocions

@router.put("/promotions/{user_id}", response_model=UsuariResponse)
def canviar_estat_promocion(user_id: int,db:Session = Depends(get_db), new_estado: str=Body(...,embed=True)):
    db_promocion = canviar_estat_promocion(db, user_id, new_estado)
    if not db_promocion:
        raise HTTPException(status_code=404, detail="Promocion no encontrada")
    db.commit()
    db.refresh(db_promocion)
    return db_promocion
