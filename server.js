import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import gatewayRoutes from "./routes/gateway.routes.js";

dotenv.config()

const app = express()


app.use(express.json());

const PORT = process.env.PORT

app.use("/", gatewayRoutes);

connectdb()

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})