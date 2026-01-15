from pydantic import BaseModel
from datetime import datetime

#Clase padre que heredan las demas
class MissatgeXat(BaseModel):
    contingut: str

#Recibir datos id de viatge recibido desde la URL de frontEnd
class MissatgeXatCreate(MissatgeXat):
    pass 
    #autor_xat: int el autor se saca del token para mas seguridad

#Enviar datos frontEnd
class MissatgeXatResponse(MissatgeXat):
    id: int
    viatge_xat: int
    autor_xat: int
    timestamp: datetime

    class Config:
        orm_mode = True
        #Permite que pydantic entienda y use objetos de sqlalchemy para transformarlos en objetos de JSON