import express from "express"
import dotenv from "dotenv"
// import {connectdb} from "./lib/db.js"
import cors from "cors"
import gatewayRoutes from "./routes/gateway.routes.js";

dotenv.config()

const app = express()

app.use(cors({
   origin: "http://localhost:8081",
  credentials: true
}));

/* Do not use express.json() on the gateway: it consumes the request body before
   the proxy can forward it (breaks auth JSON and items multipart). Each service parses its own body. */

const PORT = process.env.PORT

app.use("/", gatewayRoutes);

// connectdb()

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})