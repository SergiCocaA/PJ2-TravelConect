from pydantic import BaseModel

class UsuariViatgeBase(BaseModel):
    usuari_id: int
    viatge_id: int

class UsuariViatgeCreate(UsuariViatgeBase):
    pass

class UsuariViatgeOut(UsuariViatgeBase):
    class Config:
        from_attributes = True

class UsuariViatgeResponse(UsuariViatgeBase):
    class Config:
        from_attributes = True