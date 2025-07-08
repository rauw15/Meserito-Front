import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  crearCalificacionRequest,
  actualizarCalificacionRequest,
  borrarCalificacionRequest,
  obtenerCalificacionesRequest
} from '../api/request';

interface Calificacion {
  id?: number;
  pedidoId: number;
  calificacion: number;
  comentario: string;
  fecha: string;
  userEmail?: string;
}

interface CalificacionProviderType {
  calificaciones: Calificacion[];
  createCalificacion: (calificacionData: Omit<Calificacion, 'id'>) => Promise<void>;
  updateCalificacion: (calificacionId: number, calificacionData: Calificacion) => Promise<void>;
  deleteCalificacion: (calificacionId: number) => Promise<void>;
  fetchCalificaciones: () => Promise<void>;
  getCalificacionByPedido: (pedidoId: number) => Calificacion | undefined;
  getPromedioCalificaciones: () => number;
}

const CalificacionContext = createContext<CalificacionProviderType | undefined>(undefined);

export const useCalificacion = () => {
  const context = useContext(CalificacionContext);
  if (!context) throw new Error('useCalificacion must be used within a CalificacionProvider');
  return context;
};

export const CalificacionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCalificaciones = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await obtenerCalificacionesRequest();
      if (response.data.status === 'success' && Array.isArray(response.data.data)) {
        setCalificaciones(response.data.data);
      }
    } catch (error) {
      console.error('Error al obtener calificaciones:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const createCalificacion = async (calificacionData: Omit<Calificacion, 'id'>) => {
    try {
      const response = await crearCalificacionRequest(calificacionData);
      console.log('Calificación creada:', response.data);
      fetchCalificaciones();
    } catch (error) {
      console.error('Error al crear calificación:', error);
      throw error;
    }
  };

  const updateCalificacion = async (calificacionId: number, calificacionData: Calificacion) => {
    try {
      await actualizarCalificacionRequest(calificacionId, calificacionData);
      fetchCalificaciones();
    } catch (error) {
      console.error('Error al actualizar calificación:', error);
    }
  };

  const deleteCalificacion = async (calificacionId: number) => {
    try {
      await borrarCalificacionRequest(calificacionId);
      fetchCalificaciones();
    } catch (error) {
      console.error('Error al eliminar calificación:', error);
    }
  };

  const getCalificacionByPedido = (pedidoId: number): Calificacion | undefined => {
    return calificaciones.find(cal => cal.pedidoId === pedidoId);
  };

  const getPromedioCalificaciones = (): number => {
    if (calificaciones.length === 0) return 0;
    const suma = calificaciones.reduce((acc, cal) => acc + cal.calificacion, 0);
    return Math.round((suma / calificaciones.length) * 10) / 10;
  };

  const calificacionContextValue: CalificacionProviderType = {
    calificaciones,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion,
    fetchCalificaciones,
    getCalificacionByPedido,
    getPromedioCalificaciones,
  };

  return (
    <CalificacionContext.Provider value={calificacionContextValue}>
      {children}
    </CalificacionContext.Provider>
  );
};

export default CalificacionProvider; 