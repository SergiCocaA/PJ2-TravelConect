from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.deps import get_current_user
import models.viatge as models_viatge
import models.usuari as models_usuari
import crud.viatge as crud

router = APIRouter()

#VIATGE 

@router.get("/trips")
def viatges_disponibles(db: Session = Depends(get_db)):
    return crud.llistar_viatges_actius(db)

@router.get("/trips/{id}")
def viatge_de(id: int, db: Session = Depends(get_db)):
    viatge = db.query(models_viatge.Viatge).filter(models_viatge.Viatge.viatges_id == id).first()  
    if not viatge:
        raise HTTPException(status_code=404, detail="Viatge no trobat")
    return viatge

@router.post("/trips/{id}/enroll")
def inscribir_viatge(id: int, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    resultat = crud.inscribir_viatge(db, usuari_actual=user, viatge_id=id)
    if "error" in resultat:
        raise HTTPException(status_code=400, detail=resultat["error"])
    return resultat

@router.post("/trips/{id}/leave")
def desinscribir_viatge(id: int, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    resultat = crud.desinscribir_viatge(db, usuari_actual=user, viatge_id=id)
    if "error" in resultat:
        raise HTTPException(status_code=400, detail=resultat["error"])
    return resultat

@router.post("/promote-request")
def peticio_promocio(missatge: str, db: Session = Depends(get_db), user: models_usuari.Usuari = Depends(get_current_user)):
    peticio = crud.crear_peticio_promo(db, usuari_id=user.usuaris_id, missatge=missatge)
    return {"status": "Peticion envada", "id": peticio.id}