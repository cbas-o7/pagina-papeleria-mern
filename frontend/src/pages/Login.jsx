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

      const userData = await getUser(user);
      console.log("login redireccionando: ", userData)
      if (userData.role === "admin") {
        navigate("/adminhome"); // Si es admin, lo enviamos a /adminhome
      } else {
        navigate("/"); // Si es user, lo enviamos a /
      }
    } catch (error) {
      console.error("Error al iniciar sesion: ", error);
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
