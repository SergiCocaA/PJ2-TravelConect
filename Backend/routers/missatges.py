from sqlalchemy.orm import Session
from db.database import get_db
from crud.misstages import get_missatge_per_viatge, create_missatge
from schemas.missatgeXat import MissatgeCreate, MissatgeResponse
from fastapi import APIRouter, Depends, HTTPException
from auth.deps import get_current_user
from models.usuari import Usuari
router = APIRouter(prefix="/trips", tags=["Xat"])

@router.get("/{trip_id}/chat", response_model=list[MissatgeResponse])
def missatges_per_viatge(trip_id: int, db: Session = Depends(get_db)):
    db_missatges = get_missatge_per_viatge(db, trip_id)
    # Convertimos los objetos para añadir el nombre del autor
    result = []
    for msg in db_missatges:
        m = MissatgeResponse.from_orm(msg)
        if msg.autor:
            m.autor_nom = msg.autor.full_name or msg.autor.email
        result.append(m)
    return result

@router.post ("/{trip_id}/chat/send", response_model=MissatgeResponse)
def missatge(trip_id: int, missatge:MissatgeCreate, 
            db:Session = Depends(get_db),
            current_user:Usuari = Depends(get_current_user)):
    db_missatge = create_missatge(db,trip_id,missatge,autor_id=current_user.id)
    if not db_missatge:
        raise HTTPException(status_code=400, detail="Error al crear missatge")
    
    # Preparamos la respuesta con el nombre del autor actual
    res = MissatgeResponse.from_orm(db_missatge)
    res.autor_nom = current_user.full_name or current_user.email
    return res
