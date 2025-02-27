import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getUser, signup } from '../services/api';


export default function useUserLogin(setIsLogin, setIsAuthenticated, onClose) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        rol: 'user',
    })

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInput = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrorMessage('');
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {

            const userData = await getUser(user); // Guardar usuario

            setIsAuthenticated(true); // Actualizar estado global
            //console.log("login redireccionando: ", userData)

            navigate(userData.rol === "admin" ? "/adminhome" : "/");
            
            onClose()
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
            console.error("Error al iniciar sesion: ", error);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!user.name.trim() || !user.email.trim() || !user.password.trim()) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            await signup(user); // Espera la respuesta de login()
            setUser(prev => ({...prev, name: '', password: '', }))
            setIsLogin(true)

            setErrorMessage(''); 
            //console.log(response); // Puedes depurar la respuesta del servidor
            //navigate("/login"); // Redirige después de una respuesta exitosa
            setIsAuthenticated(true);
            onClose()
        } catch (error) {
            setErrorMessage(`${error}. Intenta de nuevo.`);
            console.error("Error al registrar el usuario:", error);
        }
    };

    return { user, handleInput, handleLogin, handleSignUp, errorMessage  }
}
