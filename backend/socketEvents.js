import { io } from "./server.js";

// Funciónes para enviar eventos desde el backend

//Agrega ordenes en admin panel
export const emitNewOrder = (newOrder) => {
    io.emit("newDailyOrder", newOrder);
};

//Edita estado de una orden a usuario
export const emitNewOrderStatus = (newOrderStatus) => {
    io.emit("newDailyOrderStatus", newOrderStatus);
};

//Edita horarios
export const emitStoreHours = (storeHours) => {
    
    io.emit("storeHoursUpdated", storeHours);
};

//Borra producto a usuario
export const emitDeleteProduct = (deleteProduct) => {
    //console.log(deleteProduct)
    io.emit("productErased", deleteProduct);
};
