from sqlalchemy.orm import Session
import models.viatge as models

def crear_viatge(db: Session, data: dict, admin_id: int):
    viatge = models.Viatge(**data, creador_id=admin_id)
    db.add(viatge)
    db.commit()
    db.refresh(viatge)
    return viatge

def editar_viatge(db: Session, data: dict, viatge_id: int, admin_id: int):
    query = db.query(models.Viatge).filter(
        models.Viatge.id == viatge_id, 
        models.Viatge.creador_id == admin_id
    )
    
    viatge_existent = query.first()
    
    if viatge_existent:
        query.update(data, synchronize_session=False)
        db.commit()
        db.refresh(viatge_existent)
        return viatge_existent
    
    return False

def delete_viatge(db: Session, viatge_id: int, admin_id: int):
    viatge = db.query(models.Viatge).filter(models.Viatge.viatges_id == viatge_id, models.Viatge.creador_id == admin_id).first()

    if viatge:
        viatge.participants = [] 
        db.delete(viatge)
        db.commit()
        return True
    return False