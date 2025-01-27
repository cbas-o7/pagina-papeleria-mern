import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom"

function Header() {
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
                                Products
                            </Link>
                            <Link to="/favorites" className='nav-link text-secondary'>
                                Favorites
                            </Link>
                            <Link to="/cart" className='nav-link text-secondary'>
                                Cart
                            </Link>
                            <Link to="/account" className='nav-link text-secondary'>
                                <VscAccount size={28}/>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header