import { useState, useEffect } from "react";
import { getDailyOrders, updateOrderStatus, deleteAllDailyOrders } from "../services/api";
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

    const handleDeleteAllOrders = async () => {
        // Verifica si hay órdenes "Por entregar"
        const pendingOrders = orders.some((order) => order.estado === "Por entregar");

        if (pendingOrders) {
            return Swal.fire({
                title: "Advertencia",
                text: "Existen órdenes 'Por entregar'. Debes entregarlas o cancelarlas antes de eliminar todo.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
        }

        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará TODAS las órdenes. No se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar todo",
            cancelButtonText: "No, cancelar",
        });

        if (confirm.isConfirmed) {
            try {
                await deleteAllDailyOrders();
                setOrders([]); // Vaciar el estado

                Swal.fire("¡Eliminado!", "Todas las órdenes han sido eliminadas.", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudieron eliminar las órdenes.", "error");
            }
        }
    };

    return { orders, handleStatusChange, handleDeleteAllOrders };
};
