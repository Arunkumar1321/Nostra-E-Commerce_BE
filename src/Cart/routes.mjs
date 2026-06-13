import { Router } from "express";
import { requireAuth } from "../Helper/authMiddleware.mjs";
import cartController from "./cartcontroller.mjs";
const cartrouter=Router()
cartrouter.post("/api/cart",requireAuth,cartController.add_cart)
cartrouter.get("/api/cart",requireAuth,cartController.get_cart)
cartrouter.put("/api/cart/:productid",requireAuth,cartController.update_cart)
cartrouter.delete("/api/cart/:productid",requireAuth,cartController.delete_particular_cart)
cartrouter.delete("/api/cart",requireAuth,cartController.clear_cart)
export default cartrouter