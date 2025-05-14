import User from "../models/user.js";
import Order from "../models/order.js";
import DailyOrder from "../models/dailyOrder.js";
import { emitNewOrderStatus } from "../socket.js"; 

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
        //console.log(user)
        // Si todo es correcto, devolver datos del usuario
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                rol: user.rol, // Enviar el rol en la respuesta
            }
        });
    } catch (error) {
        console.error(`Error al autenticar usuario: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

export const userSignup = async (req, res) => {
    const user = req.body //usuario mandara los datos

    if (!user.email || !user.name || !user.password || !user.rol) {
        return res.status(500).json({ success: false, message: 'Ingrese los campos requeridos' });
    }

    const existingEmail = await User.findOne({ email: user.email });
    if (existingEmail) {
        return res.status(500).json({ success: false, message: 'El email ya está registrado' });
    }

    const newUser = new User(user);
    //console.log(newUser)
    try {
        await newUser.save();
        res.status(201).json({ success: true, data: {
            _id: newUser._id,
            email: newUser.email,
            rol: newUser.rol, // Enviar el rol en la respuesta
        }});
    } catch (error) {
        console.error(`Error creando usuario: ${error.message}`);
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

        emitNewOrderStatus(dailyOrder)

        res.status(200).json({ success: true, message: "Orden cancelada correctamente.", data: order });
    } catch (error) {
        console.error("Error cancelando la orden:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};