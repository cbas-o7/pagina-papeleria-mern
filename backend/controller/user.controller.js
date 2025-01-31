import User from "../models/user.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import Favorite from "../models/favorite.js";
import Cart from "../models/cart.js";

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
        res.status(200).json({ success: true, data: user });
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
                products: [{ productId, quantity: 1, unitPrice: price, name, image}],
            });
        } else {
            const existingProduct = cart.products.find(
                (p) => p.productId.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1, unitPrice: price, name, image});
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error al agregar al carrito", error  });
    }
};