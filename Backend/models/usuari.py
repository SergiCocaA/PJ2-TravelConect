from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship
from db.database import Base
import enum


class Rol(str, enum.Enum):
    VIATGER = "Viatger"
    CREADOR = "Creador"
    ADMIN = "Admin"

class Usuari(Base):
    __tablename__ = "usuari"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), nullable=False, unique=True)
    hashed_password = Column(String(100), nullable=False)
    full_name = Column(String(50), nullable=True)
    rol = Column(String(20), default=Rol.VIATGER)
    bio = Column(String(200), nullable=True) 
    
    usuari_viatge = relationship("UsuariViatge", back_populates="usuari")

    viatges_inscritos = relationship("Viatge", secondary="usuari_viatge", back_populates="participants")

    peticioPromo = relationship("PeticioPromo", back_populates="usuari")