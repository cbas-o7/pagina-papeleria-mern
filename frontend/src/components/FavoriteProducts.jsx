import ProductCard from "./ProductCard"

const img = 'https://flowbite.com/docs/images/examples/image-1@2x.jpg'

const favoriteProducts = [
    {
      id: 1,
      name: "Luxury Notebook",
      price: "$24.99",
      image: img,
      category: "Notebooks",
    },
    {
      id: 2,
      name: "Fountain Pen Set",
      price: "$49.99",
      image: img,
      category: "Writing Instruments",
    },
    {
      id: 3,
      name: "Leather Planner",
      price: "$34.99",
      image: img,
      category: "Organizers",
    },
  ]
  
  export default function FavoriteProducts() {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Your Favorite Products</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  }