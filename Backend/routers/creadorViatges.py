from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import crud.creadorViatges as crud 

router = APIRouter(prefix='/creator', tags=["Creador_Viatges"])

@router.post("/trips")
def crear_viatge(data: dict, db: Session = Depends(get_db), usuari = Depends(get_current_user)):
    if usuari.rol not in ["Creador", "Admin"]:
        raise HTTPException(
            status_code=403, 
            detail=f"Permiso denegado. Tu rol actual es: {usuari.rol}"
        )
    
    return crud.crear_viatge(db, data, usuari.id)

@router.put("/trips/{id}")
def editar_viatge(id: int, data: dict, db: Session = Depends(get_db), usuari = Depends(get_current_user)):
    if usuari.rol not in ["Creador", "Admin"]:
        raise HTTPException(status_code=403, detail="No tens permisos")
    
    viatge_actualitzat = crud.editar_viatge(db, data, id, usuari.id)
    
    if not viatge_actualitzat:
        raise HTTPException(status_code=404, detail="Viatge no trobat o no ets el creador")
        
    return viatge_actualitzat