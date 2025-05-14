import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getUser, signup } from '../../services/api/user.service';


export default function useUserLogin(setIsLogin, login, onClose) {
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
        event.preventDefault();

        try {
            const userData = await getUser(user);
            if(userData.rol === "admin"){
                navigate("/adminhome");
            } else {
                login(userData); // Usa el contexto para autenticar
            }
            onClose();
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
            console.error("Error al iniciar sesion: ", error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!user.name.trim() || !user.email.trim() || !user.password.trim()) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            await signup(user);
            setUser(prev => ({...prev, name: '', password: '', }));
            setIsLogin(true);
            setErrorMessage('');
            login(user); // Usa el contexto para autenticar
            onClose();
        } catch (error) {
            setErrorMessage(`${error}. Intenta de nuevo.`);
            console.error("Error al registrar el usuario:", error);
        }
    };

    return { user, handleInput, handleLogin, handleSignUp, errorMessage  }
}
