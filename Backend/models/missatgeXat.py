from sqlalchemy import Column, Integer, String, ForeignKey, Enum as SQLEnum,DateTime
from sqlalchemy.orm import relationship
from database import Base

class MissatgeXat(Base):
    __tablename__ = "missatgeXat"

    id = Column(Integer, primary_key=True, index=True)
    contingut = Column(String(1000), nullable=False)
    timestamp = Column(DateTime, nullable=False)

    viatge_xat = Column(Integer, ForeignKey("viatge.id"),nullable=False)
    autor_xat = Column(Integer, ForeignKey("usuari.id"),nullable=False)


    #1-->Nº
    viatge = relationship("viatge", back_populates="missatgeXat")
    autor = relationship("Usuari", back_populates="missatgeXat")