import createOrderObject from "../libs/order.js";
import Menu from "../model/menu.model.js";
import Order from "../model/order.model.js";

export const createOrder = async (request, resposne) => {
  try {
    const OrderData = request.body;
    // const Userdata = request.token;

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
    resposne.send("Done");
    const order = new Order({

    });
  } catch (error) {
    console.log("Error", error.message);
    return resposne.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
