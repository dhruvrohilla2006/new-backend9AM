import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUserDetails,
  homeFunction,
  loginController,
  logoutController,
} from "../controller/auth.controller.js";
import { tokenValidate } from "../middleware/token.middleware.js";

const router = Router();

router.get("/", homeFunction);
router.post("/create", createUser);
router.post("/login", loginController);
router.get("/getAllUser", getAllUser);
router.get("/check",tokenValidate, getUserDetails);
router.get('/logout',logoutController)

export default router;
