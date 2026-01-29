from sqlalchemy.orm import Session
import models.viatge as models

def crear_viatge(db: Session, data: dict, admin_id: int):
    viatge = models.Viatge(**data, creador_id=admin_id)
    db.add(viatge)
    db.commit()
    return viatge

def delete_viatge(db: Session, viatge_id: int, admin_id: int):
    viatge = db.query(models.Viatge).filter(models.Viatge.viatges_id == viatge_id, models.Viatge.creador_id == admin_id).first()
    if viatge:
        viatge.participants = [] 
        db.delete(viatge)
        db.commit()
        return True
    return False