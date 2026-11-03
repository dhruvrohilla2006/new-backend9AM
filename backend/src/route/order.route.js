import { Router } from "express";
import { tokenValidate } from "../middleware/token.middleware.js";
import { createOrder } from "../controller/order.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";

const router = Router();

router.get("/", (req, res) => res.status(200).send("Welcome to Order Api's"));
router.post("/", validate(createOrderSchema), createOrder);

export default router;
