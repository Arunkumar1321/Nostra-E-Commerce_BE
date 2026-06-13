import { Router } from "express";
import { requireAuth } from "../Helper/authMiddleware.mjs";
import order_controller from "./order_controller.mjs";
const orderroutes=Router()
orderroutes.post("/api/order",requireAuth,order_controller.create_Order)
export default orderroutes