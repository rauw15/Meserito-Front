import React, { useState, useEffect } from 'react';
import { useCalificacion } from '../../../auth/CalificacionProvider';
import '../../../assets/styles/HistorialCalificaciones.css';

const HistorialCalificaciones: React.FC = () => {
  const { calificaciones, fetchCalificaciones, deleteCalificacion, getPromedioCalificaciones } = useCalificacion();
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'fecha' | 'calificacion'>('fecha');

  useEffect(() => {
    const loadCalificaciones = async () => {
      setLoading(true);
      try {
        await fetchCalificaciones();
      } catch (error) {
        console.error('Error al cargar calificaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCalificaciones();
  }, [fetchCalificaciones]);

  const handleDeleteCalificacion = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta calificación?')) {
      try {
        await deleteCalificacion(id);
        alert('Calificación eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar calificación:', error);
        alert('Error al eliminar la calificación');
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const filteredCalificaciones = calificaciones
    .filter(cal => filterRating === null || cal.calificacion === filterRating)
    .sort((a, b) => {
      if (sortBy === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      } else {
        return b.calificacion - a.calificacion;
      }
    });

  const promedio = getPromedioCalificaciones();
  const totalCalificaciones = calificaciones.length;

  if (loading) {
    return (
      <div className="historial-loading">
        <div className="spinner"></div>
        <p>Cargando calificaciones...</p>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h1>Historial de Calificaciones</h1>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Promedio General:</span>
            <span className="stat-value">{promedio.toFixed(1)}/5 ⭐</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Calificaciones:</span>
            <span className="stat-value">{totalCalificaciones}</span>
          </div>
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="filter-rating">Filtrar por calificación:</label>
          <select
            id="filter-rating"
            value={filterRating || ''}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Todas las calificaciones</option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="2">2 estrellas</option>
            <option value="1">1 estrella</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-by">Ordenar por:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'fecha' | 'calificacion')}
          >
            <option value="fecha">Fecha (más reciente)</option>
            <option value="calificacion">Calificación (más alta)</option>
          </select>
        </div>
      </div>

      {filteredCalificaciones.length === 0 ? (
        <div className="no-calificaciones">
          <p>No hay calificaciones para mostrar</p>
        </div>
      ) : (
        <div className="calificaciones-grid">
          {filteredCalificaciones.map((calificacion) => (
            <div key={calificacion.id} className="calificacion-card">
              <div className="calificacion-header">
                <div className="calificacion-info">
                  <h3>Pedido #{calificacion.pedidoId}</h3>
                  <span className="calificacion-fecha">
                    {new Date(calificacion.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="calificacion-rating">
                  {renderStars(calificacion.calificacion)}
                  <span className="rating-number">{calificacion.calificacion}/5</span>
                </div>
              </div>

              {calificacion.comentario && (
                <div className="calificacion-comentario">
                  <p>"{calificacion.comentario}"</p>
                </div>
              )}

              <div className="calificacion-actions">
                <button
                  className="btn-eliminar"
                  onClick={() => handleDeleteCalificacion(calificacion.id!)}
                  title="Eliminar calificación"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialCalificaciones; 