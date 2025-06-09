// src/components/HomePage.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DonationForm from './DonationForm';
import './CustomStyles.css';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const rol = localStorage.getItem("rol");

   // Verificamos si el usuario tiene el rol adecuado
   if (!token || rol !== "usuario") {
    navigate("/login");  // Si no es administrador, redirigimos a login
    return null;
}

  return (
    <div className="justify-content-center position-relative">
      {/*<Navbar />*/}
      <Sidebar />
      <DonationForm />
    </div>
  );
}
