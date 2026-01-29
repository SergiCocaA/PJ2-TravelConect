from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from database import Base
import enum

class EstatPeticio(str, enum.Enum):
    PENDENT = "pendent"
    APROBAT = "aprobat"
    DENEGAT = "denegat"

class PeticioPromo(Base):
    __tablename__ = "peticioPromo"

    id = Column(Integer, primary_key=True, index=True)
    missatge_peticio = Column(String(500), nullable=False)
    estat = Column(String(20),default=EstatPeticio.PENDENT)

    usuari_solicitant = Column(Integer, ForeignKey("usuari.id"),nullable=False)

    usuari = relationship("Usuari", back_populates="peticioPromo")
