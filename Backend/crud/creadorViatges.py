from sqlalchemy.orm import Session
import models.viatge as models

def crear_viatge(db: Session, data: dict, user_id: int):
    viatge = models.Viatge(**data, creador_id=user_id)
    db.add(viatge)
    db.commit()
    db.refresh(viatge)
    return viatge

def editar_viatge(db: Session, data: dict, viatge_id: int, user_id: int, user_role: str):
    # Si es Admin, puede editar cualquier viaje. Si es Creador, solo el suyo.
    query = db.query(models.Viatge).filter(models.Viatge.id == viatge_id)
    
    if user_role != "Admin":
        query = query.filter(models.Viatge.creador_id == user_id)
    
    viatge_existent = query.first()
    
    if viatge_existent:
        # Solo actualizamos los campos presentes en data
        for key, value in data.items():
            if hasattr(viatge_existent, key):
                setattr(viatge_existent, key, value)
        
        db.commit()
        db.refresh(viatge_existent)
        return viatge_existent
    
    return False

def delete_viatge(db: Session, viatge_id: int, user_id: int, user_role: str):
    query = db.query(models.Viatge).filter(models.Viatge.id == viatge_id)
    
    if user_role != "Admin":
        query = query.filter(models.Viatge.creador_id == user_id)
    
    viatge = query.first()

    if viatge:
        viatge.participants = [] 
        db.delete(viatge)
        db.commit()
        return True
    return False