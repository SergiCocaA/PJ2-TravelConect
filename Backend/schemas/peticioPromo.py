from pydantic import BaseModel, ConfigDict
import enum

# Clase padre que heredan las demas
class EstatPeticio(str, enum.Enum):
    PENDENT = "pendent"
    APROBAT = "aprovat"
    DENEGAT = "denegat"
    

class PeticioPromoBase(BaseModel):
    missatge_peticio: str


class PeticioPromoCreate(PeticioPromoBase):
    pass

# En Pydantic v2 se recomienda usar ConfigDict
class PeticioPromoResponse(PeticioPromoBase):
    id: int
    estat: str # Cambiamos a str para que sea menos estricto con el Enum
    usuari_solicitant: int

    model_config = ConfigDict(from_attributes=True)
