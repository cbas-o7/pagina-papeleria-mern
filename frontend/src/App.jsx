//import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home.jsx'
import ProductsPage from "./pages/ProductsPage.jsx";
import Favorites from "./pages/Favorites.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import { useState } from "react";
import Header from "./components/common/Header.jsx";
import LoginPopup from "./components/user/LoginPopup.jsx";
import Footer from "./components/common/Footer.jsx";
import { useAuth } from "./context/AuthContext"; // Importa el contexto

function AppContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth(); // Obtiene el usuario autenticado del contexto

  const location = useLocation(); // Obtiene la ruta actual
  const hideLayout = location.pathname.startsWith("/adminhome"); // Ocultar en admin

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <>
      {/* Usa user en vez de isAuthenticated */}
      {!hideLayout && <Header openLogin={openLogin} isAuthenticated={!!user} />}
      <LoginPopup isOpen={isLoginOpen} onClose={closeLogin} />

      <Routes>
        <Route path='/' element={<Home openLogin={openLogin}/>}></Route>
        <Route path='/products' element={<ProductsPage openLogin={openLogin}/>}></Route>
        <Route path='/products/:id' element={<ProductDetails openLogin={openLogin}/>} />
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