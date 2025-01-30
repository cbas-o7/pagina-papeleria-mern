import User from "../models/user.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";

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