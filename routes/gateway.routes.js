import express from "express"
import {createServiceProxy} from "../middleware/proxy.middleware.js"
import {verifyToken ,checkRole } from "../middleware/auth.middleware.js"




const router = express.Router();

router.use("/api/auth" , createServiceProxy("auth"))


router.use("/api/items" ,verifyToken , createServiceProxy("items"))



export default router