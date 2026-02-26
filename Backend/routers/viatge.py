from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import models.viatge as models_viatge
import models.usuari as models_usuari
import crud.viatge as crud
from schemas.viatge import ViatgeOut

router = APIRouter(tags=["Viatge"])

#VIATGE 

@router.get("/trips")
def viatges_disponibles(db: Session = Depends(get_db)):
    return crud.get_viatges(db)

@router.get("/trips/{id}")
def viatge_de(id: int, db: Session = Depends(get_db)):
    return crud.get_viatge_por_id(db, id)

@router.post("/trips/{id}/enroll", response_model=ViatgeOut)
def inscribir_viatge(id: int, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    probar = crud.insribir_viatge(db, user, id)
    if probar:
        raise HTTPException(
            status_code=400, 
            detail="El usuario ya está inscrito en este viaje"
        )
    return probar

@router.post("/trips/{id}/leave")
def desinscribir_viatge(id: int, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    return crud.desinscribir_viatge(db, user, id)

@router.post("/promote-request")
def peticio_promocio(missatge: str, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    return crud.crear_peticio_promocio(db, user.id, missatge)