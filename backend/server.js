
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

import  router from "./routes/user.route.js";

const app = express()
app.use(cors())
app.use(express.json()) //nos permite aceptar JSON en los .body

app.use("/", router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server started at: ${PORT}`)
})

//console.log(process.env.MONGO_URI)