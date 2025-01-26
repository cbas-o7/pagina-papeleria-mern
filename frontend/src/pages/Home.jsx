
import { useRandomProducts } from "../hooks/useRandomProducts";
import { usePaginatedCategories } from "../hooks/usePaginatedCategories";
import ProductsHome from "../components/ProductsHome";
import CategoriesHome from "../components/CategoriesHome";


const categories = [
    { name: "Notebooks" },
    { name: "Writing Instruments" },
    { name: "Organizers" },
    { name: "Art Supplies" },
    { name: "Desk Accessories" },
    { name: "Backpacks" },
]

const img = 'https://flowbite.com/docs/images/examples/image-1@2x.jpg'

const products = [
    { name: "Luxury Notebook", price: "$24.99", image: img, category: "Notebooks" },
    { name: "Fountain Pen Set", price: "$49.99", image: img, category: "Writing Instruments" },
    { name: "Leather Planner", price: "$34.99", image: img, category: "Organizers" },
    { name: "Colored Pencil Set", price: "$19.99", image: img, category: "Art Supplies" },
    { name: "Desk Organizer", price: "$29.99", image: img, category: "Desk Accessories" },
    { name: "Canvas Backpack", price: "$39.99", image: img, category: "Backpacks" },
]



export default function Home() {

    const randomProducts = useRandomProducts(products, 6);

    const {
        paginatedCategories,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage,
    } = usePaginatedCategories(categories, 6);




    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-light shadow-sm">
                <div className="container py-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1 className="h4 mb-0">PaperCraft</h1>
                        </div>
                        <div className="col">
                            <nav className="nav justify-content-end">
                                <a className="nav-link text-secondary" href="#">
                                    Home
                                </a>
                                <a className="nav-link text-secondary" href="#">
                                    Products
                                </a>
                                <a className="nav-link text-secondary" href="#">
                                    About
                                </a>
                                <a className="nav-link text-secondary" href="#">
                                    Contact
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow-1">
                <section className="bg-light py-5 text-center">
                    <div className="container">
                        <h1 className="display-4 mb-4">Welcome to PaperCraft</h1>
                        <p className="lead mb-4">Discover our collection of premium stationery</p>
                        <button className="btn btn-primary btn-lg">Shop Now</button>
                    </div>
                </section>

                <CategoriesHome
                    categories={paginatedCategories}
                    onNextPage={goToNextPage}
                    onPreviousPage={goToPreviousPage}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                />

                <ProductsHome products={randomProducts} />
            </main>

            <footer className="bg-dark text-light py-4">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h3 className="h5 mb-3">About Us</h3>
                            <p className="">PaperCraft is your destination for premium stationery and writing supplies.</p>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0 ">
                            <h3 className="h5 mb-3">Quick Links</h3>
                            <ul className="list-unstyled ">
                                <li>
                                    <a href="#" className="link-light text-decoration-none">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="link-light text-decoration-none">
                                        Shipping
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="link-light text-decoration-none">
                                        Returns
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h3 className="h5 mb-3">Contact Us</h3>
                            <p className=" mb-1">Email: info@papercraft.com</p>
                            <p className="">Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="mt-4 text-center ">
                        <p>&copy; 2023 PaperCraft. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

