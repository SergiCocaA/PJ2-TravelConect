from pydantic import BaseModel
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
    estat: EstatPlanificacio.PLANIFICANT

class ViatgeCreate(ViatgeModel):
    nom: str
    desti: str
    maxim_participants: int     

class ViatgeOut(ViatgeModel):
    viatge_id: int 

    class Config:
        from_attributes = True

class ViatgeResponse(ViatgeBase):
    viatge_id: int 

    class Config:
        from_attributes = True