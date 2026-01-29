from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import models.viatge as models_viatge
import models.usuari as models_usuari

#VIATGES
@router.get("/trips")
def viatges_disponibles(db: Session = Depends(get_db)):
    return db.query(models_viatge.Viatge).all()

@router.get("/trips/{id}")
def viatge_detalls(id: int, db: Session = Depends(get_db)):
    Viaje = db.query(model_viatge.Viatge).filter(viatges_id == id).first()  
    if not item:
        raise HTTPException(status_code=404, detail="Item no encontrado")

    return item

@router.post("/trips/{id}/enrolll")
def viatge_inscriure(id: int, db: Session = (get_db), user: models_usuari.Usuari = Depends(get_current_user)):

