import React from 'react';
import ReactDOM from 'react-dom'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import ProductProvider from './auth/ProductProvider';
import { PedidoProvider } from './auth/PedidoProvider';
import { CalificacionProvider } from './auth/CalificacionProvider';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import RecuperarContraseña from './pages/Recuperar';
import ConfirmarContraseña from './pages/ConfirmarContraseña';
import Navbar from './components/organims/navbar/Section';
import Bot from './pages/Bot-on';
import Menu from './pages/Menu';
import MenuBebidas from './pages/MenuBebidas';
import MenuPostres from './pages/MenuPostres';
import Inventario from './pages/Inventario';
import UploadProduct from './components/organims/UploadProducts/Section';
import Carrito from './pages/Ordenar'; 
import ChatuserPage from './pages/Websocket';
import ChatAdminPage from './pages/Chatadmin';
import HistorialCalificacionesPage from './pages/HistorialCalificaciones';
import ConfirmacionPedidoPage from './pages/ConfirmacionPedido';

const router = createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>,
  },
  {
    path:'/sesion',
    element:<Login/>,
  },
  {
    path:'/registrarse',
    element:<Register/>,
  }, 
  {
    path:'/recuperar',
    element:<RecuperarContraseña/>
  },
  {
    path:'/confirmar contraseña',
    element: <ConfirmarContraseña/>
  },
  {
    path: '/nav',
    element: <Navbar/>
  },
  {
    path: '/menu',
    element: <Menu/>
  },
  {
    path: '/bot',
    element: <Bot/>
  },
  {
    path: '/bebidas',
    element: <MenuBebidas/>
  },
  {
    path: '/postres',
    element: <MenuPostres/>
  },
  {
    path: '/inventario',
    element: <Inventario/>
  },
  {
    path: '/upload',
    element: <UploadProduct/>
  },
  {
    path: '/carrito', 
    element: <Carrito/> 
  },
  {
    path:'/*',
    element:<NotFound/>,
  },
  {
    path: '/ChatUser',
    element: <ChatuserPage/>
  },
  {
    path: '/ChatAdmin',
    element: <ChatAdminPage/>
  },
  {
    path: '/historial-calificaciones',
    element: <HistorialCalificacionesPage/>
  },
  {
    path: '/confirmacion-pedido',
    element: <ConfirmacionPedidoPage/>
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <PedidoProvider>
          <CalificacionProvider>
            <RouterProvider router={router}/>
          </CalificacionProvider>
        </PedidoProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
