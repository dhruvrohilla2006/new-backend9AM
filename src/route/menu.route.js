import { Router } from "express";
import { CreateMenu } from "../controller/menu.controller.js";
import validate from "../middleware/validate.middleware.js";
import { menuSchema } from "../schema/menu.Schema.js";
import { upload } from "../libs/multer.cjs";

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

router.post(
  "/create",
  upload.array("menuImage", 3),
  validate(menuSchema),
  CreateMenu,
);

export default router;
