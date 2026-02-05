from sqlalchemy.orm import Session, joinedload
from models.missatgeXat import MissatgeXat
from schemas.missatgeXat import MissatgeCreate, MissatgeResponse

def get_missatges(db:Session):
    return db.query(MissatgeXat).all()

def get_missatge_per_viatge(db:Session,viatge_id:int):
    return (db.query(MissatgeXat).options(joinedload(MissatgeXat.autor))
    .filter(MissatgeXat.viatge_id == viatge_id)
    .order_by(MissatgeXat.timestamp.asc()).all())

def create_missatge(db:Session,missatge:MissatgeXatCreate,autor_id:int,viatge_id:int):
    db_missatge = MissatgeXat(
        contingut=missatge.contingut,
        autor_id=autor_id,
        viatge_id=viatge_id,
        timestamp=datetime.now()
        )
    db.add(db_missatge)
    db.commit()
    db.refresh(db_missatge)
    return db_missatge

