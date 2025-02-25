import { useState, useEffect } from "react";
import { getCartByUserId, updateCartQuantity, addToCart, checkoutOrder, getStoreHours } from "../services/api";
import Swal from "sweetalert2";
import { useSocket } from "./useSocket";

export default function useCart(userId) {
    const [cartItems, setCartItems] = useState([]);
    const [storeHours, setStoreHours] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            const products = await getCartByUserId(userId);
            setCartItems(products);

            const hours = await getStoreHours();
            setStoreHours(hours.workingHours || {});
        };

        fetchData();
    }, [userId]);

    useSocket({ setCartItems, setStoreHours });

    const isStoreOpen = () => {
        if (!storeHours) return false;

        const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];


        const now = new Date();
        const today = (now.getDay()); // Asegura que lunes sea 0
        const currentDay = daysOfWeek[today];
        //console.log(today)

        const currentTime = now.getHours() * 60 + now.getMinutes();

        //const today = new Date();
        //const currentDay = daysOfWeek[today.getDay() - 1];
        //const currentTime = today.getHours() * 60 + today.getMinutes(); // Convertir a minutos

        const todayHours = storeHours[currentDay];
        if (!todayHours || todayHours.status === "closed") return false;

        const [openHour, openMin] = todayHours.openTime.split(":").map(Number);
        const [closeHour, closeMin] = todayHours.closeTime.split(":").map(Number);
        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;
        //console.log(`${openTime} Y ${closeTime}`)
        //console.log(currentTime, "-", openTime, "-", today, "-", "-", closeTime)

        return currentTime >= openTime && currentTime < closeTime;
    };

    const getNextOpeningTime = () => {
        if (!storeHours) return null;

        const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

        const now = new Date();
        const currentDayIndex = (now.getDay()); // Asegura que lunes sea 0


        const currentTime = now.getHours() * 60 + now.getMinutes();

        // 1️⃣ Verifica si la tienda abrirá más tarde HOY
        let todayName = daysOfWeek[currentDayIndex];
        let todayHours = storeHours[todayName];

        //console.log(todayName)
        


        console.log("1️⃣", todayName)
        console.log("1️⃣", storeHours)
        //console.log("1️⃣", openTimeParts)
        //console.log("1️⃣", openTime)
        console.log("===========")

        if (todayHours && todayHours.status === "open") {
            let openTimeParts = todayHours.openTime.split(":").map(Number);
            let openTime = openTimeParts[0] * 60 + openTimeParts[1]; // Convierte a minutos

            if (currentTime < openTime) {
                return `Hoy (${todayName}) a las ${todayHours.openTime}`;
            }
        }


        // 2️⃣ Si ya pasó el horario de apertura de hoy, buscar en días siguientes
        for (let i = 1; i < 7; i++) {
            let nextDay = daysOfWeek[(currentDayIndex + i) % 7];
            let nextDayHours = storeHours[nextDay];
            //console.log("2️⃣", nextDay)

            if (nextDayHours && nextDayHours.status === "open") {
                return `${nextDay} a las ${nextDayHours.openTime}`;
            }
        }


        return null;
    };

    // Actualizar cantidad en frontend y DB
    const updateQuantity = async (productId, change) => {
        const newQuantity =
            cartItems.find((item) => item.productId === productId)?.quantity + change;
        //console.log(updatedCart)
        const updatedCart = await updateCartQuantity(userId, productId, newQuantity);

        if (updatedCart) {
            setCartItems(updatedCart.products); // Reflejamos el cambio en el frontend
        } else {
            console.error("No se pudo actualizar el carrito en la DB");
        }
    };

    const addProductToCart = async (productId, price, name, image) => {
        const updatedCart = await addToCart(userId, productId, price, name, image);
        if (updatedCart) setCartItems(updatedCart.products);
    };

    const addOrder = async (order) => {
        if (!isStoreOpen()) {
            const nextOpen = getNextOpeningTime();
            Swal.fire(
                "Tienda cerrada",
                `La tienda está fuera de horario. Podrás comprar nuevamente el ${nextOpen}.`,
                "warning"
            );
            return;
        }

        const updatedCart = await checkoutOrder(order);
        if (updatedCart.success) {
            setCartItems([]);
            Swal.fire("Compra realizada", "Tu pedido ha sido registrado.", "success");
        }
    };

    return { cartItems, setCartItems, updateQuantity, addProductToCart, addOrder };
}