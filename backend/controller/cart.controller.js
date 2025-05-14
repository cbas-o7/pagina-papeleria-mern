import Cart from "../models/cart.js";
import Product from "../models/product.js";
import StoreHours from "../models/store.js";
import Order from "../models/order.js";
import DailyOrder from "../models/dailyOrder.js";
import User from "../models/user.js";
import { emitNewOrder } from "../socket.js"; // Asegúrate de que la ruta sea correcta


export const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'No se encontro carrito para este usuario' });
        }

        //* 
        // COMPRUEBA SI HAY PRODUCTOS ELIMINADOS EN EL CARRO Y LOS ELIMINA
        // *//
         // Obtener IDs de productos en el carrito
         const productIds = cart.products.map(p => p.productId);

         // Obtener los productos que aún existen en la base de datos
         const existingProducts = await Product.find({ _id: { $in: productIds } });
 
         // Filtrar productos eliminados
         const existingProductIds = new Set(existingProducts.map(p => p._id.toString())); // Set con IDs existentes
         const filteredProducts = cart.products.filter(p => existingProductIds.has(p.productId));
 
         // Si hubo cambios, actualizar el carrito en la base de datos
         if (filteredProducts.length !== cart.products.length) {
             cart.products = filteredProducts;
             await cart.save(); // Guardar cambios en la BD
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
        //console.log({ userId, productId, price, name, image })
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



        // Obtener el horario de la tienda
        const store = await StoreHours.findOne(); // Asegúrate de que exista el modelo con los horarios
        if (!store || !store.workingHours) {
            return res.status(500).json({ success: false, message: "No se encontró la información del horario de la tienda" });
        }

        // Obtener la fecha y hora actual
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convertir hora a minutos

        const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        const today = daysOfWeek[currentDay];

        const { status, openTime, closeTime } = store.workingHours[today];

        if (status === "closed" || currentTime < timeToMinutes(openTime) || currentTime >= timeToMinutes(closeTime)) {
            // Buscar el próximo día en que la tienda esté abierta
            let nextOpeningDay = null;
            let nextOpeningTime = null;

            for (let i = 1; i <= 7; i++) {
                const nextDay = daysOfWeek[(currentDay + i) % 7]; // Buscar el siguiente día
                const { status, openTime } = store.workingHours[nextDay];

                if (status === "open") {
                    nextOpeningDay = nextDay;
                    nextOpeningTime = openTime;
                    break;
                }
            }

            return res.status(403).json({
                success: false,
                message: `La tienda está cerrada. Podrás comprar el ${nextOpeningDay} a las ${nextOpeningTime}.`,
            });
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

        emitNewOrder(ordenDelDia);

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

function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

