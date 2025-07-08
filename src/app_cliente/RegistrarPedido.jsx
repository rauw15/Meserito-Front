import React, { useState } from 'react';
import { useProduct } from '../src/auth/ProductProvider';
import { usePedido } from '../src/auth/PedidoProvider';
import { enviarPedidoRobotRequest } from '../src/api/request';
import '../src/assets/styles/RegistrarPedido.css';

function RegistrarPedido() {
  const { products } = useProduct();
  const { createPedido } = usePedido();
  const [seleccionados, setSeleccionados] = useState([]); // [{productId, cantidad}]
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleCantidad = (productId, cantidad) => {
    setSeleccionados(prev => {
      const existe = prev.find(p => p.productId === productId);
      if (existe) {
        return prev.map(p => p.productId === productId ? { ...p, cantidad } : p);
      } else {
        return [...prev, { productId, cantidad }];
      }
    });
  };

  const handleQuitar = (productId) => {
    setSeleccionados(prev => prev.filter(p => p.productId !== productId));
  };

  const handleRegistrar = async () => {
    setEnviando(true);
    setMensaje('');
    const productos = seleccionados.filter(p => p.cantidad > 0);
    if (productos.length === 0) {
      setMensaje('Selecciona al menos un producto.');
      setEnviando(false);
      return;
    }
    try {
      // 1. Registrar pedido en backend
      await createPedido({
        productIds: productos.flatMap(p => Array(p.cantidad).fill(p.productId)),
        status: 'pendiente',
      });
      // 2. Enviar pedido al robot mesero
      await enviarPedidoRobotRequest({
        productos: productos.map(p => ({
          id: p.productId,
          cantidad: p.cantidad
        }))
      });
      setMensaje('¡Pedido registrado y enviado al robot mesero!');
      setSeleccionados([]);
    } catch (error) {
      setMensaje('Error al registrar o enviar el pedido. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const total = seleccionados.reduce((sum, sel) => {
    const prod = products.find(p => p.id === sel.productId);
    return sum + (prod ? prod.price * sel.cantidad : 0);
  }, 0);

  return (
    <div className="registrar-pedido-container">
      <h1>Registrar Nuevo Pedido</h1>
      <div className="productos-lista">
        {products.map(producto => {
          const seleccionado = seleccionados.find(p => p.productId === producto.id);
          return (
            <div key={producto.id} className="producto-item">
              <div className="producto-info">
                <span className="producto-nombre">{producto.name}</span>
                <span className="producto-precio">${producto.price}</span>
              </div>
              <div className="producto-cantidad">
                <input
                  type="number"
                  min={0}
                  value={seleccionado ? seleccionado.cantidad : 0}
                  onChange={e => handleCantidad(producto.id, Math.max(0, parseInt(e.target.value) || 0))}
                  disabled={enviando}
                />
                {seleccionado && seleccionado.cantidad > 0 && (
                  <button className="btn-quitar" onClick={() => handleQuitar(producto.id)} disabled={enviando}>Quitar</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="resumen-pedido">
        <h3>Resumen</h3>
        <ul>
          {seleccionados.filter(s => s.cantidad > 0).map(sel => {
            const prod = products.find(p => p.id === sel.productId);
            return (
              <li key={sel.productId}>
                {prod ? prod.name : 'Producto'} x {sel.cantidad} = ${prod ? prod.price * sel.cantidad : 0}
              </li>
            );
          })}
        </ul>
        <div className="total-pedido">Total: ${total}</div>
      </div>
      <button className="btn-registrar" onClick={handleRegistrar} disabled={enviando || total === 0}>
        {enviando ? 'Registrando...' : 'Registrar Pedido'}
      </button>
      {mensaje && <div className="mensaje-pedido">{mensaje}</div>}
    </div>
  );
}

export default RegistrarPedido; 