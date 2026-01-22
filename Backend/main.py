from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"mensaje": "Hola alumnos!"}

@app.get("/saludo/{nombre}")
def read_item(nombre: str):
    return {"saludo": f"Hola {nombre}!"}


#USUARIS
@app.get("/users/me")
def perfilUsuari():
    return()

@app.put("/users/me/{nom}/{bio}")
def actualizarPerfil(nom: str, bio: str)
    return()


#VIATGERS
@app.get("/trips")
def listarViajesDisponibles()
    return()

@app.get("/trips/{id}")
def verDetallesID()
    return()

@app.post("/trips/enroll/{id}")
def insribirID()
    return()

@app.post("/trips/leave/{id}")
def desinsribirID()
    return()

@app.post("/promote-request")
def crearPeticio()
    return()


#CREADORS DE VIATGES
@app.post("/creator/trips")
def crearViaje()
    return()

@app.put("/creator/trips/{id}")
def editarViaje()
    return()

@app.delete("/creator/trips/{id}")
def eliminarViaje()
    return()