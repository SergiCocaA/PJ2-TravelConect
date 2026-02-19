from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from db.database import get_db
from models.usuari import Usuari

SECRET_KEY = "clavemegasecreta"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
# Valida el token del usuario, comprueba si existe en la base de datos y devuelve sus datos.
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token sense ID")
            
    except JWTError:
        raise HTTPException(status_code=401, detail="Token no vàlid")
    
    user = db.query(Usuari).filter(Usuari.id == int(user_id)).first()
    
    if user is None:
        raise HTTPException(status_code=404, detail="Usuari no trobat")
        
    return user