//import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home.jsx'
import ProductsPage from "./pages/ProductsPage.jsx";
import Favorites from "./pages/Favorites.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminRoute from "./components/admin_components/AdminRoute.jsx";
import { useState } from "react";
import Header from "./components/Header.jsx";
import LoginPopup from "./components/LoginPopup.jsx";
import Footer from "./components/Footer.jsx";

function AppContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user")); // Inicializa correctamente

  const location = useLocation(); // Obtiene la ruta actual
  const hideLayout = location.pathname.startsWith("/adminhome"); // Ocultar en admin

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <>
      {/* Pasamos la función openLogin y el estado de autenticación al Header */}
      {!hideLayout && <Header openLogin={openLogin} isAuthenticated={isAuthenticated} />}
      <LoginPopup isOpen={isLoginOpen} onClose={closeLogin} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductsPage />}></Route>
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route element={<AdminRoute />}>
          <Route path="/adminhome" element={<AdminHome />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}



export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}