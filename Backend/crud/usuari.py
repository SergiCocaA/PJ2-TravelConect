from sqlalchemy.orm import Session
import models.usuari as models

def get_usuari_por_id(db: Session, usuari_id: int):
    return db.query(models.Usuari).filter(models.Usuari.usuaris_id == usuari_id).first()

def actualizar_perfil_usuari(db: Session, usuari_id: int, nom: str, bio: str):
    usuari_db = db.query(models.Usuari).filter(models.Usuari.usuaris_id == usuari_id).first()
    
    if usuari_db:
        usuari_db.full_name = nom
        usuari_db.bio = bio
        
        db.commit()
        db.refresh(usuari_db)
        return usuari_db
    
    return None