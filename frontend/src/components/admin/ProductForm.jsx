"use client"

import { useState, useEffect } from "react"
import useAdminCategories from "../../hooks/category/useAdminCategories";
import { addProduct, updateProduct } from "../../services/api/product.service";


export default function ProductForm({ product, onClose, fetchProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
    currentImage: "",
  })

  const { categories, setCategories } = useAdminCategories();
  

  useEffect(() => {
    if (product) {
      //console.log(product)
      const numericPrice = parseFloat(product.price.replace('$', ''));
      //const updatedProduct = { ...product, price: numericPrice };
      //setFormData(updatedProduct)
      setFormData({
        ...product,
        price: numericPrice,
        currentImage: `${product.image}?t=${new Date().getTime()}`, // Guardamos la URL actual
        image: null, // Reiniciamos la imagen
      });
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response;
      if (product) {
        // Si el producto existe, lo editamos
        response = await updateProduct(product._id, formData);
      } else {
        // Si no existe, creamos uno nuevo
        response = await addProduct(formData);
      }
      fetchProducts()
      //console.log("Producto guardado:", response);
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? "Editar producto" : "Agregar Nuevo Producto"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del producto</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Selecciona una categoria</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripcion</label>
                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="3" required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Imagen del producto</label>
                <input type="file" className="form-control" id="image" name="image" onChange={handleChange} accept="image/*" />
                {formData.currentImage && (
                  <div className="mt-2">
                    <p>Imagen Actual:</p>
                    <img src={formData.currentImage} alt="Current" style={{ maxWidth: "100px" }} />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">{product ? "Actualizar Producto" : "Agregar Producto"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}