from sqlalchemy import Table, Column, Integer, ForeignKey
from db.database import Base

class UsuariViatge(Base):
    __tablename__ = "usuari_viatge"

    usuari_id = Column(Integer, ForeignKey("usuari.usuaris_id"), primary_key=True)
    viatge_id = Column(Integer, ForeignKey("viatge.viatges_id"), primari_key=True)

    usuari = relationship("Usuari", back_populates="Usuariviatge")
    viatge = relationship("Viatge", back_populates="usuariViatge")