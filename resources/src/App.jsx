import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Layout
import AppLayout from "./layout/appLayout.jsx";

// Pages
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Home from "./pages/Home";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import EventosUsuario from "./pages/EventosUsuario.jsx";
import HomeCDMI from "./pages/HomeCDMI.jsx";
import ProductGallery from "./pages/ProductGallery.jsx";
import VentasDashboard from "./pages/VentasDashboard.jsx";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DonacionesDashboard from "./pages/DonacionesDashboard.jsx";
import EventosAdmin from "./pages/EventosAdmin.jsx";
import AyudasAdmin from "./pages/AyudasAdmin.jsx";
import AyudasUsuario from "./pages/AyudasUsuario.jsx";
import HistorialCompras from "./pages/HistorialCompras.jsx";
import DonacionesAdmin from "./pages/DonacionesAdmin.jsx";
import AdminCatalogo from "./pages/AdminCatalogo.jsx";
import CatalogoUsuario from "./pages/CatalogoUsuario.jsx";
import CartShop from "./pages/CartShop.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import UserOrders from "./pages/UserOrders.jsx";
import LogoutButton from "./pages/LogoutButton.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UserProfile from "./pages/UserProfile";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/perfil" element={<UserProfile />} />
                <Route path="/HomePage" element={<ProtectedRoute allowedRoles={["usuario"]}><HomePage /></ProtectedRoute>} />
                <Route path="/ShoppingCart" element={<ShoppingCart />} />
                <Route path="/EventosUsuario" element={<EventosUsuario />} />
                <Route path="/HomeCDMI" element={<HomeCDMI />} />
                <Route path="/DonacionesAdmin" element={<DonacionesAdmin />} />
                <Route path="/ProductGallery" element={<ProductGallery />} />
                <Route path="/VentasDashboard" element={<VentasDashboard />} />
                <Route path="/LogoutButton" element={<LogoutButton />} />
                <Route path="/ProtectedRoute" element={<ProtectedRoute />} />
                <Route path="/AdminDashboard" element={<ProtectedRoute allowedRoles={["administrador"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/DonacionesDashboard" element={<ProtectedRoute allowedRoles={["administrador"]}><DonacionesDashboard /></ProtectedRoute>} />
                <Route path="/EventosAdmin" element={<ProtectedRoute allowedRoles={["administrador"]}><EventosAdmin /></ProtectedRoute>} />
                <Route path="/AyudasAdmin" element={<ProtectedRoute allowedRoles={["administrador"]}><AyudasAdmin /></ProtectedRoute>} />
                <Route path="/AdminCatalogo" element={<ProtectedRoute allowedRoles={["administrador"]}><AdminCatalogo /></ProtectedRoute>} />
                <Route path="/AdminOrders" element={<ProtectedRoute allowedRoles={["administrador"]}><AdminOrders /></ProtectedRoute>} />
                <Route path="/UserOrders" element={<ProtectedRoute allowedRoles={["administrador"]}><UserOrders /></ProtectedRoute>} />
                <Route path="/CatalogoUsuario" element={<ProtectedRoute allowedRoles={["usuario"]}><CatalogoUsuario /></ProtectedRoute>} />
                <Route path="/CartShop" element={<ProtectedRoute allowedRoles={["usuario"]}><CartShop /></ProtectedRoute>} />
                <Route path="/AyudasUsuario" element={<ProtectedRoute allowedRoles={["usuario"]}><AyudasUsuario /></ProtectedRoute>} />
                <Route path="/HistorialCompras" element={<HistorialCompras />} />
                <Route path="*" element={<h1>Pagina no encontrada</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
