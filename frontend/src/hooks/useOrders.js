import { useState, useEffect } from "react";
import { getOrdersByUserId, cancelOrder } from "../services/api";
import { useSocket } from "./useSocket";

// dominio backend

export const useOrders = (userId) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      //this.userId = "679223f140fed36595b74944"; // ID del usuario
      const data = await getOrdersByUserId(userId);
      setOrders(data);
      //console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    
  }, []);


  const handleCancelOrder = async (orderId) => {
    try {
      //console.log(orderId)
      const result = await cancelOrder(orderId);
      if (result.success) {
        setOrders((prevOrders) =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, estado: "Cancelado" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error cancelando orden:", error);
    }
  };

  return { orders, handleCancelOrder };
};