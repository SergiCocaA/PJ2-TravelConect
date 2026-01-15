from sqlalchemy import Table, Column, Integer, ForeignKey
from db.database import Base

class UsuariViatge(Base):
    __tablename__ = "usuari_viatge"

    usuari_id = Column(Integer, ForeignKey("usuaris_id"), primary_key=True)
    viatge_id = Column(Integer, ForeignKey("viatges_id"), primari_key=True)

    usuari = relationship("Usuari", back_populates="usuari")
    viatge = relationship("Viatge", back_populates="viatge")