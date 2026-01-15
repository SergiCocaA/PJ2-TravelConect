from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class Viatge(Base):
    __tablename__ = "viatge"
    
    viatges_id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(50), nullable=False)
    desti = Column(String(50), nullable=False)
    data_inici = Column(String(10), default=False)
    data_fi = Column(String(10), default=False)
    descripcio = Column(String(200), default=False)
    estat = Column(String(50),default=False)

    usuariViatge = relationship("UsuariViatge", back_populates="viatge")
    
    