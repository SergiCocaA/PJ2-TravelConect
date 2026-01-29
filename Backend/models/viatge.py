from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
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
    
    viatges_id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(50), nullable=False)
    desti = Column(String(50), nullable=False)
    data_inici = Column(String(10)) 
    data_fi = Column(String(10)) 
    descripcio = Column(String(200))
    estat = Column(String(50), default=EstatPlanificacio.PLANIFICANT)

    usuari_viatge_ = relationship("UsuariViatge", back_populates="viatge")
    
    participants = relationship("Usuari", secondary="usuari_viatge", back_populates="viatges_inscrit")
    
    