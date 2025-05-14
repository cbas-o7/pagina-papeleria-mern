import Favorite from "../models/favorite.js"


export const addFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId });

        if (favorite) {
            // Si el producto ya está en favoritos, no hacemos nada
            if (favorite.favoriteProducts.some(item => item.productId === productId)) {
                return res.status(400).json({ success: false, message: 'Este producto ya está en tus favoritos' });
            }

            // Agregar el nuevo producto a favoritos
            favorite.favoriteProducts.push({ productId });
            await favorite.save();
        } else {
            // Si no tiene favoritos, crear una nueva lista con este producto
            const newFavorite = new Favorite({
                userId,
                favoriteProducts: [{ productId }]
            });
            await newFavorite.save();
        }

        res.status(200).json({ success: true, message: 'Producto agregado a favoritos' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al agregar a favoritos', error: err.message });
    }
};

// Ruta para eliminar un producto de favoritos

export const removeFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId });

        if (!favorite) {
            return res.status(404).json({ success: false, message: 'No se encontró el usuario o sus favoritos' });
        }

        // Verificar si el producto está en los favoritos
        const productIndex = favorite.favoriteProducts.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            // Eliminar el producto de los favoritos
            favorite.favoriteProducts.splice(productIndex, 1);
            await favorite.save();
            res.status(200).json({ success: true, message: 'Producto eliminado de favoritos' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado en favoritos' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al eliminar de favoritos', error: err.message });
    }
};


export const getFavorites = async (req, res) => {
    const { userId } = req.body;

    try {
        const favorite = await Favorite.findOne({ userId }).populate('favoriteProducts.productId');

        if (!favorite) {
            return res.status(404).json({ success: false, message: 'No se encontraron favoritos para este usuario' });
        }

        res.status(200).json({ success: true, data: favorite.favoriteProducts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al obtener los favoritos', error: err.message });
    }
};
