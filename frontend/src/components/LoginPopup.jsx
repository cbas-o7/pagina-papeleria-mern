"use client"

import { useState } from "react"
import useUserLogin from "../hooks/useUserLogin"

export default function LoginPopup({ isOpen, onClose, setIsAuthenticated }) {
    const [isLogin, setIsLogin] = useState(true)

    const { user, handleInput, handleLogin, handleSignUp, errorMessage } = useUserLogin(setIsLogin, setIsAuthenticated, onClose)

    const toggleForm = () => {
        setIsLogin(!isLogin)
    }

    if (!isOpen) return null

    return (
        <div
            className="z-3 position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" }}
        >

            <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="mb-4">{isLogin ? "Inicia sesion" : "Registrate"}</h2>
                <form onSubmit={isLogin ? handleLogin : handleSignUp}>
                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={user.name}
                                onChange={handleInput}
                                name='name'
                                required
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={user.email}
                            onChange={handleInput}
                            name='email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={user.password}
                            onChange={handleInput}
                            name='password'
                            required
                        />
                    </div>

                    {errorMessage && <p className="text-danger">{errorMessage}</p>}


                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                    </button>

                </form>
                <p className="text-center mb-0">
                    {isLogin ? "No tienes cuenta? " : "Ya tienes una cuenta? "}
                    <button className="btn btn-link p-0" onClick={toggleForm}>
                        {isLogin ? "Registrate" : "Inicia Sesion"}
                    </button>
                </p>
                <button className="btn btn-secondary mt-3 w-100" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    )
}

