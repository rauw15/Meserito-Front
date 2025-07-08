import React, { useState } from 'react';
import SectionNavbar from "../components/organims/navbar/Section";
import CalificacionServicio from "../components/organims/CalificacionServicio/Section";
import '../assets/styles/Navbar.css';

function CalificacionServicioPage() {
    const [showCalificacion, setShowCalificacion] = useState(false);
    const [pedidoId, setPedidoId] = useState(null);

    const handleCalificacionCompletada = () => {
        setShowCalificacion(false);
        // Aquí puedes agregar lógica adicional después de completar la calificación
        console.log('Calificación completada');
    };

    const handleCerrarCalificacion = () => {
        setShowCalificacion(false);
    };

    return (
        <>
            <SectionNavbar />
            <div className="calificacion-page">
                <div className="calificacion-content">
                    <h1>Sistema de Calificación</h1>
                    <p>Ayúdanos a mejorar nuestro servicio calificando tu experiencia</p>
                    
                    <div className="calificacion-actions">
                        <button 
                            className="btn-calificar"
                            onClick={() => setShowCalificacion(true)}
                        >
                            Calificar Servicio
                        </button>
                    </div>

                    {showCalificacion && (
                        <CalificacionServicio
                            pedidoId={pedidoId}
                            onCalificacionCompletada={handleCalificacionCompletada}
                            onCerrar={handleCerrarCalificacion}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default CalificacionServicioPage; 