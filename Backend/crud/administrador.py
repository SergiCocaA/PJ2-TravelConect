from sqlalchemy.orm import Session
from models.usuari import User
from models.promocion import Promocion
from models.viatge import Viatge
from models.reserva import Reserva
from models.missatge import Missatge
from models.peticionPromo import PeticionPromo
from schemas.peticionPromo import PeticionPromoCreate, PeticionPromoResponse

def get_users(db:Session):
    return db.query(User).all()

def change_rol(db:Session, user_id:int, new_rol:str):
    user = db.query(User).filter(User.id == user_id).first()
    user.rol = new_rol
    return user

def get_promocions(db:Session):
    return db.query(Promocion).all()

def canviar_estat_promocion(db:Session, peticio_id:int, new_estado:str):
    promocio = db.query(PeticioPromo).filter(PeticioPromo.peticio_id == peticio_id).first()
    promocio.estat = new_estado
    return promocio