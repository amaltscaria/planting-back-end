import express from "express";
const router = express.Router();

import { createOrder, verifyOrder } from "../Controller/paymentController.js";

router.post("/create/order", createOrder);
router.post("/payment/verify", verifyOrder);

export default router;
