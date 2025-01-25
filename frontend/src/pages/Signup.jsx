import { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom"
import { signup } from '../services/api'


export default function Signup() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    rol: 'user',
  })

  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(newUser); // Espera la respuesta de login()
      console.log(response); // Puedes depurar la respuesta del servidor
      navigate("/login"); // Redirige después de una respuesta exitosa
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Registrate</h2>
        <form action="" className=" rounded-2">
          <div className='mb-3'>
            <label htmlFor="name">Nombre</label>
            <input type="name" placeholder='Introduce tu nombre' className="form-control" value={newUser.name}
              onChange={handleInput} name='name' />
          </div>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Introduce tu email' className="form-control" value={newUser.email}
              onChange={handleInput} name='email'/>
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Contrasena</label>
            <input type="password" placeholder='Introduce tu contrasena' className="form-control" value={newUser.password}
              onChange={handleInput} name='password' />
          </div>
          <button className='btn btn-success w-100' onClick={handleSignUp}>Crear Cuenta</button>

          <p></p>
          <Link to="/login" className='btn btn-default w-100'>Iniciar Sesion</Link>
        </form>
      </div>
    </div>

  )
}
