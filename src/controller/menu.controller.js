import { success } from "zod";
import Menu from "../model/menu.model.js";
import fileUploader from "../config/cloudinary.js";

export const CreateMenu = async (request, response) => {
  try {
    const { name, description, price, category, isAvailable } = request.body;
    const files = request.files;

    console.log(files);
    let result;
    if (files.length > 0) {
      let filesPath = files.map((file) => {
        return file.path;
      });

      let ImageUrls = await Promise.all(
        filesPath.map((link) => {
          const Uploadresult = fileUploader(link);

          console.log(Uploadresult);
          return Uploadresult;
        }),
      );

      console.log(ImageUrls);

      const SecurURLArray = ImageUrls.map((urlObj) => urlObj.secure_url);

      result = await Menu.insertOne({
        name,
        description,
        price,
        category,
        isAvailable,
        images: SecurURLArray,
      });
    } else {
      result = await Menu.insertOne({
        name,
        description,
        price,
        category,
        isAvailable,
      });
    }

    // const result = await newMenu .save();

    return response.status(201).json({
      success: true,
      message: "New Menu Create Successfully",
      result,
    });
  } catch (error) {
    console.log(error.message);

    response.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
};
