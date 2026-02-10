from sqlalchemy.orm import Session
from db.database import get_db
from fastapi import APIRouter, Depends, HTTPException, Body
from crud import administrador as curd_admin
from schemas.peticioPromo import PeticioPromoResponse
from schemas.usuari import UsuariResponse

router = APIRouter(prefix='/admin', tags=["Administrador"])

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    db_users = curd_admin.get_users(db)
    if not db_users:
        raise HTTPException(status_code=404, detail="Usuarios no encontrados")
    return db_users

@router.put("/users/{user_id}/promote")
def change_rol( user_id: int,db: Session =Depends(get_db), new_rol: str=Body(...,embed=True)):
    db_rol = curd_admin.change_rol(db, user_id,new_rol)
    if not db_rol:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.commit()
    db.refresh(db_rol)
    return db_rol


@router.get ("/users/promotions", response_model=list[PeticioPromoResponse])
def get_promocions(db:Session = Depends(get_db)):
    db_promocions = curd_admin.get_promocions(db)
    if not db_promocions:
        raise HTTPException(status_code=404, detail="Promociones no encontradas")
    return db_promocions

@router.put("/promotions/{user_id}", response_model=PeticioPromoResponse)
def canviar_estat_promocio(user_id: int,db:Session = Depends(get_db), new_estado: str=Body(...,embed=True)):
    db_promocion= curd_admin.canviar_estat_promocio(db, user_id, new_estado)
    if not db_promocio:
        raise HTTPException(status_code=404, detail="Promocion no encontrada")
    db.commit()
    db.refresh(db_promocio)
    return db_promocio
