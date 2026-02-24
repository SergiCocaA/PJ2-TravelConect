from pydantic import BaseModel, Field
from typing import Optional
import enum

class EstatPlanificacio(str, enum.Enum):
    PLANIFICANT = "Planificant"
    ACTIU = "Actiu"
    COMPLET = "Complet"
    CANCEL·LAT = "Cancel·lat"

class ViatgeBase(BaseModel):
    nom: str
    desti: str
    data_inici: str
    data_fi: str
    descripcio: Optional[str] = None
    estat: EstatPlanificacio = EstatPlanificacio.PLANIFICANT

class ViatgeCreate(ViatgeBase):
    maxim_participants: int = 10 

class ViatgeOut(ViatgeBase):
    id: int 
    creador_id: int
    maxim_participants: int

    class Config:
        from_attributes = True 