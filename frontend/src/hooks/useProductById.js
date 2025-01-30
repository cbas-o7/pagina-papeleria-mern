import { useState, useEffect } from 'react';
import { getProductByID } from '../services/api'

export const useProduct = (id) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductByID( id );  // Usamos la función que definiste
                //console.log(productData)
                setProduct(productData);
            } catch (err) 
            {console.error(err.message); // Si hay error, se muestra en consola
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);  // El hook se ejecutará cada vez que cambie el ID

    
    return product ;
};