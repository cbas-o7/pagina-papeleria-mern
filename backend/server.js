import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import fileUpload from 'express-fileupload'; // Importamos express-fileupload
import { createServer } from "node:http";
import { Server } from "socket.io";

import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import categoryRouter from "./routes/category.route.js";
import dailyOrderRouter from "./routes/dailyorder.route.js";
import storeRouter from "./routes/store.route.js";
import favoriteRouter from "./routes/favorite.route.js";

// URL FRONTEND-Produccion
//const originUrl = "https://8xzt8k3b-3000.usw3.devtunnels.ms"

// URL FRONTEND-Desarrollo
const originUrl = "http://localhost:5173"


const app = express()
const server = createServer(app) // Usamos http.Server para soportar WebSockets
const io = new Server(server, {
    cors: {
        origin: originUrl, 
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors())
app.use(fileUpload());
app.use(express.json()) //nos permite aceptar JSON en los .body
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios

// Rutas agrupadas por dominio
app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", categoryRouter);
app.use("/", dailyOrderRouter);
app.use("/", storeRouter);
app.use("/", favoriteRouter);
// ...agrega aquí los otros routers...

// Almacenar clientes conectados
io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado");
    });
});

export {io}


// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectDB()
    console.log(`Server started at: ${PORT}`)
})