import { useState, useEffect } from "react";
import { getFavoritesByUser, addFavorite, removeFavorite } from "../services/api";

const useFavorites = (userId) => {
    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (userId) {
            const fetchFavorites = async () => {
                try {
                    
                    const favoriteProducts = await getFavoritesByUser(userId);
                    //console.log(favoriteProducts)
                    setFavorites(favoriteProducts);
                } catch (error) {
                    console.error("Error al cargar los favoritos", error);
                }
            };

            fetchFavorites();
        }
    }, [userId]);

    const toggleFavorite = async (userId, productId) => {
        //console.log(userId, productId)
        try {
            const productInFavorites = favorites.some(
                (favorite) => favorite.productId === productId
            );

            if (productInFavorites) {
                await removeFavorite(userId, productId);
                setFavorites(favorites.filter(fav => fav.productId !== productId)); // Actualiza el estado
            } else {
                //console.log(productId, userId)
                await addFavorite(productId, userId);
                setFavorites([...favorites, { productId }]); // Actualiza el estado
            }
        } catch (error) {
            console.error("Error al actualizar favoritos", error);
        }
    };

    const isProductFavorite = (productId) => {
        return favorites.some(fav => fav.productId === productId);
    };

    return {
        favorites,
        toggleFavorite,
        isProductFavorite
    };
};

export default useFavorites;
