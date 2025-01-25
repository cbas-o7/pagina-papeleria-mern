import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUser } from '../services/api'

//import { useState } from 'react'

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  //const [errors, setrErrors] = useState({})
  const navigate = useNavigate();
  
  const handleInput = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await getUser(user); // Espera la respuesta de login()
      console.log(response); // Puedes depurar la respuesta del servidor
      navigate("/home"); // Redirige después de una respuesta exitosa
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }


  return (

    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit} className=" rounded-2">
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Introduce tu email' className="form-control" value={user.email}
              onChange={handleInput} name='email' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Contrasena</label>
            <input type="password" placeholder='Introduce tu contrasena' className="form-control" value={user.password}
              onChange={handleInput} name='password' />
          </div>
          <button className='btn btn-success w-100' type="submit">Iniciar Sesion</button>

          <p></p>
          <Link to="/signup" className='btn btn-default w-100'>Crear cuenta</Link>
        </form>
      </div>
    </div>

  )
}

export default Login
