
import { useRandomProducts } from "../hooks/useRandomProducts";
import { usePaginatedCategories } from "../hooks/usePaginatedCategories";
import ProductsHome from "../components/ProductsHome";
import CategoriesHome from "../components/CategoriesHome";
import Header from "../components/Header";
import Footer from "../components/Footer";


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
    { id: 1, name: "Luxury Notebook", price: "$24.99", image: img, category: "Notebooks" },
    { id: 2, name: "Fountain Pen Set", price: "$49.99", image: img, category: "Writing Instruments" },
    { id: 3, name: "Leather Planner", price: "$34.99", image: img, category: "Organizers" },
    { id: 4, name: "Colored Pencil Set", price: "$19.99", image: img, category: "Art Supplies" },
    { id: 5, name: "Desk Organizer", price: "$29.99", image: img, category: "Desk Accessories" },
    { id: 6 , name: "Canvas Backpack", price: "$39.99", image: img, category: "Backpacks" },
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
            
            <Header/>

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

            <Footer></Footer>

            
        </div>
    )
}

