from sqlalchemy import Table, Column, Integer, ForeignKey
from db.database import Base
from sqlalchemy.orm import relationship

class UsuariViatge(Base):
    __tablename__ = "usuariViatge"

    usuari_id = Column(Integer, ForeignKey("usuari.id"), primary_key=True)
    viatge_id = Column(Integer, ForeignKey("viatge.id"), primary_key=True)

    usuari = relationship("Usuari", back_populates="usuariViatge")
    viatge = relationship("Viatge", back_populates="usuariViatge")