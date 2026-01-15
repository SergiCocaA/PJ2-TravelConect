from sqlalchemy import Table, Column, Integer, ForeignKey
from db.database import Base

class UsuariViatge(Base):
    __tablename__ = "usuari_viatge"

    usuari_id = Column(Integer, ForeignKey("usuari_id"), primary_key=True)

