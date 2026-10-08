import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 10,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minLength: 50,
      maxLength: 500,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "ALL",
      enums: {
        value: [
          "ALL",
          "LUNCH",
          "BREAKFAST",
          "DINNER",
          "DESERT",
          "DRINK",
          "HOTDRINKS",
        ],
        message: "{value} is not Supported ",
      },
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const Menu = mongoose.model("menu", menuSchema);

export default Menu;
