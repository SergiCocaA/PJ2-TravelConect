from pydantic import BaseModel
import enum

#Clase padre que heredan las demas
class EstatPeticio(str, enum.Enum):
    PENDENT = "Pendent"
    APROBAT = "Aprobada"
    DENEGAT = "Denegat"
    

class PeticioPromoBase(BaseModel):
    missatge_peticio: str


class PeticioPromoCreate(PeticioPromoBase):
    pass
    #usuari_solicitant: int el autor se saca del token para mas seguridad

#Enviar datos frontEnd
class PeticioPromoResponse(PeticioPromoBase):
    id: int
    estat: EstatPeticio
    usuari_solicitant: int

    class Config:
        orm_mode = True
        #Permite que pydantic entienda y use objetos de sqlalchemy para transformarlos en objetos de JSON