import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom"

function Header({ openLogin, isAuthenticated}) {
    return (
        <header className="bg-light shadow-sm">
            <div className="container py-3">
                <div className="row align-items-center">
                    <div className="col">
                        <h1 className="h4 mb-0">PaperCraft</h1>
                    </div>
                    <div className="col">
                        <nav className="nav justify-content-end">
                            <Link to="/" className='nav-link text-secondary'>
                                Home
                            </Link>
                            <Link to="/products" className='nav-link text-secondary'>
                                Productos
                            </Link>

                            {/* Si está autenticado, muestra los links de usuario */}
                            {isAuthenticated ? (
                                <>
                                    <Link to="/favorites" className="nav-link text-secondary">
                                        Favoritos
                                    </Link>
                                    <Link to="/cart" className="nav-link text-secondary">
                                        Carrito
                                    </Link>
                                    <Link to="/account" className="nav-link text-secondary">
                                        <VscAccount size={28} />
                                    </Link>
                                </>
                            ) : (
                                // Si NO está autenticado, muestra solo el botón de login
                                <button onClick={openLogin} className="nav-link btn btn-primary">
                                    Inicia sesion
                                </button>
                            )}
                            
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header