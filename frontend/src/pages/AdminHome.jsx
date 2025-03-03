"use client"

import { IoMenu } from "react-icons/io5";
import { useState } from "react"
import ProductManagement from "../components/admin_components/ProductManagement"
import OrderManagement from "../components/admin_components/OrderManagement"
import StoreInformation from "../components/admin_components/StoreInformation"
import "../components/admin_components/productManagement.css"
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    const [activeTab, setActiveTab] = useState("products")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        // Logout functionality would be implemented here
        console.log("Logout clicked")
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="container-fluid bg-light min-vh-100">
            <div className="row">

                <nav className={`col-md-3 col-lg-2 bg-dark sidebar min-vh-100 position-fixed ${sidebarOpen ? "show" : ""}`} style={{ height: "100vh" }}>
                    <div className="d-flex flex-column h-100 p-2">
                        {/* Menú de navegación */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === "products" ? "active" : ""} text-white`}
                                    href="#"
                                    onClick={() => {
                                        setActiveTab("products")
                                        setSidebarOpen(false)
                                    }}
                                >
                                    Gestión de productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === "orders" ? "active" : ""} text-white`}
                                    href="#"
                                    onClick={() => {
                                        setActiveTab("orders")
                                        setSidebarOpen(false)
                                    }}
                                >
                                    Gestión de pedidos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === "store" ? "active" : ""} text-white`}
                                    href="#"
                                    onClick={() => {
                                        setActiveTab("store")
                                        setSidebarOpen(false)
                                    }}
                                >
                                    Información de la tienda
                                </a>
                            </li>
                        </ul>

                        {/* Botón de salir */}
                        <button className="btn btn-danger mt-auto mx-1"  onClick={() => navigate("/")}>
                            Ir a la página principal
                        </button>
                    </div>
                </nav>


                <main className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Admin Panel</h1>
                        <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
                            <IoMenu />
                        </button>
                    </div>
                    {activeTab === "products" && <ProductManagement />}
                    {activeTab === "orders" && <OrderManagement />}
                    {activeTab === "store" && <StoreInformation />}
                </main>
            </div>
        </div>
    )

}
