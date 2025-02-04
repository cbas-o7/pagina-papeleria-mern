//import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import ProductsPage from "./pages/ProductsPage.jsx";
import Favorites from "./pages/Favorites.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminRoute from "./components/admin_components/AdminRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ProductsPage />}></Route>
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route element={<AdminRoute />}>
          <Route path="/adminhome" element={<AdminHome />} />
        </Route>
        {/* <Route
          path="/adminhome"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}
