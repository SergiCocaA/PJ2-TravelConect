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
   db_missatge = get_missatge_per_viatge(db, trip_id)
   if not db_missatge:
        raise HTTPException(status_code=404, detail="Missatges de viatge no trobats")
   return db_missatge

@router.post ("/{trip_id}/chat/send", response_model=MissatgeResponse)
def missatge(trip_id: int, missatge:MissatgeCreate, 
            db:Session = Depends(get_db),
            current_user:Usuari = Depends(get_current_user)):
    db_missatge = create_missatge(db,trip_id,missatge,autor_id=current_user.id)
    if not db_missatge:
        raise HTTPException(status_code=400, detail="Error al crear missatge")
    return db_missatge

 
#response_model=MissatgesResponse para controlar la informacion que va a recibir el usuario solo lo esencial,
    #puede usarse el list si es una cadena muy larga de contenido

#def missatges_per_viatge(trip_id: int, db: Session = Depends(get_db)): se encarga de organizar un poco la infomarcon como puede ser sacar el id del trip de la url,
    #abir una session a la base de datos que luego se cierra atuomatico

#current_user:User = Depends(get_current_user)): Seguridad, se encarga de extraer el token de la URL para conseguir los datos del usario en la base de datos