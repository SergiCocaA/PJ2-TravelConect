from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
from auth.utils import authenticate_user, create_access_token

#Autentica las credenciales del usuario en la base de datos y genera un token temporal con su ID de usuario para permitir el acceso a rutas protegidas
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = (get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    access_token = create_access_token(
        data={"sub": str(user.usuaris_id)},
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }