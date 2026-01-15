from pydantic import BaseModel
from typing import Optional

class ViatgeBase(BaseModel):
    nom: str
    desti: str
    data_inici: str
    data_fi: str
    descripcio: Optional[str] = None
    estat: str

class ViatgeCreate(ViatgeModel):
    pass 

class ViatgeOut(ViatgeModel):
    viatge_id: int 

    class Config:
        from_attributes = True 