
import { useRandomProducts } from "../hooks/product/useRandomProducts";
import { usePaginatedCategories } from "../hooks/category/usePaginatedCategories";
import ProductsHome from "../components/product/ProductsHome";
import CategoriesHome from "../components/category/CategoriesHome";

export default function Home({openLogin}) {

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
            
            <main className="flex-grow-1">
                <section className="bg-light py-5 text-center">
                    <div className="container">
                        <h1 className="display-4 mb-4">Bienvenido a PaperCraft</h1>
                        <p className="lead mb-4">Descrubre nuestra coleccion de articulos</p>
                        {/* <button className="btn btn-primary btn-lg">Shop Now</button> */}
                    </div>
                </section>

                <CategoriesHome
                    categories={paginatedCategories}
                    onNextPage={goToNextPage}
                    onPreviousPage={goToPreviousPage}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                />

                <ProductsHome products={products} openLogin={openLogin}/>
            </main>
            
        </div>
    )
}

