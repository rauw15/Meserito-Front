import React, { useState } from 'react';
import SectionNavbar from "../components/organims/navbar/Section";
import ConfirmacionPedido from "../components/organims/ConfirmacionPedido/Section";
import '../assets/styles/Navbar.css';

function ConfirmacionPedidoPage() {
    const [pedidoId, setPedidoId] = useState(1); // ID de ejemplo
    const [showConfirmacion, setShowConfirmacion] = useState(true);

    const handleConfirmar = () => {
        console.log('Pedido confirmado');
        setShowConfirmacion(false);
        // Aquí podrías redirigir a una página de éxito
    };

    const handleModificar = () => {
        console.log('Modificar pedido');
        setShowConfirmacion(false);
        // Aquí podrías redirigir al carrito
    };

    const handleCancelar = () => {
        console.log('Cancelar pedido');
        setShowConfirmacion(false);
        // Aquí podrías redirigir al carrito
    };

    return (
        <>
            <SectionNavbar />
            <div className="confirmacion-page">
                {showConfirmacion && (
                    <ConfirmacionPedido
                        pedidoId={pedidoId}
                        onConfirmar={handleConfirmar}
                        onModificar={handleModificar}
                        onCancelar={handleCancelar}
                    />
                )}
            </div>
        </>
    );
}

export default ConfirmacionPedidoPage; 