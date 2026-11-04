import { isValidObjectId } from "mongoose";
import createOrderObject from "../libs/order.js";
import Menu from "../model/menu.model.js";
import Order from "../model/order.model.js";
import { success } from "zod";
import { response } from "express";

export const createOrder = async (request, resposne) => {
  try {
    const OrderData = request.body;
    const Userdata = request.token;

    const foodIds = OrderData.cartItem.map((item) => item.item_id);
    const uniqueFoodIds = [...new Set(foodIds)];

    const foodObj = await Menu.find({
      _id: {
        $in: uniqueFoodIds,
      },
      isAvailable: true,
    });

    console.log(foodObj);

    if (foodObj.length != uniqueFoodIds.length) {
      return resposne.status(400).json({
        success: false,
        message: "Some Item is Out of Stock Please Check",
      });
    }

    const CartObj = createOrderObject(OrderData.cartItem, foodObj);

    console.log(CartObj);

    const totalCartPrice = CartObj.reduce(
      (total, currValue) => currValue.subtotal + total,
      0,
    );

    console.log(totalCartPrice);

    console.log(foodObj);

    const order = new Order({
      cartItem: OrderData.cartItem,
      totalprice: totalCartPrice,
      userId: Userdata.id,
    });

    await order.save();

    return resposne.status(201).json({
      message: "Order Created SuccessFully",
      data: order,
      success: true,
    });
  } catch (error) {
    console.log("Error", error.message);
    return resposne.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const findOrderUser = async (request, response) => {
  try {
    const UserData = request.token;

    const UserRecord = await Order.find({
      userId: UserData.id,
    })
      .populate({ path: "userId", select: "-password -role -__v" })
      .populate({
        path: "cartItem.item_id",
      });

    console.log(UserRecord);

    return response.json({
      message: "Resposne Success",
      data: UserRecord,
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    return response.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const findAllOrderAdmin = async (request, response) => {
  try {
    const AllRecord = await Order.find({})
      .populate({ path: "userId", select: "-password" })
      .populate({ path: "cartItem.item_id" });

    console.log(AllRecord);

    return response.json({
      message: "Resposne Success",
      data: AllRecord,
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    return response.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const changeOrderStatus = async (request, response) => {
  try {
    const OrderId = request.params.id || "";
    const OrderStatus = request.query.status || "";

    const OrderStatusEnum = [
      "pending",
      "accepted",
      "preparing",
      "out-for-delivery",
      "delivered",
      "cancelled",
      "rejected",
    ];

    if (!isValidObjectId(OrderId)) {
      return response.status(400).json({
        message: "Invalid Order Id",
        success: false,
      });
    }

    if(!OrderStatusEnum.includes(OrderStatus)){
      return response.status(400).json({
        message:"Invalid Status",
        success:false
      })
    }

    const OrderData = await Order.findByIdAndUpdate(
      OrderId,
      {
        status: OrderStatus,
      },
      {
        document: "after",
        runValidators: true,
      },
    );

    if (!OrderData) {
      return response.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    return response.status(200).json({
      success: true,
      message: "Status Modified",
      data: OrderData,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return response.status(400).json({
        message: error.message,
        success: false,
      });
    }

    return response.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
