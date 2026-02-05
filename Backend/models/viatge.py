from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
import enum

class EstatPlanificacio(str, enum.Enum):
    PLANIFICANT = "Planificant"
    ACTIU = "Actiu"
    COMPLET = "Complet"
    CANCEL·LAT = "Cancel·lat"

class Viatge(Base):
    __tablename__ = "viatge"
    
    id = Column(Integer, primary_key=True, index=True)
    creador_id = Column(Integer, ForeignKey("usuari.id"), nullable=False)
    nom = Column(String(50), nullable=False)
    desti = Column(String(50), nullable=False)
    data_inici = Column(String(10)) 
    data_fi = Column(String(10)) 
    maxim_participants = Column(Integer, default=10)
    descripcio = Column(String(200))
    estat = Column(String(50), default=EstatPlanificacio.PLANIFICANT)

    usuari_viatge = relationship("UsuariViatge", back_populates="viatge")
    participants = relationship("Usuari", secondary="usuari_viatge", back_populates="viatges_inscrit")