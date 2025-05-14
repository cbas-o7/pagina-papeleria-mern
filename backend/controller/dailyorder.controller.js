import DailyOrder from "../models/dailyOrder.js";
import Order from "../models/order.js";
import { emitNewOrderStatus } from "../socket.js";


export const getDailyOrders = async (req, res) => {
    try {
        const dailyorders = await DailyOrder.find();
        //console.log(dailyorders)
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
    //console.log(orderId)

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

        emitNewOrderStatus(order)

        res.status(200).json({ success: true, message: "Estado actualizado correctamente", data: { dailyOrder, order } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar el estado" });
    }
};

export const deleteAllOrders = async (req, res) => {
    try {
        await DailyOrder.deleteMany({});
        res.status(200).json({ success: true, message: "Todas las órdenes han sido eliminadas." });
    } catch (error) {
        console.error("Error eliminando órdenes:", error);
        res.status(500).json({ success: false, message: "No se pudieron eliminar las órdenes." });
    }
};