from sqlalchemy.orm import Session, joinedload
from models.missatgeXat import Missatges
from schemas.missatgeXat import MissatgesBase, MissatgesCreate, MissatgesResponse

def get_missatges(db:Session):
    return db.query(Missatges).all()

def get_missatge_per_viatge(db:Session,viatge_id:int):
    return (db.query(Missatges).options(joinedload(Missatges.autor))
    .filter(Missatges.viatge_id == viatge_id)
    .order_by(Missatges.timestamp.asc()).all())

def create_missatge(db:Session,missatge:MissatgesCreate,autor_id:int,viatge_id:int):
    db_missatge = Missatges(
        contingut=missatge.contingut,
        autor_id=autor_id,
        viatge_id=viatge_id,
        timestamp=datetime.now()
        )
    db.add(db_missatge)
    db.commit()
    db.refresh(db_missatge)
    return db_missatge

