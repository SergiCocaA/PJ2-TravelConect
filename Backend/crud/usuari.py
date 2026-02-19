from sqlalchemy.orm import Session
import models.usuari as models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_usuari_por_id(db: Session, usuari_id: int):
    return db.query(models.Usuari).filter(models.Usuari.id == usuari_id).first()

def actualizar_perfil_usuari(db: Session, usuari_id: int, nom: str, bio: str):
    usuari_db = db.query(models.Usuari).filter(models.Usuari.id == usuari_id).first()
    
    if usuari_db:
        usuari_db.full_name = nom
        usuari_db.bio = bio
        
        db.commit()
        db.refresh(usuari_db)
        return usuari_db
    
    return None

def crear_usuari(db: Session, data: dict):
    hashed_password = pwd_context.hash(data["password"])
    
    usuari = models.Usuari(
        full_name=data["full_name"],
        email=data["email"],
        hashed_password=hashed_password,
        rol="Viatger",
        bio=data.get("bio")
    )
    
    db.add(usuari)
    db.commit()
    db.refresh(usuari)
    return usuari

def autenticar_usuari(db: Session, email: str, password: str):
    usuari = db.query(models.Usuari).filter(models.Usuari.email == email).first()

    if not usuari:
        return False
    
    if not pwd_context.verify(password, usuari.hashed_password):
        return False
    
    return usuari
