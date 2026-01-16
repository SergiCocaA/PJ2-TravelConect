from pydantic import BaseModel, EmailStr
from typing import Optional
import enum

class Rol(str, enum.Enum):
    VIATGER = "Viatger"
    CREADOR = "Creador"
    ADMIN = "Admin"

class UsuariBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    rol: Rol.VIATGER
    bio: Optional[str] = None

class UsuariCreate(UsuariBase):
    password: str 

class UsuariOut(UsuariBase):
    usuaris_id: int 

    class Config:
        from_attributes = True 