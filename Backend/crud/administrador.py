from sqlalchemy.orm import Session
from models.usuari import Usuari
from models.peticioPromo import PeticioPromo

def get_users(db:Session):
    return db.query(Usuari).all()

def change_rol(db:Session, user_id:int, new_rol:str):
    user = db.query(Usuari).filter(Usuari.id == user_id).first()
    user.rol = new_rol
    return user

def get_promocions(db:Session):
    return db.query(PeticioPromo).all()

def cambiar_estat_promocio(db:Session, user_id:int, new_estado:str):
    promocio = db.query(PeticioPromo).filter(PeticioPromo.usuari_solicitant == user_id).first()
    promocio.estat = new_estado
    return promocio