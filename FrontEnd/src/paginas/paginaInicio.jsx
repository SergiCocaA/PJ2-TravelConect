import React, { useState } from 'react';

function PaginaInicio() {
    // 1. SIMULAMOS AL USUARIO (Hasta que tu compañero termine el login)
    // Cambia el 'role' a 'Viatger', 'Creador' o 'Admin' para ver cómo cambia la página.
    const [usuarioActual, setUsuarioActual] = useState({
        nombre: "Sergi",
        role: "Creador"
    });

    // 2. SIMULAMOS LA BASE DE DATOS (Mock Data)
    const [viajes, setViajes] = useState([
        { id: 1, titulo: "Ruta por Japón", destino: "Tokyo", estado: "Planificant" },
        { id: 2, titulo: "Safari en Kenya", destino: "Nairobi", estado: "Obert" }
    ]);

    return (
        <div className="container mt-5">
            {/* --- BARRA SUPERIOR BÁSICA --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Hola, {usuarioActual.nombre}! 👋</h2>

                {/* LÓGICA DE ROLES: Solo se muestra si el rol es Creador */}
                {usuarioActual.role === 'Creador' && (
                    <button className="btn btn-warning fw-bold">+ Crear Nou Viatge</button>
                )}
            </div>

            {/* --- ZONA DE VIAJES (El Bucle) --- */}
            <h3>Viatges Disponibles</h3>
            <div className="row mt-3">
                {/* Aquí le decimos a React: "Por cada viaje en mi lista, dibuja una tarjeta" */}
                {viajes.map((viaje) => (
                    <div className="col-md-4 mb-4" key={viaje.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{viaje.titulo}</h5>
                                <p className="card-text"><strong>Destí:</strong> {viaje.destino}</p>
                                <span className="badge bg-success">{viaje.estado}</span>
                                <br />
                                <button className="btn btn-outline-primary btn-sm mt-3 w-100">Veure Detall</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaginaInicio;