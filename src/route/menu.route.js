import { Router } from "express";
import { CreateMenu } from "../controller/menu.controller.js";

const router = Router();

router.get("/", (request, response) => {
  try {
    response.status(200).json({
      success: true,
      message: "Welcome to Menu Routes",
    });
  } catch (error) {
    console.log(error.message);

    response.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
});

router.post("/create", CreateMenu);

export default router;
