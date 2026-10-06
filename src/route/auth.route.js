import { Router } from "express";
import {
  createUser,
  getAllUser,
  homeFunction,
  loginController,
} from "../controller/auth.controller.js";

const router = Router();

router.get("/", homeFunction);
router.post("/create", createUser);
router.post("/login", loginController);
router.get("/getAllUser", getAllUser);

export default router;
