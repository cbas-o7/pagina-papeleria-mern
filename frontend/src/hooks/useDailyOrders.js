import { useState, useEffect } from "react";
import { getDailyOrders, updateOrderStatus } from "../services/api";
import Swal from "sweetalert2";


export const useDailyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getDailyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);


    const handleStatusChange = async (orderId, newStatus) => {
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: `Cambiar estado a: ${newStatus}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar",
            cancelButtonText: "No, cancelar",
        });

        if (confirm.isConfirmed) {
            try {
                await updateOrderStatus(orderId, newStatus);
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.orderId === orderId ? { ...order, estado: newStatus } : order
                    )
                );
                
                Swal.fire("¡Hecho!", "El estado ha sido actualizado.", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudo actualizar el estado.", "error");
            }
        }
    };

    return { orders, handleStatusChange };
};
