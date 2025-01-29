
import { useRandomProducts } from "../hooks/useRandomProducts";
import { usePaginatedCategories } from "../hooks/usePaginatedCategories";
import ProductsHome from "../components/ProductsHome";
import CategoriesHome from "../components/CategoriesHome";
import Header from "../components/Header";
import Footer from "../components/Footer";


/* const categories = [
    { name: "Notebooks" },
    { name: "Writing Instruments" },
    { name: "Organizers" },
    { name: "Art Supplies" },
    { name: "Desk Accessories" },
    { name: "Backpacks" },
] */

export default function Home() {

    const {products, categories} = useRandomProducts();
    
    //console.log(products, categories)
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

                <ProductsHome products={products} />
            </main>

            <Footer></Footer>

            
        </div>
    )
}

