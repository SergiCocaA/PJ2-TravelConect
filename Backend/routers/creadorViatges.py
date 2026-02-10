from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import crud.creadorViatges as crud 

router = APIRouter(prefix='/creator', tags=["Creador_Viatges"])

@router.post("/trips")
def crear_viatge(data: dict, db: Session = Depends(get_db), usuari = Depends(get_current_user)):
    if usuari.rol not in ["Creador", "Admin"]: 
        raise HTTPException(status_code=403, detail="No tens permisos")
    return crud.crear_viatge(db, data, usuari.usuaris_id)

@router.put("/trips/{id}")
def editar_viatge(id: int, db: Session = Depends(get_db), usuari = Depends(get_current_user)):
    if usuari.rol not in ["Creador", "Admin"]:
        raise HTTPException(status_code=403, detail="No tens permisos")
    return crud.editar_viatge(db, data, id, usuari.usuaris_id)


@router.delete("/trips/{id}")
def delete_viatge(id: int, db: Session = Depends(get_db), usuari = Depends(get_current_user)):
    if not crud.delete_viatge(db, id, usuari.usuaris_id):
        raise HTTPException(status_code=404, detail="No s'ha pogut eliminar el viatge")
    return {"status": "eliminado"}