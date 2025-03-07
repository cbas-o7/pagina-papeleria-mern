import { useSearchParams } from "react-router-dom";
import Products from "../components/Products";


export default function ProductsPage({openLogin}) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "Todos";
  
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">
        <Products openLogin={openLogin} chosenCategory={category}/>
      </main>

    </div>
  )
}
