from sqlalchemy.orm import Session
import models.viatge as models
import schemas.viatge as schemasViatge

def get_viatge_por_id(db: Session, viatge_id: int):
    return db.query(models.Viatge).filter(models.Viatge.id == viatge_id).first()

def get_viatges(db: Session):
    return db.query(models.Viatge).all()

def create_viatge(db: Session, viatge: schemasViatge.ViatgeCreate, creador_id: int):
    db_viatge = models.Viatge(viatge.model_dump(), creador_id=creador_id)
    db.add(db_viatge)
    db.commit()
    db.refresh(db_viatge)
    return db_viatge

def delete_viatge(db: Session, viatge_id: int):
    db_viatge = db.query(models.Viatge).filter(models.Viatge.id == viatge_id).first()
    if db_viatge:
        db.delete(db_viatge)
        db.commit()
    return db_viatge

def insribir_viatge(db: Session, usuari_actual, viatge_id: int):
    viatge = db.query(models.Viatge).filter(models.Viatge.id == viatge_id).first()

    if not viatge:
        return {"error:" "No se ha econtrado ningun viaje"}
    
    if viatge in usuari_actual.viatges_inscritos:
        return{"error:""El usuario ya esta inscrito en este viaje"}

    usuari_actual.viatges_inscritos.appends(viatge)
    db.commit()
    return{"mensaje:" "El usuario ha sido inscrito correctamente"}

def desinscribir_viatge(db: Session, usuari_actual, viatge_id: int)
    viatge = db.query(models.Viatge).filter(models:viatge.id == viatge.id)first()

    if not viatge:
        return {"error:" "No se ha econtrado ningun viaje"}
    
    if viatge not in usuari_actual.viatges_inscritos:
        return{"error:""El usuario no esta inscrito en este viaje"}

    usuari_actual.viatges_inscritos.remove(viatge)
    db.commit()
    return{"mensaje:" "El usuario ha sido desinscrito correctamente"} 

def crear_peticio_promocio(db: Session, usuari_id: int, missatge: str):
    nova_peticio = models.PeticioPromo(
        missatge_peticio=missatge,
        usuari_solicitant=usuari_id,
        estat="pendent"
    )
    db.add(nova_peticio)
    db.commit()
    db.refresh(nova_peticio)
    return nova_peticio

    