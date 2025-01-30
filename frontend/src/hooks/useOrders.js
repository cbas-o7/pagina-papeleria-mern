import { useState, useEffect } from "react";
import { getOrdersByUserId } from "../services/api";


export const useOrders = (userId) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
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
    
        fetchOrders();
      }, []);

  return {orders};
};