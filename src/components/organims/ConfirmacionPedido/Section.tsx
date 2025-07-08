import React, { useState, useEffect } from 'react';
import { usePedido } from '../../../auth/PedidoProvider';
import { useProduct } from '../../../auth/ProductProvider';
import '../../../assets/styles/ConfirmacionPedido.css';

interface Producto {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

interface ConfirmacionPedidoProps {
  pedidoId: number;
  onConfirmar: () => void;
  onModificar: () => void;
  onCancelar: () => void;
}

const ConfirmacionPedido: React.FC<ConfirmacionPedidoProps> = ({
  pedidoId,
  onConfirmar,
  onModificar,
  onCancelar
}) => {
  const { pedidos } = usePedido();
  const { products } = useProduct();
  const [productosDetallados, setProductosDetallados] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDetallesPedido();
  }, [pedidoId, pedidos, products]);

  const cargarDetallesPedido = () => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) {
      onCancelar();
      return;
    }

    // Obtener detalles de productos
    const productos = pedido.productIds.map(productId => {
      const producto = products.find(p => p.id === productId);
      return producto || {
        id: productId,
        name: `Producto #${productId}`,
        price: 10, // Precio por defecto
        description: 'Descripción no disponible',
        category: 'general'
      };
    });

    setProductosDetallados(productos);
    
    // Calcular total
    const totalCalculado = productos.reduce((sum, producto) => sum + producto.price, 0);
    setTotal(totalCalculado);
    setLoading(false);
  };

  const handleConfirmarPedido = async () => {
    try {
      // Aquí iría la lógica para confirmar el pedido
      console.log('Pedido confirmado:', pedidoId);
      alert('¡Pedido confirmado con éxito!');
      onConfirmar();
    } catch (error) {
      console.error('Error al confirmar pedido:', error);
      alert('Error al confirmar el pedido. Inténtalo de nuevo.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="confirmacion-loading">
        <div className="spinner"></div>
        <p>Cargando detalles del pedido...</p>
      </div>
    );
  }

  return (
    <div className="confirmacion-overlay">
      <div className="confirmacion-modal">
        <div className="confirmacion-header">
          <h2>Confirmar Pedido</h2>
          <p>Revisa los detalles antes de confirmar</p>
        </div>

        <div className="confirmacion-content">
          <div className="pedido-info">
            <div className="pedido-numero">
              <h3>Pedido #{pedidoId}</h3>
              <span className="fecha-pedido">
                {new Date().toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div className="productos-lista">
              <h4>Productos en tu pedido:</h4>
              {productosDetallados.map((producto, index) => (
                <div key={producto.id} className="producto-item">
                  <div className="producto-info">
                    <div className="producto-imagen">
                      {producto.imageUrl ? (
                        <img src={producto.imageUrl} alt={producto.name} />
                      ) : (
                        <div className="producto-placeholder">
                          🍽️
                        </div>
                      )}
                    </div>
                    <div className="producto-details">
                      <h5>{producto.name}</h5>
                      <p className="producto-descripcion">{producto.description}</p>
                      <span className="producto-categoria">{producto.category}</span>
                    </div>
                  </div>
                  <div className="producto-precio">
                    <span className="precio">{formatPrice(producto.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="resumen-pedido">
              <div className="resumen-item">
                <span>Subtotal:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="resumen-item">
                <span>Impuestos:</span>
                <span>{formatPrice(total * 0.08)}</span>
              </div>
              <div className="resumen-item total">
                <span>Total:</span>
                <span>{formatPrice(total * 1.08)}</span>
              </div>
            </div>
          </div>

          <div className="confirmacion-actions">
            <button 
              className="btn-cancelar"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button 
              className="btn-modificar"
              onClick={onModificar}
            >
              Modificar Pedido
            </button>
            <button 
              className="btn-confirmar"
              onClick={handleConfirmarPedido}
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionPedido; 