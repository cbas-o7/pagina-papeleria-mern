import Category from "../models/category.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Favorite from "../models/favorite.js";
import mongoose from "mongoose";
import { addProductToFirebase, deleteImageFromFirebase } from "../firebase.js";
import { emitDeleteProduct } from "../socket.js"; 

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Obtener productos de MongoDB
        const categories = await Category.find(); // Obtener categorías de MongoDB

        res.status(200).json({ success: true, data: { products, categories } });
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};

export const getRandomProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 6 } }]); // Obtiene 6 productos aleatorios
        const categories = await Category.find();

        res.status(200).json({ success: true, data: { products, categories } });
    } catch (error) {
        console.error("Error al obtener productos aleatorios:", error.message);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};


export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id); // Buscar el producto en la base de datos

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        // Si el producto es encontrado, devolverlo al frontend
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(`Error al obtener el producto: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

export const addProduct = async (req, res) => {

    const { name, price, category, description } = req.body;
    const file = req.files?.image;

    const idProduct = new mongoose.Types.ObjectId();

    if (!file) {
        return res.status(400).json({ message: "No se subió ninguna imagen." });
    }


    try {
        // Llama a la función para subir la imagen a Firebase Storage y obtener la URL
        const imageUrl = await addProductToFirebase(idProduct, file);

        // Crea un nuevo producto y guárdalo en la base de datos
        const newProduct = new Product({
            _id: idProduct,
            name,
            price: `$${parseFloat(price).toFixed(2)}`,
            description,
            image: imageUrl,
            category,
        });

        await newProduct.save();

        res.status(200).json({ success: true, product: newProduct });
    } catch (error) {
        console.error("Error al agregar producto:", error);

        // En caso de error, eliminamos la imagen de Firebase
        await deleteImageFromFirebase(idProduct);


        // Responder con el error
        res.status(500).json({ success: false, message: 'Error al agregar producto', error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;
        const file = req.files?.image;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        let imageUrl = product.image; // Mantiene la imagen anterior

        //console.log("imagen: ", file)
        if (file) {
            // Si hay una nueva imagen, eliminar la anterior y subir la nueva
            //console.log("entre en cambiar imagen jeje")
            //await deleteImageFromFirebase(id);
            imageUrl = await addProductToFirebase(id, file);
        }

        //const oldName = product.name;
        //const oldPrice = product.price;

        // Actualizar el producto
        product.name = name;
        product.price = `$${parseFloat(price).toFixed(2)}`;
        product.description = description;
        product.category = category;
        product.image = imageUrl; // Actualizar la imagen

        await product.save();

        // Actualizar en el carrito si el producto ya está agregado
        await Cart.updateMany(
            { "products.productId": id },
            {
                $set: {
                    "products.$[elem].name": name,
                    "products.$[elem].unitPrice": parseFloat(price).toFixed(2),
                },
            },
            { arrayFilters: [{ "elem.productId": id }] }
        );

        res.status(200).json({ success: true, product, message: "Producto y carrito actualizados correctamente." });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ success: false, message: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Eliminar el producto de la base de datos
        await Product.findByIdAndDelete(id);

        // Eliminar el producto de todos los carritos
        await Cart.updateMany(
            { "products.productId": id },
            { $pull: { products: { productId: id } } }
        );

        // Eliminar el producto de favoritos de todos los usuarios
        await Favorite.updateMany(
            { "favoriteProducts.productId": id },
            { $pull: { favoriteProducts: { productId: id } } }
        );

        // Eliminar la imagen de Firebase Storage (si tiene una)
        if (product.image) {
            await deleteImageFromFirebase(product.image);
        }

        emitDeleteProduct(id)


        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error eliminando el producto" });
    }
};