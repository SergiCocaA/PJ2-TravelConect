from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"mensaje": "Hola alumnos!"}

@app.get("/saludo/{nombre}")
def read_item(nombre: str):
    return {"saludo": f"Hola {nombre}!"}
