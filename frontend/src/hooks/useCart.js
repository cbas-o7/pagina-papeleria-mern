import { useState, useEffect } from "react";
import { getCartByUserId, updateCartQuantity, addToCart } from "../services/api";

export default function useCart(userId) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (!userId) return;
        const fetchCart = async () => {
            const products = await getCartByUserId(userId);
            setCartItems(products);
        };
        fetchCart();
    }, [userId]);

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

    return { cartItems, setCartItems, updateQuantity, addProductToCart };
}