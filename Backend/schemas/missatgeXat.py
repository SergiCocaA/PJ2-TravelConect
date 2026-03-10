from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MissatgeXat(BaseModel):
    contingut: str

class MissatgeCreate(MissatgeXat):
    pass 

class MissatgeResponse(MissatgeXat):
    id: int
    viatge_xat: int
    autor_xat: int
    autor_nom: Optional[str] = "Usuari" # Añadimos el nombre del autor
    timestamp: datetime

    class Config:
        from_attributes = True
