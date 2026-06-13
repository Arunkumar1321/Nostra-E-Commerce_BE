import { Router } from "express";
import product_controller from "./pro_controller.mjs";
import { requireAuth, requireAdmin } from "../Helper/authMiddleware.mjs";
const productrouter = Router();

productrouter.get("/api/products", requireAuth, product_controller.product_get)
productrouter.get("/api/products/search", requireAuth, product_controller.search_product_get)
productrouter.get("/api/products/:id", requireAuth, product_controller.single_product_get)
// productrouter.post("/api/products", requireAuth, requireAdmin, product_controller.product_post)
// productrouter.patch("/api/products", requireAuth, requireAdmin, product_controller.product_patch)
// productrouter.put("/api/products", requireAuth, requireAdmin, product_controller.product_put)
// productrouter.delete("/api/products", requireAuth, requireAdmin, product_controller.product_delete)

export default productrouter


