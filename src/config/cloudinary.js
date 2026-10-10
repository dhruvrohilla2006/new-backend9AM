import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_API_KEY = "936861825587112";
const CLOUDINARY_SECRET = "Y1y1fdCNZ1a01WnIZ-WIXr9SFgA";
const CLOUDINARY_CLOUD_NAME = "drbrstzpe";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

async function fileUploader(file) {
  return await cloudinary.uploader.upload(file, {
    resource_type: "image",
    folder: "menuImages",
  });
}

export default fileUploader;
