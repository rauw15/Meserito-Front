import React, { useState, useEffect } from "react";
import { usePedido } from "../../../auth/PedidoProvider";
import { useCalificacion } from "../../../auth/CalificacionProvider";
import CalificacionServicio from "../CalificacionServicio/Section";
import "../../../assets/styles/Ordenar.css";

export default function Carrito() {
  const { pedidos, deletePedido } = usePedido();
  const { getCalificacionByPedido } = useCalificacion();
  const [total, setTotal] = useState(0);
  const [showCalificacion, setShowCalificacion] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    calcularTotal();
  }, [pedidos]);

  const calcularTotal = () => {
    let totalPrice = 0;
    pedidos.forEach((pedido) => {
      totalPrice += pedido.productIds.reduce((acc, productId) => {
        const productPrice = obtenerPrecioDelProducto(productId);
        return acc + productPrice;
      }, 0);
    });
    setTotal(totalPrice);
  };

  const handleRealizarOrden = () => {
    console.log("Orden realizada con éxito!");
    // Aquí podrías implementar la lógica para procesar el pedido
  };

  const handleCalificarPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowCalificacion(true);
  };

  const handleCalificacionCompletada = () => {
    setShowCalificacion(false);
    setPedidoSeleccionado(null);
    alert("¡Gracias por tu calificación!");
  };

  const handleCerrarCalificacion = () => {
    setShowCalificacion(false);
    setPedidoSeleccionado(null);
  };

  const obtenerPrecioDelProducto = (productId: number) => {
    // Implementa la lógica para obtener el precio del producto por su ID
    // Esto puede involucrar una llamada al backend para obtener detalles del producto
    return 10; // Valor de ejemplo
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
      {pedidos.length === 0 ? (
        <div className="carrito-vacio">
          <p>No hay productos en el carrito</p>
        </div>
      ) : (
        <>
          {pedidos.map((pedido) => {
            const calificacion = getCalificacionByPedido(pedido.id);
            return (
              <div key={pedido.id} className="pedido-item">
                <h3>Pedido #{pedido.id}</h3>
                <p>Productos en el pedido: {pedido.productIds.length}</p>
                
                {calificacion ? (
                  <div className="calificacion-existente">
                    <p>Ya calificaste este pedido: {calificacion.calificacion}/5 ⭐</p>
                    <p>Comentario: {calificacion.comentario}</p>
                  </div>
                ) : (
                  <button 
                    className="btn-calificar-pedido"
                    onClick={() => handleCalificarPedido(pedido)}
                  >
                    Calificar Pedido
                  </button>
                )}
                
                <button 
                  className="btn-eliminar"
                  onClick={() => deletePedido(pedido.id)}
                >
                  Eliminar Pedido
                </button>
              </div>
            );
          })}
          
          <div className="carrito-total">
            <h3>Total: ${total}</h3>
            <button 
              className="btn-realizar-orden"
              onClick={handleRealizarOrden}
            >
              Realizar Orden
            </button>
          </div>
        </>
      )}

      {showCalificacion && (
        <CalificacionServicio
          pedidoId={pedidoSeleccionado?.id}
          onCalificacionCompletada={handleCalificacionCompletada}
          onCerrar={handleCerrarCalificacion}
        />
      )}
    </div>
  );
}
