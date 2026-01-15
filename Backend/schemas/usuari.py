from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuariBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    rol: str
    bio: Optional[str] = None

class UsuariCreate(UsuariBase):
    password: str 

class UsuariOut(UsuariBase):
    usuaris_id: int 

    class Config:
        from_attributes = True 