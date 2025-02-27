import React from "react"; 
import { Navigate, Outlet } from "react-router-dom";

 const AdminRoute = () => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  // Si el usuario no existe o no es admin, lo redirigimos a la página principal
  if (!admin || admin.rol !== "admin") {
    console.log("regresese we")
    return <Navigate to="/" />;
  }

  // Si es admin, renderizamos la página protegida
  return <Outlet />;
};

export default AdminRoute;