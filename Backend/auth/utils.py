from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt 
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import bcrypt

SECRET_KEY = "clavemegasecreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#Compara la contraseña plana con la contraseña de la BD, verfica si son las mismas
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

#Autentifica si el usuari y contraseñas son correctas, usamos la funcion de verify passowrd para obtener la contraseña hasheada
def authenticate_user(usuari: str, password: str, db):
    user = get_user(usuari, db)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def get_user(usuari: str, db):
    return crud_get_user(db, usuari)

#Crea el token en funcion del usuario
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

#Obtengo el id del token, usando el id del usuario
def get_id_from_token(token: str) -> int:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return int(user_id)
    except JWTError:    
        raise HTTPException(status_code=401, detail="Token inválido")

#Hashea la contraseña
def hash_password(password: str):
    return bcrypt.hashpw(password, bcrypt.gensalt())