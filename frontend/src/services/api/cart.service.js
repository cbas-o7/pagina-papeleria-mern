import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, { userId });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const updateCartQuantity = async (userId, productId, quantity) => {
  try {
    const response = await axios.patch(`${API_URL}/cart/update`, {
      userId,
      productId,
      quantity,
    });
    return response.data.cart;
  } catch (error) {
    return null;
  }
};

export const addToCart = async (userId, productId, price, name, image) => {
  const numericPrice = parseFloat(price.replace('$', ''));
  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      userId,
      productId,
      price: numericPrice,
      name,
      image,
    });
    return response.data.cart;
  } catch (error) {
    return null;
  }
};

export const checkoutOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, orderData);
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
 


export const createPaypalOrder = async (orderData, setMessage) => {
  try {
    const response = await axios.post(`${API_URL}/paypal/orders`, orderData);

    if (response.id) {
      return response.id;
    } else {
      const errorDetail = response?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${response.debug_id})`
        : JSON.stringify(response);

      throw new Error(errorMessage);
    }
  } catch (error) {

    console.error(error);
    setMessage(
      `Could not initiate PayPal Checkout...${error}`
    );


    throw new Error(error.response?.data?.message || "Error al crear la orden");
  }
}

export const onApprove = async (orderId) => {

}