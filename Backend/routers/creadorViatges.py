from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import crud.creadorViatge as crud 

router = APIRouter()

@router.post("/creator/trips")
def crear_viatge(data: dict, db: Session = Depends(get_db), user = Depends(get_current_user)):
    if user.rol not in ["Creador", "Admin"]: 
        raise HTTPException(status_code=403, detail="No tens permisos")
    return crud.crear_viatge(db, data, user.usuaris_id)

@router.delete("/creator/trips/{id}")
def delete_viatge(id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    if not crud.delete_viatge(db, id, user.usuaris_id):
        raise HTTPException(status_code=404, detail="No s'ha pogut eliminar el viatge")
    return {"status": "eliminado"}