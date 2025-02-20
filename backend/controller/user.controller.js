import User from "../models/user.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import Favorite from "../models/favorite.js";
import Cart from "../models/cart.js";
import {
    addProductToFirebase,
    deleteImageFromFirebase
} from "../firebase.js";
import mongoose from "mongoose";
import DailyOrder from "../models/dailyOrder.js";
import StoreHours from "../models/store.js";

export const getUserLogin = async (req, res) => {
    const { email, password } = req.body; // Recoge email y password de los parámetros de consulta

    // Verificar que se envíen los campos requeridos
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Ingrese email y contraseña' });
    }

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });

        // Si el usuario no existe
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Verificar que la contraseña coincida
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, devolver datos del usuario
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                role: user.rol, // Enviar el rol en la respuesta
            }
        });
    } catch (error) {
        console.error(`Error al autenticar usuario: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}

export const userSignup = async (req, res) => {
    const user = req.body //usuario mandara los datos

    if (!user.email || !user.name || !user.password || !user.rol) {
        return res.status(500).json({ success: false, message: 'Ingrese los campos requeridos' })
    }

    const existingEmail = await User.findOne({ email: user.email });
    if (existingEmail) {
        return res.status(500).json({ success: false, message: 'El email ya está registrado' });
    }

    const newUser = new User(user)

    try {
        await newUser.save()
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.error(`Error creando usuario: ${error.message}`)
        res.status(500).json({ success: false, message: 'Error en el servidor' })
    }
}

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

export const getOrdersByUserId = async (req, res) => {
    const { userId } = req.body; // Recibir el userId en el body

    if (!userId) {
        return res.status(400).json({ success: false, message: "Falta el userId" });
    }

    try {
        const orders = await Order.find({ userId }).populate("products.productId");

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No hay órdenes para este usuario." });
        }

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};

export const getPendingOrdersByUserId = async (req, res) => {
    const { userId } = req.query; // Recibir el userId en el body

    if (!userId) {
        return res.status(400).json({ success: false, message: "Falta el userId" });
    }

    try {
        const orders = await Order.find({ userId, estado: "Por entregar" }).populate("products.productId");


        if (!orders.length) {
            return res.status(202).json({ success: false, message: "No hay órdenes para este usuario." });
        }


        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};

export const cancelOrder = async (req, res) => {
    const orderId = req.params.id;
    //console.log(req.body)

    if (!orderId) {
        return res.status(400).json({ success: false, message: "Falta el orderId" });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Orden no encontrada." });
        }

        if (order.estado !== "Por entregar") {
            return res.status(400).json({ success: false, message: "Solo puedes cancelar órdenes 'Por entregar'." });
        }

        order.estado = "Cancelado";
        await order.save();

        // Buscar y actualizar DailyOrder si existe
        const dailyOrder = await DailyOrder.findOne({ orderId });
        if (dailyOrder) {
            dailyOrder.estado = "Cancelado";
            await dailyOrder.save();
        }

        res.status(200).json({ success: true, message: "Orden cancelada correctamente.", data: order });
    } catch (error) {
        console.error("Error cancelando la orden:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};


export const addFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId });

        if (favorite) {
            // Si el producto ya está en favoritos, no hacemos nada
            if (favorite.favoriteProducts.some(item => item.productId === productId)) {
                return res.status(400).json({ success: false, message: 'Este producto ya está en tus favoritos' });
            }

            // Agregar el nuevo producto a favoritos
            favorite.favoriteProducts.push({ productId });
            await favorite.save();
        } else {
            // Si no tiene favoritos, crear una nueva lista con este producto
            const newFavorite = new Favorite({
                userId,
                favoriteProducts: [{ productId }]
            });
            await newFavorite.save();
        }

        res.status(200).json({ success: true, message: 'Producto agregado a favoritos' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al agregar a favoritos', error: err.message });
    }
};

// Ruta para eliminar un producto de favoritos

export const removeFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId });

        if (!favorite) {
            return res.status(404).json({ success: false, message: 'No se encontró el usuario o sus favoritos' });
        }

        // Verificar si el producto está en los favoritos
        const productIndex = favorite.favoriteProducts.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            // Eliminar el producto de los favoritos
            favorite.favoriteProducts.splice(productIndex, 1);
            await favorite.save();
            res.status(200).json({ success: true, message: 'Producto eliminado de favoritos' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado en favoritos' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al eliminar de favoritos', error: err.message });
    }
};


export const getFavorites = async (req, res) => {
    const { userId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId }).populate('favoriteProducts.productId');

        if (!favorite) {
            return res.status(404).json({ success: false, message: 'No se encontraron favoritos para este usuario' });
        }

        res.status(200).json({ success: true, data: favorite.favoriteProducts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al obtener los favoritos', error: err.message });
    }
};


export const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'No se encontro carrito para este usuario' });
        }

        res.status(200).json({ success: true, data: cart.products });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al obtener el carrito ', error: err.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (quantity === 0) {
            // Si la cantidad es 0, eliminamos el producto del carrito
            const updatedCart = await Cart.findOneAndUpdate(
                { userId },
                { $pull: { products: { productId } } },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                message: "Producto eliminado del carrito",
                cart: updatedCart,
            });
        }

        // Si la cantidad es mayor a 0, actualizamos normalmente
        const updatedCart = await Cart.findOneAndUpdate(
            { userId, "products.productId": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Carrito actualizado", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar el carrito" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, price, name, image } = req.body;
        console.log({ userId, productId, price, name, image })
        let cart = await Cart.findOne({ userId });
        //console.log(cart)
        if (!cart) {
            // Si no existe el carrito, creamos uno nuevo
            cart = new Cart({
                userId,
                products: [{ productId, quantity: 1, unitPrice: price, name, image }],
            });
        } else {
            const existingProduct = cart.products.find(
                (p) => p.productId.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1, unitPrice: price, name, image });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        //console.log(error)
        res.status(500).json({ success: false, message: "Error al agregar al carrito", error });
    }
};

export const checkout = async (req, res) => {
    try {
        const { userId, products, total } = req.body;

        //console.log(user, products, total)

        if (!userId || !products.length) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        const newOrder = new Order({ userId, products, total });
        await newOrder.save();

        const user = await User.findById(userId);
        const ordenDelDia = new DailyOrder({
            orderId: newOrder._id,
            email: user.email,
            products,
            total,
        });

        await ordenDelDia.save();

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Carrito no encontrado" });
        }

        cart.products = [];

        await cart.save();

        res.status(200).json({ success: true, message: "Orden registrada" });
    } catch (error) {
        console.error("Error en checkout:", error);
        res.status(500).json({ success: false, message: "Error al procesar la compra" });
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


        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error eliminando el producto" });
    }
};


export const addCategory = async (req, res) => {
    try {
        const newCategory = new Category({ name: req.body.name });
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ message: "Error adding category" });
    }
};

export const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const oldCategoryName = category.name;

        // Actualizar el nombre de la categoría
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        // Actualizar los productos que tengan esta categoría
        await Product.updateMany({ category: oldCategoryName }, { category: name });

        //const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.json({ success: true, updatedCategory, message: "Categoría y productos actualizados correctamente." });
    } catch (err) {
        res.status(500).json({ message: "Error updating category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Buscar la categoría en la base de datos por su ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Buscar productos con la categoría por nombre
        const productsInCategory = await Product.find({ category: category.name });

        if (productsInCategory.length > 0) {
            return res.status(400).json({ message: "No se puede eliminar esta categoría porque hay productos asociados." });
        }

        // Eliminar la categoría
        await Category.findByIdAndDelete(categoryId);

        res.json({ message: "Categoría eliminada correctamente." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};

export const getDailyOrders = async (req, res) => {
    try {
        const dailyorders = await DailyOrder.find();
        console.log(dailyorders)
        if (!dailyorders.length) {
            return res.status(404).json({ success: false, message: 'No se encontraron ordenes el dia de hoy' });
        }

        res.status(200).json({ success: true, data: dailyorders });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error al obtener ordenes del dia" });
    }

};

// Actualizar estado de orden en DailyOrder y Order
export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { estado } = req.body;
    console.log(orderId)

    if (!["Entregado", "Cancelado"].includes(estado)) {
        return res.status(400).json({ success: false, message: "Estado no válido" });
    }

    try {
        const dailyOrder = await DailyOrder.findOne({ orderId });
        const order = await Order.findById(orderId);

        if (!dailyOrder || !order) {
            return res.status(404).json({ success: false, message: "Orden no encontrada" });
        }

        dailyOrder.estado = estado;
        order.estado = estado;

        await dailyOrder.save();
        await order.save();

        res.status(200).json({ success: true, message: "Estado actualizado correctamente", data: { dailyOrder, order } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar el estado" });
    }
};


export const saveStoreHours = async (req, res) => {
    try {
        const { workingHours } = req.body

        let store = await StoreHours.findOne()
        if (store) {
            store.workingHours = workingHours
        } else {
            store = new StoreHours({ workingHours })
        }

        await store.save()
        res.status(200).json({ message: "Store hours saved successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error saving store hours" })
    }
}

export const getStoreHours = async (req, res) => {
    try {
        let store = await StoreHours.findOne()
        if (!store) {
            store = new StoreHours({ workingHours: {} })
            await store.save()
        }
        res.json(store)
    } catch (error) {
        res.status(500).json({ error: "Error fetching store hours" })
    }
}