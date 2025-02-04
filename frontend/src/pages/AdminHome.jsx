"use client"

import { IoMenu } from "react-icons/io5";
import { useState } from "react"
import ProductManagement from "../components/admin_components/ProductManagement"
import OrderManagement from "../components/admin_components/OrderManagement"
import StoreInformation from "../components/admin_components/StoreInformation"
import "../components/admin_components/ProductManagement.css"

export default function AdminHome() {
    const [activeTab, setActiveTab] = useState("products")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        // Logout functionality would be implemented here
        console.log("Logout clicked")
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="container-fluid bg-light min-vh-100">
            <div className="row">
                <nav className={`col-md-3 col-lg-2 bg-dark sidebar min-vh-100  ${sidebarOpen ? "show" : ""}`}>
                    <div className="position-sticky pt-3">
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
                                    Product Management
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
                                    Order Management
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
                                    Store Information
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 ">
                        <button className="btn btn-danger -100" onClick={() => console.log("Logout clicked")}>
                            Logout
                        </button>
                    </div>
                </nav>

                <main className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Admin Panel</h1>
                        <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
                            <IoMenu  />
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
