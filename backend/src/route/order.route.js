import { Router } from "express";
import { tokenValidate } from "../middleware/token.middleware";

const router = Router();

router.get("/", (req, res) => res.status(200).send("Welcome to Order Api's"));
router.get("/createOrder", tokenValidate);

export default router;
