import { useEffect } from "react";
import { socket } from "../services/api.js";

export const useSocket = ({ setOrders, setCartItems, setStoreHours }) => {
    useEffect(() => {
        // Escuchar nuevas órdenes
        socket.on("newDailyOrder", (newOrder) => {
            setOrders((prevOrders) => [newOrder, ...prevOrders]);
        });

        // Escuchar cambios en el estado de órdenes
        socket.on("newDailyOrderStatus", (updatedOrder) => {
            setOrders((prevOrders) => prevOrders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
            ));
        }); 

        // Escuchar cuando un producto es eliminado
        socket.on("productErased", (id) => {
            setCartItems((prevCartItems) => prevCartItems.filter((item) => item.productId !== id));
        });

        // Escuchar actualizaciones de horario de tienda
        socket.on("storeHoursUpdated", (newStoreHours) => {
            setStoreHours(newStoreHours.workingHours);
        });

        return () => {
            socket.off("newDailyOrder");
            socket.off("newDailyOrderStatus");
            socket.off("productErased");
            socket.off("storeHoursUpdated");
        };
    }, [setOrders, setCartItems, setStoreHours]);
};
