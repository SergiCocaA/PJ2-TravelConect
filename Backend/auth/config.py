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

#las contraseñas estan seguras en tu base de datos.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#validar el token que permite al usuario navegar por la API sin tener que poner su contraseña en cada clic
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")