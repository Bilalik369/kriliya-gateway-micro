import express from "express";
import { createServiceProxy } from "../middleware/proxy.middleware.js";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();


router.use("/api/auth", createServiceProxy("auth"));


router.use("/api/items",  createServiceProxy("items"));
router.use("/api/booking", createServiceProxy("booking"));

router.use("/api/notifications", createServiceProxy("notification"));
router.use("/api/reviews", createServiceProxy("review"));


export default router;