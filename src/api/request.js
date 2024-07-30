import axios from "axios";

const API = "http://localhost:3000";

// Rutas de usuarios
export const registerRequest = (userData) =>
  axios.post(`${API}/users/create`, userData);

export const loginRequest = (userData) =>
  axios.post(`${API}/users/login`, userData);

export const verifyTokenRequest = () =>
  axios.post(`${API}/users/verify`);

export const profileRequest = () =>
  axios.post(`${API}/users/profile`);

export const logoutRequest = () =>
  axios.post(`${API}/users/logout`);

// Rutas de pedidos
export const crearPedidoRequest = (pedidoData) =>
  axios.post(`${API}/pedidos/create`, pedidoData);

export const actualizarPedidoRequest = (pedidoId, pedidoData) =>
  axios.put(`${API}/pedidos/update/${pedidoId}`, pedidoData);

export const borrarPedidoRequest = (pedidoId) =>
  axios.delete(`${API}/pedidos/delete/${pedidoId}`);

export const obtenerPedidosRequest = () =>
  axios.get(`${API}/pedidos/getAll`);

// Rutas de productos
export const crearProductoRequest = (productData) =>
  axios.post(`${API}/products/create`, productData);

export const actualizarProductoRequest = (productId, productData) =>
  axios.put(`${API}/products/update/${productId}`, productData);

export const borrarProductoRequest = (productId) =>
  axios.delete(`${API}/products/delete/${productId}`);

export const obtenerProductosRequest = () =>
  axios.get(`${API}/products/getAll`);

// Rutas de mensajes
export const sendMessageRoute = `${API}/api/messages/addmsg`;
export const receiveMessageRoute = `${API}/api/messages/getmsg`;
