import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCalificacion } from '../../../auth/CalificacionProvider';
import '../../../assets/styles/CalificacionServicio.css';

interface CalificacionServicioProps {
  pedidoId?: number;
  onCalificacionCompletada?: () => void;
  onCerrar?: () => void;
}

const CalificacionServicio: React.FC<CalificacionServicioProps> = ({ 
  pedidoId, 
  onCalificacionCompletada,
  onCerrar 
}) => {
  const { createCalificacion } = useCalificacion();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const formik = useFormik({
    initialValues: {
      pedidoId: pedidoId || 0,
      calificacion: 0,
      comentario: '',
      fecha: new Date().toISOString(),
    },
    validationSchema: Yup.object({
      calificacion: Yup.number()
        .min(1, 'Debes seleccionar una calificación')
        .max(5, 'La calificación máxima es 5')
        .required('La calificación es requerida'),
      comentario: Yup.string()
        .min(10, 'El comentario debe tener al menos 10 caracteres')
        .max(500, 'El comentario no puede exceder 500 caracteres')
        .required('El comentario es requerido'),
    }),
    onSubmit: async (values) => {
      try {
        await createCalificacion({
          ...values,
          calificacion: rating,
        });
        
        alert('¡Gracias por tu calificación!');
        
        if (onCalificacionCompletada) {
          onCalificacionCompletada();
        }
        
        if (onCerrar) {
          onCerrar();
        }
      } catch (error) {
        console.error('Error al enviar calificación:', error);
        alert('Error al enviar la calificación. Inténtalo de nuevo.');
      }
    },
  });

  const handleStarClick = (value: number) => {
    setRating(value);
    formik.setFieldValue('calificacion', value);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
        onClick={() => handleStarClick(star)}
        onMouseEnter={() => setHover(star)}
        onMouseLeave={() => setHover(0)}
      >
        ★
      </button>
    ));
  };

  const getCalificacionText = () => {
    if (rating === 0) return 'Selecciona una calificación';
    if (rating === 1) return 'Muy malo';
    if (rating === 2) return 'Malo';
    if (rating === 3) return 'Regular';
    if (rating === 4) return 'Bueno';
    if (rating === 5) return 'Excelente';
    return '';
  };

  return (
    <div className="calificacion-overlay">
      <div className="calificacion-modal">
        <div className="calificacion-header">
          <h2>¿Cómo calificarías nuestro servicio?</h2>
          <p>Tu opinión nos ayuda a mejorar</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="calificacion-form">
          <div className="stars-container">
            <div className="stars">
              {renderStars()}
            </div>
            <p className="calificacion-text">{getCalificacionText()}</p>
          </div>

          {formik.touched.calificacion && formik.errors.calificacion && (
            <div className="error-message">{formik.errors.calificacion}</div>
          )}

          <div className="comentario-container">
            <label htmlFor="comentario">Comentario (opcional pero muy útil)</label>
            <textarea
              id="comentario"
              name="comentario"
              placeholder="Cuéntanos sobre tu experiencia..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comentario}
              rows={4}
              maxLength={500}
            />
            <div className="caracteres-restantes">
              {formik.values.comentario.length}/500 caracteres
            </div>
            {formik.touched.comentario && formik.errors.comentario && (
              <div className="error-message">{formik.errors.comentario}</div>
            )}
          </div>

          <div className="calificacion-actions">
            {onCerrar && (
              <button 
                type="button" 
                className="btn-cancelar"
                onClick={onCerrar}
              >
                Cancelar
              </button>
            )}
            <button 
              type="submit" 
              className="btn-enviar"
              disabled={rating === 0 || formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalificacionServicio; 