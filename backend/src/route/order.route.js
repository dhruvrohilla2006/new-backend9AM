import { Router } from "express";
import { tokenValidate } from "../middleware/token.middleware.js";
import {changeOrderStatus, 
  createOrder,
  findAllOrderAdmin,
  findOrderUser,
} from "../controller/order.controller.js";
import validate from "../middleware/validate.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.get("/", (req, res) => res.status(200).send("Welcome to Order Api's"));
router.post("/", tokenValidate, validate(createOrderSchema), createOrder);
router.get("/getOrderUser", tokenValidate,roleMiddleware('user'), findOrderUser);
router.get("/getOrderAdmin",tokenValidate,roleMiddleware('admin'),  findAllOrderAdmin);
router.put("/:id",tokenValidate,roleMiddleware('admin'),  changeOrderStatus);

export default router;
